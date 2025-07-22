// standalone-loader.js
// Completely independent asset preloader that runs before any other JavaScript
//
// IMPORTANT: This file must remain standalone and NOT be bundled by Vite.
// It needs to load immediately to show the loading screen before any other assets.
// Vite config excludes this file from bundling via external: ['/loader.js']

// Asset URLs - these need to be hardcoded since we can't use imports
const ASSET_URLS = {
  // Audio files
  "ui-click.mp3": "/audio/ui-click.mp3",
  "chemistry-3-final.mp3": "/audio/chemistry-3-final.mp3",

  // Video files
  "acs-150-compressed.mp4": "/video/acs-150-compressed.mp4",

  // 3D Models
  "globe-hd.glb": "/models/globe-hd.glb",

  // Images
  "anniversary-video-poster.jpg": "/images/anniversary-video-poster.jpg",
  "pacifichem-event1.jpg": "/images/pacifichem-event1.jpg",
  "green-chemistry-event2.jpg": "/images/green-chemistry-event2.jpg",
  "acs-spring-meeting-event3.jpg": "/images/acs-spring-meeting-event3.jpg",

  // JavaScript (will be dynamically detected)
  "main-bundle.js": null, // Will be set dynamically
};

// Asset size estimates (in bytes)
const ASSET_SIZES = {
  "ui-click.mp3": 31600, // ~31.6KB
  "chemistry-3-final.mp3": 1240000, // ~1.24MB
  "acs-150-compressed.mp4": 15000000, // ~15MB
  "globe-hd.glb": 799000, // ~799KB
  "anniversary-video-poster.jpg": 45900, // ~47KB
  "pacifichem-event1.jpg": 169000, // ~169KB
  "green-chemistry-event2.jpg": 250000, // ~250KB
  "acs-spring-meeting-event3.jpg": 168000, // ~168KB
  "main-bundle.js": 906000, // ~906KB estimated
};

// Calculate total size for progress calculation (excluding main bundle which is loaded by HTML)
const TOTAL_SIZE = Object.entries(ASSET_SIZES)
  .filter(([key]) => key !== "main-bundle.js")
  .reduce((sum, [, size]) => sum + size, 0);

class StandaloneAssetLoader {
  constructor() {
    this.loadedBytes = 0;
    this.totalBytes = TOTAL_SIZE;
    this.loadedAssets = new Set();
    this.onProgressCallback = null;
    this.onCompleteCallback = null;

    // Store preloaded assets for main app to use
    this.preloadedAssets = {};

    // Animation properties for smooth progress
    this.currentDisplayProgress = 0;
    this.targetProgress = 0;
    this.isAnimating = false;
    this.animationFrame = null;

    // Detect main JS bundle URL
    this.detectMainBundle();

    this.createLoaderUI();
  }

  detectMainBundle() {
    // Find the main JavaScript bundle by looking for script tags
    const scripts = document.querySelectorAll("script[src]");
    for (const script of scripts) {
      const src = script.src;
      // Look for bundled JS files (typically contain hash or are in assets folder)
      if (src.includes("assets/index-") || src.includes("main") || src.includes(".js")) {
        // Convert absolute URL to relative path
        const url = new URL(src);
        ASSET_URLS["main-bundle.js"] = url.pathname;
        break;
      }
    }

    // Fallback if no bundle detected
    if (!ASSET_URLS["main-bundle.js"]) {
      ASSET_URLS["main-bundle.js"] = "/src/main.js";
    }
  }

  createLoaderUI() {
    // Ensure app is hidden initially
    this.hideMainContent();

    // Create loader container
    this.loaderContainer = document.createElement("div");
    this.loaderContainer.className = "asset-loader";
    this.loaderContainer.innerHTML = `
      <div class="loader-content">
        <div class="progress-circle">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle 
              cx="60" 
              cy="60" 
              r="54" 
              fill="none" 
              stroke="rgba(255, 255, 255, 0.1)" 
              stroke-width="2"
            />
            <circle 
              cx="60" 
              cy="60" 
              r="54" 
              fill="none" 
              stroke="#ffffff" 
              stroke-width="2" 
              stroke-linecap="round"
              stroke-dasharray="339.29"
              stroke-dashoffset="339.29"
              class="progress-ring"
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div class="progress-text">
            <span class="percentage">0%</span>
            <span class="loading-text">Loading</span>
          </div>
        </div>
      </div>
    `;

    // Add loader styles directly
    this.addLoaderStyles();

    // Insert loader at the beginning of body
    document.body.insertBefore(this.loaderContainer, document.body.firstChild);

    // Get progress ring for animation
    this.progressRing = this.loaderContainer.querySelector(".progress-ring");
    this.percentageText = this.loaderContainer.querySelector(".percentage");

    // Calculate circumference for stroke-dasharray animation
    this.circumference = 2 * Math.PI * 54; // radius = 54
  }

  addLoaderStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .asset-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(135deg, #0f0f23 0%, #1a1a3a 50%, #0f0f23 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 1;
      }
      
      .asset-loader .loader-content {
        text-align: center;
        color: white;
      }
      
      .asset-loader .progress-circle {
        position: relative;
        display: inline-block;
      }
      
      .asset-loader .progress-circle svg {
        display: block;
        margin: 0 auto;
        filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
      }
      
      .asset-loader .progress-ring {
        transition: stroke-dashoffset 0.3s ease-in-out;
        filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
      }
      
      .asset-loader .progress-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
      }
      
      .asset-loader .progress-text .percentage {
        font-size: 1.5rem;
        font-weight: 600;
        color: #ffffff;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        margin-bottom: 2px;
      }
      
      .asset-loader .progress-text .loading-text {
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.8);
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: 300;
      }
      
      .asset-loader::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
        animation: loaderBackground 8s ease-in-out infinite;
      }
      
      @keyframes loaderBackground {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.6; }
      }
      
      @media (max-width: 768px) {
        .asset-loader .progress-circle svg { width: 100px; height: 100px; }
        .asset-loader .progress-text .percentage { font-size: 1.25rem; }
        .asset-loader .progress-text .loading-text { font-size: 0.65rem; }
      }
      
      @media (max-width: 480px) {
        .asset-loader .progress-circle svg { width: 80px; height: 80px; }
        .asset-loader .progress-text .percentage { font-size: 1rem; }
        .asset-loader .progress-text .loading-text { font-size: 0.6rem; }
      }
    `;
    document.head.appendChild(style);
  }

  updateProgress(assetName, loadedBytes) {
    if (!this.loadedAssets.has(assetName)) {
      this.loadedAssets.add(assetName);
      this.loadedBytes += loadedBytes;
    }

    const progress = Math.min((this.loadedBytes / this.totalBytes) * 100, 100);
    this.animateToProgress(progress);

    if (this.onProgressCallback) {
      this.onProgressCallback(progress);
    }

    // Check if all assets are loaded (8 total: 2 audio + 1 video + 1 model + 4 images)
    // Note: We don't preload the main JS bundle since it's loaded by HTML
    if (this.loadedAssets.size >= 8) {
      setTimeout(() => this.complete(), 300);
    }
  }

  setProgress(percentage) {
    const offset = this.circumference - (percentage / 100) * this.circumference;
    this.progressRing.style.strokeDashoffset = offset;
    this.percentageText.textContent = `${Math.round(percentage)}%`;
  }

  animateToProgress(targetPercentage) {
    this.targetProgress = targetPercentage;

    if (!this.isAnimating) {
      this.isAnimating = true;
      this.smoothProgressUpdate();
    }
  }

  smoothProgressUpdate() {
    const progressDiff = this.targetProgress - this.currentDisplayProgress;

    if (Math.abs(progressDiff) < 0.1) {
      this.currentDisplayProgress = this.targetProgress;
      this.setProgress(this.currentDisplayProgress);
      this.isAnimating = false;
      return;
    }

    const animationSpeed = Math.max(0.5, Math.abs(progressDiff) * 0.1);

    if (progressDiff > 0) {
      this.currentDisplayProgress += animationSpeed;
    } else {
      this.currentDisplayProgress -= animationSpeed;
    }

    if (progressDiff > 0 && this.currentDisplayProgress > this.targetProgress) {
      this.currentDisplayProgress = this.targetProgress;
    } else if (progressDiff < 0 && this.currentDisplayProgress < this.targetProgress) {
      this.currentDisplayProgress = this.targetProgress;
    }

    this.setProgress(this.currentDisplayProgress);
    this.animationFrame = requestAnimationFrame(() => this.smoothProgressUpdate());
  }

  complete() {
    this.animateToProgress(100);

    const waitForComplete = () => {
      if (this.isAnimating && this.currentDisplayProgress < 99.9) {
        setTimeout(waitForComplete, 50);
        return;
      }

      this.loaderContainer.style.transition = "opacity 0.5s ease-out";
      this.loaderContainer.style.opacity = "0";

      setTimeout(() => {
        if (this.animationFrame) {
          cancelAnimationFrame(this.animationFrame);
        }

        this.loaderContainer.remove();
        this.showMainContent();

        // Signal that loading is complete
        window.ASSETS_LOADED = true;

        // Make preloaded assets available globally
        window.PRELOADED_ASSETS = this.preloadedAssets || {};

        if (this.onCompleteCallback) {
          this.onCompleteCallback();
        }

        // Dispatch custom event for main app
        window.dispatchEvent(new CustomEvent("assetsLoaded"));
      }, 500);
    };

    waitForComplete();
  }

  hideMainContent() {
    const app = document.querySelector("#app");
    const body = document.body;
    const html = document.documentElement;

    // Hide content
    if (app) {
      app.style.opacity = "0";
    } else {
      // If no #app, hide body content
      body.style.opacity = "0";
    }

    // Lock scrolling
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    // Prevent scroll on mobile devices
    body.style.position = "fixed";
    body.style.width = "100%";
    body.style.height = "100%";

    // Store original scroll position to restore later
    this.originalScrollY = window.scrollY;
    body.style.top = `-${this.originalScrollY}px`;

    // Add event listeners to prevent scrolling
    this.addScrollPreventionListeners();
  }

  showMainContent() {
    const app = document.querySelector("#app");
    const body = document.body;
    const html = document.documentElement;

    // Restore scrolling
    html.style.overflow = "";
    body.style.overflow = "";
    body.style.position = "";
    body.style.width = "";
    body.style.height = "";
    body.style.top = "";

    // Restore original scroll position
    if (this.originalScrollY !== undefined) {
      window.scrollTo(0, this.originalScrollY);
    }

    // Remove scroll prevention listeners
    this.removeScrollPreventionListeners();

    // Show the app content - let the main application handle all specific element animations
    if (app) {
      app.style.transition = "opacity 0.6s ease-out";
      app.style.opacity = "1";
    } else {
      body.style.transition = "opacity 0.6s ease-out";
      body.style.opacity = "1";
    }
  }

  onProgress(callback) {
    this.onProgressCallback = callback;
  }

  onComplete(callback) {
    this.onCompleteCallback = callback;
  }

  addScrollPreventionListeners() {
    // Prevent wheel scrolling
    this.preventWheel = (e) => {
      e.preventDefault();
      return false;
    };

    // Prevent touch scrolling
    this.preventTouch = (e) => {
      if (e.touches.length > 1) return; // Allow pinch zoom
      e.preventDefault();
      return false;
    };

    // Prevent keyboard scrolling
    this.preventKeyboard = (e) => {
      const scrollKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40]; // Space, Page Up/Down, Home, End, Arrow keys
      if (scrollKeys.includes(e.keyCode)) {
        e.preventDefault();
        return false;
      }
    };

    // Add listeners
    window.addEventListener("wheel", this.preventWheel, { passive: false });
    window.addEventListener("touchmove", this.preventTouch, { passive: false });
    window.addEventListener("keydown", this.preventKeyboard, { passive: false });

    // Also prevent scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }

  removeScrollPreventionListeners() {
    // Remove listeners
    window.removeEventListener("wheel", this.preventWheel);
    window.removeEventListener("touchmove", this.preventTouch);
    window.removeEventListener("keydown", this.preventKeyboard);

    // Restore scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "auto";
    }
  }
}

// Asset loading functions
function loadAssetWithProgress(url, assetName, loader, type = "fetch") {
  return new Promise((resolve, reject) => {
    let hasLoaded = false;

    if (type === "audio") {
      const audio = new Audio();

      audio.addEventListener(
        "canplaythrough",
        () => {
          if (!hasLoaded) {
            hasLoaded = true;
            loader.preloadedAssets[assetName] = audio;
            loader.updateProgress(assetName, ASSET_SIZES[assetName] || 1000000);
            resolve(audio);
          }
        },
        { once: true }
      );

      audio.addEventListener(
        "error",
        (e) => {
          console.error(`Failed to load audio: ${assetName}`, e);
          if (!hasLoaded) {
            hasLoaded = true;
            loader.updateProgress(assetName, ASSET_SIZES[assetName] || 1000000);
          }
          reject(e);
        },
        { once: true }
      );

      audio.preload = "auto";
      audio.src = url;
      audio.load();
    } else if (type === "video") {
      const video = document.createElement("video");

      video.addEventListener(
        "canplaythrough",
        () => {
          if (!hasLoaded) {
            hasLoaded = true;
            loader.preloadedAssets[assetName] = video;
            loader.updateProgress(assetName, ASSET_SIZES[assetName] || 10000000);
            resolve(video);
          }
        },
        { once: true }
      );

      video.addEventListener(
        "error",
        (e) => {
          console.error(`Failed to load video: ${assetName}`, e);
          if (!hasLoaded) {
            hasLoaded = true;
            loader.updateProgress(assetName, ASSET_SIZES[assetName] || 10000000);
          }
          reject(e);
        },
        { once: true }
      );

      video.preload = "auto";
      video.src = url;
      video.load();
    } else if (type === "image") {
      const img = new Image();

      img.onload = () => {
        if (!hasLoaded) {
          hasLoaded = true;
          loader.preloadedAssets[assetName] = img;
          loader.updateProgress(assetName, ASSET_SIZES[assetName] || 100000);
          resolve(img);
        }
      };

      img.onerror = (e) => {
        console.error(`Failed to load image: ${assetName}`, e);
        if (!hasLoaded) {
          hasLoaded = true;
          loader.updateProgress(assetName, ASSET_SIZES[assetName] || 100000);
        }
        reject(e);
      };

      img.src = url;
    } else if (type === "script") {
      const script = document.createElement("script");

      script.onload = () => {
        if (!hasLoaded) {
          hasLoaded = true;
          loader.updateProgress(assetName, ASSET_SIZES[assetName] || 2000000);
          resolve(script);
        }
      };

      script.onerror = (e) => {
        console.error(`Failed to load script: ${assetName}`, e);
        if (!hasLoaded) {
          hasLoaded = true;
          loader.updateProgress(assetName, ASSET_SIZES[assetName] || 2000000);
        }
        reject(e);
      };

      script.src = url;
      document.head.appendChild(script);
    } else {
      // Default fetch for other assets
      fetch(url)
        .then((response) => {
          if (response.ok) {
            // For fetch assets like 3D models, store the response
            return response.arrayBuffer().then((buffer) => {
              loader.preloadedAssets[assetName] = buffer;
              loader.updateProgress(assetName, ASSET_SIZES[assetName] || 1000000);
              resolve(buffer);
            });
          } else {
            throw new Error(`HTTP ${response.status}`);
          }
        })
        .catch((e) => {
          console.error(`Failed to load asset: ${assetName}`, e);
          loader.updateProgress(assetName, ASSET_SIZES[assetName] || 1000000);
          reject(e);
        });
    }
  });
}

// Initialize standalone loader
function initStandaloneLoader() {
  const loader = new StandaloneAssetLoader();

  // Start loading all assets in parallel
  const loadPromises = [
    loadAssetWithProgress(ASSET_URLS["ui-click.mp3"], "ui-click.mp3", loader, "audio"),
    loadAssetWithProgress(ASSET_URLS["chemistry-3-final.mp3"], "chemistry-3-final.mp3", loader, "audio"),
    loadAssetWithProgress(ASSET_URLS["acs-150-compressed.mp4"], "acs-150-compressed.mp4", loader, "video"),
    loadAssetWithProgress(ASSET_URLS["globe-hd.glb"], "globe-hd.glb", loader, "fetch"),
    loadAssetWithProgress(ASSET_URLS["anniversary-video-poster.jpg"], "anniversary-video-poster.jpg", loader, "image"),
    loadAssetWithProgress(ASSET_URLS["pacifichem-event1.jpg"], "pacifichem-event1.jpg", loader, "image"),
    loadAssetWithProgress(ASSET_URLS["green-chemistry-event2.jpg"], "green-chemistry-event2.jpg", loader, "image"),
    loadAssetWithProgress(
      ASSET_URLS["acs-spring-meeting-event3.jpg"],
      "acs-spring-meeting-event3.jpg",
      loader,
      "image"
    ),
    // Note: Main JS bundle is loaded by HTML, not preloaded here
  ].map((promise) => promise.catch(console.error));

  return {
    loader,
    promise: Promise.allSettled(loadPromises),
  };
}

// Auto-initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initStandaloneLoader);
} else {
  initStandaloneLoader();
}
