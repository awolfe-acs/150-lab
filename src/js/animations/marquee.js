// animations/marquee.js
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import debounce from "../utils/debounce.js";

// Initialize infinite marquee animation for form panel image with responsive support
export function initInfiniteMarqueeAnimation() {
  const animationColumn = document.querySelector(".form-panel .animation-column");
  const originalImage = animationColumn?.querySelector("img");

  if (!animationColumn || !originalImage) {
    console.warn("Form panel animation column or image not found");
    return;
  }

  // Create marquee container only if it doesn't exist
  let marqueeContainer = animationColumn.querySelector(".marquee-container");
  if (!marqueeContainer) {
    marqueeContainer = document.createElement("div");
    marqueeContainer.className = "marquee-container";

    // Clone the original image for seamless loop
    const clonedImage = originalImage.cloneNode(true);
    clonedImage.className += " cloned-image"; // Add identifier for the clone

    // Remove original image from its current position
    originalImage.remove();

    // Add both images to the marquee container
    marqueeContainer.appendChild(originalImage);
    marqueeContainer.appendChild(clonedImage);

    // Add marquee container to animation column
    animationColumn.appendChild(marqueeContainer);
  }

  // Store references for resize handling
  const images = [originalImage, marqueeContainer.querySelector(".cloned-image")];
  let currentAnimation = null;

  // Function to set up or reset the animation
  const setupAnimation = () => {
    // Kill any existing animation
    if (currentAnimation) {
      currentAnimation.kill();
      currentAnimation = null;
    }

    // Force layout recalculation
    animationColumn.offsetHeight;
    originalImage.offsetHeight;

    // Wait for layout to be calculated
    setTimeout(() => {
      // Get the actual rendered dimensions of the image
      const imageRect = originalImage.getBoundingClientRect();
      const actualHeight = imageRect.height;

      // Ensure we have a valid height
      if (actualHeight <= 0) {
        // Check if viewport is less than 580px - if so, don't retry since marquee is hidden
        if (window.innerWidth < 580) {
          console.log("Viewport width < 580px, skipping marquee setup (element is hidden)");
          return;
        }
        console.warn("Image height is 0, retrying marquee setup...");
        setTimeout(setupAnimation, 200);
        return;
      }

      // Reset any existing transforms
      gsap.set(images, { y: 0, top: "auto" });

      // Position the images - second image directly below the first
      gsap.set(originalImage, {
        position: "absolute",
        top: 0,
        left: 0,
      });

      gsap.set(images[1], {
        position: "absolute",
        top: actualHeight + "px", // Position exactly one image height below
        left: 0,
      });

      // Create the infinite animation timeline
      const tl = gsap.timeline({ repeat: -1, ease: "none" });

      // Calculate duration based on actual image height (adjust speed as needed)
      const duration = Math.max(actualHeight / 30, 2); // Minimum 2 seconds duration, 30 pixels per second

      // Animate both images moving up by exactly one image height
      tl.to(images, {
        y: -actualHeight,
        duration: duration,
        ease: "none",
      });

      // Reset positions when animation completes to create seamless loop
      tl.set(images, {
        y: 0,
      });

      // Store reference to current animation
      currentAnimation = tl;
    }, 100); // Small delay to ensure layout is complete
  };

  // Function to handle resize events
  const handleMarqueeResize = debounce(() => {
    // Force layout recalculation before restarting animation
    document.body.offsetHeight;
    setupAnimation();
  }, 250);

  // Set up the initial animation
  const initializeMarquee = () => {
    if (originalImage.complete && originalImage.naturalHeight !== 0) {
      setupAnimation();
    } else {
      originalImage.addEventListener("load", setupAnimation);
      // Fallback in case load event doesn't fire
      setTimeout(setupAnimation, 1000);
    }
  };

  // Initialize the marquee
  initializeMarquee();

  // Add resize event listener to recalculate animation on viewport changes
  window.addEventListener("resize", handleMarqueeResize);

  // Also handle orientation changes
  window.addEventListener("orientationchange", () => {
    setTimeout(handleMarqueeResize, 300);
  });

  // Store cleanup function for potential use
  window.cleanupInfiniteMarquee = () => {
    if (currentAnimation) {
      currentAnimation.kill();
      currentAnimation = null;
    }
    window.removeEventListener("resize", handleMarqueeResize);
  };

  // Add a one-time scroll event to recalculate if needed
  // (in case the image dimensions change due to lazy loading or other factors)
  let hasScrolledMarquee = false;
  const oneTimeMarqueeScrollHandler = () => {
    if (!hasScrolledMarquee) {
      hasScrolledMarquee = true;

      // Check if the image dimensions have changed
      const currentHeight = originalImage.getBoundingClientRect().height;
      const expectedTop = parseFloat(images[1].style.top || "0");

      if (Math.abs(currentHeight - expectedTop) > 5) {
        // 5px tolerance
        setupAnimation();
      }

      window.removeEventListener("scroll", oneTimeMarqueeScrollHandler);
    }
  };
  window.addEventListener("scroll", oneTimeMarqueeScrollHandler);

  // Also recalculate after fonts are loaded (which might affect image dimensions)
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      setTimeout(setupAnimation, 100);
    });
  }
}
