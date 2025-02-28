import { animateCountdownChange } from "./animation.js";

export function initCountdown(targetDate) {
  function updateCountdown() {
    const now = Date.now();
    const distance = targetDate - now;
    if (distance < 0) {
      // Countdown finished, clear timer by not scheduling further updates
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Optionally log the countdown
    const daysFormatted = days >= 100 ? String(days) : ("0" + days).slice(-2);
    const hoursFormatted = ("0" + hours).slice(-2);
    const minutesFormatted = ("0" + minutes).slice(-2);
    const secondsFormatted = ("0" + seconds).slice(-2);

    animateCountdownChange("days", days);
    animateCountdownChange("hours", hours);
    animateCountdownChange("minutes", minutes);
    animateCountdownChange("seconds", seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}
