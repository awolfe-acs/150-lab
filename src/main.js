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

// Function to check if we're on the main 150 pages
function isMainPage() {
  const currentUrl = window.location.href.toLowerCase();

  // Check if editor.html is in the URL - if so, return false
  if (currentUrl.includes("/editor.html/") || currentUrl.includes("globe.html")) {
    console.log("Not on main page");
    return false;
  }

  // Check if we're on index.html or one of the specified domains with /150
  return (
    currentUrl.includes("index.html") ||
    currentUrl.includes("acs.org/150") ||
    currentUrl.includes("localhost:5173") ||
    currentUrl.includes("cmswwwdev.acs.org/150")
  );
}

// Prevent browser from restoring scroll position on refresh
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}

// Force scroll to top immediately
window.scrollTo(0, 0);

// Also force scroll to top when the page is about to be unloaded (before refresh)
window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
  sessionStorage.setItem("scrollToTop", "true");
});

// When window loads, force scroll back to top
window.addEventListener("load", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant", // Use 'instant' instead of smooth for immediate effect
  });

  // Small delay to ensure scroll is applied after browser might try to restore position
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 10);
});

document.addEventListener("DOMContentLoaded", () => {
  // Force scroll to top again when DOM is ready
  window.scrollTo(0, 0);

  // Always create the Lenis instance, but only start it on main pages
  window.lenis = new Lenis({
    autoRaf: true,
    infinite: false,
  });

  // Always stop scrolling initially
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

  // Initialize shader background (always run this)
  initShaderBackground();

  // Only run animations and video on main pages
  if (isMainPage()) {
    console.log("Initializing main page experience");

    // Initialize animations
    initAnimations();

    // Initialize video
    initVideo();

    // On main pages, Lenis will be enabled when the enter-experience button is clicked
    // (this happens in the animation.js or elsewhere)
  } else {
    console.log("Running in lightweight mode - animations and video disabled");

    // For non-main pages, we might want to start Lenis immediately
    // Uncomment this if you want scrolling enabled on non-main pages
    // window.lenis.start();
  }

  // Final attempt to ensure we're at the top
  setTimeout(() => {
    window.scrollTo(0, 0);
    window.lenis.scrollTo(0, { immediate: true });
  }, 100);
});
