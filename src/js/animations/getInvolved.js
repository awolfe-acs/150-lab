// animations/getInvolved.js
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import debounce from "../utils/debounce.js";
import logger from "../utils/logger.js";

export function animateGetInvolvedText() {
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
        logger.warn("SplitType failed to detect lines properly");
      }
    }, 100); // Small delay to ensure proper layout
  }
}

export function initGetInvolvedLogoAnimation() {
  // Get the get involved logo element
  const logoElement = document.querySelector(".get-involved-150-logo");

  if (!logoElement) {
    logger.warn("No .get-involved-150-logo element found");
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

export function animateSlidingCards() {
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
              refreshPriority: -1, // Ensure this calculates AFTER the timeline pin above it
            },
          }
        ).scrollTrigger;
      } else if (scrollTriggerInstance) {
        // If it already exists, just refresh it
        scrollTriggerInstance.refresh();
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
    logger.warn("Could not find sliding card wrapper or get-involved-cards section");
  }
}
