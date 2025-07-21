// ui/audio.js
// All audio loading, playback, and toggle logic

import uiClickAudioUrl from "../../../public/audio/ui-click.mp3?url";
import backgroundAudioUrl from "../../../public/audio/chemistry-3-final.mp3?url";
import gsap from "gsap";

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

// Initialize UI click sound
function initializeUIClickSound() {
  if (!uiClickSound) {
    uiClickSound = new Audio(uiClickAudioUrl);
    uiClickSound.volume = 0.35;
    uiClickSound.preload = "auto";
  }
}

// Play UI click sound
const playUIClickSound = () => {
  if (audioMuted) return;

  try {
    // Initialize if needed
    if (!uiClickSound) {
      initializeUIClickSound();
    }

    // Clone the audio to allow multiple overlapping sounds
    const clickSound = uiClickSound.cloneNode();
    clickSound.volume = 0.35;
    clickSound.play().catch((error) => {
      console.warn("UI click sound play was prevented:", error);
    });
  } catch (error) {
    console.error("Error playing UI click sound:", error);
  }
};

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
          } else if (node.querySelectorAll) {
            // Check for audio/video elements inside the added node
            const audioNodes = node.querySelectorAll("audio, video");
            audioNodes.forEach((audioNode) => {
              handleNewAudioElement(audioNode);
            });
          }
        });
      }
    });
  });

  // Start observing the document body for added nodes
  audioObserver.observe(document.body, { childList: true, subtree: true });
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
    console.warn(`Exceeded maximum audio retry attempts (${maxAudioRetries}). Stopping retries.`);
    return;
  }

  try {
    // Play the audio at 22% volume
    backgroundAudioInstance.volume = 0.22;

    // Create a user gesture for Safari if needed
    if (fromEnterButton) {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createBufferSource();
        source.connect(audioContext.destination);
        source.start(0);
      } catch (e) {
        console.warn("Could not create audio context:", e);
      }
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
        console.error("Audio play was prevented:", error);

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
    console.error("Error playing audio:", error);
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
        console.warn("Could not resume background audio:", error);
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
        console.warn("Could not resume background audio on focus:", error);
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
    console.log("Audio play blocked: Enter button not clicked yet");
    return;
  }

  // Allow audio to play even if hero animation isn't complete yet
  // The retry logic will handle the timing
  console.log("Audio play attempt:", {
    enterButtonClicked,
    heroAnimationComplete,
    audioInitialized,
    audioMuted,
    backgroundAudioLoaded,
    readyState: backgroundAudioInstance?.readyState,
  });

  // Don't try to play if already initialized
  if (audioInitialized) return;

  // Stop retrying after max attempts (prevents infinite loops)
  if (audioRetryCount >= maxAudioRetries) {
    console.warn(`Exceeded maximum audio retry attempts (${maxAudioRetries}). Stopping retries.`);
    // Clear any audio retry timers
    if (audioRetryTimer) {
      clearInterval(audioRetryTimer);
      audioRetryTimer = null;
    }
    return;
  }

  // Add 2-second delay when called from enter button
  if (fromEnterButton) {
    console.log("Adding 2-second delay before starting background audio");
    setTimeout(() => {
      if (audioMuted) return; // Check if audio was muted during the delay

      // Check if audio is ready to play after delay
      if (backgroundAudioLoaded || (backgroundAudioInstance && backgroundAudioInstance.readyState >= 3)) {
        playBackgroundAudioWhenReady(true);
      } else {
        console.log("Audio not ready yet after delay, readyState:", backgroundAudioInstance?.readyState);
        // Audio not ready yet - it will play when ready via the canplaythrough event
        try {
          // Try to force load again
          backgroundAudioInstance.load();
        } catch (e) {
          console.warn("Error reloading background audio:", e);
        }
      }
    }, 2000); // 2-second delay
    return;
  }

  // Check if audio is ready to play (for non-enter button calls)
  if (backgroundAudioLoaded || (backgroundAudioInstance && backgroundAudioInstance.readyState >= 3)) {
    playBackgroundAudioWhenReady(fromEnterButton);
  } else {
    console.log("Audio not ready yet, readyState:", backgroundAudioInstance?.readyState);

    // Audio not ready yet - it will play when ready via the canplaythrough event

    // If from enter button and the audio isn't loaded yet, force reload
    if (fromEnterButton) {
      try {
        // Try to force load again
        backgroundAudioInstance.load();
      } catch (e) {
        console.warn("Error reloading background audio:", e);
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
    console.log("Background audio loaded and ready to play");

    // If user has clicked the enter button but audio wasn't ready, play it now
    // IMPORTANT: Only attempt playback if enterButtonClicked is true
    if (enterButtonClicked && !audioInitialized && !audioMuted) {
      console.log("Enter button was clicked, attempting to play audio now");
      playBackgroundAudioWhenReady(true);
    }
  });

  backgroundAudio.addEventListener("error", (e) => {
    console.error("Audio loading error:", e);
    console.error("Audio src:", backgroundAudio.src);

    // In development mode, provide specific guidance
    const isDevServer = window.location.hostname === "localhost" || window.location.hostname.includes("127.0.0.1");
    if (isDevServer) {
      console.warn("Audio failed to load in dev mode. Ensure audio files are in 150-lab/public/audio/ directory.");
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
    console.error("Error loading background audio:", e);
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

  // Select all interactive elements
  const interactiveElements = document.querySelectorAll(
    'a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]'
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
                'a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]'
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
              'a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]'
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
            console.warn("UI click sound play was prevented:", error);
          });
        } catch (error) {
          console.error("Error playing UI click sound:", error);
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
                    console.warn(`Exceeded maximum audio retry attempts (${maxAudioRetries}). Stopping retries.`);
                    clearInterval(audioRetryTimer);
                    audioRetryTimer = null;
                  }
                }
              }, 500);
            }
          } else if (audioInitialized && backgroundAudioInstance) {
            // Unmute the audio only if it was previously initialized
            backgroundAudioInstance.volume = 0.22;

            // If audio was paused, restart it
            if (backgroundAudioInstance.paused) {
              backgroundAudioInstance.play().catch((error) => {
                console.warn("Audio play was prevented:", error);

                // If play failed, mark as not initialized so it can be retried
                audioInitialized = false;

                // Only try to replay if enter was clicked previously
                if (enterButtonClicked) {
                  playBackgroundAudio(true);
                }
              });
            }
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
