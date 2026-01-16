/**
 * Performance Detection Utility
 * Detects device capabilities and returns appropriate performance tier
 * for optimizing WebGL/Three.js rendering
 * 
 * Key principle: Don't jump to conclusions based on spikes.
 * Initial detection provides a "preliminary" tier, which gets
 * confirmed or adjusted based on persistent runtime evidence.
 */

import logger from './logger.js';

class PerformanceDetector {
  constructor() {
    this.tier = null;
    this.confirmedTier = null; // Only set after persistent runtime validation
    this.runtimeValidated = false;
    
    // Runtime monitoring state
    this.fpsHistory = [];
    this.fpsHistoryMaxLength = 120; // 2 minutes of samples at 1/sec
    this.lowFpsStreak = 0;
    this.lowFpsStreakThreshold = 8; // Need 8 consecutive seconds of low FPS to confirm low-end
    this.degradationCallbacks = [];
    
    // Adaptive FPS capping state
    this.fpsCap = null; // null = no cap, otherwise 60 or 120
    this.fpsCapCallbacks = [];
    this.fpsCapEvaluationDelay = 5; // Wait 5 seconds before evaluating cap
    this.highFpsCount = 0; // Count of samples > 90fps
    this.maxFpsSeen = 0; // Track highest FPS seen
    this.fpsVariance = []; // Track FPS variance for stability detection
    
    // Independent FPS measurement (not affected by render throttling)
    this.independentFpsHistory = [];
    this.independentFrameCount = 0;
    this.independentLastTime = 0;
    this.independentMeasurementStarted = false;
    
    this.metrics = {
      isMobile: false,
      isLowEnd: false,
      hardwareConcurrency: navigator.hardwareConcurrency || 2,
      deviceMemory: navigator.deviceMemory || 4,
      connectionSpeed: this.getConnectionSpeed(),
      isAEMEmbedded: this.checkAEMEmbedded(),
      pixelRatio: window.devicePixelRatio || 1,
      screenSize: window.innerWidth * window.innerHeight,
      gpuTier: null,
    };
  }

  /**
   * Check if page is embedded in AEM
   */
  checkAEMEmbedded() {
    try {
      // Check if we're in an iframe
      if (window.self !== window.top) {
        return true;
      }
      // Check for AEM-specific indicators
      const url = window.location.href.toLowerCase();
      return url.includes('adobeaemcloud.com') || url.includes('aem');
    } catch (e) {
      // If we can't access window.top, we're probably in an iframe
      return true;
    }
  }

  /**
   * Get network connection speed
   */
  getConnectionSpeed() {
    if (navigator.connection) {
      const connection = navigator.connection;
      const effectiveType = connection.effectiveType;
      
      // Return speed tier: 'fast', 'medium', 'slow'
      if (effectiveType === '4g') return 'fast';
      if (effectiveType === '3g') return 'medium';
      return 'slow';
    }
    return 'fast'; // Assume fast if no connection API
  }

  /**
   * Detect if device is mobile
   */
  detectMobile() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    
    return isMobileUA || (isTouchDevice && isSmallScreen);
  }

  /**
   * Perform a quick GPU benchmark
   */
  async benchmarkGPU() {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        resolve('low');
        return;
      }

      // Get GPU info
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      let gpuInfo = 'unknown';
      
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        gpuInfo = renderer.toLowerCase();
        
        // Check for known low-end GPUs
        const lowEndIndicators = [
          'intel hd 3000',
          'intel hd 4000',
          'intel hd graphics',
          'powervr',
          'mali-400',
          'mali-450',
          'adreno 3',
          'adreno 4',
          'swiftshader',
        ];
        
        const isLowEnd = lowEndIndicators.some(indicator => gpuInfo.includes(indicator));
        
        if (isLowEnd) {
          resolve('low');
          return;
        }
        
        // Check for high-end GPUs
        const highEndIndicators = [
          'nvidia',
          'geforce',
          'rtx',
          'gtx',
          'radeon',
          'adreno 6',
          'adreno 7',
          'apple gpu',
          'm1',
          'm2',
        ];
        
        const isHighEnd = highEndIndicators.some(indicator => gpuInfo.includes(indicator));
        
        if (isHighEnd) {
          resolve('high');
          return;
        }
      }

      // Run a simple performance test
      const start = performance.now();
      const vertices = new Float32Array(10000 * 3);
      for (let i = 0; i < vertices.length; i++) {
        vertices[i] = Math.random();
      }
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
      gl.finish();
      const end = performance.now();
      
      const duration = end - start;
      
      // Cleanup
      gl.deleteBuffer(buffer);
      canvas.remove();
      
      // Categorize based on performance
      if (duration < 5) {
        resolve('high');
      } else if (duration < 15) {
        resolve('medium');
      } else {
        resolve('low');
      }
    });
  }

  /**
   * Detect overall device performance tier
   */
  async detect() {
    if (this.tier) return this.tier;

    this.metrics.isMobile = this.detectMobile();
    
    // Run GPU benchmark
    this.metrics.gpuTier = await this.benchmarkGPU();
    
    // Calculate performance score
    let score = 100;
    
    // Mobile penalty
    if (this.metrics.isMobile) {
      score -= 30;
    }
    
    // Screen size factor
    if (this.metrics.screenSize < 800 * 600) {
      score -= 10;
    } else if (this.metrics.screenSize > 1920 * 1080) {
      score -= 15; // 4K screens need more performance
    }
    
    // Hardware concurrency
    if (this.metrics.hardwareConcurrency <= 2) {
      score -= 20;
    } else if (this.metrics.hardwareConcurrency >= 8) {
      score += 10;
    }
    
    // Device memory
    if (this.metrics.deviceMemory <= 2) {
      score -= 30;
    } else if (this.metrics.deviceMemory >= 8) {
      score += 10;
    }
    
    // GPU tier
    if (this.metrics.gpuTier === 'low') {
      score -= 30;
    } else if (this.metrics.gpuTier === 'high') {
      score += 20;
    }
    
    // Connection speed
    if (this.metrics.connectionSpeed === 'slow') {
      score -= 20;
    }
    
    // AEM embedding penalty (additional DOM overhead)
    if (this.metrics.isAEMEmbedded) {
      score -= 15;
    }
    
    // Pixel ratio penalty (higher pixel ratios = more pixels to render)
    if (this.metrics.pixelRatio > 2) {
      score -= 10;
    }
    
    // Determine tier
    if (score >= 70) {
      this.tier = 'high';
    } else if (score >= 40) {
      this.tier = 'medium';
    } else {
      this.tier = 'low';
    }
    
    logger.log('[Performance Detector] Metrics:', this.metrics);
    logger.log('[Performance Detector] Score:', score);
    logger.log('[Performance Detector] Tier:', this.tier);
    
    // Start independent FPS measurement for accurate cap detection
    this.startIndependentFpsMeasurement();
    
    return this.tier;
  }

  /**
   * Get performance settings based on detected tier
   * 
   * Important: All tiers start at 60fps target. The visual animation speed
   * of shaders is controlled by fixed time increments in animate(), not by
   * render FPS. This ensures consistent visual appearance across all devices.
   * 
   * Only after persistent runtime evidence of poor performance (via confirmedTier)
   * will we reduce to 30fps for truly struggling devices.
   */
  getSettings() {
    // Use confirmed tier if available, otherwise preliminary tier
    const effectiveTier = this.confirmedTier || this.tier || 'medium';
    
    const settings = {
      high: {
        particleCount: 100,
        pixelRatio: Math.min(window.devicePixelRatio, 1.5),
        antialias: false,
        shadowsEnabled: false,
        shaderQuality: 'high',
        globeQuality: 'high',
        mouseParticles: true,
        targetFPS: 60, // Always 60fps max - visual speed is independent
        enablePostProcessing: false,
        maxLights: 3,
      },
      medium: {
        particleCount: 50,
        pixelRatio: Math.min(window.devicePixelRatio, 1.25),
        antialias: false,
        shadowsEnabled: false,
        shaderQuality: 'medium',
        globeQuality: 'medium',
        mouseParticles: !this.metrics.isMobile,
        targetFPS: 60, // Start at 60fps - let runtime monitoring downgrade if needed
        enablePostProcessing: false,
        maxLights: 2,
      },
      low: {
        particleCount: 30,
        pixelRatio: 1,
        antialias: false,
        shadowsEnabled: false,
        shaderQuality: 'low',
        globeQuality: 'low',
        mouseParticles: false,
        // Only use 30fps if runtime-confirmed as truly low-end
        targetFPS: this.runtimeValidated && this.confirmedTier === 'low' ? 30 : 60,
        enablePostProcessing: false,
        maxLights: 1,
      },
    };
    
    return settings[effectiveTier];
  }
  
  /**
   * Start independent FPS measurement using requestAnimationFrame
   * This measures actual browser refresh rate, not renderer FPS
   */
  startIndependentFpsMeasurement() {
    if (this.independentMeasurementStarted) return;
    this.independentMeasurementStarted = true;
    this.independentLastTime = performance.now();
    this.independentFrameCount = 0;
    
    const measureFrame = () => {
      if (!this.independentMeasurementStarted) return;
      
      this.independentFrameCount++;
      const currentTime = performance.now();
      const elapsed = currentTime - this.independentLastTime;
      
      // Record FPS every second
      if (elapsed >= 1000) {
        const fps = Math.round((this.independentFrameCount * 1000) / elapsed);
        this.independentFrameCount = 0;
        this.independentLastTime = currentTime;
        
        // Record this as the true FPS sample
        this.recordIndependentFpsSample(fps);
      }
      
      requestAnimationFrame(measureFrame);
    };
    
    requestAnimationFrame(measureFrame);
    logger.log('[Performance Detector] Started independent FPS measurement');
  }
  
  /**
   * Record independent FPS sample (actual browser refresh rate)
   */
  recordIndependentFpsSample(fps) {
    this.independentFpsHistory.push({
      fps,
      timestamp: Date.now()
    });
    
    // Keep history bounded
    if (this.independentFpsHistory.length > 30) {
      this.independentFpsHistory.shift();
    }
    
    // Track max FPS seen from independent measurement
    if (fps > this.maxFpsSeen) {
      this.maxFpsSeen = fps;
      logger.log(`[Performance Detector] New max FPS seen: ${fps}`);
      
      // If we see FPS > 100 but cap is 60, upgrade to 120
      if (fps > 100 && this.fpsCap === 60) {
        logger.log('[Performance Detector] Upgrading cap: saw FPS > 100, upgrading from 60 to 120');
        this.setFpsCap(120, 'upgrade_high_fps_detected');
      }
    }
    
    // Track if this sample is above 90fps
    if (fps > 90) {
      this.highFpsCount++;
    }
    
    // Evaluate FPS cap using independent samples
    if (this.independentFpsHistory.length >= this.fpsCapEvaluationDelay && !this.fpsCap) {
      this.evaluateFpsCapFromIndependent();
    }
  }
  
  /**
   * Evaluate FPS cap using independent measurements (actual browser FPS)
   */
  evaluateFpsCapFromIndependent() {
    if (this.fpsCap) return; // Already set
    if (this.independentFpsHistory.length < this.fpsCapEvaluationDelay) return;
    
    const recentSamples = this.independentFpsHistory.slice(-10).map(s => s.fps);
    const avgFps = recentSamples.reduce((a, b) => a + b, 0) / recentSamples.length;
    const minFps = Math.min(...recentSamples);
    const maxFps = Math.max(...recentSamples);
    
    logger.log('[Performance Detector] Independent FPS Cap Evaluation:', {
      avgFps: Math.round(avgFps),
      minFps,
      maxFps,
      maxEverSeen: this.maxFpsSeen,
      sampleCount: this.independentFpsHistory.length
    });
    
    // Simple logic: if we've seen FPS > 100, cap at 120; otherwise 60
    if (this.maxFpsSeen > 100 || avgFps > 90) {
      this.setFpsCap(120, 'high_refresh_detected');
    } else {
      this.setFpsCap(60, 'standard_refresh');
    }
  }
  
  /**
   * Record runtime FPS sample for persistent performance validation
   * Call this once per second from the render loop
   * NOTE: This is for degradation detection, not FPS cap detection
   */
  recordFpsSample(fps) {
    this.fpsHistory.push({
      fps,
      timestamp: Date.now()
    });
    
    // Keep history bounded
    if (this.fpsHistory.length > this.fpsHistoryMaxLength) {
      this.fpsHistory.shift();
    }
    
    // Check for persistent poor performance (degradation)
    this.evaluatePerformance(fps);
  }
  
  
  /**
   * Set FPS cap and notify all listeners
   */
  setFpsCap(cap, reason) {
    if (this.fpsCap === cap) return; // No change
    
    logger.log(`[Performance Detector] Setting FPS cap to ${cap}fps (reason: ${reason})`);
    this.fpsCap = cap;
    
    // Notify all listeners
    this.fpsCapCallbacks.forEach(callback => {
      try {
        callback({
          cap,
          reason,
          avgFps: this.getAverageFps(10),
          maxFpsSeen: this.maxFpsSeen
        });
      } catch (e) {
        logger.warn('[Performance Detector] FPS cap callback error:', e);
      }
    });
  }
  
  /**
   * Register callback for FPS cap changes
   */
  onFpsCapChange(callback) {
    if (typeof callback === 'function') {
      this.fpsCapCallbacks.push(callback);
      
      // If cap already set, notify immediately
      if (this.fpsCap) {
        callback({
          cap: this.fpsCap,
          reason: 'initial',
          avgFps: this.getAverageFps(10),
          maxFpsSeen: this.maxFpsSeen
        });
      }
    }
  }
  
  /**
   * Get current FPS cap (or null if none)
   */
  getFpsCap() {
    return this.fpsCap;
  }
  
  /**
   * Evaluate if we have persistent evidence of poor performance
   * Only triggers degradation after consistent, sustained poor FPS
   */
  evaluatePerformance(currentFps) {
    // Skip evaluation during initial warmup (first 3 seconds)
    if (this.fpsHistory.length < 3) return;
    
    const targetFps = 60;
    const lowFpsThreshold = targetFps * 0.7; // Below 42fps is considered struggling
    const veryLowFpsThreshold = targetFps * 0.5; // Below 30fps is critically low
    
    if (currentFps < lowFpsThreshold) {
      this.lowFpsStreak++;
    } else {
      // Reset streak on good frame - we don't want spikes to affect us
      this.lowFpsStreak = Math.max(0, this.lowFpsStreak - 2); // Decay slowly
    }
    
    // Only confirm degradation after persistent poor performance
    if (this.lowFpsStreak >= this.lowFpsStreakThreshold && !this.runtimeValidated) {
      this.confirmLowEndDevice();
    }
    
    // If we see very low FPS for extended period, it's definitely struggling
    if (currentFps < veryLowFpsThreshold && this.lowFpsStreak >= 5) {
      this.confirmLowEndDevice();
    }
  }
  
  /**
   * Confirm device as low-end after persistent evidence
   * This triggers the 30fps cap for the shader background
   */
  confirmLowEndDevice() {
    if (this.runtimeValidated && this.confirmedTier === 'low') return; // Already confirmed
    
    logger.log('[Performance Detector] Runtime validation: Device confirmed as low-end after persistent poor FPS');
    logger.log(`[Performance Detector] FPS streak: ${this.lowFpsStreak}, History samples: ${this.fpsHistory.length}`);
    
    this.runtimeValidated = true;
    this.confirmedTier = 'low';
    
    // Notify any listeners that degradation should occur
    this.degradationCallbacks.forEach(callback => {
      try {
        callback({
          tier: 'low',
          targetFPS: 30,
          reason: 'persistent_low_fps'
        });
      } catch (e) {
        logger.warn('[Performance Detector] Degradation callback error:', e);
      }
    });
  }
  
  /**
   * Register a callback to be notified when performance degradation is confirmed
   */
  onDegradation(callback) {
    if (typeof callback === 'function') {
      this.degradationCallbacks.push(callback);
    }
  }
  
  /**
   * Get the average FPS from recent history
   */
  getAverageFps(sampleCount = 10) {
    if (this.fpsHistory.length === 0) return 60;
    
    const samples = this.fpsHistory.slice(-sampleCount);
    const sum = samples.reduce((acc, s) => acc + s.fps, 0);
    return Math.round(sum / samples.length);
  }
  
  /**
   * Check if device has been runtime-validated as low-end
   */
  isConfirmedLowEnd() {
    return this.runtimeValidated && this.confirmedTier === 'low';
  }

  /**
   * Check if device is low-end
   */
  isLowEnd() {
    return this.tier === 'low';
  }

  /**
   * Check if device is mobile
   */
  isMobile() {
    return this.metrics.isMobile;
  }

  /**
   * Check if embedded in AEM
   */
  isAEMEmbedded() {
    return this.metrics.isAEMEmbedded;
  }
}

// Create singleton instance
const performanceDetector = new PerformanceDetector();

export default performanceDetector;

