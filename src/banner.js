import "./scss/banner.scss";
import { initCountdown } from "./js/countdown.js";

// Set your target date/time here
const targetDate = new Date("2026-04-06T00:00:00").getTime();

document.addEventListener("DOMContentLoaded", () => {
  // Initialize countdown timer
  initCountdown(targetDate);
  console.log('[Banner] Countdown initialized');
});
