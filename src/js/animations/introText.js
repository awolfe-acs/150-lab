// animations/introText.js
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Note: Pinning is handled by initHeroPinning() in hero.js
// which processes all .pin-top-top elements including #intro-text

// Initialize intro text fade animations
export function initIntroTextAnimation() {
  const introTextContainer = document.querySelector("#intro-text .intro-text-container");
  const heroTravelArea = document.querySelector("#hero-travel-area");
  const introTextTravelArea = document.querySelector("#intro-text-travel-area");
  
  if (!introTextContainer || !heroTravelArea || !introTextTravelArea) {
    console.warn("Intro text elements not found for animation");
    return;
  }

  // Set initial state - hidden but already centered (no Y offset)
  gsap.set(introTextContainer, {
    opacity: 0,
  });

  // Create timeline for fade in and fade out - triggered by hero ending
  const introTextTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: heroTravelArea,
      start: "bottom 75%", // Start fading in a bit later (was 85%)
      end: "bottom 15%", // Complete fade in after hero ends (was 20%)
      scrub: 0.5,
      markers: false,
      id: "intro-text-fade-in",
      invalidateOnRefresh: true,
    },
  });

  // Fade in
  introTextTimeline.to(introTextContainer, {
    opacity: 1,
    ease: "power2.out",
  });

  // Separate timeline for fade out - based on intro text travel area
  const fadeOutTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: introTextTravelArea,
      start: "35% top", // Hold visible for first 35% of scroll (105svh)
      end: "45% top", // Complete fade by 45% (135svh) - leaves 55% (165svh) buffer while pinned and invisible
      scrub: 0.5,
      markers: false,
      id: "intro-text-fade-out",
      invalidateOnRefresh: true,
    },
  });

  // Fade out
  fadeOutTimeline.to(introTextContainer, {
    opacity: 0,
    ease: "power2.in",
  });
}

