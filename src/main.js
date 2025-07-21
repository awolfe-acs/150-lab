import Lenis from "lenis";
import "./scss/main.scss";
import "lenis/dist/lenis.css";
import { initShaderBackground } from "./js/background.js";
import { initVideo } from "./js/video.js";
//import { initCountdown } from "./js/countdown.js";
import { initDebug } from "./js/debug.js";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import SplitType from "split-type";

// Import modular animation functions directly
import {
  setupHeroHeadingFadeAnimation,
  initCoverArea,
  initHeroAnimation,
  initHeroNumberCountdown,
  initHeroPinning,
} from "./js/animations/hero.js";
import { animateVideoScale } from "./js/animations/videoAnimation.js";
import {
  animateGetInvolvedText,
  initGetInvolvedLogoAnimation,
  animateSlidingCards,
} from "./js/animations/getInvolved.js";
import { initInfiniteMarqueeAnimation } from "./js/animations/marquee.js";
import { initScrollRevealAnimation } from "./js/animations/scrollReveal.js";

// Import UI functions
import { preloadBackgroundAudio, setupUIClickSounds, setupSoundToggle } from "./js/ui/audio.js";
import { initFancyButtonEffects } from "./js/ui/fancyButtons.js";
import { updatePageNavigation } from "./js/ui/pageNavigation.js";
import { initShareButtonOverlapDetection, initSharePanel } from "./js/ui/share.js";
import { initEventListItemHover } from "./js/ui/eventListHover.js";

// Import utilities
import { initSplitLinesAnimation, initSplitCharsAnimation } from "./js/utils/splitText.js";
import { initGlobalResizeHandler } from "./js/utils/globalHandlers.js";

// Import config
import { resetAnimationState } from "./js/config/animationConfig.js";

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MorphSVGPlugin);
gsap.registerPlugin(SplitType);

// At the top of the file, add the debugMode flag
const debugMode = false;

// Set your target date/time here
const targetDate = new Date("2026-04-06T00:00:00").getTime();

// Function to check if we're on the main 150 pages
function isMainPage() {
  const currentUrl = window.location.href.toLowerCase();
  const pathname = window.location.pathname.toLowerCase();

  // Check if editor.html or globe.html is in the URL - if so, return false
  if (currentUrl.includes("/editor.html/") || currentUrl.includes("globe.html")) {
    console.log("Not on main page");
    return false;
  }

  // Check if we're on index.html or one of the specified domains with /150
  const isMainPagePattern =
    currentUrl.includes("index.html") ||
    currentUrl.includes("acs.org/150") ||
    currentUrl.includes("localhost:5173") ||
    currentUrl.includes("192.168") ||
    currentUrl.includes("cmswwwdev.acs.org/150") ||
    // AEM author and publish environments
    (currentUrl.includes("adobeaemcloud.com") && pathname.includes("/150")) ||
    // GitHub Pages deployment - check for the specific pattern
    (currentUrl.includes("awolfe-acs.github.io/150-lab") &&
      (pathname === "/150-lab/" || pathname === "/150-lab/index.html")) ||
    // General GitHub Pages pattern for other potential deployments
    (currentUrl.includes("github.io/150-lab") && (pathname === "/150-lab/" || pathname === "/150-lab/index.html"));

  return isMainPagePattern;
}

// Initialize all animations directly from modules
function initAnimations() {
  // Preload audio immediately - before anything else
  preloadBackgroundAudio();

  // Initial refresh and clear match media
  ScrollTrigger.refresh();
  ScrollTrigger.clearMatchMedia();

  // Kill any existing ScrollTriggers to prevent duplicates before setup
  ScrollTrigger.getAll().forEach((st) => st.kill());
  // Reset animation state using centralized function
  resetAnimationState();

  // Initialize hero animations
  initHeroAnimation();
  initHeroNumberCountdown();
  initHeroPinning();
  setupHeroHeadingFadeAnimation();

  // Initialize other animations
  animateVideoScale();
  animateGetInvolvedText();
  animateSlidingCards();
  initGetInvolvedLogoAnimation();
  initInfiniteMarqueeAnimation();
  initScrollRevealAnimation();

  // Initialize UI components
  updatePageNavigation();
  initFancyButtonEffects();
  setupUIClickSounds();
  setupSoundToggle();
  initShareButtonOverlapDetection();
  initSharePanel();
  initEventListItemHover();

  // Initialize split text animations
  initSplitLinesAnimation(null);
  initSplitCharsAnimation(null);

  // Initialize global resize handler
  initGlobalResizeHandler();

  // Add menu button click handler
  const menuButton = document.querySelector("button.toggle-menu");
  if (menuButton) {
    menuButton.addEventListener("click", () => {
      const nav = document.querySelector("nav");
      const header = document.querySelector("header");

      if (nav) nav.classList.toggle("active");
      if (header) header.classList.toggle("nav-active");
    });
  }

  // Add scroll direction detection and class toggling
  let lastScrollTop = 0;
  window.addEventListener("scroll", () => {
    const currentScrollTop = window.scrollY;
    const anniversaryHeader = document.querySelector("header.anniversary");

    if (anniversaryHeader) {
      if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        anniversaryHeader.classList.remove("active");
      } else {
        // Scrolling up
        anniversaryHeader.classList.add("active");
      }
    }

    lastScrollTop = currentScrollTop;
  });

  // Add close menu button click handler
  const closeMenuButton = document.querySelector("button.close-toggle-menu");
  if (closeMenuButton) {
    closeMenuButton.addEventListener("click", () => {
      const nav = document.querySelector("nav");
      const header = document.querySelector("header");

      if (nav) nav.classList.remove("active");
      if (header) header.classList.remove("nav-active");
    });
  }
}

// Prevent browser from restoring scroll position on refresh
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}

// Force scroll to top immediately
window.scrollTo(0, 0);

// Also force scroll to top when the page is about to be unloaded (before refresh)
window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
  sessionStorage.setItem("scrollToTop", "true");
});

// When window loads, force scroll back to top
window.addEventListener("load", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant", // Use 'instant' instead of smooth for immediate effect
  });

  // Small delay to ensure scroll is applied after browser might try to restore position
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 10);
});

document.addEventListener("DOMContentLoaded", () => {
  // Force scroll to top again when DOM is ready
  window.scrollTo(0, 0);

  // Add mobile-specific device detection first
  const isMobileDevice =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth <= 768 ||
    "ontouchstart" in window;

  // Always create the Lenis instance, but only start it on main pages
  window.lenis = new Lenis({
    autoRaf: true,
    infinite: false,
    syncTouch: true, // Enable touch scrolling
    smoothWheel: true, // Keep smooth wheel scrolling
    touchInertiaMultiplier: 35, // Adjust touch inertia for better feel
    duration: 1.2, // Smooth scrolling duration
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
  });

  // Check if we're on mobile device
  const isMobile = isMobileDevice;

  if (isMobile) {
    // On mobile, ensure Lenis is configured for touch
    console.log("Mobile device detected - optimizing for touch");
    // Lenis will be started when the enter button is clicked or for non-main pages
  } else {
    // On desktop, stop scrolling initially (will be started by enter button)
    console.log("Desktop device detected");
  }

  window.lenis.on("scroll", (e) => {
    //console.log(e);
  });

  if (isMobileDevice) {
    // Ensure touch events are properly handled
    document.addEventListener(
      "touchstart",
      function (e) {
        // Allow touch events to propagate normally
        // Don't prevent default unless absolutely necessary
      },
      { passive: true }
    );

    document.addEventListener(
      "touchmove",
      function (e) {
        // Allow touch move events to propagate normally for scrolling
        // Only prevent default if we're trying to prevent horizontal scrolling
        if (
          Math.abs(e.touches[0].clientX - e.touches[0].clientY) > Math.abs(e.touches[0].clientY - e.touches[0].clientX)
        ) {
          // This is more horizontal than vertical, you might want to prevent it
          // e.preventDefault();
        }
      },
      { passive: false }
    );

    // Add a specific handler to ensure Lenis works on mobile
    window.addEventListener("resize", () => {
      if (window.lenis) {
        window.lenis.resize();
      }
    });
  }

  // Initialize countdown timer
  // initCountdown(targetDate);

  // Initialize debug mode if enabled
  if (debugMode) {
    initDebug();
  }

  // Initialize shader background (always run this)
  // Add a small delay to ensure canvas element is fully ready
  setTimeout(() => {
    try {
      initShaderBackground();
    } catch (error) {
      console.error("Failed to initialize shader background:", error);
      console.warn("Continuing without shader background...");
    }
  }, 100);

  // Only run animations and video on main pages
  if (isMainPage()) {
    // Initialize cover area first
    initCoverArea();

    // Initialize animations directly from modules
    initAnimations();

    // Initialize video
    initVideo();

    // On main pages, Lenis will be enabled when the enter-experience button is clicked
    // (this happens in the cover area module)
  } else {
    console.log("Running in lightweight mode - animations and video disabled");

    // For non-main pages, we might want to start Lenis immediately
    // Uncomment this if you want scrolling enabled on non-main pages
    // window.lenis.start();
  }

  // Final attempt to ensure we're at the top
  setTimeout(() => {
    window.scrollTo(0, 0);
    window.lenis.scrollTo(0, { immediate: true });
  }, 100);
});
