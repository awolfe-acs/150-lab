/**
 * Mobile Film Grain Overlay
 * A lightweight, performance-optimized film grain effect for mobile devices.
 * Uses a small canvas texture that updates at 24fps (cinematic framerate)
 * and is overlaid via CSS blend modes for minimal GPU impact.
 */

import logger from './logger.js';
import performanceDetector from './performanceDetector.js';

class MobileFilmGrain {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.overlay = null;
    this.isRunning = false;
    this.intervalId = null;
    
    this.targetFPS = 16;
    this.frameInterval = 1000 / this.targetFPS;
    
    // Grain settings
    this.grainIntensity = 0.64; // Strong visible grain for cinematic look
    this.grainSize = 1.5; // Smaller size = higher resolution appearance
    this.opacity = 0.8; 
    
    // Higher resolution texture for sharper grain
    this.textureWidth = 512;
    this.textureHeight = 512;
    
    // Pre-generate noise values for faster updates
    this.noiseBuffer = null;
    this.noiseBufferSize = 512 * 512;
    
    // Frame counter for distinct frame-to-frame changes
    this.frameCount = 0;
  }

  /**
   * Initialize the film grain overlay
   */
  init() {
    if (this.canvas) return; // Already initialized
    
    // Create canvas for generating grain texture
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.textureWidth;
    this.canvas.height = this.textureHeight;
    this.ctx = this.canvas.getContext('2d', { 
      alpha: true,
      willReadFrequently: false 
    });
    
    // Create overlay element
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
      will-change: background-image;
      image-rendering: pixelated;
    `;
    
    // Pre-generate noise buffer
    this.generateNoiseBuffer();
    
    // Add to DOM - insert right before #shaderBackground
    const shaderBackground = document.getElementById('shaderBackground');
    if (shaderBackground && shaderBackground.parentNode) {
      shaderBackground.parentNode.insertBefore(this.overlay, shaderBackground);
      logger.log('[Mobile Film Grain] Initialized (inserted before #shaderBackground)');
    } else {
      // Fallback to body if shaderBackground not found
      document.body.appendChild(this.overlay);
      logger.log('[Mobile Film Grain] Initialized (appended to body - shaderBackground not found)');
    }
  }

  /**
   * Pre-generate a buffer of random values for fast noise updates
   */
  generateNoiseBuffer() {
    this.noiseBuffer = new Uint8Array(this.noiseBufferSize);
    for (let i = 0; i < this.noiseBufferSize; i++) {
      this.noiseBuffer[i] = Math.random() * 255;
    }
  }

  /**
   * Generate a new grain texture frame
   * Uses distinct random patterns each frame for authentic 24fps film look
   */
  generateGrainFrame() {
    if (!this.ctx || !this.noiseBuffer) return;
    
    const imageData = this.ctx.createImageData(this.textureWidth, this.textureHeight);
    const data = imageData.data;
    const intensity = this.grainIntensity * 255;
    
    // Use frame count to create distinct, non-repeating patterns
    // This gives the characteristic "flickery" 24fps film grain look
    this.frameCount++;
    const frameSeed = this.frameCount * 7919; // Prime number for good distribution
    
    // Generate completely fresh noise each frame for authentic film grain
    for (let i = 0; i < this.textureWidth * this.textureHeight; i++) {
      const idx = i * 4;
      
      // Mix pre-computed buffer with frame-specific randomness for distinct frames
      const bufferIdx = (i + frameSeed) % this.noiseBufferSize;
      const baseNoise = this.noiseBuffer[bufferIdx];
      
      // Add per-frame randomness for more organic, flickery grain
      const frameNoise = ((baseNoise * 31 + frameSeed) % 256);
      const noise = (frameNoise - 128) * (intensity / 128);
      
      // Apply noise to RGB (grayscale grain)
      data[idx] = 128 + noise;     // R
      data[idx + 1] = 128 + noise; // G
      data[idx + 2] = 128 + noise; // B
      data[idx + 3] = 140;         // Alpha (strong visible grain)
    }
    
    this.ctx.putImageData(imageData, 0, 0);
    
    // Update overlay background
    this.overlay.style.backgroundImage = `url(${this.canvas.toDataURL('image/png')})`;
  }

  /**
   * Animation loop running at strict 24fps using setInterval
   * Using setInterval instead of RAF ensures consistent 24fps regardless of display refresh rate
   */
  animate() {
    // Use setInterval for precise 24fps timing
    // This ensures the grain updates exactly 24 times per second
    // regardless of the device's refresh rate (60hz, 120hz, etc.)
    this.intervalId = setInterval(() => {
      if (!this.isRunning) {
        clearInterval(this.intervalId);
        return;
      }
      
      // Skip if page is hidden
      if (document.hidden) {
        return;
      }
      
      // Generate new grain frame
      this.generateGrainFrame();
    }, this.frameInterval); // 41.67ms = 24fps
  }

  /**
   * Start the film grain animation
   */
  start() {
    if (this.isRunning) return;
    
    this.init();
    this.isRunning = true;
    this.animate();
    
    logger.log(`[Mobile Film Grain] Started at ${this.targetFPS}fps (${this.frameInterval.toFixed(1)}ms interval)`);
  }

  /**
   * Stop the film grain animation
   */
  stop() {
    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
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
    
    this.canvas = null;
    this.ctx = null;
    this.overlay = null;
    this.noiseBuffer = null;
    
    logger.log('[Mobile Film Grain] Destroyed');
  }
}

// Create singleton instance
const mobileFilmGrain = new MobileFilmGrain();

export default mobileFilmGrain;
