// ui/scrollDownIcon.js
// Logic for the scroll-down icon

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Function to create and manage the scroll down icon
export function createScrollDownIcon(referenceElement) {
  // Check if scroll icon already exists to prevent duplicates
  if (window.scrollDownIcon && document.contains(window.scrollDownIcon)) {
    return;
  }

  // Create the scroll down icon container
  const scrollIcon = document.createElement("div");
  scrollIcon.className = "scroll-down-icon";
  scrollIcon.innerHTML = `
    <div class="scroll-text">SCROLL</div>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
      <title>mouse-scroll-down</title>
      <g fill="#F7F7F7">
        <g fill="none">
          <path d="M0 0h24v24h-24v-24Z"></path>
          <path class="mouse-body" stroke="#F7F7F7" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 17v0c-2.946 0-5.357-2.411-5.357-5.357v-4.286c-8.88178e-16-2.946 2.411-5.357 5.357-5.357v0c2.946 0 5.357 2.411 5.357 5.357v4.286c3.55271e-15 2.946-2.411 5.357-5.357 5.357Z"></path>
          <path class="scroll-arrow" stroke="#F7F7F7" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 20L12 22 15 20"></path>
          <path class="scroll-indicator" stroke="#F7F7F7" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.286v2.143"></path>
        </g>
      </g>
    </svg>
  `;

  // Position the icon to be perfectly centered horizontally and at exactly 12vh from bottom
  scrollIcon.style.cssText = `
    position: fixed;
    bottom: calc(12vh - 16px);
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    opacity: 0;
    width: 64px;
    height: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.3s ease;
  `;

  // Add styles for the scroll text
  const scrollText = scrollIcon.querySelector(".scroll-text");
  if (scrollText) {
    scrollText.style.cssText = `
      color: #F7F7F7;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 2px;
      text-align: center;
      line-height: 1;
      margin: 0;
      padding: 0;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    `;
  }

  // Get the parent container of the reference button to position the icon in the same location
  const parentContainer = referenceElement.parentElement;
  if (parentContainer) {
    parentContainer.appendChild(scrollIcon);
  } else {
    document.body.appendChild(scrollIcon);
  }

  // Animate the scroll icon in
  gsap.to(scrollIcon, {
    opacity: 1,
    duration: 0.8,
    ease: "power2.out",
    delay: 0.3, // Small delay after button fades out
  });

  // Add continuous bounce animation to the scroll indicator
  const scrollIndicator = scrollIcon.querySelector(".scroll-indicator");
  gsap.to(scrollIndicator, {
    y: 3,
    duration: 1.2,
    ease: "power2.inOut",
    repeat: -1,
    yoyo: true,
  });

  // Add subtle pulse animation to the scroll arrow
  const scrollArrow = scrollIcon.querySelector(".scroll-arrow");
  gsap.to(scrollArrow, {
    opacity: 0.6,
    duration: 1.5,
    ease: "power2.inOut",
    repeat: -1,
    yoyo: true,
  });

  // Use ScrollTrigger to match cover area SVG fade timing (but faster)
  ScrollTrigger.create({
    trigger: "#cover-travel-area",
    start: "top top", // Start when cover-travel-area reaches top
    end: "bottom 70%", // End earlier than cover SVG (70% vs center) for faster fade-out
    scrub: 0.5, // Faster scrub than cover SVG (0.5 vs 1) for quicker response
    markers: false,
    onUpdate: (self) => {
      // Fade out based on scroll progress - same as cover SVG but faster
      const opacity = 1 - self.progress;
      gsap.set(scrollIcon, { opacity: opacity, overwrite: true });
    },
    onLeave: () => {
      // Ensure icon is hidden when leaving the trigger area
      gsap.set(scrollIcon, { opacity: 0 });
    },
    onEnterBack: () => {
      // When entering back, start with icon hidden and let scroll control it
      gsap.set(scrollIcon, { opacity: 0 });
    },
  });

  // Store reference and cleanup function
  window.scrollDownIcon = scrollIcon;
  window.scrollDownIconCleanup = () => {
    // Kill any ScrollTriggers associated with this icon
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === scrollIcon || trigger.vars?.trigger === "#cover-travel-area") {
        // Only kill triggers that were created for this scroll icon
        const triggerElement = trigger.trigger;
        if (triggerElement === scrollIcon || (trigger.animation && trigger.animation.targets().includes(scrollIcon))) {
          trigger.kill();
        }
      }
    });
    if (scrollIcon && scrollIcon.parentNode) {
      scrollIcon.remove();
    }
    window.scrollDownIcon = null;
    window.scrollDownIconCleanup = null;
  };
}
