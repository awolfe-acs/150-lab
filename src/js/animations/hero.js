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
      start: "25% top", // Start much later - when 25% of hero-travel-area has passed top of viewport
      end: "33% top", // End when 45% of hero-travel-area has passed the top of viewport
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

// New function to initialize the cover area
export function initCoverArea() {
  const coverLogo = document.querySelector("#cover-area .cover-logo");
  const enterExperienceBtn = document.querySelector("#cover-area button.enter-experience");
  const header = document.querySelector("header");
  const nav = document.querySelector("nav");
  const sectionTimeline = document.querySelector(".section-timeline");

  if (!coverLogo || !enterExperienceBtn) return;

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

  // Hide the share button initially
  const shareButton = document.querySelector(".share-button-pinned");
  if (shareButton) {
    gsap.set(shareButton, {
      opacity: 0,
      autoAlpha: 0,
    });
  }

  // Stop Lenis scrolling until enter button is clicked
  if (window.lenis) {
    window.lenis.stop();
  }

  // Set initial nav visibility
  gsap.set(nav, {
    opacity: 1,
    autoAlpha: 1,
  });

  // Make the logo fixed position so it stays in place while scrolling
  gsap.set(coverLogo, {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1000,
  });

  // Create a timeline for the cover area animation
  const tl = gsap.timeline({ delay: 0.6 });

  // Animate the logo in
  tl.fromTo(
    coverLogo,
    {
      opacity: 0,
      scale: 0.95,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 1.8,
      ease: "power1.out",
    }
  );

  // Animate the enter button in
  tl.to(
    enterExperienceBtn,
    {
      opacity: 1,
      autoAlpha: 1,
      duration: 0.6,
      ease: "power2.out",
    },
    "-=0.3"
  );

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
          delay: 0.2,
        });
      }

      // Mark user as having interacted with the page
      window.userInteracted = true;
      setEnterButtonClicked(true);
      window.enterButtonClicked = true;

      // Enable mouse following particles
      if (window.enableMouseParticles) {
        window.enableMouseParticles();
      }

      // Try to play audio
      playBackgroundAudio(true);

      // Start audio retry timer if needed
      if (!window.audioRetryTimer) {
        window.audioRetryTimer = setInterval(() => {
          if (window.audioInitialized) {
            clearInterval(window.audioRetryTimer);
            window.audioRetryTimer = null;
          } else if (window.enterButtonClicked && !window.audioMuted) {
            if (window.audioRetryCount < window.maxAudioRetries) {
              console.log("Retrying audio playback...");
              playBackgroundAudio(true);
            } else {
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

      // Fade out the enter-experience button
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
          delay: 0.4,
          ease: "power2.out",
        });
      }

      // Reveal the sound toggle
      const soundToggle = document.querySelector(".sound-toggle");
      if (soundToggle) {
        soundToggle.classList.add("active");
      }

      // Initialize the cover logo ScrollTrigger after the enter button is clicked
      initCoverLogoScrollTrigger(coverLogo);
    });
  }
}

// Separate function to handle cover logo ScrollTrigger - moved outside click handler for better state management
function initCoverLogoScrollTrigger(coverLogo) {
  // State variables for the cover logo animation
  let isDelayedFadeInActive = false;
  let delayedFadeInTween = null;
  let lastScrollDirection = 0; // Track scroll direction: 1 = down, -1 = up
  let logoShouldBeVisible = false; // Track if logo should be visible based on scroll position

  // Create the main ScrollTrigger for cover logo fade
  const coverLogoScrollTrigger = ScrollTrigger.create({
    trigger: "#cover-travel-area",
    start: "top top",
    end: "bottom center",
    scrub: 1,
    markers: false,
    id: "cover-logo-fade",
    onUpdate: (self) => {
      const expectedOpacity = 1 - self.progress;
      lastScrollDirection = self.direction;
      logoShouldBeVisible = expectedOpacity > 0.1;

      // Always apply scroll-based opacity unless we're in active delayed fade-in
      if (!isDelayedFadeInActive) {
        gsap.set(coverLogo, { opacity: expectedOpacity, overwrite: true });
      }
      // Force fade-out if scrolling down significantly, even during delayed fade-in
      else if (self.direction === 1 && self.progress > 0.3) {
        gsap.set(coverLogo, { opacity: expectedOpacity, overwrite: true });
        // Cancel delayed fade-in if we're scrolling down too far
        if (delayedFadeInTween) {
          delayedFadeInTween.kill();
          delayedFadeInTween = null;
        }
        isDelayedFadeInActive = false;
      }
      // Special case: if we're in delayed fade-in mode but near the top and scrolling up,
      // let the delayed fade-in continue without interference
      else if (isDelayedFadeInActive && self.direction === -1 && self.progress < 0.1) {
        // Don't interfere with delayed fade-in when near the top and scrolling up
        // The delayed fade-in animation will handle the opacity
      }
    },
    onLeave: () => {
      // Clean up and hide logo when leaving trigger area
      if (delayedFadeInTween) {
        delayedFadeInTween.kill();
        delayedFadeInTween = null;
      }
      isDelayedFadeInActive = false;
      logoShouldBeVisible = false;
      gsap.set(coverLogo, { opacity: 0, overwrite: true });
    },
    onEnterBack: () => {
      // Clean up any existing delayed fade-in first
      if (delayedFadeInTween) {
        delayedFadeInTween.kill();
        delayedFadeInTween = null;
      }

      // Start logo hidden and begin delayed fade-in
      isDelayedFadeInActive = true;
      logoShouldBeVisible = true;
      gsap.set(coverLogo, { opacity: 0, overwrite: true });

      // Create delayed fade-in animation
      delayedFadeInTween = gsap.to(coverLogo, {
        opacity: 1,
        duration: 1.2,
        delay: 0.8,
        ease: "power2.out",
        overwrite: true,
        onComplete: () => {
          // Ensure we're at full opacity first
          gsap.set(coverLogo, { opacity: 1, overwrite: true });

          // Keep the logo at full opacity for a moment before handing control back
          setTimeout(() => {
            // Only hand control back to scroll-based system if we're still near the top
            // and the user hasn't scrolled significantly down
            if (coverLogoScrollTrigger.progress < 0.2) {
              // We're still near the top - maintain full opacity
              gsap.set(coverLogo, { opacity: 1, overwrite: true });
            } else {
              // User has scrolled down - apply appropriate opacity
              const currentOpacity = 1 - coverLogoScrollTrigger.progress;
              gsap.set(coverLogo, { opacity: currentOpacity, overwrite: true });
            }

            // Now hand control back to scroll-based system
            isDelayedFadeInActive = false;
            delayedFadeInTween = null;
          }, 200); // Small delay to ensure full opacity is maintained
        },
        onInterrupt: () => {
          // Handle interruption - still try to maintain full opacity if near top
          if (coverLogoScrollTrigger.progress < 0.2) {
            gsap.set(coverLogo, { opacity: 1, overwrite: true });
          }
          isDelayedFadeInActive = false;
          delayedFadeInTween = null;
        },
      });
    },
    onLeaveBack: () => {
      // Clean up when scrolling back up past trigger
      if (delayedFadeInTween) {
        delayedFadeInTween.kill();
        delayedFadeInTween = null;
      }
      isDelayedFadeInActive = false;
      logoShouldBeVisible = false;
    },
  });

  // Return the ScrollTrigger instance for external reference if needed
  return coverLogoScrollTrigger;
}

export function initHeroAnimation() {
  // Split the hero heading text into characters
  const heroHeading = document.querySelector("#hero-area h1");
  const heroNumber = document.querySelector("#hero-number");

  if (!heroHeading || !heroNumber) return;

  // Save the original content before any splitting for future reinitializations
  if (!heroHeading.getAttribute("data-original-content")) {
    heroHeading.setAttribute("data-original-content", heroHeading.textContent);
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

  // Initialize the CSS custom property for digit opacity
  heroNumber.style.setProperty("--digit-opacity", "0");

  // Create individual spans for each digit - simplified
  initialNumber.split("").forEach((digit) => {
    const digitSpan = document.createElement("span");
    digitSpan.className = "digit";
    digitSpan.textContent = digit;
    digitSpan.setAttribute("data-digit", digit);
    // No need to set individual opacity or visibility - CSS custom property handles it
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

  // Randomize the characters for reveal
  const shuffledChars = [...splitText.chars];
  for (let i = shuffledChars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledChars[i], shuffledChars[j]] = [shuffledChars[j], shuffledChars[i]];
  }

  // Create a timeline for the scroll-triggered animation
  const heroAnimationTl = gsap.timeline({
    paused: true,
    onComplete: () => {
      // Mark hero animation as complete
      setHeroAnimationComplete(true);
      window.heroAnimationComplete = true;

      // Dispatch event to initialize fancy buttons
      const heroAnimationCompleteEvent = new CustomEvent("heroAnimationComplete");
      document.dispatchEvent(heroAnimationCompleteEvent);
    },
  });

  // First, fade in the h1 container element
  heroAnimationTl.to(heroHeading, {
    opacity: 1,
    autoAlpha: 1,
    duration: 0.8,
    ease: "power2.out",
  });

  // Animate each character with a random fade-in and unblur effect
  heroAnimationTl.to(shuffledChars, {
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
  heroAnimationTl.to(heroNumber, {
    opacity: 1,
    autoAlpha: 1, // Uses visibility and opacity together
    duration: 0.5,
    ease: "power1.inOut",
  });

  // Modified digit reveal animation - slower fade-in with z-axis movement
  const digits = heroNumber.querySelectorAll(".digit");
  heroAnimationTl.fromTo(
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
    },
    "-=0.6" // Slight overlap
  );

  // Create ScrollTrigger for hero animation
  ScrollTrigger.create({
    trigger: "#hero-travel-area",
    start: "top 60%", // Start later when hero-travel-area is 60% into viewport
    end: "top 10%", // End when hero-travel-area is 10% from top of viewport
    animation: heroAnimationTl,
    scrub: 2, // Slower scrubbing for more gradual animation
    markers: false,
    invalidateOnRefresh: true,
    onEnter: () => {
      // Dispatch event to start particle fade-in when entering hero area
      const veryEarlyFadeEvent = new CustomEvent("veryEarlyParticleFade");
      document.dispatchEvent(veryEarlyFadeEvent);
    },
  });

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

    // Remove the separate opacity animation - we'll handle it in the countdown animation

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
          end: "75% bottom", // Reach 1876 earlier - at 75% through hero-travel-area
          scrub: 1.5, // Slightly slower scrubbing for more gradual countdown
          markers: false,
          invalidateOnRefresh: true, // **CRITICAL**
          onUpdate: function (self) {
            // Calculate the year value based on scroll progress
            // Progress 0 = 2026, Progress 1 = 1876
            const currentYear = Math.round(2026 - self.progress * 150); // 2026 - 150 = 1876
            animationState.heroYearObj.year = currentYear; // Update the state object

            // Calculate opacity based on progress: 0.44 at start (2026) to 1.0 at end (1876)
            const opacity = 0.44 + self.progress * 0.56; // 0.44 + (progress * 0.56) = 0.44 to 1.0

            const yearValue = currentYear.toString();
            const currentDigits = heroNumber.querySelectorAll(".digit");
            const newDigits = yearValue.split("");

            if (currentDigits.length !== newDigits.length) {
              heroNumber.innerHTML = "";
              newDigits.forEach((digit) => {
                const digitSpan = document.createElement("span");
                digitSpan.className = "digit";
                digitSpan.textContent = digit;
                digitSpan.setAttribute("data-digit", digit);
                // No need to set individual opacity - CSS will handle it via custom property
                digitSpan.style.visibility = "visible";
                heroNumber.appendChild(digitSpan);
              });
            } else {
              // Update existing digits with new content
              currentDigits.forEach((digitSpan, index) => {
                if (digitSpan.textContent !== newDigits[index]) {
                  digitSpan.textContent = newDigits[index];
                  digitSpan.setAttribute("data-digit", newDigits[index]);
                }
              });
            }

            // Apply opacity via CSS custom property on the parent element
            // This ensures ALL .digit elements get the same opacity simultaneously
            heroNumber.style.setProperty("--digit-opacity", opacity);

            // Also set visibility on parent to ensure all digits are visible
            heroNumber.style.visibility = "visible";
          },
          onComplete: function () {
            // Ensure the number stays at 1876 after countdown completes
            animationState.heroYearObj.year = 1876;
            const heroNumber = document.querySelector("#hero-number");
            if (heroNumber) {
              const currentDigits = heroNumber.querySelectorAll(".digit");
              const newDigits = "1876".split("");

              currentDigits.forEach((digitSpan, index) => {
                if (digitSpan.textContent !== newDigits[index]) {
                  digitSpan.textContent = newDigits[index];
                  digitSpan.setAttribute("data-digit", newDigits[index]);
                }
                // No need to set individual opacity - CSS custom property handles it
                digitSpan.style.visibility = "visible";
              });

              // Set full opacity via CSS custom property for perfect synchronization
              heroNumber.style.setProperty("--digit-opacity", "1.0");
              heroNumber.style.visibility = "visible";
            }
          },
          onLeaveBack: function (self) {
            // Ensure we reset to 2026 when scrolling back up
            animationState.heroYearObj.year = 2026;
            const heroNumber = document.querySelector("#hero-number");
            if (heroNumber) {
              const currentDigits = heroNumber.querySelectorAll(".digit");
              const newDigits = "2026".split("");

              currentDigits.forEach((digitSpan, index) => {
                if (digitSpan.textContent !== newDigits[index]) {
                  digitSpan.textContent = newDigits[index];
                  digitSpan.setAttribute("data-digit", newDigits[index]);
                }
                // No need to set individual opacity - CSS custom property handles it
                digitSpan.style.visibility = "visible";
              });

              // Set initial opacity via CSS custom property for perfect synchronization
              heroNumber.style.setProperty("--digit-opacity", "0.44");
              heroNumber.style.visibility = "visible";
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

    // Special handling for the cover area
    if (el.id === "cover-area") {
      ScrollTrigger.create({
        trigger: "#cover-travel-area", // Use cover-travel-area as the trigger
        start: "top top", // Start pinning when cover-travel-area reaches top
        end: "bottom top", // End when bottom of cover-travel-area passes top of viewport
        pin: el, // Pin the cover-area element
        pinSpacing: false,
        anticipatePin: 1, // Help prevent flickering during pin
        onLeaveBack: (self) => {
          // Reset when scrolling back up
          self.pin.style.transform = "translate3d(0px, 0px, 0px)";
        },
      });
    }
    // Special handling for the hero area
    else if (el.id === "hero-area") {
      ScrollTrigger.create({
        trigger: el, // Use the hero-area element itself as the trigger
        endTrigger: "#hero-travel-area", // Use hero-travel-area as the end trigger
        start: "top top", // Pin immediately when hero-area reaches top of viewport
        end: "bottom bottom", // End when the bottom of the wrapper reaches the bottom of viewport
        pin: el,
        pinSpacing: false,
        anticipatePin: 1, // Help prevent flickering during pin
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
