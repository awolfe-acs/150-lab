import gsap from "gsap";

/**
 * Animates countdown number changes with a smooth transition effect
 * @param {string} unit - The time unit (days, hours, minutes, seconds)
 * @param {number} value - The new value to display
 */
export function animateCountdownChange(unit, value) {
  const element = document.querySelector(`#${unit} .number`);
  if (!element) return;

  // Format the value with leading zeros where appropriate
  let formattedValue;
  if (unit === "days" && value >= 100) {
    formattedValue = String(value);
  } else {
    formattedValue = ("0" + value).slice(-2);
  }

  // Only animate if the value has actually changed
  if (element.textContent !== formattedValue) {
    // Create a fade out/fade in transition effect
    gsap.to(element, {
      duration: 0.2,
      opacity: 0,
      y: -10, // Slight upward movement during fade out
      ease: "power2.in",
      onComplete: () => {
        // Update the text content while invisible
        element.textContent = formattedValue;
        
        // Fade back in with downward movement
        gsap.fromTo(element, 
          {
            opacity: 0,
            y: 10 // Start slightly below
          },
          {
            duration: 0.3,
            opacity: 1,
            y: 0, // Return to original position
            ease: "power2.out"
          }
        );
      }
    });
  } else {
    // If no animation needed, just update the text
    element.textContent = formattedValue;
  }
}
