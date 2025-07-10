// ui/fancyButtons.js
// Fancy button hover/click effects

import gsap from "gsap";

// Flag to track if we've already set up the event listener
let heroEventListenerAdded = false;

// Helper function to initialize a single fancy button
function initSingleFancyButton(button) {
  let isHovering = false;

  // Add hover effect
  button.addEventListener("mouseenter", () => {
    isHovering = true;
    button.classList.add("fancy-btn-active");
    button.style.transform = "translateY(-2px) scale(1.02)";
  });

  // Remove hover effect
  button.addEventListener("mouseleave", () => {
    isHovering = false;
    button.classList.remove("fancy-btn-active");
    button.style.transform = "";
  });

  // Add click effect
  button.addEventListener("mousedown", () => {
    button.style.transform = "translateY(1px) scale(0.98)";
  });

  // Reset after click
  button.addEventListener("mouseup", () => {
    if (isHovering) {
      button.style.transform = "translateY(-2px) scale(1.02)";
    }
  });
}

export function initFancyButtonEffects() {
  const fancyButtons = document.querySelectorAll(".fancy-btn");

  // Create a function to initialize all fancy buttons
  const initAllFancyButtons = () => {
    fancyButtons.forEach((button) => {
      // Skip buttons that are already initialized
      if (button.dataset.fancyInitialized === "true") {
        return;
      }

      initSingleFancyButton(button);
      // Mark as initialized
      button.dataset.fancyInitialized = "true";
    });
  };

  // Add event listener for heroAnimationComplete only once
  if (!heroEventListenerAdded) {
    document.addEventListener("heroAnimationComplete", initAllFancyButtons);
    heroEventListenerAdded = true;
  }

  // Initialize non-enter-experience buttons immediately
  fancyButtons.forEach((button) => {
    if (!button.classList.contains("enter-experience")) {
      initSingleFancyButton(button);
      button.dataset.fancyInitialized = "true";
    }
  });

  // If hero animation is already complete, initialize all buttons now
  if (window.heroAnimationComplete) {
    initAllFancyButtons();
  }
}
