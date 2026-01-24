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
import logger from "../utils/logger.js";

// Store SplitType instances for cleanup
let heroHeadingSplitInstance = null;
let heroHeadingFadeSplitInstance = null;

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
        // Clean up previous instance if it exists
        if (heroHeadingFadeSplitInstance) {
          heroHeadingFadeSplitInstance.revert();
          heroHeadingFadeSplitInstance = null;
        }
        
        heroHeadingFadeSplitInstance = new SplitType(heroHeading, {
          types: "words,chars",
          absolute: false,
        });
        splitTextChars = heroHeadingFadeSplitInstance.chars;

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
        logger.error("Error re-splitting hero heading:", error);
        return; // Exit if splitting fails
      }
    }

    // Ensure we have characters to animate now
    if (!splitTextChars || splitTextChars.length === 0) {
      logger.warn("Still no hero heading characters found after attempting re-split. Aborting animation setup.");
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
        filter: "blur(16px)", // Add blur effect to match entry animation
        stagger: 0.02,
        ease: "power1.in",
      },
      0
    );

    // Create and store the ScrollTrigger instance
    animationState.heroHeadingFadeScrollTrigger = ScrollTrigger.create({
      animation: fadeOutTl,
      trigger: "#hero-travel-area",
      start: "16% top", // Adjusted to 50% of previous change - when 17% of hero-travel-area has passed top of viewport
      end: "36% top", // Reduced end point by 50% - when 50% of hero-travel-area has passed the top of viewport
      scrub: true, // Use true for smoother scrubbing without lag
      markers: false, // Set to true for debugging
      invalidateOnRefresh: true, // **CRITICAL** Recalculate positions on refresh
      onUpdate: (self) => {
        // Let the timeline handle the animation naturally - this prevents conflicts
        // The timeline is already linked to scroll progress via scrub: true

        // Only intervene if we detect the animation getting stuck
        if (self.progress === 0) {
          // Ensure characters are fully visible at start
          gsap.set(shuffledChars, {
            opacity: 1,
            z: 0,
            scale: 1,
            filter: "blur(0px)",
            clearProps: "transform", // Clear any stuck transforms
          });
        } else if (self.progress === 1) {
          // Ensure characters are fully faded at end
          gsap.set(shuffledChars, {
            opacity: 0,
            z: -50,
            filter: "blur(16px)",
          });
        }
      },
      onRefresh: (self) => {
        // When ScrollTrigger refreshes, sync the timeline progress
        if (fadeOutTl) {
          fadeOutTl.progress(self.progress);
        }
      },
      onLeave: () => {
        // Ensure all characters are fully faded when leaving
        gsap.set(shuffledChars, {
          opacity: 0,
          z: -50,
          filter: "blur(16px)",
        });
      },
      onEnterBack: () => {
        // Let the timeline handle the re-entry based on current progress
        const progress = animationState.heroHeadingFadeScrollTrigger
          ? animationState.heroHeadingFadeScrollTrigger.progress
          : 0;
        if (fadeOutTl) {
          fadeOutTl.progress(progress);
        }
      },
      onLeaveBack: () => {
        // Reset to fully visible when scrolling back up
        gsap.set(shuffledChars, {
          opacity: 1,
          z: 0,
          scale: 1,
          filter: "blur(0px)",
          clearProps: "transform", // Clear any stuck transforms
        });
        if (fadeOutTl) {
          fadeOutTl.progress(0);
        }
      },
    });
  } else {
    logger.warn("#hero-area h1 not found for fade animation setup.");
  }
}

// New function to initialize the cover area
export function initCoverArea() {
  const coverLogo = document.querySelector("#cover-area .cover-logo");
  const countdown = document.querySelector("#countdown");
  const enterExperienceBtn = document.querySelector("#cover-area button.enter-experience");
  const header = document.querySelector("header");
  const nav = document.querySelector("nav");
  const sectionTimeline = document.querySelector(".section-timeline");
  const app = document.querySelector("#app");

  if (!coverLogo || !enterExperienceBtn) return;

  // === INITIAL STATES ===
  // All cover elements start hidden, JS animates them in sequence
  // Shader background fades in via CSS first (see background.scss)
  
  // Hide #app initially - will fade in after shader
  if (app) {
    gsap.set(app, {
      opacity: 0,
    });
  }

  // Hide header and section-timeline initially
  if (header) {
    gsap.set(header, {
      opacity: 0,
    });
  }

  if (sectionTimeline) {
    gsap.set(sectionTimeline, {
      opacity: 0,
    });
  }

  // Hide the share button initially
  const shareButton = document.querySelector(".share-button-pinned");
  if (shareButton) {
    gsap.set(shareButton, {
      opacity: 0,
    });
  }

  // Stop Lenis scrolling until enter button is clicked
  if (window.lenis) {
    window.lenis.stop();
  }

  // Set initial nav visibility
  gsap.set(nav, {
    opacity: 1,
  });

  // Make the logo fixed position and hidden initially
  // IMPORTANT: pointer-events: none ensures it doesn't block clicks on elements below
  // when opacity is 0 (like video controls)
  gsap.set(coverLogo, {
    position: "fixed",
    top: "calc(50% - 44px)",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1000,
    opacity: 0,
    scale: 0.95,
    pointerEvents: "none",
  });

  // Ensure countdown starts hidden
  if (countdown) {
    gsap.set(countdown, {
      opacity: 0,
    });
  }
  
  // Ensure enter button starts hidden
  gsap.set(enterExperienceBtn, {
    opacity: 0,
  });

  // Create a timeline for the cover area animation
  // DELAY: Wait for shader background to fade in first (CSS takes ~0.8s)
  // This ensures: Shader -> App -> Logo -> Countdown -> Button
  const tl = gsap.timeline({ delay: 0.6 });

  // Get the initial loader to hide it when app fades in
  const initialLoader = document.querySelector("#initial-loader");

  // First, fade in #app from opacity 0 to 1
  if (app) {
    tl.to(
      app,
      {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        onStart: () => {
          // Hide the loader when app starts fading in
          if (initialLoader) {
            initialLoader.classList.add("hidden");
            // Remove from DOM after fade transition
            setTimeout(() => {
              initialLoader.remove();
            }, 400);
          }
        },
      }
    );
  }

  // Animate the logo in (after app is visible)
  // Enable pointer-events when visible (will be disabled again when scrolled away)
  tl.to(
    coverLogo,
    {
      opacity: 1,
      scale: 1,
      pointerEvents: "auto",
      duration: 1.2,
      ease: "power1.out",
    },
    "-=0.3" // Slight overlap with app fade
  );

  // Animate the countdown in (while logo is still animating)
  if (countdown) {
    tl.to(
      countdown,
      {
        opacity: 1,
        duration: 0.4,
        ease: "power1.out",
      },
      "-=0.6"
    );
  }

  // Animate the enter button in (after countdown)
  tl.to(
    enterExperienceBtn,
    {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        enterExperienceBtn.style.pointerEvents = "auto";
      },
    },
    "-=0.2"
  );

  // Add click event listener to the enter-experience button
  if (enterExperienceBtn) {
    enterExperienceBtn.addEventListener("click", () => {
      // Disable further clicks immediately
      enterExperienceBtn.style.pointerEvents = "none";

      // Fade in header
      if (header) {
        gsap.to(header, {
          opacity: 1,
          duration: 0.8,
          ease: "power2.inOut",
        });
      }

      // Fade in section-timeline
      if (sectionTimeline) {
        gsap.to(sectionTimeline, {
          opacity: 1,
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

      // Start background particle fade-in
      document.dispatchEvent(new CustomEvent("veryEarlyParticleFade"));

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
              playBackgroundAudio(true);
            } else {
              logger.warn(`Exceeded maximum audio retry attempts (${window.maxAudioRetries}). Stopping retries.`);
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
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          // Create and show scroll down icon after button fades out
          createScrollDownIcon(enterExperienceBtn);
          // Re-enable pointer events on the button
          enterExperienceBtn.style.pointerEvents = "none";
        },
      });

      // Reveal the share button
      if (shareButton) {
        gsap.to(shareButton, {
          opacity: 1,
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

      // Initialize the cover logo ScrollTrigger after a short delay to prevent flicker
      // This ensures all initial animations are settled before the ScrollTrigger activates
      setTimeout(() => {
        initCoverLogoScrollTrigger(coverLogo, countdown);
      }, 100);
    });
  }
}

// Separate function to handle cover logo ScrollTrigger - optimized for fast scrolling
function initCoverLogoScrollTrigger(coverLogo, countdown) {
  let coverLogoScrollTrigger = null; // Reference to the ScrollTrigger
  let lastOpacity = -1; // Track last applied opacity to avoid redundant updates
  let lastCountdownOpacity = -1; // Track countdown opacity separately
  let countdownTween = null; // Track any ongoing countdown animation
  let isReady = false; // Track if ScrollTrigger is ready to prevent premature updates
  let hasScrolledPast = false; // Track if user has already scrolled past cover area

  // Check current scroll position to see if we're already past the cover area
  const coverTravelArea = document.querySelector("#cover-travel-area");
  if (coverTravelArea) {
    const rect = coverTravelArea.getBoundingClientRect();
    const coverAreaHeight = rect.height;
    const viewportHeight = window.innerHeight;
    const scrollProgress = Math.abs(rect.top) / (coverAreaHeight - viewportHeight * 0.67);
    
    // If we've scrolled significantly past the cover area, don't show it
    if (scrollProgress >= 0.9) {
      hasScrolledPast = true;
      gsap.set([coverLogo, countdown], {
        opacity: 0,
      });
      lastOpacity = 0;
      lastCountdownOpacity = 0;
    } else {
      // Set correct initial opacity based on current scroll position
      const initialOpacity = Math.max(0, 1 - scrollProgress);
      gsap.set([coverLogo, countdown], {
        opacity: initialOpacity,
      });
      lastOpacity = initialOpacity;
      lastCountdownOpacity = initialOpacity;
    }
  } else {
    // Ensure elements start in the correct state if we can't find the trigger
    gsap.set([coverLogo, countdown], {
      opacity: 1,
    });
  }

  // Function to create the ScrollTrigger
  function createScrollTrigger() {
    if (coverLogoScrollTrigger) {
      coverLogoScrollTrigger.kill();
    }

    coverLogoScrollTrigger = ScrollTrigger.create({
      trigger: "#cover-travel-area",
      start: "top top",
      end: "67% center",
      scrub: 0.5, // Faster, more responsive scrubbing
      markers: false,
      id: "cover-logo-fade",
      invalidateOnRefresh: true,
      fastScrollEnd: true, // Enable fast scroll optimization
      onUpdate: (self) => {
        // Prevent updates until ScrollTrigger is fully ready
        if (!isReady) return;
        const targetOpacity = 1 - self.progress;

        // Only update if opacity changed significantly (avoid micro-updates during fast scroll)
        if (Math.abs(targetOpacity - lastOpacity) > 0.01) {
          lastOpacity = targetOpacity;
          // Use direct style setting for maximum performance during fast scrolling
          coverLogo.style.opacity = targetOpacity;
          
          // Kill any existing countdown animation and set opacity directly
          if (countdownTween) {
            countdownTween.kill();
            countdownTween = null;
          }
          
          // Fade countdown with same timing during normal scroll
          if (countdown) {
            countdown.style.opacity = targetOpacity;
            lastCountdownOpacity = targetOpacity;
          }
        }
      },
      onLeave: () => {
        // Prevent premature callback firing
        if (!isReady) return;
        
        // Kill any existing countdown animation
        if (countdownTween) {
          countdownTween.kill();
          countdownTween = null;
        }
        
        // Ensure logo is hidden when leaving trigger area
        coverLogo.style.opacity = "0";
        coverLogo.style.pointerEvents = "none"; // Prevent blocking clicks on elements below
        lastOpacity = 0;
        
        // Also hide countdown
        if (countdown) {
          countdown.style.opacity = "0";
          lastCountdownOpacity = 0;
        }
      },
      onEnterBack: () => {
        // Prevent premature callback firing
        if (!isReady) return;
        
        // Set logo opacity based on current scroll position
        const currentProgress = coverLogoScrollTrigger.progress;
        const targetOpacity = 1 - currentProgress;
        coverLogo.style.opacity = targetOpacity;
        // Re-enable pointer-events when becoming visible
        if (targetOpacity > 0.1) {
          coverLogo.style.pointerEvents = "auto";
        }
        lastOpacity = targetOpacity;
        
        // Kill any existing countdown animation first
        if (countdownTween) {
          countdownTween.kill();
          countdownTween = null;
        }
        
        // Fade countdown in slower with a delay and longer duration
        if (countdown) {
          countdownTween = gsap.to(countdown, {
            opacity: targetOpacity,
            duration: 0.8, // Longer duration for slower fade
            delay: 0.4, // Delay to lag behind the logo
            ease: "power2.out",
            onUpdate: function() {
              lastCountdownOpacity = parseFloat(countdown.style.opacity);
            },
            onComplete: function() {
              countdownTween = null; // Clear reference when done
            }
          });
        }
      },
      onLeaveBack: () => {
        // Prevent premature callback firing
        if (!isReady) return;
        
        // Kill any existing countdown animation
        if (countdownTween) {
          countdownTween.kill();
          countdownTween = null;
        }
        
        // Reset when scrolling back up past trigger
        coverLogo.style.opacity = "1";
        coverLogo.style.pointerEvents = "auto"; // Re-enable when visible
        lastOpacity = 1;
        
        // Also reset countdown
        if (countdown) {
          countdown.style.opacity = "1";
          lastCountdownOpacity = 1;
        }
      },
    });

    // Mark as ready after a brief delay to ensure proper initialization
    setTimeout(() => {
      isReady = true;
      
      // Only sync if user hasn't already scrolled past the cover area
      if (!hasScrolledPast && coverLogoScrollTrigger) {
        const currentProgress = coverLogoScrollTrigger.progress;
        const targetOpacity = 1 - currentProgress;
        
        // Update opacity based on current scroll position
        if (currentProgress > 0 && currentProgress < 1) {
          coverLogo.style.opacity = targetOpacity;
          lastOpacity = targetOpacity;
          
          if (countdown) {
            countdown.style.opacity = targetOpacity;
            lastCountdownOpacity = targetOpacity;
          }
        } else if (currentProgress >= 1) {
          // User has scrolled past - ensure hidden
          coverLogo.style.opacity = "0";
          lastOpacity = 0;
          
          if (countdown) {
            countdown.style.opacity = "0";
            lastCountdownOpacity = 0;
          }
        }
      }
    }, 200);

    return coverLogoScrollTrigger;
  }

  // Create the initial ScrollTrigger
  return createScrollTrigger();
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
  });

  // Also hide the heroHeading (h1) element itself initially
  gsap.set(heroHeading, {
    opacity: 0,
  });

  // Clean up previous instance if it exists
  if (heroHeadingSplitInstance) {
    heroHeadingSplitInstance.revert();
    heroHeadingSplitInstance = null;
  }

  // Split the text into words first, then characters to prevent mid-word breaks
  heroHeadingSplitInstance = new SplitType(heroHeading, {
    types: "words,chars",
    absolute: false,
  });
  const splitText = heroHeadingSplitInstance;

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

  // After all characters are revealed, show the number wrapper (keep at full opacity)
  heroAnimationTl.to(heroNumber, {
    opacity: 1,
    duration: 1.5,
    ease: "power1.inOut",
  });

  // Modified digit reveal animation - fade-in using CSS custom property for perfect synchronization
  const digits = heroNumber.querySelectorAll(".digit");

  // Set initial 3D positioning for digits
  gsap.set(digits, {
    y: 10,
    z: -120, // Start further back in z-space
    transformPerspective: 1000, // Add perspective for 3D effect
    transformOrigin: "center center",
  });

  // Animate digits' 3D positioning
  heroAnimationTl.to(
    digits,
    {
      y: 0,
      z: 0,
      duration: 2.5, // Much longer duration for slower fade-in
      stagger: 0.1, // Slightly longer stagger
      ease: "power3.out",
    },
    "-=0.6"
  ); // Slight overlap

  // Animate digit opacity using CSS custom property - this ensures perfect synchronization
  heroAnimationTl.to(
    heroNumber,
    {
      "--digit-opacity": 0.44,
      duration: 2.5, // Same duration as 3D animation
      ease: "power3.out",
    },
    "-=2.5"
  ); // Start at the same time as 3D animation

  // Create ScrollTrigger for hero animation
  ScrollTrigger.create({
    trigger: "#hero-travel-area",
    start: "top 90%", // Extended start - when hero-travel-area is 83% into viewport (longer fade-in distance)
    end: "top 0%",
    animation: heroAnimationTl,
    scrub: 0.5, // Faster scrubbing for better fast scroll responsiveness
    markers: false,
    invalidateOnRefresh: true,
    fastScrollEnd: true, // Enable fast scroll optimization
    onEnter: () => {
      // Dispatch event to start particle fade-in when entering hero area
      const veryEarlyFadeEvent = new CustomEvent("veryEarlyParticleFade");
      document.dispatchEvent(veryEarlyFadeEvent);
    },
    // REMOVED: onUpdate was redundant - GSAP handles timeline progress via scrub automatically
    // Calling heroAnimationTl.progress() on every frame was causing unnecessary overhead
  });

  // Initialize the hero animation

  // Create the hero number animation (size/scale/opacity)
  if (heroNumber) {
    // PERFORMANCE: Cache last scale value to avoid redundant style updates
    let lastScale = null;
    
    // Scale animation - optimized for fast scrolling
    ScrollTrigger.create({
      trigger: "#hero-travel-area",
      start: "15% top",
      end: "bottom bottom",
      scrub: 0.3, // Faster scrubbing for better responsiveness
      markers: false,
      invalidateOnRefresh: true,
      fastScrollEnd: true,
      onUpdate: (self) => {
        // Round to 3 decimal places to reduce micro-updates
        const scale = Math.round((1 - self.progress * 0.5) * 1000) / 1000;
        
        // PERFORMANCE: Only update if scale actually changed
        if (scale !== lastScale) {
          lastScale = scale;
        heroNumber.style.transform = `scale(${scale})`;
        }
      },
      onLeave: () => {
        heroNumber.style.transform = "scale(0.5)";
        lastScale = 0.5;
      },
      onEnterBack: () => {
        // Reset cache so next update will apply
        lastScale = null;
      },
      onLeaveBack: () => {
        heroNumber.style.transform = "scale(1)";
        lastScale = 1;
      },
      id: "hero-scale",
    });

    // Remove the separate opacity animation - we'll handle it in the countdown animation

    // PERFORMANCE: Cache last fade-out values to avoid redundant style updates
    let lastFadeOpacity = null;
    let lastBlurAmount = null;

    // Fade-out animation (at end of hero pinned state) - optimized for fast scrolling
    ScrollTrigger.create({
      trigger: "#hero-travel-area",
      start: "bottom 90%", // Start fading just before unpinning
      end: "bottom 80%", // Complete fade right at unpinning point
      scrub: 0.3, // Faster scrubbing for better responsiveness
      markers: false,
      invalidateOnRefresh: true, // Ensure this recalculates
      fastScrollEnd: true, // Enable fast scroll optimization
      onUpdate: function (self) {
        const progress = self.progress;

        // Get the current countdown opacity (0.44 to 1.0 range)
        let baseOpacity = 1.0; // Default to full opacity if countdown is complete

        if (animationState.heroNumberTween && animationState.heroNumberTween.scrollTrigger) {
          const countdownProgress = animationState.heroNumberTween.scrollTrigger.progress;
          baseOpacity = 0.44 + countdownProgress * 0.56;
        }

        // Fade from current countdown opacity to 0
        // Round to avoid micro-updates
        const opacity = Math.round(baseOpacity * (1 - progress) * 100) / 100;

        // Calculate blur based on fade progress - blur increases as opacity decreases
        // Round to 1 decimal place to reduce style updates
        const blurAmount = Math.round(progress * 160) / 10; // 0px to 16px blur

        // PERFORMANCE: Only update if values actually changed
        if (opacity !== lastFadeOpacity) {
          lastFadeOpacity = opacity;
        heroNumber.style.setProperty("--digit-opacity", opacity);
        }
        
        // PERFORMANCE: Only update blur if it changed by at least 0.5px
        if (lastBlurAmount === null || Math.abs(blurAmount - lastBlurAmount) >= 0.5) {
          lastBlurAmount = blurAmount;
          heroNumber.style.filter = `blur(${blurAmount}px)`;
        }
      },
      onLeave: () => {
        // Ensure number is fully faded when leaving
        heroNumber.style.setProperty("--digit-opacity", "0");
        heroNumber.style.filter = "blur(16px)";
        lastFadeOpacity = 0;
        lastBlurAmount = 16;
      },
      onEnterBack: () => {
        // Reset cache so next update will apply
        lastFadeOpacity = null;
        lastBlurAmount = null;
      },
      onLeaveBack: () => {
        // Reset filter when scrolling back up into countdown area
        heroNumber.style.filter = "blur(0px)";
        lastFadeOpacity = null;
        lastBlurAmount = 0;
      },
      id: "hero-fade-out",
    });

    // REMOVED: Backup fade-out trigger was redundant and caused extra style updates
    // The main fade-out trigger handles everything needed
  }
}

export function initHeroNumberCountdown() {
  const heroNumber = document.querySelector("#hero-number");
  if (heroNumber) {
    // PERFORMANCE: Cache DOM references and pre-compute values ONCE
    let cachedDigitSpans = null;
    let lastYear = null;
    let lastOpacity = null;
    
    // Pre-cache digit spans after initial render
    const cacheDigitSpans = () => {
      cachedDigitSpans = heroNumber.querySelectorAll(".digit");
    };
    
    // Initial cache (may need to be called again if digits are recreated)
    requestAnimationFrame(cacheDigitSpans);
    
    // Create the tween ONLY if it doesn't exist
    if (!animationState.heroNumberTween) {
      animationState.heroNumberTween = gsap.to(animationState.heroYearObj, {
        // Assign to module-scope variable
        year: 1876,
        ease: "none",
        paused: true, // Start paused, ScrollTrigger will control it
        scrollTrigger: {
          trigger: "#hero-travel-area",
          start: "15% top",
          end: "75% bottom", // Reach 1876 earlier - at 75% through hero-travel-area
          scrub: 0.5, // Faster scrubbing for better fast scroll responsiveness
          markers: false,
          invalidateOnRefresh: true, // **CRITICAL**
          fastScrollEnd: true, // Enable fast scroll optimization
          id: "hero-countdown", // Add ID for debugging
          onUpdate: function (self) {
            // Calculate the year value based on scroll progress
            // Progress 0 = 2026, Progress 1 = 1876
            const currentYear = Math.round(2026 - self.progress * 150); // 2026 - 150 = 1876
            
            // PERFORMANCE: Skip if year hasn't changed
            if (currentYear === lastYear) return;
            lastYear = currentYear;
            
            animationState.heroYearObj.year = currentYear; // Update the state object

            // Calculate opacity based on progress: 0.44 at start (2026) to 1.0 at end (1876)
            // Round to 2 decimal places to reduce style updates
            const opacity = Math.round((0.44 + self.progress * 0.56) * 100) / 100;

            // PERFORMANCE: Use cached digit spans, only re-query if cache is invalid
            if (!cachedDigitSpans || cachedDigitSpans.length === 0) {
              cacheDigitSpans();
            }
            
            // PERFORMANCE: Direct digit updates without string split or array creation
            // Years are always 4 digits (1876-2026), so we can extract digits directly
            const d0 = Math.floor(currentYear / 1000);
            const d1 = Math.floor((currentYear % 1000) / 100);
            const d2 = Math.floor((currentYear % 100) / 10);
            const d3 = currentYear % 10;
            
            // Update each digit span directly - only if content differs
            if (cachedDigitSpans && cachedDigitSpans.length === 4) {
              const digits = [d0, d1, d2, d3];
              for (let i = 0; i < 4; i++) {
                const digitStr = String(digits[i]);
                const span = cachedDigitSpans[i];
                if (span.textContent !== digitStr) {
                  span.textContent = digitStr;
                  span.setAttribute("data-digit", digitStr);
                }
              }
            }

            // PERFORMANCE: Only update opacity if it actually changed
            if (opacity !== lastOpacity) {
              lastOpacity = opacity;
              heroNumber.style.setProperty("--digit-opacity", opacity);
            }
          },

          onLeave: function (self) {
            // Ensure opacity is at 1.0 when leaving (completed countdown)
            heroNumber.style.setProperty("--digit-opacity", "1.0");
            lastOpacity = 1.0;
            lastYear = 1876;
          },

          onComplete: function () {
            // Ensure the number stays at 1876 after countdown completes
            animationState.heroYearObj.year = 1876;
            if (cachedDigitSpans && cachedDigitSpans.length === 4) {
              const finalDigits = ["1", "8", "7", "6"];
              cachedDigitSpans.forEach((span, i) => {
                if (span.textContent !== finalDigits[i]) {
                  span.textContent = finalDigits[i];
                  span.setAttribute("data-digit", finalDigits[i]);
                }
              });
            }
            heroNumber.style.setProperty("--digit-opacity", "1.0");
            lastOpacity = 1.0;
            lastYear = 1876;
          },
          onLeaveBack: function (self) {
            // Ensure we reset to 2026 when scrolling back up
            animationState.heroYearObj.year = 2026;
            if (cachedDigitSpans && cachedDigitSpans.length === 4) {
              const initialDigits = ["2", "0", "2", "6"];
              cachedDigitSpans.forEach((span, i) => {
                if (span.textContent !== initialDigits[i]) {
                  span.textContent = initialDigits[i];
                  span.setAttribute("data-digit", initialDigits[i]);
                }
              });
            }
            heroNumber.style.setProperty("--digit-opacity", "0.44");
            lastOpacity = 0.44;
            lastYear = 2026;
          },
          onRefresh: (self) => {
            // Re-cache digit spans after refresh (layout may have changed)
            cacheDigitSpans();
            // Force update opacity after refresh based on current progress
            const opacity = Math.round((0.44 + self.progress * 0.56) * 100) / 100;
            heroNumber.style.setProperty("--digit-opacity", opacity);
            lastOpacity = opacity;
            // Recalculate year on refresh
            lastYear = Math.round(2026 - self.progress * 150);
          },
        },
      });

      // Debug: Check if ScrollTrigger was created successfully
      if (animationState.heroNumberTween.scrollTrigger) {
        // Force a refresh to ensure proper initialization
        ScrollTrigger.refresh();
      } else {
        logger.error("Hero countdown: ScrollTrigger creation failed!");
      }
    } else {
      // If the tween exists, ensure its ScrollTrigger is enabled (might be needed if killed previously)
      if (animationState.heroNumberTween.scrollTrigger) {
        animationState.heroNumberTween.scrollTrigger.enable();
      }
      animationState.heroNumberTween.resume(); // Ensure tween is not paused
    }
  } else {
    logger.warn("#hero-number element not found for countdown animation.");
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
        end: "bottom 80%", // End when the bottom of the wrapper reaches the bottom of viewport
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
