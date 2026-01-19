// =============================================================================
// CRITICAL PATH IMPORTS - Load these first for fastest initial paint
// =============================================================================
import "./scss/main.scss";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register GSAP plugins immediately - needed for cover area
gsap.registerPlugin(ScrollTrigger);

// Make GSAP available globally for background.js
// IMPORTANT: Explicitly expose ScrollTrigger as background.js uses window.gsap.ScrollTrigger
window.gsap = gsap;
window.gsap.ScrollTrigger = ScrollTrigger;

// Signal that GSAP is ready (for dynamic imports that depend on it)
window.gsapReady = true;

// =============================================================================
// POLYFILL: requestIdleCallback (Safari doesn't support it)
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
// DEFERRED IMPORTS - These load in parallel but don't block initial paint
// =============================================================================
// Use dynamic imports for non-critical modules to allow parallel loading
const deferredModules = {
  lenis: () => import("lenis"),
  morphSVG: () => import("gsap/MorphSVGPlugin"),
  splitType: () => import("split-type"),
  background: () => import("./js/background.js"),
  video: () => import("./js/video.js"),
  countdown: () => import("./js/countdown.js"),
  debug: () => import("./js/debug.js"),
  hero: () => import("./js/animations/hero.js"),
  videoAnimation: () => import("./js/animations/videoAnimation.js"),
  introText: () => import("./js/animations/introText.js"),
  getInvolved: () => import("./js/animations/getInvolved.js"),
  marquee: () => import("./js/animations/marquee.js"),
  scrollReveal: () => import("./js/animations/scrollReveal.js"),
  timeline: () => import("./js/animations/timeline.js"),
  audio: () => import("./js/ui/audio.js"),
  fancyButtons: () => import("./js/ui/fancyButtons.js"),
  pageNavigation: () => import("./js/ui/pageNavigation.js"),
  share: () => import("./js/ui/share.js"),
  eventListHover: () => import("./js/ui/eventListHover.js"),
  splitText: () => import("./js/utils/splitText.js"),
  globalHandlers: () => import("./js/utils/globalHandlers.js"),
  androidNav: () => import("./js/utils/android-nav.js"),
  aemModeDetector: () => import("./js/utils/aemModeDetector.js"),
  animationConfig: () => import("./js/config/animationConfig.js"),
};

// Cache for loaded modules
const loadedModules = {};

// =============================================================================
// CONFIGURATION
// =============================================================================
const debugMode = false;
const targetDate = new Date("2026-04-06T00:00:00").getTime();

// =============================================================================
// HELPER: Load a deferred module (cached)
// =============================================================================
async function loadModule(name) {
  if (!loadedModules[name]) {
    loadedModules[name] = await deferredModules[name]();
  }
  return loadedModules[name];
}

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
// PHASE 1: CRITICAL PATH - Shader + Cover Area (runs immediately)
// =============================================================================
async function initCriticalPath(aemSettings) {
  console.log('[Main] Phase 1: Critical path initialization');
  
  // Start loading hero module immediately (needed for cover area)
  const heroModule = await loadModule('hero');
  
  // Initialize cover area FIRST - this sets up the fade-in timeline
  // The timeline has a built-in 0.6s delay for shader to fade in
  heroModule.initCoverArea();
  console.log('[Main] Cover area initialized');
  
  // Start shader background (no artificial delay - it has CSS fade-in)
  if (aemSettings.enableBackground) {
    try {
      const bgModule = await loadModule('background');
      await bgModule.initShaderBackground();
      console.log('[Main] Shader background initialized');
    } catch (error) {
      console.error("Failed to initialize shader background:", error);
      const aemModule = await loadModule('aemModeDetector');
      aemModule.default.applyStaticBackground();
    }
  }
}

// =============================================================================
// PHASE 2: SECONDARY ANIMATIONS - Hero number, countdown, pinning
// =============================================================================
async function initSecondaryAnimations() {
  console.log('[Main] Phase 2: Secondary animations');
  
  const [heroModule, configModule, audioModule] = await Promise.all([
    loadModule('hero'),
    loadModule('animationConfig'),
    loadModule('audio'),
  ]);
  
  // Preload audio early
  audioModule.preloadBackgroundAudio();
  
  // Reset animation state
  configModule.resetAnimationState();
  
  // Initialize hero animations
  heroModule.initHeroAnimation();
  
  // Defer heavy ScrollTrigger operations
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    ScrollTrigger.clearMatchMedia();
    
    heroModule.initHeroNumberCountdown();
    heroModule.initHeroPinning();
    heroModule.setupHeroHeadingFadeAnimation();
  });
}

// =============================================================================
// PHASE 3: DEFERRED ANIMATIONS - Everything else (runs in background)
// =============================================================================
async function initDeferredAnimations() {
  console.log('[Main] Phase 3: Deferred animations');
  
  // Load all remaining modules in parallel
  const [
    introTextModule,
    videoAnimModule,
    getInvolvedModule,
    marqueeModule,
    scrollRevealModule,
    timelineModule,
    audioModule,
    fancyButtonsModule,
    pageNavModule,
    shareModule,
    eventListModule,
    splitTextModule,
    globalHandlersModule,
    androidNavModule,
  ] = await Promise.all([
    loadModule('introText'),
    loadModule('videoAnimation'),
    loadModule('getInvolved'),
    loadModule('marquee'),
    loadModule('scrollReveal'),
    loadModule('timeline'),
    loadModule('audio'),
    loadModule('fancyButtons'),
    loadModule('pageNavigation'),
    loadModule('share'),
    loadModule('eventListHover'),
    loadModule('splitText'),
    loadModule('globalHandlers'),
    loadModule('androidNav'),
  ]);
  
  // Initialize in batches with requestAnimationFrame to avoid jank
  requestAnimationFrame(() => {
    // Intro text
    introTextModule.initIntroTextAnimation();
    
    requestAnimationFrame(() => {
      // Video and get involved animations
      videoAnimModule.animateVideoScale();
      getInvolvedModule.animateGetInvolvedText();
      getInvolvedModule.animateSlidingCards();
      getInvolvedModule.initGetInvolvedLogoAnimation();
      
      requestAnimationFrame(() => {
        // Marquee and scroll reveal
        marqueeModule.initInfiniteMarqueeAnimation();
        scrollRevealModule.initScrollRevealAnimation();
        
        requestAnimationFrame(() => {
          // Timeline (heavy)
          timelineModule.initTimelineAnimation();
          
          requestAnimationFrame(() => {
            // UI components
            pageNavModule.updatePageNavigation();
            fancyButtonsModule.initFancyButtonEffects();
            audioModule.setupUIClickSounds();
            audioModule.setupSoundToggle();
            shareModule.initShareButtonOverlapDetection();
            shareModule.initSharePanel();
            eventListModule.initEventListItemHover();
            
            // Split text animations
            splitTextModule.initSplitLinesAnimation(null);
            splitTextModule.initSplitCharsAnimation(null);
            
            // Global handlers
            globalHandlersModule.initGlobalResizeHandler();
            androidNavModule.initAndroidNavAdjustments();
            
            console.log('[Main] All animations initialized');
          });
        });
      });
    });
  });
}

// =============================================================================
// MENU HANDLERS (lightweight, can be set up immediately)
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

  // Scroll direction detection
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
// SCROLL POSITION MANAGEMENT
// =============================================================================
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
  sessionStorage.setItem("scrollToTop", "true");
});

window.addEventListener("load", () => {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  setTimeout(() => window.scrollTo(0, 0), 10);
});

// =============================================================================
// LENIS SETUP (deferred but needed before cover area)
// =============================================================================
async function setupLenis() {
  const Lenis = (await loadModule('lenis')).default;
  
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
// MAIN INITIALIZATION - Phased loading for optimal perceived performance
// =============================================================================
document.addEventListener("DOMContentLoaded", async () => {
  window.scrollTo(0, 0);
  console.log('[Main] DOMContentLoaded - starting phased initialization');
  
  // ==========================================================================
  // PHASE 0: Immediate setup (no async, no delays)
  // ==========================================================================
  setupMenuHandlers();
  
  // ==========================================================================
  // PHASE 1: AEM Detection + Lenis (minimal, required for cover area)
  // ==========================================================================
  const aemModule = await loadModule('aemModeDetector');
  const aemMode = aemModule.default.detect();
  const aemSettings = aemModule.default.getSettings();
  
  console.log('[Main] AEM Mode:', aemMode);
  
  if (aemSettings.showStaticBackground) {
    aemModule.default.applyStaticBackground();
  }
  if (aemSettings.showPlaceholderMessage) {
    aemModule.default.showPlaceholderMessage();
  }
  
  // Setup Lenis (needed before cover area)
  await setupLenis();
  
  // ==========================================================================
  // PHASE 2: CRITICAL PATH - Cover area + Shader (visible immediately)
  // This is what the user sees first - prioritize this!
  // ==========================================================================
  if (isMainPage()) {
    // Start critical path immediately - don't wait for anything else
    await initCriticalPath(aemSettings);
    
    // ==========================================================================
    // PHASE 3: Secondary animations (hero number, countdown, etc.)
    // These enhance the cover area but aren't blocking
    // ==========================================================================
    if (aemSettings.enableAnimations) {
      // Use requestIdleCallback if available, otherwise setTimeout
      const scheduleSecondary = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
      scheduleSecondary(() => {
        initSecondaryAnimations();
      }, { timeout: 100 });
    }
    
    // ==========================================================================
    // PHASE 4: Deferred animations (everything else)
    // These load in the background while user sees cover area
    // ==========================================================================
    if (aemSettings.enableAnimations) {
      const scheduleDeferred = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
      scheduleDeferred(() => {
        initDeferredAnimations();
      }, { timeout: 500 });
    }
    
    // ==========================================================================
    // PHASE 5: Video and other heavy content
    // ==========================================================================
    if (aemSettings.enableVideo) {
      const scheduleVideo = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
      scheduleVideo(async () => {
        const videoModule = await loadModule('video');
        videoModule.initVideo();
        console.log('[Main] Video initialized');
      }, { timeout: 1000 });
    }
    
    // Initialize countdown (lightweight)
    const countdownModule = await loadModule('countdown');
    countdownModule.initCountdown(targetDate);
    
  } else {
    console.log("Running in lightweight mode - animations and video disabled");
  }
  
  // Debug mode
  if (debugMode) {
    const debugModule = await loadModule('debug');
    debugModule.initDebug();
  }
  
  // Final scroll position reset
  setTimeout(() => {
    window.scrollTo(0, 0);
    window.lenis?.scrollTo(0, { immediate: true });
  }, 100);
  
  // Register additional GSAP plugins in background (not needed for initial paint)
  requestIdleCallback(async () => {
    const [morphModule, splitModule] = await Promise.all([
      loadModule('morphSVG'),
      loadModule('splitType'),
    ]);
    gsap.registerPlugin(morphModule.MorphSVGPlugin);
    gsap.registerPlugin(splitModule.default);
    console.log('[Main] Additional GSAP plugins registered');
  }, { timeout: 2000 });
});
