/**
 * AEM Mode Detector
 * Detects if the page is running in AEM Edit/Author mode
 * and provides appropriate fallback settings
 */

import logger from './logger.js';

class AEMModeDetector {
  constructor() {
    this.isAuthorMode = false;
    this.isEditMode = false;
    this.isPreviewMode = false;
    this.isPublishMode = true; // Default to publish
    this.detected = false;
  }

  /**
   * Check if we're in a development environment
   */
  isDevelopmentEnvironment() {
    const url = window.location.href;
    const hostname = window.location.hostname;
    
    // Whitelist development environments
    const devPatterns = [
      'localhost',
      '127.0.0.1',
      '0.0.0.0',
      '.local',
      'dev.',
      'test.',
      'staging.',
    ];
    
    // Check for common dev ports
    const port = window.location.port;
    const devPorts = ['3000', '4200', '5173', '8080', '8000', '9000'];
    
    // If on dev hostname or port, it's development
    if (devPatterns.some(pattern => hostname.includes(pattern)) || devPorts.includes(port)) {
      return true;
    }
    
    return false;
  }

  /**
   * Detect AEM mode
   */
  detect() {
    if (this.detected) return this.getMode();

    // CRITICAL: Skip detection entirely if in development environment
    if (this.isDevelopmentEnvironment()) {
      logger.log('[AEM Mode Detector] Development environment detected - skipping AEM detection');
      this.isPublishMode = true;
      this.isAuthorMode = false;
      this.isEditMode = false;
      this.isPreviewMode = false;
      this.detected = true;
      return 'publish';
    }

    const url = window.location.href;
    const pathname = window.location.pathname;
    const hostname = window.location.hostname;
    
    // CRITICAL: Check for wcmmode=disabled - this means "show as published"
    if (url.includes('wcmmode=disabled')) {
      logger.log('[AEM Mode Detector] wcmmode=disabled detected - using publish mode');
      this.isPublishMode = true;
      this.isAuthorMode = false;
      this.isEditMode = false;
      this.isPreviewMode = false;
      this.detected = true;
      return 'publish';
    }
    
    // Additional safety: Must be on an AEM-related domain
    const isAEMDomain = 
      hostname.includes('adobeaemcloud.com') ||
      hostname.includes('aem') ||
      hostname.includes('author') ||
      hostname.includes('publish');
    
    // Method 1: Check for AEM-specific URL patterns
    // STRICT: Only trigger fallback for actual EDIT mode, not preview
    const isInEditorInterface = 
      url.includes('/editor.html/') ||
      pathname.includes('/editor.html/') ||
      url.includes('/cf#/');
    
    const isInEditWCMMode = 
      url.includes('wcmmode=edit') ||
      url.includes('wcmmode=design');
    
    const isInPreviewWCMMode = url.includes('wcmmode=preview');
    
    // Only set author mode if in actual editor or edit wcmmode
    if ((isInEditorInterface || isInEditWCMMode) && (isAEMDomain || pathname.includes('/content/'))) {
      this.isAuthorMode = true;
      this.isPublishMode = false;
      this.isEditMode = true;
      logger.log('[AEM Mode Detector] Edit mode detected via URL');
    }
    
    // Preview mode is treated as limited mode, not fallback
    if (isInPreviewWCMMode && (isAEMDomain || pathname.includes('/content/'))) {
      this.isAuthorMode = true;
      this.isPublishMode = false;
      this.isPreviewMode = true;
      logger.log('[AEM Mode Detector] Preview mode detected via URL');
    }

    // Method 2: Check for AEM Granite namespace (author environment)
    // Only trigger EDIT mode if we have Granite + explicit edit indicators
    if (typeof window.Granite !== 'undefined' && isAEMDomain) {
      // Granite alone doesn't mean edit mode - could be preview/publish
      // Only mark as author mode, not edit mode
      if (!this.isEditMode && !this.isPreviewMode) {
        this.isAuthorMode = true;
        this.isPublishMode = false;
        // Keep as author but not edit (limited mode, not fallback)
        logger.log('[AEM Mode Detector] Granite namespace detected (author environment)');
      }
    }

    // Method 3: Check for AEM authoring UI elements
    // These specifically indicate EDIT mode
    const hasEditUIElements = 
      document.querySelector('.aem-AuthorLayer-Edit') ||
      document.body.classList.contains('aem-AuthorLayer-Edit');
    
    const hasAuthorUIElements =
      document.querySelector('.granite-author-layer');
    
    if (hasEditUIElements && (isAEMDomain || isInEditorInterface)) {
      this.isAuthorMode = true;
      this.isEditMode = true;
      this.isPublishMode = false;
      logger.log('[AEM Mode Detector] AEM Edit UI elements detected');
    } else if (hasAuthorUIElements && isAEMDomain && !this.isEditMode) {
      // Has author UI but not specifically edit mode
      this.isAuthorMode = true;
      this.isPublishMode = false;
      logger.log('[AEM Mode Detector] AEM Author UI detected (not edit mode)');
    }

    // Method 4: Check for wcmmode cookie
    // Only if on AEM domain or have AEM URL patterns
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'wcmmode' && (isAEMDomain || isInEditorInterface)) {
        // Cookie confirms wcmmode
        if (value === 'disabled') {
          // Explicitly disabled - treat as publish
          this.isPublishMode = true;
          this.isAuthorMode = false;
          this.isEditMode = false;
          this.isPreviewMode = false;
          logger.log('[AEM Mode Detector] wcmmode=disabled cookie - using publish mode');
          break;
        } else if (value === 'edit' || value === 'design') {
          this.isAuthorMode = true;
          this.isEditMode = true;
          this.isPublishMode = false;
          logger.log('[AEM Mode Detector] wcmmode=edit/design cookie detected');
        } else if (value === 'preview') {
          this.isAuthorMode = true;
          this.isPreviewMode = true;
          this.isPublishMode = false;
          logger.log('[AEM Mode Detector] wcmmode=preview cookie detected');
        }
        break;
      }
    }

    // Method 5: Check for iframe embedding in AEM
    // Only check if we have strong AEM indicators AND in editor interface
    try {
      if (window.self !== window.top && !this.isEditMode) {
        const parentUrl = document.referrer;
        // Require explicit AEM EDITOR patterns in parent URL (not just any AEM)
        const hasAEMEditorParent = 
          parentUrl.includes('/editor.html/') ||
          (parentUrl.includes('adobeaemcloud.com') && parentUrl.includes('/editor.html/'));
        
        if (hasAEMEditorParent) {
          this.isAuthorMode = true;
          this.isEditMode = true;
          this.isPublishMode = false;
          logger.log('[AEM Mode Detector] AEM Editor iframe detected');
        }
      }
    } catch (e) {
      // Cross-origin iframe - only assume EDIT mode if already detected
      // Don't assume edit mode just from cross-origin iframe
      if (this.isEditMode && isAEMDomain) {
        logger.log('[AEM Mode Detector] Cross-origin iframe in edit context');
      }
    }

    this.detected = true;

    // Log detection results
    const mode = this.getMode();
    logger.log('[AEM Mode Detector] Detection complete:', {
      mode: mode,
      url: url,
      hostname: hostname,
      isAuthorMode: this.isAuthorMode,
      isEditMode: this.isEditMode,
      isPreviewMode: this.isPreviewMode,
      isPublishMode: this.isPublishMode,
      isDevelopment: this.isDevelopmentEnvironment(),
    });

    return mode;
  }

  /**
   * Get current mode
   */
  getMode() {
    if (this.isEditMode) return 'edit';
    if (this.isPreviewMode) return 'preview';
    if (this.isAuthorMode) return 'author';
    return 'publish';
  }

  /**
   * Check if we should use fallback mode
   * (disable heavy visuals in edit/author mode)
   */
  shouldUseFallbackMode() {
    if (!this.detected) this.detect();
    
    // Use fallback mode in edit mode (most resource-intensive)
    // Allow preview and author modes to have limited features
    return this.isEditMode;
  }

  /**
   * Check if we should use limited mode
   * (reduced features but some visuals)
   */
  shouldUseLimitedMode() {
    if (!this.detected) this.detect();
    
    // Use limited mode in preview/author (not edit)
    return this.isAuthorMode && !this.isEditMode;
  }

  /**
   * Check if we're in full feature mode
   */
  isFullFeatureMode() {
    if (!this.detected) this.detect();
    return this.isPublishMode;
  }

  /**
   * Get settings based on mode
   */
  getSettings() {
    if (!this.detected) this.detect();

    if (this.shouldUseFallbackMode()) {
      // Edit mode ONLY - minimal features to prevent OOM
      return {
        mode: 'fallback',
        enableBackground: false,
        enableAnimations: false,
        enableVideo: false,
        enableParticles: false,
        enableMouseParticles: false,
        enableAudio: false,
        enableScrollEffects: false,
        showStaticBackground: true,
        showPlaceholderMessage: true,
      };
    }

    if (this.shouldUseLimitedMode()) {
      // Preview mode - some limitations but mostly full features
      return {
        mode: 'limited',
        enableBackground: true, // Enable background in preview
        enableAnimations: true,
        enableVideo: true,
        enableParticles: true, // Enable particles in preview
        enableMouseParticles: true, // Enable in preview
        enableAudio: false, // Still disable audio in preview (can be jarring)
        enableScrollEffects: true,
        showStaticBackground: false,
        showPlaceholderMessage: false,
      };
    }

    // Publish mode OR any AEM mode with wcmmode=disabled - full features
    return {
      mode: 'full',
      enableBackground: true,
      enableAnimations: true,
      enableVideo: true,
      enableParticles: true,
      enableMouseParticles: true,
      enableAudio: true,
      enableScrollEffects: true,
      showStaticBackground: false,
      showPlaceholderMessage: false,
    };
  }

  /**
   * Apply static background as fallback
   */
  applyStaticBackground() {
    const body = document.body;
    const canvas = document.getElementById('shaderBackground');
    
    // Hide canvas if it exists
    if (canvas) {
      canvas.style.display = 'none';
    }

    // Apply CSS gradient background
    body.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)';
    body.style.backgroundAttachment = 'fixed';
    
    logger.log('[AEM Mode] Applied static background');
  }

  /**
   * Show placeholder message in edit mode
   */
  showPlaceholderMessage() {
    // Check if message already exists
    if (document.getElementById('aem-edit-mode-message')) return;

    const message = document.createElement('div');
    message.id = 'aem-edit-mode-message';
    message.style.cssText = `
      position: fixed;
      top: 60px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.85);
      color: #fff;
      padding: 12px 24px;
      border-radius: 8px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      z-index: 999999;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    message.innerHTML = `
      <strong>⚠️ AEM Edit Mode</strong><br>
      <small style="opacity: 0.8;">Heavy visuals disabled to prevent memory issues.<br>
      Preview on publish for full experience.</small>
    `;
    
    document.body.appendChild(message);
    
    logger.log('[AEM Mode] Showing edit mode message');
  }
}

// Create singleton instance
const aemModeDetector = new AEMModeDetector();

export default aemModeDetector;

