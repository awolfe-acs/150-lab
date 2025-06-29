// Import video and poster as assets
import videoUrl from "../../public/video/acs-150-compressed.mp4?url";
import posterUrl from "../../public/images/anniversary-video-poster.jpg?url";

export function initVideo() {
  const videoElement = document.getElementById("anniversary-video");
  const videoSection = document.querySelector("#video");

  if (!videoElement || !videoSection) return;

  // Assets are now imported directly, no need for path logic

  // Use imported assets directly
  console.log("Setting video source:", videoUrl);
  videoElement.src = videoUrl;

  // Set poster path using imported asset
  console.log("Setting poster path:", posterUrl);
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
    console.log("Video data loaded successfully");
    videoElement.style.opacity = "1";
    // Ensure video starts paused
    videoElement.pause();
  });

  // Add loadedmetadata event to ensure video is ready
  videoElement.addEventListener("loadedmetadata", () => {
    console.log("Video metadata loaded successfully");
    console.log("Current poster path:", videoElement.poster);
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
    // Fade in background music when video ends
    if (window.backgroundAudio) {
      fadeAudio(window.backgroundAudio, 0.08);
    }
  });

  // Handle video pause (when user clicks video controls)
  videoElement.addEventListener("pause", () => {
    overlay.classList.remove("hidden");
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
