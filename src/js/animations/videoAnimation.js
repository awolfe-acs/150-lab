// animations/videoAnimation.js
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

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

    // Create a timeline for the video animations - start after countdown area is scrolled through
    const videoTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#countdown-area", // Use countdown area as trigger
        start: "bottom 50%", // Start when bottom of countdown area reaches center of viewport
        end: "bottom 20%", // End when bottom of countdown area is near top of viewport
        scrub: true,
        markers: false,
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

    // Separate ScrollTrigger for pointer events control after countdown area
    ScrollTrigger.create({
      trigger: "#countdown-area",
      start: "bottom 30%", // Enable after countdown area has mostly passed
      end: "bottom top",
      markers: false,
      onEnter: () => {
        // Enable pointer events after countdown area has passed
        gsap.set(videoSection, {
          pointerEvents: "auto",
        });
      },
      onLeaveBack: () => {
        // Disable pointer events when scrolling back up past 33% point
        gsap.set(videoSection, {
          pointerEvents: "none",
        });
      },
    });

    // Create a pin animation that pins the video when it reaches the top of the viewport
    ScrollTrigger.create({
      trigger: "#video",
      start: "top top", // Start pinning when the top of #video reaches the top of the viewport
      endTrigger: "#video-travel-area", // Use video-travel-area as the end trigger
      end: "bottom bottom", // End pinning when the bottom of video-travel-area reaches the bottom of viewport
      pin: true, // Pin the video section
      pinSpacing: false, // Don't add extra space for the pinned element
      anticipatePin: 1, // Helps prevent jittering
      markers: false, // Set to true for debugging
      id: "video-pin", // Add an ID for easier debugging
    });
  }
}
