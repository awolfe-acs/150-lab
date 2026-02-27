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

// Function to set up hero heading character fade animations
export function setupHeroHeadingFadeAnimation() {
  // Clean up existing ScrollTrigger if it exists
  if (animationState.heroHeadingFadeScrollTrigger) {
    animationState.heroHeadingFadeScrollTrigger.kill();
    animationState.heroHeadingFadeScrollTrigger = null;
  }

  const heroHeading = document.querySelector("#hero-area h1");
  if (!heroHeading) {
    logger.warn("#hero-area h1 not found for fade animation setup.");
    return;
  }

  // PERFORMANCE: Instead of animating individual characters (expensive),
  // animate the entire heading with opacity + blur.
  // This reduces from ~40 animated elements to 1.
  
  // Cache last values to avoid redundant style updates
  let lastOpacity = null;
  let lastBlur = null;

  // Create ScrollTrigger for simple opacity + blur fade
  animationState.heroHeadingFadeScrollTrigger = ScrollTrigger.create({
    trigger: "#hero-travel-area",
    start: "16% top",
    end: "36% top",
    scrub: true, // Instant response
    markers: false,
    invalidateOnRefresh: true,
    fastScrollEnd: true,
    id: "hero-heading-fade",

    onUpdate: (self) => {
      const progress = self.progress;
      
      // Opacity: 1 to 0
      const opacity = Math.round((1 - progress) * 10) / 10;
      if (opacity !== lastOpacity) {
        lastOpacity = opacity;
        heroHeading.style.opacity = opacity;
      }
      
      // Blur: 0 to 8px (only update if changed significantly)
      const blur = Math.round(progress * 8);
      if (blur !== lastBlur) {
        lastBlur = blur;
        heroHeading.style.filter = blur > 0 ? `blur(${blur}px)` : "none";
      }
    },

    onLeave: () => {
      heroHeading.style.opacity = "0";
      heroHeading.style.filter = "blur(8px)";
      lastOpacity = 0;
      lastBlur = 8;
    },

    onEnterBack: () => {
      // Let onUpdate handle it
      lastOpacity = null;
      lastBlur = null;
    },

    onLeaveBack: () => {
      heroHeading.style.opacity = "1";
      heroHeading.style.filter = "none";
      lastOpacity = 1;
      lastBlur = 0;
    },
  });
}

// New function to initialize the cover area
/**
 * Play the cover area animation after all modules are loaded.
 * This should only be called once all loading is complete.
 */
export function playCoverAreaAnimation() {
  if (window._coverAreaTimeline) {
    console.log('[hero.js] Playing cover area animation - all modules loaded');
    window._coverAreaTimeline.play();
  } else {
    console.warn('[hero.js] Cover area timeline not initialized');
  }
}

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
  // PAUSED: Will be played by playCoverAreaAnimation() after all modules are loaded
  // This ensures: All modules loaded -> Shader -> App -> Logo -> Countdown -> Button
  const tl = gsap.timeline({ paused: true });

  // Store the timeline globally so it can be played later
  window._coverAreaTimeline = tl;

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
    "+=0.32" // 320ms delay after app fade completes
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
    filter: "blur(6px)", // Add initial blur effect
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

  // Set initial blur on hero number (will animate to 0)
  gsap.set(heroNumber, {
    filter: "blur(6px)",
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
      filter: "blur(0px)", // Reveal: blur 6px → 0
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
    scrub: 1, // PERFORMANCE: Increased from 0.5 - smoother scrubbing reduces update frequency
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

  // PERFORMANCE: Hero number scale + fade-out now handled via CSS animations
  // triggered by scroll position classes, eliminating ScrollTrigger overhead.
  // See initHeroNumberCountdown() for the consolidated approach.
}

export function initHeroNumberCountdown() {
  const heroNumber = document.querySelector("#hero-number");
  if (!heroNumber) {
    logger.warn("#hero-number element not found for countdown animation.");
    return;
  }

  // PERFORMANCE: Cache all DOM references ONCE at initialization
  const digitSpans = heroNumber.querySelectorAll(".digit");
  if (digitSpans.length !== 4) {
    logger.warn("Expected 4 digit spans in #hero-number, found:", digitSpans.length);
    return;
  }

  // Get trigger element for calculations
  const heroTravelArea = document.querySelector("#hero-travel-area");
  if (!heroTravelArea) {
    logger.warn("#hero-travel-area not found for countdown animation.");
    return;
  }

  // PERFORMANCE: Pre-cache last known values to skip redundant DOM updates
  let lastYear = 2026;
  let lastDigits = [2, 0, 2, 6];
  let lastOpacity = 0.44;
  let lastScale = 1;
  let lastFadeOpacity = null;
  let lastBlur = 0;

  // PERFORMANCE: Helper to update only changed digits
  const updateDigits = (year) => {
    const d0 = Math.floor(year / 1000);
    const d1 = Math.floor((year % 1000) / 100);
    const d2 = Math.floor((year % 100) / 10);
    const d3 = year % 10;

    if (d0 !== lastDigits[0]) { lastDigits[0] = d0; digitSpans[0].textContent = d0; }
    if (d1 !== lastDigits[1]) { lastDigits[1] = d1; digitSpans[1].textContent = d1; }
    if (d2 !== lastDigits[2]) { lastDigits[2] = d2; digitSpans[2].textContent = d2; }
    if (d3 !== lastDigits[3]) { lastDigits[3] = d3; digitSpans[3].textContent = d3; }
  };

  // Kill existing ScrollTriggers if reinitializing
  if (animationState.heroNumberTween?.scrollTrigger) {
    animationState.heroNumberTween.scrollTrigger.kill();
  }
  ScrollTrigger.getById("hero-scale")?.kill();
  ScrollTrigger.getById("hero-fade-out")?.kill();

  // PERFORMANCE: CONSOLIDATED ScrollTrigger - handles countdown, scale, and fade-out
  // Previously 3 separate triggers each with onUpdate callbacks = 3x overhead
  // Now ONE trigger handles everything based on scroll position
  const countdownTrigger = ScrollTrigger.create({
    trigger: "#hero-travel-area",
    start: "15% top",
    end: "bottom bottom", // Extended to cover full range including fade-out
    scrub: true, // Instant response - no interpolation overhead
    markers: false,
    invalidateOnRefresh: true,
    fastScrollEnd: true,
    id: "hero-countdown",

    onUpdate: (self) => {
      const progress = self.progress;
      
      // === COUNTDOWN (0% - 75% of travel area) ===
      // Map 0-0.706 progress to 0-1 countdown progress (75% / 85% total range)
      const countdownEnd = 0.706; // 75% of 85% total range = ~60% of total
      const countdownProgress = Math.min(1, progress / countdownEnd);
      
      const year = Math.round(2026 - countdownProgress * 150);
      if (year !== lastYear) {
        lastYear = year;
        animationState.heroYearObj.year = year;
        updateDigits(year);
      }

      // === SCALE (0% - 100% of travel area) ===
      // Scale from 1 to 0.5 as progress goes from 0 to 1
      const scale = Math.round((1 - progress * 0.5) * 100) / 100;
      if (scale !== lastScale) {
        lastScale = scale;
        heroNumber.style.transform = `scale(${scale})`;
      }

      // === OPACITY + BLUR (combines countdown opacity + fade-out with blur) ===
      // Base opacity: 0.44 at start, 1.0 when countdown complete
      const baseOpacity = 0.44 + countdownProgress * 0.56;
      
      // Fade-out: starts at ~88% progress (bottom 90%), ends at ~94% (bottom 80%)
      const fadeStart = 0.88;
      const fadeEnd = 0.94;
      let fadeMultiplier = 1;
      let blur = 0;
      if (progress > fadeStart) {
        const fadeProgress = Math.min(1, (progress - fadeStart) / (fadeEnd - fadeStart));
        fadeMultiplier = 1 - fadeProgress;
        blur = Math.round(fadeProgress * 6); // 0 → 6px blur during fade-out
      }
      
      const finalOpacity = Math.round(baseOpacity * fadeMultiplier * 10) / 10;
      if (finalOpacity !== lastFadeOpacity) {
        lastFadeOpacity = finalOpacity;
        heroNumber.style.setProperty("--digit-opacity", finalOpacity);
      }
      
      // Update blur only when changed
      if (blur !== lastBlur) {
        lastBlur = blur;
        heroNumber.style.filter = blur > 0 ? `blur(${blur}px)` : "none";
      }
    },

    onLeave: () => {
      // Final state: countdown complete, fully faded out, half scale, fully blurred
      lastYear = 1876;
      lastScale = 0.5;
      lastFadeOpacity = 0;
      lastBlur = 6;
      animationState.heroYearObj.year = 1876;
      updateDigits(1876);
      heroNumber.style.transform = "scale(0.5)";
      heroNumber.style.setProperty("--digit-opacity", "0");
      heroNumber.style.filter = "blur(6px)";
    },

    onLeaveBack: () => {
      // Reset to initial state (no blur - reveal animation completed)
      lastYear = 2026;
      lastScale = 1;
      lastFadeOpacity = 0.44;
      lastBlur = 0;
      animationState.heroYearObj.year = 2026;
      updateDigits(2026);
      heroNumber.style.transform = "scale(1)";
      heroNumber.style.setProperty("--digit-opacity", "0.44");
      heroNumber.style.filter = "none";
    },

    onRefresh: (self) => {
      // Force sync after layout changes
      const progress = self.progress;
      const countdownEnd = 0.706;
      const countdownProgress = Math.min(1, progress / countdownEnd);
      
      const year = Math.round(2026 - countdownProgress * 150);
      lastYear = year;
      animationState.heroYearObj.year = year;
      updateDigits(year);
      
      const scale = Math.round((1 - progress * 0.5) * 100) / 100;
      lastScale = scale;
      heroNumber.style.transform = `scale(${scale})`;
      
      const baseOpacity = 0.44 + countdownProgress * 0.56;
      const fadeStart = 0.88;
      const fadeEnd = 0.94;
      let fadeMultiplier = 1;
      let blur = 0;
      if (progress > fadeStart) {
        const fadeProgress = Math.min(1, (progress - fadeStart) / (fadeEnd - fadeStart));
        fadeMultiplier = 1 - fadeProgress;
        blur = Math.round(fadeProgress * 6);
      }
      lastFadeOpacity = Math.round(baseOpacity * fadeMultiplier * 10) / 10;
      lastBlur = blur;
      heroNumber.style.setProperty("--digit-opacity", lastFadeOpacity);
      heroNumber.style.filter = blur > 0 ? `blur(${blur}px)` : "none";
    },
  });

  animationState.heroNumberTween = {
    scrollTrigger: countdownTrigger,
  };
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
