// animations/hero.js
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { animationState } from "../config/animationConfig.js";
import { createScrollDownIcon } from "../ui/scrollDownIcon.js";
import {
  preloadBackgroundAudio,
  setHeroAnimationComplete,
  setEnterButtonClicked,
  playBackgroundAudio,
} from "../ui/audio.js";

// Function to set up hero heading character fade animations
export function setupHeroHeadingFadeAnimation() {
  // Clean up existing ScrollTrigger if it exists
  if (animationState.heroHeadingFadeScrollTrigger) {
    animationState.heroHeadingFadeScrollTrigger.kill();
    animationState.heroHeadingFadeScrollTrigger = null; // Ensure reference is cleared
  }

  const heroHeading = document.querySelector("#hero-area h1");
  if (heroHeading) {
    // Make sure we have the SplitType characters to animate
    let splitTextChars = heroHeading.querySelectorAll(".char");

    // If characters don't exist yet (e.g., if initial split failed or was reverted)
    if (!splitTextChars || splitTextChars.length === 0) {
      // Get original content if available, otherwise use current text
      const originalContent = heroHeading.getAttribute("data-original-content") || heroHeading.textContent;

      // Reset the heading to original content before splitting again
      heroHeading.innerHTML = originalContent;

      // Apply SplitType to create character elements
      try {
        const splitText = new SplitType(heroHeading, {
          types: "words,chars",
          absolute: false,
        });
        splitTextChars = splitText.chars;

        // Make all chars visible as a starting point after re-split
        gsap.set(splitTextChars, {
          opacity: 1,
          z: 0,
          scale: 1,
          filter: "blur(0px)",
          transformPerspective: 1000,
          transformOrigin: "center center",
        });
      } catch (error) {
        console.error("Error re-splitting hero heading:", error);
        return; // Exit if splitting fails
      }
    }

    // Ensure we have characters to animate now
    if (!splitTextChars || splitTextChars.length === 0) {
      console.warn("Still no hero heading characters found after attempting re-split. Aborting animation setup.");
      return;
    }

    // Force a reflow *after* splitting to ensure proper positioning
    heroHeading.offsetHeight;

    // Randomize the characters for fade-out (different order than fade-in)
    const shuffledChars = [...splitTextChars];
    for (let i = shuffledChars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledChars[i], shuffledChars[j]] = [shuffledChars[j], shuffledChars[i]];
    }

    // Create a timeline for the scroll-triggered fade-out
    const fadeOutTl = gsap.timeline({
      // Ensure timeline pauses initially to prevent premature animation
      paused: true,
    });

    // Animate each character to fade out and move back in Z space
    fadeOutTl.to(
      shuffledChars,
      {
        opacity: 0,
        z: -50,
        stagger: 0.02,
        ease: "power1.in",
      },
      0
    );

    // Create and store the ScrollTrigger instance
    animationState.heroHeadingFadeScrollTrigger = ScrollTrigger.create({
      animation: fadeOutTl,
      trigger: "#hero-travel-area",
      start: "top center", // Start when the top of hero-travel-area reaches the center of viewport
      end: "top top", // End when the top of hero-travel-area reaches the top of viewport
      scrub: true, // Makes the animation scrubbable with scroll
      markers: false, // Set to true for debugging
      invalidateOnRefresh: true, // **CRITICAL** Recalculate positions on refresh
      onUpdate: (self) => {
        // Update character opacities based on scroll position
        // (Handled by scrub automatically linking timeline progress to scroll progress)

        // Check if scrolling back up near the top
        if (self.direction === -1 && self.progress < 0.1) {
          // Make sure chars are fully visible when scrolling back to top
          gsap.set(splitTextChars, {
            opacity: 1,
            z: 0,
          });
        }
      },
      onRefresh: (self) => {
        // When ScrollTrigger refreshes (after resize), immediately update animation
        // progress to match current scroll position based on *new* boundaries.
        const progress = self.progress;
        fadeOutTl.progress(progress); // Update the timeline's progress
      },
    });
  } else {
    console.warn("#hero-area h1 not found for fade animation setup.");
  }
}

export function initHeroAnimation() {
  // Split the hero heading text into characters
  const heroHeading = document.querySelector("#hero-area h1");
  const heroNumber = document.querySelector("#hero-number");
  const header = document.querySelector("header");
  const nav = document.querySelector("nav");
  const sectionTimeline = document.querySelector(".section-timeline");
  const enterExperienceBtn = document.querySelector("button.enter-experience");

  if (!heroHeading || !heroNumber) return;

  // Save the original content before any splitting for future reinitializations
  if (!heroHeading.getAttribute("data-original-content")) {
    heroHeading.setAttribute("data-original-content", heroHeading.textContent);
  }

  // Hide header and section-timeline initially
  if (header) {
    gsap.set(header, {
      opacity: 0,
      autoAlpha: 0,
    });
  }

  if (sectionTimeline) {
    gsap.set(sectionTimeline, {
      opacity: 0,
      autoAlpha: 0,
    });
  }

  // Hide enter-experience button initially but don't apply transform
  // This avoids conflicts with fancy-btn effects
  if (enterExperienceBtn) {
    gsap.set(enterExperienceBtn, {
      opacity: 0,
      autoAlpha: 0,
    });
  }

  // Hide the share button initially
  const shareButton = document.querySelector(".share-button-pinned");
  if (shareButton) {
    gsap.set(shareButton, {
      opacity: 0,
      autoAlpha: 0,
    });
  }

  // Stop Lenis scrolling until animations complete or button is clicked
  if (window.lenis) {
    window.lenis.stop();
  }

  // Reset any existing animations and scroll triggers
  ScrollTrigger.getAll().forEach((trigger) => {
    if (trigger.vars.trigger === "#hero-area" || trigger.vars.trigger === "#hero-travel-area") {
      trigger.kill();
    }
  });

  // Also save the original hero number for future reinitializations
  const initialNumber = heroNumber.innerText || "2026";
  if (!heroNumber.getAttribute("data-original-content")) {
    heroNumber.setAttribute("data-original-content", initialNumber);
  }

  heroNumber.innerHTML = ""; // Clear the content

  // Create individual spans for each digit - simplified
  initialNumber.split("").forEach((digit) => {
    const digitSpan = document.createElement("span");
    digitSpan.className = "digit";
    digitSpan.textContent = digit;
    digitSpan.setAttribute("data-digit", digit);
    // Immediately hide the digit to prevent flickering
    digitSpan.style.opacity = "0";
    digitSpan.style.visibility = "hidden";
    heroNumber.appendChild(digitSpan);
  });

  // Hide the number initially
  gsap.set(heroNumber, {
    opacity: 0,
    autoAlpha: 0, // Uses visibility and opacity together
  });

  // Also hide the heroHeading (h1) element itself initially
  gsap.set(heroHeading, {
    opacity: 0,
    autoAlpha: 0,
  });

  // Split the text into words first, then characters to prevent mid-word breaks
  const splitText = new SplitType(heroHeading, {
    types: "words,chars",
    absolute: false,
  });

  // Hide all characters initially and add blur effect
  gsap.set(splitText.chars, {
    opacity: 0,
    z: 150, // Start with a positive z value to appear larger (coming toward viewer)
    scale: 1.2, // Slightly larger scale to enhance the effect
    transformPerspective: 1000, // Increase perspective for more dramatic 3D effect
    transformOrigin: "center center",
    filter: "blur(16px)", // Add initial blur effect
  });

  // Create a timeline for the animation
  const tl = gsap.timeline({ delay: 0.5 });

  // First, fade in the h1 container element
  tl.to(heroHeading, {
    opacity: 1,
    autoAlpha: 1,
    duration: 0.8,
    ease: "power2.out",
  });

  // Dispatch event to start particle fade-in at the very beginning of the animation
  const veryEarlyFadeEvent = new CustomEvent("veryEarlyParticleFade");
  setTimeout(() => {
    document.dispatchEvent(veryEarlyFadeEvent);
  }, 840);

  // Randomize the characters for reveal
  const shuffledChars = [...splitText.chars];
  for (let i = shuffledChars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledChars[i], shuffledChars[j]] = [shuffledChars[j], shuffledChars[i]];
  }

  // Animate each character with a random fade-in and unblur effect
  tl.to(shuffledChars, {
    opacity: 1,
    z: 0, // Move to final position on Z axis (regular size)
    scale: 1, // Return to normal scale
    filter: "blur(0px)", // Clear the blur effect
    duration: 1.25, // Slightly longer duration for more visible effect
    stagger: 0.03,
    ease: "power2.out", // Smoother easing
    onComplete: () => {
      // Trigger particle fade-in earlier - after text animation completes
      const earlyFadeEvent = new CustomEvent("particleFadeStart");
      document.dispatchEvent(earlyFadeEvent);
    },
  });

  // After all characters are revealed, show the number
  tl.to(heroNumber, {
    opacity: 1,
    autoAlpha: 1, // Uses visibility and opacity together
    duration: 0.5,
    ease: "power1.inOut",
  });

  gsap.set(nav, {
    opacity: 1,
    autoAlpha: 1,
  });

  // Modified digit reveal animation - slower fade-in with z-axis movement
  const digits = heroNumber.querySelectorAll(".digit");
  tl.fromTo(
    digits,
    {
      opacity: 0,
      autoAlpha: 0, // Use autoAlpha to handle both opacity and visibility
      y: 10,
      z: -120, // Start further back in z-space
      transformPerspective: 1000, // Add perspective for 3D effect
      transformOrigin: "center center",
    },
    {
      opacity: 0.44, // Fade in to 0.44 opacity as requested
      autoAlpha: 0.44, // Use autoAlpha to ensure visibility is also set
      y: 0,
      z: 0,
      duration: 2.5, // Much longer duration for slower fade-in
      stagger: 0.1, // Slightly longer stagger
      ease: "power3.out",
      onComplete: () => {
        // Mark hero animation as complete
        setHeroAnimationComplete(true);
        window.heroAnimationComplete = true; // Keep for backward compatibility

        // Dispatch event to initialize fancy buttons
        const heroAnimationCompleteEvent = new CustomEvent("heroAnimationComplete");
        document.dispatchEvent(heroAnimationCompleteEvent);
      },
    },
    "-=0.6" // Slight overlap
  );

  // Fade in the enter-experience button after hero number animation completes
  // Only change opacity, not position or scale
  if (enterExperienceBtn) {
    gsap.to(enterExperienceBtn, {
      opacity: 1,
      autoAlpha: 1,
      duration: 0.8,
      delay: 3.8,
      ease: "power2.out",
    });
  }

  // Add click event listener to the enter-experience button
  if (enterExperienceBtn) {
    enterExperienceBtn.addEventListener("click", () => {
      // Fade in header
      if (header) {
        gsap.to(header, {
          opacity: 1,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power2.inOut",
        });
      }

      // Fade in section-timeline
      if (sectionTimeline) {
        gsap.to(sectionTimeline, {
          opacity: 1,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power2.inOut",
          delay: 0.2, // Slight delay after header starts fading in
        });
      }

      // Mark user as having interacted with the page and explicitly set the flag
      window.userInteracted = true;
      setEnterButtonClicked(true);
      window.enterButtonClicked = true; // Keep for backward compatibility

      // Enable mouse following particles
      if (window.enableMouseParticles) {
        window.enableMouseParticles();
      }

      // Try to play audio - with multiple attempts if needed
      playBackgroundAudio(true); // Pass true to indicate this is from the enter button

      // Start a timer to keep trying to play audio every 500ms
      if (!window.audioRetryTimer) {
        window.audioRetryTimer = setInterval(() => {
          if (window.audioInitialized) {
            // Audio started successfully, clear the retry timer
            clearInterval(window.audioRetryTimer);
            window.audioRetryTimer = null;
          } else if (window.enterButtonClicked && window.heroAnimationComplete && !window.audioMuted) {
            // Try again if the audio hasn't started yet, but respect max retries
            if (window.audioRetryCount < window.maxAudioRetries) {
              playBackgroundAudio(true);
            } else {
              // Stop trying after max retries
              console.warn(`Exceeded maximum audio retry attempts (${window.maxAudioRetries}). Stopping retries.`);
              clearInterval(window.audioRetryTimer);
              window.audioRetryTimer = null;
            }
          }
        }, 500);
      }

      // Re-enable Lenis scrolling
      if (window.lenis) {
        window.lenis.start();
      }

      // Fade out the enter-experience button - only opacity, not position
      gsap.to(enterExperienceBtn, {
        opacity: 0,
        autoAlpha: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          // Create and show scroll down icon after button fades out
          createScrollDownIcon(enterExperienceBtn);
        },
      });

      // Reveal the share button
      if (shareButton) {
        gsap.to(shareButton, {
          opacity: 1,
          autoAlpha: 1,
          duration: 0.8,
          delay: 0.4, // Slight delay after other elements start fading in
          ease: "power2.out",
        });
      }

      // Reveal the sound toggle
      const soundToggle = document.querySelector(".sound-toggle");
      if (soundToggle) {
        soundToggle.classList.add("active");
      }
    });
  }

  // Initialize the hero animation

  // Create the hero number animation (size/scale/opacity)
  if (heroNumber) {
    // Scale animation
    gsap.to(heroNumber, {
      scale: 0.5,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero-travel-area",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        markers: false,
        invalidateOnRefresh: true, // Ensure this recalculates
      },
    });

    // Opacity animation (from 0.44 to 1)
    ScrollTrigger.create({
      trigger: "#hero-travel-area",
      start: "top top",
      end: "20% top",
      scrub: true,
      markers: false,
      invalidateOnRefresh: true, // Ensure this recalculates
      onUpdate: function (self) {
        const progress = self.progress;
        const opacity = 0.44 + progress * 0.56;
        const digits = heroNumber.querySelectorAll(".digit");
        // Use GSAP.set for more reliable style application
        gsap.set(digits, {
          opacity: opacity,
          visibility: "visible", // Ensure visibility is always visible during this phase
        });
      },
    });

    // Fade-out animation (approaching video area)
    ScrollTrigger.create({
      trigger: "#video-travel-area",
      start: "top bottom",
      end: "top 90%",
      scrub: true,
      markers: false,
      invalidateOnRefresh: true, // Ensure this recalculates
      onUpdate: function (self) {
        const progress = self.progress;
        const opacity = 1 - progress;
        // Use GSAP.set for more reliable style application
        gsap.set(heroNumber, { opacity: opacity });
      },
    });
  }
}

export function initHeroNumberCountdown() {
  const heroNumber = document.querySelector("#hero-number");
  if (heroNumber) {
    // Create the tween ONLY if it doesn't exist
    if (!animationState.heroNumberTween) {
      animationState.heroNumberTween = gsap.to(animationState.heroYearObj, {
        // Assign to module-scope variable
        year: 1876,
        ease: "none",
        paused: true, // Start paused, ScrollTrigger will control it
        scrollTrigger: {
          trigger: "#hero-travel-area",
          start: "top top",
          end: "70% 70%",
          scrub: true, // Links tween progress to scroll progress
          markers: false,
          invalidateOnRefresh: true, // **CRITICAL**
          onUpdate: function (self) {
            // Log progress and year value before updating DOM
            const yearValue = Math.round(animationState.heroYearObj.year).toString();
            const currentDigits = heroNumber.querySelectorAll(".digit");
            const newDigits = yearValue.split("");

            if (currentDigits.length !== newDigits.length) {
              // Store current opacity before clearing
              const currentOpacity =
                currentDigits.length > 0 ? window.getComputedStyle(currentDigits[0]).opacity : "0.44";

              heroNumber.innerHTML = "";
              newDigits.forEach((digit) => {
                const digitSpan = document.createElement("span");
                digitSpan.className = "digit";
                digitSpan.textContent = digit;
                digitSpan.setAttribute("data-digit", digit);
                heroNumber.appendChild(digitSpan);
              });

              // Use GSAP to set the proper initial state for new digits
              const newDigitElements = heroNumber.querySelectorAll(".digit");
              gsap.set(newDigitElements, {
                opacity: currentOpacity,
                visibility: "visible",
              });
            } else {
              currentDigits.forEach((digitSpan, index) => {
                if (digitSpan.textContent !== newDigits[index]) {
                  digitSpan.textContent = newDigits[index];
                  digitSpan.setAttribute("data-digit", newDigits[index]);
                }
              });
            }
          },
          onRefresh: (self) => {},
        },
      });
    } else {
      // If the tween exists, ensure its ScrollTrigger is enabled (might be needed if killed previously)
      if (animationState.heroNumberTween.scrollTrigger) {
        animationState.heroNumberTween.scrollTrigger.enable();
      }
      animationState.heroNumberTween.resume(); // Ensure tween is not paused
    }
  } else {
    console.warn("#hero-number element not found for countdown animation.");
  }
}

export function initHeroPinning() {
  // Modify the pin-top-top animation for the hero area to unpin at the end of the hero number animation
  document.querySelectorAll(".pin-top-top").forEach(function (el) {
    let wrapper = el.parentElement;

    // Special handling for the hero area
    if (el.id === "hero-area") {
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom", // End when the bottom of the wrapper reaches the bottom of viewport
        pin: el,
        pinSpacing: false,
        endTrigger: "#hero-travel-area", // Use hero-travel-area as the end trigger
        onLeaveBack: (self) => {
          // Reset when scrolling back up
          self.pin.style.transform = "translate3d(0px, 0px, 0px)";
        },
      });
    } else {
      // Default behavior for other elements
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        pin: el,
        pinSpacing: false,
      });
    }
  });
}
