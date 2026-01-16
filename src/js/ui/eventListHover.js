// ui/eventListHover.js
// Event list item hover interactions with pinned images

import pacifichemEventImage from "../../../public/images/pacifichem-event1.jpg?url";
import greenChemistryEventImage from "../../../public/images/green-chemistry-event2.jpg?url";
import acsSpringMeetingEventImage from "../../../public/images/acs-spring-meeting-event3.jpg?url";
import logger from "../utils/logger.js";

// Initialize event list item hover interactions with pinned images
export function initEventListItemHover() {
  const eventListItems = document.querySelectorAll(".event-list-item");

  if (!eventListItems.length) {
    logger.warn("No .event-list-item elements found");
    return;
  }

  // Map event items to their corresponding imported image URLs
  const eventImageMap = [pacifichemEventImage, greenChemistryEventImage, acsSpringMeetingEventImage];

  // DISABLED: Mouse-following image feature
  /*
  // Detect if device supports touch
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

  // Create the mouse-following image element
  const mouseImage = document.createElement("img");
  mouseImage.className = "mouse-following-image";
  mouseImage.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 400px;
    height: 291px;
    object-fit: cover;
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    border-radius: 12px;
    transform: translate(-50%, -50%);
    transition: opacity 0.2s ease;
    mix-blend-mode: plus-lighter;
    filter: opacity(0.28) brightness(0.9) contrast(1.2);
    ${isTouchDevice ? "display: none;" : ""}
  `;
  document.body.appendChild(mouseImage);

  // Track current mouse position
  let mouseX = 0;
  let mouseY = 0;

  // Update mouse position
  const updateMousePosition = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Update image position
    mouseImage.style.left = mouseX + "px";
    mouseImage.style.top = mouseY + "px";
  };

  // Add global mouse move listener
  document.addEventListener("mousemove", updateMousePosition);
  */

  // Add hover interactions to each event list item with pinned images
  eventListItems.forEach((item, index) => {
    const imageUrl = eventImageMap[index];

    if (!imageUrl) {
      logger.warn(`No image mapped for event item ${index}`);
      return;
    }

    // Create pinned hover image for this item
    const pinnedImage = document.createElement("img");
    pinnedImage.className = "pinned-hover-image";
    pinnedImage.src = imageUrl;
    pinnedImage.style.cssText = `
      position: fixed;
      width: 200px;
      height: 145px;
      object-fit: cover;
      pointer-events: none;
      z-index: 9999;
      opacity: 0;
      border-radius: 8px;
      transform: translateY(-50%) scale(0.9);
      transition: opacity 0.3s ease, transform 0.3s ease;
      filter: opacity(0.9);
    `;

    // Add the pinned image to the document body to avoid overflow issues
    document.body.appendChild(pinnedImage);

    // Function to update image position based on list item position
    const updateImagePosition = () => {
      const itemRect = item.getBoundingClientRect();
      const rightOffset = -20; // Distance from right edge of item

      pinnedImage.style.left = itemRect.right - 200 - rightOffset + "px";
      pinnedImage.style.top = itemRect.top + itemRect.height / 2 + "px";
    };

    // Mouse enter - show pinned image and add active class
    item.addEventListener("mouseenter", () => {
      // Update image position
      updateImagePosition();

      // Show the pinned image
      pinnedImage.style.opacity = "1";
      pinnedImage.style.transform = "translateY(-50%) scale(1)";

      // Add active class to event item
      item.classList.add("active");
    });

    // Mouse leave - hide pinned image and remove active class
    item.addEventListener("mouseleave", () => {
      // Hide the pinned image
      pinnedImage.style.opacity = "0";
      pinnedImage.style.transform = "translateY(-50%) scale(0.9)";

      // Remove active class from event item
      item.classList.remove("active");
    });

    // Update position on scroll and resize to keep images aligned
    const updateOnScroll = () => {
      if (pinnedImage.style.opacity !== "0") {
        updateImagePosition();
      }
    };

    window.addEventListener("scroll", updateOnScroll);
    window.addEventListener("resize", updateOnScroll);

    /* ORIGINAL MOUSE-FOLLOWING CODE (DISABLED):
    // Mouse enter - show image and add active class
    item.addEventListener("mouseenter", () => {
      // Set the image source using imported asset URL
      mouseImage.src = imageUrl;

      // Show the image
      mouseImage.style.opacity = "1";

      // Add active class to event item
      item.classList.add("active");

      // Ensure image is positioned correctly
      mouseImage.style.left = mouseX + "px";
      mouseImage.style.top = mouseY + "px";
    });

    // Mouse leave - hide image and remove active class
    item.addEventListener("mouseleave", () => {
      // Hide the image
      mouseImage.style.opacity = "0";

      // Remove active class from event item
      item.classList.remove("active");
    });
    */
  });
}
