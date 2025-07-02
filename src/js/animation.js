import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import SplitType from "split-type";
// Import audio files as assets
import uiClickAudioUrl from "../../public/audio/ui-click.mp3?url";
import backgroundAudioUrl from "../../public/audio/chemistry2.mp3?url";
// Import event images as assets
import pacifichemEventImage from "../../public/images/pacifichem-event1.jpg?url";
import greenChemistryEventImage from "../../public/images/green-chemistry-event2.jpg?url";
import acsSpringMeetingEventImage from "../../public/images/acs-spring-meeting-event3.jpg?url";

// Register the plugins
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MorphSVGPlugin);

// --- Persistent State for Hero Animations ---
let heroYearObj = { year: 2026 }; // Moved to module scope
let heroNumberTween = null; // Reference for the number tween
let heroHeadingFadeScrollTrigger = null; // Reference for H1 fade ScrollTrigger

// --- Function Definitions (Moved Above initAnimations) ---

// Function to set up hero heading character fade animations
function setupHeroHeadingFadeAnimation() {
  // Clean up existing ScrollTrigger if it exists
  if (heroHeadingFadeScrollTrigger) {
    heroHeadingFadeScrollTrigger.kill();
    heroHeadingFadeScrollTrigger = null; // Ensure reference is cleared
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
    heroHeadingFadeScrollTrigger = ScrollTrigger.create({
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

// ... (Potentially move other helper function definitions like animateVideoScale, animateGetInvolvedText etc. here too if needed) ...

// --- Initialization Functions ---

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
      y: 10,
      z: -120, // Start further back in z-space
      transformPerspective: 1000, // Add perspective for 3D effect
      transformOrigin: "center center",
    },
    {
      opacity: 0.44, // Fade in to 0.44 opacity as requested
      y: 0,
      z: 0,
      duration: 2.5, // Much longer duration for slower fade-in
      stagger: 0.1, // Slightly longer stagger
      ease: "power3.out",
      onComplete: () => {
        // Mark hero animation as complete
        window.heroAnimationComplete = true;

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
      window.enterButtonClicked = true;

      // Try to play audio - with multiple attempts if needed
      window.playBackgroundAudio(true); // Pass true to indicate this is from the enter button

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
              window.playBackgroundAudio(true);
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
      });
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
        digits.forEach((digit) => {
          digit.style.opacity = opacity;
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
        heroNumber.style.opacity = opacity;
      },
    });
  }
}

export function initAnimations() {
  // Preload audio immediately - before anything else
  preloadBackgroundAudio();

  // Initial refresh and clear match media
  ScrollTrigger.refresh();
  ScrollTrigger.clearMatchMedia();

  // Kill any existing ScrollTriggers to prevent duplicates before setup
  ScrollTrigger.getAll().forEach((st) => st.kill());
  // Reset tween references as well
  heroNumberTween = null;
  heroHeadingFadeScrollTrigger = null;
  heroYearObj.year = 2026; // Reset year state on full init

  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(SplitType);

  // Initialize hero animation (visual setup, text reveal)
  initHeroAnimation();

  // Initialize video scale animation
  animateVideoScale();

  // Initialize get involved text animation
  animateGetInvolvedText();

  // Initialize sliding cards animation
  animateSlidingCards();

  // Initialize page navigation
  updatePageNavigation();

  // Initialize fancy button interactions
  initFancyButtonEffects();

  // Initialize split lines animations (pass null to query all)
  initSplitLinesAnimation(null);

  // Initialize split chars animations (pass null to query all)
  initSplitCharsAnimation(null);

  // Initialize scroll reveal animations
  initScrollRevealAnimation();

  // Initialize get involved logo animation (same threshold as split-chars)
  initGetInvolvedLogoAnimation();

  // Initialize infinite marquee animation for form panel image
  initInfiniteMarqueeAnimation();

  // Initialize the global resize handler for all split-type elements
  initGlobalResizeHandler();

  // Add menu button click handler
  const menuButton = document.querySelector("button.toggle-menu");
  if (menuButton) {
    menuButton.addEventListener("click", () => {
      const nav = document.querySelector("nav");
      const header = document.querySelector("header");

      if (nav) nav.classList.toggle("active");
      if (header) header.classList.toggle("nav-active");
    });
  }

  // Add scroll direction detection and class toggling
  let lastScrollTop = 0;
  window.addEventListener("scroll", () => {
    const currentScrollTop = window.scrollY;
    const anniversaryHeader = document.querySelector("header.anniversary");

    if (anniversaryHeader) {
      if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        anniversaryHeader.classList.remove("active");
      } else {
        // Scrolling up
        anniversaryHeader.classList.add("active");
      }
    }

    lastScrollTop = currentScrollTop;
  });

  // Add close menu button click handler
  const closeMenuButton = document.querySelector("button.close-toggle-menu");
  if (closeMenuButton) {
    closeMenuButton.addEventListener("click", () => {
      const nav = document.querySelector("nav");
      const header = document.querySelector("header");

      if (nav) nav.classList.remove("active");
      if (header) header.classList.remove("nav-active");
    });
  }

  var fast = 0.18;
  var mediumFast = 0.24;
  var medium = 0.44;
  var mediumSlow = 0.68;
  var slow = 0.84;

  // Set up Hero Heading Character Fade Animation (now uses module-scope trigger reference)
  setupHeroHeadingFadeAnimation(); // <<<<< THIS CALL IS NOW SAFE

  // --- Hero Number Countdown Animation Setup ---
  const heroNumber = document.querySelector("#hero-number");
  if (heroNumber) {
    // Create the tween ONLY if it doesn't exist
    if (!heroNumberTween) {
      heroNumberTween = gsap.to(heroYearObj, {
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
            const yearValue = Math.round(heroYearObj.year).toString();
            const currentDigits = heroNumber.querySelectorAll(".digit");
            const newDigits = yearValue.split("");

            if (currentDigits.length !== newDigits.length) {
              heroNumber.innerHTML = "";
              newDigits.forEach((digit) => {
                const digitSpan = document.createElement("span");
                digitSpan.className = "digit";
                digitSpan.textContent = digit;
                digitSpan.setAttribute("data-digit", digit);
                heroNumber.appendChild(digitSpan);
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
      if (heroNumberTween.scrollTrigger) {
        heroNumberTween.scrollTrigger.enable();
      }
      heroNumberTween.resume(); // Ensure tween is not paused
    }
  } else {
    console.warn("#hero-number element not found for countdown animation.");
  }

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

  // Reveal animations
  document.querySelectorAll(".reveal-top-center").forEach(function (el) {
    gsap.set(el, { opacity: 0 });
    gsap.to(el, {
      opacity: 1,
      ease: "power1.out",
      scrollTrigger: {
        trigger: el,
        start: "top center",
        toggleActions: "restart none none reverse",
      },
    });
  });

  document.querySelectorAll(".reveal-center-center").forEach(function (el) {
    gsap.set(el, { opacity: 0 });
    gsap.to(el, {
      opacity: 1,
      ease: "power1.out",
      scrollTrigger: {
        trigger: el,
        start: "center center",
        toggleActions: "restart none none reverse",
      },
    });
  });

  // Pinning animations
  document.querySelectorAll(".pin-top-center").forEach(function (el) {
    let wrapper = el.parentElement;
    ScrollTrigger.create({
      trigger: wrapper,
      start: "top center",
      end: "bottom bottom",
      pin: el,
      pinSpacing: false,
    });
  });

  document.querySelectorAll(".pin-center-center").forEach(function (el) {
    let wrapper = el.parentElement;
    ScrollTrigger.create({
      trigger: wrapper,
      start: "center center",
      end: "bottom bottom",
      pin: el,
      pinSpacing: false,
    });
  });

  document.querySelectorAll(".pin-bottom-bottom").forEach(function (el) {
    let wrapper = el.parentElement;
    ScrollTrigger.create({
      trigger: wrapper,
      start: "bottom bottom",
      end: "",
      pin: el,
      pinSpacing: false,
    });
  });

  // Years counter scroll animation
  //const yearsElem = document.querySelector(".years");
  //const fontWeightObj = { weight: 100 };
  //
  //if (yearsElem) {
  //  // Create an object to hold the year value
  //  const yearsObj = { year: 2026 };
  //  // Set initial text
  //  yearsElem.innerText = yearsObj.year.toString();
  //  // Animation for the year counter
  //  gsap.to(yearsObj, {
  //    year: 1876,
  //    ease: "none",
  //    scrollTrigger: {
  //      trigger: "#years-travel-area",
  //      start: "top -80%",
  //      end: "bottom 180%",
  //      scrub: true,
  //    },
  //    onUpdate: function () {
  //      yearsElem.innerText = Math.round(yearsObj.year).toString();
  //    },
  //  });
  //  // Animation for the font weight
  //  gsap.to(fontWeightObj, {
  //    weight: 900,
  //    ease: "power2.inOut",
  //    scrollTrigger: {
  //      trigger: "#years-travel-area",
  //      start: "top -80%",
  //      end: "bottom 180%",
  //      scrub: true,
  //    },
  //    onUpdate: function () {
  //      yearsElem.style.fontWeight = Math.round(fontWeightObj.weight).toString();
  //    },
  //  });
  //  // Add a scale tween: start smaller (scale 0.5) and grow larger (scale 1.5) as you scroll
  //  gsap.fromTo(
  //    yearsElem,
  //    { scale: 0.5 },
  //    {
  //      scale: 1.5,
  //      ease: "power2.inOut",
  //      scrollTrigger: {
  //        trigger: "#years-travel-area",
  //        start: "top top",
  //        end: "bottom bottom",
  //        scrub: true,
  //      },
  //    }
  //  );
  //}

  // Add seamless infinite marquee inside #anniversary-area
  // const anniversaryArea = document.getElementById("anniversary-area");
  // if (anniversaryArea) {
  //   let marquee = anniversaryArea.querySelector("#marquee");
  //   if (!marquee) {
  //     marquee = document.createElement("div");
  //     marquee.id = "marquee";
  //     marquee.style.position = "absolute";
  //     marquee.style.bottom = "0";
  //     marquee.style.left = "0";
  //     // Create two copies for seamless looping with no space
  //     const textContent = "150 YEARS OF AMERICAN CHEMICAL SOCIETY ";
  //     marquee.innerHTML = `<span>${textContent}</span><span>${textContent}</span>`;
  //     anniversaryArea.appendChild(marquee);
  //     // Animate the marquee: translateX using xPercent for smoother movement
  //     gsap.to(marquee, {
  //       xPercent: -50,
  //       ease: "linear",
  //       duration: 20,
  //       repeat: -1,
  //     });
  //   }
  // }

  const waveGroup = document.getElementById("waveGroup");
  if (!waveGroup) return;
  // Animate the waveGroup shifting 100 units to the left continuously for seamless looping
  const waveAnimation = gsap.to(waveGroup, {
    x: "-=100",
    ease: "linear",
    duration: 2,
    repeat: -1,
  });

  // Create and configure UI click sound using imported asset
  const uiClickSound = new Audio(uiClickAudioUrl);
  uiClickSound.volume = 0.38; // Set to 38% volume

  // Function to play UI click sound
  const playUIClickSound = () => {
    if (window.audioMuted) return;

    try {
      // Clone the audio to allow multiple overlapping sounds
      const clickSound = uiClickSound.cloneNode();
      clickSound.volume = 0.38;
      clickSound.play().catch((error) => {
        console.warn("UI click sound play was prevented:", error);
      });
    } catch (error) {
      console.error("Error playing UI click sound:", error);
    }
  };

  // Add click sound to interactive elements
  const setupUIClickSounds = () => {
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
            if (!window.audioMuted) {
              playUIClickSound();
            }
            element.dataset.clickSoundPlayed = "true";
          }
          return;
        }

        if (!window.audioMuted) {
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
                      if (!window.audioMuted) {
                        playUIClickSound();
                      }
                      node.dataset.clickSoundPlayed = "true";
                    }
                    return;
                  }

                  if (!window.audioMuted) {
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
                      if (!window.audioMuted) {
                        playUIClickSound();
                      }
                      element.dataset.clickSoundPlayed = "true";
                    }
                    return;
                  }

                  if (!window.audioMuted) {
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
  };

  // Handle audio playback on user interaction
  const enableAudioOnInteraction = (event) => {
    // Mark that user has interacted with the page
    window.userInteracted = true;

    // IMPORTANT: We no longer try to play audio on general user interactions
    // Only the enter-experience button should start audio playback

    // However, if the enter button was already clicked but audio failed to start,
    // we can use this interaction to help retry (since browsers might require interaction)
    if (window.enterButtonClicked && !window.audioInitialized && window.heroAnimationComplete && !window.audioMuted) {
      // Only try to play if the enter button was previously clicked
      window.playBackgroundAudio(true);
    }
  };

  // Add event listeners for user interaction
  document.addEventListener("click", enableAudioOnInteraction);
  document.addEventListener("touchstart", enableAudioOnInteraction);
  document.addEventListener("keydown", enableAudioOnInteraction);

  // Add sound toggle functionality
  const soundToggle = document.querySelector(".sound-toggle");
  if (soundToggle) {
    soundToggle.addEventListener("click", () => {
      // Always play UI click sound first, regardless of mute state
      playUIClickSound();

      // Toggle the muted class
      soundToggle.classList.toggle("muted");

      // Update global mute state
      window.audioMuted = soundToggle.classList.contains("muted");

      // Pause or resume the wave animation based on muted state
      if (window.audioMuted) {
        waveAnimation.pause();

        // Mute the audio
        if (window.backgroundAudio) {
          window.backgroundAudio.volume = 0;

          // Clear any audio retry timers if they exist
          if (window.audioRetryTimer) {
            clearInterval(window.audioRetryTimer);
            window.audioRetryTimer = null;
          }
        }
      } else {
        waveAnimation.resume();

        // If audio hasn't been initialized yet but enter button was clicked, initialize it now
        if (!window.audioInitialized && window.enterButtonClicked && window.backgroundAudio) {
          // Try to play with aggressive retry
          window.playBackgroundAudio(true);

          // Restart retry timer if needed
          if (!window.audioRetryTimer) {
            window.audioRetryTimer = setInterval(() => {
              if (window.audioInitialized) {
                // Audio started successfully, clear the retry timer
                clearInterval(window.audioRetryTimer);
                window.audioRetryTimer = null;
              } else if (!window.audioMuted && window.enterButtonClicked) {
                // Try again if the audio hasn't started yet
                if (window.audioRetryCount < window.maxAudioRetries) {
                  window.playBackgroundAudio(true);
                } else {
                  // Stop trying after max retries
                  console.warn(`Exceeded maximum audio retry attempts (${window.maxAudioRetries}). Stopping retries.`);
                  clearInterval(window.audioRetryTimer);
                  window.audioRetryTimer = null;
                }
              }
            }, 500);
          }
        } else if (window.audioInitialized && window.backgroundAudio) {
          // Unmute the audio only if it was previously initialized
          window.backgroundAudio.volume = 0.08;

          // If audio was paused, restart it
          if (window.backgroundAudio.paused) {
            window.backgroundAudio.play().catch((error) => {
              console.warn("Audio play was prevented:", error);

              // If play failed, mark as not initialized so it can be retried
              window.audioInitialized = false;

              // Only try to replay if enter was clicked previously
              if (window.enterButtonClicked) {
                window.playBackgroundAudio(true);
              }
            });
          }
        }
      }
    });
  }

  // Add page navigation hover and click functionality
  const pageNav = document.querySelector(".section-timeline .page-nav");

  // Add null check to prevent errors if element doesn't exist
  if (!pageNav) {
    console.warn("Page navigation element (.section-timeline .n) not found - skipping navigation setup");
    return; // Exit early if the required elements don't exist
  }

  const navLinks = pageNav.querySelectorAll("a");
  const activeTitle = document.querySelector(".section-timeline .indicator .active-title");
  const indicatorWrapper = document.querySelector(".section-timeline .indicator-wrapper");
  const timelineNavWrapper = document.querySelector(".timeline-nav-wrapper");

  // Add additional null checks for critical elements
  if (!activeTitle) {
    console.warn("Active title element (.section-timeline .indicator .active-title) not found");
  }

  if (!indicatorWrapper && !timelineNavWrapper) {
    console.warn("Neither indicator wrapper nor timeline nav wrapper found - navigation may not work properly");
  }

  // Simplified navigation state tracking
  let isMouseInNavArea = false;
  let navTimeout = null;
  let currentState = "title-visible"; // 'title-visible' or 'nav-visible'

  // Initially hide the page nav and ensure active title is visible
  gsap.set(navLinks, { opacity: 0, x: -20 });
  gsap.set(activeTitle, { opacity: 1 });

  // Function to show navigation and hide active title
  const showNavigation = () => {
    // Clear any pending timeout
    if (navTimeout) {
      clearTimeout(navTimeout);
      navTimeout = null;
    }

    // Only proceed if we're not already showing nav
    if (currentState === "nav-visible") return;

    currentState = "nav-visible";

    // Kill any existing animations
    gsap.killTweensOf([activeTitle, navLinks]);

    // Hide active title immediately
    gsap.set(activeTitle, { opacity: 0 });

    // Show nav links
    gsap.to(navLinks, {
      opacity: 1,
      x: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.out",
    });
  };

  // Function to hide navigation and show active title
  const hideNavigation = () => {
    // Clear any pending timeout
    if (navTimeout) {
      clearTimeout(navTimeout);
      navTimeout = null;
    }

    // Only proceed if we're not already showing title
    if (currentState === "title-visible") return;

    currentState = "title-visible";

    // Kill any existing animations
    gsap.killTweensOf([activeTitle, navLinks]);

    // Hide nav links
    gsap.to(navLinks, {
      opacity: 0,
      x: -20,
      duration: 0.3,
      stagger: 0.03,
      ease: "power2.in",
    });

    // Show active title with delay to wait for nav links to finish fading out
    gsap.to(activeTitle, {
      opacity: 1,
      duration: 0.4,
      delay: 0.2, // Wait for nav links to mostly fade out
      ease: "power2.out",
    });
  };

  // Mouse enter handler for page nav with debouncing
  pageNav.addEventListener("mouseenter", () => {
    isMouseInNavArea = true;

    // Clear any pending hide timeout
    if (navTimeout) {
      clearTimeout(navTimeout);
      navTimeout = null;
    }

    // Show navigation immediately
    showNavigation();
  });

  // Mouse leave handler for page nav with debouncing
  pageNav.addEventListener("mouseleave", () => {
    isMouseInNavArea = false;

    // Use a small delay to prevent rapid flickering
    navTimeout = setTimeout(() => {
      // Double-check that mouse is still outside nav area
      if (!isMouseInNavArea) {
        hideNavigation();
      }
      navTimeout = null;
    }, 100); // 100ms debounce delay
  });

  // Add click handler for nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Remove active class from all links
      navLinks.forEach((l) => l.classList.remove("active"));

      // Add active class to clicked link
      link.classList.add("active");

      // Update active title text
      activeTitle.textContent = link.textContent;

      // Hide navigation after click (user will see updated active title)
      hideNavigation();
    });
  });

  // Export a utility function to handle dynamically added audio elements
  window.handleNewAudioElement = (element) => {
    // Check if the sound is currently muted
    if (window.audioMuted) {
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
  };

  // Add a mutation observer to detect dynamically added audio/video elements
  const audioObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          // Check if the added node is an audio or video element
          if (node.nodeName === "AUDIO" || node.nodeName === "VIDEO") {
            window.handleNewAudioElement(node);
          } else if (node.querySelectorAll) {
            // Check for audio/video elements inside the added node
            const audioNodes = node.querySelectorAll("audio, video");
            audioNodes.forEach((audioNode) => {
              window.handleNewAudioElement(audioNode);
            });
          }
        });
      }
    });
  });

  // Start observing the document body for added nodes
  audioObserver.observe(document.body, { childList: true, subtree: true });

  // Initialize UI click sounds after the DOM is fully loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupUIClickSounds);
  } else {
    setupUIClickSounds();
  }

  // Add this line where other animations are initialized
  animateGetInvolvedText();

  // Initialize page navigation updates
  updatePageNavigation();

  // Initialize split lines animations
  initSplitLinesAnimation(null);

  // Initialize split chars animations
  initSplitCharsAnimation(null);

  // Initialize scroll reveal animations
  initScrollRevealAnimation();

  // Initialize event list item hover interactions
  initEventListItemHover();
}

// Function to preload the background audio early
function preloadBackgroundAudio() {
  // Create audio instance early in the initialization process
  const backgroundAudio = new Audio();

  // Set audio load event listeners before setting src to ensure they're captured
  backgroundAudio.addEventListener("canplaythrough", () => {
    window.backgroundAudioLoaded = true;

    // If user has clicked the enter button but audio wasn't ready, play it now
    // IMPORTANT: Only attempt playback if enterButtonClicked is true
    if (window.enterButtonClicked && window.heroAnimationComplete && !window.audioInitialized && !window.audioMuted) {
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

  // Store references for later use
  window.backgroundAudio = backgroundAudio;
  window.audioInitialized = false;
  window.audioMuted = false;
  window.userInteracted = false;
  window.heroAnimationComplete = false;
  window.backgroundAudioLoaded = false;
  window.enterButtonClicked = false;
  window.audioRetryCount = 0;
  window.maxAudioRetries = 10; // Add a maximum retry limit

  // Define an enhanced audio playback function that handles both immediate and delayed playback
  window.playBackgroundAudio = (fromEnterButton = false) => {
    if (window.audioMuted) return;

    // Track if this was triggered from the enter button for more aggressive retries
    if (fromEnterButton) {
      window.enterButtonClicked = true;
    }

    // IMPORTANT: Only proceed if enterButtonClicked is true
    // This ensures only the enter button can start the audio
    if (!window.enterButtonClicked || !window.heroAnimationComplete) return;

    // Don't try to play if already initialized
    if (window.audioInitialized) return;

    // Stop retrying after max attempts (prevents infinite loops)
    if (window.audioRetryCount >= window.maxAudioRetries) {
      console.warn(`Exceeded maximum audio retry attempts (${window.maxAudioRetries}). Stopping retries.`);
      // Clear any audio retry timers
      if (window.audioRetryTimer) {
        clearInterval(window.audioRetryTimer);
        window.audioRetryTimer = null;
      }
      return;
    }

    // Check if audio is ready to play
    if (window.backgroundAudioLoaded || backgroundAudio.readyState >= 3) {
      playBackgroundAudioWhenReady(fromEnterButton);
    } else {
      // Audio not ready yet - it will play when ready via the canplaythrough event

      // If from enter button and the audio isn't loaded yet, force reload
      if (fromEnterButton) {
        try {
          // Try to force load again
          backgroundAudio.load();
        } catch (e) {
          console.warn("Error reloading background audio:", e);
        }
      }
    }
  };

  // Function to play audio when it's ready
  function playBackgroundAudioWhenReady(fromEnterButton = false) {
    if (window.audioInitialized || window.audioMuted) return;

    window.audioRetryCount++;

    // Stop retrying after max attempts
    if (window.audioRetryCount >= window.maxAudioRetries) {
      console.warn(`Exceeded maximum audio retry attempts (${window.maxAudioRetries}). Stopping retries.`);
      return;
    }

    try {
      // Play the audio at 8% volume
      backgroundAudio.volume = 0.08;

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

      backgroundAudio
        .play()
        .then(() => {
          window.audioInitialized = true;

          // Update sound toggle if it exists
          const soundToggle = document.querySelector(".sound-toggle");
          if (soundToggle) {
            soundToggle.classList.add("active");
          }

          // Reset retry count on success
          window.audioRetryCount = 0;
        })
        .catch((error) => {
          console.error("Audio play was prevented:", error);

          // Some browsers require user gesture to play audio
          // We'll retry playing when user clicks next time
          window.audioInitialized = false;

          // If from enter button, we'll retry automatically
          if ((fromEnterButton || window.enterButtonClicked) && window.audioRetryCount < window.maxAudioRetries) {
            setTimeout(() => {
              if (!window.audioInitialized && !window.audioMuted) {
                playBackgroundAudioWhenReady(true);
              }
            }, 500);
          }
        });
    } catch (error) {
      console.error("Error playing audio:", error);
      window.audioInitialized = false;

      // Retry if it was from the enter button
      if ((fromEnterButton || window.enterButtonClicked) && window.audioRetryCount < window.maxAudioRetries) {
        setTimeout(() => {
          if (!window.audioInitialized && !window.audioMuted) {
            playBackgroundAudioWhenReady(true);
          }
        }, 500);
      }
    }
  }

  // Add visibility change detection to pause/resume audio when tab changes
  let wasPlayingBeforeHidden = false;

  const handleVisibilityChange = () => {
    if (document.hidden) {
      // Tab is hidden/minimized - pause audio if it's playing
      if (window.backgroundAudio && !window.backgroundAudio.paused && window.audioInitialized) {
        wasPlayingBeforeHidden = true;
        window.backgroundAudio.pause();
      }
    } else {
      // Tab is visible again - resume audio if it was playing before
      if (window.backgroundAudio && wasPlayingBeforeHidden && window.audioInitialized && !window.audioMuted) {
        wasPlayingBeforeHidden = false;
        window.backgroundAudio.play().catch((error) => {
          console.warn("Could not resume background audio:", error);
          // If we can't resume, try to reinitialize
          window.audioInitialized = false;
          if (window.enterButtonClicked) {
            setTimeout(() => {
              window.playBackgroundAudio(true);
            }, 100);
          }
        });
      }
    }
  };

  // Listen for visibility changes (tab switching, minimizing)
  document.addEventListener("visibilitychange", handleVisibilityChange);

  // Also listen for window focus/blur events as a fallback
  window.addEventListener("blur", () => {
    if (window.backgroundAudio && !window.backgroundAudio.paused && window.audioInitialized) {
      wasPlayingBeforeHidden = true;
      window.backgroundAudio.pause();
    }
  });

  window.addEventListener("focus", () => {
    if (window.backgroundAudio && wasPlayingBeforeHidden && window.audioInitialized && !window.audioMuted) {
      wasPlayingBeforeHidden = false;
      window.backgroundAudio.play().catch((error) => {
        console.warn("Could not resume background audio on focus:", error);
        // If we can't resume, try to reinitialize
        window.audioInitialized = false;
        if (window.enterButtonClicked) {
          setTimeout(() => {
            window.playBackgroundAudio(true);
          }, 100);
        }
      });
    }
  });
}

// Function to initialize fancy button effects
function initFancyButtonEffects() {
  const fancyButtons = document.querySelectorAll(".fancy-btn");

  // Flag to track if we've already set up the event listener
  let heroEventListenerAdded = false;

  // Create a function to initialize all fancy buttons
  const initAllFancyButtons = () => {
    fancyButtons.forEach((button) => {
      // Skip buttons that are already initialized
      if (button.dataset.fancyInitialized === "true") {
        return;
      }

      initSingleFancyButton(button);
      // Mark as initialized
      button.dataset.fancyInitialized = "true";
    });
  };

  // Add event listener for heroAnimationComplete only once
  if (!heroEventListenerAdded) {
    document.addEventListener("heroAnimationComplete", initAllFancyButtons);
    heroEventListenerAdded = true;
  }

  // Initialize non-enter-experience buttons immediately
  fancyButtons.forEach((button) => {
    if (!button.classList.contains("enter-experience")) {
      initSingleFancyButton(button);
      button.dataset.fancyInitialized = "true";
    }
  });

  // If hero animation is already complete, initialize all buttons now
  if (window.heroAnimationComplete) {
    initAllFancyButtons();
  }

  // Helper function to initialize a single fancy button
  function initSingleFancyButton(button) {
    let isHovering = false;

    // Add hover effect
    button.addEventListener("mouseenter", () => {
      isHovering = true;
      button.classList.add("fancy-btn-active");
      button.style.transform = "translateY(-2px) scale(1.02)";
    });

    // Remove hover effect
    button.addEventListener("mouseleave", () => {
      isHovering = false;
      button.classList.remove("fancy-btn-active");
      button.style.transform = "";
    });

    // Add click effect
    button.addEventListener("mousedown", () => {
      button.style.transform = "translateY(1px) scale(0.98)";
    });

    // Reset after click
    button.addEventListener("mouseup", () => {
      if (isHovering) {
        button.style.transform = "translateY(-2px) scale(1.02)";
      }
    });
  }
}

// Animate video scale from small to full size while scrolling
function animateVideoScale() {
  const videoWrapper = document.querySelector("#video .video-wrapper");
  const videoSection = document.querySelector("#video");
  const videoTravelArea = document.querySelector("#video-travel-area");

  if (videoWrapper && videoSection && videoTravelArea) {
    // Set initial scale
    gsap.set(videoWrapper, {
      scale: 0.4,
      opacity: 0,
      transformOrigin: "center center",
    });

    // Create a timeline for the video animations - start when entering video-travel-area
    const videoTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#video-travel-area", // Changed from hero-travel-area to video-travel-area
        start: "top bottom", // Start when the top of video-travel-area enters the viewport
        end: "top 20%", // End when the top of video-travel-area is 20% from the top of viewport
        scrub: true,
        markers: false,
        onUpdate: (self) => {
          // Add/remove class based on progress
          if (self.progress > 0.8) {
            videoWrapper.classList.add("scale-active");
          } else {
            videoWrapper.classList.remove("scale-active");
          }
        },
      },
    });

    // Add the scale animation to the timeline
    videoTl.to(videoWrapper, {
      scale: 1.0,
      opacity: 1,
      ease: "power2.out", // Slightly more pronounced easing
    });

    // Create a pin animation that pins the video when it reaches the top of the viewport
    ScrollTrigger.create({
      trigger: "#video",
      start: "top top", // Start pinning when the top of #video reaches the top of the viewport
      endTrigger: "#video-travel-area", // Use video-travel-area as the end trigger
      end: "bottom bottom", // End pinning when the bottom of video-travel-area reaches the bottom of viewport
      pin: true, // Pin the video section
      pinSpacing: false, // Don't add extra space for the pinned element
      anticipatePin: 1, // Helps prevent jittering
      markers: false, // Set to true for debugging
      id: "video-pin", // Add an ID for easier debugging
    });
  }
}

// Add this function after the animateVideoScale function
function animateGetInvolvedText() {
  const getInvolvedText = document.querySelector("#get-involved-text p");

  if (getInvolvedText) {
    // Make sure the paragraph is visible and has proper dimensions
    gsap.set(getInvolvedText, {
      opacity: 1,
      visibility: "visible",
      autoAlpha: 1,
    });

    // Use a short delay to ensure the browser has properly rendered text and calculated dimensions
    setTimeout(() => {
      // Force a reflow to ensure proper layout calculations
      document.body.offsetHeight;
      getInvolvedText.offsetHeight;

      // Manually force proper word wrapping before splitting
      getInvolvedText.style.width = getInvolvedText.offsetWidth + "px";

      // Split the text into lines based on natural word-wrap
      const splitText = new SplitType(getInvolvedText, {
        types: "lines",
        lineClass: "line",
        // Ensure proper positioning
        absolute: false,
      });

      // If we have splitText.lines, proceed with the animation
      if (splitText.lines && splitText.lines.length > 0) {
        // Hide all lines initially and set their initial position
        gsap.set(splitText.lines, {
          opacity: 0,
          y: 40,
          transformOrigin: "center center",
        });

        // Create a timeline for the animation
        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#get-involved",
              start: "top 65%",
              end: "top 20%",
              scrub: false,
              markers: false,
              toggleActions: "play none none reverse",
            },
          })
          .to(splitText.lines, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.25,
            ease: "power1.out",
          });
      } else {
        console.warn("SplitType failed to detect lines properly");
      }
    }, 100); // Small delay to ensure proper layout
  }
}

function updatePageNavigation() {
  const heroTravelArea = document.querySelector("#hero-travel-area");
  const getInvolvedSection = document.querySelector("#get-involved");
  const eventsSection = document.querySelector("#events");
  const videoTravelArea = document.querySelector("#video-travel-area");
  const pageNav = document.querySelector(".page-nav");
  const activeTitle = document.querySelector(".section-timeline .indicator .active-title");

  if (!heroTravelArea || !getInvolvedSection || !pageNav || !activeTitle) return;

  const heroYearsLink = pageNav.querySelector(".anniversary");
  const getInvolvedLink = pageNav.querySelector(".get-involved");
  const eventsLink = pageNav.querySelector(".events");

  // Create a function to update the active title with a quick fade transition
  const updateActiveTitle = (newText) => {
    // Don't update if the text is already the same
    if (activeTitle.textContent === newText) return;

    // Use a very fast timeline for a smooth but quick transition
    const tl = gsap.timeline();

    // Quick fade out (100ms)
    tl.to(activeTitle, {
      opacity: 0,
      duration: 0.18,
      onComplete: () => {
        // Update the text during the brief fade out
        activeTitle.textContent = newText;
      },
    });

    // Quick fade in (100ms)
    tl.to(activeTitle, {
      opacity: 1,
      duration: 0.24,
    });
  };

  // Click handlers with immediate title updates
  heroYearsLink.addEventListener("click", (e) => {
    e.preventDefault();

    // Immediately update active title and links
    pageNav.querySelectorAll("a").forEach((link) => link.classList.remove("active"));
    heroYearsLink.classList.add("active");
    updateActiveTitle("150 Years of ACS");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  getInvolvedLink.addEventListener("click", (e) => {
    e.preventDefault();

    // Immediately update active title and links
    pageNav.querySelectorAll("a").forEach((link) => link.classList.remove("active"));
    getInvolvedLink.classList.add("active");
    updateActiveTitle("Get Involved");

    // Scroll to the video-travel-area section
    if (videoTravelArea) {
      const videoTravelAreaOffset = videoTravelArea.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: videoTravelAreaOffset,
        behavior: "smooth",
      });
    } else {
      // Fallback to the original target if video-travel-area doesn't exist
      const getInvolvedOffset = getInvolvedSection.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: getInvolvedOffset,
        behavior: "smooth",
      });
    }
  });

  eventsLink.addEventListener("click", (e) => {
    e.preventDefault();

    // Immediately update active title and links
    pageNav.querySelectorAll("a").forEach((link) => link.classList.remove("active"));
    eventsLink.classList.add("active");
    updateActiveTitle("Events");

    if (eventsSection) {
      const eventsOffset = eventsSection.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: eventsOffset,
        behavior: "smooth",
      });
    }
  });

  // -------------------------
  // Scroll-based detection with improved performance
  // -------------------------

  // Calculate section boundaries once, storing their ranges
  const sections = [
    {
      id: "hero",
      element: heroTravelArea,
      title: "150 Years of ACS",
      link: heroYearsLink,
      top: 0,
      bottom: 0,
    },
    {
      id: "getinvolved-video",
      element: videoTravelArea,
      title: "Get Involved",
      link: getInvolvedLink,
      top: 0,
      bottom: 0,
    },
    {
      id: "getinvolved",
      element: getInvolvedSection,
      title: "Get Involved",
      link: getInvolvedLink,
      top: 0,
      bottom: 0,
    },
    {
      id: "events",
      element: eventsSection,
      title: "Events",
      link: eventsLink,
      top: 0,
      bottom: 0,
    },
  ];

  // Calculate initial boundaries
  function updateSectionBoundaries() {
    sections.forEach((section) => {
      if (section.element) {
        const rect = section.element.getBoundingClientRect();
        section.top = rect.top + window.pageYOffset;
        section.bottom = rect.bottom + window.pageYOffset;
      }
    });

    // Special adjustment: Hero section ends at the start of video travel area
    if (sections[0].element && videoTravelArea) {
      const videoRect = videoTravelArea.getBoundingClientRect();
      sections[0].bottom = videoRect.top + window.pageYOffset;
    }

    // Make video-travel-area and get-involved one logical section
    if (videoTravelArea && eventsSection) {
      const videoSection = sections.find((s) => s.id === "getinvolved-video");
      const getInvolvedSection = sections.find((s) => s.id === "getinvolved");
      const eventsRect = eventsSection.getBoundingClientRect();

      if (videoSection && getInvolvedSection) {
        // Get-involved section now spans from video-travel-area to events section
        getInvolvedSection.top = videoSection.top;
        getInvolvedSection.bottom = eventsRect.top + window.pageYOffset;
      }
    }
  }

  // Initial calculation
  updateSectionBoundaries();

  // Track current section to avoid unnecessary updates
  let currentSectionId = null;

  // Fast scroll handler with minimal processing
  function handleScroll() {
    // We'll use requestAnimationFrame to limit how often we calculate
    // This will naturally throttle during rapid scrolling
    requestAnimationFrame(() => {
      // Get current scroll position using viewport midpoint
      const scrollPosition = window.pageYOffset + window.innerHeight / 2;

      // Find the active section using a reverse loop for efficiency
      // (most likely to be in later sections when scrolling down)
      let activeSection = sections[0]; // Default to hero

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (!section.element) continue;

        // Check if we're within this section's boundaries
        if (scrollPosition >= section.top && scrollPosition < section.bottom) {
          activeSection = section;
          break;
        }
      }

      // If we're in video-travel-area, treat as get-involved
      if (activeSection.id === "getinvolved-video") {
        activeSection = sections.find((s) => s.id === "getinvolved") || activeSection;
      }

      // Only update if the section has changed
      if (currentSectionId !== activeSection.id) {
        currentSectionId = activeSection.id;

        // Update nav links
        pageNav.querySelectorAll("a").forEach((link) => link.classList.remove("active"));
        if (activeSection.link) {
          activeSection.link.classList.add("active");
        }

        // Update title with no delay
        updateActiveTitle(activeSection.title);
      }
    });
  }

  // Use no debounce to ensure immediate response
  window.removeEventListener("scroll", handleScroll);
  window.addEventListener("scroll", handleScroll);

  // Update boundaries on resize
  window.addEventListener(
    "resize",
    debounce(() => {
      updateSectionBoundaries();
      handleScroll(); // Check current position after resize
    }, 100)
  );

  // Initial call to set correct state
  handleScroll();
}

function animateSlidingCards() {
  const slidingCardWrapper = document.querySelector(".sliding-card-row-wrapper");
  const getInvolvedCards = document.querySelector("#get-involved-cards");
  const heroTravelArea = document.querySelector("#hero-travel-area");

  // Keep track of the ScrollTrigger instances for later cleanup
  let scrollTriggerInstance;
  let heroFadeScrollTriggerInstance;

  if (slidingCardWrapper && getInvolvedCards) {
    // Function to create or destroy the ScrollTrigger based on viewport width
    const updateScrollTrigger = () => {
      const isLargeViewport = window.innerWidth > 1280;

      // If ScrollTrigger exists and viewport is smaller than 1024px, kill the ScrollTrigger
      if (scrollTriggerInstance && !isLargeViewport) {
        scrollTriggerInstance.kill();
        scrollTriggerInstance = null;

        // Reset the position of the sliding card wrapper
        gsap.set(slidingCardWrapper, { x: 0 });
      }

      // If viewport is larger than 1024px and ScrollTrigger doesn't exist, create it
      if (isLargeViewport && !scrollTriggerInstance) {
        // Create scroll animation for the sliding cards
        scrollTriggerInstance = gsap.fromTo(
          slidingCardWrapper,
          { x: "44vw" }, // Starting position (matching the CSS)
          {
            x: "-20vw", // End position
            ease: "power1.inOut", // Slightly smoother easing
            scrollTrigger: {
              trigger: "#get-involved-cards",
              start: "top 80%", // Start when the top of cards section is 80% down the viewport
              end: "bottom 20%", // End when the bottom of cards section is 20% from the top of viewport
              scrub: 1.5, // Smoother scrubbing with slightly more lag
              invalidateOnRefresh: true, // Recalculate on resize
              markers: false, // Set to true for debugging
              id: "sliding-cards-animation", // For debugging
            },
          }
        ).scrollTrigger;
      }
    };

    // Function to create or destroy the hero area fade ScrollTrigger
    const updateHeroFadeScrollTrigger = () => {
      // If ScrollTrigger exists, kill it to avoid duplicates
      if (heroFadeScrollTriggerInstance) {
        heroFadeScrollTriggerInstance.kill();
        heroFadeScrollTriggerInstance = null;
      }

      // Only create if hero travel area exists
      if (heroTravelArea) {
        // Create a ScrollTrigger for fading out the hero travel area
        heroFadeScrollTriggerInstance = ScrollTrigger.create({
          trigger: "#get-involved-cards",
          start: "top 80%", // Start when the top of get-involved-cards is 80% down the viewport
          end: "top 20%", // End when the top of get-involved-cards is 20% down the viewport
          scrub: true, // Smooth scrubbing tied to scroll position
          markers: false, // Set to true for debugging
          id: "hero-fade-animation",
          onUpdate: (self) => {
            // Calculate opacity based on scroll progress (1 to 0)
            const opacity = 1 - self.progress;
            // Apply to hero travel area
            gsap.set(heroTravelArea, { opacity: opacity });
          },
          onLeaveBack: () => {
            // Ensure opacity is reset to 1 when scrolling back up
            gsap.set(heroTravelArea, { opacity: 1 });
          },
        });
      }
    };

    // Initialize on first load
    updateScrollTrigger();
    updateHeroFadeScrollTrigger();

    // Update on window resize
    const debounceResize = debounce(() => {
      updateScrollTrigger();
      updateHeroFadeScrollTrigger();
    }, 250); // 250ms debounce timeout

    window.addEventListener("resize", debounceResize);
  } else {
    console.warn("Could not find sliding card wrapper or get-involved-cards section");
  }
}

export function initSplitLinesAnimation(elementsToSplit = null) {
  // Get elements either from argument or by querying the DOM
  const splitLinesElements = elementsToSplit || document.querySelectorAll(".split-lines");

  if (!splitLinesElements || splitLinesElements.length === 0) {
    console.warn("No .split-lines elements found or provided for initialization");
    return;
  }

  // Store references to split instances for potential cleanup
  const splitInstances = [];

  // Check if fonts are loaded
  const waitForFonts = () => {
    return new Promise((resolve) => {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          resolve();
        });
      } else {
        // Fallback for browsers without font loading API
        setTimeout(resolve, 100);
      }
    });
  };

  // Check if images in/near the element are loaded
  const waitForImages = (element) => {
    return new Promise((resolve) => {
      // Get the parent container that might affect layout
      const container = element.closest("section") || element.parentNode;
      if (!container) {
        resolve();
        return;
      }

      const images = container.querySelectorAll("img");
      if (images.length === 0) {
        resolve();
        return;
      }

      // For safety, set a max timeout
      const timeout = setTimeout(resolve, 2000);

      let loadedCount = 0;

      // First check if all images are already loaded
      let allLoaded = true;
      images.forEach((img) => {
        if (!img.complete) allLoaded = false;
      });

      if (allLoaded) {
        clearTimeout(timeout);
        resolve();
        return;
      }

      // Wait for images to load
      images.forEach((img) => {
        if (img.complete) {
          loadedCount++;
          if (loadedCount === images.length) {
            clearTimeout(timeout);
            resolve();
          }
        } else {
          img.addEventListener("load", () => {
            loadedCount++;
            if (loadedCount === images.length) {
              clearTimeout(timeout);
              resolve();
            }
          });

          img.addEventListener("error", () => {
            loadedCount++;
            if (loadedCount === images.length) {
              clearTimeout(timeout);
              resolve();
            }
          });
        }
      });
    });
  };

  // Function to process a single element with proper timing and retries
  const processSplitElement = (element, index) => {
    // First, store the original content
    const originalContent = element.innerHTML;
    element.setAttribute("data-original-content", originalContent);

    // Wait for critical resources that affect text layout
    Promise.all([waitForFonts(), waitForImages(element)]).then(() => {
      // Force a reflow to ensure proper layout calculation
      element.offsetHeight;

      // We'll try splitting multiple times if needed
      const attemptSplit = (attempt = 0) => {
        // Apply SplitType directly to the element
        const splitText = new SplitType(element, {
          types: "lines",
          lineClass: "split-line",
          absolute: false, // Avoid absolute positioning which affects layout more
          tagName: "div", // Use div instead of default spans
        });

        // Validate the splitting result
        const isGoodSplit = splitText.lines && splitText.lines.length > 0 && splitText.lines.length > 1; // Ensure more than 1 line was created

        if (isGoodSplit) {
          // Store the instance for potential cleanup
          splitInstances.push({
            element,
            splitText,
            originalContent,
          });

          // Set initial state for lines - hidden and shifted down
          gsap.set(splitText.lines, {
            opacity: 0,
            y: 50,
          });

          // Create ScrollTrigger animation for each element
          ScrollTrigger.create({
            trigger: element,
            start: "top 85%", // Trigger when the top of the element is 85% from the top of viewport
            once: false, // Allow the animation to run multiple times if scrolled past
            markers: false, // Set to true for debugging
            id: `split-lines-${index}`,
            onEnter: () => {
              // Animate the lines when they enter the viewport
              gsap.to(splitText.lines, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                stagger: 0.1, // Staggered animation for each line
                ease: "power2.out",
                overwrite: true,
              });
            },
            onLeaveBack: () => {
              // Reset the animation when scrolling back up
              gsap.to(splitText.lines, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.05,
                ease: "power2.in",
                overwrite: true,
              });
            },
          });
        } else {
          // If split failed or looks incorrect, retry a few times
          if (attempt < 3) {
            // Clean up the failed attempt
            if (splitText && typeof splitText.revert === "function") {
              splitText.revert();
            }

            // Wait longer before each retry
            setTimeout(() => {
              attemptSplit(attempt + 1);
            }, 300 * (attempt + 1)); // 300ms, 600ms, 900ms
          } else {
            console.warn("SplitType failed to create lines properly after multiple attempts:", element);
            // Restore original content if split failed after all retries
            element.innerHTML = originalContent;
          }
        }
      };

      // Start with first attempt
      attemptSplit();
    });
  };

  // Process each split-lines element
  splitLinesElements.forEach((element, index) => {
    processSplitElement(element, index);
  });

  // Add a cleanup method to the window for potential use
  window.cleanupSplitLines = () => {
    splitInstances.forEach((instance) => {
      // Revert to original content
      if (instance.element && instance.originalContent) {
        instance.element.innerHTML = instance.originalContent;
      }
      // Remove from instance array
      const index = splitInstances.indexOf(instance);
      if (index > -1) {
        splitInstances.splice(index, 1);
      }
    });
  };

  // Also add a refresh method to recalculate splits if needed (like after window resize)
  window.refreshSplitLines = () => {
    // First clean up existing splits
    window.cleanupSplitLines();

    // Then re-initialize with a slight delay to ensure DOM is updated
    setTimeout(() => {
      // Get elements again in case DOM has changed
      const elements = document.querySelectorAll(".split-lines");
      elements.forEach((element, index) => {
        processSplitElement(element, index);
      });
    }, 100);
  };
}

export function initSplitCharsAnimation(elementsToSplit = null) {
  // Get elements either from argument or by querying the DOM
  const splitCharsElements = elementsToSplit || document.querySelectorAll(".split-chars");

  if (!splitCharsElements || splitCharsElements.length === 0) {
    console.warn("No .split-chars elements found or provided for initialization");
    return;
  }

  // Store references to split instances for potential cleanup
  const splitCharsInstances = [];

  // Check if fonts are loaded
  const waitForFonts = () => {
    return new Promise((resolve) => {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          resolve();
        });
      } else {
        // Fallback for browsers without font loading API
        setTimeout(resolve, 100);
      }
    });
  };

  // Check if images in/near the element are loaded
  const waitForImages = (element) => {
    return new Promise((resolve) => {
      // Get the parent container that might affect layout
      const container = element.closest("section") || element.parentNode;
      if (!container) {
        resolve();
        return;
      }

      const images = container.querySelectorAll("img");
      if (images.length === 0) {
        resolve();
        return;
      }

      // For safety, set a max timeout
      const timeout = setTimeout(resolve, 2000);

      let loadedCount = 0;

      // First check if all images are already loaded
      let allLoaded = true;
      images.forEach((img) => {
        if (!img.complete) allLoaded = false;
      });

      if (allLoaded) {
        clearTimeout(timeout);
        resolve();
        return;
      }

      // Wait for images to load
      images.forEach((img) => {
        if (img.complete) {
          loadedCount++;
          if (loadedCount === images.length) {
            clearTimeout(timeout);
            resolve();
          }
        } else {
          img.addEventListener("load", () => {
            loadedCount++;
            if (loadedCount === images.length) {
              clearTimeout(timeout);
              resolve();
            }
          });

          img.addEventListener("error", () => {
            loadedCount++;
            if (loadedCount === images.length) {
              clearTimeout(timeout);
              resolve();
            }
          });
        }
      });
    });
  };

  // Function to process a single element with proper timing and retries
  const processSplitCharsElement = (element, index) => {
    // First, store the original content
    const originalContent = element.innerHTML;
    element.setAttribute("data-original-content", originalContent);

    // Wait for critical resources that affect text layout
    Promise.all([waitForFonts(), waitForImages(element)]).then(() => {
      // Force a reflow to ensure proper layout calculation
      element.offsetHeight;

      // We'll try splitting multiple times if needed
      const attemptSplit = (attempt = 0) => {
        // Apply SplitType directly to the element (not to a wrapper)
        const splitText = new SplitType(element, {
          types: "chars",
          charClass: "split-char",
          absolute: false,
          tagName: "span", // Use spans for characters as they're inline elements
        });

        // Check if chars were created properly
        if (splitText.chars && splitText.chars.length > 0) {
          // Store the instance for potential cleanup
          splitCharsInstances.push({
            element,
            splitText,
            originalContent,
          });

          // Set initial state for chars - hidden and shifted down
          gsap.set(splitText.chars, {
            opacity: 0,
            y: 50,
            // Ensure characters don't break the flow
            display: "inline-block",
          });

          // Create ScrollTrigger animation for each element
          ScrollTrigger.create({
            trigger: element,
            start: "top 85%", // Trigger when the top of the element is 85% from the top of viewport
            once: false, // Allow the animation to run multiple times if scrolled past
            markers: false, // Set to true for debugging
            id: `split-chars-${index}`,
            onEnter: () => {
              // Animate the chars when they enter the viewport
              gsap.to(splitText.chars, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                stagger: 0.02, // Faster stagger for chars since there are more of them
                ease: "power2.out",
                overwrite: true,
              });
            },
            onLeaveBack: () => {
              // Reset the animation when scrolling back up
              gsap.to(splitText.chars, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.01, // Faster stagger for reset
                ease: "power2.in",
                overwrite: true,
              });
            },
          });
        } else {
          // If split failed, retry a few times
          if (attempt < 3) {
            // Clean up the failed attempt
            if (splitText && typeof splitText.revert === "function") {
              splitText.revert();
            }

            // Wait longer before each retry
            setTimeout(() => {
              attemptSplit(attempt + 1);
            }, 300 * (attempt + 1)); // 300ms, 600ms, 900ms
          } else {
            console.warn("SplitType failed to create chars after multiple attempts:", element);
            // Restore original content if split failed after all retries
            element.innerHTML = originalContent;
          }
        }
      };

      // Start with first attempt
      attemptSplit();
    });
  };

  // Process each split-chars element with the delayed function
  splitCharsElements.forEach((element, index) => {
    processSplitCharsElement(element, index);
  });

  // Add a cleanup method to the window for potential use
  window.cleanupSplitChars = () => {
    splitCharsInstances.forEach((instance) => {
      // Revert to original content
      if (instance.element && instance.originalContent) {
        instance.element.innerHTML = instance.originalContent;
      }
      // Remove from instance array
      const index = splitCharsInstances.indexOf(instance);
      if (index > -1) {
        splitCharsInstances.splice(index, 1);
      }
    });
  };

  // Also add a refresh method to recalculate splits if needed (like after window resize)
  window.refreshSplitChars = () => {
    // First clean up existing splits
    window.cleanupSplitChars();

    // Then re-initialize with a slight delay to ensure DOM is updated
    setTimeout(() => {
      // Get elements again in case DOM has changed
      const elements = document.querySelectorAll(".split-chars");
      elements.forEach((element, index) => {
        processSplitCharsElement(element, index);
      });
    }, 100);
  };
}

// Initialize simple scroll reveal animation without text splitting
export function initScrollRevealAnimation() {
  // Get all elements with the scroll-reveal class
  const scrollRevealElements = document.querySelectorAll(".scroll-reveal");

  if (!scrollRevealElements.length) {
    console.warn("No .scroll-reveal elements found");
    return;
  }

  // Process each scroll-reveal element
  scrollRevealElements.forEach((element, index) => {
    // Check if this element has the button class
    const isButton = element.classList.contains("fancy-btn");

    if (isButton) {
      // For button elements, use filter:opacity() instead of opacity
      // Set initial state - hidden using filter opacity and shifted down
      gsap.set(element, {
        y: 50,
        filter: "opacity(0)", // Use filter instead of opacity
      });

      // Create ScrollTrigger animation for button elements
      ScrollTrigger.create({
        trigger: element,
        start: "top 85%", // Trigger when the top of the element is 85% from the top of viewport
        once: false, // Allow the animation to run multiple times if scrolled past
        markers: false, // Set to true for debugging
        id: `scroll-reveal-button-${index}`,
        onEnter: () => {
          // Animate when element enters the viewport
          gsap.to(element, {
            y: 0,
            filter: "opacity(1)", // Animate filter to fully visible
            duration: 1.2,
            ease: "power2.out",
            overwrite: true,
          });
        },
        onLeaveBack: () => {
          // Reset the animation when scrolling back up
          gsap.to(element, {
            y: 50,
            filter: "opacity(0)", // Reset filter to invisible
            duration: 0.8,
            ease: "power2.in",
            overwrite: true,
          });
        },
      });
    } else {
      // For normal scroll-reveal elements, use regular opacity
      // Set initial state - hidden and shifted down
      gsap.set(element, {
        opacity: 0,
        y: 50,
      });

      // Create ScrollTrigger animation for each element
      ScrollTrigger.create({
        trigger: element,
        start: "top 85%", // Trigger when the top of the element is 85% from the top of viewport
        once: false, // Allow the animation to run multiple times if scrolled past
        markers: false, // Set to true for debugging
        id: `scroll-reveal-${index}`,
        onEnter: () => {
          // Animate when element enters the viewport
          gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            overwrite: true,
          });
        },
        onLeaveBack: () => {
          // Reset the animation when scrolling back up
          gsap.to(element, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power2.in",
            overwrite: true,
          });
        },
      });
    }
  });
}

// Initialize fade-in animation for the get involved 150 logo (same threshold as split-chars)
export function initGetInvolvedLogoAnimation() {
  // Get the get involved logo element
  const logoElement = document.querySelector(".get-involved-150-logo");

  if (!logoElement) {
    console.warn("No .get-involved-150-logo element found");
    return;
  }

  // Set initial state - hidden and shifted down
  gsap.set(logoElement, {
    opacity: 0,
    y: 50,
  });

  // Create ScrollTrigger animation using the same threshold as split-chars
  ScrollTrigger.create({
    trigger: logoElement,
    start: "top 85%", // Same threshold as split-chars elements
    once: false, // Allow the animation to run multiple times if scrolled past
    markers: false, // Set to true for debugging
    id: "get-involved-logo-fade",
    onEnter: () => {
      // Animate the logo when it enters the viewport
      gsap.to(logoElement, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        overwrite: true,
      });
    },
    onLeaveBack: () => {
      // Reset the animation when scrolling back up
      gsap.to(logoElement, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.in",
        overwrite: true,
      });
    },
  });
}

// Initialize infinite marquee animation for form panel image
export function initInfiniteMarqueeAnimation() {
  const animationColumn = document.querySelector(".form-panel .animation-column");
  const originalImage = animationColumn?.querySelector("img");

  if (!animationColumn || !originalImage) {
    console.warn("Form panel animation column or image not found");
    return;
  }

  // Create marquee container
  const marqueeContainer = document.createElement("div");
  marqueeContainer.className = "marquee-container";

  // Clone the original image for seamless loop
  const clonedImage = originalImage.cloneNode(true);

  // Remove original image from its current position
  originalImage.remove();

  // Add both images to the marquee container
  marqueeContainer.appendChild(originalImage);
  marqueeContainer.appendChild(clonedImage);

  // Add marquee container to animation column
  animationColumn.appendChild(marqueeContainer);

  // Function to set up the animation after image loads
  const setupAnimation = () => {
    // Wait for layout to be calculated
    setTimeout(() => {
      // Get the actual rendered dimensions of the image
      const imageRect = originalImage.getBoundingClientRect();
      const actualHeight = imageRect.height;

      // Position the images - second image directly below the first
      gsap.set(originalImage, {
        top: 0,
        left: 0,
      });
      gsap.set(clonedImage, {
        top: actualHeight + "px", // Position exactly one image height below
        left: 0,
      });

      // Create the infinite animation
      const tl = gsap.timeline({ repeat: -1, ease: "none" });

      // Calculate duration based on actual image height (adjust speed as needed)
      const duration = actualHeight / 30; // 30 pixels per second for smoother motion

      tl.to([originalImage, clonedImage], {
        y: -actualHeight,
        duration: duration,
        ease: "none",
      });

      // Reset positions when animation completes to create seamless loop
      tl.set([originalImage, clonedImage], {
        y: 0,
      });
    }, 100); // Small delay to ensure layout is complete
  };

  // Wait for image to load, then setup animation
  if (originalImage.complete && originalImage.naturalHeight !== 0) {
    setupAnimation();
  } else {
    originalImage.addEventListener("load", setupAnimation);
    // Fallback in case load event doesn't fire
    setTimeout(setupAnimation, 1000);
  }
}

// Initialize event list item hover interactions with pinned images
export function initEventListItemHover() {
  const eventListItems = document.querySelectorAll(".event-list-item");

  if (!eventListItems.length) {
    console.warn("No .event-list-item elements found");
    return;
  }

  // Map event items to their corresponding imported image URLs
  const eventImageMap = [pacifichemEventImage, greenChemistryEventImage, acsSpringMeetingEventImage];

  // DISABLED: Mouse-following image feature
  /*
  // Detect if device supports touch
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

  // Create the mouse-following image element
  const mouseImage = document.createElement("img");
  mouseImage.className = "mouse-following-image";
  mouseImage.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 400px;
    height: 291px;
    object-fit: cover;
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    border-radius: 12px;
    transform: translate(-50%, -50%);
    transition: opacity 0.2s ease;
    mix-blend-mode: plus-lighter;
    filter: opacity(0.28) brightness(0.9) contrast(1.2);
    ${isTouchDevice ? "display: none;" : ""}
  `;
  document.body.appendChild(mouseImage);

  // Track current mouse position
  let mouseX = 0;
  let mouseY = 0;

  // Update mouse position
  const updateMousePosition = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Update image position
    mouseImage.style.left = mouseX + "px";
    mouseImage.style.top = mouseY + "px";
  };

  // Add global mouse move listener
  document.addEventListener("mousemove", updateMousePosition);
  */

  // Add hover interactions to each event list item with pinned images
  eventListItems.forEach((item, index) => {
    const imageUrl = eventImageMap[index];

    if (!imageUrl) {
      console.warn(`No image mapped for event item ${index}`);
      return;
    }

    // Create pinned hover image for this item
    const pinnedImage = document.createElement("img");
    pinnedImage.className = "pinned-hover-image";
    pinnedImage.src = imageUrl;
    pinnedImage.style.cssText = `
      position: fixed;
      width: 200px;
      height: 145px;
      object-fit: cover;
      pointer-events: none;
      z-index: 9999;
      opacity: 0;
      border-radius: 8px;
      transform: translateY(-50%) scale(0.9);
      transition: opacity 0.3s ease, transform 0.3s ease;
      filter: opacity(0.9);
    `;

    // Add the pinned image to the document body to avoid overflow issues
    document.body.appendChild(pinnedImage);

    // Function to update image position based on list item position
    const updateImagePosition = () => {
      const itemRect = item.getBoundingClientRect();
      const rightOffset = -20; // Distance from right edge of item

      pinnedImage.style.left = itemRect.right - 200 - rightOffset + "px";
      pinnedImage.style.top = itemRect.top + itemRect.height / 2 + "px";
    };

    // Mouse enter - show pinned image and add active class
    item.addEventListener("mouseenter", () => {
      // Update image position
      updateImagePosition();

      // Show the pinned image
      pinnedImage.style.opacity = "1";
      pinnedImage.style.transform = "translateY(-50%) scale(1)";

      // Add active class to event item
      item.classList.add("active");
    });

    // Mouse leave - hide pinned image and remove active class
    item.addEventListener("mouseleave", () => {
      // Hide the pinned image
      pinnedImage.style.opacity = "0";
      pinnedImage.style.transform = "translateY(-50%) scale(0.9)";

      // Remove active class from event item
      item.classList.remove("active");
    });

    // Update position on scroll and resize to keep images aligned
    const updateOnScroll = () => {
      if (pinnedImage.style.opacity !== "0") {
        updateImagePosition();
      }
    };

    window.addEventListener("scroll", updateOnScroll);
    window.addEventListener("resize", updateOnScroll);

    /* ORIGINAL MOUSE-FOLLOWING CODE (DISABLED):
    // Mouse enter - show image and add active class
    item.addEventListener("mouseenter", () => {
      // Set the image source using imported asset URL
      mouseImage.src = imageUrl;

      // Show the image
      mouseImage.style.opacity = "1";

      // Add active class to event item
      item.classList.add("active");

      // Ensure image is positioned correctly
      mouseImage.style.left = mouseX + "px";
      mouseImage.style.top = mouseY + "px";
    });

    // Mouse leave - hide image and remove active class
    item.addEventListener("mouseleave", () => {
      // Hide the image
      mouseImage.style.opacity = "0";

      // Remove active class from event item
      item.classList.remove("active");
    });
    */
  });
}

// Simple debounce function to prevent too many resize calculations
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Function to reinitialize all split-type elements
export function reinitializeAllSplitElements() {
  // First clean up all existing generic split instances (not the hero heading yet)
  if (typeof window.cleanupSplitLines === "function") {
    window.cleanupSplitLines(); // Assumes this cleans up non-hero elements
  }
  if (typeof window.cleanupSplitChars === "function") {
    window.cleanupSplitChars(); // Assumes this cleans up non-hero elements
  }

  // Handle Hero Heading Special Case
  const heroHeading = document.querySelector("#hero-area h1");
  if (heroHeading) {
    let currentProgress = 0; // Default progress if trigger doesn't exist

    // Capture current progress and apply state BEFORE killing
    if (heroHeadingFadeScrollTrigger && heroHeadingFadeScrollTrigger.animation) {
      currentProgress = heroHeadingFadeScrollTrigger.progress;

      // Manually set opacity based on current progress to prevent flash
      const chars = heroHeading.querySelectorAll(".char");
      if (chars.length > 0) {
        // Use the same animation logic (opacity and z) to set the state
        const tempTl = gsap.timeline({ paused: true });
        tempTl.to(
          chars,
          {
            opacity: 0,
            z: -50,
            stagger: 0.02, // Use same stagger as the animation
            ease: "power1.in",
          },
          0
        );

        // Apply the progress to this temporary timeline state
        tempTl.progress(currentProgress);
        // We don't kill this tempTl, gsap.set effectively applies the calculated style
      }
    }

    // Kill the associated scroll trigger AFTER applying state
    if (heroHeadingFadeScrollTrigger) {
      heroHeadingFadeScrollTrigger.kill();
      heroHeadingFadeScrollTrigger = null; // Clear reference
    }

    // Check if chars already exist. If so, DON'T reset innerHTML.
    if (!heroHeading.querySelector(".char")) {
      // Only reset innerHTML if it wasn't already split
      const originalContent = heroHeading.getAttribute("data-original-content") || heroHeading.textContent;
      heroHeading.innerHTML = originalContent;
    } else {
      // Ensure the manually set styles persist if we didn't reset innerHTML
      // (GSAP should handle this, but good to be mindful)
    }
  }

  // --- Hero Number Handling on Resize ---
  // No changes needed here based on previous fix.

  // Find all *other* split-lines and split-chars elements
  const splitLinesElements = Array.from(document.querySelectorAll(".split-lines")).filter(
    (el) => !el.closest("#hero-area")
  );
  const splitCharsElements = Array.from(document.querySelectorAll(".split-chars")).filter(
    (el) => !el.closest("#hero-area")
  );

  // Clean up existing split instances for these elements by restoring original content
  splitLinesElements.forEach((element) => {
    const originalContent = element.getAttribute("data-original-content");
    if (originalContent) {
      element.innerHTML = originalContent;
    }
  });

  splitCharsElements.forEach((element) => {
    const originalContent = element.getAttribute("data-original-content");
    if (originalContent) {
      element.innerHTML = originalContent;
    }
  });

  // Reinitialize animations AFTER cleaning up and allowing DOM update
  setTimeout(() => {
    // Reinitialize generic split animations first
    if (splitLinesElements.length && typeof initSplitLinesAnimation === "function") {
      initSplitLinesAnimation(splitLinesElements); // Pass the non-hero elements
    }
    if (splitCharsElements.length && typeof initSplitCharsAnimation === "function") {
      initSplitCharsAnimation(splitCharsElements); // Pass the non-hero elements
    }

    // THEN re-setup the hero heading animation (it will find existing or create new chars)
    if (typeof setupHeroHeadingFadeAnimation === "function") {
      setupHeroHeadingFadeAnimation();
    }

    // Refresh ScrollTrigger *after* all animations are potentially re-created
    ScrollTrigger.refresh();
  }, 50); // Reduced delay slightly
}

// Initialize the global resize handler
function initGlobalResizeHandler() {
  // Remove any existing resize handler to prevent duplicates
  if (window.globalResizeHandler) {
    window.removeEventListener("resize", window.globalResizeHandler);
  }

  // Create a properly debounced global resize handler
  window.globalResizeHandler = debounce(() => {
    // Reinitialize all split elements and animations
    reinitializeAllSplitElements();

    // Note: setupHeroHeadingFadeAnimation is now called within reinitializeAllSplitElements
    // Note: ScrollTrigger.refresh() is now called within reinitializeAllSplitElements
  }, 250);

  // Add the event listener
  window.addEventListener("resize", window.globalResizeHandler);

  // Also listen for orientation changes which may not trigger resize on some devices
  window.addEventListener("orientationchange", () => {
    // Use a slightly longer delay for orientation changes
    // Reinitialize all split elements and animations
    reinitializeAllSplitElements();
    // Note: Using the same central reinitialization function
  });
}
