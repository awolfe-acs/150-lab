import { animateCountdownChange } from "./animation.js";
import logger from "./utils/logger.js";

export function initCountdown(targetDate) {
  // Verify countdown elements exist
  const requiredElements = ['days', 'hours', 'minutes', 'seconds'];
  const missingElements = requiredElements.filter(id => !document.querySelector(`#${id} .number`));
  
  if (missingElements.length > 0) {
    logger.error(`[Countdown] Missing required elements:`, missingElements);
    return;
  }
  
  logger.log('[Countdown] All required elements found, starting countdown');

  function updateCountdown() {
    try {
      const now = Date.now();
      const distance = targetDate - now;
      
      if (distance < 0) {
        // Countdown finished
        logger.log('[Countdown] Target date reached');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      animateCountdownChange("days", days);
      animateCountdownChange("hours", hours);
      animateCountdownChange("minutes", minutes);
      animateCountdownChange("seconds", seconds);
    } catch (error) {
      logger.error('[Countdown] Error updating countdown:', error);
    }
  }

  // Initial update
  updateCountdown();
  
  // Update every second
  setInterval(updateCountdown, 1000);
}
