import "./scss/banner.scss";
import { initBannerBackground } from "./js/background-banner.js";
import { initCountdown } from "./js/countdown.js";

// Debug GUI flag - set to true to enable debug controls
const debugGUI = true;

// Set your target date/time here
const targetDate = new Date("2026-04-06T00:00:00").getTime();

document.addEventListener("DOMContentLoaded", async () => {
  // Initialize countdown timer
  initCountdown(targetDate);

  // Initialize simplified shader background for banner
  try {
    await initBannerBackground({ debugGUI });
    console.log('[Banner] Background initialized successfully');
  } catch (error) {
    console.error("Failed to initialize banner background:", error);
    console.warn("Continuing without background...");
  }
});

