import "./scss/banner.scss";
import { initCountdown } from "./js/countdown.js";

// Set your target date/time here
const targetDate = new Date("2026-04-06T00:00:00").getTime();

// Initialize function
function initBanner() {
  console.log('[Banner] Initializing...');
  
  // Verify DOM is ready
  if (document.readyState === 'loading') {
    console.log('[Banner] DOM not ready, waiting...');
    document.addEventListener("DOMContentLoaded", initBanner);
    return;
  }
  
  // Check if countdown container exists
  const countdownContainer = document.querySelector('#countdown') || document.querySelector('.banner-countdown');
  if (!countdownContainer) {
    console.error('[Banner] Countdown container not found in DOM');
    return;
  }
  
  console.log('[Banner] Countdown container found, initializing countdown');
  
  // Initialize countdown timer
  try {
    initCountdown(targetDate);
    console.log('[Banner] Countdown initialized successfully');
  } catch (error) {
    console.error('[Banner] Error initializing countdown:', error);
  }
}

// Start initialization
initBanner();
