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
    this.highFpsStreak = 0; // Track good performance for potential upgrades
    this.lowFpsStreakThreshold = 6; // Need 6 consecutive seconds of critically low FPS to confirm low-end
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
    
    // Scroll state tracking for performance optimization
    this.isScrolling = false;
    this.scrollTimeout = null;
    this.scrollThrottleMs = 150; // How long to wait after scroll ends
    this.scrollCallbacks = [];
    this.lastScrollTime = 0;
    
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
    
    // Set up scroll monitoring
    this.setupScrollMonitoring();
  }
  
  /**
   * Monitor scroll state for performance optimization
   * Fires callbacks when scroll starts/stops
   */
  setupScrollMonitoring() {
    const handleScroll = () => {
      const now = performance.now();
      const wasScrolling = this.isScrolling;
      this.isScrolling = true;
      this.lastScrollTime = now;
      
      // Notify listeners that scroll started
      if (!wasScrolling) {
        this.notifyScrollState(true);
      }
      
      // Clear existing timeout
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }
      
      // Set timeout to detect scroll end
      this.scrollTimeout = setTimeout(() => {
        this.isScrolling = false;
        this.notifyScrollState(false);
      }, this.scrollThrottleMs);
    };
    
    // Listen on both window and potential mobile scroll container
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Also listen for touch events on mobile
    if ('ontouchstart' in window) {
      window.addEventListener('touchmove', handleScroll, { passive: true });
    }
  }
  
  /**
   * Notify all scroll state listeners
   */
  notifyScrollState(isScrolling) {
    this.scrollCallbacks.forEach(callback => {
      try {
        callback({ isScrolling, timestamp: performance.now() });
      } catch (e) {
        logger.warn('[Performance Detector] Scroll callback error:', e);
      }
    });
  }
  
  /**
   * Register callback for scroll state changes
   * @param {Function} callback - Called with { isScrolling: boolean, timestamp: number }
   */
  onScrollStateChange(callback) {
    if (typeof callback === 'function') {
      this.scrollCallbacks.push(callback);
    }
  }
  
  /**
   * Check if currently scrolling
   */
  getIsScrolling() {
    return this.isScrolling;
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
    const isMobile = this.metrics.isMobile;
    
    const settings = {
      high: {
        // MOBILE: Reduced particle counts for better scroll performance
        particleCount: isMobile ? 25 : 100, // Was 40, now 25 for mobile
        pixelRatio: Math.min(window.devicePixelRatio, isMobile ? 1.0 : 1.5), // Was 1.25, now 1.0 for mobile
        antialias: false,
        shadowsEnabled: false,
        shaderQuality: isMobile ? 'medium' : 'high',
        globeQuality: isMobile ? 'medium' : 'high',
        mouseParticles: !isMobile,
        targetFPS: 60,
        enablePostProcessing: false,
        maxLights: isMobile ? 2 : 3,
        // Mobile-specific settings - more aggressive
        timelineShaderDotCount: isMobile ? { x: 36, y: 20 } : { x: 98, y: 54 }, // Was 48x27, now 36x20
        skipParticleUpdatesOnScroll: isMobile,
        scrollThrottleFPS: isMobile ? 24 : 60, // Was 30, now 24 for mobile
      },
      medium: {
        particleCount: isMobile ? 32 : 64,
        pixelRatio: Math.min(window.devicePixelRatio, isMobile ? 0.875 : 1.25), // Was 1.0, now 0.875 for mobile
        antialias: false,
        shadowsEnabled: false,
        shaderQuality: 'medium',
        globeQuality: 'medium',
        mouseParticles: false,
        targetFPS: 60,
        enablePostProcessing: false,
        maxLights: 2,
        // Mobile-specific settings - more aggressive
        timelineShaderDotCount: isMobile ? { x: 24, y: 14 } : { x: 72, y: 40 }, // Was 36x20, now 24x14
        skipParticleUpdatesOnScroll: isMobile,
        scrollThrottleFPS: isMobile ? 20 : 45, // Was 30, now 20 for mobile
      },
      low: {
        particleCount: isMobile ? 12 : 30, // Was 15, now 12 for mobile
        pixelRatio: isMobile ? 0.5 : 1, // Was 1, now 0.5 for mobile
        antialias: false,
        shadowsEnabled: false,
        shaderQuality: 'low',
        globeQuality: 'low',
        mouseParticles: false,
        // Only use 40fps if runtime-confirmed as truly low-end
        targetFPS: this.runtimeValidated && this.confirmedTier === 'low' ? 40 : 60,
        enablePostProcessing: false,
        maxLights: 1,
        // Mobile-specific settings - most aggressive
        timelineShaderDotCount: isMobile ? { x: 18, y: 10 } : { x: 48, y: 27 }, // Was 24x14, now 18x10
        skipParticleUpdatesOnScroll: true,
        scrollThrottleFPS: isMobile ? 15 : 30, // Was 30, now 15 for mobile
      },
    };
    
    return settings[effectiveTier];
  }
  
  /**
   * Get scroll-optimized settings
   * Returns reduced-quality settings to use during active scrolling
   */
  getScrollSettings() {
    const baseSettings = this.getSettings();
    const isMobile = this.metrics.isMobile;
    
    return {
      ...baseSettings,
      // During scroll, use more aggressive throttling
      targetFPS: isMobile ? 30 : 45,
      skipParticleTwinkle: true,
      skipParticleMovement: isMobile,
      reduceShaderComplexity: isMobile,
    };
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
   * 
   * IMPORTANT: Be VERY conservative about the 30fps cap.
   * Only apply it if the device is truly struggling (avg < 30fps).
   * Most devices should get 60fps, high-refresh devices get 120fps.
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
    
    // Three-tier FPS cap logic:
    // - 120fps: High refresh rate displays (seen > 100fps or averaging > 80fps)
    // - 60fps: Standard devices (averaging >= 30fps or ever seen 50+ fps)
    // - 30fps: ONLY for devices that can't even maintain 30fps average
    //          This is an absolute last resort
    
    if (this.maxFpsSeen > 100 || avgFps > 80) {
      // High refresh rate display detected
      this.setFpsCap(120, 'high_refresh_detected');
    } else if (avgFps >= 40 || this.maxFpsSeen >= 50) {
      // Device can maintain at least 30fps average, or has shown 50+ capability
      // Give it the full 60fps cap - it can handle it
      this.setFpsCap(60, 'standard_refresh');
    } else if (avgFps >= 15) {
      // Device is REALLY struggling - can't even average 30fps
      // AND has never shown capability above 50fps
      // Only now apply the 30fps cap as a last resort
      logger.log(`[Performance Detector] Device truly struggling (avg: ${Math.round(avgFps)}fps, maxSeen: ${this.maxFpsSeen}) - capping at 30fps`);
      this.setFpsCap(40, 'low_performance_detected');
    } else {
      // Extremely low FPS (< 15) - cap at 30, but this device may not work well
      logger.log(`[Performance Detector] WARNING: Extremely low FPS (avg: ${Math.round(avgFps)}fps) - experience may be poor`);
      this.setFpsCap(30, 'very_low_performance');
    }
  }
  
  /**
   * Re-evaluate FPS cap based on current performance
   * Can both downgrade AND upgrade based on sustained performance
   * 
   * Uses ABSOLUTE thresholds and requires VERIFIED averages before changing caps.
   */
  reevaluateFpsCap() {
    if (!this.fpsCap) return false;
    
    // Get average from INDEPENDENT measurement (true FPS, not affected by throttling)
    const avgFpsIndependent = this.getAverageFpsFromIndependent(15);
    const avgFpsRenderer = this.getAverageFps(15);
    
    // Use independent FPS as the primary metric (it's not affected by our own throttling)
    const avgFps = avgFpsIndependent;
    
    logger.log(`[Performance Detector] Re-evaluating FPS cap: independent avg ${avgFpsIndependent}fps, renderer avg ${avgFpsRenderer}fps, current cap ${this.fpsCap}fps, maxSeen ${this.maxFpsSeen}fps`);
    
    // UPGRADE: If at 30fps cap but averaging >= 45fps, upgrade to 60fps
    // Also upgrade if we've ever seen 60+ FPS (device is capable)
    if (this.fpsCap === 30) {
      if (avgFps >= 45 || this.maxFpsSeen >= 60) {
        logger.log(`[Performance Detector] Upgrading FPS cap: avg ${avgFps}fps, maxSeen ${this.maxFpsSeen}fps with 30fps cap -> 60fps cap`);
        this.setFpsCap(60, 'performance_improved');
        // Reset degradation state since performance has improved
        this.isDegraded = false;
        this.runtimeValidated = false; // Allow re-validation
        this.confirmedTier = null;
        return true;
      }
    }
    
    // DOWNGRADE to 30fps: Only if averaging BELOW 30fps persistently
    // This is the LAST RESORT - device is truly struggling
    if (this.fpsCap === 60 && avgFps < 30 && this.maxFpsSeen < 50) {
      logger.log(`[Performance Detector] Downgrading FPS cap: avg ${avgFps}fps, maxSeen ${this.maxFpsSeen}fps with 60fps cap -> 30fps cap`);
      this.setFpsCap(40, 'runtime_degradation');
      return true;
    }
    
    // DOWNGRADE 120 to 60: If averaging below 45fps with a 120fps cap
    if (this.fpsCap === 120 && avgFps < 45) {
      logger.log(`[Performance Detector] Downgrading FPS cap: avg ${avgFps}fps with 120fps cap -> 60fps cap`);
      this.setFpsCap(60, 'runtime_degradation');
      return true;
    }
    
    return false;
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
   * Evaluate if we have persistent evidence of poor or improved performance
   * Can trigger both degradation and upgrades based on sustained performance
   * 
   * IMPORTANT: Use ABSOLUTE thresholds, not percentages of cap.
   * A device averaging 50+ FPS should NEVER be capped at 30fps.
   */
  evaluatePerformance(currentFps) {
    // Skip evaluation during initial warmup (first 5 seconds)
    if (this.fpsHistory.length < 5) return;
    
    // Use ABSOLUTE thresholds - these are fixed regardless of cap
    // 30fps is the minimum for "usable" experience
    // Below 25fps is genuinely struggling
    const criticallyLowThreshold = 25; // Below this is definitely struggling
    const lowFpsThreshold = 35; // Below this might need 30fps cap
    const goodFpsThreshold = 50; // Above this is definitely good
    
    // Track streaks based on absolute thresholds
    if (currentFps < criticallyLowThreshold) {
      this.lowFpsStreak++;
      this.highFpsStreak = 0;
    } else if (currentFps >= goodFpsThreshold) {
      // Good performance - reset low streak aggressively, build high streak
      this.lowFpsStreak = Math.max(0, this.lowFpsStreak - 3);
      this.highFpsStreak = (this.highFpsStreak || 0) + 1;
    } else {
      // Middle ground (25-50fps) - slowly decay both streaks
      this.lowFpsStreak = Math.max(0, this.lowFpsStreak - 1);
      this.highFpsStreak = Math.max(0, (this.highFpsStreak || 0) - 1);
    }
    
    // Check if we should UPGRADE FPS cap (every 8 seconds of good FPS)
    if (this.fpsCap === 40 && this.highFpsStreak >= 8) {
      // Before upgrading, verify the AVERAGE is actually good
      const avgFps = this.getAverageFpsFromIndependent(10);
      if (avgFps >= 45) {
        logger.log(`[Performance Detector] Upgrading from 30fps cap - avg: ${avgFps}fps, highStreak: ${this.highFpsStreak}`);
        this.reevaluateFpsCap();
        this.highFpsStreak = 0; // Reset after evaluation
      }
    }
    
    // Check if we should downgrade FPS cap - be VERY conservative about this
    // Only downgrade after 10+ seconds of critically low FPS
    if (this.lowFpsStreak >= 10 && this.fpsCap !== 30) {
      // Verify the AVERAGE is actually low before downgrading
      const avgFps = this.getAverageFpsFromIndependent(15);
      if (avgFps < 35) {
        logger.log(`[Performance Detector] Downgrade evaluation - avg: ${avgFps}fps, lowStreak: ${this.lowFpsStreak}`);
        this.reevaluateFpsCap();
        this.lowFpsStreak = 0; // Reset after evaluation
      } else {
        // Average is fine, the low FPS samples were likely just spikes
        logger.log(`[Performance Detector] Ignoring low FPS streak - avg FPS is ${avgFps}, which is acceptable`);
        this.lowFpsStreak = 0; // Reset the streak since average is fine
      }
    }
    
    // Only confirm as truly low-end after VERY persistent poor performance
    // AND verify the average is actually below threshold
    if (this.lowFpsStreak >= this.lowFpsStreakThreshold && !this.runtimeValidated) {
      const avgFps = this.getAverageFpsFromIndependent(15);
      if (avgFps < 35) {
        this.confirmLowEndDevice();
      } else {
        // Average is acceptable - don't confirm as low-end
        logger.log(`[Performance Detector] Not confirming low-end - avg FPS is ${avgFps}, which is acceptable`);
        this.lowFpsStreak = Math.floor(this.lowFpsStreak / 2); // Reduce but don't fully reset
      }
    }
  }
  
  /**
   * Confirm device as low-end after persistent evidence
   * This triggers the 30fps cap for the shader background
   * 
   * IMPORTANT: This now verifies the AVERAGE FPS is actually low
   * before applying the 30fps cap. High-FPS devices should never
   * be capped at 30fps even if they have occasional dips.
   */
  confirmLowEndDevice() {
    if (this.runtimeValidated && this.confirmedTier === 'low') return; // Already confirmed
    
    // CRITICAL: Check the ACTUAL average FPS before confirming as low-end
    // A device averaging 45+ FPS is NOT low-end, even with occasional dips
    const avgFpsIndependent = this.getAverageFpsFromIndependent(15);
    const avgFpsRenderer = this.getAverageFps(15);
    
    // Use the higher of the two averages (independent measurement is more accurate)
    const bestAvgFps = Math.max(avgFpsIndependent, avgFpsRenderer);
    
    logger.log(`[Performance Detector] Low-end confirmation check - independent avg: ${avgFpsIndependent}fps, renderer avg: ${avgFpsRenderer}fps, maxEverSeen: ${this.maxFpsSeen}`);
    
    // If the device is averaging 40+ FPS or has ever shown 60+ FPS capability,
    // it's NOT a low-end device - don't apply the 30fps cap
    if (bestAvgFps >= 40 || this.maxFpsSeen >= 60) {
      logger.log(`[Performance Detector] NOT confirming low-end - bestAvg: ${bestAvgFps}fps, maxSeen: ${this.maxFpsSeen}fps is good enough`);
      // Reset the low FPS streak since this was a false positive
      this.lowFpsStreak = 0;
      return;
    }
    
    logger.log('[Performance Detector] Runtime validation: Device confirmed as low-end after persistent poor FPS');
    logger.log(`[Performance Detector] FPS streak: ${this.lowFpsStreak}, History samples: ${this.fpsHistory.length}, Avg FPS: ${bestAvgFps}`);
    
    this.runtimeValidated = true;
    this.confirmedTier = 'low';
    
    // Set FPS cap to 40 for consistent performance
    if (this.fpsCap !== 40) {
      this.setFpsCap(40, 'confirmed_low_end_device');
    }
    
    // Notify any listeners that degradation should occur
    this.degradationCallbacks.forEach(callback => {
      try {
        callback({
          tier: 'low',
          targetFPS: 40,
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
   * Get the average FPS from recent history (renderer-reported FPS)
   */
  getAverageFps(sampleCount = 10) {
    if (this.fpsHistory.length === 0) return 60;
    
    const samples = this.fpsHistory.slice(-sampleCount);
    const sum = samples.reduce((acc, s) => acc + s.fps, 0);
    return Math.round(sum / samples.length);
  }
  
  /**
   * Get the average FPS from independent measurement history
   * This is the TRUE browser FPS, not affected by renderer throttling
   */
  getAverageFpsFromIndependent(sampleCount = 10) {
    if (this.independentFpsHistory.length === 0) return 60;
    
    const samples = this.independentFpsHistory.slice(-sampleCount);
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

