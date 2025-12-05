import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { initTimelineScene } from '../threejs/timelineScene.js';
import { initCoverOrb } from '../threejs/coverOrb.js';
import { initTimelineShader } from './timelineShader.js';

// Initialize timeline scene (Three.js)
let timelineScene = null;

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
  const timeline = document.querySelector('#acs-timeline');
  const timelineWindowStart = document.querySelector('#timeline-window-start');
  const timelineWindowBg = document.querySelector('#timeline-window-bg');
  const getInvolvedMessage = document.querySelector('.get-involved-message');
  
  // Initialize Shader Background
  if (document.querySelector('#timeline-shader-bg') && !window.timelineShaderControls) {
    window.timelineShaderControls = initTimelineShader();
    // Start paused since we're not in timeline initially
    if (window.timelineShaderControls && window.timelineShaderControls.stop) {
      window.timelineShaderControls.stop();
      console.log('[Timeline] Timeline shader initialized and paused');
    }
  }
  
  // Initialize Cover Orb
  if (document.querySelector('#timeline-cover-canvas') && !window.coverOrbControls) {
    window.coverOrbControls = initCoverOrb();
    // Start paused since we're not in timeline initially
    if (window.coverOrbControls && window.coverOrbControls.pause) {
      window.coverOrbControls.pause();
      console.log('[Timeline] Cover orb initialized and paused');
    }
  }
  
  // Check if required elements exist
  if (!timeline || !timelineWindowStart || !timelineWindowBg || !getInvolvedMessage) {
    console.warn('Timeline: Required elements not found. Skipping timeline initialization.');
    return;
  }
  
  // Check if timeline has been dismissed in this session
  // COMMENTED OUT: Allow timeline to be re-entered on page refresh
  /*
  const isTimelineDismissed = sessionStorage.getItem('timelineDismissed') === 'true';
  
  if (isTimelineDismissed) {
    console.log('Timeline: Previously dismissed, collapsing section');
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
    console.warn('Timeline: Container or track not found. Skipping timeline initialization.');
    return;
  }

  // Ensure background pause state is initialized (not paused at start)
  if (typeof window.backgroundPaused === 'undefined') {
    window.backgroundPaused = false;
  }

  // Initialize Three.js scene for timeline visuals
  try {
    timelineScene = initTimelineScene();
    console.log('Timeline: Three.js scene initialized');
  } catch (error) {
    console.error('Timeline: Failed to initialize Three.js scene:', error);
    // Continue without Three.js visuals
  }

  // Cover Orb is already initialized at the top of this function (line ~55)
  // No need to call initCoverOrb() again here

  // Cache for position with interpolation to prevent jitter
  let lastPosition = { top: 0, left: 0, width: 0, height: 0 };
  let targetPosition = { top: 0, left: 0, width: 0, height: 0 };
  
  // Flag to track if we should be updating the BG position to match the span
  let isTrackingSpan = true;
  
  // Lerp (linear interpolation) for smooth transitions
  const lerp = (start, end, factor) => start + (end - start) * factor;
  
  // Function to position background to match the span (like a highlight box)
  const positionBgToSpan = () => {
    // Check if elements still exist
    if (!timelineWindowStart || !timelineWindowBg) return;
    
    // If we're not tracking the span (e.g. during expansion or timeline view), don't update
    if (!isTrackingSpan) return;
    
    const rect = timelineWindowStart.getBoundingClientRect();
    
    // Get the computed transform to account for any GSAP animations
    const computedStyle = window.getComputedStyle(timelineWindowStart);
    const transform = computedStyle.transform;
    
    // Extract translate values from transform matrix if present
    let translateY = 0;
    if (transform && transform !== 'none') {
      const matrix = new DOMMatrix(transform);
      translateY = matrix.m42; // Y translation from matrix
    }
    
    // Adjust rect.top to compensate for any Y transforms
    // This helps maintain accurate positioning during scroll reveals
    const adjustedTop = rect.top - translateY;
    
    // Use tighter threshold for Y-axis (more sensitive to vertical changes)
    // Use looser threshold for X-axis (less critical)
    const yThreshold = 0.1; // Very sensitive to Y changes
    const xThreshold = 0.5; // Standard for X changes
    const sizeThreshold = 0.5; // Standard for size changes
    
    // Check if position actually changed
    const positionChanged = 
      Math.abs(adjustedTop - targetPosition.top) > yThreshold ||
      Math.abs(rect.left - targetPosition.left) > xThreshold ||
      Math.abs(rect.width - targetPosition.width) > sizeThreshold ||
      Math.abs(rect.height - targetPosition.height) > sizeThreshold;
    
    if (!positionChanged && targetPosition.top !== 0) {
      return; // Skip update if position hasn't changed significantly
    }
    
    // Update target position
    targetPosition = {
      top: adjustedTop,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };
    
    // Smooth interpolation to prevent jitter (especially on Y-axis)
    // Use faster lerp for first-time positioning
    const lerpFactor = lastPosition.top === 0 ? 1 : 0.6;
    
    lastPosition = {
      top: lerp(lastPosition.top || adjustedTop, adjustedTop, lerpFactor),
      left: lerp(lastPosition.left || rect.left, rect.left, lerpFactor),
      width: lerp(lastPosition.width || rect.width, rect.width, lerpFactor),
      height: lerp(lastPosition.height || rect.height, rect.height, lerpFactor)
    };
    
    // Get current opacity (preserve during tracking)
    const currentOpacity = timelineWindowBg.style.opacity || '0';
    
    // Use direct style manipulation for instant updates (no GSAP delay)
    // Use sub-pixel precision with transform for smoother Y-axis tracking
    timelineWindowBg.style.position = 'fixed';
    timelineWindowBg.style.top = `${lastPosition.top}px`;
    timelineWindowBg.style.left = `${lastPosition.left}px`;
    timelineWindowBg.style.width = `${lastPosition.width}px`;
    timelineWindowBg.style.height = `${lastPosition.height}px`;
    timelineWindowBg.style.backgroundImage = 'linear-gradient(to bottom, #0493E2, #0493E2)';
    timelineWindowBg.style.zIndex = '0';
    timelineWindowBg.style.opacity = currentOpacity;
    timelineWindowBg.style.borderRadius = '4px';
    
    // Removed will-change to prevent compositing layer blocking backdrop-filter
    // timelineWindowBg.style.willChange = 'top, left, width, height, opacity';
  };

  // MAGIC TRICK: Use pseudo-element for span background to avoid affecting text opacity
  
  // Set timeline window BG to invisible initially
  gsap.set(timelineWindowBg, {
    opacity: 0
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
      background: linear-gradient(to bottom, #0493E2, #0493E2);
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
  requestAnimationFrame(() => {
    setTimeout(() => {
      positionBgToSpan();
    }, 100);
  });

  // Update position only on resize (no continuous tracking needed with magic trick)
  const resizeObserver = new ResizeObserver(() => {
    positionBgToSpan();
  });
  resizeObserver.observe(document.body);

  // No continuous tracking needed - the span's own background handles the visual
  // We only position the BG element once for the handoff moment
  let rafId = null;
  const trackWithLenis = () => {}; // Keep for cleanup reference
  const trackWithScroll = () => {}; // Keep for cleanup reference

  // Calculate total horizontal scroll distance
  const events = gsap.utils.toArray('.timeline-event');
  const decades = gsap.utils.toArray('.timeline-decade');
  const remainingEventsCount = events.length - 1;
  
  // Define scroll durations as functions to get current viewport size on resize
  const getInitialPhaseDuration = () => window.innerHeight * 1.0;
  const getScrollPerEvent = () => window.innerHeight * 1.4; // Reduced from 2.0 to 1.4 (30% faster)
  const getTotalScrollDistance = () => getInitialPhaseDuration() + (remainingEventsCount * getScrollPerEvent());
  
  // Initial values
  const initialPhaseDuration = getInitialPhaseDuration();
  const scrollPerEvent = getScrollPerEvent();
  const totalScrollDistance = getTotalScrollDistance();
  
  // Adjust animation durations (relative timeline units)
  const moveDuration = 0.75; // Reduced from 1.0 to 0.75 (25% faster transitions)
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
        display: 'inline-block'
      });
      
      gsap.to(currentYearSplit.chars, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.03,
        ease: 'power2.out',
        overwrite: true,
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
        duration: 0.25,
        stagger: 0.015,
        ease: 'power2.in',
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
    console.log('Timeline: Re-entering timeline from dismissed state');
    
    // Reset dismissed flags
    isTimelineDismissed = false;
    isDismissing = false;
    
    // Re-enable timeline pointer events
    timeline.style.pointerEvents = '';
    
    // Remove closed class
    timeline.classList.remove('closed');
    
    // Set timeline opacity to 1 immediately
    timeline.style.opacity = '1';
    
    // Set container opacity to 1
    timelineContainer.style.opacity = '1';
    
    // STEP 1: Re-enable all ScrollTriggers FIRST (before animating or scrolling)
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
    
    // STEP 2: Refresh ScrollTrigger to recalculate page height WITH timeline pinned
    ScrollTrigger.refresh();
    
    // STEP 3: Get the correct scroll position from timeline's ScrollTrigger
    // Scroll to BEFORE the exact start so the cover hasn't started fading in yet
    let targetScrollPos;
    if (tl && tl.scrollTrigger) {
      // Scroll to slightly before start to match the initial scroll-based entry
      // where the cover is still at opacity: 0
      const offset = window.innerHeight * 1.00001; // Small offset to fully entered .timeline-cover
      targetScrollPos = tl.scrollTrigger.start + offset;
    } else {
      // Fallback to element position
      const timelineRect = timeline.getBoundingClientRect();
      targetScrollPos = timelineRect.top + window.scrollY;
    }
    
    // STEP 4: Animate background to fill viewport
    gsap.set(timelineWindowBg, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      opacity: 0,
      zIndex: 5,
      backgroundImage: 'linear-gradient(to bottom, #0493AB, #0657A4)',
      pointerEvents: 'none',
      visibility: 'visible'
    });
    
    // STEP 5: Scroll to timeline ScrollTrigger start THEN fade in background
    if (window.lenis) {
      window.lenis.scrollTo(targetScrollPos, { 
        duration: 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        onComplete: () => {
          // After scroll completes, fade in background
          fadeInBackground();
        }
      });
    } else {
      window.scrollTo({
        top: targetScrollPos,
        behavior: 'smooth'
      });
      // Fallback: fade in after delay
      setTimeout(() => fadeInBackground(), 800);
    }
    
    function fadeInBackground() {
      gsap.to(timelineWindowBg, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
          // Add .in-timeline class to body
          document.body.classList.add('in-timeline');
          
          // Pause background shader
          if (!window.backgroundPaused) {
            window.backgroundPaused = true;
            console.log('[Timeline] Re-entry: Pausing background shader');
            window.dispatchEvent(new CustomEvent('timeline:backgroundPaused', { detail: { paused: true } }));
          }
          
          // Reset timeline progress to start
          if (tl && tl.scrollTrigger) {
            tl.progress(0);
          }
          
          console.log('Timeline: Re-entry complete');
        }
      });
    }
  }
  
  // Add click/touch listener to #timeline-window-start for re-entry
  if (timelineWindowStart) {
    const handleReEntry = (e) => {
      console.log('Timeline: Window start tapped/clicked, dismissed:', isTimelineDismissed);
      
      // Only handle re-entry if timeline has been dismissed
      if (isTimelineDismissed) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Timeline: Re-entering timeline from window start');
        reEnterTimeline();
      }
    };
    
    // Add both click and touchend for mobile support
    // Use capture phase to ensure we catch the event
    timelineWindowStart.addEventListener('click', handleReEntry, { capture: true });
    timelineWindowStart.addEventListener('touchend', handleReEntry, { passive: false, capture: true });
    
    // Also ensure the element is always interactive
    timelineWindowStart.style.pointerEvents = 'auto';
    
    console.log('Timeline: Re-entry listeners attached to #timeline-window-start');
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

  // Helper to update scrubber based on decades (not individual events)
  const updateScrubber = (progress) => {
    const scrubberProgress = document.querySelector('.scrubber-progress');
    const markers = gsap.utils.toArray('.marker');
    const minorNodes = gsap.utils.toArray('.minor-node');
    
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
      // NEW APPROACH: Detect which .timeline-event is actually visible/centered in viewport
      // This provides accurate synchronization with what's actually on screen
      
      // Find the event that's most centered in the viewport
      const isMobile = window.innerWidth <= 1024;
      const viewportCenter = isMobile ? window.innerHeight / 2 : window.innerWidth / 2;
      let closestEvent = null;
      let closestDistance = Infinity;
      let closestEventGlobalIndex = -1;
      
      events.forEach((event, globalIndex) => {
        const rect = event.getBoundingClientRect();
        const eventCenter = isMobile ? rect.top + (rect.height / 2) : rect.left + (rect.width / 2);
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
        
        // Ensure year element is visible
        ensureYearVisible();
        
        // Update year display from the event's data-year attribute
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
        // Get the scrubber line and active node positions
        const scrubberLine = document.querySelector('.scrubber-line');
        const scrubberContent = document.querySelector('.scrubber-content');
        
        if (scrubberLine && scrubberContent) {
          // Get positions relative to the content container
          const lineRect = scrubberLine.getBoundingClientRect();
          const nodeRect = activeNode.getBoundingClientRect();
          const contentRect = scrubberContent.getBoundingClientRect();
          
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
      ease: 'power2.out'
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
      console.warn(`Decade ${markerIndex} has no events`);
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
        const styleEl = document.getElementById('timeline-window-start-bg-style');
        if (styleEl) {
          styleEl.textContent = styleEl.textContent.replace(/opacity: [0-9.]+/, 'opacity: 0');
        }
      }
    }
  }).to({}, {
    // Fade in the span's pseudo-element background
    duration: 1,
    ease: 'power2.out',
    onUpdate: function() {
      const progress = this.progress();
      const opacity = progress * 0.5; // 0 to 0.5
      
      // Update pseudo-element opacity via style element
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
            background: linear-gradient(to bottom, #0493E2, #0493E2);
            border-radius: 4px;
            opacity: ${opacity};
            z-index: -1;
            pointer-events: none;
          }
        `;
      }
    }
  });

  // Capture the background's position state before pin
  let capturedPosition = null;
  
  // Store ScrollTrigger instances for potential cleanup
  const scrollTriggers = [];
  
  // Track if timeline has been dismissed
  let isTimelineDismissed = false;
  // Track if timeline is currently in the process of being dismissed
  let isDismissing = false;
  
  function hideTimelineContainer() {
    console.log('Timeline: Dismissing timeline section');

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
    console.log('Timeline: Dismissing timeline section');
    
    // Set dismissing flag to lock background updates
    isDismissing = true;
    
    // Mark as dismissed (in memory, not session storage)
    isTimelineDismissed = true;
    
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
          background: linear-gradient(to bottom, #0493E2, #0493E2);
          border-radius: 4px;
          opacity: 0.5;
          z-index: -1;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
      `;
    }
    
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
      console.log('[Timeline] Dismissal: Resuming background shader');
      window.dispatchEvent(new CustomEvent('timeline:backgroundPaused', { detail: { paused: false } }));
    }

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
      background-image: linear-gradient(to bottom, #0493AB, #0657A4) !important;
      background-color: #0493AB !important; /* Fallback */
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
        console.log('Timeline: Section faded out, performing instant jump');
        
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
            // Reset background styles
            timelineWindowBg.style.cssText = '';
            timelineWindowBg.style.position = '';
            timelineWindowBg.style.top = '';
            timelineWindowBg.style.left = '';
            timelineWindowBg.style.width = '';
            timelineWindowBg.style.height = '';
            timelineWindowBg.style.zIndex = '';
            
            // Disable pointer events on timeline
            timeline.style.pointerEvents = 'none';
            
            // Remove .in-timeline class from body LAST
            document.body.classList.remove('in-timeline');
            
            console.log('Timeline: Dismissal complete');
            
            // Reset dismissing flag
            isDismissing = false;
          }
        });
        }, 100); // Small delay to ensure scroll completes
      }
    });
  }
  
  // Phase 1: Pin #get-involved-message and expand background when it reaches center
  const expansionTl = gsap.timeline({
    scrollTrigger: {
      trigger: getInvolvedMessage,
      start: 'center center', // When message reaches middle of viewport
      end: '+=600', // Scroll distance for pin duration and expansion
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => {
        // If dismissing, DO NOT touch the background
        if (isDismissing) return;
        
        // REAL-TIME visibility management - runs EVERY FRAME for instant response
        const progress = self.progress;
        const handoffThreshold = 0.01; // 1% - very tight threshold
        
        const styleEl = document.getElementById('timeline-window-start-bg-style');
        
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
            timelineWindowBg.style.opacity = '1';
            timelineWindowBg.style.visibility = 'visible';
            console.log('Timeline: SAFETY - BG is full viewport, forcing opacity to 1.0 from', currentOpacity.toFixed(3));
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
            console.log('Timeline: SAFETY - Pseudo visible, forcing BG to 0. Pseudo opacity:', pseudoOpacity.toFixed(3));
          }
        }
        
        if (progress < handoffThreshold) {
          // BEFORE handoff: Pseudo visible, BG hidden
          // Force update EVERY frame to ensure it sticks
          timelineWindowBg.style.opacity = '0';
          timelineWindowBg.style.visibility = 'hidden';
          
          if (styleEl) {
            styleEl.textContent = `
              #timeline-window-start::before {
                content: '';
                position: absolute;
                top: -2px;
                left: -6px;
                right: -6px;
                bottom: -2px;
                background: linear-gradient(to bottom, #0493E2, #0493E2);
                border-radius: 4px;
                opacity: 0.5 !important;
                z-index: -1;
                pointer-events: none;
                transition: none !important;
              }
            `;
          }
        } else {
          // AFTER handoff: BG visible, Pseudo hidden
          // Only make BG visible if pseudo is confirmed at 0
          if (pseudoOpacity < 0.01) {
            timelineWindowBg.style.opacity = '0.5';
            timelineWindowBg.style.visibility = 'visible';
          }
          
          if (styleEl) {
            styleEl.textContent = `
              #timeline-window-start::before {
                content: '';
                position: absolute;
                top: -2px;
                left: -6px;
                right: -6px;
                bottom: -2px;
                background: linear-gradient(to bottom, #0493E2, #0493E2);
                border-radius: 4px;
                opacity: 0 !important;
                z-index: -1;
                pointer-events: none;
                transition: none !important;
              }
            `;
          }
        }
        
        // Capture position right before pin activates (at start)
        if (progress < 0.01 && !capturedPosition) {
          const rect = timelineWindowStart.getBoundingClientRect();
          capturedPosition = {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
          };
        }
      },
      onEnter: () => {
        console.log('Timeline: INSTANT handoff from span to BG element');

        // Resume timeline shader early (just before main timeline starts)
        // This ensures smoothness during the entry transition
        if (window.timelineShaderControls && window.timelineShaderControls.resume) {
           window.timelineShaderControls.resume();
           console.log('[Timeline] Resuming timeline shader (Early Entry)');
        }

        
        // Stop tracking span position updates
        isTrackingSpan = false;
        
        // CRITICAL: Kill the pseudo fade timeline to prevent it from overriding our opacity
        if (pseudoFadeTl) {
          pseudoFadeTl.kill();
          console.log('Timeline: Killed pseudo fade timeline');
        }
        
        // INSTANT HANDOFF: Transfer from span pseudo-element to BG element
        // 1. Get the EXACT current position of the span (including padding from pseudo)
        const rect = timelineWindowStart.getBoundingClientRect();
        
        // Account for pseudo-element padding (-6px left/right, -2px top/bottom)
        const adjustedTop = rect.top - 2;
        const adjustedLeft = rect.left - 6;
        const adjustedWidth = rect.width + 12; // +6px on each side
        const adjustedHeight = rect.height + 4; // +2px on each side
        
        // 2. INSTANTLY hide the pseudo-element background (force to 0)
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
              background: linear-gradient(to bottom, #0493E2, #0493E2);
              border-radius: 4px;
              opacity: 0 !important;
              z-index: -1;
              pointer-events: none;
              transition: none !important;
            }
          `;
        }
        
        // 3. INSTANTLY position BG element exactly where pseudo-element was (using direct style for zero delay)
        timelineWindowBg.style.position = 'fixed';
        timelineWindowBg.style.top = `${adjustedTop}px`;
        timelineWindowBg.style.left = `${adjustedLeft}px`;
        timelineWindowBg.style.width = `${adjustedWidth}px`;
        timelineWindowBg.style.height = `${adjustedHeight}px`;
        timelineWindowBg.style.backgroundImage = 'linear-gradient(to bottom, #0493E2, #0493E2)';
        timelineWindowBg.style.borderRadius = '4px';
        timelineWindowBg.style.zIndex = '0';
        timelineWindowBg.style.opacity = '0.5'; // Match pseudo-element opacity
        
        // 4. Store this position for expansion animation
        capturedPosition = {
          top: adjustedTop,
          left: adjustedLeft,
          width: adjustedWidth,
          height: adjustedHeight
        };
        
        console.log('Timeline: INSTANT handoff complete, BG element now visible at', capturedPosition);
      },
      onLeaveBack: () => {
        console.log('Timeline: INSTANT reverse handoff from BG element to span');
        
        // Resume tracking span position updates
        isTrackingSpan = true;
        positionBgToSpan();
        
        // INSTANT REVERSE HANDOFF: Transfer back from BG element to pseudo-element
        // 1. INSTANTLY hide the BG element
        timelineWindowBg.style.opacity = '0';
        
        // 2. INSTANTLY restore the pseudo-element background
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
              background: linear-gradient(to bottom, #0493E2, #0493E2);
              border-radius: 4px;
              opacity: 0.5;
              z-index: -1;
              pointer-events: none;
              transition: opacity 0.3s ease;
            }
          `;
        }
        
        // 3. Reset captured position
        capturedPosition = null;
        
        console.log('Timeline: INSTANT reverse handoff complete, pseudo-element restored');
      }
    }
  });
  
  // Store this ScrollTrigger for cleanup
  scrollTriggers.push(expansionTl.scrollTrigger);

  // Create a gradient animation object to tween between color states
  const gradientState = { progress: 0 };
  
  // Expand background from highlight box to full viewport (first 70% of pin)
  // Use function to get starting values to account for captured position
  expansionTl.fromTo(timelineWindowBg, 
    () => {
      // Use captured position if available, otherwise get current
      if (capturedPosition) {
        return {
          top: `${capturedPosition.top}px`,
          left: `${capturedPosition.left}px`,
          width: `${capturedPosition.width}px`,
          height: `${capturedPosition.height}px`,
          opacity: 0.5 // Start from handoff opacity
        };
      }
      const rect = timelineWindowStart.getBoundingClientRect();
      return {
        top: `${rect.top}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        opacity: 0.5 // Start from handoff opacity
      };
    },
    {
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      opacity: 1,
      borderRadius: '0px',
      ease: 'power2.inOut',
      duration: 0.7,
      onReverseComplete: () => {
        // When reversing (scrolling back), set opacity back to 0 after reaching start
        timelineWindowBg.style.opacity = '0';
        console.log('Timeline: BG element hidden on reverse');
      }
    }, 
    0
  );

  // Animate the gradient colors alongside the expansion
  expansionTl.to(gradientState, {
    progress: 1,
    duration: 0.7,
    ease: 'power2.inOut',
    onUpdate: () => {
      // Interpolate between start gradient (#0493E2 → #0493E2) and end gradient (#0493AB → #0657A4)
      const startColorTop = interpolateColor('#0493E2', '#0493AB', gradientState.progress);
      const startColorBottom = interpolateColor('#0493E2', '#0657A4', gradientState.progress);
      
      timelineWindowBg.style.backgroundImage = `linear-gradient(to bottom, ${startColorTop}, ${startColorBottom})`;
    }
  }, 0);

  // Ensure ScrollTrigger refreshes after fonts load to prevent layout shifts affecting positions
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      console.log('Timeline: Fonts loaded, refreshing ScrollTrigger');
      ScrollTrigger.refresh();
    });
  }

  // Fade out the get-involved-message (starts at 40%, ends at 100%)
  expansionTl.to(getInvolvedMessage, {
    opacity: 0,
    ease: 'power2.in',
    duration: 0.6
  }, 0.4);

  // Phase 2: Master timeline for all timeline animations (starts after get-involved-message pin)
  tl = gsap.timeline({
    scrollTrigger: {
      trigger: timeline,
      start: 'top top',
      end: () => `+=${getTotalScrollDistance()}`, // Function to recalculate on resize
      pin: timelineContainer,
      scrub: 1, // smooth scrubbing
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onRefresh: (self) => {
        // If dismissing, DO NOT touch the background
        if (isDismissing) return;
        
        // Called after refresh/resize - ensure animations are in correct state
        console.log('Timeline: ScrollTrigger refreshed, progress:', self.progress.toFixed(3));
        
        // Update scrubber and background state immediately
        if (self.animation) {
          updateScrubber(self.animation.progress());
          updateScrubber(self.animation.progress());
          // manageBackgroundPause(self.progress); // Removed to use strict onEnter/onLeave logic
        }
      },
      onUpdate: (self) => {
        // If dismissing, DO NOT touch the background
        if (isDismissing) return;
        
        // Use animation progress to account for scrub lag (visual position)
        const progress = self.animation.progress();
        updateScrubber(progress);
        // manageBackgroundPause(self.progress); // Removed to use strict onEnter/onLeave logic
        
        // Ensure background stays opaque during timeline scrub
        if (self.progress > 0 && self.progress < 0.95) {
          if (timelineWindowBg.style.opacity !== '1') {
            timelineWindowBg.style.opacity = '1';
          }
        }

        // --- Timeline Shader Interpolation ---
        // Interpolate shader parameters as we approach the 2000s and finale
        // We'll start interpolating from around 80% progress (approx 1990s) to 100%
        
        if (window.timelineShaderControls && window.timelineShaderControls.updateParams) {
          // Define start (default) and end (finale) parameters
          const startParams = {
            waveSpeed: 0.32,
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
          
          const endParams = {
            waveSpeed: 0.2,
            waveAmplitude: 5.0,
            waveFrequencyX: 0.6,
            waveFrequencyY: 1.0,
            bobbingAmplitude: 2.2,
            bobbingSpeed: 0.24,
            fadeIntensity: 0.39,
            opacity: 1.0,
            scale: 3.3,
            rotationX: -1.6,
            rotationZ: -1.44,
            positionY: -20.0,
            positionZ: -20.0
          };
          
          // Determine interpolation factor
          // Start interpolating at 75% progress (approx 1990s)
          const interpolationStart = 0.75;
          let t = 0;
          
          if (progress > interpolationStart) {
            // Normalize t from 0 to 1 over the range [interpolationStart, 1.0]
            t = (progress - interpolationStart) / (1.0 - interpolationStart);
            // Clamp t to [0, 1]
            t = Math.max(0, Math.min(1, t));
            
            // Apply easing (optional, e.g., smoothstep)
            // t = t * t * (3 - 2 * t); 
          }
          
          // Helper to interpolate values
          const lerp = (start, end, t) => start + (end - start) * t;
          
          // Calculate current params
          const currentParams = {
            waveSpeed: lerp(startParams.waveSpeed, endParams.waveSpeed, t),
            waveAmplitude: lerp(startParams.waveAmplitude, endParams.waveAmplitude, t),
            waveFrequencyX: lerp(startParams.waveFrequencyX, endParams.waveFrequencyX, t),
            waveFrequencyY: lerp(startParams.waveFrequencyY, endParams.waveFrequencyY, t),
            bobbingAmplitude: lerp(startParams.bobbingAmplitude, endParams.bobbingAmplitude, t),
            bobbingSpeed: lerp(startParams.bobbingSpeed, endParams.bobbingSpeed, t),
            fadeIntensity: lerp(startParams.fadeIntensity, endParams.fadeIntensity, t),
            opacity: lerp(startParams.opacity, endParams.opacity, t),
            scale: lerp(startParams.scale, endParams.scale, t),
            rotationX: lerp(startParams.rotationX, endParams.rotationX, t),
            rotationZ: lerp(startParams.rotationZ, endParams.rotationZ, t),
            positionY: lerp(startParams.positionY, endParams.positionY, t),
            positionZ: lerp(startParams.positionZ, endParams.positionZ, t)
          };
          
          // Update shader
          window.timelineShaderControls.updateParams(currentParams);
        }
      },
      onEnter: () => {
        console.log('Timeline: Entering timeline section');
        
        // Add .in-timeline class to body (only if not dismissed)
        if (!isTimelineDismissed) {
          document.body.classList.add('in-timeline');
          
          // Pause regular background shader immediately when entering timeline
          if (!window.backgroundPaused) {
            window.backgroundPaused = true;
            console.log('[Timeline] Pausing background shader for performance');
            window.dispatchEvent(new CustomEvent('timeline:backgroundPaused', { detail: { paused: true } }));
          }
          
          // Resume timeline canvases (coverOrb and shader)
          if (window.coverOrbControls && window.coverOrbControls.resume) {
            window.coverOrbControls.resume();
            console.log('[Timeline] Resuming cover orb rendering');
          }
          if (window.timelineShaderControls && window.timelineShaderControls.resume) {
            window.timelineShaderControls.resume();
            console.log('[Timeline] Resuming timeline shader rendering');
          }
        }
        
        // Ensure background is fully visible when entering timeline proper
        gsap.to(timelineWindowBg, { opacity: 1, duration: 0.2, overwrite: 'auto' });
        
        // Fade out the canvas
        const canvas = document.querySelector('#background-canvas');
        if (canvas) {
          gsap.to(canvas, { opacity: 0, duration: 0.5, ease: 'power2.inOut' });
        }
        
        // Set HTML background to timeline gradient
        const htmlElement = document.documentElement;
        gsap.to(htmlElement, {
          duration: 0.5,
          ease: 'power2.inOut',
          onUpdate: function() {
            const progress = this.progress();
            // Interpolate from current to timeline gradient
            htmlElement.style.background = `linear-gradient(to bottom, #0493AB, #0657A4)`;
          }
        });
        
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
            
            console.log('Timeline: Initialized first minor node as active, scrubber progress:', scrubberProgressValue.toFixed(3));
          }
        }
        
        // Reset and hide the year display completely when entering timeline
        // The year will only show when scrolling to the first actual event after the cover
        console.log('Timeline: Resetting and hiding year display on entry');
        
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
          
          console.log('Timeline: Year display cleared and hidden');
        }
      },
      onLeave: () => {
        console.log('Timeline: Leaving timeline section');
        
        // Remove .in-timeline class from body
        document.body.classList.remove('in-timeline');
        
        // Resume regular background shader
        if (window.backgroundPaused) {
          window.backgroundPaused = false;
          console.log('[Timeline] Resuming background shader');
          window.dispatchEvent(new CustomEvent('timeline:backgroundPaused', { detail: { paused: false } }));
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
        console.log('Timeline: Leaving timeline section (scrolling back up)');
        
        // Remove .in-timeline class from body
        document.body.classList.remove('in-timeline');

        // Resume regular background shader
        if (window.backgroundPaused) {
          window.backgroundPaused = false;
          console.log('[Timeline] Resuming background shader');
          window.dispatchEvent(new CustomEvent('timeline:backgroundPaused', { detail: { paused: false } }));
        }
        
        // Pause timeline canvases to save performance (with delay to prevent freeze during fade)
        setTimeout(() => {
          if (window.coverOrbControls && window.coverOrbControls.pause) {
            window.coverOrbControls.pause();
            console.log('[Timeline] Pausing cover orb rendering (delayed)');
          }
          if (window.timelineShaderControls && window.timelineShaderControls.stop) {
            window.timelineShaderControls.stop();
            console.log('[Timeline] Pausing timeline shader rendering (delayed)');
          }
        }, 1000); // 1s delay to allow fade out to complete
        
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
          
          console.log('Timeline: Year display reset on leave back');
        }
      },
      onEnterBack: () => {
        console.log('Timeline: Re-entering timeline section from below (scrolling back up)');
        
        // Add .in-timeline class to body (only if not dismissed)
        if (!isTimelineDismissed) {
          document.body.classList.add('in-timeline');
          
          // Pause regular background shader when re-entering timeline
          if (!window.backgroundPaused) {
            window.backgroundPaused = true;
            console.log('[Timeline] Pausing background shader for performance');
            window.dispatchEvent(new CustomEvent('timeline:backgroundPaused', { detail: { paused: true } }));
          }
          
          // Resume timeline canvases (coverOrb and shader)
          if (window.coverOrbControls && window.coverOrbControls.resume) {
            window.coverOrbControls.resume();
            console.log('[Timeline] Resuming cover orb rendering');
          }
          if (window.timelineShaderControls && window.timelineShaderControls.resume) {
            window.timelineShaderControls.resume();
            console.log('[Timeline] Resuming timeline shader rendering');
          }
        }
        
        // Ensure background is visible when re-entering timeline from below
        gsap.to(timelineWindowBg, { opacity: 1, duration: 0.2, overwrite: 'auto' });
        
        // Fade out the canvas
        const canvas = document.querySelector('#background-canvas');
        if (canvas) {
          gsap.to(canvas, { opacity: 0, duration: 0.5, ease: 'power2.inOut' });
        }
        
        // Set HTML background to timeline gradient
        const htmlElement = document.documentElement;
        gsap.to(htmlElement, {
          duration: 0.5,
          ease: 'power2.inOut',
          onUpdate: function() {
            const progress = this.progress();
            // Interpolate to timeline gradient
            htmlElement.style.background = `linear-gradient(to bottom, #0493AB, #0657A4)`;
          }
        });
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
      ease: 'power2.out'
    },
    0
  );

  // Fade in Three.js container
  tl.from(
    '.timeline-threejs-container',
    {
      opacity: 0,
      scale: 0.8,
      duration: 0.03
    },
    0.01
  );

  // Fade in shader background (alongside coverOrb/threejs container)
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
    
    // Phase A: First event (1876) - Pinned in center
    // Start hidden and fade in "in place" as user scrolls
    tl.fromTo(firstEvent, 
      { 
        opacity: 0, 
        scale: 0.95 
      },
      { 
        opacity: 1, 
        scale: 1,
        duration: 0.25, // Quicker fade in for snappier feel
        ease: 'power2.out'
      },
      0 // Start immediately at the beginning of the pinned section
    );
    
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
      // Desktop: Move X (horizontal) - events are 50vw wide
      // With 100vw padding and 50vw event width:
      // Event i starts at (100vw + i*50vw), center at (125vw + i*50vw)
      // To center at viewport center (50vw): move by -(75vw + i*50vw) = -((i+1.5)*50vw)
      // Mobile: Move Y (vertical)
      const isMobile = () => window.innerWidth <= 1024;
      const getTargetX = () => isMobile() ? 0 : -((index + 1.5) * window.innerWidth * 0.5);
      // Use string-based vh units for mobile to avoid drifting calculations when window.innerHeight changes (address bar)
      // This forces the browser to align with CSS 100vh elements
      const getTargetY = () => isMobile() ? `${-(index + 1) * 100}vh` : 0;
      
      const eventLabel = `event-${index}`;
      
      // 1. Move Track
      tl.to(timelineTrack, {
        x: getTargetX,
        y: getTargetY,
        duration: moveDuration,
        ease: 'power1.inOut'
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
        ease: 'power1.in'
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
        ease: 'power2.out'
      }, `${eventLabel}+=${moveDuration * 0.1}`);
      
      // When transitioning from cover (first event) to first remaining event,
      // fade in the close button and background decal simultaneously
      if (index === 0) {
        // Fade in close button as we move past the cover
        tl.fromTo('.timeline-close', {
          opacity: 0
        }, {
          opacity: 1,
          duration: moveDuration * 0.5,
          ease: 'power2.out'
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
      console.log('Timeline: Close button clicked, dismissing timeline');
      hideTimelineContainer();
    });
  }

  // Function to generate minor nodes for individual events within decades
  function generateMinorNodes() {
    const markers = gsap.utils.toArray('.marker');
    
    if (!markers.length || !decades.length) {
      console.warn('Timeline: Markers or decades not found');
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
        console.warn(`Timeline: No marker found for decade ${decadeName}`);
        return;
      }

      // Find the minor nodes container within this marker
      const minorNodesContainer = marker.querySelector('.marker-minor-nodes');
      if (!minorNodesContainer) {
        console.warn(`Timeline: No minor nodes container found for decade ${decadeName}`);
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
            
            console.log(`Minor node ${eventYearStr}: position ${(yearPositionInDecade * 100).toFixed(1)}% in decade, ${positionInGap.toFixed(0)}px from marker`);
          } else {
            // Last decade - position based on percentage of expected gap
            const viewportWidth = window.innerWidth;
            const padding = viewportWidth > 768 ? 120 : 100;
            const markersPerView = viewportWidth > 768 ? 5 : 4;
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

          console.log(`Minor Node Click: Event ${globalEventIndex} (Decade: ${decadeName}, Local: ${localEventIndex}), Year ${eventYear}, Progress: ${eventProgress.toFixed(3)}`);

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
                  console.log('Minor Node Click: Unlocked after scroll complete');
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
      console.log(`Timeline: Generated ${minorNodesCreated} minor nodes for decade ${decadeName}`);
    });

    console.log(`Timeline: Generated ${minorNodeIndex} total minor nodes across ${decades.length} decades`);
  }

  // Generate minor nodes for individual events
  generateMinorNodes();

  // Function to initialize scrubber horizontal scrolling with nav arrows
  function initScrubberScrolling() {
    const scrollWrapper = document.querySelector('.scrubber-scroll-wrapper');
    const prevButton = document.querySelector('.scrubber-nav-prev');
    const nextButton = document.querySelector('.scrubber-nav-next');
    const markers = gsap.utils.toArray('.marker');

    if (!scrollWrapper || !prevButton || !nextButton) {
      console.warn('Timeline: Scrubber scroll elements not found');
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
      const dynamicGap = (viewportWidth - padding) / (viewportWidth > 768 ? 5 : 4); // 5 markers on desktop, 4 on mobile
      
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
              console.log('Scrubber: Proactive scroll forward to show next marker');
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
              console.log('Scrubber: Proactive scroll backward to show previous marker');
            }
          }
        }
      }

      if (shouldScroll) {
        // Scroll to center the target marker
        scrollToMarker(targetMarkerIndex);
      }
    };

    console.log('Timeline: Scrubber scrolling initialized');
  }

  // Initialize scrubber scrolling functionality
  initScrubberScrolling();

  // Add click handlers to timeline scrubber markers
  const markers = gsap.utils.toArray('.marker');
  markers.forEach((marker, index) => {
    marker.addEventListener('click', () => {
      console.log(`Marker Click: Clicked marker index ${index}`);
      
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
        console.log('Marker Click: Unlocked - updateScrubber will handle state');
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
      
      console.log(`Marker Click: Scrolling to progress ${targetProgress.toFixed(3)}, scroll position: ${targetScroll.toFixed(0)}`);
      
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
         console.log('[Timeline] Letting shader run after exit (per user request)');
      }
    }
  }).to([timelineWindowBg, timeline], {
    opacity: 0,
    ease: 'power2.in'
  });

  // Handle resize to keep user on the same event
  ScrollTrigger.addEventListener('refreshInit', () => {
    // Store the current active event index before refresh
    console.log('Timeline: Refresh Init - Active Event Index:', currentActiveEventIndex);
  });

  ScrollTrigger.addEventListener('refresh', () => {
    // Restore position to the active event
    console.log('Timeline: Refresh Complete - Restoring to Event Index:', currentActiveEventIndex);
    
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
               console.log('Timeline: Restored scroll position to event', currentActiveEventIndex);
             }
        }
    }
  });

  // Store cleanup references
  window._timelineCleanup = {
    rafId: rafId,
    resizeObserver: resizeObserver,
    lenisCallback: trackWithLenis,
    scrollCallback: trackWithScroll
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
  
  console.log('Timeline Resize: Captured state - marker:', activeMarkerIndex, 'decade:', activeDecadeIndex, 'progress:', progress.toFixed(3));
  
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
  
  console.log(`Timeline Resize: Restoring to event ${state.activeEventIndex}, decade ${state.activeDecadeIndex}, marker ${state.activeMarkerIndex}, progress ${state.progress.toFixed(3)}`);
  
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
    console.log(`Timeline Resize: Restored marker ${state.activeMarkerIndex} as active`);
  }
}

let resizeDebounceTimer = null;
let resizeStartTimer = null;

function handleResizeStart() {
  if (!resizeState.isResizing) {
    resizeState.isResizing = true;
    resizeState.savedProgress = captureTimelineState();
    
    // Add class to body to indicate resize in progress
    document.body.classList.add('timeline-resizing');
    
    if (resizeState.savedProgress) {
      console.log('Timeline Resize: Captured state -', resizeState.savedProgress);
    }
  }
}

function handleResizeEnd() {
  console.log('Timeline Resize: Starting resize end handler');
  
  // Update timeline shader canvas dimensions to match viewport
  const timelineShaderCanvas = document.querySelector('#timeline-shader-bg');
  if (timelineShaderCanvas) {
    timelineShaderCanvas.style.width = `${window.innerWidth}px`;
    timelineShaderCanvas.style.height = `${window.innerHeight}px`;
  }
  
  // First, refresh ScrollTrigger with invalidation to recalculate everything
  ScrollTrigger.refresh(true); // true = invalidate all on refresh
  
  // Wait for ScrollTrigger to fully recalculate
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      // Force ScrollTrigger update to apply current scroll position
      ScrollTrigger.update();
      
      // If we have saved progress, restore it
      if (resizeState.savedProgress && resizeState.timelineScrollTrigger) {
        const scrollTrigger = resizeState.timelineScrollTrigger;
        
        // Calculate new scroll position
        const start = scrollTrigger.start;
        const end = scrollTrigger.end;
        const scrollDistance = end - start;
        const targetScroll = start + (scrollDistance * resizeState.savedProgress.progress);
        
        console.log('Timeline Resize: Restoring to progress', resizeState.savedProgress.progress.toFixed(3));
        
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
          
          // Unlock marker after everything has settled
          setTimeout(() => {
            if (resizeState.markerLockRef && resizeState.markerLockRef.reason === 'resize') {
              resizeState.markerLockRef.isLocked = false;
              resizeState.markerLockRef.targetIndex = -1;
              resizeState.markerLockRef.reason = '';
              console.log('Timeline Resize: Marker unlocked');
            }
          }, 500);
          
          // Remove resizing class
          document.body.classList.remove('timeline-resizing');
          resizeState.isResizing = false;
          resizeState.savedProgress = null;
          
          console.log('Timeline Resize: Complete');
        }, 150); // Increased timeout for animation to settle
      } else {
        // No saved progress, just clean up
        document.body.classList.remove('timeline-resizing');
        resizeState.isResizing = false;
        resizeState.savedProgress = null;
        console.log('Timeline Resize: Complete (no saved state)');
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
      console.log('[Timeline] Pausing background shader for performance (film grain, waves, particles frozen)');
      
      // Also dispatch event for other systems that might need to know
      window.dispatchEvent(new CustomEvent('timeline:backgroundPaused', { detail: { paused: true } }));
    }
  } else {
    // We're exiting or entering timeline - resume global background
    if (window.backgroundPaused) {
      window.backgroundPaused = false;
      console.log('[Timeline] Resuming background shader (film grain, waves, particles active)');
      
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
  if (timelineScene && typeof timelineScene.dispose === 'function') {
    timelineScene.dispose();
  }
  
  // Clean up RAF, resize observer, and scroll listeners
  if (window._timelineCleanup) {
    if (window._timelineCleanup.rafId) {
      cancelAnimationFrame(window._timelineCleanup.rafId);
    }
    if (window._timelineCleanup.resizeObserver) {
      window._timelineCleanup.resizeObserver.disconnect();
    }
    if (window._timelineCleanup.lenisCallback && window.lenis) {
      window.lenis.off('scroll', window._timelineCleanup.lenisCallback);
    }
    if (window._timelineCleanup.scrollCallback) {
      window.removeEventListener('scroll', window._timelineCleanup.scrollCallback);
    }
    window._timelineCleanup = null;
  }
  
  // Dispose timeline shader
  if (window.timelineShaderControls) {
    window.timelineShaderControls.stop();
    window.timelineShaderControls = null;
  }
  
  // Ensure background is resumed when timeline is disposed
  if (window.backgroundPaused) {
    window.backgroundPaused = false;
    console.log('[Timeline] Cleanup: Resuming background shader');
    window.dispatchEvent(new CustomEvent('timeline:backgroundPaused', { detail: { paused: false } }));
  }
}
