import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { initCoverOrb } from '../threejs/coverOrb.js';
import { initTimelineShader } from './timelineShader.js';
import performanceDetector from '../utils/performanceDetector.js';
import logger from '../utils/logger.js';
import mobileFilmGrain from '../utils/mobileFilmGrain.js';

// GSAP Ticker Optimization for smoother animations when competing with WebGL
// Disable lag smoothing - prevents "catch up" jitter when frames are dropped
gsap.ticker.lagSmoothing(0);

// Listen for adaptive FPS cap and apply to GSAP ticker
// This stabilizes animation frame timing based on detected refresh rate
performanceDetector.onFpsCapChange((info) => {
  logger.log(`[Timeline] Applying GSAP ticker fps cap: ${info.cap}fps (${info.reason})`);
  gsap.ticker.fps(info.cap);
});

// Throttle state for expensive safety checks (getBoundingClientRect, getComputedStyle)
// These cause layout thrashing if called every frame
let lastSafetyCheckTime = 0;
// MOBILE OPTIMIZATION: Increase interval on mobile to reduce layout thrashing
const SAFETY_CHECK_INTERVAL = window.matchMedia("(max-width: 1024px)").matches ? 250 : 150;

// Helper function to interpolate between two hex colors
function interpolateColor(color1, color2, progress) {
  // Convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);

  if (!c1 || !c2) return color1;

  // Interpolate each channel
  const r = Math.round(c1.r + (c2.r - c1.r) * progress);
  const g = Math.round(c1.g + (c2.g - c1.g) * progress);
  const b = Math.round(c1.b + (c2.b - c1.b) * progress);

  // Convert back to hex
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export function initTimelineAnimation() {
  // ==========================================================================
  // INITIALIZATION TELEMETRY: Track init state for debugging failures
  // ==========================================================================
  const initState = {
    timestamp: Date.now(),
    elements: {},
    shaderInit: false,
    orbInit: false,
    positionCaptured: false,
    attempts: 0,
    errors: []
  };
  
  // CRITICAL: Reset global state flags on fresh init to prevent stale state
  // This fixes issues where previous session state blocks timeline entry
  window._isTimelineDismissed = false;
  window._isDismissing = false;
  
  const timeline = document.querySelector('#acs-timeline');
  const timelineWindowStart = document.querySelector('#timeline-window-start');
  const timelineWindowBg = document.querySelector('#timeline-window-bg');
  const getInvolvedMessage = document.querySelector('.get-involved-message');
  
  // Track element availability for telemetry
  initState.elements.timeline = !!timeline;
  initState.elements.windowStart = !!timelineWindowStart;
  initState.elements.windowBg = !!timelineWindowBg;
  initState.elements.getInvolvedMessage = !!getInvolvedMessage;
  
  // Initialize Shader Background with error boundary
  if (document.querySelector('#timeline-shader-bg') && !window.timelineShaderControls) {
    try {
      window.timelineShaderControls = initTimelineShader();
      initState.shaderInit = !!window.timelineShaderControls;
      // Start paused since we're not in timeline initially
      if (window.timelineShaderControls && window.timelineShaderControls.stop) {
        window.timelineShaderControls.stop();
      }
    } catch (e) {
      logger.warn('[Timeline] Shader initialization failed:', e.message);
      initState.errors.push({ type: 'shader', message: e.message });
      // Timeline can continue without shader
    }
  }
  
  // Initialize Cover Orb with error boundary
  if (document.querySelector('#timeline-cover-canvas') && !window.coverOrbControls) {
    try {
      window.coverOrbControls = initCoverOrb();
      initState.orbInit = !!window.coverOrbControls;
      // Start paused since we're not in timeline initially
      if (window.coverOrbControls && window.coverOrbControls.pause) {
        window.coverOrbControls.pause();
      }
    } catch (e) {
      logger.warn('[Timeline] Cover orb initialization failed:', e.message);
      initState.errors.push({ type: 'coverOrb', message: e.message });
      // Timeline can continue without cover orb
    }
  }
  
  // Check if required elements exist
  if (!timeline || !timelineWindowStart || !timelineWindowBg || !getInvolvedMessage) {
    logger.warn('Timeline: Required elements not found. Skipping timeline initialization.', initState.elements);
    // Dispatch failure event for analytics
    window.dispatchEvent(new CustomEvent('timeline:init-failed', { 
      detail: { reason: 'missing-elements', state: initState }
    }));
    return;
  }
  
  // Check if timeline has been dismissed in this session
  // COMMENTED OUT: Allow timeline to be re-entered on page refresh
  /*
  const isTimelineDismissed = sessionStorage.getItem('timelineDismissed') === 'true';
  
  if (isTimelineDismissed) {
    // Immediately collapse the timeline section
    gsap.set(timeline, {
      opacity: 0,
      height: 0,
      overflow: 'hidden',
      pointerEvents: 'none'
    });
    // Don't initialize any animations
    return;
  }
  */

  const timelineContainer = timeline.querySelector('.timeline-container');
  const timelineTrack = timeline.querySelector('.timeline-track');
  
  if (!timelineContainer || !timelineTrack) {
    logger.warn('Timeline: Container or track not found. Skipping timeline initialization.');
    return;
  }

  // Ensure background pause state is initialized (not paused at start)
  if (typeof window.backgroundPaused === 'undefined') {
    window.backgroundPaused = false;
  }

  // Cover Orb is already initialized at the top of this function (line ~55)
  // No need to call initCoverOrb() again here

  // Cache for position with interpolation to prevent jitter
  // Initialize with null to indicate "not yet positioned"
  let lastPosition = null;
  let targetPosition = null;
  
  // Flag to track if we should be updating the BG position to match the span
  let isTrackingSpan = true;
  
  // Lerp (linear interpolation) for smooth transitions
  const lerp = (start, end, factor) => start + (end - start) * factor;
  
  // Helper to get the current position of timeline-window-start with adjustments
  const getSpanPosition = () => {
    if (!timelineWindowStart) {
      logger.warn('[Timeline] getSpanPosition: timelineWindowStart element is null');
      return null;
    }
    
    const rect = timelineWindowStart.getBoundingClientRect();
    
    // Validate that we got real dimensions (not 0x0 from off-screen element)
    if (rect.width === 0 || rect.height === 0) {
      // Log detailed diagnostics for zero-dimension elements
      // This helps identify why ~3% of users may have position capture failures
      try {
        const computedStyle = window.getComputedStyle(timelineWindowStart);
        logger.warn('[Timeline] Zero-dimension element detected:', {
          width: rect.width,
          height: rect.height,
          top: rect.top,
          left: rect.left,
          display: computedStyle.display,
          visibility: computedStyle.visibility,
          opacity: computedStyle.opacity,
          position: computedStyle.position,
          parentVisible: timelineWindowStart.parentElement ? 
            window.getComputedStyle(timelineWindowStart.parentElement).display : 'no-parent'
        });
      } catch (e) {
        logger.warn('[Timeline] Zero-dimension element - could not get computed style:', e.message);
      }
      return null;
    }
    
    return {
      top: rect.top - 2,
      left: rect.left - 6,
      width: rect.width + 12,
      height: rect.height + 4
    };
  };
  
  // Function to IMMEDIATELY sync BG position to span (no lerp, instant)
  // This bypasses the isTrackingSpan check and is safe for resize events
  const syncBgToSpanImmediate = () => {
    const pos = getSpanPosition();
    if (!pos || !timelineWindowBg) return false;
    
    // Update caches
    lastPosition = { ...pos };
    targetPosition = { ...pos };
    
    // Also update captured position for expansion animation
    capturedPosition = { ...pos };
    
    // Apply position immediately
    timelineWindowBg.style.position = 'fixed';
    timelineWindowBg.style.top = `${pos.top}px`;
    timelineWindowBg.style.left = `${pos.left}px`;
    timelineWindowBg.style.width = `${pos.width}px`;
    timelineWindowBg.style.height = `${pos.height}px`;
    timelineWindowBg.style.background = 'linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))';
    timelineWindowBg.style.borderRadius = '4px';
    timelineWindowBg.style.zIndex = '0';
    
    return true;
  };
  
  // Function to position background to match the span (like a highlight box)
  const positionBgToSpan = () => {
    // Check if elements still exist
    if (!timelineWindowStart || !timelineWindowBg) return;
    
    // If we're not tracking the span (e.g. during expansion or timeline view), don't update
    if (!isTrackingSpan) return;
    
    // PERFORMANCE: Only getBoundingClientRect, skip expensive getComputedStyle
    // During tracking phase, the element isn't being transformed
    const rect = timelineWindowStart.getBoundingClientRect();
    
    // Prevent collapsing to 0x0 (fixes issue where element loses dimensions during fast scroll)
    if (rect.width === 0 || rect.height === 0) {
      return;
    }
    
    // Use tighter threshold for Y-axis (more sensitive to vertical changes)
    // Use looser threshold for X-axis (less critical)
    const yThreshold = 0.1; // Very sensitive to Y changes
    const xThreshold = 0.5; // Standard for X changes
    const sizeThreshold = 0.5; // Standard for size changes
    
    // Initialize targetPosition if null
    if (!targetPosition) {
      targetPosition = { top: 0, left: 0, width: 0, height: 0 };
    }
    
    // Check if position actually changed
    const positionChanged = 
      Math.abs(rect.top - targetPosition.top) > yThreshold ||
      Math.abs(rect.left - targetPosition.left) > xThreshold ||
      Math.abs(rect.width - targetPosition.width) > sizeThreshold ||
      Math.abs(rect.height - targetPosition.height) > sizeThreshold;

    if (!positionChanged && targetPosition.top !== 0) {
      return; // Skip update if position hasn't changed significantly
    }
    
    // Update target position
    targetPosition = {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };
    
    // First-time positioning: use instant sync (no lerp)
    if (!lastPosition) {
      lastPosition = {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      };
    } else {
      // Smooth interpolation to prevent jitter (especially on Y-axis)
      const lerpFactor = 0.6;
      lastPosition = {
        top: lerp(lastPosition.top, rect.top, lerpFactor),
        left: lerp(lastPosition.left, rect.left, lerpFactor),
        width: lerp(lastPosition.width, rect.width, lerpFactor),
        height: lerp(lastPosition.height, rect.height, lerpFactor)
      };
    }
    
    // Use direct style manipulation for instant updates (no GSAP delay)
    // Use sub-pixel precision with transform for smoother Y-axis tracking
    // IMPORTANT: Do NOT touch opacity here, let GSAP handle it to prevent flickering
    timelineWindowBg.style.position = 'fixed';
    timelineWindowBg.style.top = `${lastPosition.top}px`;
    timelineWindowBg.style.left = `${lastPosition.left}px`;
    timelineWindowBg.style.width = `${lastPosition.width}px`;
    timelineWindowBg.style.height = `${lastPosition.height}px`;
    timelineWindowBg.style.background = 'linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))';
    timelineWindowBg.style.zIndex = '0';
    timelineWindowBg.style.borderRadius = '4px';
    
    // Removed will-change to prevent compositing layer blocking backdrop-filter
    // timelineWindowBg.style.willChange = 'top, left, width, height, opacity';
  };

  // MAGIC TRICK: Use pseudo-element for span background to avoid affecting text opacity
  
  // Set timeline window BG to COMPLETELY INVISIBLE initially
  // It should only become visible at the handoff moment
  gsap.set(timelineWindowBg, {
    opacity: 0,
    visibility: 'hidden'
  });
  
  // Create a style element for the pseudo-element background
  const styleEl = document.createElement('style');
  styleEl.id = 'timeline-window-start-bg-style';
  styleEl.textContent = `
    #timeline-window-start::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -6px;
      right: -6px;
      bottom: -2px;
      background: linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164));
      border-radius: 4px;
      opacity: 0;
      z-index: -1;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }
  `;
  document.head.appendChild(styleEl);
  
  // Setup span for pseudo-element
  timelineWindowStart.style.position = 'relative';
  timelineWindowStart.style.zIndex = '1';

  // Position the BG element once, but keep it invisible
  // Use multiple attempts to ensure we get a valid position (handles async layout)
  // Track attempts for telemetry
  let bgPositionAttempts = 0;
  const MAX_BG_POSITION_ATTEMPTS = 6;
  
  const initBgPosition = () => {
    bgPositionAttempts++;
    const pos = getSpanPosition();
    if (pos) {
      // Update caches
      lastPosition = { ...pos };
      targetPosition = { ...pos };
      capturedPosition = { ...pos };
      
      // Position the BG element (invisible)
      timelineWindowBg.style.position = 'fixed';
      timelineWindowBg.style.top = `${pos.top}px`;
      timelineWindowBg.style.left = `${pos.left}px`;
      timelineWindowBg.style.width = `${pos.width}px`;
      timelineWindowBg.style.height = `${pos.height}px`;
      timelineWindowBg.style.background = 'linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))';
      timelineWindowBg.style.borderRadius = '4px';
      
      logger.log(`[Timeline] Background position captured on attempt ${bgPositionAttempts}:`, pos);
      return true;
    }
    return false;
  };
  
  // Extended retry window: 0 + 50 + 100 + 200 + 300 + 400 = 1050ms total
  // This handles slow devices, font loading, and complex CSS layouts
  requestAnimationFrame(() => {
    // Try immediately
    if (!initBgPosition()) {
      // Attempt 2: 50ms delay
      setTimeout(() => {
        if (!initBgPosition()) {
          // Attempt 3: 100ms delay
          setTimeout(() => {
            if (!initBgPosition()) {
              // Attempt 4: 200ms delay
              setTimeout(() => {
                if (!initBgPosition()) {
                  // Attempt 5: 300ms delay
                  setTimeout(() => {
                    if (!initBgPosition()) {
                      // Attempt 6 (final): 400ms delay
                      setTimeout(() => {
                        if (!initBgPosition()) {
                          // All attempts failed - log for telemetry
                          logger.warn(`[Timeline] Failed to capture background position after ${MAX_BG_POSITION_ATTEMPTS} attempts over 1050ms`);
                          window.dispatchEvent(new CustomEvent('timeline:init-failed', { 
                            detail: { 
                              reason: 'position-capture-failed', 
                              attempts: bgPositionAttempts,
                              elementExists: !!timelineWindowStart
                            }
                          }));
                        }
                      }, 400);
                    }
                  }, 300);
                }
              }, 200);
            }
          }, 100);
        }
      }, 50);
    }
  });

  // Update position only on resize
  // Use syncBgToSpanImmediate for resize events as it bypasses tracking check
  const resizeObserver = new ResizeObserver(() => {
    // Only sync if we're tracking (before timeline expansion)
    // and not in timeline mode
    if (isTrackingSpan && !document.body.classList.contains('in-timeline')) {
      syncBgToSpanImmediate();
    }
  });
  resizeObserver.observe(document.body);

  // Continuous tracking system for perfect sync during critical scroll phase
  let rafId = null;
  let isContinuouslyTracking = false;
  let trackingFrameCount = 0; // Frame counter for throttling
  
  // MOBILE OPTIMIZATION: More aggressive throttling on mobile (every 5th frame vs 3rd)
  const trackingFrameSkip = window.matchMedia("(max-width: 1024px)").matches ? 5 : 3;
  
  const startContinuousTracking = () => {
    if (isContinuouslyTracking) return; // Already tracking
    
    isContinuouslyTracking = true;
    trackingFrameCount = 0; // Reset frame counter
    
    const trackLoop = () => {
      if (!isContinuouslyTracking) return;
      
      // Throttle: Only update every Nth frame to reduce layout thrashing
      // Mobile: every 5th frame (~12fps at 60fps) - still smooth enough for BG tracking
      // Desktop: every 3rd frame (~20fps at 60fps)
      trackingFrameCount++;
      if (trackingFrameCount % trackingFrameSkip === 0) {
        positionBgToSpan();
      }
      
      // Continue loop
      rafId = requestAnimationFrame(trackLoop);
    };
    
    // Start the loop
    trackLoop();
  };
  
  const stopContinuousTracking = () => {
    if (!isContinuouslyTracking) return;
    
    isContinuouslyTracking = false;
    
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    
    trackingFrameCount = 0; // Reset counter
  };
  
  // Set up ScrollTrigger to start aggressive tracking when .get-involved-message enters viewport
  // Wrap callbacks in try-catch to prevent silent failures from breaking timeline
  const trackingScrollTrigger = ScrollTrigger.create({
    trigger: getInvolvedMessage,
    start: 'top bottom', // When message enters bottom of viewport
    end: 'bottom top', // When message exits top of viewport
    onEnter: () => {
      try {
        // CRITICAL: Skip if timeline has been dismissed
        if (isTimelineDismissed || window._isTimelineDismissed) return;
        // CRITICAL: When entering the tracking zone, immediately sync position
        // This ensures we have valid position data before any animations start
        syncBgToSpanImmediate();
        startContinuousTracking();
      } catch (e) {
        logger.warn('[Timeline] Error in tracking onEnter:', e.message);
      }
    },
    onLeave: () => {
      // Don't stop tracking when leaving downward - we need it for the handoff
    },
    onEnterBack: () => {
      try {
        // CRITICAL: Skip if timeline has been dismissed - prevents scroll issues on mobile
        if (isTimelineDismissed || window._isTimelineDismissed) {
          logger.log('[Tracking] onEnterBack blocked - timeline is dismissed');
          return;
        }
        // Also sync immediately on re-entry
        syncBgToSpanImmediate();
        startContinuousTracking();
      } catch (e) {
        logger.warn('[Timeline] Error in tracking onEnterBack:', e.message);
      }
    },
    onLeaveBack: () => {
      try {
        stopContinuousTracking();
      } catch (e) {
        logger.warn('[Timeline] Error in tracking onLeaveBack:', e.message);
      }
    }
  });
  
  // Validate ScrollTrigger was created successfully
  if (!trackingScrollTrigger) {
    logger.warn('[Timeline] Failed to create tracking ScrollTrigger');
  }

  // ==========================================================================
  // MOBILE PERFORMANCE: Pause background elements when inside timeline
  // This reduces GPU/CPU load by pausing:
  // - Main shader background (#shaderBackground)
  // - Mobile film grain overlay
  // - Particle animations
  // ==========================================================================
  const isMobileDevice = window.matchMedia("(max-width: 1024px)").matches;
  
  if (isMobileDevice && timeline) {
    // Helper to forcefully hide mobile film grain
    const hideFilmGrain = () => {
      mobileFilmGrain.hide();
      mobileFilmGrain.setOpacity(0);
      // Direct DOM fallback
      const grainEl = document.getElementById('mobile-film-grain');
      if (grainEl) {
        grainEl.style.opacity = '0';
        grainEl.style.display = 'none';
        grainEl.style.visibility = 'hidden';
      }
    };
    
    // Helper to restore mobile film grain
    const showFilmGrain = () => {
      mobileFilmGrain.setOpacity(0.25);
      mobileFilmGrain.show();
      // Direct DOM restore
      const grainEl = document.getElementById('mobile-film-grain');
      if (grainEl) {
        grainEl.style.visibility = 'visible';
        grainEl.style.display = 'block';
        grainEl.style.opacity = '0.25';
      }
    };
    
    ScrollTrigger.create({
      trigger: timeline,
      start: 'top 80%', // Start pausing slightly before timeline enters
      end: 'bottom 20%', // Resume slightly before timeline exits
      onEnter: () => {
        // CRITICAL: Skip if timeline has been dismissed
        if (isTimelineDismissed || window._isTimelineDismissed) return;
        logger.log('[Timeline] Mobile: Pausing background elements for performance');
        window.backgroundPaused = true;
        hideFilmGrain();
      },
      onLeave: () => {
        // CRITICAL: Skip if timeline has been dismissed
        if (isTimelineDismissed || window._isTimelineDismissed) return;
        logger.log('[Timeline] Mobile: Resuming background elements');
        window.backgroundPaused = false;
        showFilmGrain();
      },
      onEnterBack: () => {
        // CRITICAL: Skip if timeline has been dismissed - prevents scroll jump on mobile
        if (isTimelineDismissed || window._isTimelineDismissed) {
          logger.log('[Timeline] Mobile onEnterBack blocked - timeline is dismissed');
          return;
        }
        logger.log('[Timeline] Mobile: Pausing background elements (scrolled back)');
        window.backgroundPaused = true;
        hideFilmGrain();
      },
      onLeaveBack: () => {
        // CRITICAL: Skip if timeline has been dismissed
        if (isTimelineDismissed || window._isTimelineDismissed) return;
        logger.log('[Timeline] Mobile: Resuming background elements (scrolled back up)');
        window.backgroundPaused = false;
        showFilmGrain();
      }
    });
  }

  // Calculate total horizontal scroll distance
  const events = gsap.utils.toArray('.timeline-event');
  const decades = gsap.utils.toArray('.timeline-decade');
  const remainingEventsCount = events.length - 1;
  
  // Helper function to get current event width based on viewport
  const getEventWidth = () => {
    const vw = window.innerWidth;
    if (vw < 1025) {
      return vw; // Mobile: 100vw
    } else if (vw >= 1280) {
      // Desktop 1280px+: min(1324px, 92vw)
      return Math.min(1324, vw * 0.92);
    } else {
      // Desktop 1025-1279px: 50vw
      return vw * 0.5;
    }
  };
  
  // Define scroll durations as functions to get current viewport size on resize
  // Use matchMedia to strictly match CSS breakpoint (1024px)
  const isMobile = () => window.matchMedia("(max-width: 1024px)").matches;
  const getInitialPhaseDuration = () => window.innerHeight * 1.0;
  const getScrollPerEvent = () => window.innerHeight * (isMobile() ? 0.7 : 0.88); // Reduced: was 0.9/1.4, now 0.7/1.0
  const getTotalScrollDistance = () => getInitialPhaseDuration() + (remainingEventsCount * getScrollPerEvent());
  
  // Initial values
  const initialPhaseDuration = getInitialPhaseDuration();
  const scrollPerEvent = getScrollPerEvent();
  const totalScrollDistance = getTotalScrollDistance();
  
  // Adjust animation durations (relative timeline units)
  const moveDuration = isMobile() ? 0.6 : 0.88; // Faster transitions on mobile
  const holdDuration = 0.08; // Reduced from 0.15 to 0.08 (~50% less hold time)
  const totalCycleDuration = moveDuration + holdDuration;
  
  // Calculate theoretical total duration of the timeline for accurate scrubbing
  // Phase A: 0.04 (delay) + 0.05 (fade) + 1.0 (hold) = 1.09
  const phaseADuration = 0.09 + holdDuration; 
  const phaseBDuration = remainingEventsCount * totalCycleDuration;
  const timelineTotalDuration = phaseADuration + phaseBDuration;

  // Lock to prevent updateScrubber from overriding clicked/resized marker
  let markerLock = {
    isLocked: false,
    targetIndex: -1,
    unlockTimer: null,
    reason: '' // 'click' or 'resize'
  };

  // Track previous marker for direction detection
  let previousActiveMarkerIndex = 0;

  // Track the current year display and split instance
  let currentYearElement = null;
  let currentYearSplit = null;
  let lastDisplayedYear = null;
  let isAnimatingYear = false; // Flag to prevent double animations
  
  // Track active event index for resize handling
  let currentActiveEventIndex = 0;
  
  // Main timeline instance (defined later but declared here for scope access)
  let tl;

  // Helper to animate event content (year, description, optional image) as it enters
  // Simplified: Only opacity fade, no different translateX rates for smoother performance
  const animateEventContent = (eventNode, label, startOffset = 0) => {
    if (!eventNode || !tl) return;
    const pieces = [];
    const yearEl = eventNode.querySelector('.event-year');
    const descEl = eventNode.querySelector('.event-description');
    const imgEl = eventNode.querySelector('.event-image');

    if (yearEl) pieces.push(yearEl);
    if (descEl) pieces.push(descEl);
    if (imgEl) pieces.push(imgEl);

    if (!pieces.length) return;

    // Simple opacity fade only - no X/Y translation for year/description
    // This reduces competing transform animations and improves smoothness
    tl.fromTo(
      pieces,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: Math.max(0.25, moveDuration * 0.65),
        ease: 'power2.out',
        stagger: 0.08,
        force3D: true, // GPU acceleration for smooth 60fps
      },
      label ? `${label}+=${startOffset}` : startOffset
    );
  };

  // Helper function to show the new year with animation
  const showNewYear = (year) => {
    if (!currentYearElement) {
      currentYearElement = document.querySelector('#current-timeline-year');
    }
    
    if (!currentYearElement) {
      isAnimatingYear = false;
      return;
    }
    
    // Ensure the container is visible
    gsap.set(currentYearElement, { opacity: 1 });
    
    // Update the text content
    currentYearElement.textContent = year;
    lastDisplayedYear = year;
    
    // Apply SplitType for character animation
    currentYearSplit = new SplitType(currentYearElement, {
      types: 'chars',
      charClass: 'split-char'
    });
    
    // Animate characters in
    if (currentYearSplit.chars && currentYearSplit.chars.length > 0) {
      gsap.set(currentYearSplit.chars, {
        opacity: 0,
        y: 20,
        display: 'inline-block',
        force3D: true
      });
      
      gsap.to(currentYearSplit.chars, {
        opacity: 1,
        y: 0,
        duration: 0.27,
        stagger: 0.02,
        ease: 'power2.out',
        overwrite: true,
        force3D: true, // GPU acceleration
        onComplete: () => {
          // Reset flag when animation completes
          isAnimatingYear = false;
        }
      });
    } else {
      isAnimatingYear = false;
    }
  };

  // Helper to update the current year display with split text animation
  const updateCurrentYear = (year) => {
    if (!year || year === lastDisplayedYear || isAnimatingYear) return;
    
    // Set flag to prevent overlapping animations
    isAnimatingYear = true;
    
    if (!currentYearElement) {
      currentYearElement = document.querySelector('#current-timeline-year');
    }
    
    if (!currentYearElement) {
      isAnimatingYear = false;
      return;
    }
    
    // Fade out old year first if it exists
    if (currentYearSplit && currentYearSplit.chars && currentYearSplit.chars.length > 0) {
      gsap.to(currentYearSplit.chars, {
        opacity: 0,
        y: -20,
        duration: 0.17,
        stagger: 0.01,
        ease: 'power2.in',
        force3D: true, // GPU acceleration
        onComplete: () => {
          // Clean up and show new year after fade out
          if (currentYearSplit && typeof currentYearSplit.revert === 'function') {
            currentYearSplit.revert();
          }
          
          showNewYear(year);
        }
      });
    } else {
      // No old year to fade out, show new year immediately
      showNewYear(year);
    }
  };
  
  // Helper function to hide the year display
  const hideCurrentYear = () => {
    if (!currentYearElement) {
      currentYearElement = document.querySelector('#current-timeline-year');
    }
    
    if (!currentYearElement) return;
    
    // Fade out the entire element
    gsap.to(currentYearElement, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
      force3D: true, // GPU acceleration
      onComplete: () => {
        // Clean up split and reset
        if (currentYearSplit && typeof currentYearSplit.revert === 'function') {
          currentYearSplit.revert();
        }
        currentYearElement.textContent = '';
        lastDisplayedYear = null;
        isAnimatingYear = false;
      }
    });
  };
  
  // Function to re-enter timeline after dismissal
  function reEnterTimeline() {
    logger.log('[Re-entry] Starting timeline re-entry');
    
    // Set re-entering flag to prevent scroll-based positioning logic from interfering
    isReEntering = true;
    logger.log('[Re-entry] Set isReEntering flag to TRUE - scroll positioning disabled');
    
    // Reset dismissed flags (both local and global)
    isTimelineDismissed = false;
    isDismissing = false;
    window._isTimelineDismissed = false;
    window._isDismissing = false;
    
    // Reset get-involved-message opacity
    gsap.set(getInvolvedMessage, { opacity: 1 });
    
    // IMPORTANT: Make sure timeline is still in collapsed state while we measure
    // This ensures #timeline-window-start is in its correct position
    if (!timeline.classList.contains('closed')) {
      logger.warn('[Re-entry] Timeline was not collapsed, should have been');
    }
    
    // STEP 1: Setup background to match #timeline-window-start position FIRST
    // Do this BEFORE touching page structure
    // Kill any existing GSAP animations on this element
    gsap.killTweensOf(timelineWindowBg);
    
    // Clear any existing inline styles first to avoid conflicts
    timelineWindowBg.style.cssText = '';
    
    // Get the current position of #timeline-window-start using helper (validates dimensions)
    const pos = getSpanPosition();
    
    // Fallback if helper returns null (shouldn't happen, but be safe)
    const adjustedTop = pos ? pos.top : (window.innerHeight / 2 - 20);
    const adjustedLeft = pos ? pos.left : (window.innerWidth / 2 - 100);
    const adjustedWidth = pos ? pos.width : 200;
    const adjustedHeight = pos ? pos.height : 40;
    
    // Update cached position for expansion animation
    if (pos) {
      capturedPosition = { ...pos };
    }
    
    // Set initial state to match #timeline-window-start::after position
    timelineWindowBg.style.position = 'fixed';
    timelineWindowBg.style.top = `${adjustedTop}px`;
    timelineWindowBg.style.left = `${adjustedLeft}px`;
    timelineWindowBg.style.width = `${adjustedWidth}px`;
    timelineWindowBg.style.height = `${adjustedHeight}px`;
    timelineWindowBg.style.zIndex = '9999'; // Very high to ensure it's on top
    timelineWindowBg.style.background = 'linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))';
    timelineWindowBg.style.pointerEvents = 'none';
    timelineWindowBg.style.visibility = 'visible';
    timelineWindowBg.style.display = 'block';
    timelineWindowBg.style.borderRadius = '4px';
    timelineWindowBg.style.opacity = '0.5';
    
    logger.log('[Re-entry] Background positioned to match timeline-window-start:', {
      top: adjustedTop,
      left: adjustedLeft,
      width: adjustedWidth,
      height: adjustedHeight,
      posValid: !!pos
    });
    
    // STEP 2: Animate background expansion (BEFORE restoring timeline content)
    function expandBackground() {
      logger.log('[Re-entry] Starting background expansion animation');
      
      // Initialize shader background opacity to 0 (will fade in at the end)
      timelineWindowBg.style.setProperty('--decal-opacity', '0');
      logger.log('[Re-entry] Set shader background (--decal-opacity) to 0');
      
      // Hide the pseudo-element now that we're taking over
      const styleEl = document.getElementById('timeline-window-start-bg-style');
      if (styleEl) {
        styleEl.textContent = `
          #timeline-window-start::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -6px;
            right: -6px;
            bottom: -2px;
            background: linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164));
            border-radius: 4px;
            opacity: 0 !important;
            z-index: -1;
            pointer-events: none;
            transition: none !important;
          }
        `;
      }
      
      // Create timeline for expansion animation (matching original entry)
      const expansionTl = gsap.timeline({
        onComplete: () => {
          logger.log('[Re-entry] Expansion complete, now locking background');
          
          // CRITICAL: Lock background at fullscreen IMMEDIATELY after expansion
          // Do this BEFORE restoring content or calling ScrollTrigger.refresh()
          // This prevents ANY logic from hiding or shrinking it
          timelineWindowBg.style.position = 'fixed';
          timelineWindowBg.style.top = '0';
          timelineWindowBg.style.left = '0';
          timelineWindowBg.style.width = '100vw';
          timelineWindowBg.style.height = '100vh';
          timelineWindowBg.style.opacity = '1';
          timelineWindowBg.style.visibility = 'visible';
          timelineWindowBg.style.display = 'block';
          timelineWindowBg.style.borderRadius = '0px';
          timelineWindowBg.style.background = 'linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))';
          timelineWindowBg.style.zIndex = '9999'; // Keep high during transition
          
          // SET FULLSCREEN LOCK FLAG - prevents ANY position/size changes
          isBgLockedFullscreen = true;
          logger.log('[Re-entry] Background locked at fullscreen - isBgLockedFullscreen = TRUE');
          
          // Start aggressive protection loop - continuously force fullscreen
          function lockBackgroundLoop() {
            if (!isBgLockedFullscreen) return; // Stop when flag is cleared
            
            // Check both inline styles AND computed position
            const rect = timelineWindowBg.getBoundingClientRect();
            const styleNeedsUpdate = (
              timelineWindowBg.style.top !== '0px' || 
              timelineWindowBg.style.left !== '0px' || 
              timelineWindowBg.style.width !== '100vw' || 
              timelineWindowBg.style.height !== '100vh'
            );
            const positionMoved = (
              Math.abs(rect.top) > 2 || 
              Math.abs(rect.left) > 2 || 
              Math.abs(rect.width - window.innerWidth) > 5 || 
              Math.abs(rect.height - window.innerHeight) > 5
            );
            
            if (styleNeedsUpdate || positionMoved) {
              logger.warn('[Re-entry] AGGRESSIVE LOCK: Background moved! Inline styles:', {
                top: timelineWindowBg.style.top,
                left: timelineWindowBg.style.left,
                width: timelineWindowBg.style.width,
                height: timelineWindowBg.style.height
              }, 'Computed position:', {
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height
              });
              
              // Force all positioning properties
              timelineWindowBg.style.position = 'fixed';
              timelineWindowBg.style.top = '0';
              timelineWindowBg.style.left = '0';
              timelineWindowBg.style.width = '100vw';
              timelineWindowBg.style.height = '100vh';
              timelineWindowBg.style.opacity = '1';
              timelineWindowBg.style.visibility = 'visible';
              timelineWindowBg.style.display = 'block';
              timelineWindowBg.style.zIndex = '9999';
              timelineWindowBg.style.transform = 'none'; // Clear any transforms
              timelineWindowBg.style.margin = '0'; // Clear margins
              timelineWindowBg.style.padding = '0'; // Clear padding
            }
            
            requestAnimationFrame(lockBackgroundLoop);
          }
          lockBackgroundLoop(); // Start the loop
          logger.log('[Re-entry] Started aggressive fullscreen protection loop');
          
          // CRITICAL: Add .in-timeline class NOW to activate all protection logic
          // This ensures onUpdate/onRefresh callbacks won't touch the background
          document.body.classList.add('in-timeline');
          logger.log('[Re-entry] Added .in-timeline class for protection');
          
          logger.log('[Re-entry] Background locked at fullscreen, now restoring timeline content');
          
          // DON'T clear isReEntering yet - keep it active until scrolling is complete
          // This prevents ScrollTrigger.refresh() from interfering with background size
          
          // STEP 3: After animation, restore timeline structure
          restoreTimelineContent();
        }
      });
      
      // Animate background expansion to fullscreen
      expansionTl.to(timelineWindowBg, {
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        borderRadius: '0px',
        opacity: 1,
        duration: 0.6,
        ease: 'power2.inOut',
        onStart: () => {
          logger.log('[Re-entry] Background expansion started');
          // Set background color once at start (not animated)
          timelineWindowBg.style.background = 'linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))';
          // Ensure element is visible at start
          timelineWindowBg.style.visibility = 'visible';
          timelineWindowBg.style.display = 'block';
          timelineWindowBg.style.zIndex = '9999';
        },
        onUpdate: function() {
          // Force visibility and log progress
          const progress = this.progress();
          timelineWindowBg.style.visibility = 'visible';
          timelineWindowBg.style.display = 'block';
          // Ensure background stays static during animation
          timelineWindowBg.style.background = 'linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))';
          
          if (progress === 0 || progress === 0.5 || progress === 1) {
            logger.log(`[Re-entry] Expansion progress: ${(progress * 100).toFixed(0)}%, opacity: ${timelineWindowBg.style.opacity}, size: ${timelineWindowBg.style.width} x ${timelineWindowBg.style.height}`);
          }
        },
        onComplete: () => {
          logger.log('[Re-entry] Background expansion animation complete');
          timelineWindowBg.style.opacity = '1';
          timelineWindowBg.style.background = 'linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))';
        }
      }, 0);
      
      // Animate opacity separately with linear easing (no curve)
      expansionTl.fromTo(timelineWindowBg, 
        { opacity: 0.5 },
        { 
          opacity: 1,
          duration: 0.6,
          ease: 'none' // Linear, no easing curve
        }, 
        0
      );
      
      // Fade out get-involved-message during expansion
      expansionTl.to(getInvolvedMessage, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in'
      }, 0.2);
      
      // Fade out the background canvas during expansion
      const canvas = document.querySelector('#background-canvas');
      if (canvas) {
        expansionTl.to(canvas, { 
          opacity: 0, 
          duration: 0.5, 
          ease: 'power2.inOut' 
        }, 0);
      }
      
      // Set HTML background to timeline color (once at start, not animated)
      const htmlElement = document.documentElement;
      htmlElement.style.background = 'linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))';
      
      // Start the animation
      logger.log('[Re-entry] Starting expansion timeline, duration:', expansionTl.duration());
      expansionTl.play();
    }
    
    // STEP 3: Restore timeline content after expansion
    function restoreTimelineContent() {
      logger.log('[Re-entry] Restoring timeline content and structure');
      
      // Ensure the timeline element is visible and ready
      timeline.style.pointerEvents = '';
      timeline.style.display = '';
      
      // Remove closed class (this expands the timeline section height)
      timeline.classList.remove('closed');
      
      // Keep timeline opacity at 0 initially (will fade in via ScrollTrigger)
      timeline.style.opacity = '0';
      
      // Set container opacity to 0 initially
      timelineContainer.style.opacity = '0';
      
      // Re-enable all ScrollTriggers
      scrollTriggers.forEach(trigger => {
        if (trigger && trigger.enable) {
          trigger.enable();
        }
      });
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === timeline || 
            trigger.vars.trigger === getInvolvedMessage ||
            trigger.vars.pin === timelineContainer) {
          trigger.enable();
        }
      });
      
      // Reset all timeline events to initial state (hidden)
      const allEvents = gsap.utils.toArray('.timeline-event');
      allEvents.forEach(event => {
        gsap.set(event, { opacity: 0 });
      });
      
      // Reset timeline track position
      const timelineTrack = document.querySelector('.timeline-track');
      if (timelineTrack) {
        gsap.set(timelineTrack, { x: 0, y: 0 });
      }
      
      // Refresh ScrollTrigger to recalculate page height WITH timeline content
      // Use requestAnimationFrame to ensure DOM updates are applied
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        
        // Wait one more frame to ensure refresh completes
        requestAnimationFrame(() => {
          logger.log('[Re-entry] Content restored, now scrolling to timeline');
          
          // STEP 4: After content is restored, scroll to timeline position
          scrollToTimeline();
        });
      });
    }
    
    // STEP 4: Scroll to timeline after content is restored
    function scrollToTimeline() {
      // Get the correct scroll position from timeline's ScrollTrigger
      let targetScrollPos;
      if (tl && tl.scrollTrigger) {
        // Scroll to just at the start to show .timeline-cover without animation having begun
        // Reduced offset to prevent timeline-cover from sliding left
        const offset = window.innerHeight * 0.35; // Reduced from 0.5 to 0.35
        targetScrollPos = tl.scrollTrigger.start + offset;
      } else {
        // Fallback to element position
        const timelineRect = timeline.getBoundingClientRect();
        targetScrollPos = timelineRect.top + window.scrollY;
      }
      
      logger.log('[Re-entry] Scrolling to timeline position:', targetScrollPos);
      
      // Add .in-timeline class to body
      document.body.classList.add('in-timeline');
      
      // Pause background shader
      if (!window.backgroundPaused) {
        window.backgroundPaused = true;
        window.dispatchEvent(new CustomEvent('timeline:backgroundPaused', { detail: { paused: true } }));
      }
      
      // Notify adaptive renderer we're entering timeline
      if (window.shaderBackgroundRenderer && window.shaderBackgroundRenderer.setInTimeline) {
        window.shaderBackgroundRenderer.setInTimeline(true);
      }
      
      // Resume timeline canvases (coverOrb and shader)
      if (window.coverOrbControls && window.coverOrbControls.resume) {
        window.coverOrbControls.resume();
      }
      if (window.timelineShaderControls && window.timelineShaderControls.resume) {
        window.timelineShaderControls.resume();
      }
      
      // Reset timeline progress to start
      if (tl && tl.scrollTrigger) {
        tl.progress(0);
      }
      
      if (window.lenis) {
        window.lenis.scrollTo(targetScrollPos, { 
          duration: 0.8,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          onComplete: () => {
            logger.log('[Re-entry] Scroll complete, fading in timeline');
            
            // LOCK background at fullscreen BEFORE clearing flag
            // This ensures it stays fullscreen when onUpdate callbacks resume
            timelineWindowBg.style.position = 'fixed';
            timelineWindowBg.style.top = '0';
            timelineWindowBg.style.left = '0';
            timelineWindowBg.style.width = '100vw';
            timelineWindowBg.style.height = '100vh';
            timelineWindowBg.style.opacity = '1';
            timelineWindowBg.style.visibility = 'visible';
            timelineWindowBg.style.display = 'block';
            timelineWindowBg.style.borderRadius = '0px';
            timelineWindowBg.style.background = 'linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))';
            logger.log('[Re-entry] Locked background at fullscreen state');
            
            // NOW clear re-entering flags - entire re-entry sequence is complete
            isReEntering = false;
            isBgLockedFullscreen = false;
            logger.log('[Re-entry] Cleared isReEntering and isBgLockedFullscreen flags to FALSE - scroll positioning re-enabled');
            
            // Lower z-index now that we're scrolled into timeline
            timelineWindowBg.style.zIndex = '5';
            
            // Fade in timeline and container
            gsap.to(timeline, { opacity: 1, duration: 0.3, ease: 'power2.out' });
            gsap.to(timelineContainer, { opacity: 1, duration: 0.3, ease: 'power2.out' });
            
            // Fade in shader background (same as normal entry)
            gsap.to(timelineWindowBg, {
              '--decal-opacity': 1,
              duration: 0.5,
              ease: 'power2.out',
              onUpdate: function() {
                const opacityValue = gsap.getProperty(timelineWindowBg, '--decal-opacity') || 0;
                timelineWindowBg.style.setProperty('--decal-opacity', opacityValue);
              }
            });
            logger.log('[Re-entry] Fading in shader background (--decal-opacity)');
          }
        });
      } else {
        window.scrollTo({
          top: targetScrollPos,
          behavior: 'smooth'
        });
        
        // Fallback: fade in after delay
        setTimeout(() => {
          logger.log('[Re-entry] Scroll complete, fading in timeline');
          
          // LOCK background at fullscreen BEFORE clearing flag
          // This ensures it stays fullscreen when onUpdate callbacks resume
          timelineWindowBg.style.position = 'fixed';
          timelineWindowBg.style.top = '0';
          timelineWindowBg.style.left = '0';
          timelineWindowBg.style.width = '100vw';
          timelineWindowBg.style.height = '100vh';
          timelineWindowBg.style.opacity = '1';
          timelineWindowBg.style.visibility = 'visible';
          timelineWindowBg.style.display = 'block';
          timelineWindowBg.style.borderRadius = '0px';
          timelineWindowBg.style.background = 'linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))';
          logger.log('[Re-entry] Locked background at fullscreen state (fallback)');
          
          // NOW clear re-entering flags - entire re-entry sequence is complete
          isReEntering = false;
          isBgLockedFullscreen = false;
          logger.log('[Re-entry] Cleared isReEntering and isBgLockedFullscreen flags to FALSE - scroll positioning re-enabled');
          
          // Lower z-index now that we're scrolled into timeline
          timelineWindowBg.style.zIndex = '5';
          
          // Fade in timeline and container
          gsap.to(timeline, { opacity: 1, duration: 0.3, ease: 'power2.out' });
          gsap.to(timelineContainer, { opacity: 1, duration: 0.3, ease: 'power2.out' });
          
          // Fade in shader background (same as normal entry)
          gsap.to(timelineWindowBg, {
            '--decal-opacity': 1,
            duration: 0.5,
            ease: 'power2.out',
            onUpdate: function() {
              const opacityValue = gsap.getProperty(timelineWindowBg, '--decal-opacity') || 0;
              timelineWindowBg.style.setProperty('--decal-opacity', opacityValue);
            }
          });
          logger.log('[Re-entry] Fading in shader background (--decal-opacity) - fallback');
        }, 800);
      }
    }
    
    // Start the expansion animation immediately
    expandBackground();
  }
  
  // Add click/touch listener to #timeline-window-start for re-entry
  if (timelineWindowStart) {
    const handleReEntry = (e) => {
      // Only handle re-entry if timeline has been dismissed
      // Check both local and global flags (global survives resize)
      const isDismissed = isTimelineDismissed || window._isTimelineDismissed;
      if (isDismissed) {
        e.preventDefault();
        e.stopPropagation();
        reEnterTimeline();
      }
    };
    
    // Add both click and touchend for mobile support
    // Use capture phase to ensure we catch the event
    timelineWindowStart.addEventListener('click', handleReEntry, { capture: true });
    timelineWindowStart.addEventListener('touchend', handleReEntry, { passive: false, capture: true });
    
    // Also ensure the element is always interactive
    timelineWindowStart.style.pointerEvents = 'auto';
  }
  
  // Add click/touch listener to .re-enter-timeline button for re-entry
  const reEnterButton = document.querySelector('.re-enter-timeline');
  if (reEnterButton) {
    const handleReEnterButton = (e) => {
      // Only handle re-entry if timeline has been dismissed
      const isDismissed = isTimelineDismissed || window._isTimelineDismissed;
      if (isDismissed) {
        // Play UI click sound before preventing default and stopping propagation
        if (window.playUIClickSound && !window.audioMuted) {
          window.playUIClickSound();
        }
        e.preventDefault();
        e.stopPropagation();
        // Remove .active class when re-entering
        reEnterButton.classList.remove('active');
        reEnterTimeline();
      }
    };
    
    // Add both click and touchend for mobile support
    reEnterButton.addEventListener('click', handleReEnterButton, { capture: true });
    reEnterButton.addEventListener('touchend', handleReEnterButton, { passive: false, capture: true });
  }
  
  // Helper function to show the year element (ensure it's visible)
  const ensureYearVisible = () => {
    if (!currentYearElement) {
      currentYearElement = document.querySelector('#current-timeline-year');
    }
    
    if (!currentYearElement) return;
    
    // Make sure the container is visible
    if (currentYearElement.style.opacity !== '1') {
      gsap.to(currentYearElement, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  // Throttle state for updateScrubber - prevents excessive DOM queries
  let scrubberUpdateScheduled = false;
  let lastScrubberProgress = -1;
  let scrubberFrameCount = 0;
  
  // MOBILE OPTIMIZATION: Higher progress threshold and frame skipping on mobile
  const scrubberProgressThreshold = isMobile() ? 0.003 : 0.001;
  const scrubberFrameSkip = isMobile() ? 2 : 1; // Skip every other frame on mobile
  
  // Helper to update scrubber based on decades (not individual events)
  const updateScrubber = (progress) => {
    // Skip if progress hasn't changed significantly (reduces redundant updates)
    // MOBILE: Higher threshold for fewer updates
    if (Math.abs(progress - lastScrubberProgress) < scrubberProgressThreshold) return;
    
    // MOBILE OPTIMIZATION: Frame skipping
    scrubberFrameCount++;
    if (scrubberFrameCount % scrubberFrameSkip !== 0) return;
    
    lastScrubberProgress = progress;
    
    // RAF-based throttle: skip if update already scheduled
    if (scrubberUpdateScheduled) return;
    scrubberUpdateScheduled = true;
    
    requestAnimationFrame(() => {
      scrubberUpdateScheduled = false;
      updateScrubberInternal(progress);
    });
  };
  
  // Cached DOM elements for scrubber (populated on first use)
  let cachedScrubberProgress = null;
  let cachedMarkers = null;
  let cachedMinorNodes = null;
  let cachedScrubberLine = null;
  let cachedScrubberContent = null;
  
  // Internal scrubber update (called via RAF throttle)
  const updateScrubberInternal = (progress) => {
    // Use cached elements or query once
    if (!cachedScrubberProgress) cachedScrubberProgress = document.querySelector('.scrubber-progress');
    if (!cachedMarkers) cachedMarkers = gsap.utils.toArray('.marker');
    if (!cachedMinorNodes) cachedMinorNodes = gsap.utils.toArray('.minor-node');
    
    const scrubberProgress = cachedScrubberProgress;
    const markers = cachedMarkers;
    const minorNodes = cachedMinorNodes;
    
    if (!scrubberProgress || !decades.length) return;
    
    const totalMarkers = markers.length;
    let activeMarkerIndex = 0;
    let scrubberProgressValue = 0;
    let activeMinorNodeIndex = -1; // Index among minor nodes (not all events)
    
    // If marker is locked (click or resize), use the locked target index
    if (markerLock.isLocked && markerLock.targetIndex >= 0) {
      activeMarkerIndex = markerLock.targetIndex;
      scrubberProgressValue = (2 * activeMarkerIndex + 1) / (2 * totalMarkers);
    } else {
      // Detect which .timeline-event is actually visible/centered in viewport
      // This provides accurate synchronization with what's actually on screen
      const isMobileView = window.matchMedia("(max-width: 1024px)").matches;
      
      // Find the event that's most centered in the viewport
      // Note: getBoundingClientRect calls are already throttled via scrubber update throttling
      const viewportCenter = isMobileView ? window.innerHeight / 2 : window.innerWidth / 2;
      let closestEvent = null;
      let closestDistance = Infinity;
      let closestEventGlobalIndex = -1;
      
      events.forEach((event, globalIndex) => {
        const rect = event.getBoundingClientRect();
        const eventCenter = isMobileView 
          ? rect.top + (rect.height / 2) 
          : rect.left + (rect.width / 2);
        const distanceFromCenter = Math.abs(eventCenter - viewportCenter);
        
        // Check if this event is closer to center than previous closest
        if (distanceFromCenter < closestDistance) {
          closestDistance = distanceFromCenter;
          closestEvent = event;
          closestEventGlobalIndex = globalIndex;
        }
      });
      
      // Update the tracked active index
      if (closestEventGlobalIndex !== -1) {
        currentActiveEventIndex = closestEventGlobalIndex;
      }
      
      // Determine if the closest event is the cover event or a regular event
      if (closestEvent && closestEvent.classList.contains('timeline-cover')) {
        // Cover event is active - hide the year display
        activeMarkerIndex = 0;
        activeMinorNodeIndex = 0; // Activate first minor node (first non-cover event)
        scrubberProgressValue = 1 / (2 * totalMarkers);
        
        // Hide year display when at cover
        hideCurrentYear();
      } else if (closestEvent) {
        // Regular event is active - find its corresponding minor node
        // Minor nodes are indexed excluding the cover event
        // So if closestEventGlobalIndex is 1 (first non-cover), minorNodeIndex is 0
        activeMinorNodeIndex = closestEventGlobalIndex - 1; // Subtract 1 to account for cover
        
        // Clamp to valid range
        activeMinorNodeIndex = Math.max(0, Math.min(activeMinorNodeIndex, minorNodes.length - 1));
        
        // Update year display from the event's data-year attribute
        // Note: Don't call ensureYearVisible() here - showNewYear() already handles
        // making the container visible, calling both causes a double fade-in animation
        const eventYear = closestEvent.getAttribute('data-year');
        if (eventYear) {
          updateCurrentYear(eventYear);
        }
        
        // Find which decade this minor node belongs to
        if (activeMinorNodeIndex >= 0 && minorNodes.length > 0) {
          const activeNode = minorNodes[activeMinorNodeIndex];
          if (activeNode) {
            const nodeDecadeIndex = parseInt(activeNode.getAttribute('data-decade-index') || '0');
            activeMarkerIndex = Math.min(nodeDecadeIndex, totalMarkers - 1);
          } else {
            activeMarkerIndex = 0;
          }
        } else {
          activeMarkerIndex = 0;
        }
      } else {
        // Fallback to first marker and first minor node if no event found
        activeMarkerIndex = 0;
        activeMinorNodeIndex = 0; // Activate first minor node by default
        scrubberProgressValue = 1 / (2 * totalMarkers);
        
        // Hide year display when no event found (before timeline)
        hideCurrentYear();
      }
    }

    // Calculate scrubber progress based on active minor node position
    // This provides accurate progress bar positioning
    if (activeMinorNodeIndex >= 0 && minorNodes.length > 0) {
      // Find the active minor node
      const activeNode = minorNodes[activeMinorNodeIndex];
      if (activeNode) {
        // Get the scrubber line and active node positions (use cached refs)
        if (!cachedScrubberLine) cachedScrubberLine = document.querySelector('.scrubber-line');
        if (!cachedScrubberContent) cachedScrubberContent = document.querySelector('.scrubber-content');
        
        if (cachedScrubberLine && cachedScrubberContent) {
          // Get positions relative to the content container
          const lineRect = cachedScrubberLine.getBoundingClientRect();
          const nodeRect = activeNode.getBoundingClientRect();
          const contentRect = cachedScrubberContent.getBoundingClientRect();
          
          // Calculate the node's center position relative to the line start
          const nodeCenterX = nodeRect.left + (nodeRect.width / 2) - lineRect.left;
          const lineWidth = lineRect.width;
          
          // Calculate progress as a percentage of the line width
          scrubberProgressValue = Math.max(0, Math.min(1, nodeCenterX / lineWidth));
        } else {
          // Fallback to marker-based calculation
          scrubberProgressValue = (2 * activeMarkerIndex + 1) / (2 * totalMarkers);
        }
      } else {
        // Fallback to marker-based calculation
        scrubberProgressValue = (2 * activeMarkerIndex + 1) / (2 * totalMarkers);
      }
    } else {
      // Cover phase or no minor nodes - use marker-based calculation
      scrubberProgressValue = (2 * activeMarkerIndex + 1) / (2 * totalMarkers);
    }

    gsap.to(scrubberProgress, {
      scaleX: scrubberProgressValue,
      transformOrigin: 'left',
      duration: 0.3,
      ease: 'power2.out',
      force3D: true, // GPU acceleration
      overwrite: 'auto' // Prevent tween buildup
    });

    // Update major markers (decades)
    // A decade marker is:
    // - "active" when ANY of its minor nodes are active
    // - "complete" when we've moved to a LATER decade (all its nodes are passed)
    if (markers.length > 0) {
      markers.forEach((marker, index) => {
        // Remove all classes first
        marker.classList.remove('active', 'complete');
        
        if (index === activeMarkerIndex) {
          // This decade contains the currently active minor node
          marker.classList.add('active');
        } else if (index < activeMarkerIndex) {
          // We've moved past this decade entirely
          marker.classList.add('complete');
        }
        // If index > activeMarkerIndex, it remains with just base .marker class (future decade)
      });
    }

    // Update minor nodes (individual events, excluding cover)
    if (minorNodes.length > 0) {
      minorNodes.forEach((node, index) => {
        // Remove all classes first
        node.classList.remove('active', 'complete');
        
        // Use the minor-index attribute which correctly tracks non-cover events
        const nodeMinorIndex = parseInt(node.getAttribute('data-minor-index') || index);
        
        if (nodeMinorIndex === activeMinorNodeIndex) {
          node.classList.add('active');
        } else if (nodeMinorIndex < activeMinorNodeIndex) {
          node.classList.add('complete');
        }
        // If nodeMinorIndex > activeMinorNodeIndex, it remains with just base .minor-node class
      });
    }

    // Auto-scroll scrubber to show active marker
    if (window.scrubberAutoScroll && !markerLock.isLocked) {
      // Determine scroll direction
      const direction = activeMarkerIndex > previousActiveMarkerIndex ? 1 : 
                       activeMarkerIndex < previousActiveMarkerIndex ? -1 : 0;
      
      window.scrubberAutoScroll(activeMarkerIndex, direction);
      
      // Update previous marker index
      previousActiveMarkerIndex = activeMarkerIndex;
    }
  };
  
  // Store reference for resize handler
  window._updateScrubber = updateScrubber;

  // Helper to calculate the timeline progress for a given marker/decade index
  const calculateProgressForMarker = (markerIndex) => {
    if (markerIndex === 0) {
      // Jump to middle of first event's hold period (Phase A)
      const phaseAMidpoint = 0.09 + (holdDuration * 0.5); // After fade-in, middle of hold
      return phaseAMidpoint / timelineTotalDuration;
    }
    
    // For subsequent decades, we need to count how many events come before this decade
    // and calculate the timeline position accordingly
    let eventsBefore = 0;
    
    for (let i = 0; i < markerIndex && i < decades.length; i++) {
      const decadeEvents = gsap.utils.toArray('.timeline-event', decades[i]);
      eventsBefore += decadeEvents.length;
    }
    
    // Get the first event of the target decade
    const targetDecade = decades[markerIndex];
    const targetDecadeEvents = gsap.utils.toArray('.timeline-event', targetDecade);
    
    if (targetDecadeEvents.length === 0) {
      logger.warn(`Decade ${markerIndex} has no events`);
      return 0;
    }
    
    // The first event of this decade is at index (eventsBefore) in the overall events array
    // After Phase A (which covers the first event), we're in Phase B
    // Each remaining event takes totalCycleDuration time units
    
    // eventsBefore includes the first event (covered in Phase A), so we need eventsBefore - 1
    const eventIndexInPhaseB = eventsBefore - 1;
    
    // Timeline position: Phase A duration + (event cycles * cycle duration) + half of hold
    const timelinePosition = phaseADuration + (eventIndexInPhaseB * totalCycleDuration) + moveDuration + (holdDuration * 0.5);
    
    return Math.min(timelinePosition / timelineTotalDuration, 0.99); // Cap at 99% to avoid edge cases
  };

  // ==========================================================================
  // HELPER: Robust pseudo-element style update function
  // Centralizes style updates to avoid fragile regex replacements
  // ==========================================================================
  const updatePseudoElementStyle = (opacity, transition = false) => {
    const styleEl = document.getElementById('timeline-window-start-bg-style');
    if (!styleEl) {
      logger.warn('[Timeline] Pseudo-element style element not found');
      return false;
    }
    
    try {
      styleEl.textContent = `
        #timeline-window-start::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -6px;
          right: -6px;
          bottom: -2px;
          background: linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164));
          border-radius: 4px;
          opacity: ${opacity};
          z-index: -1;
          pointer-events: none;
          ${transition ? 'transition: opacity 0.3s ease;' : 'transition: none !important;'}
        }
      `;
      return true;
    } catch (e) {
      logger.warn('[Timeline] Failed to update pseudo-element style:', e.message);
      return false;
    }
  };
  
  // Phase 0: Fade in background highlight after get-involved-message text is visible
  // Store reference to kill it during handoff
  const pseudoFadeTl = gsap.timeline({
    scrollTrigger: {
      trigger: timelineWindowStart,
      start: 'top 90%', // Start fade when span itself enters viewport
      end: 'top 70%',   // Complete fade quickly once visible
      scrub: 1,
      onLeaveBack: () => {
        // Fade back out the pseudo-element when scrolling up
        // Use helper function instead of fragile regex replacement
        updatePseudoElementStyle(0, false);
      }
    }
  }).to({}, {
    // Fade in the span's pseudo-element background
    duration: 1,
    ease: 'power2.out',
    onUpdate: function() {
      try {
        const progress = this.progress();
        const opacity = progress * 0.5; // 0 to 0.5
        
        // Update pseudo-element opacity via style element
        // Use helper function for more robust updates
        updatePseudoElementStyle(opacity);
      } catch (e) {
        logger.warn('[Timeline] Error updating pseudo-element style:', e.message);
      }
    }
  });

  // Capture the background's position state before pin
  let capturedPosition = null;
  
  // Store ScrollTrigger instances for potential cleanup
  const scrollTriggers = [];
  
  // Track if timeline has been dismissed
  // Store in window for global access (survives resize operations)
  // NOTE: Global flags are reset at the top of initTimelineAnimation() to prevent stale state
  // We always start fresh - the flags were already cleared above
  let isTimelineDismissed = false;
  let isDismissing = false;
  let isReEntering = false; // Track re-entry in progress
  let isBgLockedFullscreen = false; // Track when background is locked at fullscreen during re-entry
  
  function hideTimelineContainer() {
    // NEW: Fade out timeline-container first (440ms)
    gsap.to(timelineContainer, {
      opacity: 0,
      duration: 0.44,
      ease: 'power2.out',
      onComplete: () => {
        // Once the container is faded, run the rest of the dismissal
        dismissTimeline();
      }
    });
  }
  // Function to dismiss timeline and clean up
  function dismissTimeline() {
    // Set dismissing flag to lock background updates (both local and global)
    isDismissing = true;
    window._isDismissing = true;
    
    // Mark as dismissed (in memory, not session storage)
    isTimelineDismissed = true;
    window._isTimelineDismissed = true;
    
    // Remove .in-timeline class from body immediately
    document.body.classList.remove('in-timeline');
    
    // Mark as dismissed in session storage
    // COMMENTED OUT: Allow timeline to be re-entered on page refresh
    // sessionStorage.setItem('timelineDismissed', 'true');
    
    // Immediately fade out the current timeline year
    const currentYearElement = document.querySelector('#current-timeline-year');
    if (currentYearElement) {
      gsap.to(currentYearElement, {
        opacity: 0,
        duration: 0.44,
        ease: 'power2.out'
      });
    }
    
    // Restore the #timeline-window-start::before pseudo-element (like when scrolling back)
    const styleEl = document.getElementById('timeline-window-start-bg-style');
    if (styleEl) {
      styleEl.textContent = `
        #timeline-window-start::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -6px;
          right: -6px;
          bottom: -2px;
          background: linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164));
          border-radius: 4px;
          opacity: 0.5;
          z-index: -1;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
      `;
    }
    
    // Restore get-involved-message opacity
    gsap.to(getInvolvedMessage, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
    
    // Disable all ScrollTriggers (instead of kill, so we can re-enable on re-entry)
    scrollTriggers.forEach(trigger => {
      if (trigger && trigger.disable) {
        trigger.disable();
      }
    });
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === timeline || 
          trigger.vars.trigger === getInvolvedMessage ||
          trigger.vars.pin === timelineContainer) {
        trigger.disable();
      }
    });
    
    // Calculate the position where get-involved-message is centered
    const messageRect = getInvolvedMessage.getBoundingClientRect();
    const messageTop = messageRect.top + window.scrollY;
    const viewportHeight = window.innerHeight;
    const targetScroll = messageTop - (viewportHeight / 2) + (messageRect.height / 2);
    
    // Resume background animations immediately
    if (window.backgroundPaused) {
      window.backgroundPaused = false;
      window.dispatchEvent(new CustomEvent('timeline:backgroundPaused', { detail: { paused: false } }));
    }
    
    // Notify adaptive renderer we're leaving timeline (switch canvas monitoring back to background)
    if (window.shaderBackgroundRenderer && window.shaderBackgroundRenderer.setInTimeline) {
      window.shaderBackgroundRenderer.setInTimeline(false);
    }
    
    // Ensure background canvas is visible and ready
    const backgroundCanvas = document.querySelector('#background-canvas');
    if (backgroundCanvas) {
      gsap.set(backgroundCanvas, { opacity: 1 });
    }
    
    // Resume HTML background gradient (remove timeline gradient)
    const htmlElement = document.documentElement;
    htmlElement.style.background = ''; // Clear inline styles to use CSS defaults

    // Ensure background is fixed and visible (behind container initially)
    // Use cssText with !important to override ANY other styles or GSAP sets
    timelineWindowBg.style.cssText = `
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      opacity: 1 !important;
      z-index: 5 !important; /* Behind container (z-index 10) but above other content */
      background: linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164)) !important;
      pointer-events: none !important;
      visibility: visible !important;
      transform: none !important;
      transition: none !important;
    `;
    
    // Force timeline to be visible and ready for fade
    timeline.style.opacity = '1';
    timeline.style.transition = 'none';

    // 1. Fade out timeline section (350ms)
    // Use opacity to handle visibility
    gsap.to(timeline, {
      opacity: 0,
      duration: 0.44,
      ease: 'power2.inOut',
      onComplete: () => {
        // 2. Bring background to front to mask the jump
        timelineWindowBg.style.zIndex = '9999';
        
        // 3. First, scroll to a safe position at top (prevents position errors when collapsing)
        if (window.lenis) {
            window.lenis.scrollTo(0, { immediate: true, force: true, lock: true });
        } else {
            window.scrollTo(0, 0);
        }
        
        // 4. Collapse timeline (this changes page height dramatically)
        timeline.classList.add('closed');
        
        // 5. Refresh ScrollTrigger to recalculate page height WITHOUT timeline
        ScrollTrigger.refresh();
        
        // 6. NOW calculate where #get-involved-message is on the collapsed page
        const messageRect = getInvolvedMessage.getBoundingClientRect();
        const messageTop = messageRect.top + window.scrollY;
        const viewportHeight = window.innerHeight;
        const targetScrollPosition = messageTop - (viewportHeight / 2) + (messageRect.height / 2);
        
        // 7. Scroll to #get-involved-message (centered)
        if (window.lenis) {
            window.lenis.scrollTo(targetScrollPosition, { immediate: true, force: true, lock: true });
            // Force Lenis to sync
            window.lenis.resize();
            window.lenis.raf(Date.now());
        } else {
            window.scrollTo(0, targetScrollPosition);
        }
        
        // 8. Quick fade out of background (minimal delay for snappiness)
        setTimeout(() => {
          // Double-check scroll position and force update if needed
          if (window.lenis) {
            window.lenis.resize();
          }
          
          gsap.to(timelineWindowBg, {
          opacity: 0,
          duration: 0.44, // Faster fade (200ms instead of 350ms)
          ease: 'power2.inOut',
          onComplete: () => {
            // Reset background styles - clear cssText first to remove !important declarations
            timelineWindowBg.style.cssText = '';
            // Then explicitly reset individual properties
            timelineWindowBg.style.position = '';
            timelineWindowBg.style.top = '';
            timelineWindowBg.style.left = '';
            timelineWindowBg.style.width = '';
            timelineWindowBg.style.height = '';
            timelineWindowBg.style.zIndex = '';
            timelineWindowBg.style.opacity = '';
            timelineWindowBg.style.visibility = '';
            timelineWindowBg.style.background = '';
            timelineWindowBg.style.pointerEvents = '';
            timelineWindowBg.style.transform = '';
            timelineWindowBg.style.transition = '';
            timelineWindowBg.style.borderRadius = '';
            
            // Disable pointer events on timeline
            timeline.style.pointerEvents = 'none';
            
            // Remove .in-timeline class from body LAST
            document.body.classList.remove('in-timeline');
            // Reset dismissing flag (both local and global)
            isDismissing = false;
            window._isDismissing = false;
            
            // Add .active class to .re-enter-timeline button
            const reEnterButton = document.querySelector('.re-enter-timeline');
            if (reEnterButton) {
              reEnterButton.classList.add('active');
            }
          }
        });
        }, 100); // Small delay to ensure scroll completes
      }
    });
  }
  
  // Phase 1: Pin #get-involved-message and expand background when it reaches center
  // First, calculate the hold distance (33vh converted to pixels)
  const holdDistance = window.innerHeight * 0.33; // 33vh in pixels
  const expansionDistance = 600; // Original expansion scroll distance
  const totalPinDistance = holdDistance + expansionDistance; // Total scroll distance for the pin
  
  // Calculate the normalized position where expansion should start (after the hold period)
  const expansionStartPosition = holdDistance / totalPinDistance;
  
  const expansionTl = gsap.timeline({
    scrollTrigger: {
      trigger: getInvolvedMessage,
      start: 'center center', // When message reaches middle of viewport
      end: `+=${totalPinDistance}`, // Scroll distance: 33vh hold + expansion
      pin: true,
      scrub: isMobile() ? 1.5 : 1, // Higher on mobile for controlled touch scrolling
      anticipatePin: 1,
      invalidateOnRefresh: true, // Force recalculation on resize
      onRefresh: (self) => {
        // CRITICAL: Skip if timeline has been dismissed
        if (isTimelineDismissed || window._isTimelineDismissed) {
          logger.log('[Expansion] onRefresh blocked - timeline is dismissed');
          return;
        }
        
        // If re-entering, DO NOT touch the background
        if (isReEntering) {
          logger.log('[Re-entry] onRefresh blocked by isReEntering flag');
          return;
        }
        
        // CRITICAL: If background is locked at fullscreen, don't touch ANYTHING
        if (isBgLockedFullscreen) {
          logger.log('[Re-entry] onRefresh blocked by isBgLockedFullscreen flag');
          return;
        }
        
        // If already in timeline, don't touch the background at all
        if (document.body.classList.contains('in-timeline')) {
          logger.log('[Re-entry] onRefresh blocked - already in timeline');
          return;
        }
        
        // Reset captured position on resize so it gets recalculated with fresh dimensions
        capturedPosition = null;
        
        // Calculate handoff threshold (same logic as in onUpdate)
        const currentHandoffThreshold = expansionStartPosition + (0.01 * (1 - expansionStartPosition));
        
        // Get fresh position using helper
        const pos = getSpanPosition();
        
        // If we're in the middle of the animation, immediately update BG position
        // to match current timeline-window-start position
        if (self.progress > 0 && self.progress < currentHandoffThreshold) {
          // We're before handoff - ensure BG is hidden and positioned correctly
          if (pos) {
            // Position BG but keep it hidden (pseudo-element is visible)
            timelineWindowBg.style.position = 'fixed';
            timelineWindowBg.style.top = `${pos.top}px`;
            timelineWindowBg.style.left = `${pos.left}px`;
            timelineWindowBg.style.width = `${pos.width}px`;
            timelineWindowBg.style.height = `${pos.height}px`;
            timelineWindowBg.style.opacity = '0';
            timelineWindowBg.style.visibility = 'hidden';
            
            // Capture this position for when expansion starts
            capturedPosition = { ...pos };
          }
        } else if (self.progress >= currentHandoffThreshold && self.progress < 1) {
          // We're after handoff - recalculate from current state
          // The fromTo will handle this on next frame
          if (pos) {
            capturedPosition = { ...pos };
          }
        }
      },
      onUpdate: (self) => {
        // CRITICAL: Skip ALL updates if timeline has been dismissed
        if (isTimelineDismissed || window._isTimelineDismissed) return;
        
        // If dismissing or re-entering, DO NOT touch the background
        if (isDismissing || window._isDismissing || isReEntering) return;
        
        // CRITICAL: If background is locked at fullscreen, don't touch ANYTHING
        if (isBgLockedFullscreen) {
          // Force background to stay at fullscreen - protect ALL properties
          if (timelineWindowBg.style.top !== '0px' || 
              timelineWindowBg.style.left !== '0px' || 
              timelineWindowBg.style.width !== '100vw' || 
              timelineWindowBg.style.height !== '100vh' || 
              timelineWindowBg.style.opacity !== '1') {
            logger.log('[Timeline] FULLSCREEN LOCK: Re-locking background at fullscreen');
            timelineWindowBg.style.position = 'fixed';
            timelineWindowBg.style.top = '0';
            timelineWindowBg.style.left = '0';
            timelineWindowBg.style.width = '100vw';
            timelineWindowBg.style.height = '100vh';
            timelineWindowBg.style.opacity = '1';
            timelineWindowBg.style.visibility = 'visible';
            timelineWindowBg.style.display = 'block';
          }
          return; // Skip ALL other logic when locked
        }
        
        // CRITICAL: If we're already in timeline (from re-entry), don't touch ANYTHING
        if (document.body.classList.contains('in-timeline')) {
          // Just ensure background stays visible and at full opacity
          if (timelineWindowBg.style.opacity !== '1' || timelineWindowBg.style.visibility !== 'visible') {
            logger.log('[Timeline] onUpdate safety: Forcing background visible (in-timeline)');
            timelineWindowBg.style.opacity = '1';
            timelineWindowBg.style.visibility = 'visible';
            timelineWindowBg.style.display = 'block';
          }
          return; // Skip all other logic
        }
        
        // REAL-TIME visibility management - runs EVERY FRAME for instant response
        const progress = self.progress;
        // Handoff happens at the start of expansion (after the hold period)
        // Add a small buffer of 1% of the expansion phase
        const handoffThreshold = expansionStartPosition + (0.01 * (1 - expansionStartPosition));
        
        // ==========================================================================
        // CRITICAL HANDOFF CHECK (NOT THROTTLED)
        // This check runs every frame near the handoff point to ensure seamless transition
        // The ~3% failure rate may be caused by missing the exact handoff moment
        // ==========================================================================
        const isNearHandoff = Math.abs(progress - handoffThreshold) < 0.03; // Within 3% of handoff
        if (isNearHandoff) {
          // Ensure captured position is valid before handoff
          if (!capturedPosition || capturedPosition.width === 0 || capturedPosition.height === 0) {
            const freshPos = getSpanPosition();
            if (freshPos) {
              capturedPosition = { ...freshPos };
              logger.log('[Timeline] Critical handoff: Captured fresh position');
            } else {
              logger.warn('[Timeline] Critical handoff: Could not get fresh position');
            }
          }
          
          // At exact handoff moment, force visibility states
          if (progress >= handoffThreshold && progress < handoffThreshold + 0.02) {
            // Just crossed handoff - ensure BG is visible
            if (timelineWindowBg.style.visibility === 'hidden' || timelineWindowBg.style.opacity === '0') {
              timelineWindowBg.style.visibility = 'visible';
              timelineWindowBg.style.opacity = '0.5';
              logger.log('[Timeline] Critical handoff: Forced BG visible');
            }
            // Ensure pseudo is hidden
            updatePseudoElementStyle(0, false);
          }
        }
        
        // CRITICAL: Resume timeline visuals EARLY AND AGGRESSIVELY
        // But only AFTER the hold period - start when expansion begins
        // This ensures they're playing even during very slow scrolling
        // We check EVERY frame during early expansion progress to ensure they start
        const expansionProgress = Math.max(0, (progress - expansionStartPosition) / (1 - expansionStartPosition));
        if (progress >= expansionStartPosition && expansionProgress < 0.1) {
          // Check timeline shader
          if (window.timelineShaderControls && window.timelineShaderControls.resume) {
            // Try to detect if it's actually paused by checking if a resume is needed
            // The shader doesn't expose isPaused, so we just call resume (it's idempotent)
            window.timelineShaderControls.resume();
            
            if (!self._loggedShaderResume) {
              self._loggedShaderResume = true;
            }
          } else if (!self._loggedShaderMissing) {
            self._loggedShaderMissing = true;
            logger.warn('[Timeline] Timeline shader controls not available at progress:', progress.toFixed(4));
          }
          
          // Check cover orb
          if (window.coverOrbControls && window.coverOrbControls.resume) {
            window.coverOrbControls.resume();
            
            if (!self._loggedOrbResume) {
              self._loggedOrbResume = true;
            }
          } else if (!self._loggedOrbMissing) {
            self._loggedOrbMissing = true;
            logger.warn('[Timeline] Cover orb controls not available at progress:', progress.toFixed(4));
          }
        }
        
        const styleEl = document.getElementById('timeline-window-start-bg-style');
        
        // THROTTLED SAFETY CHECKS: Only run expensive DOM queries periodically to avoid layout thrashing
        // These checks use getBoundingClientRect() and getComputedStyle() which force reflow
        const now = performance.now();
        if (now - lastSafetyCheckTime >= SAFETY_CHECK_INTERVAL) {
          lastSafetyCheckTime = now;
          
          // CRITICAL SAFETY CHECK 1: If BG is full viewport size, FORCE opacity to 1.0
          const bgRect = timelineWindowBg.getBoundingClientRect();
          const isFullViewport = (
            Math.abs(bgRect.width - window.innerWidth) < 10 &&
            Math.abs(bgRect.height - window.innerHeight) < 10 &&
            Math.abs(bgRect.top) < 10 &&
            Math.abs(bgRect.left) < 10
          );
          
          if (isFullViewport) {
            // BG is full viewport - MUST be opacity 1.0
            const currentOpacity = parseFloat(timelineWindowBg.style.opacity || '0');
            if (Math.abs(currentOpacity - 1.0) > 0.01) {
              logger.log('[Timeline] SAFETY CHECK: Forcing BG to opacity 1 (was', currentOpacity, ')');
              timelineWindowBg.style.opacity = '1';
              timelineWindowBg.style.visibility = 'visible';
            }
            return; // Skip other checks when BG is full viewport
          }
          
          // CRITICAL SAFETY CHECK 2: If pseudo-element has ANY opacity, BG MUST be 0
          // This is the ultimate protection when scrolling back up
          const pseudoComputedStyle = window.getComputedStyle(timelineWindowStart, '::before');
          const pseudoOpacity = parseFloat(pseudoComputedStyle.opacity || '0');
          
          if (pseudoOpacity > 0) {
            // Pseudo-element is visible - BG MUST be hidden
            const currentBgOpacity = parseFloat(timelineWindowBg.style.opacity || '1');
            if (currentBgOpacity > 0) {
              timelineWindowBg.style.opacity = '0';
              timelineWindowBg.style.visibility = 'hidden'; // Extra safety
            }
          }
        }
        
        if (progress < handoffThreshold) {
          // IMPORTANT: If we're already in the timeline (from re-entry), don't shrink the background
          // Even if scroll progress is low, we want to keep it fullscreen
          if (document.body.classList.contains('in-timeline')) {
            // We're in timeline - keep background fullscreen and visible
            return;
          }
          
          // THROTTLED: Position updates are expensive (getBoundingClientRect)
          // Use same throttle window as safety checks to avoid double-work
          // Only run these expensive operations when the safety check also ran this frame
          const shouldRunExpensiveOps = (now - lastSafetyCheckTime < 50); // Within 50ms of last safety check
          
          if (shouldRunExpensiveOps) {
            // BEFORE handoff: Pseudo visible, BG hidden BUT positioned correctly
            // This ensures seamless handoff when expansion starts
            
            // Get current position of timeline-window-start using helper
            const pos = getSpanPosition();
            
            // Only update if we got valid position
            if (pos) {
              // Position BG element exactly where it needs to be (but keep it invisible)
              timelineWindowBg.style.position = 'fixed';
              timelineWindowBg.style.top = `${pos.top}px`;
              timelineWindowBg.style.left = `${pos.left}px`;
              timelineWindowBg.style.width = `${pos.width}px`;
              timelineWindowBg.style.height = `${pos.height}px`;
              timelineWindowBg.style.background = 'linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))';
              timelineWindowBg.style.borderRadius = '4px';
              timelineWindowBg.style.opacity = '0';
              timelineWindowBg.style.visibility = 'hidden';
              
              // Update captured position continuously during hold period
              // This ensures we always have the most recent valid position for the expansion animation
              capturedPosition = { ...pos };
            }
            
            // Use helper function for robust pseudo-element updates
            updatePseudoElementStyle(0.5, false);
          }
        } else {
          // AFTER handoff: BG visible, Pseudo hidden
          // This happens when we enter the expansion phase
          
          // IMPORTANT: If we're already in the timeline (from re-entry), keep background at full opacity
          if (document.body.classList.contains('in-timeline')) {
            // We're in timeline - ensure background stays at full viewport opacity
            if (timelineWindowBg.style.opacity !== '1') {
              timelineWindowBg.style.opacity = '1';
              timelineWindowBg.style.visibility = 'visible';
              logger.log('[Timeline] Forcing background to opacity 1 - already in timeline');
            }
          }
          
          // Hide pseudo-element using helper function
          updatePseudoElementStyle(0, false);
          
          // REMOVED: Manual opacity setting was competing with GSAP's fromTo animation
          // The GSAP timeline handles opacity from 0.5 to 1 via scrub - don't interfere
          // Only ensure visibility is set so GSAP opacity animation is visible
          if (timelineWindowBg.style.visibility !== 'visible') {
            timelineWindowBg.style.visibility = 'visible';
          }
        }
      },
      onEnter: () => {
        // Stop tracking span position updates
        isTrackingSpan = false;
        
        // Stop continuous RAF tracking since we're entering the pinned section
        stopContinuousTracking();
        
        // CRITICAL: Kill the pseudo fade timeline to prevent it from overriding our opacity
        if (pseudoFadeTl) {
          pseudoFadeTl.kill();
        }
        
        // Set initial state - pseudo-element visible, BG hidden but positioned
        // The onUpdate will handle continuous positioning during hold period
        // and the handoff will happen at handoffThreshold
        // Use helper function for robust updates
        updatePseudoElementStyle(0.5, false);
        
        // Initial positioning of BG using helper function (validates dimensions)
        // This is critical for mobile where fast scrolling might cause issues
        const pos = getSpanPosition();
        
        if (pos) {
          timelineWindowBg.style.position = 'fixed';
          timelineWindowBg.style.top = `${pos.top}px`;
          timelineWindowBg.style.left = `${pos.left}px`;
          timelineWindowBg.style.width = `${pos.width}px`;
          timelineWindowBg.style.height = `${pos.height}px`;
          timelineWindowBg.style.background = 'linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))';
          timelineWindowBg.style.borderRadius = '4px';
          timelineWindowBg.style.zIndex = '0';
          timelineWindowBg.style.opacity = '0';
          timelineWindowBg.style.visibility = 'hidden';
          
          // Store initial position
          capturedPosition = { ...pos };
        } else {
          logger.warn('[Timeline] onEnter: Could not get valid span position');
        }
      },
      onLeaveBack: () => {
        // Resume tracking span position updates
        isTrackingSpan = true;
        
        // Immediately sync BG to span position before resuming tracking
        syncBgToSpanImmediate();
        
        // Start tracking
        positionBgToSpan();
        
        // INSTANT REVERSE HANDOFF: Transfer back from BG element to pseudo-element
        // 1. INSTANTLY hide the BG element
        timelineWindowBg.style.opacity = '0';
        timelineWindowBg.style.visibility = 'hidden';
        
        // 2. INSTANTLY restore the pseudo-element background using helper function
        updatePseudoElementStyle(0.5, true); // With transition for smooth fade
        
        // 3. Keep captured position for potential re-entry, but allow fresh capture on next enter
        // Don't reset to null - keep the valid position in case of quick scroll back
      }
    }
  });
  
  // Store this ScrollTrigger for cleanup
  scrollTriggers.push(expansionTl.scrollTrigger);

  // Expand background from highlight box to full viewport
  // Starts AFTER the hold period (33vh of pinned scroll)
  // Use function to get starting values to account for captured position
  // CRITICAL: immediateRender: false prevents GSAP from evaluating "from" values at timeline creation
  // The onStart callback ensures we have correct position at the exact moment animation begins
  expansionTl.fromTo(timelineWindowBg, 
    () => {
      // Set background color once here (not animated)
      timelineWindowBg.style.background = 'linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))';
      
      // Use captured position if available, otherwise get FRESH position
      // This is critical for mobile where the element may have moved since page load
      if (capturedPosition && capturedPosition.width > 0 && capturedPosition.height > 0) {
        return {
          top: `${capturedPosition.top}px`,
          left: `${capturedPosition.left}px`,
          width: `${capturedPosition.width}px`,
          height: `${capturedPosition.height}px`
        };
      }
      
      // Fallback: get fresh position from the span
      const pos = getSpanPosition();
      if (pos) {
        // Update cached position
        capturedPosition = { ...pos };
        return {
          top: `${pos.top}px`,
          left: `${pos.left}px`,
          width: `${pos.width}px`,
          height: `${pos.height}px`
        };
      }
      
      // Last resort fallback - should never happen if element is visible
      // This is a critical failure point - log detailed telemetry
      logger.warn('[Timeline] No valid position for expansion animation - using viewport center fallback');
      
      // Dispatch telemetry event for analytics
      window.dispatchEvent(new CustomEvent('timeline:init-failed', { 
        detail: { 
          reason: 'expansion-fallback-used', 
          capturedPosition: capturedPosition,
          elementExists: !!timelineWindowStart,
          elementDimensions: timelineWindowStart ? {
            width: timelineWindowStart.offsetWidth,
            height: timelineWindowStart.offsetHeight,
            display: window.getComputedStyle(timelineWindowStart).display
          } : null,
          timestamp: Date.now()
        }
      }));
      
      const fallbackWidth = 200;
      const fallbackHeight = 40;
      return {
        top: `${(window.innerHeight - fallbackHeight) / 2}px`,
        left: `${(window.innerWidth - fallbackWidth) / 2}px`,
        width: `${fallbackWidth}px`,
        height: `${fallbackHeight}px`
      };
    },
    {
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      borderRadius: '0px',
      ease: 'power2.inOut',
      duration: 0.7,
      immediateRender: false, // CRITICAL: Don't evaluate "from" values until animation actually starts
      onStart: () => {
        // CRITICAL: At the exact moment the expansion starts, ensure BG is at correct position
        // This handles cases where capturedPosition might be stale or not yet set
        const pos = getSpanPosition();
        if (pos && capturedPosition) {
          // Check if current position differs significantly from cached
          const drift = Math.abs(pos.top - capturedPosition.top) + 
                       Math.abs(pos.left - capturedPosition.left) +
                       Math.abs(pos.width - capturedPosition.width) +
                       Math.abs(pos.height - capturedPosition.height);
          
          if (drift > 5) {
            // Position has drifted - immediately sync before animation continues
            logger.log('[Timeline] Position drift detected on expansion start, syncing:', drift.toFixed(1), 'px');
            timelineWindowBg.style.top = `${pos.top}px`;
            timelineWindowBg.style.left = `${pos.left}px`;
            timelineWindowBg.style.width = `${pos.width}px`;
            timelineWindowBg.style.height = `${pos.height}px`;
            capturedPosition = { ...pos };
          }
        }
      },
      onUpdate: () => {
        // Ensure background stays static during animation
        timelineWindowBg.style.background = 'linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))';
      },
      onReverseComplete: () => {
        // When reversing (scrolling back), set opacity back to 0 after reaching start
        timelineWindowBg.style.opacity = '0';
      }
    }, 
    expansionStartPosition
  );

  // Animate opacity separately with LINEAR easing (no curve, just straight 0.5 to 1)
  expansionTl.fromTo(timelineWindowBg,
    { opacity: 0.5 },
    {
      opacity: 1,
      duration: 0.7,
      ease: 'none' // Linear interpolation, no easing curve
    },
    expansionStartPosition
  );

  // Ensure ScrollTrigger refreshes after fonts load to prevent layout shifts affecting positions
  // Add timeout fallback in case fonts.ready never resolves (failed font load)
  if (document.fonts && document.fonts.ready) {
    let fontRefreshDone = false;
    
    const doFontRefresh = () => {
      if (fontRefreshDone) return;
      fontRefreshDone = true;
      ScrollTrigger.refresh();
    };
    
    // Primary: wait for fonts
    document.fonts.ready
      .then(doFontRefresh)
      .catch((e) => {
        logger.warn('[Timeline] Font loading failed, refreshing ScrollTrigger anyway:', e);
        doFontRefresh();
      });
    
    // Fallback: refresh after 3 seconds regardless of font state
    setTimeout(() => {
      if (!fontRefreshDone) {
        logger.warn('[Timeline] Font loading timeout after 3s, forcing ScrollTrigger refresh');
        doFontRefresh();
      }
    }, 3000);
  } else {
    // No font API available - refresh after short delay
    setTimeout(() => ScrollTrigger.refresh(), 500);
  }

  // Fade out the get-involved-message
  // Starts after the hold period + 40% into the expansion phase
  const messageFadeStart = expansionStartPosition + (0.4 * (1 - expansionStartPosition));
  expansionTl.to(getInvolvedMessage, {
    opacity: 0,
    ease: 'power2.in',
    duration: 0.6
  }, messageFadeStart);

  // PERFORMANCE: Define shader interpolation params ONCE outside the scroll loop
  // Avoids object recreation on every frame
  const shaderStartParams = {
    waveSpeed: 0.26,
    waveAmplitude: 1.9,
    waveFrequencyX: 0.16,
    waveFrequencyY: 0.32,
    bobbingAmplitude: 1.4,
    bobbingSpeed: 0.22,
    fadeIntensity: 0.86,
    opacity: 0.58,
    scale: 3.4,
    rotationX: -1.7,
    rotationZ: 0.26,
    positionY: -30.0,
    positionZ: -16.0
  };
  
  const shaderEndParams = {
    waveSpeed: 0.18,
    waveAmplitude: 5.0,
    waveFrequencyX: 0.6,
    waveFrequencyY: 1.0,
    bobbingAmplitude: 2.2,
    bobbingSpeed: 0.24,
    fadeIntensity: 0.39,
    opacity: 1.0,
    scale: 5,
    rotationX: -1.6,
    rotationZ: -1.44,
    positionY: -20.0,
    positionZ: -20.0
  };
  
  // Reusable interpolated params object to avoid allocation in scroll loop
  const interpolatedParams = {};
  
  // MOBILE OPTIMIZATION: Throttle shader interpolation updates
  let shaderInterpolationFrameCount = 0;
  const shaderInterpolationSkip = isMobile() ? 2 : 1; // Skip every other frame on mobile
  let lastShaderProgress = -1;

  // Phase 2: Master timeline for all timeline animations (starts after get-involved-message pin)
  tl = gsap.timeline({
    scrollTrigger: {
      trigger: timeline,
      start: 'top top',
      end: () => `+=${getTotalScrollDistance()}`, // Function to recalculate on resize
      pin: timelineContainer,
      // PERFORMANCE: Lower scrub values = more responsive, higher = more smooth but controlled
      // Desktop: 0.2 for snappy response
      // Mobile: 1.0 for controlled touch scrolling (prevents zooming through sections)
      scrub: isMobile() ? 1.0 : 0.2,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onRefresh: (self) => {
        // CRITICAL: Skip ALL refresh logic if timeline has been dismissed
        if (isTimelineDismissed || window._isTimelineDismissed) {
          logger.log('[Timeline] Timeline onRefresh blocked - timeline is dismissed');
          return;
        }
        
        // If dismissing or re-entering, DO NOT touch the background
        if (isDismissing || window._isDismissing || isReEntering) return;
        
        // CRITICAL: If background is locked at fullscreen, don't touch ANYTHING
        if (isBgLockedFullscreen) {
          logger.log('[Timeline] Timeline onRefresh blocked by isBgLockedFullscreen flag');
          // Still update scrubber for timeline position
          if (self.animation) {
            updateScrubber(self.animation.progress());
          }
          return;
        }
        
        // If already in timeline, minimal updates only (don't touch background)
        if (document.body.classList.contains('in-timeline')) {
          logger.log('[Timeline] Timeline onRefresh - in timeline, skipping background updates');
          // Still update scrubber for timeline position
          if (self.animation) {
            updateScrubber(self.animation.progress());
          }
          return;
        }
        
        // Called after refresh/resize - ensure animations are in correct state
        
        // Update scrubber and background state immediately
        if (self.animation) {
          updateScrubber(self.animation.progress());
          updateScrubber(self.animation.progress());
          // manageBackgroundPause(self.progress); // Removed to use strict onEnter/onLeave logic
        }
      },
      onUpdate: (self) => {
        // CRITICAL: Skip ALL updates if timeline has been dismissed
        // This prevents scroll position manipulation and rendering when user is outside timeline
        if (isTimelineDismissed || window._isTimelineDismissed) return;
        
        // PERFORMANCE: Early exit for dismissing/re-entering states (no DOM operations)
        if (isDismissing || window._isDismissing || isReEntering) return;
        
        // PERFORMANCE: Skip all DOM checks when background is locked - trust the flag
        if (isBgLockedFullscreen) return;
        
        // Use animation progress to account for scrub lag (visual position)
        const progress = self.animation.progress();
        
        // PERFORMANCE: Only update scrubber (already throttled via RAF)
        updateScrubber(progress);

        // --- Timeline Shader Interpolation ---
        // MOBILE: Disabled entirely to prevent nudging/jitter during scroll
        // DESKTOP: Only interpolate when in the final 25% of timeline
        // This avoids unnecessary calculations for 75% of the scroll
        const interpolationStart = 0.75;
        
        // Skip shader parameter interpolation on mobile - causes animation timing issues
        if (!isMobile() && progress > interpolationStart && window.timelineShaderControls && window.timelineShaderControls.updateParams) {
          // MOBILE OPTIMIZATION: Throttle shader interpolation updates
          // Skip every other frame on mobile, but still update when progress changes significantly
          shaderInterpolationFrameCount++;
          const progressDelta = Math.abs(progress - lastShaderProgress);
          const shouldUpdate = shaderInterpolationFrameCount % shaderInterpolationSkip === 0 || progressDelta > 0.01;
          
          if (!shouldUpdate) return;
          lastShaderProgress = progress;
          
          // Normalize t from 0 to 1 over the range [interpolationStart, 1.0]
          let t = (progress - interpolationStart) / (1.0 - interpolationStart);
          // Clamp t to [0, 1]
          t = Math.max(0, Math.min(1, t));
          
          // Reuse interpolatedParams object to avoid allocation
          interpolatedParams.waveSpeed = shaderStartParams.waveSpeed + (shaderEndParams.waveSpeed - shaderStartParams.waveSpeed) * t;
          interpolatedParams.waveAmplitude = shaderStartParams.waveAmplitude + (shaderEndParams.waveAmplitude - shaderStartParams.waveAmplitude) * t;
          interpolatedParams.waveFrequencyX = shaderStartParams.waveFrequencyX + (shaderEndParams.waveFrequencyX - shaderStartParams.waveFrequencyX) * t;
          interpolatedParams.waveFrequencyY = shaderStartParams.waveFrequencyY + (shaderEndParams.waveFrequencyY - shaderStartParams.waveFrequencyY) * t;
          interpolatedParams.bobbingAmplitude = shaderStartParams.bobbingAmplitude + (shaderEndParams.bobbingAmplitude - shaderStartParams.bobbingAmplitude) * t;
          interpolatedParams.bobbingSpeed = shaderStartParams.bobbingSpeed + (shaderEndParams.bobbingSpeed - shaderStartParams.bobbingSpeed) * t;
          interpolatedParams.fadeIntensity = shaderStartParams.fadeIntensity + (shaderEndParams.fadeIntensity - shaderStartParams.fadeIntensity) * t;
          interpolatedParams.opacity = shaderStartParams.opacity + (shaderEndParams.opacity - shaderStartParams.opacity) * t;
          interpolatedParams.scale = shaderStartParams.scale + (shaderEndParams.scale - shaderStartParams.scale) * t;
          interpolatedParams.rotationX = shaderStartParams.rotationX + (shaderEndParams.rotationX - shaderStartParams.rotationX) * t;
          interpolatedParams.rotationZ = shaderStartParams.rotationZ + (shaderEndParams.rotationZ - shaderStartParams.rotationZ) * t;
          interpolatedParams.positionY = shaderStartParams.positionY + (shaderEndParams.positionY - shaderStartParams.positionY) * t;
          interpolatedParams.positionZ = shaderStartParams.positionZ + (shaderEndParams.positionZ - shaderStartParams.positionZ) * t;
          
          // Update shader with interpolated values
          window.timelineShaderControls.updateParams(interpolatedParams);
        }
      },
      onEnter: () => {
        // CRITICAL: If timeline has been dismissed, DO NOT activate timeline
        // This prevents issues where scrolling down after dismissal reactivates the timeline
        if (isTimelineDismissed || window._isTimelineDismissed) {
          logger.log('[Timeline] onEnter blocked - timeline is dismissed');
          return;
        }
        
        // Add .in-timeline class to body
        document.body.classList.add('in-timeline');
        
        // Force theme-color to black to prevent Android system bars from switching to light mode
        // This overrides any automatic color extraction from the blue timeline background
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', '#000000');
        }

        // Pause regular background shader immediately when entering timeline
        if (!window.backgroundPaused) {
          window.backgroundPaused = true;
          window.dispatchEvent(new CustomEvent('timeline:backgroundPaused', { detail: { paused: true } }));
        }
        
        // Notify adaptive renderer we're entering timeline (switch canvas monitoring)
        if (window.shaderBackgroundRenderer && window.shaderBackgroundRenderer.setInTimeline) {
          window.shaderBackgroundRenderer.setInTimeline(true);
        }
        
        // Resume timeline canvases (coverOrb and shader)
        if (window.coverOrbControls && window.coverOrbControls.resume) {
          window.coverOrbControls.resume();
        }
        if (window.timelineShaderControls && window.timelineShaderControls.resume) {
          window.timelineShaderControls.resume();
        }
        
        // Clear any pending pause timeout to prevent canvases from being paused
        if (window._timelinePauseTimeout) {
          clearTimeout(window._timelinePauseTimeout);
          window._timelinePauseTimeout = null;
        }

        // Safety: force timeline container visible when entering timeline
        gsap.set(timelineContainer, {
          opacity: 1,
          display: 'block',
          pointerEvents: 'auto',
          visibility: 'visible'
        });
        
        // Safety: ensure track is visible and at starting position
        if (timelineTrack) {
          gsap.set(timelineTrack, { 
            opacity: 1, 
            visibility: 'visible',
            // Reset position if stuck off-screen (isMobile handles direction)
            clearProps: isMobile() ? 'x' : 'y'
          });
        }
        
        // Safety: ensure ALL timeline events have visibility visible
        // (opacity animation still works, but they won't be display:none or visibility:hidden)
        const allEvents = gsap.utils.toArray('.timeline-event');
        allEvents.forEach(event => {
          gsap.set(event, { visibility: 'visible', display: 'flex' });
        });
        
        // Safety: ensure the first event (cover) is visible immediately
        // This is a fallback in case GSAP animation doesn't trigger
        const coverEvent = document.querySelector('.timeline-event.timeline-cover');
        if (coverEvent) {
          gsap.set(coverEvent, { opacity: 1, scale: 1, visibility: 'visible' });
        }

        // Safety: ensure background is behind content (z-index 0)
        // This prevents the background from covering the timeline content
        timelineWindowBg.style.zIndex = '0';
        
        // Ensure background is fully visible when entering timeline proper
        gsap.to(timelineWindowBg, { opacity: 1, duration: 0.2, ease: 'none', overwrite: 'auto' });
        
        // Fade out the canvas
        const canvas = document.querySelector('#background-canvas');
        if (canvas) {
          gsap.to(canvas, { opacity: 0, duration: 0.5, ease: 'power2.inOut' });
        }
        
        // Set HTML background to timeline color (once, not animated)
        const htmlElement = document.documentElement;
        htmlElement.style.background = 'linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))';
        
        // Initialize first minor node as active and set scrubber progress
        const minorNodes = gsap.utils.toArray('.minor-node');
        const markers = gsap.utils.toArray('.marker');
        const scrubberProgress = document.querySelector('.scrubber-progress');
        
        if (minorNodes.length > 0 && scrubberProgress) {
          // Activate the first minor node (1876)
          const firstMinorNode = minorNodes[0];
          
          // Clear all active/complete states
          minorNodes.forEach(node => {
            node.classList.remove('active', 'complete');
          });
          
          // Set first node as active
          firstMinorNode.classList.add('active');
          
          // Activate the first decade marker
          if (markers.length > 0) {
            markers.forEach(marker => {
              marker.classList.remove('active', 'complete');
            });
            markers[0].classList.add('active');
          }
          
          // Set scrubber progress to align with first minor node
          const scrubberLine = document.querySelector('.scrubber-line');
          if (scrubberLine) {
            const lineRect = scrubberLine.getBoundingClientRect();
            const nodeRect = firstMinorNode.getBoundingClientRect();
            const nodeCenterX = nodeRect.left + (nodeRect.width / 2) - lineRect.left;
            const lineWidth = lineRect.width;
            const scrubberProgressValue = Math.max(0, Math.min(1, nodeCenterX / lineWidth));
            
            gsap.set(scrubberProgress, {
              scaleX: scrubberProgressValue,
              transformOrigin: 'left'
            });
            
          }
        }
        
        // Reset and hide the year display completely when entering timeline
        // The year will only show when scrolling to the first actual event after the cover
        // Get the year element
        if (!currentYearElement) {
          currentYearElement = document.querySelector('#current-timeline-year');
        }
        
        if (currentYearElement) {
          // Immediately hide and clear the year element
          gsap.set(currentYearElement, { opacity: 0 });
          
          // Clear the text content to prevent old year from showing
          currentYearElement.textContent = '';
          
          // Clean up any existing split
          if (currentYearSplit && typeof currentYearSplit.revert === 'function') {
            currentYearSplit.revert();
            currentYearSplit = null;
          }
          
          // Reset the state variables so updateScrubber will show the year when appropriate
          lastDisplayedYear = null;
          isAnimatingYear = false;
        }
      },
      onLeave: () => {
        // Remove .in-timeline class from body
        document.body.classList.remove('in-timeline');
        
        // Resume regular background shader
        if (window.backgroundPaused) {
          window.backgroundPaused = false;
          window.dispatchEvent(new CustomEvent('timeline:backgroundPaused', { detail: { paused: false } }));
        }
        
        // Notify adaptive renderer we're leaving timeline (switch canvas monitoring)
        if (window.shaderBackgroundRenderer && window.shaderBackgroundRenderer.setInTimeline) {
          window.shaderBackgroundRenderer.setInTimeline(false);
        }
        
        // Pause timeline canvases logic removed from here to prevent premature freezing.
        // It is now handled by the fade-out trigger's onLeave callback.
        
        // Fade canvas back in
        const canvas = document.querySelector('#background-canvas');
        if (canvas) {
          gsap.to(canvas, { opacity: 1, duration: 0.5, ease: 'power2.inOut' });
        }
        
        // Restore HTML background (remove inline style to use CSS default)
        const htmlElement = document.documentElement;
        gsap.to(htmlElement, {
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: function() {
            htmlElement.style.background = '';
          }
        });
      },
      onLeaveBack: () => {
        
        // Remove .in-timeline class from body
        document.body.classList.remove('in-timeline');

        // Resume regular background shader
        if (window.backgroundPaused) {
          window.backgroundPaused = false;
          window.dispatchEvent(new CustomEvent('timeline:backgroundPaused', { detail: { paused: false } }));
        }
        
        // Notify adaptive renderer we're leaving timeline (switch canvas monitoring)
        if (window.shaderBackgroundRenderer && window.shaderBackgroundRenderer.setInTimeline) {
          window.shaderBackgroundRenderer.setInTimeline(false);
        }
        
        // Pause timeline canvases to save performance (with delay to prevent freeze during fade)
        // Store timeout so it can be cleared if user re-enters
        const pauseTimeout = setTimeout(() => {
          // Safety check: only pause if we're actually still outside the timeline
          // Check if body still doesn't have .in-timeline class
          if (!document.body.classList.contains('in-timeline')) {
            if (window.coverOrbControls && window.coverOrbControls.pause) {
              window.coverOrbControls.pause();
            }
            if (window.timelineShaderControls && window.timelineShaderControls.stop) {
              window.timelineShaderControls.stop();
            }
          } else {
          }
        }, 1000); // 1s delay to allow fade out to complete
        
        // Store timeout ID so it can be cleared if needed
        window._timelinePauseTimeout = pauseTimeout;
        
        // Reset and hide the year display completely when leaving timeline upward
        if (!currentYearElement) {
          currentYearElement = document.querySelector('#current-timeline-year');
        }
        
        if (currentYearElement) {
          // Immediately hide and clear the year element
          gsap.set(currentYearElement, { opacity: 0 });
          currentYearElement.textContent = '';
          
          // Clean up any existing split
          if (currentYearSplit && typeof currentYearSplit.revert === 'function') {
            currentYearSplit.revert();
            currentYearSplit = null;
          }
          
          // Reset the state variables
          lastDisplayedYear = null;
          isAnimatingYear = false;
        }
      },
      onEnterBack: () => {
        // CRITICAL: If timeline has been dismissed, DO NOT activate timeline on scroll up
        // This prevents the bug where scrolling up from below the timeline causes a jump back
        if (isTimelineDismissed || window._isTimelineDismissed) {
          logger.log('[Timeline] onEnterBack blocked - timeline is dismissed');
          return;
        }
        
        // Add .in-timeline class to body
        document.body.classList.add('in-timeline');
        
        // Pause regular background shader when re-entering timeline
        if (!window.backgroundPaused) {
          window.backgroundPaused = true;
          window.dispatchEvent(new CustomEvent('timeline:backgroundPaused', { detail: { paused: true } }));
        }
        
        // Notify adaptive renderer we're re-entering timeline (switch canvas monitoring)
        if (window.shaderBackgroundRenderer && window.shaderBackgroundRenderer.setInTimeline) {
          window.shaderBackgroundRenderer.setInTimeline(true);
        }
        
        // Resume timeline canvases (coverOrb and shader)
        if (window.coverOrbControls && window.coverOrbControls.resume) {
          window.coverOrbControls.resume();
        }
        if (window.timelineShaderControls && window.timelineShaderControls.resume) {
          window.timelineShaderControls.resume();
        }
        
        // Clear any pending pause timeout to prevent canvases from being paused
        if (window._timelinePauseTimeout) {
          clearTimeout(window._timelinePauseTimeout);
          window._timelinePauseTimeout = null;
        }

        // Safety: force timeline container visible when re-entering timeline
        gsap.set(timelineContainer, {
          opacity: 1,
          display: 'block',
          pointerEvents: 'auto',
          visibility: 'visible'
        });
        
        // Safety: ensure track is visible
        if (timelineTrack) {
          gsap.set(timelineTrack, { 
            opacity: 1, 
            visibility: 'visible'
          });
        }
        
        // Safety: ensure ALL timeline events have visibility visible
        const allEventsBack = gsap.utils.toArray('.timeline-event');
        allEventsBack.forEach(event => {
          gsap.set(event, { visibility: 'visible', display: 'flex' });
        });

        // Safety: ensure background is behind content
        timelineWindowBg.style.zIndex = '0';
        
        // Ensure background is visible when re-entering timeline from below
        gsap.to(timelineWindowBg, { opacity: 1, duration: 0.2, ease: 'none', overwrite: 'auto' });
        
        // Fade out the canvas
        const canvas = document.querySelector('#background-canvas');
        if (canvas) {
          gsap.to(canvas, { opacity: 0, duration: 0.5, ease: 'power2.inOut' });
        }
        
        // Set HTML background to timeline color (once, not animated)
        const htmlElement = document.documentElement;
        htmlElement.style.background = 'linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))';
      }
    }
  });
  
  // Store this ScrollTrigger for cleanup
  scrollTriggers.push(tl.scrollTrigger);

  // Fade in visual elements (start of pinned timeline)
  tl.fromTo(
    '.timeline-scrubber',
    {
      opacity: 0,
      y: 30
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.05,
      ease: 'power2.out',
      force3D: true
    },
    0
  );

  // Fade in scrubber nav elements at the same time
  tl.to(
    '.scrubber-nav',
    {
      opacity: 1,
      duration: 0.05,
      ease: 'power2.out',
      force3D: true
    },
    0
  );

  // Fade in shader background
  tl.to(timelineWindowBg, {
    '--decal-opacity': 1,
    duration: 0.5,
    ease: 'power2.out',
    onUpdate: function() {
      const opacityValue = gsap.getProperty(timelineWindowBg, '--decal-opacity') || 0;
      timelineWindowBg.style.setProperty('--decal-opacity', opacityValue);
    }
  }, 0.01);

  // Handle timeline events
  if (events.length > 0) {
    const firstEvent = events[0];
    const remainingEvents = events.slice(1);
    const firstEventLabel = 'first-event';
    
    // Phase A: First event (1876) - Pinned in center
    // Start hidden and fade in "in place" as user scrolls
    tl.add(firstEventLabel, 0);
    tl.fromTo(firstEvent, 
      { 
        opacity: 0, 
        scale: 0.95 
      },
      { 
        opacity: 1, 
        scale: 1,
        duration: 0.25, // Quicker fade in for snappier feel
        ease: 'power2.out',
        force3D: true // GPU acceleration
      },
      firstEventLabel // Start immediately at the beginning of the pinned section
    );

    // Animate inner content for the first event with a slight offset
    animateEventContent(firstEvent, firstEventLabel, moveDuration * 0.05);
    
    // Hold first event visible
    tl.to({}, { duration: holdDuration }, '>');
    
    // Background decal will fade in after timeline cover (moved below)
    
    // NOTE: We don't fade out first event here anymore, 
    // it will fade out as part of the main loop transition
    
    // Phase B: Horizontal scrolling loop
    // We chain movements and holds
    
    // Initial accumulated duration (after Phase A)
    // GSAP timelines append automatically, so we just add to the timeline
    
      remainingEvents.forEach((event, index) => {
      // Calculate target position to center this event
      // Desktop: Move X (horizontal) - events are dynamically sized
      // With 100vw padding and variable event width:
      // Event i starts at (100vw + sum of previous event widths), center at that + (eventWidth / 2)
      // To center at viewport center (50vw): calculate accumulated width offset
      // Mobile: Move Y (vertical)
      const isMobile = () => window.matchMedia("(max-width: 1024px)").matches;
      
      const getTargetX = () => {
        if (isMobile()) return 0;
        
        // Calculate accumulated width of all previous events (including cover)
        // Cover event is 100vw, plus index regular events
        const eventWidth = getEventWidth();
        const coverWidth = window.innerWidth; // Cover is always 100vw
        const viewportCenter = window.innerWidth * 0.5;
        
        // Position calculation:
        // - Start with 100vw padding
        // - Add cover event width (100vw) 
        // - Add (index) event widths for events before this one
        // - Add half of current event width to get its center
        // - Subtract viewport center to center it on screen
        const eventCenter = coverWidth + (index * eventWidth) + (eventWidth * 0.5);
        return viewportCenter - eventCenter;
      };
      
      // Use string-based vh units for mobile to avoid drifting calculations when window.innerHeight changes (address bar)
      // This forces the browser to align with CSS 100vh elements
      const getTargetY = () => isMobile() ? `${-(index + 1) * 100}vh` : 0;
      
      const eventLabel = `event-${index}`;
      
      // 1. Move Track - GPU accelerated for smooth 60fps
      tl.to(timelineTrack, {
        x: getTargetX,
        y: getTargetY,
        duration: moveDuration,
        ease: 'power1.inOut',
        force3D: true // GPU acceleration - critical for smooth horizontal scroll
      }, eventLabel);
      
      // 2. Handle Opacity during Move
      
      // Fade Out Previous Event (or Cover Event if index is 0)
      const prevEvent = index === 0 ? firstEvent : remainingEvents[index - 1];
      
      // Fade out starting a bit earlier to give more transition time with 50vw events
      // Start fading out at 40% of movement, end at 85%
      tl.to(prevEvent, {
        opacity: 0,
        scale: 0.94,
        duration: moveDuration * 0.28,
        ease: 'power1.in',
        force3D: true // GPU acceleration
      }, `${eventLabel}+=${moveDuration * 0.34}`);
      
      // Fade In Current Event
      // With 50vw events, start fading in as soon as movement begins (when entering viewport)
      // Start fading in at 0% of movement (immediately), end at 70%
      // This creates overlap where both events are visible as we transition
      tl.fromTo(event, {
        opacity: 0,
        scale: 0.9
      }, {
        opacity: 1,
        scale: 1,
        duration: moveDuration * 1.15,
        ease: 'power2.out',
        force3D: true // GPU acceleration
      }, `${eventLabel}+=${moveDuration * 0.1}`);

      // Animate inner content for each event as it enters
      animateEventContent(event, eventLabel, moveDuration * 0.12);
      
      // When transitioning from cover (first event) to first remaining event,
      // fade in the close button and background decal simultaneously
      if (index === 0) {
        // Fade in close button as we move past the cover
        tl.fromTo('.timeline-close', {
          opacity: 0
        }, {
          opacity: 1,
          duration: moveDuration * 0.5,
          ease: 'power2.out',
          force3D: true
        }, `${eventLabel}+=${moveDuration * 0.3}`);
        
        // Background decal fade-in moved to start of timeline (alongside coverOrb)
      }
      
      // 3. Hold
      tl.to({}, { duration: holdDuration });
      
      // Calculate the timeline progress where this event is centered (middle of hold)
      // We need this for the scrubber update logic
      // Note: This is approximate as we don't know the exact total duration yet
      // so we store the *relative* position in the timeline structure
      // event.dataset.timelineRef = tl.duration(); // This gets current end
      // Instead, we'll calculate it based on uniform durations in updateTimelineScrubber
    });
  }

  // Add close button functionality
  const closeButton = timeline.querySelector('.timeline-close');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      hideTimelineContainer();
    });
  }

  // Function to generate minor nodes for individual events within decades
  function generateMinorNodes() {
    const markers = gsap.utils.toArray('.marker');
    
    if (!markers.length || !decades.length) {
      logger.warn('Timeline: Markers or decades not found');
      return;
    }

    let globalEventIndex = 0;
    let minorNodeIndex = 0; // Separate index for minor nodes (excludes cover)

    // Iterate through each decade and its marker
    decades.forEach((decade, decadeIndex) => {
      const decadeName = decade.getAttribute('data-decade');
      const decadeEvents = gsap.utils.toArray('.timeline-event', decade);
      
      // Find the corresponding marker for this decade
      const marker = markers.find(m => m.getAttribute('data-decade') === decadeName);
      if (!marker) {
        logger.warn(`Timeline: No marker found for decade ${decadeName}`);
        return;
      }

      // Find the minor nodes container within this marker
      const minorNodesContainer = marker.querySelector('.marker-minor-nodes');
      if (!minorNodesContainer) {
        logger.warn(`Timeline: No minor nodes container found for decade ${decadeName}`);
        return;
      }

      // Clear any existing minor nodes
      minorNodesContainer.innerHTML = '';

      // Extract decade start year from decade name (e.g., "1870s" -> 1870)
      const decadeStartYear = parseInt(decadeName) || 0;
      
      // Generate minor nodes for each event in this decade
      decadeEvents.forEach((event, localEventIndex) => {
        // Skip the timeline cover event (no minor node needed)
        const isCoverEvent = event.classList.contains('timeline-cover');
        
        if (isCoverEvent) {
          globalEventIndex++;
          return; // Skip this event, don't create a minor node
        }

        // Calculate progress for this event (same logic as main timeline)
        const eventProgress = globalEventIndex === 0 
          ? (0.09 + (holdDuration * 0.5)) / timelineTotalDuration
          : (phaseADuration + ((globalEventIndex - 1) * totalCycleDuration) + moveDuration + (holdDuration * 0.5)) / timelineTotalDuration;

        // Get event year for label and positioning
        const eventYearStr = event.getAttribute('data-year') || '';
        
        // Parse the year from the event (handle formats like "1924", "April 6, 1876", "January, 1907")
        let eventYear = 0;
        const yearMatch = eventYearStr.match(/\d{4}/);
        if (yearMatch) {
          eventYear = parseInt(yearMatch[0]);
        }
        
        // Calculate year-accurate position within the decade (0-1 range)
        // For example: 1924 in 1920s = (1924 - 1920) / 10 = 0.4 (40% through decade)
        let yearPositionInDecade = 0;
        if (eventYear > 0 && decadeStartYear > 0) {
          yearPositionInDecade = (eventYear - decadeStartYear) / 10;
          // Clamp to 0-1 range
          yearPositionInDecade = Math.max(0, Math.min(0.95, yearPositionInDecade));
        }

        // Create minor node element
        const minorNode = document.createElement('div');
        minorNode.className = 'minor-node';
        minorNode.setAttribute('data-event-index', globalEventIndex); // Actual event index in timeline
        minorNode.setAttribute('data-minor-index', minorNodeIndex); // Index among minor nodes only
        minorNode.setAttribute('data-decade-index', decadeIndex);
        minorNode.setAttribute('data-local-index', localEventIndex);
        minorNode.setAttribute('data-year', eventYearStr);
        minorNode.setAttribute('data-year-numeric', eventYear.toString());
        minorNode.setAttribute('data-year-position', yearPositionInDecade.toFixed(3));

        // Create dot
        const dot = document.createElement('div');
        dot.className = 'minor-node-dot';
        minorNode.appendChild(dot);

        // Create label (only show year, hidden by default)
        if (eventYearStr) {
          const label = document.createElement('div');
          label.className = 'minor-node-label';
          label.textContent = eventYearStr;
          minorNode.appendChild(label);
        }

        // Position the minor node based on its year within the decade
        // The container spans the gap between markers, so we position as percentage
        // Calculate position dynamically after markers are laid out
        requestAnimationFrame(() => {
          const markerRect = marker.getBoundingClientRect();
          const markers = gsap.utils.toArray('.marker');
          const nextMarkerIndex = decadeIndex + 1;
          
          if (nextMarkerIndex < markers.length) {
            const nextMarker = markers[nextMarkerIndex];
            const nextMarkerRect = nextMarker.getBoundingClientRect();
            
            // Calculate the gap between this marker and the next
            const gapStart = markerRect.right;
            const gapEnd = nextMarkerRect.left;
            const gapWidth = gapEnd - gapStart;
            
            // Position based on year within decade
            // Add offset from marker to avoid overlap, plus additional left padding
            const offsetFromMarker = 30; // Base offset from marker edge
            const leftPadding = 20; // Additional padding to prevent overlap with marker dot
            const availableWidth = gapWidth - offsetFromMarker - leftPadding;
            
            // Position uses the padded range, so even 0% position has spacing
            const positionInGap = offsetFromMarker + leftPadding + (availableWidth * yearPositionInDecade);
            
            minorNode.style.left = `${positionInGap}px`;

          } else {
            // Last decade - position based on percentage of expected gap
            const viewportWidth = window.innerWidth;
            const padding = viewportWidth > 768 ? 120 : 100;
            // Adjust markers per view: 5 on desktop, 4 on tablet, 2 on small mobile (< 640px)
            const markersPerView = viewportWidth > 768 ? 5 : (viewportWidth < 640 ? 2 : 4);
            const estimatedGap = (viewportWidth - padding) / markersPerView;
            
            const offsetFromMarker = 30;
            const leftPadding = 20; // Additional padding to prevent overlap with marker dot
            const availableWidth = estimatedGap - offsetFromMarker - leftPadding;
            const positionInGap = offsetFromMarker + leftPadding + (availableWidth * yearPositionInDecade);
            
            minorNode.style.left = `${positionInGap}px`;
          }
        });

        // Add click handler to scroll to this specific event
        minorNode.addEventListener('click', (e) => {
          e.stopPropagation(); // Prevent marker click from firing
          
          // Lock the scrubber to prevent auto-updates during scroll
          markerLock.isLocked = true;
          markerLock.reason = 'minor-node-click';

          // Clear any existing unlock timer
          if (markerLock.unlockTimer) {
            clearTimeout(markerLock.unlockTimer);
          }
          
          // Immediately update the active state of all nodes
          const allMinorNodes = gsap.utils.toArray('.minor-node');
          allMinorNodes.forEach((node) => {
            node.classList.remove('active', 'complete');
            const nodeMinorIndex = parseInt(node.getAttribute('data-minor-index') || '0');
            
            if (nodeMinorIndex < minorNodeIndex) {
              node.classList.add('complete');
            } else if (nodeMinorIndex === minorNodeIndex) {
              node.classList.add('active');
            }
          });
          
          // Update decade markers based on the clicked minor node
          const allMarkers = gsap.utils.toArray('.marker');
          allMarkers.forEach((m, i) => {
            m.classList.remove('active', 'complete');
            if (i === decadeIndex) {
              m.classList.add('active');
            } else if (i < decadeIndex) {
              m.classList.add('complete');
            }
          });
          
          // Update scrubber progress to align with clicked minor node
          const scrubberProgress = document.querySelector('.scrubber-progress');
          if (scrubberProgress) {
            const scrubberLine = document.querySelector('.scrubber-line');
            if (scrubberLine) {
              const lineRect = scrubberLine.getBoundingClientRect();
              const nodeRect = minorNode.getBoundingClientRect();
              const nodeCenterX = nodeRect.left + (nodeRect.width / 2) - lineRect.left;
              const lineWidth = lineRect.width;
              const scrubberProgressValue = Math.max(0, Math.min(1, nodeCenterX / lineWidth));
              
              gsap.to(scrubberProgress, {
                scaleX: scrubberProgressValue,
                transformOrigin: 'left',
                duration: 0.3,
                ease: 'power2.out'
              });
            }
          }

          // Calculate the scroll position for this event
          const scrollTriggerInstance = tl.scrollTrigger;
          if (!scrollTriggerInstance) return;

          const start = scrollTriggerInstance.start;
          const end = scrollTriggerInstance.end;
          const scrollDistance = end - start;
          const targetScroll = start + (scrollDistance * eventProgress);

          // Smooth scroll to the target position
          if (window.lenis) {
            window.lenis.scrollTo(targetScroll, {
              duration: 1.0,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              onComplete: () => {
                markerLock.unlockTimer = setTimeout(() => {
                  markerLock.isLocked = false;
                  markerLock.targetIndex = -1;
                  markerLock.reason = '';
                }, 500);
              }
            });
          } else {
            window.scrollTo({
              top: targetScroll,
              behavior: 'smooth'
            });

            markerLock.unlockTimer = setTimeout(() => {
              markerLock.isLocked = false;
              markerLock.targetIndex = -1;
              markerLock.reason = '';
            }, 1500);
          }
        });

        minorNodesContainer.appendChild(minorNode);
        globalEventIndex++;
        minorNodeIndex++; // Increment minor node index
      });

      const minorNodesCreated = decadeEvents.filter(e => !e.classList.contains('timeline-cover')).length;
    });
  }

  // Generate minor nodes for individual events
  generateMinorNodes();
  
  // Store reference for resize handler
  window._generateMinorNodes = generateMinorNodes;

  // Function to initialize scrubber horizontal scrolling with nav arrows
  function initScrubberScrolling() {
    const scrollWrapper = document.querySelector('.scrubber-scroll-wrapper');
    const prevButton = document.querySelector('.scrubber-nav-prev');
    const nextButton = document.querySelector('.scrubber-nav-next');
    const markers = gsap.utils.toArray('.marker');

    if (!scrollWrapper || !prevButton || !nextButton) {
      logger.warn('Timeline: Scrubber scroll elements not found');
      return;
    }

    // Update nav button states based on scroll position
    function updateNavButtons() {
      const scrollLeft = scrollWrapper.scrollLeft;
      const maxScroll = scrollWrapper.scrollWidth - scrollWrapper.clientWidth;

      // Disable prev if at start
      if (scrollLeft <= 10) {
        prevButton.classList.add('disabled');
      } else {
        prevButton.classList.remove('disabled');
      }

      // Disable next if at end
      if (scrollLeft >= maxScroll - 10) {
        nextButton.classList.add('disabled');
      } else {
        nextButton.classList.remove('disabled');
      }
    }

    // Scroll to a specific marker (centering it in view)
    function scrollToMarker(markerIndex) {
      if (markerIndex < 0 || markerIndex >= markers.length) return;

      const marker = markers[markerIndex];
      const markerRect = marker.getBoundingClientRect();
      const wrapperRect = scrollWrapper.getBoundingClientRect();
      
      // Calculate offset to center the marker
      const markerCenter = marker.offsetLeft + (markerRect.width / 2);
      const wrapperCenter = scrollWrapper.clientWidth / 2;
      const targetScroll = markerCenter - wrapperCenter;

      scrollWrapper.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth'
      });
    }

    // Scroll by multiple markers (dynamically calculated)
    function scrollByMarker(direction) {
      // Calculate dynamic gap based on viewport (matches CSS calculation)
      const viewportWidth = window.innerWidth;
      const padding = viewportWidth > 768 ? 120 : 100; // Match CSS padding
      // Adjust markers per view: 5 on desktop, 4 on tablet, 2 on small mobile (< 640px)
      const markersPerView = viewportWidth > 768 ? 5 : (viewportWidth < 640 ? 2 : 4);
      const dynamicGap = (viewportWidth - padding) / markersPerView;
      
      // Scroll amount = (gap + approximate marker width) * 3 for faster navigation
      const scrollAmount = (dynamicGap + 60) * 3;
      const targetScroll = scrollWrapper.scrollLeft + (scrollAmount * direction);

      scrollWrapper.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth'
      });
    }

    // Nav button click handlers
    prevButton.addEventListener('click', () => {
      scrollByMarker(-1);
    });

    nextButton.addEventListener('click', () => {
      scrollByMarker(1);
    });

    // Update button states on scroll
    scrollWrapper.addEventListener('scroll', updateNavButtons);

    // Initial button state
    updateNavButtons();

    // --- Mouse Drag Functionality ---
    let isDown = false;
    let startX;
    let scrollLeft;

    scrollWrapper.style.cursor = '';
    scrollWrapper.style.userSelect = 'none'; // Prevent text selection

    scrollWrapper.addEventListener('mousedown', (e) => {
      isDown = true;
      scrollWrapper.classList.add('active');
      scrollWrapper.style.cursor = 'grabbing';
      startX = e.pageX - scrollWrapper.offsetLeft;
      scrollLeft = scrollWrapper.scrollLeft;
    });

    scrollWrapper.addEventListener('mouseleave', () => {
      isDown = false;
      scrollWrapper.classList.remove('active');
      scrollWrapper.style.cursor = '';
    });

    scrollWrapper.addEventListener('mouseup', () => {
      isDown = false;
      scrollWrapper.classList.remove('active');
      scrollWrapper.style.cursor = '';
    });

    scrollWrapper.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollWrapper.offsetLeft;
      const walk = (x - startX) * 1.5; // Scroll speed multiplier
      scrollWrapper.scrollLeft = scrollLeft - walk;
    });

    // Auto-scroll based on active marker (called from updateScrubber)
    // direction: 1 = forward, -1 = backward, 0 = no change
    window.scrubberAutoScroll = (activeMarkerIndex, direction = 0) => {
      // Only auto-scroll if marker is valid
      if (activeMarkerIndex < 0 || activeMarkerIndex >= markers.length) return;

      const marker = markers[activeMarkerIndex];
      const markerRect = marker.getBoundingClientRect();
      const wrapperRect = scrollWrapper.getBoundingClientRect();

      // Calculate viewport boundaries (accounting for nav buttons)
      const leftBoundary = wrapperRect.left + 100;  // Left edge + nav button + padding
      const rightBoundary = wrapperRect.right - 100; // Right edge - nav button - padding

      // Check if marker is fully visible with comfortable margins
      const isFullyVisible = 
        markerRect.left >= leftBoundary && 
        markerRect.right <= rightBoundary;

      // Check if we're approaching the edges (one marker away)
      let shouldScroll = false;
      let targetMarkerIndex = activeMarkerIndex;

      if (!isFullyVisible) {
        // Marker is not visible - scroll to it
        shouldScroll = true;
      } else {
        // Marker is visible - check if we need proactive scrolling based on direction
        
        if (direction > 0) {
          // Moving forward - check if next marker needs to come into view
          if (activeMarkerIndex + 1 < markers.length) {
            const nextMarker = markers[activeMarkerIndex + 1];
            const nextMarkerRect = nextMarker.getBoundingClientRect();
            
            // If next marker is partially cut off or outside, scroll forward
            if (nextMarkerRect.right > rightBoundary || nextMarkerRect.left > rightBoundary) {
              shouldScroll = true;
              targetMarkerIndex = activeMarkerIndex + 1; // Scroll to show next marker
            }
          }
        } else if (direction < 0) {
          // Moving backward - check if previous marker needs to come into view
          if (activeMarkerIndex - 1 >= 0) {
            const prevMarker = markers[activeMarkerIndex - 1];
            const prevMarkerRect = prevMarker.getBoundingClientRect();
            
            // If previous marker is partially cut off or outside, scroll backward
            if (prevMarkerRect.left < leftBoundary || prevMarkerRect.right < leftBoundary) {
              shouldScroll = true;
              targetMarkerIndex = activeMarkerIndex - 1; // Scroll to show previous marker
            }
          }
        }
      }

      if (shouldScroll) {
        // Scroll to center the target marker
        scrollToMarker(targetMarkerIndex);
      }
    };
  }

  // Initialize scrubber scrolling functionality
  initScrubberScrolling();

  // Add click handlers to timeline scrubber markers
  const markers = gsap.utils.toArray('.marker');
  markers.forEach((marker, index) => {
    marker.addEventListener('click', () => {
      // Very short lock just to prevent interference during scroll start
      markerLock.isLocked = true;
      markerLock.targetIndex = index;
      markerLock.reason = 'click';
      
      // Clear any existing unlock timer
      if (markerLock.unlockTimer) {
        clearTimeout(markerLock.unlockTimer);
      }
      
      // Unlock quickly - let updateScrubber handle the state during scroll
      markerLock.unlockTimer = setTimeout(() => {
        markerLock.isLocked = false;
        markerLock.targetIndex = -1;
        markerLock.reason = '';
      }, 100); // Very short delay
      
      // Calculate the target progress for this marker
      const targetProgress = calculateProgressForMarker(index);
      
      // Get the ScrollTrigger instance
      const scrollTriggerInstance = tl.scrollTrigger;
      if (!scrollTriggerInstance) return;
      
      // Calculate the scroll position from the progress
      const start = scrollTriggerInstance.start;
      const end = scrollTriggerInstance.end;
      const scrollDistance = end - start;
      const targetScroll = start + (scrollDistance * targetProgress);
      
      // Smooth scroll to the target position
      // updateScrubber will handle all state updates during the scroll
      if (window.lenis) {
        window.lenis.scrollTo(targetScroll, { 
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // easeOutExpo
        });
      } else {
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
      }
    });
    
    // Add hover cursor style
    marker.style.cursor = 'pointer';
  });

  // Fade out timeline elements when bottom of #acs-timeline passes above bottom of viewport
  gsap.timeline({
    scrollTrigger: {
      trigger: timeline,
      start: 'bottom bottom', // When bottom of timeline reaches bottom of viewport
      end: 'bottom 80%',       // Fast fade out (20% of viewport travel)
      scrub: 1,
      onEnterBack: () => {
        // Fade back in when scrolling back up
        gsap.to([timelineWindowBg, timeline], {
          opacity: 1,
          duration: 0.3
        });
      },
      onLeave: () => {
         // User requested shader to be running "just after" leaving. 
         // Removed explicit pause here. Ideally, we rely on a much later cleanup or the fact 
         // that it's off-screen and eventually might be paused by other mechanisms if needed.
         // For now, ensuring it runs provides the requested smoothness.
      }
    }
  }).to([timelineWindowBg, timeline], {
    opacity: 0,
    ease: 'power2.in'
  });

  // Handle resize to keep user on the same event
  ScrollTrigger.addEventListener('refreshInit', () => {
    // Store the current active event index before refresh
  });

  ScrollTrigger.addEventListener('refresh', () => {
    // Restore position to the active event
    if (currentActiveEventIndex > 0) {
        // Calculate scroll position for this event
        // We use the label associated with the event move
        // The label is 'event-{index-1}' because remainingEvents starts at global index 1
        const labelIndex = currentActiveEventIndex - 1;
        const label = `event-${labelIndex}`;
        
        if (tl.labels[label] !== undefined) {
             const labelTime = tl.labels[label];
             // Target the end of the move (start of hold) to center the event
             const targetTime = labelTime + moveDuration;
             const progress = targetTime / tl.duration();
             
             // Calculate scroll position
             const st = tl.scrollTrigger;
             if (st) {
               const scrollPos = st.start + progress * (st.end - st.start);
               
               // Scroll there immediately
               window.scrollTo(0, scrollPos);
             }
        }
    }
  });

  // Store cleanup references and positioning utilities
  window._timelineCleanup = {
    rafId: rafId,
    resizeObserver: resizeObserver,
    stopTracking: stopContinuousTracking
  };
  
  // Store all ScrollTriggers for proper cleanup
  window._timelineScrollTriggers = scrollTriggers.slice(); // Copy array
  if (trackingScrollTrigger) {
    window._timelineScrollTriggers.push(trackingScrollTrigger);
  }
  if (pseudoFadeTl && pseudoFadeTl.scrollTrigger) {
    window._timelineScrollTriggers.push(pseudoFadeTl.scrollTrigger);
  }
  if (expansionTl && expansionTl.scrollTrigger) {
    window._timelineScrollTriggers.push(expansionTl.scrollTrigger);
  }
  if (tl && tl.scrollTrigger) {
    window._timelineScrollTriggers.push(tl.scrollTrigger);
  }
  
  // Expose positioning function and state for resize handling
  window._timelinePositioning = {
    positionBgToSpan: positionBgToSpan,
    // syncBgToSpanImmediate bypasses isTrackingSpan check - use for resize events
    syncBgToSpanImmediate: syncBgToSpanImmediate,
    resetCapturedPosition: () => {
      capturedPosition = null;
      lastPosition = { top: 0, left: 0, width: 0, height: 0 };
      targetPosition = { top: 0, left: 0, width: 0, height: 0 };
    },
    // Expose isTrackingSpan state for resize handling
    setTrackingSpan: (value) => {
      isTrackingSpan = value;
    },
    getTrackingSpan: () => isTrackingSpan
  };

  // Store ScrollTrigger and markerLock references for resize handling
  if (tl.scrollTrigger) {
    resizeState.timelineScrollTrigger = tl.scrollTrigger;
  }
  resizeState.markerLockRef = markerLock; // Store reference to markerLock for resize handlers

  // Force a refresh to ensure subsequent ScrollTriggers (like sliding cards) 
  // recalculate their positions after the timeline pin is set up
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });

  return tl;
}

// Handle window resize - recalculate dimensions while preserving timeline position
let resizeState = {
  isResizing: false,
  savedProgress: null,
  savedActiveEvent: null,
  savedActiveDecade: null,
  timelineScrollTrigger: null,
  markerLockRef: null // Reference to the markerLock object from initTimelineAnimation
};

function captureTimelineState() {
  // Only capture state if we're within the timeline section
  // Safely access resizeState properties
  const timelineScrollTrigger = (typeof resizeState !== 'undefined' && resizeState) ? resizeState.timelineScrollTrigger : null;
  if (!timelineScrollTrigger || !timelineScrollTrigger.isActive) {
    return null;
  }
  
  const progress = timelineScrollTrigger.progress;
  
  // Find which event is currently visible/active
  const events = gsap.utils.toArray('.timeline-event');
  const decades = gsap.utils.toArray('.timeline-decade');
  const markers = gsap.utils.toArray('.marker');
  
  let activeEventIndex = 0;
  let activeDecadeIndex = 0;
  let activeMarkerIndex = -1;
  
  // Capture the currently active marker from the DOM (most accurate)
  markers.forEach((marker, index) => {
    if (marker.classList.contains('active')) {
      activeMarkerIndex = index;
    }
  });
  
  // Use the same logic as updateScrubber to determine active event
  const totalEvents = events.length;
  if (totalEvents > 0 && progress > 0) {
    // Simple estimation: progress maps to event index
    activeEventIndex = Math.min(
      Math.floor(progress * totalEvents),
      totalEvents - 1
    );
    
    // Find which decade this event belongs to
    let eventCount = 0;
    for (let i = 0; i < decades.length; i++) {
      const decadeEvents = gsap.utils.toArray('.timeline-event', decades[i]);
      if (activeEventIndex < eventCount + decadeEvents.length) {
        activeDecadeIndex = i;
        break;
      }
      eventCount += decadeEvents.length;
    }
  }
  
  // If we captured an active marker, use that as the authoritative decade index
  if (activeMarkerIndex >= 0) {
    activeDecadeIndex = activeMarkerIndex;
  }
  
  return {
    progress,
    activeEventIndex,
    activeDecadeIndex,
    activeMarkerIndex, // Store the actual marker that was active
    scrollPosition: window.pageYOffset || document.documentElement.scrollTop
  };
}

function restoreTimelinePosition(state) {
  if (!state || !resizeState.timelineScrollTrigger) {
    return;
  }
  
  // Calculate the new scroll position that corresponds to the same event
  const timelineScrollTrigger = resizeState.timelineScrollTrigger;
  const start = timelineScrollTrigger.start;
  const end = timelineScrollTrigger.end;
  const scrollDistance = end - start;
  
  // Use the saved progress to calculate new scroll position
  const targetScroll = start + (scrollDistance * state.progress);
  
  
  // Immediately jump to position (no smooth scroll during resize)
  if (window.lenis) {
    window.lenis.scrollTo(targetScroll, { 
      immediate: true,
      force: true,
      lock: true
    });
  } else {
    window.scrollTo({
      top: targetScroll,
      behavior: 'auto' // Instant, no smooth
    });
  }
  
  // Restore the marker state explicitly
  if (state.activeMarkerIndex >= 0) {
    const markers = gsap.utils.toArray('.marker');
    markers.forEach((marker, index) => {
      marker.classList.remove('active', 'complete');
      if (index === state.activeMarkerIndex) {
        marker.classList.add('active');
      } else if (index < state.activeMarkerIndex) {
        marker.classList.add('complete');
      }
    });
  }
}

let resizeDebounceTimer = null;
let resizeStartTimer = null;

// Track viewport dimensions to detect mobile address bar changes
let lastViewportWidth = window.innerWidth;
let lastViewportHeight = window.innerHeight;

function handleResizeStart() {
  if (!resizeState.isResizing) {
    resizeState.isResizing = true;
    resizeState.savedProgress = captureTimelineState();
    
    // Add class to body to indicate resize in progress
    document.body.classList.add('timeline-resizing');
    
    if (resizeState.savedProgress) {
    }
  }
}

// Detect if this is a mobile address bar resize (height change only, minimal width change)
function isMobileAddressBarResize() {
  const currentWidth = window.innerWidth;
  const currentHeight = window.innerHeight;
  
  const widthChange = Math.abs(currentWidth - lastViewportWidth);
  const heightChange = Math.abs(currentHeight - lastViewportHeight);
  
  // Address bar resize: significant height change (50-150px typical), minimal width change (<5px)
  const isAddressBarResize = widthChange < 5 && heightChange > 40 && heightChange < 200;
  
  // Update tracked dimensions
  lastViewportWidth = currentWidth;
  lastViewportHeight = currentHeight;
  
  return isAddressBarResize;
}

function handleResizeEnd() {
  // Detect if this is a mobile address bar resize
  const isAddressBarChange = isMobileAddressBarResize();
  
  // Update timeline shader canvas dimensions to match viewport
  const timelineShaderCanvas = document.querySelector('#timeline-shader-bg');
  if (timelineShaderCanvas) {
    timelineShaderCanvas.style.width = `${window.innerWidth}px`;
    timelineShaderCanvas.style.height = `${window.innerHeight}px`;
  }
  
  // Regenerate minor nodes to recalculate their positions based on new viewport
  // This must happen BEFORE ScrollTrigger.refresh to ensure correct positioning
  // Skip for address bar changes (minor nodes don't need regeneration)
  if (window._generateMinorNodes && !isAddressBarChange) {
    window._generateMinorNodes();
  }
  
  // CRITICAL: If we're before the timeline section, re-sync background with span
  // Check if we're not in the timeline yet
  const timeline = document.querySelector('#acs-timeline');
  
  if (timeline && window._timelinePositioning) {
    // Check if we're before the timeline or not in it yet
    const inTimeline = document.body.classList.contains('in-timeline');
    const timelineRect = timeline.getBoundingClientRect();
    // Use more lenient check - if timeline top is below 30% of viewport, we're likely before it
    const isBeforeTimeline = timelineRect.top > window.innerHeight * 0.3;
    
    if (!inTimeline && isBeforeTimeline) {
      // We're before the timeline - reset captured position and re-sync with span
      logger.log('[Resize] Before timeline - resetting background position');
      window._timelinePositioning.resetCapturedPosition();
      
      // CRITICAL: Reset isTrackingSpan to true since we're before the timeline
      // This was likely set to false during a previous scroll into expansion phase
      if (window._timelinePositioning.setTrackingSpan) {
        window._timelinePositioning.setTrackingSpan(true);
      }
      
      // Force immediate position update using syncBgToSpanImmediate (bypasses tracking check)
      requestAnimationFrame(() => {
        if (window._timelinePositioning.syncBgToSpanImmediate) {
          window._timelinePositioning.syncBgToSpanImmediate();
        }
      });
    } else if (!inTimeline) {
      // Not in timeline but also not clearly before it - still sync the background
      // This handles edge cases during/after address bar changes
      requestAnimationFrame(() => {
        if (window._timelinePositioning.syncBgToSpanImmediate) {
          window._timelinePositioning.syncBgToSpanImmediate();
        }
      });
    }
  }
  
  // For mobile address bar changes, do a lightweight refresh
  if (isAddressBarChange) {
    logger.log('[Resize] Mobile address bar change detected - lightweight refresh');
    
    // Just update ScrollTrigger positions without full refresh
    ScrollTrigger.update();
    
    // Sync background position again after update
    requestAnimationFrame(() => {
      if (window._timelinePositioning && window._timelinePositioning.syncBgToSpanImmediate) {
        window._timelinePositioning.syncBgToSpanImmediate();
      }
      
      // Clean up
      document.body.classList.remove('timeline-resizing');
      resizeState.isResizing = false;
      resizeState.savedProgress = null;
    });
    
    return; // Skip the heavy refresh logic for address bar changes
  }
  
  // First, refresh ScrollTrigger with invalidation to recalculate everything
  ScrollTrigger.refresh(true); // true = invalidate all on refresh
  
  // Wait for ScrollTrigger to fully recalculate
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      // Force ScrollTrigger update to apply current scroll position
      ScrollTrigger.update();
      
      // Re-sync background position after ScrollTrigger refresh if before timeline
      if (timeline && window._timelinePositioning) {
        const inTimeline = document.body.classList.contains('in-timeline');
        const timelineRect = timeline.getBoundingClientRect();
        const isBeforeTimeline = timelineRect.top > window.innerHeight * 0.3;
        
        if (!inTimeline && isBeforeTimeline) {
          logger.log('[Resize] Post-refresh: Re-syncing background position');
          // Use syncBgToSpanImmediate to bypass tracking check
          if (window._timelinePositioning.syncBgToSpanImmediate) {
            window._timelinePositioning.syncBgToSpanImmediate();
          }
        }
      }
      
      // If we have saved progress, restore it
      if (resizeState.savedProgress && resizeState.timelineScrollTrigger) {
        const scrollTrigger = resizeState.timelineScrollTrigger;
        
        // Calculate new scroll position
        const start = scrollTrigger.start;
        const end = scrollTrigger.end;
        const scrollDistance = end - start;
        const targetScroll = start + (scrollDistance * resizeState.savedProgress.progress);
        
        // Use Lenis or native scroll to restore position
        if (window.lenis) {
          window.lenis.scrollTo(targetScroll, { 
            immediate: true,
            force: true
          });
        } else {
          window.scrollTo({
            top: targetScroll,
            behavior: 'auto'
          });
        }
        
        // Lock the marker to the saved state during resize restoration
        if (resizeState.savedProgress.activeMarkerIndex >= 0 && resizeState.markerLockRef) {
          resizeState.markerLockRef.isLocked = true;
          resizeState.markerLockRef.targetIndex = resizeState.savedProgress.activeMarkerIndex;
          resizeState.markerLockRef.reason = 'resize';
          
          // Immediately restore marker classes
          const markers = gsap.utils.toArray('.marker');
          markers.forEach((marker, index) => {
            marker.classList.remove('active', 'complete');
            if (index === resizeState.savedProgress.activeMarkerIndex) {
              marker.classList.add('active');
            } else if (index < resizeState.savedProgress.activeMarkerIndex) {
              marker.classList.add('complete');
            }
          });
          
          // Restore minor node states based on active event
          const activeEventIndex = resizeState.savedProgress.activeEventIndex;
          const minorNodes = gsap.utils.toArray('.minor-node');
          
          // Find the minor node index (accounting for cover event)
          // activeEventIndex 0 = cover (no minor node)
          // activeEventIndex 1 = first minor node (index 0)
          const activeMinorNodeIndex = activeEventIndex - 1;
          
          minorNodes.forEach((node, index) => {
            node.classList.remove('active', 'complete');
            const nodeMinorIndex = parseInt(node.getAttribute('data-minor-index') || index);
            
            if (nodeMinorIndex === activeMinorNodeIndex) {
              node.classList.add('active');
            } else if (nodeMinorIndex < activeMinorNodeIndex) {
              node.classList.add('complete');
            }
          });
          
          // Update scrubber progress to match the active minor node position
          const scrubberProgress = document.querySelector('.scrubber-progress');
          if (scrubberProgress && activeMinorNodeIndex >= 0 && minorNodes[activeMinorNodeIndex]) {
            const activeNode = minorNodes[activeMinorNodeIndex];
            const scrubberLine = document.querySelector('.scrubber-line');
            
            if (scrubberLine && activeNode) {
              // Wait for minor nodes to be fully positioned after regeneration
              requestAnimationFrame(() => {
                const lineRect = scrubberLine.getBoundingClientRect();
                const nodeRect = activeNode.getBoundingClientRect();
                const nodeCenterX = nodeRect.left + (nodeRect.width / 2) - lineRect.left;
                const lineWidth = lineRect.width;
                const scrubberProgressValue = Math.max(0, Math.min(1, nodeCenterX / lineWidth));
                
                gsap.set(scrubberProgress, {
                  scaleX: scrubberProgressValue,
                  transformOrigin: 'left'
                });
              });
            }
          }
        }
        
        // Force another update after scroll restoration and ensure animations are in correct state
        setTimeout(() => {
          ScrollTrigger.update();
          
          // Force the timeline to update its animation state
          if (scrollTrigger.animation) {
            scrollTrigger.animation.invalidate();
            scrollTrigger.animation.progress(scrollTrigger.animation.progress());
          }
          
          // Additional safety: trigger a scroll event to ensure everything updates
          window.dispatchEvent(new Event('scroll'));
          
          // Force updateScrubber to sync with current state after resize
          if (scrollTrigger.animation && window._updateScrubber) {
            requestAnimationFrame(() => {
              window._updateScrubber(scrollTrigger.animation.progress());
            });
          }
          
          // Unlock marker after everything has settled
          setTimeout(() => {
            if (resizeState.markerLockRef && resizeState.markerLockRef.reason === 'resize') {
              resizeState.markerLockRef.isLocked = false;
              resizeState.markerLockRef.targetIndex = -1;
              resizeState.markerLockRef.reason = '';
            }
          }, 500);
          
          // Remove resizing class
          document.body.classList.remove('timeline-resizing');
          resizeState.isResizing = false;
          resizeState.savedProgress = null;
        }, 150); // Increased timeout for animation to settle
      } else {
        // No saved progress, just clean up
        document.body.classList.remove('timeline-resizing');
        resizeState.isResizing = false;
        resizeState.savedProgress = null;
      }
    });
  });
}

window.addEventListener('resize', () => {
  // Clear existing timers
  clearTimeout(resizeStartTimer);
  clearTimeout(resizeDebounceTimer);
  
  // Trigger resize start (captures state on first resize event)
  resizeStartTimer = setTimeout(handleResizeStart, 10);
  
  // Debounce the end of resize
  resizeDebounceTimer = setTimeout(handleResizeEnd, 300);
});

// Mobile-specific: Listen to visualViewport for more reliable address bar detection
// This fires more reliably than resize when address bar appears/disappears
if (window.visualViewport) {
  let visualViewportResizeTimer = null;
  
  window.visualViewport.addEventListener('resize', () => {
    // Clear existing timer
    clearTimeout(visualViewportResizeTimer);
    
    // Debounce to avoid too many updates
    visualViewportResizeTimer = setTimeout(() => {
      // Only process if we're not already in a full resize
      if (!resizeState.isResizing && window._timelinePositioning) {
        const inTimeline = document.body.classList.contains('in-timeline');
        
        if (!inTimeline) {
          logger.log('[VisualViewport] Address bar change - syncing background');
          
          // Reset tracking state and sync position
          if (window._timelinePositioning.setTrackingSpan) {
            window._timelinePositioning.setTrackingSpan(true);
          }
          
          if (window._timelinePositioning.syncBgToSpanImmediate) {
            window._timelinePositioning.syncBgToSpanImmediate();
          }
        }
      }
    }, 100);
  });
}

function manageBackgroundPause(progress) {
  // Pause background when fully in timeline (after fade-ins complete)
  // This improves performance by freezing:
  // - Film grain animation
  // - Wave shader movements
  // - Color cycling effects
  // - Particle animations
  // - Globe rotation
  const pauseThreshold = 0.1; // Pause at 10% progress (after fade-ins)
  const resumeThresholdEnd = 0.95; // Resume at 95% when scrolling down

  if (progress > pauseThreshold && progress < resumeThresholdEnd) {
    // We're fully in the timeline - pause global background
    if (!window.backgroundPaused) {
      window.backgroundPaused = true;
      
      // Also dispatch event for other systems that might need to know
      window.dispatchEvent(new CustomEvent('timeline:backgroundPaused', { detail: { paused: true } }));
    }
  } else {
    // We're exiting or entering timeline - resume global background
    if (window.backgroundPaused) {
      window.backgroundPaused = false;
      
      // Dispatch resume event
      window.dispatchEvent(new CustomEvent('timeline:backgroundPaused', { detail: { paused: false } }));
    }
  }
}

// Remove the old updateTimelineScrubber function from the bottom of the file as it is now defined inside initTimelineAnimation
function updateTimelineScrubber(progress) {
  // This function is now deprecated/replaced by the internal updateScrubber
}

// Export cleanup function
export function disposeTimeline() {
  try {
    // Clean up RAF, resize observer, and scroll listeners
    if (window._timelineCleanup) {
      if (window._timelineCleanup.rafId) {
        cancelAnimationFrame(window._timelineCleanup.rafId);
      }
      if (window._timelineCleanup.resizeObserver) {
        try {
          window._timelineCleanup.resizeObserver.disconnect();
        } catch (e) {
          logger.warn('[Timeline] Error disconnecting resize observer:', e.message);
        }
      }
      if (window._timelineCleanup.lenisCallback && window.lenis) {
        try {
          window.lenis.off('scroll', window._timelineCleanup.lenisCallback);
        } catch (e) {
          logger.warn('[Timeline] Error removing lenis listener:', e.message);
        }
      }
      if (window._timelineCleanup.scrollCallback) {
        window.removeEventListener('scroll', window._timelineCleanup.scrollCallback);
      }
      // Stop continuous tracking if active
      if (window._timelineCleanup.stopTracking) {
        try {
          window._timelineCleanup.stopTracking();
        } catch (e) {
          logger.warn('[Timeline] Error stopping tracking:', e.message);
        }
      }
      window._timelineCleanup = null;
    }
    
    // Kill all timeline ScrollTriggers
    if (window._timelineScrollTriggers) {
      window._timelineScrollTriggers.forEach(trigger => {
        try {
          if (trigger && trigger.kill) trigger.kill();
        } catch (e) {
          logger.warn('[Timeline] Error killing ScrollTrigger:', e.message);
        }
      });
      window._timelineScrollTriggers = null;
    }
    
    // Dispose timeline shader
    if (window.timelineShaderControls) {
      try {
        if (window.timelineShaderControls.stop) {
          window.timelineShaderControls.stop();
        }
        if (window.timelineShaderControls.dispose) {
          window.timelineShaderControls.dispose();
        }
      } catch (e) {
        logger.warn('[Timeline] Error disposing shader:', e.message);
      }
      window.timelineShaderControls = null;
    }
    
    // Dispose cover orb
    if (window.coverOrbControls) {
      try {
        if (window.coverOrbControls.dispose) {
          window.coverOrbControls.dispose();
        }
      } catch (e) {
        logger.warn('[Timeline] Error disposing cover orb:', e.message);
      }
      window.coverOrbControls = null;
    }
    
    // Reset global state flags
    window._isTimelineDismissed = false;
    window._isDismissing = false;
    
    // Ensure background is resumed when timeline is disposed
    if (window.backgroundPaused) {
      window.backgroundPaused = false;
      window.dispatchEvent(new CustomEvent('timeline:backgroundPaused', { detail: { paused: false } }));
    }
    
    logger.log('[Timeline] Disposed successfully');
  } catch (e) {
    logger.warn('[Timeline] Error during dispose:', e.message);
  }
}
