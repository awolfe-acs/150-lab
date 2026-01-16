import gsap from "gsap";
import logger from "./utils/logger.js";

// Verify GSAP loaded correctly
if (!gsap || typeof gsap.to !== 'function') {
  logger.error('[Animation] GSAP not loaded correctly!', gsap);
} else {
  logger.log('[Animation] GSAP loaded successfully');
}

/**
 * Validates that an element is a proper DOM node suitable for GSAP
 * @param {*} element - The element to validate
 * @returns {boolean} True if valid, false otherwise
 */
function isValidDOMElement(element) {
  return (
    element &&
    element.nodeType === 1 && // ELEMENT_NODE
    typeof element.textContent === 'string' &&
    element.parentNode !== null
  );
}

/**
 * CSS-based animation fallback for environments where GSAP fails
 * @param {HTMLElement} element - The element to animate
 * @param {string} newValue - The new text value
 */
function animateWithCSS(element, newValue) {
  // Add transition if not already present
  if (!element.style.transition) {
    element.style.transition = 'opacity 0.2s ease-in, transform 0.2s ease-in';
  }
  
  // Fade out
  element.style.opacity = '0';
  element.style.transform = 'translateY(-10px)';
  
  setTimeout(() => {
    // Update value while invisible
    element.textContent = newValue;
    
    // Prepare for fade in
    element.style.transform = 'translateY(10px)';
    
    // Use RAF to ensure transform is applied before fade in
    requestAnimationFrame(() => {
      element.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    });
  }, 200);
}

/**
 * Animates countdown number changes with a smooth transition effect
 * @param {string} unit - The time unit (days, hours, minutes, seconds)
 * @param {number} value - The new value to display
 */
export function animateCountdownChange(unit, value) {
  const element = document.querySelector(`#${unit} .number`);
  
  // Exit early if element doesn't exist
  if (!element) {
    logger.warn(`[Animation] Element not found for unit: ${unit}`);
    return;
  }

  // Validate element is a proper DOM node
  if (!isValidDOMElement(element)) {
    logger.warn(`[Animation] Invalid DOM element for unit: ${unit}`, element);
    return;
  }

  // Format the value with leading zeros where appropriate
  let formattedValue;
  if (unit === "days" && value >= 100) {
    formattedValue = String(value);
  } else {
    formattedValue = ("0" + value).slice(-2);
  }

  // Only animate if the value has actually changed
  if (element.textContent !== formattedValue) {
    // Check if GSAP is available and working
    const gsapAvailable = gsap && typeof gsap.to === 'function';
    
    if (!gsapAvailable) {
      logger.warn('[Animation] GSAP not available, using CSS fallback');
      animateWithCSS(element, formattedValue);
      return;
    }
    
    // Detect if we're in banner mode (no y translation for banner)
    const isBannerMode = document.querySelector('#banner-container') !== null;
    
    try {
      // Create a simple timeline for more reliable animation
      const tl = gsap.timeline();
      
      if (isBannerMode) {
        // Banner mode: simple fade only, absolutely NO transforms
        // Explicitly clear any transforms first
        tl.set(element, {
          clearProps: "transform,y,x"
        });
        
        // Fade out - ONLY opacity, no transforms whatsoever
        tl.to(element, {
          duration: 0.2,
          opacity: 0,
          ease: "power2.in"
          // NO y property at all - not even y: 0
        });
        
        // Update text content while invisible
        tl.call(() => {
          if (isValidDOMElement(element)) {
            element.textContent = formattedValue;
          }
        });
        
        // Fade in - ONLY opacity, no transforms whatsoever
        tl.to(element, {
          duration: 0.3,
          opacity: 1,
          ease: "power2.out"
          // NO y property at all - not even y: 0
        });
      } else {
        // Full site mode: fade with y translation
        // Fade out the old value (moves up and fades)
        tl.to(element, {
          duration: 0.2,
          opacity: 0,
          y: -10,
          ease: "power2.in"
        });
        
        // Update text content while invisible
        tl.call(() => {
          if (isValidDOMElement(element)) {
            element.textContent = formattedValue;
          }
        });
        
        // Set starting position for fade-in (below, invisible)
        tl.set(element, {
          y: 10,
          opacity: 0
        });
        
        // Fade in the new value
        tl.to(element, {
          duration: 0.3,
          opacity: 1,
          y: 0,
          ease: "power2.out",
          clearProps: "transform" // Clean up inline styles after animation
        });
      }
      
    } catch (error) {
      logger.error('[Animation] GSAP animation error, falling back to CSS:', error);
      // Fallback to CSS-based animation
      animateWithCSS(element, formattedValue);
    }
  } else {
    // If no animation needed, just ensure the text is correct
    element.textContent = formattedValue;
  }
}
