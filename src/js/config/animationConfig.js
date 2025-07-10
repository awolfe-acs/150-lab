// config/animationConfig.js
// Centralized store for shared GSAP objects and animation state

export const animationState = {
  heroYearObj: { year: 2026 },
  heroNumberTween: null,
  heroHeadingFadeScrollTrigger: null,
  // Add any other shared mutable GSAP/ScrollTrigger references here
};

// Helper to reset state on reinitialization if needed
export function resetAnimationState() {
  animationState.heroYearObj.year = 2026;
  if (animationState.heroNumberTween) {
    animationState.heroNumberTween.kill();
    animationState.heroNumberTween = null;
  }
  if (animationState.heroHeadingFadeScrollTrigger) {
    animationState.heroHeadingFadeScrollTrigger.kill();
    animationState.heroHeadingFadeScrollTrigger = null;
  }
  // ... reset other state variables as needed
}
