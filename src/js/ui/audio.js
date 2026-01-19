// ui/audio.js
// All audio loading, playback, and toggle logic

import gsap from "gsap";
import logger from "../utils/logger.js";

// Audio URLs from public folder
// In Vite, public folder assets are served from root path
// For AEM builds, they're under /content/dam/acsorg/150/assets/
const isAEMBuild = document.querySelector('script[src*="/content/dam/acsorg/150/"]') !== null;
const assetBasePath = isAEMBuild ? "/content/dam/acsorg/150/assets" : "";
const uiClickAudioUrl = `${assetBasePath}/audio/ui-click.mp3`;
const backgroundAudioUrl = `${assetBasePath}/audio/chemistry-3-final.mp3`;

// Internal module state
let backgroundAudioInstance = null;
let audioInitialized = false;
let audioMuted = false;
let userInteracted = false;
let heroAnimationComplete = false;
let backgroundAudioLoaded = false;
let enterButtonClicked = false;
let audioRetryCount = 0;
const maxAudioRetries = 25;
let audioRetryTimer = null;
let wasPlayingBeforeHidden = false;

// UI click sound instance
let uiClickSound = null;
let lastClickTime = 0;
const clickDebounceMs = 50; // Prevent multiple clicks within 50ms

// Background audio fade state tracking
let currentFadeAnimationId = null;
let activeFadeTimeout = null;

// SAFARI FIX: Singleton AudioContext - Safari limits the number of AudioContexts
// Creating multiple instances can cause audio to fail after several plays
let sharedAudioContext = null;

// Safari detection
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

// Get or create the shared AudioContext (singleton pattern)
function getSharedAudioContext() {
  if (!sharedAudioContext) {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        sharedAudioContext = new AudioContextClass();
        logger.log('[audio.js] Created shared AudioContext');
      }
    } catch (e) {
      logger.warn('[audio.js] Could not create AudioContext:', e);
    }
  }
  return sharedAudioContext;
}

// Resume the shared AudioContext (SAFARI FIX: must be called from user gesture)
async function resumeAudioContext() {
  const ctx = getSharedAudioContext();
  if (ctx && ctx.state === 'suspended') {
    try {
      await ctx.resume();
      logger.log('[audio.js] AudioContext resumed, state:', ctx.state);
    } catch (e) {
      logger.warn('[audio.js] Could not resume AudioContext:', e);
    }
  }
  return ctx;
}

// Initialize UI click sound
function initializeUIClickSound() {
  if (!uiClickSound) {
    uiClickSound = new Audio(uiClickAudioUrl);
    uiClickSound.volume = 0.35;
    uiClickSound.preload = "auto";
  }
}

// Cancel any active fade animation
function cancelActiveFade() {
  if (currentFadeAnimationId) {
    cancelAnimationFrame(currentFadeAnimationId);
    currentFadeAnimationId = null;
  }
  if (activeFadeTimeout) {
    clearTimeout(activeFadeTimeout);
    activeFadeTimeout = null;
  }
}

// Fade background audio to target volume with proper state management
function fadeBackgroundAudio(targetVolume, duration = 1000, onComplete = null) {
  if (!backgroundAudioInstance) return;
  
  // Cancel any existing fade
  cancelActiveFade();
  
  const startVolume = backgroundAudioInstance.volume;
  const startTime = performance.now();
  
  const fade = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = progress * progress;
    backgroundAudioInstance.volume = startVolume + (targetVolume - startVolume) * easedProgress;
    
    if (progress < 1) {
      currentFadeAnimationId = requestAnimationFrame(fade);
    } else {
      currentFadeAnimationId = null;
      if (onComplete) onComplete();
    }
  };
  
  currentFadeAnimationId = requestAnimationFrame(fade);
}

// Play UI click sound with debouncing to prevent multiple simultaneous plays
const playUIClickSound = () => {
  if (audioMuted) return;

  // Debounce: prevent multiple sounds within clickDebounceMs
  const now = Date.now();
  if (now - lastClickTime < clickDebounceMs) {
    return; // Skip this click, too soon after last one
  }
  lastClickTime = now;

  try {
    // Initialize if needed
    if (!uiClickSound) {
      initializeUIClickSound();
    }

    // Clone the audio to allow multiple overlapping sounds (but debounced)
    const clickSound = uiClickSound.cloneNode();
    clickSound.volume = 0.35;
    clickSound.play().catch((error) => {
      logger.warn("UI click sound play was prevented:", error);
    });
  } catch (error) {
    logger.error("Error playing UI click sound:", error);
  }
};

// Robust function to resume background audio
async function resumeBackgroundAudio() {
  logger.log('[audio.js] resumeBackgroundAudio called');
  
  if (!backgroundAudioInstance || audioMuted) {
    logger.log('[audio.js] Cannot resume: instance missing or muted');
    return;
  }
  
  cancelActiveFade();
  
  // SAFARI FIX: Use shared AudioContext instead of creating a new one
  // This prevents Safari from running out of AudioContext slots
  await resumeAudioContext();
  
  // Always set start volume for fade (if currently very low, start from near 0)
  if (backgroundAudioInstance.volume < 0.01) {
    backgroundAudioInstance.volume = 0.001;
  }
  
  // SAFARI FIX: For Safari, ensure the audio element is in a good state
  if (isSafari) {
    // Safari sometimes needs the currentTime reset to work properly
    if (backgroundAudioInstance.paused && backgroundAudioInstance.currentTime > 0) {
      logger.log('[audio.js] Safari: Audio was paused, ensuring good state');
    }
  }
  
  // Force play() even if we think we're playing - this ensures the browser acknowledges the active state
  // and returns a Promise we can handle
  try {
    await backgroundAudioInstance.play();
        logger.log('[audio.js] Audio play confirmed, fading in to 0.22');
        fadeBackgroundAudio(0.22, 1000);
  } catch (error) {
        logger.warn('[audio.js] Audio play blocked:', error);
        
    // SAFARI FIX: Safari is stricter about user gestures
    // Setup one-time click/touchend listener for fallback (touchend for iOS Safari)
    const resumeOnInteraction = async () => {
      logger.log('[audio.js] User interacted, retrying audio resume');
          if (backgroundAudioInstance && !audioMuted) {
        try {
          // Resume AudioContext first (this is the user gesture)
          await resumeAudioContext();
          await backgroundAudioInstance.play();
                fadeBackgroundAudio(0.22, 1000);
        } catch (e) {
          logger.error('[audio.js] Retry failed:', e);
        }
      }
      document.removeEventListener('click', resumeOnInteraction);
      document.removeEventListener('touchend', resumeOnInteraction);
        };
    document.addEventListener('click', resumeOnInteraction, { once: true });
    document.addEventListener('touchend', resumeOnInteraction, { once: true, passive: true });
  }
}

// Export functions to window for use in other modules
window.playUIClickSound = playUIClickSound;
window.cancelActiveFade = cancelActiveFade;
window.fadeBackgroundAudio = fadeBackgroundAudio;
window.resumeBackgroundAudio = resumeBackgroundAudio;

// Export a utility function to handle dynamically added audio elements
export function handleNewAudioElement(element) {
  // Check if the sound is currently muted
  if (audioMuted) {
    // If muted, set volume to 0 and mute
    element.volume = 0;
    element.muted = true;
  }

  // Add event listener to check mute state when audio starts playing
  element.addEventListener("play", () => {
    const soundToggle = document.querySelector(".sound-toggle");
    if (soundToggle && soundToggle.classList.contains("muted")) {
      element.volume = 0;
      element.muted = true;
    }
  });
}

// Load YouTube Player API if not already loaded
function loadYouTubeAPI() {
  if (window.YT && window.YT.Player) {
    return Promise.resolve();
  }
  
  return new Promise((resolve) => {
    // Check if API is already loading
    if (window.onYouTubeIframeAPIReady) {
      // API is loading, chain our callback
      const originalCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        originalCallback();
        resolve();
      };
      return;
    }
    
    // Set up callback for when API loads
    window.onYouTubeIframeAPIReady = () => {
      resolve();
    };
    
    // Load the API script
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  });
}

// Setup click handler for YouTube iframes
function setupYouTubeIframeClickHandler(iframe) {
  // Prevent multiple handlers on the same iframe
  if (iframe.dataset.clickHandlerAdded) return;
  iframe.dataset.clickHandlerAdded = "true";
  
  // Ensure iframe has a unique ID for YouTube Player API
  if (!iframe.id) {
    iframe.id = 'youtube-iframe-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }
  
  // Ensure iframe has enablejsapi=1 parameter for postMessage and Player API
  const src = iframe.src;
  if (src && (src.includes('youtube.com') || src.includes('youtu.be'))) {
    if (!src.includes('enablejsapi=1')) {
      const separator = src.includes('?') ? '&' : '?';
      const newSrc = src + separator + 'enablejsapi=1';
      logger.log('[audio.js] Adding enablejsapi to iframe:', iframe.id, '- will need to wait for reload');
      iframe.src = newSrc;
      // Continue with setup - the iframe will reload but our handlers will still work
    }
  }
  
  // Check if there's already a custom start overlay (e.g., .video-start-overlay)
  const parent = iframe.parentElement;
  const existingCustomOverlay = parent ? parent.querySelector('.video-start-overlay') : null;
  
  // If there's a custom overlay, skip Player creation - video.js will handle it
  // This prevents creating duplicate Player instances for the same iframe
  if (existingCustomOverlay) {
    logger.log('[audio.js] Custom video overlay detected, skipping Player creation for:', iframe.id, '(video.js will manage this)');
    return;
  }
  
  // Check if player is already managed by video.js (for main YouTube video)
  if (iframe.hasAttribute('data-player-managed') || window.mainYouTubePlayerManaged) {
    logger.log('[audio.js] Player already managed by video.js, skipping for:', iframe.id);
    return;
  }
  
  // Also check for the main YouTube video iframe by ID
  if (iframe.id === 'youtube-video-iframe') {
    logger.log('[audio.js] Main YouTube video detected, skipping Player creation (video.js manages this)');
    return;
  }
  
  // Store player instance reference and ready state for overlay click handler
  let playerInstance = null;
  let playerReady = false;
  
  // Setup YouTube Player API state listener for iframes WITHOUT custom overlays
  // This is essential for background audio management
  loadYouTubeAPI().then(() => {
    // Small delay to ensure iframe is fully loaded
    setTimeout(() => {
      // Double-check: Make sure player wasn't initialized by video.js in the meantime
      if (iframe.hasAttribute('data-player-managed') || 
          iframe.hasAttribute('data-yt-player-initialized') ||
          window.mainYouTubePlayerManaged ||
          iframe.id === 'youtube-video-iframe') {
        logger.log('[audio.js] Player was initialized by video.js during delay, skipping for:', iframe.id);
        return;
      }
      
      try {
        logger.log('[audio.js] Setting up YouTube Player API for iframe:', iframe.id);
        // Initialize YouTube Player to track state changes
        playerInstance = new window.YT.Player(iframe.id, {
        events: {
          onReady: (event) => {
            logger.log('[audio.js] YouTube Player ready for iframe:', iframe.id);
            playerReady = true;
          },
          onStateChange: (event) => {
            logger.log('YouTube Player state changed:', event.data, 'for iframe:', iframe.id);
            // YouTube Player State: 1 = playing, 0 = ended, 2 = paused
            if (event.data === 1) {
              // Video is playing - cancel any fades, then fade out and pause background audio
              logger.log('Video playing, pausing background audio');
              cancelActiveFade();
              if (backgroundAudioInstance) {
                // Always attempt to duck, regardless of current state
                // This ensures that even if it was just resuming, we force it back down
                fadeBackgroundAudio(0.001, 1000, () => {
                  // Just duck the audio (volume 0.001), don't pause it to keep the session active
                  // We use 0.001 instead of 0 to prevent browsers from auto-suspending the context
                  logger.log('Background audio ducked (vol 0.001)');
                });
              }
            } else if (event.data === 0 || event.data === 2) {
              // Video ended (0) or paused (2) - resume background audio
              logger.log('[audio.js] Video paused/ended, calling resumeBackgroundAudio');
              resumeBackgroundAudio();
            }
          }
        }
      });
      
        
        // Setup IntersectionObserver to pause video when scrolled out of view
        const videoContainer = iframe.closest('.preview-video-wrapper') || iframe.parentElement;
        if (videoContainer) {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) {
                // Video scrolled out of view
                logger.log('[audio.js] Video', iframe.id, 'scrolled out of view, attempting to pause');
                
                // Track if video was playing before we pause it
                let wasPlaying = false;
                
                try {
                  if (playerReady && playerInstance && typeof playerInstance.getPlayerState === 'function') {
                    const playerState = playerInstance.getPlayerState();
                    // Only pause if currently playing (state 1)
                    if (playerState === 1) {
                      wasPlaying = true;
                      playerInstance.pauseVideo();
                      logger.log('[audio.js] Video paused successfully');
                    }
                  }
                } catch (error) {
                  logger.warn('[audio.js] Could not pause video:', error);
                }
                
                // FALLBACK: If video has been interacted with (overlay was clicked), resume background audio
                // This ensures audio resumes even if state change events don't fire
                if (videoStarted || wasPlaying) {
                  logger.log('[audio.js] Video left viewport after being played, resuming background audio as fallback');
                  setTimeout(() => {
                    // Only resume if main video is not playing
                    const mainPlaying = window.isMainVideoPlaying ? window.isMainVideoPlaying() : false;
                    
                    if (!mainPlaying && !audioMuted) {
                      resumeBackgroundAudio();
                    }
                  }, 300); // Small delay to ensure pause event fires first
                }
              }
            });
          }, {
            threshold: 0.25 // Trigger when 25% or less of video is visible
          });
          
          observer.observe(videoContainer);
          logger.log('[audio.js] IntersectionObserver set up for iframe:', iframe.id);
        }
      } catch (error) {
        logger.error("Could not initialize YouTube Player API for iframe:", iframe.id, error);
        // Even if Player setup fails, we should still be able to use postMessage
        playerReady = false;
      }
    }, 200); // Increased delay to ensure iframe is fully ready
  }).catch((error) => {
    logger.error("Could not load YouTube API:", error);
  });
  
  // Create an overlay div to detect clicks (iframes don't bubble click events)
  const overlay = document.createElement("div");
  overlay.style.position = "absolute";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.zIndex = "10";
  overlay.style.cursor = "pointer";
  overlay.style.pointerEvents = "auto";
  overlay.style.backgroundColor = "transparent";
  
  // Position the iframe's parent relative if not already
  if (parent && getComputedStyle(parent).position === "static") {
    parent.style.position = "relative";
  }
  
  // Insert overlay before the iframe
  if (parent) {
    parent.insertBefore(overlay, iframe);
  }
  
  // Track if video has started playing
  let videoStarted = false;
  
  // Handle overlay click
  overlay.addEventListener("click", (e) => {
    e.stopPropagation();
    
    // Play UI click sound BEFORE any other audio changes
    if (!audioMuted) {
      playUIClickSound();
    }
    
    // Remove overlay so subsequent clicks go to iframe
    overlay.style.pointerEvents = "none";
    videoStarted = true;
    
    // Small delay to ensure click sound plays before fading background audio
    setTimeout(() => {
      // Fade out and pause background audio when YouTube video starts
      cancelActiveFade();
      if (backgroundAudioInstance && !backgroundAudioInstance.paused) {
        fadeBackgroundAudio(0.001, 1000, () => {
          // Just duck the audio (volume 0.001), don't pause it
          logger.log('[audio.js] Background audio ducked (vol 0.001) via overlay click');
        });
      }
    }, 100);
    
    // Play the video using YouTube Player API
    logger.log('[audio.js] Overlay clicked for iframe:', iframe.id, '| Player ready:', playerReady, '| Player exists:', !!playerInstance);
    
    const playVideo = () => {
      // Strategy 1: If player is ready and available, use it directly
      if (playerReady && playerInstance && typeof playerInstance.playVideo === 'function') {
        logger.log('[audio.js] Using ready Player API to play video');
        try {
          playerInstance.playVideo();
          return; // Success, exit early
        } catch (error) {
          logger.warn('[audio.js] Player API failed, trying fallback:', error);
        }
      }
      
      // Strategy 2: Try postMessage API (works even if Player not ready)
      logger.log('[audio.js] Using postMessage API as primary method');
      try {
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      } catch (error) {
        logger.warn('[audio.js] postMessage failed:', error);
      }
      
      // Strategy 3: If Player exists but might not be ready, try it anyway
      if (playerInstance && typeof playerInstance.playVideo === 'function') {
        logger.log('[audio.js] Attempting Player API as backup');
        try {
          playerInstance.playVideo();
        } catch (error) {
          logger.warn('[audio.js] Backup Player API call failed:', error);
        }
      }
      
      // Strategy 4: If Player doesn't exist yet but API is loaded, create it now
      if (!playerInstance && window.YT && window.YT.Player) {
        logger.log('[audio.js] Player instance missing, creating new Player');
        try {
          playerInstance = new window.YT.Player(iframe.id, {
            events: {
              onReady: (event) => {
                logger.log('[audio.js] New player ready, playing immediately');
                playerReady = true;
                event.target.playVideo();
              },
              onStateChange: (event) => {
                // Re-attach state listener logic
                if (event.data === 1) {
                  cancelActiveFade();
                  if (backgroundAudioInstance && !backgroundAudioInstance.paused) {
                    fadeBackgroundAudio(0.001, 1000, () => {
                      logger.log('Background audio ducked (vol 0.001)');
                    });
                  }
                } else if (event.data === 0 || event.data === 2) {
                  resumeBackgroundAudio();
                }
              }
            }
          });
        } catch (e) {
          logger.error('[audio.js] Failed to create new player:', e);
        }
      }
      
      // Strategy 5: Wait for player to become ready (last resort)
      if (!playerReady) {
        logger.log('[audio.js] Player not ready, setting up retry mechanism');
        let checkCount = 0;
        const checkInterval = setInterval(() => {
          checkCount++;
          if (playerReady && playerInstance && typeof playerInstance.playVideo === 'function') {
            clearInterval(checkInterval);
            logger.log('[audio.js] Player became ready after', checkCount * 100, 'ms, playing video');
            try {
              playerInstance.playVideo();
            } catch (error) {
              logger.warn('[audio.js] Delayed play attempt failed:', error);
            }
          }
          if (checkCount > 30) {
            clearInterval(checkInterval); // Stop after 3 seconds
            logger.warn('[audio.js] Player never became ready after 3 seconds');
          }
        }, 100);
      }
    };
    
    playVideo();
  });
}

// Setup click handler for HTML5 video elements
function setupVideoElementClickHandler(videoElement) {
  // Prevent multiple handlers on the same video
  if (videoElement.dataset.clickSoundHandlerAdded) return;
  videoElement.dataset.clickSoundHandlerAdded = "true";
  
  // Add click listener to play UI click sound
  videoElement.addEventListener("click", (e) => {
    // Only play sound if video is paused (about to play)
    if (videoElement.paused) {
      if (!audioMuted) {
        playUIClickSound();
      }
    }
  });
  
  // Listen for play event to pause background audio
  videoElement.addEventListener("play", () => {
    // Pause background audio when video starts
    if (backgroundAudioInstance && !backgroundAudioInstance.paused) {
      backgroundAudioInstance.pause();
    }
  });
  
  // Listen for pause/ended events to resume background audio
  videoElement.addEventListener("pause", () => {
    // Resume background audio if not muted and audio was initialized
    if (backgroundAudioInstance && audioInitialized && !audioMuted && videoElement.ended) {
      backgroundAudioInstance.play().catch((error) => {
        logger.warn("Could not resume background audio:", error);
      });
    }
  });
  
  videoElement.addEventListener("ended", () => {
    // Resume background audio when video ends
    if (backgroundAudioInstance && audioInitialized && !audioMuted) {
      backgroundAudioInstance.play().catch((error) => {
        logger.warn("Could not resume background audio:", error);
      });
    }
  });
}

// Setup audio observer for dynamically added elements
function setupAudioObserver() {
  // Add a mutation observer to detect dynamically added audio/video elements
  const audioObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          // Check if the added node is an audio or video element
          if (node.nodeName === "AUDIO" || node.nodeName === "VIDEO") {
            handleNewAudioElement(node);
            if (node.nodeName === "VIDEO") {
              setupVideoElementClickHandler(node);
            }
          } else if (node.querySelectorAll) {
            // Check for audio/video elements inside the added node
            const audioNodes = node.querySelectorAll("audio, video");
            audioNodes.forEach((audioNode) => {
              handleNewAudioElement(audioNode);
              if (audioNode.nodeName === "VIDEO") {
                setupVideoElementClickHandler(audioNode);
              }
            });
            
            // Check for YouTube iframes and add click handlers
            const iframes = node.querySelectorAll('iframe[src*="youtube.com"], iframe[src*="youtu.be"]');
            iframes.forEach((iframe) => {
              setupYouTubeIframeClickHandler(iframe);
            });
          }
        });
      }
    });
  });

  // Start observing the document body for added nodes
  audioObserver.observe(document.body, { childList: true, subtree: true });
  
  // Also setup handlers for any existing YouTube iframes
  const existingIframes = document.querySelectorAll('iframe[src*="youtube.com"], iframe[src*="youtu.be"]');
  existingIframes.forEach((iframe) => {
    setupYouTubeIframeClickHandler(iframe);
  });
  
  // Also setup handlers for any existing video elements
  const existingVideos = document.querySelectorAll("video");
  existingVideos.forEach((video) => {
    setupVideoElementClickHandler(video);
  });
  
  // SCROLL FALLBACK: Resume audio if no videos are playing
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    
    // Throttle to run only every 200ms
    scrollTimeout = setTimeout(() => {
      // Check if ANY video is playing
      const mainPlaying = window.isMainVideoPlaying ? window.isMainVideoPlaying() : false;
      const secondPlaying = window.isSecondVideoPlaying ? window.isSecondVideoPlaying() : false;
      
      if (!mainPlaying && !secondPlaying) {
        // If nothing is playing, ensure background audio is resumed
        // Only if it's currently ducked (playing but volume near 0)
        if (backgroundAudioInstance && !backgroundAudioInstance.paused && backgroundAudioInstance.volume < 0.05 && !audioMuted) {
          logger.log('[audio.js] Scroll fallback: No videos playing, resuming ducked audio');
          fadeBackgroundAudio(0.22, 1000);
        }
      }
    }, 200);
  });
}

// Function to play audio when it's ready
function playBackgroundAudioWhenReady(fromEnterButton = false) {
  if (audioInitialized || audioMuted) return;

  audioRetryCount++;
  // Also set window properties for backward compatibility
  window.audioRetryCount = audioRetryCount;
  window.maxAudioRetries = maxAudioRetries;

  // Stop retrying after max attempts
  if (audioRetryCount >= maxAudioRetries) {
    logger.warn(`Exceeded maximum audio retry attempts (${maxAudioRetries}). Stopping retries.`);
    return;
  }

  try {
    // Play the audio at 22% volume
    backgroundAudioInstance.volume = 0.22;

    // SAFARI FIX: Resume shared AudioContext if needed (uses singleton, not new instance)
    if (fromEnterButton) {
      // This is called from a user gesture (enter button click), so we can resume
      resumeAudioContext().catch(e => {
        logger.warn("Could not resume audio context:", e);
      });
    }

    backgroundAudioInstance
      .play()
      .then(() => {
        audioInitialized = true;
        // Also set window properties for backward compatibility
        window.audioInitialized = true;

        // Update sound toggle if it exists
        const soundToggle = document.querySelector(".sound-toggle");
        if (soundToggle) {
          soundToggle.classList.add("active");
        }

        // Reset retry count on success
        audioRetryCount = 0;
        window.audioRetryCount = 0;
      })
      .catch((error) => {
        logger.error("Audio play was prevented:", error);

        // Some browsers require user gesture to play audio
        // We'll retry playing when user clicks next time
        audioInitialized = false;

        // If from enter button, we'll retry automatically
        if ((fromEnterButton || enterButtonClicked) && audioRetryCount < maxAudioRetries) {
          setTimeout(() => {
            if (!audioInitialized && !audioMuted) {
              playBackgroundAudioWhenReady(true);
            }
          }, 500);
        }
      });
  } catch (error) {
    logger.error("Error playing audio:", error);
    audioInitialized = false;

    // Retry if it was from the enter button
    if ((fromEnterButton || enterButtonClicked) && audioRetryCount < maxAudioRetries) {
      setTimeout(() => {
        if (!audioInitialized && !audioMuted) {
          playBackgroundAudioWhenReady(true);
        }
      }, 500);
    }
  }
}

// Visibility change handler
const handleVisibilityChange = () => {
  if (document.hidden) {
    // Tab is hidden/minimized - pause audio if it's playing
    if (backgroundAudioInstance && !backgroundAudioInstance.paused && audioInitialized) {
      wasPlayingBeforeHidden = true;
      backgroundAudioInstance.pause();
    }
  } else {
    // Tab is visible again - resume audio if it was playing before
    if (backgroundAudioInstance && wasPlayingBeforeHidden && audioInitialized && !audioMuted) {
      wasPlayingBeforeHidden = false;
      backgroundAudioInstance.play().catch((error) => {
        logger.warn("Could not resume background audio:", error);
        // If we can't resume, try to reinitialize
        audioInitialized = false;
        if (enterButtonClicked) {
          setTimeout(() => {
            playBackgroundAudio(true);
          }, 100);
        }
      });
    }
  }
};

// Setup visibility change listeners
function setupVisibilityListeners() {
  // Listen for visibility changes (tab switching, minimizing)
  document.addEventListener("visibilitychange", handleVisibilityChange);

  // Also listen for window focus/blur events as a fallback
  window.addEventListener("blur", () => {
    if (backgroundAudioInstance && !backgroundAudioInstance.paused && audioInitialized) {
      wasPlayingBeforeHidden = true;
      backgroundAudioInstance.pause();
    }
  });

  window.addEventListener("focus", () => {
    if (backgroundAudioInstance && wasPlayingBeforeHidden && audioInitialized && !audioMuted) {
      wasPlayingBeforeHidden = false;
      backgroundAudioInstance.play().catch((error) => {
        logger.warn("Could not resume background audio on focus:", error);
        // If we can't resume, try to reinitialize
        audioInitialized = false;
        if (enterButtonClicked) {
          setTimeout(() => {
            playBackgroundAudio(true);
          }, 100);
        }
      });
    }
  });
}

// Main background audio play function
export const playBackgroundAudio = (fromEnterButton = false) => {
  if (audioMuted) return;

  // Track if this was triggered from the enter button for more aggressive retries
  if (fromEnterButton) {
    enterButtonClicked = true;
    // Also set window properties for backward compatibility with retry logic
    window.enterButtonClicked = true;
  }

  // IMPORTANT: Only proceed if enterButtonClicked is true
  // This ensures only the enter button can start the audio
  if (!enterButtonClicked) {
    return;
  }

  // Don't try to play if already initialized
  if (audioInitialized) return;

  // Stop retrying after max attempts (prevents infinite loops)
  if (audioRetryCount >= maxAudioRetries) {
    logger.warn(`Exceeded maximum audio retry attempts (${maxAudioRetries}). Stopping retries.`);
    // Clear any audio retry timers
    if (audioRetryTimer) {
      clearInterval(audioRetryTimer);
      audioRetryTimer = null;
    }
    return;
  }

  // Add 2-second delay when called from enter button
  if (fromEnterButton) {
    setTimeout(() => {
      if (audioMuted) return; // Check if audio was muted during the delay

      // Check if audio is ready to play after delay
      if (backgroundAudioLoaded || (backgroundAudioInstance && backgroundAudioInstance.readyState >= 3)) {
        playBackgroundAudioWhenReady(true);
      } else {
        // Audio not ready yet - it will play when ready via the canplaythrough event
        try {
          // Try to force load again
          backgroundAudioInstance.load();
        } catch (e) {
          logger.warn("Error reloading background audio:", e);
        }
      }
    }, 2000); // 2-second delay
    return;
  }

  // Check if audio is ready to play (for non-enter button calls)
  if (backgroundAudioLoaded || (backgroundAudioInstance && backgroundAudioInstance.readyState >= 3)) {
    playBackgroundAudioWhenReady(fromEnterButton);
  } else {
    // Audio not ready yet - it will play when ready via the canplaythrough event

    // If from enter button and the audio isn't loaded yet, force reload
    if (fromEnterButton) {
      try {
        // Try to force load again
        backgroundAudioInstance.load();
      } catch (e) {
        logger.warn("Error reloading background audio:", e);
      }
    }
  }
};

// Function to preload the background audio early
export function preloadBackgroundAudio() {
  // Create audio instance early in the initialization process
  const backgroundAudio = new Audio();

  // Set audio load event listeners before setting src to ensure they're captured
  backgroundAudio.addEventListener("canplaythrough", () => {
    backgroundAudioLoaded = true;

    // If user has clicked the enter button but audio wasn't ready, play it now
    // IMPORTANT: Only attempt playback if enterButtonClicked is true
    if (enterButtonClicked && !audioInitialized && !audioMuted) {
      playBackgroundAudioWhenReady(true);
    }
  });

  backgroundAudio.addEventListener("error", (e) => {
    logger.error("Audio loading error:", e);
    logger.error("Audio src:", backgroundAudio.src);

    // In development mode, provide specific guidance
    const isDevServer = window.location.hostname === "localhost" || window.location.hostname.includes("127.0.0.1");
    if (isDevServer) {
      logger.warn("Audio failed to load in dev mode. Ensure audio files are in 150-lab/public/audio/ directory.");
    }
  });

  // Set properties
  backgroundAudio.loop = true;
  backgroundAudio.volume = 0; // Start at 0 volume for fade in
  backgroundAudio.preload = "auto"; // Explicitly set preload attribute

  // Set src using imported asset - do this after setting up event listeners
  backgroundAudio.src = backgroundAudioUrl;

  // Force load
  try {
    backgroundAudio.load();
  } catch (e) {
    logger.error("Error loading background audio:", e);
  }

  // Store reference for later use
  backgroundAudioInstance = backgroundAudio;
  // Also expose to window for backward compatibility
  window.backgroundAudioInstance = backgroundAudio;
  window.backgroundAudio = backgroundAudio;
  audioInitialized = false;
  audioMuted = false;
  userInteracted = false;
  heroAnimationComplete = false;
  backgroundAudioLoaded = false;
  enterButtonClicked = false;
  audioRetryCount = 0;

  // Also set window properties for backward compatibility with retry logic
  window.audioInitialized = false;
  window.audioMuted = false;
  window.userInteracted = false;
  window.heroAnimationComplete = false;
  window.enterButtonClicked = false;
  window.audioRetryCount = 0;
  window.maxAudioRetries = maxAudioRetries;
  window.audioRetryTimer = null;

  // Setup visibility listeners
  setupVisibilityListeners();
}

// Add click sound to interactive elements
export const setupUIClickSounds = () => {
  // Initialize UI click sound
  initializeUIClickSound();

  // Select all interactive elements including timeline scrubber markers
  // Note: .video-wrapper is excluded as custom overlays handle their own click sounds
  const interactiveElements = document.querySelectorAll(
    'a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"], .marker, .minor-node'
  );

  // Add click event listeners to play sound
  interactiveElements.forEach((element) => {
    element.addEventListener("click", (event) => {
      // For enter-experience button, only play sound if it's the first click
      if (element.classList.contains("enter-experience")) {
        if (!element.dataset.clickSoundPlayed) {
          if (!audioMuted) {
            playUIClickSound();
          }
          element.dataset.clickSoundPlayed = "true";
        }
        return;
      }

      if (!audioMuted) {
        playUIClickSound();
      }
    });
  });

  // Set up a MutationObserver to add click sounds to new elements
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            // Element node
            // Check if the node itself is an interactive element
            if (
              node.matches(
                'a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"], .marker, .minor-node'
              )
            ) {
              node.addEventListener("click", (event) => {
                // For enter-experience button, only play sound if it's the first click
                if (node.classList.contains("enter-experience")) {
                  if (!node.dataset.clickSoundPlayed) {
                    if (!audioMuted) {
                      playUIClickSound();
                    }
                    node.dataset.clickSoundPlayed = "true";
                  }
                  return;
                }

                if (!audioMuted) {
                  playUIClickSound();
                }
              });
            }

            // Check for interactive elements within the added node
            const childInteractiveElements = node.querySelectorAll(
              'a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"], .marker, .minor-node'
            );
            childInteractiveElements.forEach((element) => {
              element.addEventListener("click", (event) => {
                // For enter-experience button, only play sound if it's the first click
                if (element.classList.contains("enter-experience")) {
                  if (!element.dataset.clickSoundPlayed) {
                    if (!audioMuted) {
                      playUIClickSound();
                    }
                    element.dataset.clickSoundPlayed = "true";
                  }
                  return;
                }

                if (!audioMuted) {
                  playUIClickSound();
                }
              });
            });
          }
        });
      }
    });
  });

  // Start observing the document with the configured parameters
  observer.observe(document.body, { childList: true, subtree: true });

  // Setup audio observer for dynamically added elements
  setupAudioObserver();
};

// Handle audio playback on user interaction
export const enableAudioOnInteraction = (event) => {
  // Mark that user has interacted with the page
  userInteracted = true;

  // IMPORTANT: We no longer try to play audio on general user interactions
  // Only the enter-experience button should start audio playback

  // However, if the enter button was already clicked but audio failed to start,
  // we can use this interaction to help retry (since browsers might require interaction)
  if (enterButtonClicked && !audioInitialized && heroAnimationComplete && !audioMuted) {
    // Only try to play if the enter button was previously clicked
    playBackgroundAudio(true);
  }
};

// Setup sound toggle functionality
export function setupSoundToggle() {
  const soundToggle = document.querySelector(".sound-toggle");
  if (soundToggle) {
    // Set up the wave animation for the sound toggle SVG
    const waveGroup = document.getElementById("waveGroup");
    if (waveGroup) {
      // Create the wave animation and store it globally
      window.waveAnimation = gsap.to(waveGroup, {
        x: "-=100",
        ease: "linear",
        duration: 2,
        repeat: -1,
      });
    }
    soundToggle.addEventListener("click", () => {
      // Store the current mute state before toggling
      const wasAudioMuted = audioMuted;

      // Toggle the muted class
      soundToggle.classList.toggle("muted");

      // Update global mute state
      audioMuted = soundToggle.classList.contains("muted");
      // Also set window properties for backward compatibility
      window.audioMuted = audioMuted;

      // Play UI click sound - force it to play even if we were muted
      // This ensures we hear the click when re-enabling sound
      if (wasAudioMuted) {
        // If we were muted and now unmuting, force play the click sound
        try {
          if (!uiClickSound) {
            initializeUIClickSound();
          }
          const clickSound = uiClickSound.cloneNode();
          clickSound.volume = 0.38;
          clickSound.play().catch((error) => {
            logger.warn("UI click sound play was prevented:", error);
          });
        } catch (error) {
          logger.error("Error playing UI click sound:", error);
        }
      } else {
        // If we weren't muted, use the normal click sound function
        playUIClickSound();
      }

      // Get wave animation from window (assuming it's set up elsewhere)
      const waveAnimation = window.waveAnimation;

      // Pause or resume the wave animation based on muted state
      if (audioMuted) {
        if (waveAnimation) waveAnimation.pause();

        // Mute the audio
        if (backgroundAudioInstance) {
          backgroundAudioInstance.volume = 0;

          // Clear any audio retry timers if they exist
          if (audioRetryTimer) {
            clearInterval(audioRetryTimer);
            audioRetryTimer = null;
          }
        }
      } else {
        if (waveAnimation) waveAnimation.resume();

        // Check if video is currently playing - if so, don't start background audio
        const videoElement = document.getElementById("anniversary-video");
        const isVideoPlaying = videoElement && !videoElement.paused && !videoElement.ended;

        // Only start background audio if no video is playing
        if (!isVideoPlaying) {
          // If audio hasn't been initialized yet but enter button was clicked, initialize it now
          if (!audioInitialized && enterButtonClicked && backgroundAudioInstance) {
            // Try to play with aggressive retry
            playBackgroundAudio(true);

            // Restart retry timer if needed
            if (!audioRetryTimer) {
              audioRetryTimer = setInterval(() => {
                if (audioInitialized) {
                  // Audio started successfully, clear the retry timer
                  clearInterval(audioRetryTimer);
                  audioRetryTimer = null;
                } else if (!audioMuted && enterButtonClicked) {
                  // Try again if the audio hasn't started yet
                  if (audioRetryCount < maxAudioRetries) {
                    playBackgroundAudio(true);
                  } else {
                    // Stop trying after max retries
                    logger.warn(`Exceeded maximum audio retry attempts (${maxAudioRetries}). Stopping retries.`);
                    clearInterval(audioRetryTimer);
                    audioRetryTimer = null;
                  }
                }
              }, 500);
            }
          } else if (audioInitialized && backgroundAudioInstance) {
            // Unmute the audio only if it was previously initialized
            
            // SAFARI FIX: Use shared AudioContext (this click is a user gesture, so it can resume)
            resumeAudioContext().then(() => {
              logger.log('[audio.js] AudioContext resumed on unmute');
            }).catch(e => {
              logger.warn('[audio.js] Error resuming AudioContext on unmute:', e);
            });
            
            // Set volume before playing
            backgroundAudioInstance.volume = 0.22;

            // ALWAYS try to play when unmuting, regardless of paused state
            // Browser state can be unpredictable (auto-suspend, context issues)
            // Calling play() on already-playing audio is harmless
            logger.log('[audio.js] Unmuting - attempting to play audio');
            
            // SAFARI FIX: Wrap in async IIFE to properly await the AudioContext resume
            (async () => {
              try {
                await backgroundAudioInstance.play();
                logger.log('[audio.js] Audio resumed successfully on unmute');
              } catch (error) {
                logger.warn("Audio play was prevented on unmute:", error);

                // If play failed, mark as not initialized so it can be retried
                audioInitialized = false;

                // Only try to replay if enter was clicked previously
                if (enterButtonClicked) {
                  playBackgroundAudio(true);
                }
            }
            })();
          }
        }
      }
    });
  }
}

// Export the state for other modules to read, but not directly modify
export const getAudioState = () => ({
  audioInitialized,
  audioMuted,
  userInteracted,
  heroAnimationComplete,
  backgroundAudioLoaded,
  enterButtonClicked,
  backgroundAudioInstance,
});

// Functions to update internal state (called by other modules)
export function setHeroAnimationComplete(value) {
  heroAnimationComplete = value;
  // Also set window properties for backward compatibility
  window.heroAnimationComplete = value;
}

export function setEnterButtonClicked(value) {
  enterButtonClicked = value;
  // Also set window properties for backward compatibility
  window.enterButtonClicked = value;
}

export function setUserInteracted(value) {
  userInteracted = value;
  // Also set window properties for backward compatibility
  window.userInteracted = value;
}

export function toggleMute() {
  audioMuted = !audioMuted;
  const soundToggle = document.querySelector(".sound-toggle");
  if (soundToggle) {
    if (audioMuted) {
      soundToggle.classList.add("muted");
    } else {
      soundToggle.classList.remove("muted");
    }
  }

  // Update audio volume
  if (backgroundAudioInstance) {
    backgroundAudioInstance.volume = audioMuted ? 0 : 0.22;
  }
}
