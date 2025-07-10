// Import video and poster as assets
import videoUrl from "../../public/video/acs-150-compressed.mp4?url";
import posterUrl from "../../public/images/anniversary-video-poster.jpg?url";

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

  // Audio slider functionality
  let isDragging = false;

  const updateSlider = () => {
    const volume = videoElement.volume;
    const percentage = volume * 100;
    fill.style.width = percentage + "%";
    thumb.style.left = percentage + "%";
  };

  const setVolume = (clientX) => {
    const rect = track.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const volume = percentage / 100;
    videoElement.volume = volume;
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

  // Initialize slider position
  updateSlider();

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

  // Function to pause video and show overlay
  const pauseVideoAndShowOverlay = () => {
    if (!videoElement.paused) {
      videoElement.pause();
      overlay.classList.remove("hidden");
      // Hide audio slider when video is paused
      audioSlider.style.opacity = "0";
      audioSlider.style.pointerEvents = "none";
      // Fade in background music
      if (window.backgroundAudio) {
        fadeAudio(window.backgroundAudio, 0.08);
      }
    }
  };

  // Handle play/pause
  const handlePlayPause = () => {
    if (videoElement.paused) {
      videoElement.play();
      overlay.classList.add("hidden");
      // Fade out background music and ensure video audio is playing
      if (window.backgroundAudio) {
        fadeAudio(window.backgroundAudio, 0);
      }
      // Set video volume based on global audio state - use 0.5 volume when not muted
      videoElement.volume = window.audioMuted ? 0 : 0.5;
      // Update slider after setting volume
      updateSlider();
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
    // Fade in background music when video ends
    if (window.backgroundAudio) {
      fadeAudio(window.backgroundAudio, 0.08);
    }
  });

  // Handle video pause (when user clicks video controls)
  videoElement.addEventListener("pause", () => {
    overlay.classList.remove("hidden");
    // Hide audio slider when video is paused
    audioSlider.style.opacity = "0";
    audioSlider.style.pointerEvents = "none";
    // Fade in background music
    if (window.backgroundAudio) {
      fadeAudio(window.backgroundAudio, 0.08);
    }
  });

  // Create Intersection Observer to handle video visibility
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          // Video is out of view, pause it and show overlay
          pauseVideoAndShowOverlay();
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
    // Update video volume based on global audio state - use 0.5 volume when not muted
    if (!videoElement.paused) {
      videoElement.volume = window.audioMuted ? 0 : 0.5;
      // Update slider after volume change
      updateSlider();
    }
  };

  // Watch for sound toggle clicks
  const soundToggle = document.querySelector(".sound-toggle");
  if (soundToggle) {
    soundToggle.addEventListener("click", updateVideoAudioState);
  }

  // Also check for changes to the window.audioMuted property
  // This creates a setter/getter for the audioMuted property to detect changes
  let _audioMuted = window.audioMuted;
  Object.defineProperty(window, "audioMuted", {
    get: function () {
      return _audioMuted;
    },
    set: function (value) {
      _audioMuted = value;
      // When audioMuted changes, update video volume
      updateVideoAudioState();
    },
  });
}
