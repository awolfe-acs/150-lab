/**
 * Performance Monitor
 * Tracks and logs performance metrics for Three.js/WebGL rendering
 * 
 * Key principle: Don't warn based on single spikes. Only surface warnings
 * after persistent evidence of poor performance. Let the PerformanceDetector
 * handle actual degradation decisions.
 */

import logger from './logger.js';

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
      memory: 200, // MB
    };
    
    this.onWarning = null;
    
    // Throttle warnings to prevent spam
    this.lastWarningTime = 0;
    this.warningCooldown = 60000; // Only warn once every 60 seconds (increased from 30)
    this.warningHistory = new Map();
    
    // Persistence tracking - require multiple consecutive low readings
    this.consecutiveLowFps = 0;
    this.persistenceThreshold = 5; // Need 5 consecutive low readings before warning
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
   * Check if any metrics are below thresholds (with throttling and persistence)
   * 
   * Key principle: Don't warn on spikes. Require persistent evidence before
   * surfacing any performance warnings.
   */
  checkWarnings() {
    const now = performance.now();
    
    // Track consecutive low FPS for persistence checking
    if (this.metrics.fps < this.warningThreshold.fps && this.getAverageFPS() < this.warningThreshold.fps) {
      this.consecutiveLowFps++;
    } else {
      // Reset on good reading - single spikes don't matter
      this.consecutiveLowFps = Math.max(0, this.consecutiveLowFps - 1);
    }
    
    // Throttle warnings to prevent spam
    if (now - this.lastWarningTime < this.warningCooldown) {
      return;
    }
    
    const warnings = [];
    
    // Only warn about FPS if it's persistently low (not just spikes)
    // Require multiple consecutive low readings AND low average
    if (this.consecutiveLowFps >= this.persistenceThreshold && 
        this.metrics.fps < this.warningThreshold.fps && 
        this.getAverageFPS() < this.warningThreshold.fps) {
      const warningKey = 'fps';
      if (!this.warningHistory.has(warningKey) || now - this.warningHistory.get(warningKey) > this.warningCooldown) {
        warnings.push(`Persistent low FPS: ${this.metrics.fps} (avg: ${this.getAverageFPS()}, streak: ${this.consecutiveLowFps})`);
        this.warningHistory.set(warningKey, now);
      }
    }
    
    // Frame time warnings removed - FPS is the primary metric
    // Memory warning only if significantly over threshold (50% margin instead of 20%)
    if (this.metrics.memory > this.warningThreshold.memory * 1.5) {
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
    logger.log('[Performance Monitor]', {
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
   * Create a compact FPS counter for dev mode
   * Less intrusive than full debug overlay
   * 
   * IMPORTANT: This counter measures actual browser animation framerate
   * independently of the shader background renderer, so it works
   * even when the shader is paused (e.g., during timeline scroll).
   */
  createFpsCounter() {
    // Import performanceDetector to get FPS cap info
    import('./performanceDetector.js').then(module => {
      const performanceDetector = module.default;
      
      const counter = document.createElement('div');
      counter.id = 'fps-counter';
      counter.style.cssText = `
        position: fixed;
        bottom: 10px;
        left: 10px;
        background: rgba(0, 0, 0, 0.7);
        color: #0f0;
        font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
        font-size: 11px;
        padding: 4px 8px;
        border-radius: 4px;
        z-index: 999999;
        pointer-events: none;
        user-select: none;
        min-width: 60px;
        text-align: center;
      `;
      document.body.appendChild(counter);
      
      // Track FPS cap
      let currentCap = null;
      performanceDetector.onFpsCapChange((info) => {
        currentCap = info.cap;
      });
      
      // Independent FPS measurement using requestAnimationFrame
      // This measures actual browser animation framerate, not shader framerate
      let independentFrameCount = 0;
      let independentLastTime = performance.now();
      let independentFps = 60;
      let independentFpsHistory = [];
      const historyLength = 10;
      
      const measureFrame = () => {
        if (!document.getElementById('fps-counter')) return; // Stop if counter removed
        
        independentFrameCount++;
        const currentTime = performance.now();
        const elapsed = currentTime - independentLastTime;
        
        // Update FPS every second
        if (elapsed >= 1000) {
          independentFps = Math.round((independentFrameCount * 1000) / elapsed);
          independentFrameCount = 0;
          independentLastTime = currentTime;
          
          // Track history for average
          independentFpsHistory.push(independentFps);
          if (independentFpsHistory.length > historyLength) {
            independentFpsHistory.shift();
          }
          
          // Calculate average
          const avgFps = Math.round(independentFpsHistory.reduce((a, b) => a + b, 0) / independentFpsHistory.length);
          
          // Color code based on performance relative to cap
          // Adjust thresholds based on current cap for meaningful feedback
          let color = '#0f0'; // Green for good
          const effectiveCap = currentCap || 60;
          const goodThreshold = effectiveCap * 0.8; // 80% of cap is good
          const warnThreshold = effectiveCap * 0.5; // 50% of cap is warning
          
          if (independentFps < warnThreshold) {
            color = '#f00'; // Red for bad
          } else if (independentFps < goodThreshold) {
            color = '#ff0'; // Yellow for warning
          }
          
          counter.style.color = color;
          
          // Show FPS cap with color coding (orange for 30fps degraded mode)
          let capText = '';
          if (currentCap) {
            const capColor = currentCap === 30 ? '#f80' : '#0af';
            const capLabel = currentCap === 30 ? 'cap:30 (degraded)' : `cap:${currentCap}`;
            capText = ` <span style="color: ${capColor}; font-size: 9px;">${capLabel}</span>`;
          }
          counter.innerHTML = `${independentFps} FPS <span style="color: #888; font-size: 9px;">(avg: ${avgFps})</span>${capText}`;
        }
        
        requestAnimationFrame(measureFrame);
      };
      
      // Start independent measurement loop
      requestAnimationFrame(measureFrame);
    });
    
    return document.getElementById('fps-counter');
  }

  /**
   * Remove FPS counter
   */
  removeFpsCounter() {
    const counter = document.getElementById('fps-counter');
    if (counter) {
      counter.remove();
    }
    if (this.fpsCounterInterval) {
      clearInterval(this.fpsCounterInterval);
      this.fpsCounterInterval = null;
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

