// Import video and poster as assets
import videoUrl from "../../public/video/acs-150-compressed.mp4?url";
import posterUrl from "../../public/images/anniversary-video-poster.jpg?url";

// Flag to indicate when sound toggle is triggered by video slider
let videoSliderTriggeredUnmute = false;

export function initVideo() {
  const videoElement = document.getElementById("anniversary-video");
  const videoSection = document.querySelector("#video");

  if (!videoElement || !videoSection) return;

  // Assets are now imported directly, no need for path logic

  // Use imported assets directly
  videoElement.src = videoUrl;

  // Set poster path using imported asset
  videoElement.poster = posterUrl;

  // Add error event listener to check if the video file can be loaded
  videoElement.addEventListener("error", (e) => {
    console.error("Video loading error:", e);
    console.error("Video src:", videoElement.src);
    console.error("Video error code:", videoElement.error?.code);
    console.error("Video error message:", videoElement.error?.message);
  });

  // Add loadeddata event to ensure video is ready
  videoElement.addEventListener("loadeddata", () => {
    videoElement.style.opacity = "1";
    // Ensure video starts paused
    videoElement.pause();
  });

  // Add loadedmetadata event to ensure video is ready
  videoElement.addEventListener("loadedmetadata", () => {
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
    background: rgba(251, 225, 57, 0.9);
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
    background: rgba(251, 225, 57, 1);
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
  const videoWrapper = videoElement.parentNode;

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

  // Function to fade audio
  const fadeAudio = (audioElement, targetVolume, duration = 1000) => {
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
  };

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
        overlay.classList.remove("hidden");
        // Hide audio slider when video is paused
        audioSlider.style.opacity = "0";
        audioSlider.style.pointerEvents = "none";
        // Fade in background music only if not muted
        if (window.backgroundAudio && !window.audioMuted) {
          fadeAudio(window.backgroundAudio, 0.25);
        }
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
      overlay.classList.remove("hidden");
      // Hide audio slider when video is paused
      audioSlider.style.opacity = "0";
      audioSlider.style.pointerEvents = "none";
      // Fade in background music only if not muted
      if (window.backgroundAudio && !window.audioMuted) {
        fadeAudio(window.backgroundAudio, 0.25);
      }
    }
  };

  // Handle play/pause
  const handlePlayPause = () => {
    if (videoElement.paused) {
      // Clear any existing fade timeout
      if (scrollAwayFadeTimeout) {
        clearTimeout(scrollAwayFadeTimeout);
        scrollAwayFadeTimeout = null;
      }

      videoElement.play();
      overlay.classList.add("hidden");
      // Fade out background music and ensure video audio is playing
      if (window.backgroundAudio) {
        fadeAudio(window.backgroundAudio, 0);
      }
      // Restore original volume or set based on global audio state
      if (window.audioMuted) {
        videoElement.volume = 0;
        videoElement.muted = true;
      } else {
        // Restore the original volume that was set before scroll-away fade
        videoElement.muted = false;
        videoElement.volume = originalVideoVolume;
      }
      // Update slider after setting volume
      updateSlider();
      // Ensure smooth updates are started
      startSmoothUpdates();
    } else {
      pauseVideoAndShowOverlay();
    }
  };

  // Add click handlers
  overlay.addEventListener("click", handlePlayPause);
  videoElement.addEventListener("click", handlePlayPause);

  // Handle video end
  videoElement.addEventListener("ended", () => {
    overlay.classList.remove("hidden");
    // Hide audio slider when video ends
    audioSlider.style.opacity = "0";
    audioSlider.style.pointerEvents = "none";
    // Fade in background music when video ends only if not muted
    if (window.backgroundAudio && !window.audioMuted) {
      fadeAudio(window.backgroundAudio, 0.25);
    }
  });

  // Handle video pause (when user clicks video controls)
  videoElement.addEventListener("pause", () => {
    overlay.classList.remove("hidden");
    // Hide audio slider when video is paused
    audioSlider.style.opacity = "0";
    audioSlider.style.pointerEvents = "none";
    // Fade in background music only if not muted
    if (window.backgroundAudio && !window.audioMuted) {
      fadeAudio(window.backgroundAudio, 0.25);
    }
  });

  // Create Intersection Observer to handle video visibility
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          // Video is out of view, fade out audio and then pause
          fadeOutAndPauseVideo();
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
