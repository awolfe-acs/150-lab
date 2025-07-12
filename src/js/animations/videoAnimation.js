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

    // Create a timeline for the video animations - start when entering video-travel-area
    const videoTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#video-travel-area", // Changed from hero-travel-area to video-travel-area
        start: "top bottom", // Start when the top of video-travel-area enters the viewport
        end: "top 20%", // End when the top of video-travel-area is 20% from the top of viewport
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

    // Separate ScrollTrigger for pointer events control at 33% viewport penetration
    ScrollTrigger.create({
      trigger: "#video-travel-area",
      start: "top 67%", // 33% into viewport (100% - 33% = 67%)
      end: "bottom top",
      markers: false,
      onEnter: () => {
        // Enable pointer events when video-travel-area is 33% into viewport
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
