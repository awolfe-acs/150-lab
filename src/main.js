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
  // background: () => import("./js/background.js"), // REMOVE - Moved to deferred
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
  background: () => import("./js/background.js"), // ADD - Load after FCP
  videoAnimation: () => import("./js/animations/videoAnimation.js"),
  introText: () => import("./js/animations/introText.js"),
  getInvolved: () => import("./js/animations/getInvolved.js"),
  marquee: () => import("./js/animations/marquee.js"),
  timeline: () => import("./js/animations/timeline.js"),
  pageNavigation: () => import("./js/ui/pageNavigation.js"),
  share: () => import("./js/ui/share.js"),
  // eventListHover: () => import("./js/ui/eventListHover.js"), // DISABLED
  video: () => import("./js/video.js"),
  lazyLoadCardImages: () => import("./js/utils/lazyLoadCardImages.js"),
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
  
  // Stop Lenis initially - will be started when loader hides
  window.lenis.stop();
  
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
  
  // Unlock scrolling
  document.body.style.overflow = '';
  
  // Start Lenis smooth scroll
  if (window.lenis) {
    window.lenis.start();
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
    // 'background', // Deferred
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
    
    // Shader background - CRITICAL PRIORITY
    // Load and init synchronously (awaited) so the spinner hides only after
    // the WebGL shader is compiled and the first frame has rendered.
    // This masks the GPU compilation stutter behind the spinner.
    if (aemSettings.enableBackground) {
      try {
        const background = await loadModule('background');
        await background.initShaderBackground();
      } catch (error) {
        // NOTE: do NOT use console.error here — esbuild drop:['console'] strips it
        // in AEM builds, turning this into an empty catch{} that hides real errors.
        // document.title is immune to stripping and makes failures visible.
        document.title = '[BG Error] ' + (error && error.message ? error.message : String(error));
        // Static background already visible as fallback
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
    // REVEAL PAGE - Critical 3D background is ready, start #app fade-in.
    // Logo and button will fade in after a few more modules load.
    // ==========================================================================
    console.log('[main.js] Critical path complete - starting page reveal...');
    
    // ==========================================================================
    // PHASE 3: DEFERRED MODULES - Load after page is visible
    // These load in the background while the user sees the hero animation.
    // Ordered by visual priority: scroll animations first, then heavy 3D, then video.
    // ==========================================================================
    if (aemSettings.enableAnimations) {
      // Small yield to let the #app start fading in
      await yieldWithDelay(100);

      // Batch 1: Lightweight scroll-triggered animations (parallel)
      const [introText, videoAnimation, getInvolved, marquee] = await Promise.all([
        loadModule('introText'),
        loadModule('videoAnimation'),
        loadModule('getInvolved'),
        loadModule('marquee'),
      ]);

      await yieldToMain();
      
      // NOW reveal logo and button after more modules are loaded
      console.log('[main.js] Deferred modules loaded - revealing logo + button...');
      essential.hero.playCoverAreaAnimation();
      
      await yieldToMain();

      // Initialize lightweight animations immediately
      introText.initIntroTextAnimation();
      videoAnimation.animateVideoScale();
      getInvolved.animateGetInvolvedText();
      getInvolved.animateSlidingCards();
      getInvolved.initGetInvolvedLogoAnimation();
      marquee.initInfiniteMarqueeAnimation();

      await yieldToMain();

      // Batch 2: Heavy 3D (timeline + coverOrb) - lower priority than background
      const timeline = await loadModule('timeline');
      await yieldToMain();
      timeline.initTimelineAnimation();

      await yieldToMain();

      // Batch 3: UI utilities + Video (lowest priority, parallel)
      const [pageNavigation, share, video] = await Promise.all([
        loadModule('pageNavigation'),
        loadModule('share'),
        loadModule('video'),
      ]);

      pageNavigation.updatePageNavigation();
      share.initShareButtonOverlapDetection();
      share.initSharePanel();

      await yieldToMain();

      // Video initialization - last because it triggers network I/O for .mp4
      if (aemSettings.enableVideo) {
        video.initVideo();
      }

      console.log('[main.js] All deferred modules initialized.');
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
  // CARD BACKGROUND IMAGES - Lazy load when near viewport
  // ==========================================================================
  requestIdleCallback(async () => {
    const lazyCardImages = await loadModule('lazyLoadCardImages');
    lazyCardImages.initLazyCardImages();
  }, { timeout: 2000 });
  
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
