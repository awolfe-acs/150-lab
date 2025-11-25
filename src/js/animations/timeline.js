import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { initTimelineScene } from '../threejs/timelineScene.js';

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
  
  // Check if required elements exist
  if (!timeline || !timelineWindowStart || !timelineWindowBg || !getInvolvedMessage) {
    console.warn('Timeline: Required elements not found. Skipping timeline initialization.');
    return;
  }

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

  // Cache for position with interpolation to prevent jitter
  let lastPosition = { top: 0, left: 0, width: 0, height: 0 };
  let targetPosition = { top: 0, left: 0, width: 0, height: 0 };
  
  // Lerp (linear interpolation) for smooth transitions
  const lerp = (start, end, factor) => start + (end - start) * factor;
  
  // Function to position background to match the span (like a highlight box)
  const positionBgToSpan = () => {
    // Check if elements still exist
    if (!timelineWindowStart || !timelineWindowBg) return;
    
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
    
    // Enable GPU acceleration for smoother rendering
    timelineWindowBg.style.willChange = 'top, left, width, height, opacity';
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
  const getScrollPerEvent = () => window.innerHeight * 2.0;
  const getTotalScrollDistance = () => getInitialPhaseDuration() + (remainingEventsCount * getScrollPerEvent());
  
  // Initial values
  const initialPhaseDuration = getInitialPhaseDuration();
  const scrollPerEvent = getScrollPerEvent();
  const totalScrollDistance = getTotalScrollDistance();
  
  // Adjust animation durations (relative timeline units)
  const moveDuration = 1.0;
  const holdDuration = 0.2; // Reduced by 80% for faster scroll transitions
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

  // Helper to update scrubber based on decades (not individual events)
  const updateScrubber = (progress) => {
    const scrubberProgress = document.querySelector('.scrubber-progress');
    const markers = gsap.utils.toArray('.marker');
    
    if (!scrubberProgress || !decades.length) return;
    
    const totalMarkers = markers.length;
    let activeMarkerIndex = 0;
    let scrubberProgressValue = 0;
    
    // If marker is locked (click or resize), use the locked target index
    if (markerLock.isLocked && markerLock.targetIndex >= 0) {
      activeMarkerIndex = markerLock.targetIndex;
      scrubberProgressValue = (2 * activeMarkerIndex + 1) / (2 * totalMarkers);
    } else {
      // Calculate threshold based on timeline duration ratios
      const coverThreshold = phaseADuration / timelineTotalDuration;
      
      if (progress < coverThreshold) {
        // We're in the cover/first event phase
        activeMarkerIndex = 0;
        scrubberProgressValue = 1 / (2 * totalMarkers);
      } else {
        const remainingProgress = progress - coverThreshold;
        const adjustedTotal = 1.0 - coverThreshold;
        const normalizedProgress = remainingProgress / adjustedTotal;
        
        // Map progress to decades (excluding first decade if it's the cover)
        // Determine which decade we're in based on how many events we've passed
        const firstDecade = decades[0];
        const firstDecadeEvents = gsap.utils.toArray('.timeline-event', firstDecade);
        const isFirstDecadeCover = firstDecadeEvents.length === 1 && firstDecadeEvents[0].classList.contains('timeline-cover');
        
        // Calculate cumulative event positions to determine current decade
        let cumulativeEvents = 0;
        let currentDecadeIndex = 0;
        
        // Calculate how many events have been passed based on progress
        const totalRemainingEvents = remainingEventsCount;
        const eventsPassed = Math.floor(normalizedProgress * totalRemainingEvents);
        
        // Find which decade this event belongs to
        if (isFirstDecadeCover) {
          // First decade is just the cover, start counting from second decade
          const remainingDecades = decades.slice(1);
          for (let i = 0; i < remainingDecades.length; i++) {
            const decadeEvents = gsap.utils.toArray('.timeline-event', remainingDecades[i]);
            if (eventsPassed < cumulativeEvents + decadeEvents.length) {
              currentDecadeIndex = i + 1; // +1 because first is cover
              break;
            }
            cumulativeEvents += decadeEvents.length;
            currentDecadeIndex = i + 1;
          }
        } else {
          // First decade contains events, count from there
          for (let i = 0; i < decades.length; i++) {
            const decadeEvents = gsap.utils.toArray('.timeline-event', decades[i]);
            if (eventsPassed < cumulativeEvents + decadeEvents.length) {
              currentDecadeIndex = i;
              break;
            }
            cumulativeEvents += decadeEvents.length;
            currentDecadeIndex = i;
          }
        }
        
        activeMarkerIndex = Math.min(currentDecadeIndex, totalMarkers - 1);
        scrubberProgressValue = (2 * activeMarkerIndex + 1) / (2 * totalMarkers);
      }
    }

    gsap.to(scrubberProgress, {
      scaleX: scrubberProgressValue,
      transformOrigin: 'left',
      duration: 0.3,
      ease: 'power2.out'
    });

    if (markers.length > 0) {
      markers.forEach((marker, index) => {
        // Remove all classes first
        marker.classList.remove('active', 'complete');
        
        if (index === activeMarkerIndex) {
          marker.classList.add('active');
        } else if (index < activeMarkerIndex) {
          marker.classList.add('complete');
        }
        // If index > activeMarkerIndex, it remains with just base .marker class
      });
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
        // REAL-TIME visibility management - runs EVERY FRAME for instant response
        const progress = self.progress;
        const handoffThreshold = 0.01; // 1% - very tight threshold
        
        const styleEl = document.getElementById('timeline-window-start-bg-style');
        
        // CRITICAL SAFETY CHECK: If pseudo-element has ANY opacity, BG MUST be 0
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

  // Fade out the get-involved-message (starts at 40%, ends at 100%)
  expansionTl.to(getInvolvedMessage, {
    opacity: 0,
    ease: 'power2.in',
    duration: 0.6
  }, 0.4);

  // Phase 2: Master timeline for all timeline animations (starts after get-involved-message pin)
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: timeline,
      start: 'top top',
      end: () => `+=${getTotalScrollDistance()}`, // Function to recalculate on resize
      pin: timelineContainer,
      scrub: 1, // smooth scrubbing
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onRefresh: (self) => {
        // Called after refresh/resize - ensure animations are in correct state
        console.log('Timeline: ScrollTrigger refreshed, progress:', self.progress.toFixed(3));
        
        // Update scrubber and background state immediately
        if (self.animation) {
          updateScrubber(self.animation.progress());
          manageBackgroundPause(self.progress);
        }
      },
      onUpdate: (self) => {
        // Use animation progress to account for scrub lag (visual position)
        updateScrubber(self.animation.progress());
        manageBackgroundPause(self.progress);
        
        // Ensure background stays opaque during timeline scrub
        if (self.progress > 0 && self.progress < 0.95) {
          if (timelineWindowBg.style.opacity !== '1') {
            timelineWindowBg.style.opacity = '1';
          }
        }
      },
      onEnter: () => {
        console.log('Timeline: Entering timeline section');
        // Ensure background is fully visible when entering timeline proper
        gsap.to(timelineWindowBg, { opacity: 1, duration: 0.2, overwrite: 'auto' });
      },
      onLeave: () => {
        console.log('Timeline: Leaving timeline section');
      }
    }
  });

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

  // Fade in close button
  tl.from(
    '.timeline-close',
    {
      opacity: 0,
      scale: 0.8,
      duration: 0.03
    },
    0.02
  );

  // Handle timeline events
  if (events.length > 0) {
    const firstEvent = events[0];
    const remainingEvents = events.slice(1);
    
    // Phase A: First event (1876) - Pinned in center, fades in then out
    // Fade in first event
    tl.fromTo(
      firstEvent,
      {
        opacity: 0,
        scale: 0.98
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.05,
        ease: 'power1.out'
      },
      0.04
    );
    
    // Hold first event visible
    tl.to({}, { duration: holdDuration }, '>');
    
    // Fade in the background decal image during the hold
    tl.to(timelineWindowBg, {
      '--decal-opacity': 1,
      duration: holdDuration * 0.6,
      ease: 'power2.out',
      onUpdate: function() {
        // Update the ::after pseudo-element opacity via custom property
        const opacityValue = gsap.getProperty(timelineWindowBg, '--decal-opacity') || 0;
        timelineWindowBg.style.setProperty('--decal-opacity', opacityValue);
      }
    }, `<+=${holdDuration * 0.2}`); // Start 20% into the hold
    
    // NOTE: We don't fade out first event here anymore, 
    // it will fade out as part of the main loop transition
    
    // Phase B: Horizontal scrolling loop
    // We chain movements and holds
    
    // Initial accumulated duration (after Phase A)
    // GSAP timelines append automatically, so we just add to the timeline
    
    remainingEvents.forEach((event, index) => {
      // Calculate target X to center this event
      // Event 1 is at 100vw, needs to move to 0 -> x: -100vw
      // Event 2 is at 200vw, needs to move to 0 -> x: -200vw
      // Use function to get current width on invalidate
      const getTargetX = () => -(index + 1) * window.innerWidth;
      
      const eventLabel = `event-${index}`;
      
      // 1. Move Track
      tl.to(timelineTrack, {
        x: getTargetX,
        duration: moveDuration,
        ease: 'power1.inOut'
      }, eventLabel);
      
      // 2. Handle Opacity during Move
      
      // Fade Out Previous Event (or Cover Event if index is 0)
      const prevEvent = index === 0 ? firstEvent : remainingEvents[index - 1];
      
      // Fade out LATE in the movement (so it stays visible longer)
      // Start fading out at 40% of movement, end at 90%
      tl.to(prevEvent, {
        opacity: 0,
        scale: 1.02,
        duration: moveDuration * 0.5,
        ease: 'power1.in'
      }, `${eventLabel}+=${moveDuration * 0.4}`);
      
      // Fade In Current Event
      // Fade in EARLY in the movement (but not too early)
      // Start fading in at 30% of movement, end at 80%
      tl.fromTo(event, {
        opacity: 0,
        scale: 0.98
      }, {
        opacity: 1,
        scale: 1,
        duration: moveDuration * 0.5,
        ease: 'power1.out'
      }, `${eventLabel}+=${moveDuration * 0.3}`);
      
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
      // Scroll to the end of the timeline section
      const endPosition = timeline.offsetTop + timeline.offsetHeight;
      window.lenis?.scrollTo(endPosition, { duration: 1.5 });
    });
  }

  // Add click handlers to timeline scrubber markers
  const markers = gsap.utils.toArray('.marker');
  markers.forEach((marker, index) => {
    marker.addEventListener('click', () => {
      // Lock the marker to prevent updateScrubber from changing it during scroll
      markerLock.isLocked = true;
      markerLock.targetIndex = index;
      markerLock.reason = 'click';
      
      // Clear any existing unlock timer
      if (markerLock.unlockTimer) {
        clearTimeout(markerLock.unlockTimer);
      }
      
      // Immediately set the clicked marker as active
      markers.forEach((m, i) => {
        m.classList.remove('active', 'complete');
        if (i === index) {
          m.classList.add('active');
        } else if (i < index) {
          m.classList.add('complete');
        }
      });
      
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
      
      console.log(`Marker Click: Index ${index}, Target Progress: ${targetProgress.toFixed(3)}, Target Scroll: ${targetScroll.toFixed(0)}`);
      
      // Smooth scroll to the target position
      if (window.lenis) {
        window.lenis.scrollTo(targetScroll, { 
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
          onComplete: () => {
            // Unlock after scroll completes, with a small delay for scrub to settle
            markerLock.unlockTimer = setTimeout(() => {
              markerLock.isLocked = false;
              markerLock.targetIndex = -1;
              markerLock.reason = '';
              console.log('Marker Click: Unlocked after scroll complete');
            }, 500);
          }
        });
      } else {
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
        
        // Fallback unlock timer for native scroll
        markerLock.unlockTimer = setTimeout(() => {
          markerLock.isLocked = false;
          markerLock.targetIndex = -1;
          markerLock.reason = '';
          console.log('Marker Click: Unlocked after scroll complete (native)');
        }, 1500);
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
      }
    }
  }).to([timelineWindowBg, timeline], {
    opacity: 0,
    ease: 'power2.in'
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
  const timelineScrollTrigger = resizeState.timelineScrollTrigger;
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
  
  // Ensure background is resumed when timeline is disposed
  if (window.backgroundPaused) {
    window.backgroundPaused = false;
    console.log('[Timeline] Cleanup: Resuming background shader');
    window.dispatchEvent(new CustomEvent('timeline:backgroundPaused', { detail: { paused: false } }));
  }
}
