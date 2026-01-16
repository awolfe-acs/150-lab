/**
 * Adaptive Renderer
 * Manages rendering performance by adapting to device capabilities
 * and visibility state
 * 
 * Key principle: Cap at 60fps max to ensure consistent visual appearance.
 * The shader animation speed is independent of render FPS (controlled by
 * fixed time increments). Only downgrade to 30fps after persistent evidence
 * from the PerformanceDetector.
 */

import performanceDetector from './performanceDetector.js';
import logger from './logger.js';

export class AdaptiveRenderer {
  constructor(animateCallback, targetFPS = 60) {
    this.animateCallback = animateCallback;
    // Always cap at 60fps max - visual speed is controlled separately
    this.targetFPS = Math.min(targetFPS, 60);
    this.frameInterval = 1000 / this.targetFPS;
    this.lastFrameTime = 0;
    this.isVisible = true;
    this.isRunning = false;
    this.rafId = null;
    this.pausedByTimeline = false;
    this.inTimeline = false; // Track if we're in timeline experience
    
    // Performance monitoring
    this.frameCount = 0;
    this.fpsCheckInterval = 1000; // Check FPS every second
    this.lastFPSCheck = performance.now();
    this.currentFPS = this.targetFPS;
    
    // Degradation state - tracks if we've been downgraded
    this.isDegraded = false;
    this.minFPS = 30; // Minimum FPS for low-end devices
    
    // Canvas monitoring - default to main background
    this.currentCanvasId = 'shaderBackground';
    this.observers = new Map(); // Store multiple observers
    
    this.setupVisibilityObserver(this.currentCanvasId);
    this.setupPageVisibilityListener();
    this.setupDegradationListener();
  }
  
  /**
   * Listen for performance degradation events from PerformanceDetector
   */
  setupDegradationListener() {
    performanceDetector.onDegradation((info) => {
      if (info.tier === 'low' && !this.isDegraded) {
        logger.log('[Adaptive Renderer] Received degradation signal - reducing to 30fps');
        this.isDegraded = true;
        this.setTargetFPS(info.targetFPS || this.minFPS);
      }
    });
    
    // Listen for adaptive FPS cap changes
    performanceDetector.onFpsCapChange((info) => {
      if (this.isDegraded) return; // Don't override degradation
      
      logger.log(`[Adaptive Renderer] Received FPS cap signal: ${info.cap}fps (${info.reason})`);
      
      // Only apply cap if it's lower than current target
      if (info.cap < this.targetFPS) {
        this.setTargetFPS(info.cap);
      }
    });
  }

  /**
   * Setup Intersection Observer to detect when canvas is visible
   */
  setupVisibilityObserver(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      logger.warn(`[Adaptive Renderer] Canvas #${canvasId} not found for observation`);
      return;
    }

    const options = {
      root: null,
      rootMargin: '50px', // Start rendering slightly before visible
      threshold: 0.1, // At least 10% visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Only update visibility if this is the currently monitored canvas
        if (entry.target.id === this.currentCanvasId) {
          this.isVisible = entry.isIntersecting;
          
          if (this.isVisible && this.isRunning) {
          } else if (!this.isVisible) {
          }
        }
      });
    }, options);

    observer.observe(canvas);
    this.observers.set(canvasId, observer);
  }

  /**
   * Listen for page visibility changes (tab switching, etc.)
   */
  setupPageVisibilityListener() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pause();
      } else {
        this.resume();
      }
    });
  }

  /**
   * Start the adaptive rendering loop
   */
  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.lastFrameTime = performance.now();
    this.lastFPSCheck = performance.now();
    this.frameCount = 0;
    this.loop();
  }

  /**
   * Main rendering loop with adaptive FPS
   * 
   * Key behavior: Records FPS samples for runtime performance validation.
   * Only shows warnings after persistent evidence, not single spikes.
   */
  loop() {
    if (!this.isRunning) return;

    this.rafId = requestAnimationFrame(() => this.loop());

    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastFrameTime;

    // Check FPS every second
    if (currentTime - this.lastFPSCheck >= this.fpsCheckInterval) {
      this.currentFPS = this.frameCount;
      this.frameCount = 0;
      this.lastFPSCheck = currentTime;
      
      // Record FPS sample for persistent performance validation
      // Only record when actively rendering (not paused)
      if (!this.pausedByTimeline && this.isVisible && !document.hidden) {
        performanceDetector.recordFpsSample(this.currentFPS);
      }
      
      // Removed automatic warnings - let PerformanceDetector handle degradation
      // based on persistent evidence, not single measurements
    }

    // Skip frame if not enough time has passed
    if (deltaTime < this.frameInterval) {
      return;
    }

    // Skip rendering if not visible, paused by timeline, or page is hidden
    if (!this.isVisible || this.pausedByTimeline || document.hidden) {
      return;
    }

    // Update last frame time
    this.lastFrameTime = currentTime - (deltaTime % this.frameInterval);
    
    // Increment frame count
    this.frameCount++;

    // Call the animation callback
    if (this.animateCallback) {
      this.animateCallback(deltaTime);
    }
  }

  /**
   * Pause rendering
   */
  pause() {
    this.isRunning = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  /**
   * Resume rendering
   */
  resume() {
    if (this.isRunning) return;
    this.start();
  }

  /**
   * Set pause state from timeline
   */
  setPausedByTimeline(paused) {
    this.pausedByTimeline = paused;
    
    // If pausing and we're on the background canvas, we expect this
    if (paused && this.currentCanvasId === 'shaderBackground') {
      // Reset frame count to avoid false FPS warnings
      this.frameCount = 0;
      this.lastFPSCheck = performance.now();
    }
  }
  
  /**
   * Set timeline state and switch canvas monitoring
   */
  setInTimeline(inTimeline) {
    if (this.inTimeline === inTimeline) return; // No change
    
    this.inTimeline = inTimeline;
    
    // Switch canvas monitoring based on timeline state
    if (inTimeline) {
      // Monitor timeline canvases
      this.switchCanvasMonitoring('timeline-shader-bg');
    } else {
      // Monitor main background shader
      this.switchCanvasMonitoring('shaderBackground');
    }
  }
  
  /**
   * Switch which canvas is being monitored for visibility
   */
  switchCanvasMonitoring(canvasId) {
    if (this.currentCanvasId === canvasId) return; // Already monitoring this canvas
    
    // Update current canvas
    this.currentCanvasId = canvasId;
    
    // Set up observer for this canvas if not already set up
    if (!this.observers.has(canvasId)) {
      this.setupVisibilityObserver(canvasId);
    }
    
    // Reset FPS tracking when switching canvases
    this.frameCount = 0;
    this.lastFPSCheck = performance.now();
  }

  /**
   * Update target FPS
   */
  setTargetFPS(fps) {
    this.targetFPS = fps;
    this.frameInterval = 1000 / fps;
  }

  /**
   * Get current FPS
   */
  getCurrentFPS() {
    return this.currentFPS;
  }

  /**
   * Cleanup
   */
  destroy() {
    this.pause();
    // Disconnect all observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

export default AdaptiveRenderer;

