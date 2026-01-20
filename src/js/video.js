// Video and poster URLs - detect environment at runtime
// AEM builds: /content/dam/acsorg/150/assets/
// GitHub Pages: /150-lab/assets/
// Local dev: /video/ (served from public folder)
const isAEMBuild = document.querySelector('script[src*="/content/dam/acsorg/150/"]') !== null;
const isGitHubPages = window.location.hostname.includes('github.io') || window.location.pathname.startsWith('/150-lab/');
const assetBasePath = isAEMBuild 
  ? "/content/dam/acsorg/150/assets" 
  : isGitHubPages 
    ? "/150-lab/assets"
    : "";
const videoUrl = `${assetBasePath}/video/acs-150-compressed-3.mp4`;
const posterUrl = `${assetBasePath}/images/ACS150-promo-cover.jpg`;
import logger from "./utils/logger.js";

// SAFARI DETECTION: Safari has unique audio/video behavior
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const isSafariOrIOS = isSafari || isIOS;

// Log browser detection for debugging
if (isSafariOrIOS) {
  console.log('[video.js] Safari/iOS detected - will use Safari-specific video handling');
}

// Flag to indicate when sound toggle is triggered by video slider
let videoSliderTriggeredUnmute = false;

// ============================================================================
// YouTube Player API - DISABLED (using custom .mp4 player instead)
// ============================================================================
// These variables exist only to prevent reference errors if YouTube code is somehow called
let youtubePlayer = null;
let youtubeIframeLoaded = false;
let youtubePlayerInitialized = false;

// Initialize YouTube API - DISABLED (kept for reference but won't be called)
function initYouTubeAPI(onReady) {
  try {
    // Prevent duplicate initialization
    if (youtubePlayerInitialized) {
      logger.log('YouTube player already initialized, skipping');
      if (onReady) onReady();
      return;
    }
    
    // Check if YouTube Player API is already loaded
    if (window.YT && window.YT.Player) {
      logger.log('YouTube API already loaded, initializing player immediately');
      initPlayer();
      if (onReady) onReady();
      return;
    }
    
    // Check if API is already loading
    if (window.onYouTubeIframeAPIReady) {
      logger.log('YouTube API is loading, chaining our callback');
      // API is loading, chain our callback
      const originalCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        try {
          if (typeof originalCallback === 'function') {
            originalCallback();
          }
        } catch (e) {
          logger.warn('Error in chained onYouTubeIframeAPIReady callback:', e);
        }
        if (!youtubePlayerInitialized) {
          initPlayer();
        }
        if (onReady) onReady();
      };
      return;
    }
    
    // Load YouTube IFrame API for the first time
    logger.log('Loading YouTube API for the first time');
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      document.head.appendChild(tag);
    }

    // Set up callback for when API loads
    window.onYouTubeIframeAPIReady = () => {
      logger.log('YouTube API ready, initializing player');
      if (!youtubePlayerInitialized) {
        initPlayer();
      }
      if (onReady) onReady();
    };
  } catch (error) {
    logger.error('Error in initYouTubeAPI:', error);
    if (onReady) onReady(); // Still call callback to prevent hanging
  }
}

// Load the YouTube iframe src from data-src (lazy loading)
function loadYouTubeIframe() {
  if (youtubeIframeLoaded) {
    logger.log('YouTube iframe already loaded, skipping');
    return;
  }
  
  const iframe = document.getElementById('youtube-video-iframe');
  if (!iframe) return;
  
  // Check if iframe already has src (AEM might pre-load it)
  if (iframe.src && iframe.src !== 'about:blank' && iframe.src !== '') {
    logger.log('YouTube iframe already has src, marking as loaded');
    youtubeIframeLoaded = true;
    return;
  }
  
  // Load from data-src
  if (iframe.dataset.src) {
    logger.log('Lazy loading YouTube iframe from data-src');
    iframe.src = iframe.dataset.src;
    youtubeIframeLoaded = true;
  }
}

// Track when player is truly ready (after onReady fires)
let youtubePlayerReady = false;

// Separate function to initialize the player once API is ready
function initPlayer() {
  // Prevent duplicate initialization
  if (youtubePlayerInitialized) {
    logger.log('YouTube player already initialized (initPlayer check), skipping');
    return;
  }
  
  const iframe = document.getElementById('youtube-video-iframe');
  
  // Ensure iframe exists and is in the document
  if (!iframe || !document.body.contains(iframe)) {
    logger.warn('YouTube iframe not found or not in DOM, delaying player init');
    setTimeout(initPlayer, 100);
    return;
  }
  
  // Ensure iframe has loaded (has src set)
  if (!iframe.src || iframe.src === 'about:blank') {
    logger.warn('YouTube iframe src not set, delaying player init');
    setTimeout(initPlayer, 100);
    return;
  }
  
  // Mark as initialized BEFORE creating player to prevent race conditions
  youtubePlayerInitialized = true;
  
  // Mark iframe so audio.js and AEM's SDI tracking know not to create another player
  iframe.setAttribute('data-player-managed', 'true');
  iframe.setAttribute('data-yt-player-initialized', 'true');
  
  // Also set global flags for other scripts to check
  window.mainYouTubePlayerManaged = true;
  window.mainYouTubePlayerInitializing = true;
  
  try {
    youtubePlayer = new YT.Player('youtube-video-iframe', {
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
    
    // Expose state checker for global audio management
    window.isMainVideoPlaying = () => {
      try {
        return youtubePlayerReady && youtubePlayer && youtubePlayer.getPlayerState && youtubePlayer.getPlayerState() === 1;
      } catch (e) {
        return false;
      }
    };
    
    // Expose ready checker
    window.isMainYouTubePlayerReady = () => youtubePlayerReady;
    
  } catch (error) {
    logger.error('Error creating YouTube player:', error);
    youtubePlayerInitialized = false; // Allow retry
    window.mainYouTubePlayerManaged = false;
  }
}

// Remove any blocking overlay divs that YouTube creates
function removeYouTubeBlockingDivs() {
  const wrapper = document.getElementById('youtube-video-wrapper');
  if (!wrapper) return;
  
  // Find any divs that YouTube API might have created that block the iframe
  // These are typically positioned absolutely with z-index
  const potentialBlockers = wrapper.querySelectorAll('div:not(.video-start-overlay):not(.play-button-overlay)');
  potentialBlockers.forEach(div => {
    const style = div.style;
    // Check for YouTube's typical blocking div pattern
    if (style.position === 'absolute' && 
        style.top === '0px' && 
        style.left === '0px' &&
        style.width === '100%' && 
        style.height === '100%' &&
        !div.classList.length) {
      logger.log('Removing YouTube blocking div');
      div.remove();
    }
  });
}

function onPlayerReady(event) {
  logger.log('YouTube player ready');
  
  // Mark player as truly ready
  youtubePlayerReady = true;
  window.mainYouTubePlayerInitializing = false;
  window.mainYouTubePlayerReady = true;
  
  // Remove any blocking divs that YouTube might have created
  removeYouTubeBlockingDivs();
  
  // Also check again after a short delay (YouTube might add them after onReady)
  setTimeout(removeYouTubeBlockingDivs, 500);
  setTimeout(removeYouTubeBlockingDivs, 1000);
}

function onPlayerStateChange(event) {
  // Ensure player is ready before processing state changes
  if (!youtubePlayerReady) {
    logger.warn('Player state change received but player not ready yet');
    return;
  }
  
  logger.log('Main video state changed:', event.data);
  
  // Manage background audio for main video
  // YouTube Player State: 1 = playing, 0 = ended, 2 = paused
  if (event.data === 1) {
    // Video is playing - ensure no blocking divs
    removeYouTubeBlockingDivs();
    
    // Video is playing - fade out and pause background audio
    logger.log('[video.js] Video playing, pausing background audio');
    if (window.cancelActiveFade) window.cancelActiveFade();
    
    if (window.backgroundAudio) {
      // Always attempt to duck, regardless of current state
      // This ensures that even if it was just resuming, we force it back down
      if (window.fadeBackgroundAudio) {
        window.fadeBackgroundAudio(0.001, 1000, () => {
          // Just duck the audio (volume 0.001), don't pause it to keep the session active
          // We use 0.001 instead of 0 to prevent browsers from auto-suspending the context
          logger.log('[video.js] Background audio ducked (vol 0.001)');
        });
      } else {
        // Fallback
        window.backgroundAudio.volume = 0.001;
      }
    }
  } else if (event.data === 0 || event.data === 2) {
    // Video ended (0) or paused (2) - resume background audio
    logger.log('[video.js] Video paused/ended, calling resumeBackgroundAudio');
    if (window.resumeBackgroundAudio) {
      window.resumeBackgroundAudio();
    } else {
      logger.error('[video.js] resumeBackgroundAudio not found on window');
    }
  }
}

// Function to fade audio (used by both custom video and YouTube)
function fadeAudio(audioElement, targetVolume, duration = 1000) {
  if (!audioElement) return;

  const startVolume = audioElement.volume;
  const startTime = performance.now();

  const fade = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Use exponential easing for more natural fade
    const easedProgress = progress * progress;
    audioElement.volume = startVolume + (targetVolume - startVolume) * easedProgress;

    if (progress < 1) {
      requestAnimationFrame(fade);
    }
  };

  requestAnimationFrame(fade);
}

export function initVideo() {
  const videoSection = document.querySelector("#video");
  const videoWrapper = document.querySelector(".video-wrapper");
  
  if (!videoSection || !videoWrapper) return;

  // Check if there's a YouTube iframe
  const youtubeIframe = videoWrapper.querySelector("iframe#youtube-video-iframe");
  if (youtubeIframe) {
    logger.log("YouTube iframe detected, setting up lazy loading");
    
    // Setup the click handler to lazy-load YouTube when user clicks
    const overlay = document.querySelector('.video-start-overlay');
    if (overlay) {
      overlay.addEventListener('click', function handleOverlayClick(event) {
        // Prevent any default behavior that might cause page refresh
        event.preventDefault();
        event.stopPropagation();
        
        // Wrap everything in try-catch to prevent AEM tracking errors from breaking the page
        try {
          // Play UI click sound if audio is not muted
          if (!window.audioMuted && window.playUIClickSound) {
            try {
              window.playUIClickSound();
            } catch (e) {
              logger.warn('Could not play UI click sound:', e);
            }
          }
          
          // IMMEDIATE audio fade out on click
          logger.log('[video.js] Overlay clicked, fading out audio immediately');
          try {
            if (window.cancelActiveFade) window.cancelActiveFade();
            if (window.fadeBackgroundAudio) {
              window.fadeBackgroundAudio(0.001, 1000, () => {
                logger.log('[video.js] Background audio ducked (vol 0.001) via overlay click');
              });
            } else if (window.backgroundAudio) {
              window.backgroundAudio.volume = 0.001;
            }
          } catch (audioError) {
            logger.warn('Audio fade error (non-critical):', audioError);
          }
          
          // Start overlay fade out immediately for better UX
          overlay.classList.add('hidden');
          
          // Load the YouTube iframe (lazy loading)
          loadYouTubeIframe();
          
          // Wait for iframe to load before initializing player
          // Using iframe load event instead of arbitrary timeout
          const iframe = document.getElementById('youtube-video-iframe');
          if (iframe) {
            const doInitPlayer = () => {
              try {
                initYouTubeAPI(() => {
                  logger.log('[video.js] YouTube player initialized after lazy load');
                  // Clean up any blocking divs that YouTube might create
                  removeYouTubeBlockingDivs();
                });
              } catch (initError) {
                logger.error('YouTube player init error:', initError);
              }
            };
            
            // If iframe already has src loaded, init immediately
            // Otherwise wait for load event
            if (iframe.src && iframe.contentWindow) {
              // Give iframe a moment to be ready
              setTimeout(doInitPlayer, 200);
            } else {
              iframe.addEventListener('load', doInitPlayer, { once: true });
              // Fallback timeout in case load event doesn't fire
              setTimeout(doInitPlayer, 1000);
            }
          }
          
          // Remove overlay from DOM after fade animation
          setTimeout(() => {
            try {
              overlay.remove();
              // Also clean up any blocking divs after overlay is removed
              removeYouTubeBlockingDivs();
            } catch (removeError) {
              logger.warn('Overlay remove error:', removeError);
            }
          }, 400);
          
          // SAFEGUARD: Ensure Lenis and ScrollTrigger remain functional
          // This prevents AEM tracking errors from breaking scroll
          setTimeout(() => {
            try {
              // Ensure Lenis is still running
              if (window.lenis && typeof window.lenis.start === 'function') {
                window.lenis.start();
                logger.log('[video.js] Ensured Lenis is running after video click');
              }
              
              // Refresh ScrollTrigger to ensure it's in sync
              if (window.ScrollTrigger && typeof window.ScrollTrigger.refresh === 'function') {
                window.ScrollTrigger.refresh();
                logger.log('[video.js] Refreshed ScrollTrigger after video click');
              }
            } catch (scrollError) {
              logger.warn('Scroll safeguard error:', scrollError);
            }
          }, 500);
          
        } catch (clickError) {
          // Critical: Don't let any error break the page
          logger.error('Video overlay click error (caught to prevent page break):', clickError);
          
          // Emergency: Try to restore scroll functionality even if there was an error
          setTimeout(() => {
            try {
              if (window.lenis && typeof window.lenis.start === 'function') {
                window.lenis.start();
              }
              if (window.ScrollTrigger && typeof window.ScrollTrigger.refresh === 'function') {
                window.ScrollTrigger.refresh();
              }
            } catch (e) {
              // Silent fail
            }
          }, 100);
        }
        
        // Remove this click handler since it's one-time
        overlay.removeEventListener('click', handleOverlayClick);
      });
    }
    
    // Setup IntersectionObserver for the video section (for pausing when scrolled away)
    // But only after video is loaded
    const videoSection = document.querySelector('#video');
    if (videoSection) {
      const visibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && youtubePlayer) {
            logger.log('[video.js] Main video scrolled out of view, pausing');
            try {
              const playerState = youtubePlayer.getPlayerState();
              if (playerState === 1) {
                youtubePlayer.pauseVideo();
              }
            } catch (error) {
              logger.warn('[video.js] Could not pause video:', error);
            }
            
            // Resume background audio
            setTimeout(() => {
              const mainPlaying = window.isMainVideoPlaying ? window.isMainVideoPlaying() : false;
              if (!mainPlaying && window.resumeBackgroundAudio && !window.audioMuted) {
                window.resumeBackgroundAudio();
              }
            }, 300);
          }
        });
      }, {
        threshold: 0.25
      });
      
      visibilityObserver.observe(videoSection);
    }
    
    return;
  }

  // Check if there's an actual <video> element (not an iframe)
  const videoElement = videoWrapper.querySelector("video");
  
  // If no video element found (e.g., using YouTube iframe instead), exit early
  if (!videoElement) {
    logger.log("No <video> element found in .video-wrapper, skipping custom video controls");
    return;
  }

  logger.log("Custom .mp4 video player detected, initializing controls");
  
  // Expose state checker for global audio management (for custom video player)
  window.isMainVideoPlaying = () => {
    try {
      return videoElement && !videoElement.paused;
    } catch (e) {
      return false;
    }
  };

  // ============================================================================
  // VIDEO LOADING STRATEGY
  // Safari/iOS needs video source set early. Other browsers can use lazy loading.
  // ============================================================================
  
  // Track if video source has been loaded
  let videoSourceLoaded = false;
  
  // Function to actually load the video source
  const loadVideoSource = () => {
    if (videoSourceLoaded) return;
    videoSourceLoaded = true;
    
    logger.log("[video.js] Loading video source..." + (isSafariOrIOS ? " [Safari/iOS mode]" : ""));
    
    // Set the video source - this triggers the actual download
    videoElement.src = videoUrl;
    
    // Trigger load
    videoElement.load();
    
    logger.log("[video.js] Video source set and load() called");
  };
  
  // Set poster immediately (small image, doesn't block paint)
  videoElement.poster = posterUrl;
  
  // Ensure required attributes are set on the video element
  videoElement.setAttribute('playsinline', '');
  videoElement.setAttribute('webkit-playsinline', '');
  if (isSafariOrIOS) {
    // Safari hint for better loading
    videoElement.setAttribute('x-webkit-airplay', 'allow');
    logger.log("[video.js] Safari/iOS: Set required video attributes");
  }
  
  // SAFARI/iOS CRITICAL: Load video source IMMEDIATELY
  // Safari requires the video to be in a ready state before the user gesture expires.
  // The old working code used preload="auto" and set src on init - we replicate that.
  if (isSafariOrIOS) {
    logger.log("[video.js] Safari/iOS detected - loading video source immediately");
    loadVideoSource();
  } else {
    // Non-Safari browsers: Use lazy loading for better initial page performance
    const scheduleVideoLoad = () => {
      if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(() => {
          loadVideoSource();
        }, { timeout: 4000 });
        logger.log("[video.js] Scheduled video load via requestIdleCallback");
      } else {
        setTimeout(() => {
          loadVideoSource();
        }, 2000);
        logger.log("[video.js] Scheduled video load via setTimeout (fallback)");
      }
    };
    
    // Intersection Observer as safety net - load if user scrolls toward video
    if (videoSection) {
      const preloadObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !videoSourceLoaded) {
              logger.log("[video.js] Video section approaching viewport, loading immediately");
              loadVideoSource();
              preloadObserver.disconnect();
            }
          });
        },
        {
          rootMargin: '50% 0px',
          threshold: 0
        }
      );
      preloadObserver.observe(videoSection);
    }
    
    // Start the idle-based loading
    scheduleVideoLoad();
  }

  // Add error event listener to check if the video file can be loaded
  videoElement.addEventListener("error", (e) => {
    // Only log errors if we've actually tried to load the video
    if (videoSourceLoaded) {
      logger.error("Video loading error:", e);
      logger.error("Video src:", videoElement.src);
      logger.error("Video error code:", videoElement.error?.code);
      logger.error("Video error message:", videoElement.error?.message);
    }
  });

  // Add loadeddata event to ensure video is ready
  videoElement.addEventListener("loadeddata", () => {
    logger.log("[video.js] Video data loaded successfully");
    videoElement.style.opacity = "1";
    // Ensure video starts paused
    videoElement.pause();
  });

  // Add loadedmetadata event to ensure video is ready
  videoElement.addEventListener("loadedmetadata", () => {
    logger.log("[video.js] Video metadata loaded");
    // Force a layout recalculation
    videoElement.style.display = "none";
    videoElement.offsetHeight; // Force reflow
    videoElement.style.display = "";
  });

  // Create overlay and play button
  const overlay = document.createElement("div");
  overlay.className = "video-overlay";

  const playButton = document.createElement("div");
  playButton.className = "play-button";

  overlay.appendChild(playButton);
  videoElement.parentNode.insertBefore(overlay, videoElement.nextSibling);

  // Create custom audio slider
  const audioSlider = document.createElement("div");
  audioSlider.className = "video-audio-slider";
  audioSlider.innerHTML = `
    <div class="audio-slider-track">
      <div class="audio-slider-fill"></div>
      <div class="audio-slider-thumb"></div>
    </div>
    <div class="audio-icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="currentColor"/>
      </svg>
    </div>
  `;

  // Style the audio slider
  audioSlider.style.cssText = `
    position: absolute;
    bottom: 20px;
    left: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    padding: 8px 12px;
    border-radius: 20px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    z-index: 10;
    color: white;
    font-size: 14px;
  `;

  // Style the slider track
  const track = audioSlider.querySelector(".audio-slider-track");
  track.style.cssText = `
    width: 80px;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    position: relative;
    cursor: pointer;
  `;

  // Style the slider fill
  const fill = audioSlider.querySelector(".audio-slider-fill");
  fill.style.cssText = `
    height: 100%;
    background: white;
    border-radius: 2px;
    width: 50%;
    transition: width 0.1s ease;
  `;

  // Style the slider thumb
  const thumb = audioSlider.querySelector(".audio-slider-thumb");
  thumb.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
    transition: left 0.1s ease;
  `;

  // Style the audio icon
  const audioIcon = audioSlider.querySelector(".audio-icon");
  audioIcon.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
  `;

  // Insert audio slider into video wrapper
  videoElement.parentNode.appendChild(audioSlider);

  // Create custom progress bar
  const progressBar = document.createElement("div");
  progressBar.className = "video-progress-bar";
  progressBar.innerHTML = `
    <div class="progress-bar-track">
      <div class="progress-bar-fill"></div>
      <div class="progress-bar-thumb"></div>
    </div>
  `;

  // Style the progress bar
  progressBar.style.cssText = `
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: rgba(0, 0, 0, 0);
    cursor: pointer;
    z-index: 10;
    transition: height 0.2s ease, background 0.2s ease;
  `;

  // Style the progress track
  const progressTrack = progressBar.querySelector(".progress-bar-track");
  progressTrack.style.cssText = `
    width: 100%;
    height: 100%;
    position: relative;
    cursor: pointer;
  `;

  // Style the progress fill
  const progressFill = progressBar.querySelector(".progress-bar-fill");
  progressFill.style.cssText = `
    height: 100%;
    background:rgba(111, 237, 238, 0.88);
    width: 0%;
    transition: width 0.1s linear;
    pointer-events: none;
  `;

  // Style the progress thumb
  const progressThumb = progressBar.querySelector(".progress-bar-thumb");
  progressThumb.style.cssText = `
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    background: rgba(111, 237, 238, 1);
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s ease;
    pointer-events: none;
  `;

  // Insert progress bar into video wrapper
  videoElement.parentNode.appendChild(progressBar);

  // Audio slider functionality
  let isDragging = false;

  // Define the volume range: 0-30% of true audio, with 25% as middle
  const MAX_VOLUME = 0.3; // 30% of true audio
  const DEFAULT_VOLUME = 0.18; // 18% of true audio (middle of slider)

  const updateSlider = () => {
    const volume = videoElement.volume;
    // Convert true volume (0-0.5) to slider percentage (0-100)
    const percentage = (volume / MAX_VOLUME) * 100;
    fill.style.width = percentage + "%";
    thumb.style.left = percentage + "%";
  };

  const setVolume = (clientX) => {
    const rect = track.getBoundingClientRect();
    // Convert slider percentage (0-100) to true volume (0-0.5)
    const sliderPercentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const volume = (sliderPercentage / 100) * MAX_VOLUME;

    // If user is dragging the video slider while global audio is muted,
    // this indicates intent to unmute and hear the video
    if (window.audioMuted && volume > 0) {
      // Unmute global audio by simulating a sound toggle click
      const soundToggle = document.querySelector(".sound-toggle");
      if (soundToggle && soundToggle.classList.contains("muted")) {
        // Set flag to indicate this unmute was triggered by video slider
        videoSliderTriggeredUnmute = true;
        // Simulate a click on the sound toggle to properly unmute everything
        // This ensures all the audio.js logic runs properly
        soundToggle.click();
        // Clear flag after a short delay
        setTimeout(() => {
          videoSliderTriggeredUnmute = false;
        }, 100);
      }
    }

    // Always unmute the video element when user is actively setting volume > 0
    if (volume > 0) {
      videoElement.muted = false;
    } else {
      videoElement.muted = true;
    }

    videoElement.volume = volume;

    // Update original volume for restoration later
    if (volume > 0) {
      originalVideoVolume = volume;
    }

    updateSlider();
  };

  // Mouse events for slider
  track.addEventListener("mousedown", (e) => {
    isDragging = true;
    setVolume(e.clientX);
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      setVolume(e.clientX);
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // Show/hide slider on video hover (only when playing)
  videoWrapper.addEventListener("mouseenter", () => {
    if (!videoElement.paused) {
      audioSlider.style.opacity = "1";
      audioSlider.style.pointerEvents = "auto";
    }
  });

  videoWrapper.addEventListener("mouseleave", () => {
    audioSlider.style.opacity = "0";
    audioSlider.style.pointerEvents = "none";
  });

  // Update slider when video volume changes
  videoElement.addEventListener("volumechange", updateSlider);

  // Set initial volume to 25% (middle of our 0-50% range)
  videoElement.volume = DEFAULT_VOLUME;

  // Set initial muted state based on global audio state
  if (window.audioMuted) {
    videoElement.muted = true;
    videoElement.volume = 0;
  } else {
    videoElement.muted = false;
  }

  // Initialize slider position
  updateSlider();

  // Progress bar functionality
  let isProgressDragging = false;

  const updateProgressBar = () => {
    if (videoElement.duration && !isProgressDragging) {
      const progress = (videoElement.currentTime / videoElement.duration) * 100;
      // Immediate update without transition for instant response
      progressFill.style.transition = "none";
      progressFill.style.width = progress + "%";
      progressThumb.style.left = progress + "%";
    }
  };

  const setVideoTime = (clientX) => {
    const rect = progressTrack.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const newTime = (percentage / 100) * videoElement.duration;
    videoElement.currentTime = newTime;
    updateProgressBar();
    // Restart smooth updates if video is playing
    if (!videoElement.paused) {
      startSmoothUpdates();
    }
  };

  const disableProgressTransitions = () => {
    progressFill.style.transition = "none";
    progressThumb.style.transition = "opacity 0.2s";
  };

  const enableProgressTransitions = () => {
    progressFill.style.transition = "width 0.1s linear";
    progressThumb.style.transition = "opacity 0.2s";
  };

  // Mouse events for progress bar
  progressTrack.addEventListener("mousedown", (e) => {
    isProgressDragging = true;
    // Disable transitions for immediate response
    disableProgressTransitions();
    setVideoTime(e.clientX);
    e.preventDefault();
  });

  // Handle single clicks (not dragging)
  progressTrack.addEventListener("click", (e) => {
    if (!isProgressDragging) {
      // Disable transitions for instant jump
      disableProgressTransitions();
      setVideoTime(e.clientX);
      // Re-enable transitions after a short delay
      setTimeout(() => {
        enableProgressTransitions();
      }, 50);
    }
  });

  document.addEventListener("mousemove", (e) => {
    if (isProgressDragging) {
      setVideoTime(e.clientX);
    }
  });

  document.addEventListener("mouseup", () => {
    isProgressDragging = false;
    // Re-enable transitions when dragging stops
    enableProgressTransitions();
  });

  // Show/hide progress thumb on hover and expand height
  progressBar.addEventListener("mouseenter", () => {
    progressThumb.style.opacity = "1";
    progressBar.style.height = "8px";
    progressBar.style.background = "rgba(0, 0, 0, 0.3)";
  });

  progressBar.addEventListener("mouseleave", () => {
    if (!isProgressDragging) {
      progressThumb.style.opacity = "0";
    }
    progressBar.style.height = "4px";
    progressBar.style.background = "rgba(0, 0, 0, 0)";
  });

  // Create a more frequent update mechanism for fluid progress bar
  let animationFrameId = null;
  let lastUpdateTime = 0;

  const updateProgressBarSmooth = () => {
    if (videoElement.duration && !isProgressDragging && !videoElement.paused) {
      const currentTime = performance.now();
      // Update 60 times per second (every ~16.67ms) for fluid movement
      if (currentTime - lastUpdateTime >= 16.67) {
        const progress = (videoElement.currentTime / videoElement.duration) * 100;
        progressFill.style.width = progress + "%";
        progressThumb.style.left = progress + "%";
        lastUpdateTime = currentTime;
      }
      animationFrameId = requestAnimationFrame(updateProgressBarSmooth);
    }
  };

  // Start smooth updates when video plays
  const startSmoothUpdates = () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    lastUpdateTime = performance.now();
    animationFrameId = requestAnimationFrame(updateProgressBarSmooth);
  };

  // Stop smooth updates when video pauses
  const stopSmoothUpdates = () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  };

  videoElement.addEventListener("play", startSmoothUpdates);
  videoElement.addEventListener("pause", stopSmoothUpdates);

  // Update progress bar during video playback (for immediate updates on seek)
  videoElement.addEventListener("timeupdate", updateProgressBar);

  // Initialize progress bar
  updateProgressBar();

  // Track original video volume for restoration
  let originalVideoVolume = DEFAULT_VOLUME;
  let scrollAwayFadeTimeout = null;

  // Function to fade out video audio and then pause
  const fadeOutAndPauseVideo = () => {
    if (!videoElement.paused) {
      // Store current volume for restoration
      originalVideoVolume = videoElement.volume;

      // Fade out video audio over 600ms
      fadeAudio(videoElement, 0, 600);

      // Set timeout to pause after fade completes
      scrollAwayFadeTimeout = setTimeout(() => {
        videoElement.pause();
        // Note: The pause event listener handles overlay, audio slider, and background audio resume
        scrollAwayFadeTimeout = null;
      }, 600);
    }
  };

  // Function to pause video and show overlay (for immediate pause)
  const pauseVideoAndShowOverlay = () => {
    if (!videoElement.paused) {
      // Clear any existing fade timeout
      if (scrollAwayFadeTimeout) {
        clearTimeout(scrollAwayFadeTimeout);
        scrollAwayFadeTimeout = null;
      }

      videoElement.pause();
      // Note: The pause event listener handles overlay, audio slider, and background audio resume
    }
  };

  // Handle play/pause
  const handlePlayPause = () => {
    // Prevent multiple rapid clicks
    if (overlay.classList.contains("loading")) {
      return;
    }
    
    if (videoElement.paused) {
      // Clear any existing fade timeout
      if (scrollAwayFadeTimeout) {
        clearTimeout(scrollAwayFadeTimeout);
        scrollAwayFadeTimeout = null;
      }

      // Ensure video source is loaded
      if (!videoSourceLoaded) {
        logger.log("[video.js] User clicked play before lazy load, loading immediately");
        loadVideoSource();
      }

      // Check readyState - if video isn't ready, show loading and wait
      // readyState: 0=HAVE_NOTHING, 1=HAVE_METADATA, 2=HAVE_CURRENT_DATA, 3=HAVE_FUTURE_DATA, 4=HAVE_ENOUGH_DATA
      if (videoElement.readyState < 1) {
        logger.log("[video.js] Video not ready (readyState: " + videoElement.readyState + "), waiting for metadata...");
        overlay.classList.add("loading");
        
        const onReady = () => {
          logger.log("[video.js] Video ready event fired, readyState: " + videoElement.readyState);
          videoElement.removeEventListener('loadedmetadata', onReady);
          videoElement.removeEventListener('canplay', onReady);
          clearTimeout(readyTimeout);
          playVideo();
        };
        
        videoElement.addEventListener('loadedmetadata', onReady);
        videoElement.addEventListener('canplay', onReady);
        
        // Fallback timeout
        const readyTimeout = setTimeout(() => {
          videoElement.removeEventListener('loadedmetadata', onReady);
          videoElement.removeEventListener('canplay', onReady);
          logger.log("[video.js] Timeout reached, attempting to play anyway (readyState: " + videoElement.readyState + ")");
          playVideo();
        }, 3000);
        
        return;
      }

      // Video is ready, play it
      playVideo();
    } else {
      pauseVideoAndShowOverlay();
    }
  };
  
  // Extracted play logic for reuse
  // Simplified approach that works on all browsers including Safari
  const playVideo = async () => {
    logger.log("[video.js] playVideo called - readyState: " + videoElement.readyState + ", paused: " + videoElement.paused);
    overlay.classList.remove("loading");
    
    // Fade out background music
    if (window.backgroundAudio) {
      fadeAudio(window.backgroundAudio, 0);
    }
    
    // Set volume based on global audio state
    if (window.audioMuted) {
      videoElement.volume = 0;
      videoElement.muted = true;
    } else {
      videoElement.muted = false;
      videoElement.volume = originalVideoVolume;
    }
    
    try {
      logger.log("[video.js] Attempting to play video...");
      const playPromise = videoElement.play();
      
      if (playPromise !== undefined) {
        await playPromise;
      }
      
      overlay.classList.add("hidden");
      updateSlider();
      startSmoothUpdates();
      logger.log("[video.js] Video playback started successfully");
    } catch (error) {
      logger.warn("[video.js] Play failed:", error.name, error.message);
      
      // Fallback: try muted (for autoplay policy)
      try {
        logger.log("[video.js] Retrying with muted video...");
        videoElement.muted = true;
        videoElement.volume = 0;
        const mutedPlayPromise = videoElement.play();
        
        if (mutedPlayPromise !== undefined) {
          await mutedPlayPromise;
        }
        
        overlay.classList.add("hidden");
        logger.log("[video.js] Playing muted due to autoplay policy");
        updateSlider();
        startSmoothUpdates();
      } catch (mutedError) {
        logger.error("[video.js] Play failed even when muted:", mutedError.name, mutedError.message);
        overlay.classList.remove("hidden");
        overlay.classList.remove("loading");
      }
    }
  };

  // SAFARI FIX: Track last interaction to prevent double-firing
  let lastInteractionTime = 0;
  const INTERACTION_DEBOUNCE_MS = 300;
  
  const debouncedPlayPause = (e) => {
    const now = Date.now();
    if (now - lastInteractionTime < INTERACTION_DEBOUNCE_MS) {
      logger.log('[video.js] Debounced duplicate play/pause trigger');
      return;
    }
    lastInteractionTime = now;
    handlePlayPause();
  };
  
  // Add click handlers
  overlay.addEventListener("click", debouncedPlayPause);
  videoElement.addEventListener("click", debouncedPlayPause);
  
  // SAFARI iOS FIX: Add touch event handlers
  // Safari iOS sometimes doesn't trigger click events properly on video elements
  // Using debounced handler to prevent double-firing when both touchend and click fire
  overlay.addEventListener("touchend", (e) => {
    e.preventDefault(); // Prevent synthetic click
    debouncedPlayPause(e);
  }, { passive: false });
  
  videoElement.addEventListener("touchend", (e) => {
    e.preventDefault();
    debouncedPlayPause(e);
  }, { passive: false });

  // Handle video end
  videoElement.addEventListener("ended", () => {
    overlay.classList.remove("hidden");
    // Hide audio slider when video ends
    audioSlider.style.opacity = "0";
    audioSlider.style.pointerEvents = "none";
    // Resume background music when video ends (only if not muted)
    if (!window.audioMuted && window.resumeBackgroundAudio) {
      logger.log('[video.js] Video ended, resuming background audio');
      window.resumeBackgroundAudio();
    }
  });

  // Handle video pause (when user clicks to pause or uses controls)
  videoElement.addEventListener("pause", () => {
    overlay.classList.remove("hidden");
    // Hide audio slider when video is paused
    audioSlider.style.opacity = "0";
    audioSlider.style.pointerEvents = "none";
    // Resume background music when video is paused (only if not muted)
    if (!window.audioMuted && window.resumeBackgroundAudio) {
      logger.log('[video.js] Video paused, resuming background audio');
      window.resumeBackgroundAudio();
    }
  });

  // Create Intersection Observer to handle video visibility
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          // Track if video was playing
          const wasPlaying = !videoElement.paused;
          
          // Video is out of view, fade out audio and then pause
          fadeOutAndPauseVideo();
          
          // FALLBACK: If video has been played, ensure background audio resumes
          // This provides extra safety in case pause event doesn't trigger audio resume
          if (wasPlaying) {
            logger.log('[video.js] Custom video left viewport after playing, ensuring background audio resumes');
            setTimeout(() => {
              // Only resume if main video is not playing
              const mainPlaying = window.isMainVideoPlaying ? window.isMainVideoPlaying() : false;
              
              if (!mainPlaying && window.resumeBackgroundAudio && !window.audioMuted) {
                window.resumeBackgroundAudio();
              }
            }, 800); // Delay accounts for the 600ms fade + 200ms buffer
          }
        }
      });
    },
    {
      threshold: 0.5, // Trigger when 50% of the video is out of view
    }
  );

  // Start observing the video section
  observer.observe(videoSection);

  // Listen for sound toggle state changes
  const updateVideoAudioState = () => {
    // Update video volume based on global audio state
    if (!videoElement.paused && !videoElement.ended) {
      if (window.audioMuted) {
        videoElement.volume = 0;
        videoElement.muted = true;
      } else {
        // When unmuting, restore the original volume and unmute the video
        // But if this unmute was triggered by the video slider, don't override the volume
        videoElement.muted = false;

        if (!videoSliderTriggeredUnmute) {
          videoElement.volume = originalVideoVolume;
        } else {
        }

        // Also fade out background audio if it's playing while video is active
        if (window.backgroundAudio && !window.backgroundAudio.paused) {
          fadeAudio(window.backgroundAudio, 0);
        }
      }
      // Update slider after volume change
      updateSlider();
    } else {
    }
  };

  // Watch for sound toggle clicks with multiple detection methods
  const soundToggle = document.querySelector(".sound-toggle");

  if (soundToggle) {
    // Method 1: Direct click listener
    soundToggle.addEventListener("click", () => {
      // Use setTimeout to ensure the audio.js has updated window.audioMuted first
      setTimeout(() => {
        updateVideoAudioState();
      }, 50); // Increased delay to 50ms for more reliability
    });

    // Method 2: MutationObserver to watch for class changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          // Delay to ensure audio.js has processed the change
          setTimeout(() => {
            updateVideoAudioState();
          }, 50);
        }
      });
    });

    observer.observe(soundToggle, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Method 3: Poll window.audioMuted every 500ms as fallback
    let lastKnownMuteState = window.audioMuted;

    setInterval(() => {
      if (window.audioMuted !== lastKnownMuteState) {
        lastKnownMuteState = window.audioMuted;
        updateVideoAudioState();
      }
    }, 500);

    // Also run initial check after a short delay to ensure all modules are loaded
    setTimeout(() => {
      updateVideoAudioState();
    }, 1000);
  }
}
