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
    
    // Calculate actual text height accounting for line-height
    const fontSize = parseFloat(computedStyle.fontSize);
    
    // Center the background within the span's bounding box
    
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
  const remainingEventsCount = events.length - 1;
  
  // Define scroll durations (in viewport heights)
  // Much larger scroll area to accommodate pause/hold
  const initialPhaseDuration = window.innerHeight * 1.0; // Phase A - giving it a full hold duration
  const scrollPerEvent = window.innerHeight * 2.0; // Move + Hold per event
  
  const totalScrollDistance = initialPhaseDuration + (remainingEventsCount * scrollPerEvent);
  
  // Adjust animation durations (relative timeline units)
  const moveDuration = 1.0;
  const holdDuration = 1.0; // Equal time holding as moving
  const totalCycleDuration = moveDuration + holdDuration;
  
  // Calculate theoretical total duration of the timeline for accurate scrubbing
  // Phase A: 0.04 (delay) + 0.05 (fade) + 1.0 (hold) = 1.09
  const phaseADuration = 0.09 + holdDuration; 
  const phaseBDuration = remainingEventsCount * totalCycleDuration;
  const timelineTotalDuration = phaseADuration + phaseBDuration;

  // Helper to update scrubber based on dynamic lengths
  const updateScrubber = (progress) => {
    const scrubberProgress = document.querySelector('.scrubber-progress');
    const markers = gsap.utils.toArray('.marker');
    
    if (!scrubberProgress) return;
    
    const totalMarkers = markers.length;
    let activeMarkerIndex = 0;
    let scrubberProgressValue = 0;
    
    // Calculate threshold based on timeline duration ratios
    // This matches exactly how GSAP distributes the scroll distance
    const coverThreshold = phaseADuration / timelineTotalDuration;
    
    if (progress < coverThreshold) {
      activeMarkerIndex = 0;
      scrubberProgressValue = 1 / (2 * totalMarkers);
    } else {
      const remainingProgress = progress - coverThreshold;
      const adjustedTotal = 1.0 - coverThreshold;
      const normalizedProgress = remainingProgress / adjustedTotal;
      
      const remainingEventsCount = events.length - 1;
      // Map normalized progress to the cycle count (e.g., 0.0 to 4.0 for 4 remaining events)
      const floatCycle = normalizedProgress * remainingEventsCount;
      
      // Determine active marker:
      // Cycle 0 (Event 1): 0.0 - 0.5 (Move) -> Marker 0 active
      //                    0.5 - 1.0 (Hold) -> Marker 1 active
      // Logic: floor(cycle + 0.5)
      const calculatedIndex = Math.floor(floatCycle + 0.5);
      
      // Clamp index to valid range (0 to N)
      activeMarkerIndex = Math.min(calculatedIndex, totalMarkers - 1);
      
      // Calculate scrubber position
      // Use space-around formula: (2 * i + 1) / (2 * n)
      scrubberProgressValue = (2 * activeMarkerIndex + 1) / (2 * totalMarkers);
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
      end: `+=${totalScrollDistance}`,
      pin: timelineContainer,
      scrub: 1, // smooth scrubbing
      anticipatePin: 1,
      invalidateOnRefresh: true,
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
      const targetX = -(index + 1) * window.innerWidth;
      
      const eventLabel = `event-${index}`;
      
      // 1. Move Track
      tl.to(timelineTrack, {
        x: targetX,
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
    interval: trackingInterval,
    resizeObserver: resizeObserver,
    lenisCallback: trackWithLenis
  };

  // Force a refresh to ensure subsequent ScrollTriggers (like sliding cards) 
  // recalculate their positions after the timeline pin is set up
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });

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

// Remove the old updateTimelineScrubber function from the bottom of the file as it is now defined inside initTimelineAnimation
function updateTimelineScrubber(progress) {
  // This function is now deprecated/replaced by the internal updateScrubber
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
