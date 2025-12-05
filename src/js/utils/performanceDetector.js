/**
 * Performance Detection Utility
 * Detects device capabilities and returns appropriate performance tier
 * for optimizing WebGL/Three.js rendering
 */

class PerformanceDetector {
  constructor() {
    this.tier = null;
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
    
    console.log('[Performance Detector] Metrics:', this.metrics);
    console.log('[Performance Detector] Score:', score);
    console.log('[Performance Detector] Tier:', this.tier);
    
    return this.tier;
  }

  /**
   * Get performance settings based on detected tier
   */
  getSettings() {
    const tier = this.tier || 'medium';
    
    const settings = {
      high: {
        particleCount: 100, // Reduced from 150 to save ~50MB
        pixelRatio: Math.min(window.devicePixelRatio, 1.5), // Cap lower to reduce render target size
        antialias: false,
        shadowsEnabled: false,
        shaderQuality: 'high',
        globeQuality: 'high',
        mouseParticles: true,
        targetFPS: 60,
        enablePostProcessing: false,
        maxLights: 3,
      },
      medium: {
        particleCount: 50, // Reduced from 80 to save ~30MB
        pixelRatio: Math.min(window.devicePixelRatio, 1.25), // Cap even lower
        antialias: false,
        shadowsEnabled: false,
        shaderQuality: 'medium',
        globeQuality: 'medium',
        mouseParticles: !this.metrics.isMobile,
        targetFPS: 45,
        enablePostProcessing: false,
        maxLights: 2,
      },
      low: {
        particleCount: 30, // Reduced from 40 to save ~10MB
        pixelRatio: 1, // Always 1x on low-end
        antialias: false,
        shadowsEnabled: false,
        shaderQuality: 'low',
        globeQuality: 'low',
        mouseParticles: false,
        targetFPS: 30,
        enablePostProcessing: false,
        maxLights: 1,
      },
    };
    
    return settings[tier];
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

