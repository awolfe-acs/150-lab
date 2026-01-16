// animations/scrollReveal.js
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import logger from "../utils/logger.js";

// Initialize simple scroll reveal animation without text splitting
export function initScrollRevealAnimation() {
  // Get all elements with reveal classes
  const scrollRevealElements = document.querySelectorAll(".scroll-reveal, .reveal-top-center, .reveal-center-center");

  if (!scrollRevealElements.length) {
    logger.warn("No reveal elements found");
    return;
  }

  // Process each reveal element
  scrollRevealElements.forEach((element, index) => {
    // Check if this element has the button class
    const isButton = element.classList.contains("fancy-btn");
    
    // Check for custom delay attribute (in milliseconds, converted to seconds for GSAP)
    const customDelayMs = parseFloat(element.getAttribute("data-reveal-delay")) || 0;
    const customDelay = customDelayMs / 1000; // Convert milliseconds to seconds
    
    // Determine animation direction and trigger position based on class
    let initialY = 50; // Default: from bottom
    let triggerStart = "top 85%"; // Default: trigger early
    
    if (element.classList.contains("reveal-top-center")) {
      initialY = -50; // From top
      triggerStart = "top 50%"; // Trigger when top of element reaches center of viewport
    } else if (element.classList.contains("reveal-center-center")) {
      initialY = 0; // From center (no Y movement)
      triggerStart = "center 50%"; // Trigger when center of element reaches center of viewport
    }

    if (isButton) {
      // For button elements, use filter:opacity() instead of opacity
      // Set initial state - hidden using filter opacity and shifted
      gsap.set(element, {
        y: initialY,
        filter: "opacity(0)", // Use filter instead of opacity
      });

      // Create ScrollTrigger animation for button elements
      ScrollTrigger.create({
        trigger: element,
        start: triggerStart, // Use dynamic trigger position based on class
        once: false, // Allow the animation to run multiple times if scrolled past
        markers: false, // Set to true for debugging
        id: `scroll-reveal-button-${index}`,
        onEnter: () => {
          // Animate when element enters the viewport
          gsap.to(element, {
            y: 0,
            filter: "opacity(1)", // Animate filter to fully visible
            duration: 1.2,
            delay: customDelay,
            ease: "power2.out",
            overwrite: true,
          });
        },
        onLeaveBack: () => {
          // Reset the animation when scrolling back up
          gsap.to(element, {
            y: initialY,
            filter: "opacity(0)", // Reset filter to invisible
            duration: 0.8,
            ease: "power2.in",
            overwrite: true,
          });
        },
      });
    } else {
      // For normal reveal elements, use regular opacity
      // Set initial state - hidden and shifted based on class
      gsap.set(element, {
        opacity: 0,
        y: initialY,
      });

      // Create ScrollTrigger animation for each element
      ScrollTrigger.create({
        trigger: element,
        start: triggerStart, // Use dynamic trigger position based on class
        once: false, // Allow the animation to run multiple times if scrolled past
        markers: false, // Set to true for debugging
        id: `scroll-reveal-${index}`,
        onEnter: () => {
          // Animate when element enters the viewport
          gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: customDelay,
            ease: "power2.out",
            overwrite: true,
          });
        },
        onLeaveBack: () => {
          // Reset the animation when scrolling back up
          gsap.to(element, {
            opacity: 0,
            y: initialY,
            duration: 0.8,
            ease: "power2.in",
            overwrite: true,
          });
        },
      });
    }
  });
}
