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

  // Initialize Three.js scene for timeline visuals
  try {
    timelineScene = initTimelineScene();
    console.log('Timeline: Three.js scene initialized');
  } catch (error) {
    console.error('Timeline: Failed to initialize Three.js scene:', error);
    // Continue without Three.js visuals
  }

  // Function to position background to match the span (like a highlight box)
  const positionBgToSpan = () => {
    const rect = timelineWindowStart.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(timelineWindowStart);
    const parentRect = timelineWindowStart.parentElement.getBoundingClientRect();
    
    // Calculate actual text height accounting for line-height
    const fontSize = parseFloat(computedStyle.fontSize);
    const lineHeight = computedStyle.lineHeight === 'normal' ? fontSize * 1.2 : parseFloat(computedStyle.lineHeight);
    
    // Center the background within the span's bounding box
    const verticalOffset = (rect.height - fontSize) / 2;
    
    // Get current opacity (preserve during tracking)
    const currentOpacity = timelineWindowBg.style.opacity || '0';
    
    gsap.set(timelineWindowBg, {
      position: 'fixed',
      top: `${rect.top}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      backgroundImage: 'linear-gradient(to bottom, #0493E2, #0493E2)',
      zIndex: 0,
      opacity: currentOpacity, // Preserve current opacity
      borderRadius: '4px'
    });
  };

  // Set initial state - completely transparent
  gsap.set(timelineWindowBg, {
    opacity: 0
  });

  // Wait for SplitType to initialize, then position
  // Use requestAnimationFrame to ensure DOM is fully rendered
  requestAnimationFrame(() => {
    setTimeout(() => {
      positionBgToSpan();
    }, 100);
  });

  // Continuously update position on resize
  const resizeObserver = new ResizeObserver(() => {
    positionBgToSpan();
  });
  resizeObserver.observe(document.body);

  // Track scroll position and reposition until trigger activates
  // Always track the span position, regardless of scroll direction
  let isTracking = true;
  
  // Use Lenis's scroll event for smoother tracking with smooth scrolling
  const trackWithLenis = () => {
    if (isTracking && window.lenis) {
      positionBgToSpan();
    }
  };
  
  // Hook into Lenis scroll updates if available
  if (window.lenis) {
    window.lenis.on('scroll', trackWithLenis);
  }
  
  // Fallback to setInterval if Lenis isn't available or as additional safety
  let trackingInterval = setInterval(() => {
    if (isTracking) {
      positionBgToSpan();
    }
  }, 16); // ~60fps

  // Calculate total horizontal scroll distance
  const events = gsap.utils.toArray('.timeline-event');
  // Track width: 100vw padding + (remaining events * 100vw)
  // First event is absolute positioned, so only count remaining events
  const remainingEventsCount = events.length - 1;
  const trackWidth = window.innerWidth + (remainingEventsCount * window.innerWidth);

  // Phase 0: Fade in background highlight after get-involved-message text is visible
  gsap.timeline({
    scrollTrigger: {
      trigger: timelineWindowStart,
      start: 'top 90%', // Start fade when span itself enters viewport
      end: 'top 70%',   // Complete fade quickly once visible
      scrub: 1,
      onLeaveBack: () => {
        // Fade back out when scrolling up
        gsap.to(timelineWindowBg, {
          opacity: 0,
          duration: 0.3
        });
      }
    }
  }).to(timelineWindowBg, {
    opacity: 0.5,
    ease: 'power2.out'
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
        // Capture position right before pin activates (at start)
        if (self.progress < 0.01 && !capturedPosition) {
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
        isTracking = false; // Stop continuous repositioning
        // Lock the background to its captured position while preserving other styles
        if (capturedPosition) {
          gsap.set(timelineWindowBg, {
            top: `${capturedPosition.top}px`,
            left: `${capturedPosition.left}px`,
            width: `${capturedPosition.width}px`,
            height: `${capturedPosition.height}px`,
            backgroundImage: 'linear-gradient(to bottom, #0493E2, #0493E2)',
            borderRadius: '4px'
          });
        }
        console.log('Timeline: Pinning get-involved-message and expanding background', capturedPosition);
      },
      onLeaveBack: () => {
        isTracking = true; // Resume tracking if scrolling back up
        capturedPosition = null; // Reset captured position
        // Immediately reposition multiple times to sync with Lenis
        requestAnimationFrame(() => {
          positionBgToSpan();
          requestAnimationFrame(() => {
            positionBgToSpan();
            setTimeout(() => {
              positionBgToSpan();
            }, 50);
          });
        });
        console.log('Timeline: Resuming background tracking');
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
          height: `${capturedPosition.height}px`
        };
      }
      const rect = timelineWindowStart.getBoundingClientRect();
      return {
        top: `${rect.top}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`
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
      duration: 0.7
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
      end: `+=${trackWidth}`,
      pin: timelineContainer,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        updateTimelineScrubber(self.progress);
        manageBackgroundPause(self.progress);
      },
      onEnter: () => {
        console.log('Timeline: Entering timeline section');
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
    
    // Phase A: First event (1876) - Pinned in center, fades in then out (8% of timeline)
    // Fade in first event - slower and softer
    tl.fromTo(
      firstEvent,
      {
        opacity: 0,
        scale: 0.98
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.025,
        ease: 'power1.out'
      },
      0.04
    );
    
    // Hold first event visible
    tl.to({}, { duration: 0.025 }, 0.065);
    
    // Fade out first event - slower and softer
    tl.to(
      firstEvent,
      {
        opacity: 0,
        scale: 1.02,
        duration: 0.025,
        ease: 'power1.in'
      },
      0.09
    );
    
    // Phase B: Horizontal scrolling starts after first event fades (remaining timeline)
    const horizontalStartProgress = 0.13; // Start at 13% after first event
    const horizontalDuration = 0.75; // 75% of timeline for horizontal scroll
    
    tl.to(
      timelineTrack,
      {
        x: -trackWidth + window.innerWidth,
        duration: horizontalDuration,
        ease: 'none'
      },
      horizontalStartProgress
    );

    // Animate remaining events based on their position during horizontal scroll
    remainingEvents.forEach((event, index) => {
      const totalRemaining = remainingEvents.length;
      
      // Calculate the duration allocated for each event in the timeline
      const eventDuration = horizontalDuration / totalRemaining;
      
      // Base progress point when this event starts entering from right edge
      const eventBaseProgress = horizontalStartProgress + (index * eventDuration);
      
      // Calculate progress points for this event's journey through viewport:
      // - Event enters from right edge (0%)
      // - Event is 33% into viewport (fade-in complete)
      // - Event is 50% centered (marker activation)
      // - Event is 67% through viewport (fade-out starts)
      // - Event exits left edge (100% gone)
      
      const enterStart = eventBaseProgress;
      const enter33Percent = eventBaseProgress + (0.33 * eventDuration);
      const eventCenter = eventBaseProgress + (0.5 * eventDuration);
      const exit67Percent = eventBaseProgress + (0.67 * eventDuration);
      const exitComplete = eventBaseProgress + eventDuration;
      
      // Fade-in duration: from entering (0%) to 33% through viewport
      const fadeInDuration = enter33Percent - enterStart;
      
      // Fade-out duration: from 67% through viewport to fully exited (100%)
      const fadeOutDuration = exitComplete - exit67Percent;
      
      // Debug logging
      console.log(`Event ${index} timing:`, {
        enterStart: enterStart.toFixed(3),
        enter33: enter33Percent.toFixed(3),
        center: eventCenter.toFixed(3),
        exit67: exit67Percent.toFixed(3),
        exitComplete: exitComplete.toFixed(3),
        fadeInDur: fadeInDuration.toFixed(3),
        fadeOutDur: fadeOutDuration.toFixed(3)
      });

      // Phase 1: Fade in as event enters (0% to 33% through viewport)
      tl.fromTo(
        event,
        {
          opacity: 0
        },
        {
          opacity: 1,
          duration: fadeInDuration,
          ease: 'power2.out'
        },
        enterStart
      );

      // Phase 2: Stay at full opacity (33% to 67% through viewport)
      // This happens automatically - no animation needed

      // Phase 3: Fade out as event exits (67% to 100% through viewport)
      // Skip for last event so it stays visible
      if (index < remainingEvents.length - 1) {
        tl.to(
          event,
          {
            opacity: 0,
            duration: fadeOutDuration,
            ease: 'power2.in'
          },
          exit67Percent
        );
      }
      
      // Store center progress for scrubber marker activation
      event.dataset.centerProgress = eventCenter;
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

  // Store cleanup references
  window._timelineCleanup = {
    interval: trackingInterval,
    resizeObserver: resizeObserver,
    lenisCallback: trackWithLenis
  };

  return tl;
}

// Handle window resize - recalculate dimensions
function refreshTimelineDimensions() {
  ScrollTrigger.refresh();
  // The getBoundingClientRect() will be recalculated on refresh
}

window.addEventListener('resize', () => {
  clearTimeout(window.timelineResizeTimeout);
  window.timelineResizeTimeout = setTimeout(refreshTimelineDimensions, 250);
});

function manageBackgroundPause(progress) {
  // Pause background when fully in timeline (after fade-ins complete)
  const pauseThreshold = 0.1; // Pause at 10% progress (after fade-ins)
  const resumeThresholdEnd = 0.95; // Resume at 95% when scrolling down

  if (progress > pauseThreshold && progress < resumeThresholdEnd) {
    // We're fully in the timeline - pause global background
    if (!window.backgroundPaused) {
      window.backgroundPaused = true;
      console.log('Timeline: Pausing global background for performance');
    }
  } else {
    // We're exiting or entering timeline - resume global background
    if (window.backgroundPaused) {
      window.backgroundPaused = false;
      console.log('Timeline: Resuming global background');
    }
  }
}

function updateTimelineScrubber(progress) {
  const scrubberProgress = document.querySelector('.scrubber-progress');
  const markers = gsap.utils.toArray('.marker');
  const events = gsap.utils.toArray('.timeline-event');

  if (!scrubberProgress) return;

  // Calculate progress based on which event is centered
  let scrubberProgressValue = 0;
  let activeMarkerIndex = -1;
  
  // First event (cover) is active from 4-9%
  if (progress >= 0.04 && progress < 0.13) {
    scrubberProgressValue = 0;
    activeMarkerIndex = 0;
  } else if (progress >= 0.13) {
    // After cover event, calculate based on event center positions
    const remainingEvents = events.slice(1);
    
    remainingEvents.forEach((event, index) => {
      const centerProgress = parseFloat(event.dataset.centerProgress);
      const markerIndex = index + 1; // +1 because first marker is for cover event
      
      if (progress >= centerProgress) {
        // This event has reached or passed center
        const totalMarkers = markers.length;
        scrubberProgressValue = markerIndex / (totalMarkers - 1); // Normalized 0-1
        activeMarkerIndex = markerIndex;
      }
    });
  }

  // Update progress line
  gsap.to(scrubberProgress, {
    scaleX: scrubberProgressValue,
    transformOrigin: 'left',
    duration: 0.3,
    ease: 'power2.out'
  });

  // Update active marker
  if (markers.length > 0) {
    markers.forEach((marker, index) => {
      if (index === activeMarkerIndex) {
        marker.classList.add('active');
      } else {
        marker.classList.remove('active');
      }
    });
  }
}

// Export cleanup function
export function disposeTimeline() {
  if (timelineScene && typeof timelineScene.dispose === 'function') {
    timelineScene.dispose();
  }
  
  // Clean up interval, resize observer, and Lenis listener
  if (window._timelineCleanup) {
    if (window._timelineCleanup.interval) {
      clearInterval(window._timelineCleanup.interval);
    }
    if (window._timelineCleanup.resizeObserver) {
      window._timelineCleanup.resizeObserver.disconnect();
    }
    if (window._timelineCleanup.lenisCallback && window.lenis) {
      window.lenis.off('scroll', window._timelineCleanup.lenisCallback);
    }
    window._timelineCleanup = null;
  }
  
  window.backgroundPaused = false;
}

