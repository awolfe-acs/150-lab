// utils/splitText.js
import SplitType from "split-type";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Internal state for split instances
const splitInstances = [];
const splitCharsInstances = [];

// Check if fonts are loaded
const waitForFonts = () => {
  return new Promise((resolve) => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        resolve();
      });
    } else {
      // Fallback for browsers without font loading API
      setTimeout(resolve, 100);
    }
  });
};

// Check if images in/near the element are loaded
const waitForImages = (element) => {
  return new Promise((resolve) => {
    // Get the parent container that might affect layout
    const container = element.closest("section") || element.parentNode;
    if (!container) {
      resolve();
      return;
    }

    const images = container.querySelectorAll("img");
    if (images.length === 0) {
      resolve();
      return;
    }

    // For safety, set a max timeout
    const timeout = setTimeout(resolve, 2000);

    let loadedCount = 0;

    // First check if all images are already loaded
    let allLoaded = true;
    images.forEach((img) => {
      if (!img.complete) allLoaded = false;
    });

    if (allLoaded) {
      clearTimeout(timeout);
      resolve();
      return;
    }

    // Wait for images to load
    images.forEach((img) => {
      if (img.complete) {
        loadedCount++;
        if (loadedCount === images.length) {
          clearTimeout(timeout);
          resolve();
        }
      } else {
        img.addEventListener("load", () => {
          loadedCount++;
          if (loadedCount === images.length) {
            clearTimeout(timeout);
            resolve();
          }
        });

        img.addEventListener("error", () => {
          loadedCount++;
          if (loadedCount === images.length) {
            clearTimeout(timeout);
            resolve();
          }
        });
      }
    });
  });
};

// Function to process a single element with proper timing and retries
const processSplitElement = (element, index) => {
  // First, store the original content
  const originalContent = element.innerHTML;
  element.setAttribute("data-original-content", originalContent);

  // Wait for critical resources that affect text layout
  Promise.all([waitForFonts(), waitForImages(element)]).then(() => {
    // Force a reflow to ensure proper layout calculation
    element.offsetHeight;

    // We'll try splitting multiple times if needed
    const attemptSplit = (attempt = 0) => {
      // Apply SplitType directly to the element
      const splitText = new SplitType(element, {
        types: "lines",
        lineClass: "split-line",
        absolute: false, // Avoid absolute positioning which affects layout more
        tagName: "div", // Use div instead of default spans
      });

      // Validate the splitting result
      const isGoodSplit = splitText.lines && splitText.lines.length > 0; // Ensure at least 1 line was created

      if (isGoodSplit) {
        // Store the instance for potential cleanup
        splitInstances.push({
          element,
          splitText,
          originalContent,
        });

        // Set initial state for lines - hidden and shifted down
        gsap.set(splitText.lines, {
          opacity: 0,
          y: 50,
        });

        // Create ScrollTrigger animation for each element
        ScrollTrigger.create({
          trigger: element,
          start: "top 85%", // Trigger when the top of the element is 85% from the top of viewport
          once: false, // Allow the animation to run multiple times if scrolled past
          markers: false, // Set to true for debugging
          id: `split-lines-${index}`,
          onEnter: () => {
            // Animate the lines when they enter the viewport
            gsap.to(splitText.lines, {
              opacity: 1,
              y: 0,
              duration: 1.2,
              stagger: 0.1, // Staggered animation for each line
              ease: "power2.out",
              overwrite: true,
            });
          },
          onLeaveBack: () => {
            // Reset the animation when scrolling back up
            gsap.to(splitText.lines, {
              opacity: 0,
              y: 50,
              duration: 0.8,
              stagger: 0.05,
              ease: "power2.in",
              overwrite: true,
            });
          },
        });
      } else {
        // If split failed or looks incorrect, retry a few times
        if (attempt < 3) {
          // Clean up the failed attempt
          if (splitText && typeof splitText.revert === "function") {
            splitText.revert();
          }

          // Wait longer before each retry
          setTimeout(() => {
            attemptSplit(attempt + 1);
          }, 300 * (attempt + 1)); // 300ms, 600ms, 900ms
        } else {
          console.warn("SplitType failed to create lines properly after multiple attempts:", element);
          // Restore original content if split failed after all retries
          element.innerHTML = originalContent;
        }
      }
    };

    // Start with first attempt
    attemptSplit();
  });
};

// Function to process a single element with proper timing and retries for chars
const processSplitCharsElement = (element, index) => {
  // First, store the original content
  const originalContent = element.innerHTML;
  element.setAttribute("data-original-content", originalContent);

  // Wait for critical resources that affect text layout
  Promise.all([waitForFonts(), waitForImages(element)]).then(() => {
    // Force a reflow to ensure proper layout calculation
    element.offsetHeight;

    // We'll try splitting multiple times if needed
    const attemptSplit = (attempt = 0) => {
      // Apply SplitType directly to the element (not to a wrapper)
      const splitText = new SplitType(element, {
        types: "chars",
        charClass: "split-char",
        absolute: false,
        tagName: "span", // Use spans for characters as they're inline elements
      });

      // Check if chars were created properly
      if (splitText.chars && splitText.chars.length > 0) {
        // Store the instance for potential cleanup
        splitCharsInstances.push({
          element,
          splitText,
          originalContent,
        });

        // Set initial state for chars - hidden and shifted down
        gsap.set(splitText.chars, {
          opacity: 0,
          y: 50,
          // Ensure characters don't break the flow
          display: "inline-block",
        });

        // Create ScrollTrigger animation for each element
        ScrollTrigger.create({
          trigger: element,
          start: "top 85%", // Trigger when the top of the element is 85% from the top of viewport
          once: false, // Allow the animation to run multiple times if scrolled past
          markers: false, // Set to true for debugging
          id: `split-chars-${index}`,
          onEnter: () => {
            // Animate the chars when they enter the viewport
            gsap.to(splitText.chars, {
              opacity: 1,
              y: 0,
              duration: 1.2,
              stagger: 0.02, // Faster stagger for chars since there are more of them
              ease: "power2.out",
              overwrite: true,
            });
          },
          onLeaveBack: () => {
            // Reset the animation when scrolling back up
            gsap.to(splitText.chars, {
              opacity: 0,
              y: 50,
              duration: 0.8,
              stagger: 0.01, // Faster stagger for reset
              ease: "power2.in",
              overwrite: true,
            });
          },
        });
      } else {
        // If split failed, retry a few times
        if (attempt < 3) {
          // Clean up the failed attempt
          if (splitText && typeof splitText.revert === "function") {
            splitText.revert();
          }

          // Wait longer before each retry
          setTimeout(() => {
            attemptSplit(attempt + 1);
          }, 300 * (attempt + 1)); // 300ms, 600ms, 900ms
        } else {
          console.warn("SplitType failed to create chars after multiple attempts:", element);
          // Restore original content if split failed after all retries
          element.innerHTML = originalContent;
        }
      }
    };

    // Start with first attempt
    attemptSplit();
  });
};

export function initSplitLinesAnimation(elementsToSplit = null) {
  // Get elements either from argument or by querying the DOM
  const splitLinesElements = elementsToSplit || document.querySelectorAll(".split-lines");

  if (!splitLinesElements || splitLinesElements.length === 0) {
    console.warn("No .split-lines elements found or provided for initialization");
    return;
  }

  // Process each split-lines element
  splitLinesElements.forEach((element, index) => {
    processSplitElement(element, index);
  });
}

export function initSplitCharsAnimation(elementsToSplit = null) {
  // Get elements either from argument or by querying the DOM
  const splitCharsElements = elementsToSplit || document.querySelectorAll(".split-chars");

  if (!splitCharsElements || splitCharsElements.length === 0) {
    console.warn("No .split-chars elements found or provided for initialization");
    return;
  }

  // Process each split-chars element with the delayed function
  splitCharsElements.forEach((element, index) => {
    processSplitCharsElement(element, index);
  });
}

export function cleanupSplitLines() {
  splitInstances.forEach((instance) => {
    // Revert to original content
    if (instance.element && instance.originalContent) {
      instance.element.innerHTML = instance.originalContent;
    }
    // Remove from instance array
    const index = splitInstances.indexOf(instance);
    if (index > -1) {
      splitInstances.splice(index, 1);
    }
  });
}

export function refreshSplitLines() {
  // First clean up existing splits
  cleanupSplitLines();

  // Then re-initialize with a slight delay to ensure DOM is updated
  setTimeout(() => {
    // Get elements again in case DOM has changed
    const elements = document.querySelectorAll(".split-lines");
    elements.forEach((element, index) => {
      processSplitElement(element, index);
    });
  }, 100);
}

export function cleanupSplitChars() {
  splitCharsInstances.forEach((instance) => {
    // Revert to original content
    if (instance.element && instance.originalContent) {
      instance.element.innerHTML = instance.originalContent;
    }
    // Remove from instance array
    const index = splitCharsInstances.indexOf(instance);
    if (index > -1) {
      splitCharsInstances.splice(index, 1);
    }
  });
}

export function refreshSplitChars() {
  // First clean up existing splits
  cleanupSplitChars();

  // Then re-initialize with a slight delay to ensure DOM is updated
  setTimeout(() => {
    // Get elements again in case DOM has changed
    const elements = document.querySelectorAll(".split-chars");
    elements.forEach((element, index) => {
      processSplitCharsElement(element, index);
    });
  }, 100);
}

// Set up window functions for backward compatibility
window.cleanupSplitLines = cleanupSplitLines;
window.refreshSplitLines = refreshSplitLines;
window.cleanupSplitChars = cleanupSplitChars;
window.refreshSplitChars = refreshSplitChars;
