/**
 * Mobile Film Grain Overlay
 * A lightweight, performance-optimized film grain effect for mobile devices.
 * 
 * PERFORMANCE OPTIMIZATION:
 * Instead of generating frames on-the-fly with expensive toDataURL() calls,
 * this version pre-generates a set of frames at initialization and cycles
 * through them using CSS animation. This eliminates the main performance
 * bottleneck (toDataURL + style recalculation every frame).
 */

import logger from './logger.js';

class MobileFilmGrain {
  constructor() {
    this.overlay = null;
    this.isRunning = false;
    this.frameIndex = 0;
    this.animationFrameId = null;
    
    // Target visual FPS (how fast the grain appears to animate)
    this.targetFPS = 8; // Slightly faster than 6fps for more natural look
    this.frameInterval = 1000 / this.targetFPS;
    this.lastFrameTime = 0;
    
    // Pre-generated frames as data URLs
    this.frames = [];
    this.frameCount = 4; // Only need a few frames for film grain effect
    
    // Grain settings
    this.grainIntensity = 0.5;
    this.grainSize = 1.0;
    this.opacity = 0.25; // Slightly reduced for performance
    
    // Texture dimensions - smaller = faster
    this.textureWidth = 48; // Reduced from 64
    this.textureHeight = 48;
    
    // Noise buffer for fast generation
    this.noiseBuffer = null;
    this.noiseBufferSize = 256 * 256;
  }

  /**
   * Initialize the film grain overlay
   */
  init() {
    if (this.overlay) return; // Already initialized
    
    const startTime = performance.now();
    
    // Pre-generate noise buffer
    this.generateNoiseBuffer();
    
    // Pre-generate all frames upfront (one-time cost)
    this.preGenerateFrames();
    
    // Create overlay element with first frame
    this.overlay = document.createElement('div');
    this.overlay.id = 'mobile-film-grain';
    this.overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      opacity: ${this.opacity};
      mix-blend-mode: overlay;
      background-repeat: repeat;
      background-size: ${Math.round(this.textureWidth * this.grainSize)}px ${Math.round(this.textureHeight * this.grainSize)}px;
      image-rendering: pixelated;
    `;
    
    // Set initial frame
    if (this.frames.length > 0) {
      this.overlay.style.backgroundImage = `url(${this.frames[0]})`;
    }
    
    // Add to DOM - insert right before #shaderBackground
    const shaderBackground = document.getElementById('shaderBackground');
    if (shaderBackground && shaderBackground.parentNode) {
      shaderBackground.parentNode.insertBefore(this.overlay, shaderBackground);
    } else {
      document.body.appendChild(this.overlay);
    }
    
    const initTime = performance.now() - startTime;
    logger.log(`[Mobile Film Grain] Initialized in ${initTime.toFixed(1)}ms with ${this.frameCount} pre-generated frames`);
  }

  /**
   * Pre-generate a buffer of random values
   */
  generateNoiseBuffer() {
    this.noiseBuffer = new Uint8Array(this.noiseBufferSize);
    for (let i = 0; i < this.noiseBufferSize; i++) {
      this.noiseBuffer[i] = Math.random() * 255;
    }
  }

  /**
   * Pre-generate all frames at initialization
   * This is the key optimization - expensive toDataURL calls happen once,
   * not every frame during runtime
   */
  preGenerateFrames() {
    const canvas = document.createElement('canvas');
    canvas.width = this.textureWidth;
    canvas.height = this.textureHeight;
    const ctx = canvas.getContext('2d', { alpha: true });
    
    const intensity = this.grainIntensity * 255;
    const pixelCount = this.textureWidth * this.textureHeight;
    
    for (let frame = 0; frame < this.frameCount; frame++) {
      const imageData = ctx.createImageData(this.textureWidth, this.textureHeight);
      const data = imageData.data;
      
      // Use different offset for each frame to create distinct patterns
      const frameSeed = frame * 7919;
      
      for (let i = 0; i < pixelCount; i++) {
        const idx = i * 4;
        const bufferIdx = (i + frameSeed) % this.noiseBufferSize;
        const baseNoise = this.noiseBuffer[bufferIdx];
        const frameNoise = ((baseNoise * 31 + frameSeed) % 256);
        const noise = (frameNoise - 128) * (intensity / 128);
        
        data[idx] = 128 + noise;     // R
        data[idx + 1] = 128 + noise; // G
        data[idx + 2] = 128 + noise; // B
        data[idx + 3] = 120;         // Alpha
      }
      
      ctx.putImageData(imageData, 0, 0);
      
      // Store frame as data URL (expensive, but only done once)
      this.frames.push(canvas.toDataURL('image/png'));
    }
    
    // Clear the canvas reference
    canvas.width = 0;
    canvas.height = 0;
  }

  /**
   * Animation loop - just cycles through pre-generated frames
   * Much faster than generating frames on-the-fly
   */
  animate(currentTime) {
    if (!this.isRunning) return;
    
    this.animationFrameId = requestAnimationFrame((time) => this.animate(time));
    
    // Skip if page is hidden
    if (document.hidden) return;
    
    // Check if enough time has passed for next frame
    const elapsed = currentTime - this.lastFrameTime;
    if (elapsed < this.frameInterval) return;
    
    this.lastFrameTime = currentTime - (elapsed % this.frameInterval);
    
    // Cycle to next frame
    this.frameIndex = (this.frameIndex + 1) % this.frameCount;
    
    // Update background image (just a string reference, very fast)
    if (this.overlay && this.frames[this.frameIndex]) {
      this.overlay.style.backgroundImage = `url(${this.frames[this.frameIndex]})`;
    }
  }

  /**
   * Start the film grain animation
   */
  start() {
    if (this.isRunning) return;
    
    this.init();
    this.isRunning = true;
    this.lastFrameTime = performance.now();
    this.animationFrameId = requestAnimationFrame((time) => this.animate(time));
    
    logger.log(`[Mobile Film Grain] Started at ~${this.targetFPS}fps`);
  }

  /**
   * Stop the film grain animation
   */
  stop() {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * Pause during scroll for better performance
   */
  pauseForScroll() {
    if (this.overlay) {
      this.overlay.style.display = 'none';
    }
  }

  /**
   * Resume after scroll
   */
  resumeAfterScroll() {
    if (this.overlay) {
      this.overlay.style.display = 'block';
    }
  }

  /**
   * Show the overlay
   */
  show() {
    if (this.overlay) {
      this.overlay.style.display = 'block';
    }
  }

  /**
   * Hide the overlay
   */
  hide() {
    if (this.overlay) {
      this.overlay.style.display = 'none';
    }
  }

  /**
   * Set grain intensity (0-1)
   */
  setIntensity(intensity) {
    this.grainIntensity = Math.max(0, Math.min(1, intensity));
  }

  /**
   * Set overlay opacity (0-1)
   */
  setOpacity(opacity) {
    this.opacity = Math.max(0, Math.min(1, opacity));
    if (this.overlay) {
      this.overlay.style.opacity = this.opacity;
    }
  }

  /**
   * Clean up resources
   */
  destroy() {
    this.stop();
    
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
    }
    
    this.overlay = null;
    this.frames = [];
    this.noiseBuffer = null;
    
    logger.log('[Mobile Film Grain] Destroyed');
  }
}

// Create singleton instance
const mobileFilmGrain = new MobileFilmGrain();

export default mobileFilmGrain;
