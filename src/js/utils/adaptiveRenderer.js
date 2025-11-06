/**
 * Adaptive Renderer
 * Manages rendering performance by adapting to device capabilities
 * and visibility state
 */

export class AdaptiveRenderer {
  constructor(animateCallback, targetFPS = 60) {
    this.animateCallback = animateCallback;
    this.targetFPS = targetFPS;
    this.frameInterval = 1000 / targetFPS;
    this.lastFrameTime = 0;
    this.isVisible = true;
    this.isRunning = false;
    this.rafId = null;
    this.pausedByTimeline = false;
    
    // Performance monitoring
    this.frameCount = 0;
    this.fpsCheckInterval = 1000; // Check FPS every second
    this.lastFPSCheck = performance.now();
    this.currentFPS = targetFPS;
    
    this.setupVisibilityObserver();
    this.setupPageVisibilityListener();
  }

  /**
   * Setup Intersection Observer to detect when canvas is visible
   */
  setupVisibilityObserver() {
    const canvas = document.getElementById('shaderBackground');
    if (!canvas) return;

    const options = {
      root: null,
      rootMargin: '50px', // Start rendering slightly before visible
      threshold: 0.1, // At least 10% visible
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        this.isVisible = entry.isIntersecting;
        
        if (this.isVisible && this.isRunning) {
          console.log('[Adaptive Renderer] Canvas visible, resuming rendering');
        } else if (!this.isVisible) {
          console.log('[Adaptive Renderer] Canvas not visible, pausing rendering');
        }
      });
    }, options);

    this.observer.observe(canvas);
  }

  /**
   * Listen for page visibility changes (tab switching, etc.)
   */
  setupPageVisibilityListener() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        console.log('[Adaptive Renderer] Page hidden, pausing rendering');
        this.pause();
      } else {
        console.log('[Adaptive Renderer] Page visible, resuming rendering');
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
      
      // Auto-adjust target FPS if consistently missing target
      if (this.currentFPS < this.targetFPS * 0.8) {
        console.warn(`[Adaptive Renderer] FPS below target (${this.currentFPS}/${this.targetFPS}), consider reducing quality`);
      }
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
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

export default AdaptiveRenderer;

