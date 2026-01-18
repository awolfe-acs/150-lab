// animations/videoAnimation.js
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Helper to get mobile scroll container config for ScrollTrigger
// On mobile, #app is the scroll container; on desktop, use default (window)
const getScrollerConfig = () => {
  if (window.isMobileScrollMode && window.mobileScrollContainer) {
    return {
      scroller: window.mobileScrollContainer,
      pinType: 'transform' // CRITICAL: Must use transform pinning for custom scroller
    };
  }
  return {}; // Empty = use defaults (window scroller)
};

// Animate video scale from small to full size while scrolling
export function animateVideoScale() {
  const videoWrapper = document.querySelector("#video .video-wrapper");
  const videoSection = document.querySelector("#video");
  const videoTravelArea = document.querySelector("#video-travel-area");

  if (videoWrapper && videoSection && videoTravelArea) {
    // Set initial scale and disable pointer events
    gsap.set(videoWrapper, {
      scale: 0.4,
      opacity: 0,
      transformOrigin: "center center",
    });

    // Initially disable pointer events on video section
    gsap.set(videoSection, {
      pointerEvents: "none",
    });

    // Create a timeline for the video animations - coordinate with intro-text fade out
    const videoTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#intro-text-travel-area", // Use intro-text travel area as trigger
        start: "47% top", // Start after intro-text fully fades out (45% + small buffer)
        end: "80% top", // Complete by 80% - much longer distance for slower scale
        scrub: true,
        markers: false,
        invalidateOnRefresh: true,
        ...getScrollerConfig(), // Mobile scroll container support
        onUpdate: (self) => {
          // Add/remove class based on progress
          if (self.progress > 0.8) {
            videoWrapper.classList.add("scale-active");
          } else {
            videoWrapper.classList.remove("scale-active");
          }
        },
      },
    });

    // Add the scale animation to the timeline
    videoTl.to(videoWrapper, {
      scale: 1.0,
      opacity: 1,
      ease: "power2.out", // Slightly more pronounced easing
    });

    // Separate ScrollTrigger for pointer events control
    ScrollTrigger.create({
      trigger: "#intro-text-travel-area",
      start: "bottom bottom", // Enable after intro-text travel area has passed
      end: "bottom top",
      markers: false,
      invalidateOnRefresh: true,
      ...getScrollerConfig(), // Mobile scroll container support
      onEnter: () => {
        // Enable pointer events after video is mostly revealed
        gsap.set(videoSection, {
          pointerEvents: "auto",
        });
      },
      onLeaveBack: () => {
        // Disable pointer events when scrolling back up
        gsap.set(videoSection, {
          pointerEvents: "none",
        });
      },
    });

    // Create a pin animation that pins the video when it reaches the top of the viewport
    // On mobile: use shorter pin duration and add onLeaveBack to prevent getting stuck
    ScrollTrigger.create({
      trigger: "#video",
      start: "top top", // Start pinning when the top of #video reaches the top of the viewport
      endTrigger: "#video-travel-area", // Use video-travel-area as the end trigger
      end: window.isMobileOptimized ? "bottom 80%" : "bottom bottom", // Shorter pin on mobile to prevent sticking
      pin: true, // Pin the video section
      pinSpacing: false, // Don't add extra space for the pinned element
      anticipatePin: 1, // Helps prevent jittering
      markers: false, // Set to true for debugging
      id: "video-pin", // Add an ID for easier debugging
      ...getScrollerConfig(), // Mobile scroll container support - CRITICAL for proper unpinning
      onLeaveBack: (self) => {
        // Reset transform when scrolling back up - prevents getting stuck
        if (self.pin) {
          self.pin.style.transform = "translate3d(0px, 0px, 0px)";
        }
      },
    });
  }
}
