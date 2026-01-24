// =============================================================================
// TWO-PHASE LOADING ARCHITECTURE
// Phase 1: Essential modules for cover-area (fast initial paint)
// Phase 2: Deferred modules after cover-area visible
// =============================================================================

// =============================================================================
// YIELD TO MAIN THREAD - Core utility for non-blocking execution
// =============================================================================
const yieldToMain = () => {
  if ('scheduler' in window && 'yield' in window.scheduler) {
    return window.scheduler.yield();
  }
  return new Promise(resolve => setTimeout(resolve, 0));
};

const yieldWithDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// =============================================================================
// CSS IMPORTS - Extracted by Vite, non-blocking
// =============================================================================
import "./scss/main.scss";
import "lenis/dist/lenis.css";

// =============================================================================
// GSAP CORE - Synchronous import
// =============================================================================
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// =============================================================================
// MODULE REGISTRY
// Split into ESSENTIAL (cover-area) and DEFERRED (post fade-in)
// =============================================================================
const essentialModules = {
  lenis: () => import("lenis"),
  aemModeDetector: () => import("./js/utils/aemModeDetector.js"),
  animationConfig: () => import("./js/config/animationConfig.js"),
  background: () => import("./js/background.js"),
  hero: () => import("./js/animations/hero.js"),
  audio: () => import("./js/ui/audio.js"),
  fancyButtons: () => import("./js/ui/fancyButtons.js"),
  splitText: () => import("./js/utils/splitText.js"),
  globalHandlers: () => import("./js/utils/globalHandlers.js"),
  androidNav: () => import("./js/utils/android-nav.js"),
  scrollReveal: () => import("./js/animations/scrollReveal.js"),
  debug: () => import("./js/debug.js"),
};

const deferredModules = {
  videoAnimation: () => import("./js/animations/videoAnimation.js"),
  introText: () => import("./js/animations/introText.js"),
  getInvolved: () => import("./js/animations/getInvolved.js"),
  marquee: () => import("./js/animations/marquee.js"),
  timeline: () => import("./js/animations/timeline.js"),
  pageNavigation: () => import("./js/ui/pageNavigation.js"),
  share: () => import("./js/ui/share.js"),
  // eventListHover: () => import("./js/ui/eventListHover.js"), // DISABLED
  video: () => import("./js/video.js"),
  // morphSVG: () => import("gsap/MorphSVGPlugin"), // DISABLED
  splitType: () => import("split-type"),
};

// Module cache
const loadedModules = {};

// Load module with caching (checks both registries)
async function loadModule(name) {
  if (!loadedModules[name]) {
    const loader = essentialModules[name] || deferredModules[name];
    if (loader) {
      loadedModules[name] = await loader();
    }
  }
  return loadedModules[name];
}

// Batch load multiple modules in parallel
async function loadModules(names) {
  const results = await Promise.all(names.map(name => loadModule(name)));
  return Object.fromEntries(names.map((name, i) => [name, results[i]]));
}

// =============================================================================
// CONFIGURATION
// =============================================================================
const debugMode = false;
const targetDate = new Date("2026-04-06T00:00:00").getTime();

// =============================================================================
// PAGE DETECTION
// =============================================================================
function isMainPage() {
  const currentUrl = window.location.href.toLowerCase();
  const pathname = window.location.pathname.toLowerCase();

  if (currentUrl.includes("/editor.html/") || currentUrl.includes("globe.html")) {
    return false;
  }

  return (
    currentUrl.includes("index.html") ||
    currentUrl.includes("acs.org/150") ||
    currentUrl.includes("localhost:5173") ||
    currentUrl.includes("192.168") ||
    currentUrl.includes("cmswwwdev.acs.org/150") ||
    (currentUrl.includes("adobeaemcloud.com") && pathname.includes("/150")) ||
    (currentUrl.includes("github.io/150-lab") && (pathname === "/150-lab/" || pathname === "/150-lab/index.html"))
  );
}

// =============================================================================
// SCROLL POSITION MANAGEMENT (runs immediately, non-blocking)
// =============================================================================
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
  sessionStorage.setItem("scrollToTop", "true");
});

// =============================================================================
// MENU HANDLERS (lightweight, no async)
// =============================================================================
function setupMenuHandlers() {
  const menuButton = document.querySelector("button.toggle-menu");
  if (menuButton) {
    menuButton.addEventListener("click", () => {
      const nav = document.querySelector("nav");
      const header = document.querySelector("header");
      if (nav) nav.classList.toggle("active");
      if (header) header.classList.toggle("nav-active");
    });
  }

  const closeMenuButton = document.querySelector("button.close-toggle-menu");
  if (closeMenuButton) {
    closeMenuButton.addEventListener("click", () => {
      const nav = document.querySelector("nav");
      const header = document.querySelector("header");
      if (nav) nav.classList.remove("active");
      if (header) header.classList.remove("nav-active");
    });
  }

  let lastScrollTop = 0;
  window.addEventListener("scroll", () => {
    const currentScrollTop = window.scrollY;
    const anniversaryHeader = document.querySelector("header.anniversary");
    if (anniversaryHeader) {
      if (currentScrollTop > lastScrollTop) {
        anniversaryHeader.classList.remove("active");
      } else {
        anniversaryHeader.classList.add("active");
      }
    }
    lastScrollTop = currentScrollTop;
  });
}

// =============================================================================
// POLYFILL: requestIdleCallback (Safari)
// =============================================================================
window.requestIdleCallback = window.requestIdleCallback || function(cb, options) {
  const start = Date.now();
  return setTimeout(() => {
    cb({
      didTimeout: false,
      timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
    });
  }, options?.timeout || 1);
};

// =============================================================================
// LENIS SETUP (accepts pre-loaded module)
// =============================================================================
async function setupLenisWithModule(lenisModule) {
  const Lenis = lenisModule.default;
  
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isSmallViewport = window.innerWidth < 1024;
  const isMobileOptimized = isTouchDevice && isSmallViewport;
  
  window.isMobileOptimized = isMobileOptimized;
  
  const lenisConfig = isMobileOptimized ? {
    autoRaf: true,
    infinite: false,
    syncTouch: false,
    syncTouchLerp: 1,
    touchMultiplier: 0,
    wheelMultiplier: 1,
    smoothWheel: false,
    duration: 0,
    easing: (t) => t,
  } : {
    autoRaf: true,
    infinite: false,
    syncTouch: true,
    smoothWheel: true,
    touchInertiaMultiplier: 35,
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  };
  
  window.lenis = new Lenis(lenisConfig);
  
  if (isMobileOptimized) {
    window.addEventListener("resize", () => window.lenis?.resize());
  }
  
  return isMobileOptimized;
}

// =============================================================================
// LOADER MANAGEMENT
// =============================================================================
function hideLoader() {
  const loader = document.getElementById('initial-loader');
  if (loader) {
    loader.classList.add('hidden');
    // Remove from DOM after transition
    setTimeout(() => {
      loader.style.display = 'none';
    }, 400);
  }
}

// =============================================================================
// TIMELINE IMAGE LAZY LOADING
// Pre-load all timeline images when entering the timeline section
// This ensures images are ready for GSAP transitions
// =============================================================================
function loadTimelineImages() {
  const timelineSection = document.querySelector('#acs-timeline');
  const timelineImages = document.querySelectorAll('.event-image img[data-src]');
  
  if (!timelineSection || timelineImages.length === 0) return;
  
  // Function to load all images immediately
  const loadAllImages = () => {
    timelineImages.forEach(img => {
      const src = img.getAttribute('data-src');
      if (src) {
        img.src = src;
        img.removeAttribute('data-src');
      }
    });
  };
  
  // Use IntersectionObserver to detect when timeline section is approaching
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Timeline section is entering viewport - load all images
        loadAllImages();
        sectionObserver.disconnect();
      }
    });
  }, {
    rootMargin: '400px 0px', // Start loading 400px before timeline enters viewport
    threshold: 0
  });
  
  sectionObserver.observe(timelineSection);
}

// =============================================================================
// MAIN INITIALIZATION - Two-Phase Architecture
// =============================================================================
document.addEventListener("DOMContentLoaded", async () => {
  // IMMEDIATELY: Ensure scroll is at top
  window.scrollTo(0, 0);
  
  // IMMEDIATELY: Setup menu handlers (sync, very fast)
  setupMenuHandlers();
  
  // YIELD: Let loader render
  await yieldToMain();
  
  // ==========================================================================
  // GSAP REGISTRATION (sync, fast)
  // ==========================================================================
  gsap.registerPlugin(ScrollTrigger);
  window.gsap = gsap;
  window.gsap.ScrollTrigger = ScrollTrigger;
  window.gsapReady = true;
  
  await yieldToMain();
  
  // ==========================================================================
  // PHASE 1: ESSENTIAL MODULES - Parallel load for cover-area
  // ==========================================================================
  const essential = await loadModules([
    'lenis',
    'aemModeDetector',
    'animationConfig',
    'background',
    'hero',
    'audio',
    'fancyButtons',
    'splitText',
    'globalHandlers',
    'androidNav',
    'scrollReveal',
  ]);
  
  await yieldToMain();
  
  // AEM Detection
  const aemMode = essential.aemModeDetector.default.detect();
  const aemSettings = essential.aemModeDetector.default.getSettings();
  
  if (aemSettings.showStaticBackground) {
    essential.aemModeDetector.default.applyStaticBackground();
  }
  if (aemSettings.showPlaceholderMessage) {
    essential.aemModeDetector.default.showPlaceholderMessage();
  }
  
  await yieldToMain();
  
  // ==========================================================================
  // LENIS SETUP
  // ==========================================================================
  await setupLenisWithModule(essential.lenis);
  
  await yieldToMain();
  
  // ==========================================================================
  // PHASE 1 INITIALIZATION: Cover-area essentials
  // ==========================================================================
  if (isMainPage()) {
    // Initialize cover area first
    essential.hero.initCoverArea();
    
    await yieldToMain();
    
    // Shader background (heavy but needed for visuals)
    if (aemSettings.enableBackground) {
      try {
        await essential.background.initShaderBackground();
      } catch (error) {
        console.error("Failed to initialize shader background:", error);
        essential.aemModeDetector.default.applyStaticBackground();
      }
    }
    
    await yieldToMain();
    
    // Essential initializations for cover-area
    if (aemSettings.enableAnimations) {
      essential.audio.preloadBackgroundAudio();
      essential.animationConfig.resetAnimationState();
      
      await yieldToMain();
      
      essential.hero.initHeroAnimation();
      
      await yieldToMain();
      
      ScrollTrigger.refresh();
      ScrollTrigger.clearMatchMedia();
      
      await yieldToMain();
      
      // Hero number countdown animation (2026 → 1876)
      essential.hero.initHeroNumberCountdown();
      
      await yieldToMain();
      
      essential.hero.initHeroPinning();
      essential.hero.setupHeroHeadingFadeAnimation();
      
      await yieldToMain();
      
      // Essential UI for cover-area
      essential.fancyButtons.initFancyButtonEffects();
      essential.audio.setupUIClickSounds();
      essential.audio.setupSoundToggle();
      
      await yieldToMain();
      
      // Split text for hero
      essential.splitText.initSplitLinesAnimation(null);
      essential.splitText.initSplitCharsAnimation(null);
      
      await yieldToMain();
      
      // Global handlers & scroll reveal
      essential.globalHandlers.initGlobalResizeHandler();
      essential.androidNav.initAndroidNavAdjustments();
      essential.scrollReveal.initScrollRevealAnimation();
    }
    
    await yieldToMain();
    
    // ==========================================================================
    // PHASE 2: DEFERRED MODULES - Load all non-video modules
    // ==========================================================================
    if (aemSettings.enableAnimations) {
      // Load all deferred modules in parallel
      const deferred = await loadModules([
        'introText',
        'videoAnimation',
        'getInvolved',
        'marquee',
        'timeline',
        'pageNavigation',
        'share',
        // 'eventListHover', // DISABLED
      ]);
      
      await yieldToMain();
      
      // Initialize deferred modules
      deferred.introText.initIntroTextAnimation();
      
      await yieldToMain();
      
      deferred.videoAnimation.animateVideoScale();
      
      await yieldToMain();
      
      // Get Involved section
      deferred.getInvolved.animateGetInvolvedText();
      deferred.getInvolved.animateSlidingCards();
      deferred.getInvolved.initGetInvolvedLogoAnimation();
      
      await yieldToMain();
      
      // Marquee
      deferred.marquee.initInfiniteMarqueeAnimation();
      
      await yieldToMain();
      
      // Timeline (heavy)
      deferred.timeline.initTimelineAnimation();
      
      await yieldToMain();
      
      // UI Components
      deferred.pageNavigation.updatePageNavigation();
      
      await yieldToMain();
      
      // Share panel
      deferred.share.initShareButtonOverlapDetection();
      deferred.share.initSharePanel();
      // deferred.eventListHover.initEventListItemHover(); // DISABLED
    }
    
    // ==========================================================================
    // HIDE LOADER - All non-video content is now ready!
    // Wait 400ms before revealing the page
    // ==========================================================================
    await yieldWithDelay(800);
    hideLoader();
    
    // ==========================================================================
    // VIDEO (deferred, heavy) - Load AFTER page is revealed
    // ==========================================================================
    if (aemSettings.enableVideo) {
      await yieldWithDelay(3000);
      const videoModule = await loadModule('video');
      await yieldToMain();
      videoModule.initVideo();
    }
    
  } else {
    // Non-main page: just hide loader
    hideLoader();
  }
  
  // ==========================================================================
  // DEBUG MODE
  // ==========================================================================
  if (debugMode) {
    await yieldToMain();
    const debugModule = await loadModule('debug');
    debugModule.initDebug();
  }
  
  // ==========================================================================
  // FINAL SCROLL RESET
  // ==========================================================================
  await yieldWithDelay(100);
  window.scrollTo(0, 0);
  window.lenis?.scrollTo(0, { immediate: true });
  
  // ==========================================================================
  // TIMELINE IMAGES - Load after all JS initialization
  // ==========================================================================
  await yieldToMain();
  loadTimelineImages();
  
  // ==========================================================================
  // GSAP PLUGINS (background, non-critical)
  // ==========================================================================
  requestIdleCallback(async () => {
    // const [morphModule, splitModule] = await Promise.all([
    //   loadModule('morphSVG'),
    //   loadModule('splitType'),
    // ]);
    // gsap.registerPlugin(morphModule.MorphSVGPlugin);
    // gsap.registerPlugin(splitModule.default);
    
    const splitModule = await loadModule('splitType');
    gsap.registerPlugin(splitModule.default);
  }, { timeout: 3000 });
});

// Handle page load scroll reset
window.addEventListener("load", () => {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  setTimeout(() => window.scrollTo(0, 0), 10);
});
