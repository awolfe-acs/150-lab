// animations/scrollReveal.js
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Initialize simple scroll reveal animation without text splitting
export function initScrollRevealAnimation() {
  // Get all elements with the scroll-reveal class
  const scrollRevealElements = document.querySelectorAll(".scroll-reveal");

  if (!scrollRevealElements.length) {
    console.warn("No .scroll-reveal elements found");
    return;
  }

  // Process each scroll-reveal element
  scrollRevealElements.forEach((element, index) => {
    // Check if this element has the button class
    const isButton = element.classList.contains("fancy-btn");

    if (isButton) {
      // For button elements, use filter:opacity() instead of opacity
      // Set initial state - hidden using filter opacity and shifted down
      gsap.set(element, {
        y: 50,
        filter: "opacity(0)", // Use filter instead of opacity
      });

      // Create ScrollTrigger animation for button elements
      ScrollTrigger.create({
        trigger: element,
        start: "top 85%", // Trigger when the top of the element is 85% from the top of viewport
        once: false, // Allow the animation to run multiple times if scrolled past
        markers: false, // Set to true for debugging
        id: `scroll-reveal-button-${index}`,
        onEnter: () => {
          // Animate when element enters the viewport
          gsap.to(element, {
            y: 0,
            filter: "opacity(1)", // Animate filter to fully visible
            duration: 1.2,
            ease: "power2.out",
            overwrite: true,
          });
        },
        onLeaveBack: () => {
          // Reset the animation when scrolling back up
          gsap.to(element, {
            y: 50,
            filter: "opacity(0)", // Reset filter to invisible
            duration: 0.8,
            ease: "power2.in",
            overwrite: true,
          });
        },
      });
    } else {
      // For normal scroll-reveal elements, use regular opacity
      // Set initial state - hidden and shifted down
      gsap.set(element, {
        opacity: 0,
        y: 50,
      });

      // Create ScrollTrigger animation for each element
      ScrollTrigger.create({
        trigger: element,
        start: "top 85%", // Trigger when the top of the element is 85% from the top of viewport
        once: false, // Allow the animation to run multiple times if scrolled past
        markers: false, // Set to true for debugging
        id: `scroll-reveal-${index}`,
        onEnter: () => {
          // Animate when element enters the viewport
          gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            overwrite: true,
          });
        },
        onLeaveBack: () => {
          // Reset the animation when scrolling back up
          gsap.to(element, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power2.in",
            overwrite: true,
          });
        },
      });
    }
  });
}
