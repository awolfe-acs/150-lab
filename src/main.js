import Lenis from "lenis";
import "./scss/main.scss";
import "lenis/dist/lenis.css";
import { initShaderBackground } from "./js/background.js";
import { initAnimations } from "./js/animation.js";
import { initCountdown } from "./js/countdown.js";
import { initDebug } from "./js/debug.js";
import gsap from "gsap";

// At the top of the file, add the debugMode flag
const debugMode = true;

// Set your target date/time here
const targetDate = new Date("2026-04-06T00:00:00").getTime();

// Ensure scroll position is at the top before load
window.scrollTo(0, 0);

// Also, when window loads, force scroll back to top
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

document.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(0, 0);
  const lenis = new Lenis({
    autoRaf: true,
  });
  lenis.on("scroll", (e) => {
    //console.log(e);
  });

  // Initialize countdown timer
  initCountdown(targetDate);

  // Initialize debug mode if enabled
  if (debugMode) {
    initDebug();
  }
  // Initialize shader background
  initShaderBackground();
  // Initialize animations
  initAnimations();
});
