import Lenis from "lenis";
import "./scss/main.scss";
import "lenis/dist/lenis.css";
import { initShaderBackground } from "./js/background.js";
import { initAnimations } from "./js/animation.js";
import { initVideo } from "./js/video.js";
//import { initCountdown } from "./js/countdown.js";
import { initDebug } from "./js/debug.js";
import gsap from "gsap";

// At the top of the file, add the debugMode flag
const debugMode = false;

// Set your target date/time here
const targetDate = new Date("2026-04-06T00:00:00").getTime();

// Prevent browser from restoring scroll position on refresh
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}

// Force scroll to top immediately
window.scrollTo(0, 0);

// Also force scroll to top when the page is about to be unloaded (before refresh)
window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
  sessionStorage.setItem('scrollToTop', 'true');
});

// When window loads, force scroll back to top
window.addEventListener("load", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant' // Use 'instant' instead of smooth for immediate effect
  });
  
  // Small delay to ensure scroll is applied after browser might try to restore position
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 10);
});

document.addEventListener("DOMContentLoaded", () => {
  // Force scroll to top again when DOM is ready
  window.scrollTo(0, 0);
  
  // Create a global lenis instance that can be accessed from other modules
  window.lenis = new Lenis({
    autoRaf: true,
  });
  
  // Stop scrolling initially - will be enabled when enter-experience button is clicked
  window.lenis.stop();
  
  window.lenis.on("scroll", (e) => {
    //console.log(e);
  });

  // Initialize countdown timer
  // initCountdown(targetDate);

  // Initialize debug mode if enabled
  if (debugMode) {
    initDebug();
  }
  // Initialize shader background
  initShaderBackground();
  // Initialize animations
  initAnimations();
  // Initialize video
  initVideo();
  
  // Final attempt to ensure we're at the top
  setTimeout(() => {
    window.scrollTo(0, 0);
    window.lenis.scrollTo(0, { immediate: true });
  }, 100);
});
