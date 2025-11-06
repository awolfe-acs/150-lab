/**
 * Performance Monitor
 * Tracks and logs performance metrics for Three.js/WebGL rendering
 */

export class PerformanceMonitor {
  constructor() {
    this.metrics = {
      fps: 0,
      frameTime: 0,
      memory: 0,
      drawCalls: 0,
      triangles: 0,
      geometries: 0,
      textures: 0,
    };
    
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.fpsHistory = [];
    this.maxHistoryLength = 60; // Keep 60 frames of history
    
    this.warningThreshold = {
      fps: 30,
      frameTime: 33, // ms
      memory: 200, // MB - Increased from 100 to 200 (Three.js scenes typically use 100-150MB)
    };
    
    this.onWarning = null;
    
    // Throttle warnings to prevent spam
    this.lastWarningTime = 0;
    this.warningCooldown = 30000; // Only warn once every 30 seconds
    this.warningHistory = new Map(); // Track which warnings we've sent recently
  }

  /**
   * Update metrics from renderer info
   */
  update(renderer) {
    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastTime;
    
    this.frameCount++;
    
    // Update FPS every second
    if (deltaTime >= 1000) {
      this.metrics.fps = Math.round((this.frameCount * 1000) / deltaTime);
      this.metrics.frameTime = deltaTime / this.frameCount;
      
      // Add to history
      this.fpsHistory.push(this.metrics.fps);
      if (this.fpsHistory.length > this.maxHistoryLength) {
        this.fpsHistory.shift();
      }
      
      // Get renderer info
      if (renderer && renderer.info) {
        const info = renderer.info;
        this.metrics.drawCalls = info.render.calls;
        this.metrics.triangles = info.render.triangles;
        this.metrics.geometries = info.memory.geometries;
        this.metrics.textures = info.memory.textures;
      }
      
      // Get memory usage if available
      if (performance.memory) {
        this.metrics.memory = Math.round(performance.memory.usedJSHeapSize / 1048576);
      }
      
      // Check for warnings
      this.checkWarnings();
      
      // Reset counters
      this.frameCount = 0;
      this.lastTime = currentTime;
    }
  }

  /**
   * Check if any metrics are below thresholds (with throttling)
   */
  checkWarnings() {
    const now = performance.now();
    
    // Throttle warnings to prevent spam
    if (now - this.lastWarningTime < this.warningCooldown) {
      return;
    }
    
    const warnings = [];
    
    // Only warn about FPS if it's consistently low (not just a spike)
    if (this.metrics.fps < this.warningThreshold.fps && this.getAverageFPS() < this.warningThreshold.fps) {
      const warningKey = 'fps';
      if (!this.warningHistory.has(warningKey) || now - this.warningHistory.get(warningKey) > this.warningCooldown) {
        warnings.push(`Low FPS: ${this.metrics.fps} (avg: ${this.getAverageFPS()})`);
        this.warningHistory.set(warningKey, now);
      }
    }
    
    if (this.metrics.frameTime > this.warningThreshold.frameTime) {
      const warningKey = 'frameTime';
      if (!this.warningHistory.has(warningKey) || now - this.warningHistory.get(warningKey) > this.warningCooldown) {
        warnings.push(`High frame time: ${this.metrics.frameTime.toFixed(1)}ms`);
        this.warningHistory.set(warningKey, now);
      }
    }
    
    // Only warn about memory if it's significantly over threshold (20% margin)
    if (this.metrics.memory > this.warningThreshold.memory * 1.2) {
      const warningKey = 'memory';
      if (!this.warningHistory.has(warningKey) || now - this.warningHistory.get(warningKey) > this.warningCooldown) {
        warnings.push(`High memory usage: ${this.metrics.memory}MB (threshold: ${this.warningThreshold.memory}MB)`);
        this.warningHistory.set(warningKey, now);
      }
    }
    
    if (warnings.length > 0 && this.onWarning) {
      this.lastWarningTime = now;
      this.onWarning(warnings);
    }
  }

  /**
   * Get average FPS from history
   */
  getAverageFPS() {
    if (this.fpsHistory.length === 0) return 0;
    const sum = this.fpsHistory.reduce((a, b) => a + b, 0);
    return Math.round(sum / this.fpsHistory.length);
  }

  /**
   * Get current metrics
   */
  getMetrics() {
    return { ...this.metrics };
  }

  /**
   * Log metrics to console
   */
  log() {
    console.log('[Performance Monitor]', {
      fps: this.metrics.fps,
      avgFPS: this.getAverageFPS(),
      frameTime: `${this.metrics.frameTime.toFixed(1)}ms`,
      memory: `${this.metrics.memory}MB`,
      drawCalls: this.metrics.drawCalls,
      triangles: this.metrics.triangles,
      geometries: this.metrics.geometries,
      textures: this.metrics.textures,
    });
  }

  /**
   * Create a performance display overlay (for debugging)
   */
  createDebugOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'perf-monitor-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.8);
      color: #0f0;
      font-family: monospace;
      font-size: 12px;
      padding: 10px;
      border-radius: 4px;
      z-index: 999999;
      min-width: 200px;
    `;
    document.body.appendChild(overlay);
    
    // Update overlay every second
    setInterval(() => {
      const metrics = this.getMetrics();
      overlay.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 5px;">Performance Monitor</div>
        <div>FPS: ${metrics.fps} (avg: ${this.getAverageFPS()})</div>
        <div>Frame Time: ${metrics.frameTime.toFixed(1)}ms</div>
        <div>Memory: ${metrics.memory}MB</div>
        <div>Draw Calls: ${metrics.drawCalls}</div>
        <div>Triangles: ${metrics.triangles}</div>
        <div>Geometries: ${metrics.geometries}</div>
        <div>Textures: ${metrics.textures}</div>
      `;
    }, 1000);
    
    return overlay;
  }

  /**
   * Remove debug overlay
   */
  removeDebugOverlay() {
    const overlay = document.getElementById('perf-monitor-overlay');
    if (overlay) {
      overlay.remove();
    }
  }

  /**
   * Set warning callback
   */
  setWarningCallback(callback) {
    this.onWarning = callback;
  }
}

export default PerformanceMonitor;

