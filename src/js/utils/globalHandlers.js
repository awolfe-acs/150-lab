// utils/globalHandlers.js
// Global resize and reinitialization handlers

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import debounce from "./debounce.js";
import { animationState } from "../config/animationConfig.js";
import { initSplitLinesAnimation, initSplitCharsAnimation } from "./splitText.js";
import { setupHeroHeadingFadeAnimation } from "../animations/hero.js";

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
    if (animationState.heroHeadingFadeScrollTrigger && animationState.heroHeadingFadeScrollTrigger.animation) {
      currentProgress = animationState.heroHeadingFadeScrollTrigger.progress;

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
    if (animationState.heroHeadingFadeScrollTrigger) {
      animationState.heroHeadingFadeScrollTrigger.kill();
      animationState.heroHeadingFadeScrollTrigger = null; // Clear reference
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
export function initGlobalResizeHandler() {
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
