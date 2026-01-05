import * as THREE from "three";
import * as dat from "dat.gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import globeModelUrl from "../../public/models/globe-hd.glb?url";
import performanceDetector from "./utils/performanceDetector.js";
import { AdaptiveRenderer } from "./utils/adaptiveRenderer.js";
import { PerformanceMonitor } from "./utils/performanceMonitor.js";
import memoryManager from "./utils/memoryManager.js";
import aemModeDetector from "./utils/aemModeDetector.js";

// Helper function to get preloaded asset URL or fallback
function getPreloadedAssetUrl(assetName, fallbackUrl) {
  if (window.PRELOADED_ASSETS && window.PRELOADED_ASSETS[assetName]) {
    const assetData = window.PRELOADED_ASSETS[assetName];
    if (assetData instanceof ArrayBuffer) {
      // Create blob URL for binary data
      const blob = new Blob([assetData]);
      return URL.createObjectURL(blob);
    }
  }
  return fallbackUrl;
}

export async function initShaderBackground() {
  // Prevent multiple initializations
  if (window.shaderBackgroundInitialized) {
    console.warn("Shader background already initialized. Skipping...");
    return;
  }

  // Check AEM mode first
  const aemMode = aemModeDetector.detect();
  const aemSettings = aemModeDetector.getSettings();
  
  // If in fallback mode (AEM Edit), skip initialization entirely
  if (aemSettings.mode === 'fallback' || !aemSettings.enableBackground) {
    console.log('[Background Init] Skipping initialization - AEM fallback mode detected');
    console.log('[Background Init] AEM Mode:', aemMode);
    
    // Apply static background
    aemModeDetector.applyStaticBackground();
    
    // Mark as initialized to prevent retries
    window.shaderBackgroundInitialized = true;
    return;
  }

  // Detect device performance tier
  const performanceTier = await performanceDetector.detect();
  const perfSettings = performanceDetector.getSettings();
  
  console.log('[Background Init] AEM Mode:', aemMode);
  console.log('[Background Init] Performance Tier:', performanceTier);
  console.log('[Background Init] Settings:', perfSettings);

  // Set up default values
  window.colorPhase = 1; // Start in phase one (default colors)
  window.specialColorsActive = false;
  window.particlesFullyHidden = false;
  window.particlesMovementPaused = false;

  // Track time spent in phase 1 to prevent time accumulation issues
  let phase1StartTime = Date.now();
  const PHASE1_RESET_TIMEOUT = 6000000000;

  // Helper function to check if we're above the Phase 3 trigger point
  function isAbovePhase3Trigger() {
    const eventsElement = document.querySelector("#events");
    if (!eventsElement) return true; // If we can't find events element, assume we're above it

    const rect = eventsElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Phase 3 trigger starts when events top is at 120% (20% below viewport)
    // So we're "above" the trigger when events top is > 120% from viewport top
    const triggerPoint = viewportHeight * 1.2; // 120% of viewport height
    const eventsTopPosition = rect.top;

    return eventsTopPosition > triggerPoint;
  }

  // Get the canvas element
  const canvas = document.getElementById("shaderBackground");
  if (!canvas) return;

  // Check for WebGL support before proceeding
  function checkWebGLSupport() {
    try {
      const testCanvas = document.createElement("canvas");
      const webglContext = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!webglContext) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  // If WebGL is not supported, show a fallback and exit gracefully
  if (!checkWebGLSupport()) {
    console.warn("WebGL is not supported on this device/browser. Skipping shader background initialization.");
    // Hide the canvas and show a fallback background color
    canvas.style.display = "none";
    document.body.style.backgroundColor = "#1a1a2e"; // Fallback dark background
    return;
  }

  // Global state to track special colors activation
  window.specialColorsActive = false;
  // Track which color phase we're in (0 = cover area, 1 = original, 2 = hero-travel-area, 3 = events section)
  window.colorPhase = 0;

  // Use GSAP and ScrollTrigger from global scope (imported by main.js)
  // Wait a bit to ensure main.js has finished initializing
  setTimeout(() => {
    if (typeof window.gsap !== "undefined") {
      setupColorDarknessAnimation(window.gsap, window.gsap.ScrollTrigger);
    } else {
      console.warn("GSAP not found on window object - ScrollTrigger animations may not work");
    }
  }, 200);

  // Function to set up the color darkness animation with ScrollTrigger
  function setupColorDarknessAnimation(gsap, ScrollTrigger) {
    // Store original colors for reverting later
    let originalColor1, originalColor2;

    // Store original wave and lighting parameters for reverting later
    let originalWaveSpeed,
      originalWaveAmplitude,
      originalWaveFrequency,
      originalAmbientLight,
      originalDirectionalLight,
      originalYOffset;

    // Find the video-travel-area element
    const videoTravelArea = document.querySelector("#video-travel-area");

    if (!videoTravelArea) {
      console.warn("Could not find #video-travel-area element for shader animation");
      return;
    }

    // Save original colors and wave parameters when the function runs
    if (uniforms && uniforms.color1 && uniforms.color2) {
      originalColor1 = uniforms.color1.value.clone();
      originalColor2 = uniforms.color2.value.clone();

      // Store original wave and lighting parameters
      originalWaveSpeed = uniforms.waveSpeed.value;
      originalWaveAmplitude = uniforms.waveAmplitude.value;
      originalWaveFrequency = uniforms.waveFrequency.value;
      originalAmbientLight = uniforms.ambientLight.value;
      originalDirectionalLight = uniforms.directionalLight.value;
      originalYOffset = uniforms.yOffset.value;
    }

    // Create ScrollTrigger to animate the colorDarkness value
    gsap.timeline({
      scrollTrigger: {
        trigger: "#intro-text-travel-area",
        start: "35% top", // Start when intro-text begins fading out (matches fade-out timing)
        end: "45% top", // Complete by 45% to match text fade completion
        scrub: true, // Smooth scrubbing effect, tied to scroll position
        markers: false, // Set to true for debugging
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Update the colorDarkness value based on progress
          if (uniforms && uniforms.colorDarkness) {
            // Map progress (0-1) to colorDarkness (0-2)
            uniforms.colorDarkness.value = self.progress * 2.0;

            // When colorDarkness reaches 2.0 (or very close to it), change the colors
            if (uniforms.colorDarkness.value >= 1.95) {
              // Only change colors if we're still in phase one
              // Phase two and three colors are controlled separately by scroll triggers
              if (window.colorPhase === 1) {
                // Phase one special colors
                if (uniforms.color1) uniforms.color1.value.set(originalColor1);
                if (uniforms.color2) uniforms.color2.value.set(originalColor2);
                window.specialColorsActive = true;
              } else if (window.colorPhase === 0) {
                // Phase zero special colors
                if (uniforms.color1) uniforms.color1.value.set("#e2e2e2");
                if (uniforms.color2) uniforms.color2.value.set("#515151");
                window.specialColorsActive = true;
              }
            } else if (originalColor1 && originalColor2) {
              // Revert to original colors when not fully dark
              if (window.colorPhase === 1) {
                if (uniforms.color1) uniforms.color1.value.copy(originalColor1);
                if (uniforms.color2) uniforms.color2.value.copy(originalColor2);
                window.specialColorsActive = false;
              } else if (window.colorPhase === 0) {
                // Revert to phase zero colors
                if (uniforms.color1) uniforms.color1.value.set("#e2e2e2");
                if (uniforms.color2) uniforms.color2.value.set("#515151");
                window.specialColorsActive = false;
              }
            }

            // Update the GUI if it exists
            updateColorDarknessGUI();
          }
        },
      },
    });

    // Setup events animation with a slight delay to ensure DOM is fully processed
    setTimeout(() => {
      setupAnniversaryEventsAnimation(gsap, ScrollTrigger, originalColor1, originalColor2);
    }, 100);

    // Find the get-involved section
    const getInvolvedSection = document.querySelector("#get-involved");

    if (!getInvolvedSection) {
      console.warn("Could not find #get-involved element for globe opacity animation");
      return;
    }

    // Create ScrollTrigger to animate both the globe and overlay
    gsap.timeline({
      scrollTrigger: {
        trigger: "#get-involved",
        start: "top bottom", // Starts when the top of get-involved reaches the bottom of viewport
        end: "#get-involved-earth center center", // Ends when the middle of get-involved-earth reaches the middle of viewport
        scrub: true, // Smooth scrubbing effect, tied to scroll position
        markers: false, // Set to true for debugging
        onUpdate: (self) => {
          const progress = self.progress;

          // Handle Globe Model Visibility and Opacity
          if (globeModel) {
            // First make the globe visible once we have any progress
            if (progress > 0.01 && !globeModel.visible) {
              globeModel.visible = true;
              globeParams.visible = true;

              // Update visibility toggle in GUI if it exists
              updateGlobeVisibilityGUI();
            } else if (progress <= 0.01 && globeModel.visible) {
              globeModel.visible = false;
              globeParams.visible = false;

              // Update visibility toggle in GUI if it exists
              updateGlobeVisibilityGUI();
            }

            // Update opacity on all materials
            if (globeModel.visible) {
              globeModel.traverse((child) => {
                if (child.isMesh && child.material) {
                  child.material.transparent = true;
                  child.material.opacity = progress;
                }
              });

              // Update globeParams for reference
              globeParams.opacity = progress;

              // Update any opacity controllers in the GUI
              updateGlobeOpacityGUI();
            }
          }

          // Handle Overlay Visibility and Opacity
          if (overlayMesh) {
            // First make the overlay visible once we have any progress
            if (progress > 0.01 && !overlayMesh.visible) {
              overlayMesh.visible = true;
              overlayParams.enabled = true;

              // Update visibility toggle in GUI if it exists
              updateOverlayVisibilityGUI();
            } else if (progress <= 0.01 && overlayMesh.visible) {
              overlayMesh.visible = false;
              overlayParams.enabled = false;

              // Update visibility toggle in GUI if it exists
              updateOverlayVisibilityGUI();
            }

            // Update overlay opacity to match globe opacity
            if (overlayMaterial && overlayMaterial.uniforms) {
              if (progress > 0.01 && overlayMesh.visible) {
                // Scale the start and end opacity by the progress value
                overlayMaterial.uniforms.startOpacity.value = overlayParams.startOpacity * progress;
                overlayMaterial.uniforms.endOpacity.value = overlayParams.endOpacity * progress;
              } else {
                // Ensure opacity is exactly 0 when progress is <= 0.01
                overlayMaterial.uniforms.startOpacity.value = 0;
                overlayMaterial.uniforms.endOpacity.value = 0;
              }
            }
          }
        },
      },
    });

    // Create ScrollTrigger to fade out particles when entering #get-involved
    gsap.timeline({
      scrollTrigger: {
        trigger: "#get-involved",
        start: "top 90%", // Start when the top of get-involved is 90% from the top of viewport
        end: "bottom top", // Continue until the bottom of get-involved exits the top of viewport
        scrub: 0.5, // Reduced from true to 0.5 for less delay but still smooth scrubbing
        markers: false, // Set to true for debugging
        onUpdate: (self) => {
          // Get the current progress from start to end
          const progress = self.progress;

          // We only want to fade out in the first portion of this range,
          // but keep particles hidden after that threshold

          // Define the portion of the total range where fade-out occurs (0 to 1)
          // Reduced from 0.2 to 0.15 to fade out faster
          const fadeOutThreshold = 0.15;

          // Store a flag indicating if particles should be fully hidden
          // This helps prevent any fade-in after Lenis easing settles
          if (!window.particlesFullyHidden && progress >= fadeOutThreshold) {
            window.particlesFullyHidden = true;
            // Pause particle movement to improve performance when hidden
            window.particlesMovementPaused = true;
          } else if (window.particlesFullyHidden && progress < fadeOutThreshold * 0.8) {
            // Only reset when we're well below the threshold (added 20% buffer)
            window.particlesFullyHidden = false;
            // Resume particle movement when visible again
            window.particlesMovementPaused = false;
          }

          // If particles should be fully hidden, force opacity to 0
          if (window.particlesFullyHidden) {
            if (customParticleMaterial && customParticleMaterial.uniforms && customParticleMaterial.uniforms.opacity) {
              customParticleMaterial.uniforms.opacity.value = 0;

              // Update GUI if necessary
              updateParticleOpacityGUI(0);
            }
            return; // Skip the rest of the calculation
          }

          // If we're here, we're in the fade transition zone
          // Calculate a modified progress that maxes out at fadeOutThreshold
          const fadeOutProgress = Math.min(progress / fadeOutThreshold, 1);

          // Calculate the inverse (1 at start, 0 when fully faded)
          const inverseProgress = 1 - fadeOutProgress;

          // Apply a steeper power curve for an even quicker initial fade (power of 3 instead of 2)
          const curvedProgress = Math.pow(inverseProgress, 3);

          // Use the existing max opacity value
          const maxParticleOpacity = 0.5;

          // Calculate the new opacity (will be 0 after the fadeOutThreshold is reached)
          const newOpacity = maxParticleOpacity * curvedProgress;

          // Apply to particle material if it exists
          if (customParticleMaterial && customParticleMaterial.uniforms && customParticleMaterial.uniforms.opacity) {
            customParticleMaterial.uniforms.opacity.value = newOpacity;

            // Update GUI
            updateParticleOpacityGUI(newOpacity);
          }
        },
      },
    });

    // Create ScrollTrigger to animate the globe rising as we scroll through #get-involved-earth
    gsap.timeline({
      scrollTrigger: {
        trigger: "#get-involved-earth",
        start: "top bottom", // Start when the top of get-involved-earth reaches the bottom of viewport
        end: "bottom top", // End when the bottom of get-involved-earth exits the top of viewport
        scrub: 0.3, // Smooth scrubbing effect with minimal delay
        markers: false, // Set to true for debugging
        onUpdate: (self) => {
          const progress = self.progress;

          if (globeGroup) {
            // Mobile check: On mobile devices, we disable the rising animation
            // and keep the globe centered (handled by positionGlobeBehindBottomWave setting base position)
            if (window.innerWidth <= 768) {
              globeGroup.position.y = 0;
              return;
            }

            // Initial position (where the globe starts)
            const startY = -322;

            // How much the globe should rise (in world units)
            const riseAmount = 120; // Adjust this value to control how much the globe rises

            // Calculate the new y position based on progress
            // Apply an ease-out curve for more natural movement
            const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease out
            const newY = startY + riseAmount * easedProgress;

            // Set the globe group's position
            globeGroup.position.y = newY;

            // Update the GUI if it exists
            if (gui && gui.__folders["Globe Model Controls"]) {
              const positionFolder = gui.__folders["Globe Model Controls"].__folders["Position"];
              if (positionFolder && positionFolder.__controllers) {
                for (let controller of positionFolder.__controllers) {
                  if (controller.property === "positionY") {
                    // Only update the display, not the actual value to avoid conflicts
                    controller.updateDisplay();
                    break;
                  }
                }
              }
            }
          }
        },
      },
    });

    // Create a ScrollTrigger to transition from phase 0 to phase 1 colors when entering #hero-travel-area
    gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-travel-area",
        start: "top bottom", // Start when hero-travel-area enters the bottom of viewport
        end: "top top", // End when hero-travel-area reaches the top of viewport
        scrub: true, // Bidirectional scrubbing effect, tied to scroll position
        markers: false, // Set to true for debugging
        onUpdate: (self) => {
          // Only proceed if we have uniforms
          if (!uniforms || !uniforms.color1 || !uniforms.color2) return;

          // Get the current progress from start to end (0 to 1)
          const progress = self.progress;

          // Phase 0 initial colors (cover area)
          const phase0Color1 = new THREE.Color("#e2e2e2");
          const phase0Color2 = new THREE.Color("#515151");

          // Phase 1 target colors (original)
          const phase1Color1 = new THREE.Color("#32c2d6");
          const phase1Color2 = new THREE.Color("#004199");

          // Interpolate between phase 0 and phase 1 colors
          const currentColor1 = phase0Color1.clone().lerp(phase1Color1, progress);
          const currentColor2 = phase0Color2.clone().lerp(phase1Color2, progress);

          // Apply the interpolated colors to the shader
          uniforms.color1.value.copy(currentColor1);
          uniforms.color2.value.copy(currentColor2);

          // Update color phase based on progress
          if (progress > 0.9) {
            window.colorPhase = 1;
          } else if (progress < 0.1) {
            window.colorPhase = 0;
          } else {
            window.colorPhase = 0.5; // Transitioning between phases
          }

          // Mark that we're in special colors mode during transition
          window.specialColorsActive = true;

          // Update the GUI to reflect the current interpolated colors
          updateColorGUI();
          updateWaveGUI();

          // Simultaneously fade out the cover area overlay and increase saturation
          const coverAreaOverlay = document.querySelector("#cover-area-overlay");
          if (coverAreaOverlay) {
            // Fade from opacity 1 to 0 as we progress
            const overlayOpacity = 1 - progress;
            // Increase saturation from 1 to 2.2 as we progress
            const saturation = 1 + progress * 1.2; // 1 + (1 * 1.2) = 2.2

            coverAreaOverlay.style.opacity = overlayOpacity;
            coverAreaOverlay.style.filter = `saturate(${saturation})`;
          }
        },
      },
    });

    // Create a ScrollTrigger to transition from phase 1 to phase 2 colors during #hero-travel-area
    gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-travel-area",
        start: "top top", // Start when hero-travel-area reaches the top of viewport
        end: "bottom bottom", // End when hero-travel-area bottom reaches bottom of viewport
        scrub: true, // Bidirectional scrubbing effect, tied to scroll position
        markers: false, // Set to true for debugging
        onUpdate: (self) => {
          // Only proceed if we have uniforms
          if (!uniforms || !uniforms.color1 || !uniforms.color2) return;

          // Get the current progress from start to end (0 to 1)
          const progress = self.progress;

          // Phase 1 initial colors (now coming from phase 0->1 transition)
          const phase1Color1 = new THREE.Color("#32c2d6");
          const phase1Color2 = new THREE.Color("#004199");

          // Phase 1.5 intermediate colors (to avoid muddy transition)
          const phase1_5Color1 = new THREE.Color("#B225B1");
          const phase1_5Color2 = new THREE.Color("#FCC72D");

          // Phase 2 target colors
          const phase2Color1 = new THREE.Color("#DA281C");
          const phase2Color2 = new THREE.Color("#FCC72D");

          // Three-stage interpolation to avoid muddy colors
          // Color1 reaches phase 1.5 at 20% progress (50% earlier than color2)
          // Color2 reaches phase 1.5 at 40% progress (original timing)
          let currentColor1, currentColor2;

          // Handle Color1 timing (reaches phase 1.5 at 40% progress - delayed from 28%)
          if (progress <= 0.4) {
            // First 40% for color1: stay at phase 1 color (extended persistence)
            currentColor1 = phase1Color1.clone();
          } else if (progress <= 0.8) {
            // From 40% to 80%: interpolate from phase 1 to phase 1.5 (delayed start)
            const color1FirstStageProgress = (progress - 0.4) / (0.8 - 0.4); // Map 0.40-0.80 to 0-1
            currentColor1 = phase1Color1.clone().lerp(phase1_5Color1, color1FirstStageProgress);
          } else {
            // Final 20% (0.80-1): quick transition from phase 1.5 to phase 2
            const color1FinalStageProgress = (progress - 0.8) / 0.2; // Map 0.80-1 to 0-1
            currentColor1 = phase1_5Color1.clone().lerp(phase2Color1, color1FinalStageProgress);
          }

          // Handle Color2 timing (persists in phase 1 even longer, starts transition at ~60%)
          if (progress <= 0.6) {
            // First 60% for color2: stay at phase 1 color (extended persistence)
            currentColor2 = phase1Color2.clone();
          } else if (progress <= 0.8) {
            // From 60% to 80%: interpolate from phase 1 to phase 1.5 (delayed start)
            const color2FirstStageProgress = (progress - 0.6) / (0.8 - 0.6); // Map 0.60-0.80 to 0-1
            currentColor2 = phase1Color2.clone().lerp(phase1_5Color2, color2FirstStageProgress);
          } else {
            // Final 20% (0.80-1): quick transition from phase 1.5 to phase 2
            const color2FinalStageProgress = (progress - 0.8) / 0.2; // Map 0.80-1 to 0-1
            currentColor2 = phase1_5Color2.clone().lerp(phase2Color2, color2FinalStageProgress);
          }

          // Apply the interpolated colors to the shader
          uniforms.color1.value.copy(currentColor1);
          uniforms.color2.value.copy(currentColor2);

          // Remove any hue-rotate filter since we're using direct color interpolation
          const shaderBackground = document.getElementById("shaderBackground");
          if (shaderBackground) {
            shaderBackground.style.filter = "hue-rotate(0deg)";
          }

          // Mark that we're transitioning between phases
          if (progress > 0.9) {
            window.colorPhase = 2;
          } else if (progress < 0.1) {
            window.colorPhase = 1;
          } else {
            window.colorPhase = 1.5; // Transitioning between phases
          }

          // Reset phase 1 timer since we've entered transition
          phase1StartTime = Date.now();
          window.specialColorsActive = true;

          // Handle cover area overlay fade-in as we leave phase 1 colors
          const coverAreaOverlay = document.querySelector("#cover-area-overlay");
          if (coverAreaOverlay) {
            // Start fading in the overlay at 30% progress (when colors start changing more noticeably)
            // Reach max opacity (0.5) at 100% progress (when we reach #video-travel-area)
            let overlayOpacity = 0;
            if (progress >= 0.3) {
              // Map progress from 30%-100% to opacity 0-0.5
              const fadeInProgress = (progress - 0.3) / (1.0 - 0.3); // Map 0.30-1.0 to 0-1
              overlayOpacity = Math.min(0.5, fadeInProgress * 0.5);
            }

            // Maintain saturation increase as colors change
            const saturation = 1 + progress * 1.2; // 1 + (1 * 1.2) = 2.2

            coverAreaOverlay.style.opacity = overlayOpacity;
            coverAreaOverlay.style.filter = `saturate(${saturation})`;
          }

          // Update the GUI to reflect the current interpolated colors
          updateColorGUI();
          updateWaveGUI();
        },
      },
    });

    // Create a ScrollTrigger to maintain phase 2 colors when #video-travel-area is in view
    gsap.timeline({
      scrollTrigger: {
        trigger: "#video-travel-area",
        start: "top top", // Start when video-travel-area reaches the top of viewport
        end: "bottom top", // Continue until video-travel-area exits viewport
        scrub: false,
        markers: false,
        onEnter: () => {
          // Ensure we're in phase 2 and maintain the final transition colors
          if (uniforms && uniforms.color1 && uniforms.color2) {
            uniforms.color1.value.set("#DA281C");
            uniforms.color2.value.set("#FCC72D");
            window.colorPhase = 2;
            window.specialColorsActive = true;
            updateColorGUI();
          }
        },
        onLeaveBack: () => {
          // When scrolling back up, the hero-travel-area ScrollTrigger will handle the transition
          // No need to do anything here as the transition will be handled by the previous trigger
        },
      },
    });

    // Create a ScrollTrigger to fade out the cover area overlay when video-travel-area enters viewport
    gsap.timeline({
      scrollTrigger: {
        trigger: "#video-travel-area",
        start: "top bottom", // Start when video-travel-area top reaches bottom of viewport
        end: "top 66.67%", // End when video-travel-area top is 1/3 into viewport (66.67% from top)
        scrub: true, // Smooth scrubbing effect, tied to scroll position
        markers: false, // Set to true for debugging
        onUpdate: (self) => {
          // Get the current progress from start to end (0 to 1)
          const progress = self.progress;

          // Quickly fade out the cover area overlay
          const coverAreaOverlay = document.querySelector("#cover-area-overlay");
          if (coverAreaOverlay) {
            // Fade from opacity 0.5 to 0 as video-travel-area enters viewport
            const overlayOpacity = 0.5 - progress * 0.5;
            coverAreaOverlay.style.opacity = overlayOpacity;
            // Keep the saturation effect from previous transition
            coverAreaOverlay.style.filter = `saturate(2.2)`;
          }
        },
      },
    });

    // Create a ScrollTrigger to transition to phase three colors when #events enters the viewport
    gsap.timeline({
      scrollTrigger: {
        trigger: "#get-involved-cards",
        start: "top 50%",
        end: "top -10%",
        scrub: true, // Smooth scrubbing effect, tied to scroll position
        markers: false, // Set to true for debugging
        onUpdate: (self) => {
          // Only proceed if we have uniforms
          if (!uniforms || !uniforms.color1 || !uniforms.color2) return;

          // Get the current progress from start to end
          const progress = self.progress;

          // When events section starts entering viewport, transition to phase three
          if (progress > 0.1) {
            // Set phase three colors
            uniforms.color1.value.set("#8300ff");
            uniforms.color2.value.set("#14d15f");

            // Set the yOffset to -0.05 for phase three
            if (uniforms.yOffset) {
              uniforms.yOffset.value = -0.05;
            }

            // Set phase three lighting values
            uniforms.ambientLight.value = 0.4;
            uniforms.directionalLight.value = 0.4;

            // Set wave settings for phase three (keep frequency at default)
            // TEMPORARILY COMMENTED OUT FOR TESTING:
            // uniforms.waveSpeed.value = 0.9;
            uniforms.waveAmplitude.value = 1.2;
            uniforms.waveFrequency.value = 2.2; // Keep phase 3 at default frequency

            // Mark that we're now in phase three
            window.colorPhase = 3;
            // We're still in special colors mode, just a different set
            window.specialColorsActive = true;

            // Update the GUI to reflect the new colors and lighting
            updateColorGUI();
            updateLightingGUI();
            updateWaveGUI();
          } else if (progress <= 0.1 && window.colorPhase === 3) {
            // When scrolling back up and events section exits viewport, restore phase two colors

            // Maintain perfect continuity when transitioning back to phase 2
            // This prevents visual jumps while keeping transitions consistent
            const currentEffectiveTime = uniforms.time.value + uniforms.colorCycleOffset.value;
            uniforms.colorCycleOffset.value = currentEffectiveTime;
            uniforms.time.value = 0.0; // Reset time but maintain perfect continuity through offset

            // Restore phase 2 colors (the end colors from the hero-travel-area transition)
            uniforms.color1.value.set("#DA281C");
            uniforms.color2.value.set("#FCC72D");

            // Reset the yOffset to its original value
            if (uniforms.yOffset && originalYOffset !== undefined) {
              uniforms.yOffset.value = originalYOffset;
            }

            // Reset to original lighting values
            if (originalAmbientLight !== undefined) uniforms.ambientLight.value = originalAmbientLight;
            if (originalDirectionalLight !== undefined) uniforms.directionalLight.value = originalDirectionalLight;

            // Reset wave settings to phase 2 values
            uniforms.waveSpeed.value = 1.0; // Phase 2 maintains original wave speed
            if (originalWaveAmplitude !== undefined) uniforms.waveAmplitude.value = originalWaveAmplitude; // Back to original 3.0
            if (originalWaveFrequency !== undefined) uniforms.waveFrequency.value = originalWaveFrequency; // Back to original 2.2

            // Reset to phase two
            window.colorPhase = 2;
            // Reset phase 1 timer since we're back in phase 2
            phase1StartTime = Date.now();
            window.specialColorsActive = true;

            // Update the GUI to reflect the phase two colors and lighting
            updateColorGUI();
            updateLightingGUI();
            updateWaveGUI();
          }

          // Update the color darkness GUI if it exists
          updateColorDarknessGUI();
        },
      },
    });

    // Create ScrollTrigger to fade out the globe when entering #get-involved-cards
    gsap.timeline({
      scrollTrigger: {
        trigger: "#get-involved-cards",
        start: "top 50%",
        end: "top -10%",
        scrub: 1.0, // Slightly increased scrub for even smoother transition
        markers: false, // Set to true for debugging
        onUpdate: (self) => {
          // Get the current progress from start to end
          const progress = self.progress;

          // Calculate the inverse (1 at start, 0 at end)
          const inverseProgress = 1 - progress;

          // Apply a smoother curve for natural fade
          // Use cubic easing for a more gradual fade near the end
          const curvedProgress = Math.pow(inverseProgress, 3);

          // Apply to globe model if it exists
          if (globeModel) {
            // Keep the globe visible throughout the animation
            globeModel.visible = true;

            // Set the opacity on all materials with proper transparency settings
            globeModel.traverse((child) => {
              if (child.isMesh && child.material) {
                if (Array.isArray(child.material)) {
                  child.material.forEach((mat) => {
                    // Ensure proper material settings for transparency
                    mat.transparent = true;
                    mat.opacity = curvedProgress;
                    mat.depthWrite = curvedProgress > 0.1; // Only write to depth buffer when mostly opaque
                    // Set blending mode for smoother transparency
                    mat.blending = THREE.NormalBlending;
                    mat.needsUpdate = true;
                  });
                } else {
                  // Ensure proper material settings for transparency
                  child.material.transparent = true;
                  child.material.opacity = curvedProgress;
                  child.material.depthWrite = curvedProgress > 0.1; // Only write to depth buffer when mostly opaque
                  // Set blending mode for smoother transparency
                  child.material.blending = THREE.NormalBlending;
                  child.material.needsUpdate = true;
                }
              }
            });

            // Handle the extreme case where opacity is near zero
            if (curvedProgress < 0.01) {
              // For complete invisibility at the end of fade, hide the globe
              // but only when it's practically invisible already
              globeModel.visible = false;
            }

            // Update globeParams for reference
            globeParams.opacity = curvedProgress;

            // Pause rotation when opacity is very low
            globeParams.rotationPaused = curvedProgress < 0.01;

            // Update any opacity controllers in the GUI
            updateGlobeOpacityGUI();
          }

          // Also fade out the overlay alongside the globe
          if (overlayMesh && overlayMaterial && overlayMaterial.uniforms) {
            overlayMesh.visible = curvedProgress > 0.01;

            // Ensure the overlay opacity matches the globe's fade out
            overlayMaterial.uniforms.startOpacity.value = overlayParams.startOpacity * curvedProgress;
            overlayMaterial.uniforms.endOpacity.value = overlayParams.endOpacity * curvedProgress;

            // Update overlay visibility in parameters
            overlayParams.enabled = curvedProgress > 0.01;

            // Update overlay visibility in GUI if necessary
            updateOverlayVisibilityGUI();
          }
        },
      },
    });

    // Create ScrollTrigger to revert wave parameters when scrolling back up past #get-involved
    gsap.timeline({
      scrollTrigger: {
        trigger: "#get-involved",
        start: "bottom bottom", // Start when the bottom of get-involved reaches the bottom of viewport
        end: "top top", // End when the top of get-involved reaches the top of viewport
        scrub: true, // Smooth scrubbing effect, tied to scroll position
        markers: false, // Set to true for debugging
        onUpdate: (self) => {
          // Only revert parameters when scrolling up past get-involved (progress goes from 1 to 0)
          const progress = self.progress;

          // When we're past get-involved (progress = 0), revert to original parameters
          // BUT only if we're not in a phase transition that should control waveSpeed
          if (progress <= 0.1 && originalWaveSpeed !== undefined && window.colorPhase === 1) {
            // Revert wave parameters to original values only if we're in phase 1
            if (uniforms.waveSpeed) uniforms.waveSpeed.value = originalWaveSpeed;
            if (uniforms.waveAmplitude) uniforms.waveAmplitude.value = originalWaveAmplitude;
            if (uniforms.waveFrequency) uniforms.waveFrequency.value = originalWaveFrequency;
            if (uniforms.yOffset) uniforms.yOffset.value = originalYOffset;

            // Update the GUI to reflect the original values
            updateLightingGUI();
            updateWaveGUI();
          }
        },
      },
    });

    // Helper function to update particle opacity in the GUI
    function updateParticleOpacityGUI(opacity) {
      if (typeof gui !== "undefined" && gui && gui.__folders && gui.__folders["Particle System"]) {
        const particleFolder = gui.__folders["Particle System"];
        if (particleFolder && particleFolder.__controllers) {
          for (let controller of particleFolder.__controllers) {
            if (controller.property === "value" && controller.object === customParticleMaterial.uniforms.opacity) {
              controller.updateDisplay();
              break;
            }
          }
        }
      }
    }
  }

  // Separate function to set up anniversary events animation
  function setupAnniversaryEventsAnimation(gsap, ScrollTrigger, originalColor1, originalColor2) {
    // Find the events section (formerly #anniversary-assets)
    const anniversaryEventsSection = document.querySelector("#events");

    if (!anniversaryEventsSection) {
      // Try again when DOM is fully loaded
      document.addEventListener("DOMContentLoaded", () => {
        setupAnniversaryEventsAnimation(gsap, ScrollTrigger, originalColor1, originalColor2);
      });
      return;
    }

    const p3_from = new THREE.Color("#8300ff");
    const p3_to   = new THREE.Color("#dcfff6");

    // Create a second ScrollTrigger to animate colorDarkness back to 0 when scrolling through #events
    gsap.timeline({
      scrollTrigger: {
        trigger: "#get-involved-cards",
        start: "top 50%",
        end: "bottom 50%",
        scrub: true, // Smooth scrubbing effect, tied to scroll position
        markers: false, // Set to true for debugging
        onUpdate: (self) => {
          // Update the colorDarkness value based on progress
          if (uniforms && uniforms.colorDarkness) {
            // Map progress (0-1) to colorDarkness (2-0), starting at 2 and going to 0
            uniforms.colorDarkness.value = 1.5 - self.progress * 2.0;

            // Maintain colors based on the current phase, but respect scroll direction
            if (window.colorPhase === 3) {
  const t = self.progress;

  if (uniforms.color1) {
    uniforms.color1.value.r = p3_from.r + (p3_to.r - p3_from.r) * t;
    uniforms.color1.value.g = p3_from.g + (p3_to.g - p3_from.g) * t;
    uniforms.color1.value.b = p3_from.b + (p3_to.b - p3_from.b) * t;
  }

                if (uniforms.color2) {
                  // if you want color2 to remain fixed:
                  uniforms.color2.value.set("#14d15f");

                  // OR: add another lerp here if you want color2 animated too
                }

                uniforms.ambientLight.value = 0.4;
                uniforms.directionalLight.value = 0.4;
                uniforms.waveSpeed.value = 0.9;
                uniforms.waveAmplitude.value = 1.2;

                window.specialColorsActive = true;

                updateColorGUI();
                updateLightingGUI();
                updateWaveGUI();
              } else if (window.colorPhase === 2) {
              // We're in phase two, maintain phase two special colors
              // Use the phase 2 colors (red and purple)
              if (uniforms.color1) uniforms.color1.value.set("#da281c");
              if (uniforms.color2) uniforms.color2.value.set("#FCC72D");
              // Lighting values are now managed by the shader parameters directly
              // Wave parameters are now managed by their respective scroll triggers
              window.specialColorsActive = true;

              // Update the GUI to reflect the phase two colors
              updateColorGUI();
              updateLightingGUI();
              updateWaveGUI();
            } else if (window.colorPhase === 1) {
              // We're in phase one, maintain phase one special colors
              // Use the actual default phase 1 colors
              if (uniforms.color1) uniforms.color1.value.set("#32c2d6");
              if (uniforms.color2) uniforms.color2.value.set("#004199");
              // Wave parameters are now managed by their respective scroll triggers
              window.specialColorsActive = true;

              // Update the GUI to reflect the phase one colors
              updateColorGUI();
              updateLightingGUI();
              updateWaveGUI();
            } else {
              // We're in phase zero, maintain phase zero colors
              // Use the actual default phase 0 colors
              if (uniforms.color1) uniforms.color1.value.set("#e2e2e2");
              if (uniforms.color2) uniforms.color2.value.set("#515151");
              // Wave parameters are now managed by their respective scroll triggers
              window.specialColorsActive = true;

              // Update the GUI to reflect the phase zero colors
              updateColorGUI();
              updateLightingGUI();
              updateWaveGUI();
            }

            // Update the GUI if it exists
            updateColorDarknessGUI();
          }
        },
      },
    });


  }

  // Helper function to update the GUI control for colorDarkness if it exists
  function updateColorDarknessGUI() {
    const gui = window.gui;
    const uniforms = window.uniforms;
    if (typeof gui !== "undefined" && gui && gui.__folders && gui.__folders["Color Controls"]) {
      const colorFolder = gui.__folders["Color Controls"];
      if (colorFolder && colorFolder.__controllers) {
        for (let controller of colorFolder.__controllers) {
          if (controller.property === "value" && controller.object === uniforms.colorDarkness) {
            controller.updateDisplay();
            break;
          }
        }
      }
    }
  }

  // Helper function to update color pickers in the GUI
  function updateColorGUI() {
    const gui = window.gui;
    const uniforms = window.uniforms;
    if (typeof gui !== "undefined" && gui && gui.__folders && gui.__folders["Color Controls"]) {
      const colorFolder = gui.__folders["Color Controls"];
      if (colorFolder && colorFolder.__controllers) {
        // Update both color controllers
        colorFolder.__controllers.forEach((controller) => {
          if (controller.property === "color") {
            const colorObject = controller.__color;
            if (colorObject) {
              if (
                controller.property === "color" &&
                controller.__li &&
                controller.__li.querySelector(".property-name").textContent === "Color 1"
              ) {
                // Update Color 1
                const hexColor = "#" + uniforms.color1.value.getHexString();
                controller.setValue(hexColor);
              } else if (
                controller.property === "color" &&
                controller.__li &&
                controller.__li.querySelector(".property-name").textContent === "Color 2"
              ) {
                // Update Color 2
                const hexColor = "#" + uniforms.color2.value.getHexString();
                controller.setValue(hexColor);
              }
            }
          }
        });
      }
    }
  }

  // Helper function to update any globe opacity controllers in the GUI
  function updateGlobeOpacityGUI() {
    if (
      typeof gui !== "undefined" &&
      gui &&
      gui.__folders &&
      gui.__folders["Globe Model Controls"] &&
      gui.__folders["Globe Model Controls"].__folders &&
      gui.__folders["Globe Model Controls"].__folders["Material"]
    ) {
      const materialFolder = gui.__folders["Globe Model Controls"].__folders["Material"];

      if (materialFolder && materialFolder.__controllers) {
        for (let controller of materialFolder.__controllers) {
          if (controller.property === "opacity") {
            controller.updateDisplay();
          }
        }
      }
    }
  }

  // Helper function to update globe visibility control in the GUI
  function updateGlobeVisibilityGUI() {
    if (typeof gui !== "undefined" && gui && gui.__folders && gui.__folders["Globe Model Controls"]) {
      const globeFolder = gui.__folders["Globe Model Controls"];

      if (globeFolder && globeFolder.__controllers) {
        for (let controller of globeFolder.__controllers) {
          if (controller.property === "visible") {
            controller.updateDisplay();
            break;
          }
        }
      }
    }
  }

  // Helper function to update overlay visibility control in the GUI
  function updateOverlayVisibilityGUI() {
    if (typeof gui !== "undefined" && gui && gui.__folders && gui.__folders["Gradient Overlay Controls"]) {
      const overlayFolder = gui.__folders["Gradient Overlay Controls"];

      if (overlayFolder && overlayFolder.__controllers) {
        for (let controller of overlayFolder.__controllers) {
          if (controller.property === "enabled") {
            controller.updateDisplay();
            break;
          }
        }
      }
    }
  }

  // Get the true viewport height (accounting for mobile browser address bar)
  function getTrueViewportHeight() {
    // On mobile, use the maximum of window.innerHeight and document.documentElement.clientHeight
    // This helps account for the address bar appearing/disappearing
    return Math.max(window.innerHeight, document.documentElement.clientHeight);
  }

  // Set initial size based on true viewport dimensions
  const initialWidth = window.innerWidth;
  const initialHeight = getTrueViewportHeight();

  // Set canvas to fill the viewport and position it fixed in the background
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100svh";
  canvas.style.zIndex = "-1"; // Place behind other content

  // Force hardware acceleration to prevent address bar issues
  canvas.style.transform = "translateZ(0)";
  canvas.style.transformStyle = "preserve-3d";
  canvas.style.willChange = "transform";

  // Create the WebGL renderer with error handling and performance settings
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: perfSettings.antialias, // Use performance-based setting
      powerPreference: performanceTier === 'high' ? 'high-performance' : 'default',
      failIfMajorPerformanceCaveat: false, // Allow fallback to software rendering if needed
    });
    renderer.setSize(initialWidth, initialHeight);
    renderer.setPixelRatio(perfSettings.pixelRatio); // Use performance-based pixel ratio
    
    console.log('[Background Init] Renderer pixel ratio:', perfSettings.pixelRatio);
  } catch (error) {
    console.error("Failed to create WebGL renderer:", error);
    console.warn("Falling back to fallback background. WebGL initialization failed.");

    // Hide the canvas and show a fallback background
    canvas.style.display = "none";
    document.body.style.backgroundColor = "#1a1a2e"; // Fallback dark background

    // Add a simple CSS gradient as fallback
    document.body.style.background = "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)";
    return;
  }

  // Mark initialization as successful
  window.shaderBackgroundInitialized = true;

  // Add cleanup on page unload to free memory
  window.addEventListener('beforeunload', (e) => {
    // Don't cleanup if this is a mailto: link or other non-navigation action
    // Check if we're doing a mailto operation (flag set by mailto handler)
    if (window._isMailtoOperation || window._preventBackgroundCleanup) {
      console.log('[Background] Skipping cleanup for mailto/non-navigation action');
      return;
    }
    
    console.log('[Background] Cleaning up resources before page unload');
    
    // Stop rendering
    if (window.shaderBackgroundRenderer) {
      window.shaderBackgroundRenderer.pause();
    }
    
    // Dispose all tracked resources
    const disposed = memoryManager.disposeAll();
    console.log(`[Background] Disposed ${disposed} Three.js resources`);
    
    // Dispose renderer
    if (renderer) {
      renderer.dispose();
      renderer.forceContextLoss();
    }
    
    // Hint at garbage collection
    memoryManager.forceGC();
  });

  // Add context loss handling
  canvas.addEventListener("webglcontextlost", function (event) {
    console.warn("WebGL context lost. Attempting to restore...");
    event.preventDefault();
    // Reset initialization flag so it can be reinitialized
    window.shaderBackgroundInitialized = false;
  });

  canvas.addEventListener("webglcontextrestored", function () {
    // Reinitialize the background after context restoration with some safety checks
    setTimeout(() => {
      // Only reinitialize if we're not already in the process
      if (!window.shaderBackgroundReinitializing) {
        window.shaderBackgroundReinitializing = true;
        try {
          initShaderBackground();
        } catch (error) {
          console.error("Failed to reinitialize shader background after context restore:", error);
        } finally {
          window.shaderBackgroundReinitializing = false;
        }
      }
    }, 100);
  });

  // Create scene and an orthographic camera
  const scene = new THREE.Scene();

  // Create a separate scene for particles to ensure they render on top
  const particleScene = new THREE.Scene();

  // Variable to track particle opacity for fade-in
  let particleOpacity = 0;
  let targetParticleOpacity = 0; // Will be set to 1 when hero animation completes

  // Camera parameters with zoom control
  const cameraParams = {
    zoom: 2.471,
    zPosition: 1,
  };

  const camera = new THREE.OrthographicCamera(
    -window.innerWidth / 2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    -window.innerHeight / 2,
    -1000,
    1000
  );
  camera.position.z = cameraParams.zPosition;
  camera.zoom = cameraParams.zoom;
  camera.updateProjectionMatrix();

  // Create a group to hold and control the globe model
  const globeGroup = new THREE.Group();
  globeGroup.position.y = -322;
  // Enable frustum culling for the globe group
  globeGroup.frustumCulled = true;
  scene.add(globeGroup);

  // Create gradient overlay
  let overlayMaterial, overlayMesh;

  // Gradient overlay parameters
  const overlayParams = {
    enabled: false, // Start with overlay disabled
    startOpacity: 0.0, // Top opacity (fully transparent)
    endOpacity: 1.0, // Bottom opacity (fully opaque black)
    offsetY: 0.05, // Y position offset (for gradient calculation) - Gradient Shift
    height: 2.5, // Height multiplier for gradient - Gradient Distribution
    color: "#000000", // Pure black color
    yOffset: 0.09, // Y position of the entire overlay (in viewport height %) - Vertical Position
  };

  function createGradientOverlay() {
    // Create a shader material for the gradient overlay
    overlayMaterial = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        startOpacity: { value: overlayParams.startOpacity },
        endOpacity: { value: overlayParams.endOpacity },
        overlayColor: { value: new THREE.Color(overlayParams.color) },
        offsetY: { value: overlayParams.offsetY },
        heightMultiplier: { value: overlayParams.height },
      },
      vertexShader: `
        varying vec2 vUv;
        
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float startOpacity;
        uniform float endOpacity;
        uniform float offsetY;
        uniform float heightMultiplier;
        uniform vec3 overlayColor;
        varying vec2 vUv;
        
        void main() {
          // Calculate y position with offset and height multiplier
          // Use vUv.y directly (0 at bottom, 1 at top)
          float y = (vUv.y - offsetY) * heightMultiplier;
          
          // Clamp y between 0 and 1
          y = clamp(y, 0.0, 1.0);
          
          // Linear gradient from bottom to top
          // endOpacity at bottom (y=0), startOpacity at top (y=1)
          float opacity = mix(endOpacity, startOpacity, y);
          
          gl_FragColor = vec4(overlayColor, opacity);
        }
      `,
      // Ensure the overlay renders on top of other content
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    // Calculate the world space height for exactly 66% of viewport height
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Get the dimensions in world units
    const worldWidth = camera.right - camera.left;
    const worldHeight = camera.top - camera.bottom;

    // Calculate world units for 66% viewport height
    const fixedHeightWorld = viewportHeight * 0.66 * (worldHeight / viewportHeight);

    // Create the plane geometry with exact width and fixed height
    const overlayGeometry = new THREE.PlaneGeometry(worldWidth, fixedHeightWorld);

    // Create mesh with the configured material
    overlayMesh = new THREE.Mesh(overlayGeometry, overlayMaterial);

    // Keep the overlay flat and in front of everything
    overlayMesh.rotation.set(0, 0, 0);
    overlayMesh.position.x = 0; // Center horizontally
    overlayMesh.position.y = overlayParams.yOffset * worldHeight;
    overlayMesh.position.z = -100; // Fixed distance in front

    overlayMesh.frustumCulled = false; // Never cull this object
    overlayMesh.renderOrder = 9999; // Ensure it renders last/on top
    overlayMesh.visible = overlayParams.enabled;

    // Add to scene, not to camera
    scene.add(overlayMesh);
  }

  // Function to update overlay position relative to camera
  function updateOverlayPosition() {
    if (!overlayMesh) return;

    // For an orthographic camera, the overlay must stay perfectly flat
    // and aligned with the view plane (parallel to the viewport)

    // Make sure rotation is reset to perfectly flat (parallel to view)
    overlayMesh.rotation.set(0, 0, 0);

    // Center horizontally
    overlayMesh.position.x = 0;

    // Calculate the world space coordinates for positioning
    const viewportHeight = window.innerHeight;
    const worldHeight = camera.top - camera.bottom;
    const worldToPixelRatio = worldHeight / viewportHeight;

    // Apply vertical offset in world units
    overlayMesh.position.y = overlayParams.yOffset * worldHeight;

    // Keep at fixed distance in front of everything
    overlayMesh.position.z = -100;
  }

  // Function to update the overlay on window resize
  function updateOverlaySize() {
    if (overlayMesh) {
      // Get viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Get world dimensions from camera
      const worldWidth = camera.right - camera.left;
      const worldHeight = camera.top - camera.bottom;

      // Calculate the fixed height in world units - exactly 66% of viewport
      const fixedHeightWorld = viewportHeight * 0.66 * (worldHeight / viewportHeight);

      // Dispose of old geometry and create new one with fixed height
      overlayMesh.geometry.dispose();
      overlayMesh.geometry = new THREE.PlaneGeometry(worldWidth, fixedHeightWorld);

      // Ensure overlay stays perfectly flat and parallel to view
      overlayMesh.rotation.set(0, 0, 0);

      // Update the position after resizing
      updateOverlayPosition();
    }
  }

  // Create the initial overlay
  createGradientOverlay();

  // Function to update the overlay on window resize
  function updateOverlaySize() {
    if (overlayMesh) {
      // Get viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Get world dimensions from camera
      const worldWidth = camera.right - camera.left;
      const worldHeight = camera.top - camera.bottom;

      // Calculate the fixed height in world units - exactly 66% of viewport
      const fixedHeightWorld = viewportHeight * 0.66 * (worldHeight / viewportHeight);

      // Dispose of old geometry and create new one with fixed height
      overlayMesh.geometry.dispose();
      overlayMesh.geometry = new THREE.PlaneGeometry(worldWidth, fixedHeightWorld);

      // Ensure overlay stays perfectly flat and parallel to view
      overlayMesh.rotation.set(0, 0, 0);

      // Update the position after resizing
      updateOverlayPosition();
    }
  }

  // Globe model parameters with default values
  const globeParams = {
    visible: false, // Start invisible
    scale: 25.0,
    positionX: 0,
    positionY: -280, // Updated from -166 to -280
    positionZ: 0,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    autoRotate: true,
    autoRotateSpeed: 0.05, // Reduced by 50% from 0.1 to 0.05
    baseRotateSpeed: 0.05, // Store the base rotation speed for reference
    scrollRotateSpeed: 0.075, // 50% faster than base speed (for when scrolling)
    responsive: true, // New parameter to enable/disable responsive scaling
    baseScale: 25.0, // Store the base scale for responsive calculations
    opacity: 0.0, // Start with opacity 0
    rotationPaused: false, // New parameter to track if rotation should be paused
  };

  // Load the GLTF model - check if preloaded first
  const gltfLoader = new GLTFLoader();

  // Set up DRACOLoader for compressed geometry with lazy loading
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
  dracoLoader.setDecoderConfig({ type: "js" });
  gltfLoader.setDRACOLoader(dracoLoader);

  let globeModel;
  
  // For low-end devices, defer globe loading using requestIdleCallback
  const shouldDeferGlobeLoading = performanceTier === 'low' || performanceDetector.isAEMEmbedded();

  // Function to handle loaded GLTF data
  const handleGltfLoad = (gltf) => {
    globeModel = gltf.scene;

    // Center the model's geometry to ensure proper rotation around its center
    let boundingBox = new THREE.Box3().setFromObject(globeModel);
    let center = boundingBox.getCenter(new THREE.Vector3());

    // Create a centered wrapper group
    let centeredGroup = new THREE.Group();
    // Add the model to the centered group with offset to center it
    centeredGroup.add(globeModel);
    // Position the model so its center is at the origin of the group
    globeModel.position.set(-center.x, -center.y, -center.z);

    // Use the centered group instead of the raw model
    globeModel = centeredGroup;

    // Apply initial parameters
    globeModel.visible = globeParams.visible;

    // Enable frustum culling for performance optimization
    globeModel.frustumCulled = true;

    // Apply frustum culling to all child meshes for more granular culling
    globeModel.traverse((child) => {
      if (child.isMesh) {
        child.frustumCulled = true;
      }
    });

    // First add to the scene
    globeGroup.add(globeModel);

    // Set initial position and rotation
    globeModel.position.set(globeParams.positionX, globeParams.positionY, globeParams.positionZ);
    globeModel.rotation.set(
      (globeParams.rotationX * Math.PI) / 180,
      (globeParams.rotationY * Math.PI) / 180,
      (globeParams.rotationZ * Math.PI) / 180
    );

    // Apply initial scale after adding to scene
    if (globeParams.responsive) {
      // Use responsive sizing
      updateGlobeSize();
    } else {
      // Use fixed scale
      globeModel.scale.set(globeParams.scale, globeParams.scale, globeParams.scale);

      // Position behind the bottom wave
      positionGlobeBehindBottomWave();
    }

    // Set up material controls for the globe
    const materialFolder = globeFolder.addFolder("Material");

    // Traverse the model to find materials
    let materialCount = 0;
    globeModel.traverse((child) => {
      if (child.isMesh && child.material) {
        const globeMaterial = child.material;
        materialCount++;

        // Add material properties to GUI if it's a MeshStandardMaterial or MeshPhongMaterial
        if (globeMaterial.isMeshStandardMaterial || globeMaterial.isMeshPhongMaterial) {
          // Add metalness control if available
          if (globeMaterial.metalness !== undefined) {
            materialFolder
              .add({ metalness: globeMaterial.metalness }, "metalness", 0, 1)
              .name(`Metalness${materialCount > 1 ? " " + materialCount : ""}`)
              .onChange((value) => {
                globeMaterial.metalness = value;
              });
          }

          // Add roughness control if available
          if (globeMaterial.roughness !== undefined) {
            materialFolder
              .add({ roughness: globeMaterial.roughness }, "roughness", 0, 1)
              .name(`Roughness${materialCount > 1 ? " " + materialCount : ""}`)
              .onChange((value) => {
                globeMaterial.roughness = value;
              });
          }

          // Add shininess control for MeshPhongMaterial
          if (globeMaterial.shininess !== undefined) {
            materialFolder
              .add({ shininess: globeMaterial.shininess }, "shininess", 0, 100)
              .name(`Shininess${materialCount > 1 ? " " + materialCount : ""}`)
              .onChange((value) => {
                globeMaterial.shininess = value;
              });
          }

          // Add opacity control
          materialFolder
            .add({ opacity: globeMaterial.opacity }, "opacity", 0, 1)
            .name(`Opacity${materialCount > 1 ? " " + materialCount : ""}`)
            .onChange((value) => {
              globeMaterial.opacity = value;
              globeMaterial.transparent = value < 1;
            });

          // Add emissive color control
          const emissiveColor = globeMaterial.emissive ? "#" + globeMaterial.emissive.getHexString() : "#000000";
          materialFolder
            .addColor({ color: emissiveColor }, "color")
            .name(`Emissive Color${materialCount > 1 ? " " + materialCount : ""}`)
            .onChange((value) => {
              if (globeMaterial.emissive) {
                globeMaterial.emissive.set(value);
              }
            });
        }
      }
    });
  };

  // Function to load the globe model
  const loadGlobeModel = () => {
  const globeUrl = getPreloadedAssetUrl("globe-hd.glb", globeModelUrl);
    console.log('[Background Init] Loading globe model...');
  gltfLoader.load(
    globeUrl,
    handleGltfLoad,
    // Progress callback
      (xhr) => {
        if (xhr.lengthComputable) {
          const percentComplete = (xhr.loaded / xhr.total) * 100;
          if (percentComplete % 25 === 0) {
            console.log(`[Background Init] Globe loading: ${percentComplete.toFixed(0)}%`);
          }
        }
      },
    // Error callback
    (error) => {
      console.error("Error loading globe model:", error);
    }
  );
  };

  // Defer globe loading for low-end devices and AEM to improve initial load time
  if (shouldDeferGlobeLoading) {
    console.log('[Background Init] Deferring globe model load for performance');
    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => loadGlobeModel(), { timeout: 2000 });
    } else {
      setTimeout(() => loadGlobeModel(), 1000);
    }
  } else {
    // Load immediately for high-end devices
    loadGlobeModel();
  }

  // Define uniforms with tunable parameters - increased default values for larger displacement
  window.uniforms = {
    time: { value: 0.0 },
    resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    // Animation speed parameters
    mainSpeed: { value: 0.00012 }, // Overall animation speed multiplier
    waveSpeed: { value: 1.0 }, // Controls how fast the waves animate
    noiseSpeed: { value: 0.45 }, // Speed of the noise animation
    colorCycleSpeed: { value: 2.0 }, // Speed of color cycling/transitions
    colorCycleOffset: { value: 0.0 }, // New: offset to maintain color cycle continuity
    //Color parameters - Phase 0 initial colors
    color1: { value: new THREE.Color("#e2e2e2") },
    color2: { value: new THREE.Color("#515151") },
    colorDarkness: { value: 0.0 }, // Controls overall darkness of colors
    colorWaveInfluence: { value: 0.0 }, // Controls how much colors affect wave patterns
    colorFrequencyShift: { value: 0.0 }, // Controls how colors shift wave frequencies
    colorAmplitudeEffect: { value: 0.0 }, // Controls how colors affect wave amplitude
    //Wave parameters
    waveAmplitude: { value: 0.8 }, // Controls wave height
    waveFrequency: { value: 4.0 }, // Controls wave frequency
    waveDepth: { value: 0.6 }, // Controls perceived depth of waves
    flowDirection: { value: new THREE.Vector2(-0.7, 0.82) }, // Controls the direction of wave movement
    noiseScale: { value: 2.5 }, // Scale of noise pattern
    noiseInfluence: { value: 0.0 }, // How much noise affects the pattern
    layerOffset: { value: 0.4 }, // Offset between color layers for depth
    //Appearance parameters
    yOffset: { value: 0.29 },
    topEdgeSoftness: { value: 1.0 }, // Controls the softness of the top edge fade
    bottomEdgeSoftness: { value: 1.0 }, // Controls the softness of the bottom edge fade
    leftEdgeSoftness: { value: 0.2 }, // Controls the softness of the left edge fade
    rightEdgeSoftness: { value: 0.5 }, // Controls the softness of the right edge fade
    fadeWidth: { value: 1.0 }, // Controls the width of the fade area
    leftCornerRoundness: { value: 0.8 }, // Controls how much the fade rounds into left corners
    rightCornerRoundness: { value: 1.0 }, // Controls how much the fade rounds into right corners
    edgeNoiseAmount: { value: 0.12 }, // Controls the amount of noise on the edges
    edgeNoiseScale: { value: 3.0 }, // Controls the scale of noise on the edges
    edgeDepth: { value: 0.9 }, // Controls how far the burn-in effect extends into the canvas
    edgeContrast: { value: 2.0 }, // Controls the contrast/sharpness of the edge transition
    // Bottom wave edge parameters
    bottomWaveEnabled: { value: true }, // Enable/disable the bottom wave edge
    bottomWaveDepth: { value: 0.117 }, // Controls the depth/amplitude of the bottom wave
    bottomWaveWidth: { value: 6.475 }, // Controls the width/frequency of the bottom wave
    bottomWaveSpeed: { value: 0.0 }, // Controls the speed of the bottom wave animation
    bottomWaveOffset: { value: -2.207 }, // Controls the horizontal offset of the bottom wave
    // Film noise parameters
    filmNoiseIntensity: { value: 0.056 }, // Controls the intensity of the film noise
    filmNoiseSpeed: { value: 0.0000028 }, // Controls the speed of the film noise animation was 00001
    filmGrainSize: { value: 6.0 }, // Controls the size of the film grain
    filmScratchIntensity: { value: 0.0 }, // Controls the intensity of film scratches
    filmGrainEnabled: { value: true }, // Enable/disable film grain for performance
    // Lighting parameters
    lightDirection: { value: new THREE.Vector3(0.5, 0.5, 1.0).normalize() },
    ambientLight: { value: 0.6 }, // Ambient light intensity
    directionalLight: { value: 0.6 }, // Directional light intensity
    specularStrength: { value: 0.0 }, // Specular highlight strength
    shininess: { value: 128.0 }, // Shininess factor for specular highlights
    //Displacement parameters (kept but set to 0 by default)
    displacementStrength: { value: 0.0 },
    displacementScale: { value: 0.0001 },
    displacementDepth: { value: 0.0 },
    xOffset: { value: -0.104 },
  };
  const uniforms = window.uniforms; // Keep local reference for backwards compatibility

  // Enhanced vertex shader with larger displacement
  const vertexShader = `
    uniform float time;
    uniform float waveSpeed;
    uniform float noiseSpeed;
    uniform vec2 resolution;
    uniform float yOffset;
    uniform float xOffset;
    varying vec2 vUv;
    varying vec3 vViewPosition;
    varying vec3 vNormal;
    
    void main() {
      vUv = uv;
      
      // Apply xOffset and yOffset to the entire mesh by shifting the position
      vec3 positionWithOffset = position;
      positionWithOffset.y += yOffset * resolution.y; // Scale by resolution for pixel-based offset
      positionWithOffset.x += xOffset * resolution.x; // Scale by resolution for pixel-based offset
      
      // Pass normal and view position for lighting calculations
      vNormal = normalMatrix * normal;
      vec4 mvPosition = modelViewMatrix * vec4(positionWithOffset, 1.0);
      vViewPosition = -mvPosition.xyz;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(positionWithOffset, 1.0);
    }
  `;

  // Enhanced fragment shader with 3D wave effects
  const fragmentShader = `
    uniform float time;
    uniform vec2 resolution;
    uniform float yOffset;
    uniform float xOffset;
    uniform float topEdgeSoftness;
    uniform float bottomEdgeSoftness;
    uniform float leftEdgeSoftness;
    uniform float rightEdgeSoftness;
    uniform float fadeWidth;
    uniform float leftCornerRoundness;
    uniform float rightCornerRoundness;
    uniform float edgeNoiseAmount;
    uniform float edgeNoiseScale;
    uniform float edgeDepth;
    uniform float edgeContrast;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform float colorDarkness;
    uniform float colorWaveInfluence;
    uniform float colorFrequencyShift;
    uniform float colorAmplitudeEffect;
    uniform float noiseScale;
    uniform float waveAmplitude;
    uniform float waveFrequency;
    uniform float waveDepth;
    uniform vec2 flowDirection;
    uniform float noiseInfluence;
    uniform float layerOffset;
    uniform vec3 lightDirection;
    uniform float ambientLight;
    uniform float directionalLight;
    uniform float specularStrength;
    uniform float shininess;
    uniform float colorCycleSpeed;
    uniform float colorCycleOffset;
    uniform float noiseSpeed;
    uniform float waveSpeed;
    uniform float filmNoiseIntensity;
    uniform float filmNoiseSpeed;
    uniform float filmGrainSize;
    uniform float filmScratchIntensity;
    uniform bool filmGrainEnabled; // Flag to completely disable film grain for performance
    uniform bool bottomWaveEnabled;
    uniform float bottomWaveDepth;
    uniform float bottomWaveWidth;
    uniform float bottomWaveSpeed;
    uniform float bottomWaveOffset;
    varying vec2 vUv;
    varying vec3 vViewPosition;
    varying vec3 vNormal;
    
    // Pseudo-random function
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }
    
    // Improved 2D noise function with smoother transitions
    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      
      // Four corners in 2D of a tile
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      
      // Cubic Hermite interpolation for smoother transitions
      vec2 u = f * f * (3.0 - 2.0 * f);
      
      // Mix 4 corners with smoother interpolation
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    
    // Enhanced Fractal Brownian Motion (FBM) for smoother noise
    float fbm(vec2 st) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;
      
      // Loop of octaves with more iterations for smoother detail
      for (int i = 0; i < 6; i++) {
        value += amplitude * noise(st * frequency);
        st += st * 0.2; // Domain warping for more organic patterns
        frequency *= 2.0;
        amplitude *= 0.5;
      }
      
      return value;
    }
    
    // Smooth interpolation function
    float smoothInterpolation(float edge0, float edge1, float x) {
      // Hermite interpolation for smoother transitions
      float t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
      return t * t * (3.0 - 2.0 * t);
    }
    
    // Extract color intensity (brightness) from a color
    float getColorIntensity(vec3 color) {
      // Use luminance formula to get perceived brightness
      return dot(color, vec3(0.299, 0.587, 0.114));
    }
    
    // Extract color hue from RGB
    float getColorHue(vec3 color) {
      float minVal = min(min(color.r, color.g), color.b);
      float maxVal = max(max(color.r, color.g), color.b);
      float delta = maxVal - minVal;
      
      float hue = 0.0;
      if (delta > 0.0) {
        if (maxVal == color.r) {
          hue = (color.g - color.b) / delta;
          if (hue < 0.0) hue += 6.0;
        } else if (maxVal == color.g) {
          hue = 2.0 + (color.b - color.r) / delta;
        } else {
          hue = 4.0 + (color.r - color.g) / delta;
        }
        hue /= 6.0;
      }
      return hue;
    }
    
    // Function to create a wave pattern with depth effect and color influence
    float wavePattern(vec2 uv, float depth, vec3 localColor) {
      // Extract color properties to influence the wave
      float colorIntensity = getColorIntensity(localColor);
      float colorHue = getColorHue(localColor);
      
      // Create flow direction based on time, modified by color
      vec2 colorModifiedFlow = flowDirection;
      // Make flow direction respond to color hue
      colorModifiedFlow += vec2(cos(colorHue * 6.28), sin(colorHue * 6.28)) * colorWaveInfluence * 0.5;
      
      // Apply waveSpeed to the time component of the sine waves to control actual wave speed
      // Use continuous time for perfectly smooth wave motion
      float timeComponent = time * waveSpeed;
      
      // Create a depth-dependent time component for better synergy between depth and color cycling
      // This makes different depth layers cycle at slightly different rates
      float depthTimeComponent = timeComponent * (1.0 - depth * 0.3);
      
      // Reduce the flow direction influence for less translation and more morphing
      // This creates a moving coordinate system that flows in the specified direction but with less movement
      vec2 flowUv = uv + colorModifiedFlow * depthTimeComponent * 0.3;
      
      // Add time-based distortion to create organic morphing effect
      // This creates bulging and receding areas that change over time
      // Make the morphing respond to depth for better synergy
      float morphStrength = 0.05 * (1.0 - depth * 0.3);
      vec2 morphUv = flowUv;
      morphUv.x += sin(uv.y * 3.0 + depthTimeComponent * 0.7) * morphStrength;
      morphUv.y += cos(uv.x * 2.5 + depthTimeComponent * 0.6) * morphStrength;
      
      // Modify frequency based on color
      float frequencyMod = waveFrequency * (1.0 + (colorHue - 0.5) * colorFrequencyShift);
      
      // Create multiple wave layers with different frequencies for depth
      // Use color intensity to modify wave phase
      float colorPhaseShift = colorIntensity * colorWaveInfluence * 3.0;
      
      // Color cycling is now handled separately in the main function
      // Wave patterns use only regular time to prevent speed accumulation
      
      // Create pulsing amplitude effect over time for more organic movement
      // Make the pulse effect respond to depth for better synergy
      float pulseEffect = sin(depthTimeComponent * 0.2) * 0.2 + 0.8;
      
      // Generate waves with more organic variation
      // Make the waves directly respond to the depth parameter for better depth-color synergy
      float depthFactor = 1.0 - depth * 0.5; // Higher value for foreground
      
      // Use depth to influence wave frequency and phase for better synergy
      // Create wave patterns that are independent of color cycling to prevent speed accumulation
      float wave1 = sin(morphUv.x * frequencyMod * (4.0 + depth) + depthTimeComponent * depthFactor + colorPhaseShift) * 0.5 + 0.5;
      float wave2 = sin(morphUv.y * frequencyMod * (3.0 + depth * 0.5) + depthTimeComponent * 0.7 * depthFactor + colorPhaseShift * 0.8) * 0.5 + 0.5;
      float wave3 = sin((morphUv.x + morphUv.y) * frequencyMod * (2.0 + depth * 0.3) + depthTimeComponent * 1.3 * depthFactor + colorPhaseShift * 0.6) * 0.5 + 0.5;
      
      // Apply depth offset to create parallax effect
      float depthOffset = depth * layerOffset;
      
      // Combine waves with weighted averaging for a more complex pattern
      // Use color components as weights for a more direct relationship between color and wave pattern
      float rWeight = localColor.r * 0.33 + 0.22; // Weight influenced by red component
      float gWeight = localColor.g * 0.33 + 0.22; // Weight influenced by green component
      float bWeight = localColor.b * 0.33 + 0.22; // Weight influenced by blue component
      
      // Normalize weights to ensure they sum to 1.0
      float totalWeight = rWeight + gWeight + bWeight;
      rWeight /= totalWeight;
      gWeight /= totalWeight;
      bWeight /= totalWeight;
      
      float wave = wave1 * rWeight + wave2 * gWeight + wave3 * bWeight;
      
      // Apply noise influence for organic movement with more variation
      // Use a more dynamic noise pattern that changes over time
      // Make noise pattern respond to depth for better synergy
      float noiseTimeComponent = time * 0.1 * noiseSpeed * (1.0 - depth * 0.3);
      float noiseValue = fbm((uv + vec2(sin(timeComponent * 0.1), cos(timeComponent * 0.15))) * noiseScale + noiseTimeComponent);
      
      // Use color intensity to control noise mixing with more influence
      float noiseMix = noiseInfluence * depthFactor * (1.0 + colorIntensity * colorWaveInfluence);
      wave = mix(wave, noiseValue, clamp(noiseMix, 0.0, 1.0));
      
      // Apply color-based amplitude modulation with time-based pulsing
      // Make amplitude modulation respond to depth for better synergy
      float amplitudeMod = pulseEffect * (1.0 + (colorIntensity - 0.5) * colorAmplitudeEffect * depthFactor);
      wave = 0.5 + (wave - 0.5) * amplitudeMod;
      
      return clamp(wave, 0.0, 1.0);
    }
    
    // Function to calculate normal based on wave height field
    vec3 calculateNormal(vec2 uv, vec3 localColor) {
      float epsilon = 0.01;
      
      // Sample wave heights at nearby points
      float center = wavePattern(uv, 0.5, localColor);
      float right = wavePattern(uv + vec2(epsilon, 0.0), 0.5, localColor);
      float top = wavePattern(uv + vec2(0.0, epsilon), 0.5, localColor);
      
      // Calculate gradient
      // Use color intensity to affect the wave amplitude with time-based variation
      float colorIntensity = getColorIntensity(localColor);
      float timeComponent = time * waveSpeed;
      float pulseEffect = sin(timeComponent * 0.2) * 0.2 + 0.8;
      
      // Apply a more dynamic amplitude modulation for the normal calculation
      float amplitudeMod = waveAmplitude * pulseEffect * (1.0 + (colorIntensity - 0.5) * colorAmplitudeEffect);
      
      // Create more pronounced normals for a stronger 3D effect
      vec3 dx = vec3(epsilon, 0.0, (right - center) * amplitudeMod * 1.5);
      vec3 dy = vec3(0.0, epsilon, (top - center) * amplitudeMod * 1.5);
      
      // Cross product to get normal
      return normalize(cross(dx, dy));
    }
    
    // Function to calculate a non-linear edge fade with corner rounding
    float calculateEdgeFade(vec2 uv) {
      // Calculate distance from center (0.5, 0.5)
      vec2 centeredUV = uv - 0.5;
      
      // Calculate vertical distance for top/bottom fade with different handling for top vs bottom
      float verticalDist;
      if (centeredUV.y < 0.0) {
        // Bottom half - use full edgeDepth to ensure visibility
        if (bottomWaveEnabled) {
          // Create a wave pattern for the bottom edge
          float waveX = uv.x + bottomWaveOffset + time * bottomWaveSpeed * 0.1;
          float wave = sin(waveX * bottomWaveWidth) * bottomWaveDepth;
          
          // Adjust the vertical distance based on the wave pattern
          // This creates a wave-like bottom edge
          float waveOffset = wave * 0.5 * edgeDepth; // Scale the wave by edgeDepth
          verticalDist = (abs(centeredUV.y) - waveOffset) / (0.5 * edgeDepth);
          verticalDist = max(verticalDist, 0.0); // Ensure we don't go negative
        } else {
          // Standard bottom edge without wave
          verticalDist = abs(centeredUV.y) / (0.5 * edgeDepth);
        }
      } else {
        // Top half - adjust for corner roundness to prevent cutting off
        verticalDist = abs(centeredUV.y) / (0.5 * edgeDepth);
      }
      
      // Calculate horizontal distance for left/right fade
      float horizontalDist;
      if (centeredUV.x < 0.0) {
        // Left side
        horizontalDist = abs(centeredUV.x) / (0.5 * edgeDepth);
      } else {
        // Right side
        horizontalDist = abs(centeredUV.x) / (0.5 * edgeDepth);
      }
      
      // Create a radial distance for corner rounding
      // Adjust the denominator to prevent cutting off at high corner roundness values
      float radialDist = length(centeredUV) / (0.7071 * edgeDepth);
      
      // Determine if we're on the left or right side
      float cornerRoundness = (centeredUV.x < 0.0) ? leftCornerRoundness : rightCornerRoundness;
      
      // Modify corner blending based on whether we're in the top or bottom half
      float cornerBlend;
      if (centeredUV.y < 0.0) {
        // Bottom half - full corner blending
        cornerBlend = smoothstep(0.0, 1.0, pow(horizontalDist, 1.5));
      } else {
        // Top half - reduce corner blending effect as we approach the top edge
        // This prevents the top edge from being cut off with high corner roundness
        float topFactor = smoothstep(0.3, 0.5, abs(centeredUV.y) / 0.5);
        cornerBlend = smoothstep(0.0, 1.0, pow(horizontalDist, 1.5)) * (1.0 - topFactor * cornerRoundness * 0.5);
      }
      
      // Blend between vertical and radial distance
      float distanceField = mix(verticalDist, radialDist, cornerBlend * cornerRoundness);
      
      // Apply noise to the edge for a more organic, burn-in look
      float edgeNoise = fbm((uv + time * 0.01) * edgeNoiseScale) * edgeNoiseAmount;
      distanceField = distanceField + (edgeNoise - edgeNoiseAmount * 0.5) * 0.2;
      
      // Apply contrast to the edge
      distanceField = pow(distanceField, edgeContrast);
      
      return distanceField;
    }
    
    // Function to generate film grain noise (optimized)
    float filmGrain(vec2 uv, float grainTime) {
      // Single random call instead of two for better performance
      // Pre-multiply by filmGrainSize to reduce per-pixel calculations
      return random(uv * filmGrainSize + grainTime) * 2.0 - 1.0;
    }
    
    // Function to generate film scratches
    float filmScratches(vec2 uv, float time) {
      // Vertical scratches
      float scratch = 0.0;
      
      // Create a few random scratches
      for (int i = 0; i < 3; i++) {
        float seed = float(i) * 1.3;
        float xPos = fract(sin(time * 0.01 + seed) * 43758.5453);
        float height = fract(sin(time * 0.01 + seed + 1.0) * 43758.5453) * 0.5 + 0.5;
        float width = 0.002 * (sin(time * 0.1 + seed) * 0.5 + 0.5);
        
        // Check if we're within a scratch
        if (abs(uv.x - xPos) < width && random(vec2(uv.y * 100.0, time + seed)) > 0.3) {
          scratch += 1.0 - smoothstep(0.0, width, abs(uv.x - xPos));
        }
      }
      
      // Add some horizontal scratches too
      for (int i = 0; i < 2; i++) {
        float seed = float(i) * 2.7 + 10.0;
        float yPos = fract(sin(time * 0.005 + seed) * 43758.5453);
        float width = 0.001 * (sin(time * 0.2 + seed) * 0.5 + 0.5);
        
        if (abs(uv.y - yPos) < width && random(vec2(uv.x * 100.0, time + seed)) > 0.7) {
          scratch += 1.0 - smoothstep(0.0, width, abs(uv.y - yPos));
        }
      }
      
      return clamp(scratch, 0.0, 1.0);
    }
    
    // Function to apply film noise effects (optimized)
    vec3 applyFilmNoise(vec3 color, vec2 uv) {
      // Early exit if film grain is disabled or intensity is zero
      if (!filmGrainEnabled || (filmNoiseIntensity == 0.0 && filmScratchIntensity == 0.0)) {
        return color;
      }
      
      // Cache time calculation (single operation instead of multiple)
      float grainTime = time * filmNoiseSpeed * 10.0;
      
      // Apply grain only if intensity > 0
      if (filmNoiseIntensity > 0.0) {
        float grain = filmGrain(uv, grainTime);
        color += grain * filmNoiseIntensity;
      }
      
      // Apply scratches only if intensity > 0 (scratches are disabled by default)
      if (filmScratchIntensity > 0.0) {
        float scratches = filmScratches(uv, grainTime * 0.5);
        color += scratches * filmScratchIntensity;
      }
      
      return color;
    }
    
    void main() {
      vec2 uv = vUv;
      
      // Get initial color blend for feedback
      // Create a time-varying color mix for more dynamic effects
      // Make the color mix factor respond to the wave depth for better synergy
      float waveDepthFactor = waveDepth * (1.0 + sin(time * 0.3) * 0.1);
      
      // Create a more dynamic color mix that's influenced by the wave depth
      // Use separate time for color cycling to prevent wave intensity accumulation
      float colorCycleTime = time + colorCycleOffset;
      float colorCyclePhase = colorCycleTime * colorCycleSpeed;
      float colorMixFactor = sin(colorCyclePhase * 0.1) * 0.1 + 0.5;
      
      // Create initial color blend
      vec3 initialColor = mix(color1, color2, colorMixFactor);
      
      // Create multiple depth layers for parallax effect with consistent color influence
      float foregroundWave = wavePattern(uv, 0.0, initialColor); // Foreground layer
      float middleWave = wavePattern(uv, 0.5, initialColor);     // Middle layer
      float backgroundWave = wavePattern(uv, 1.0, initialColor); // Background layer
      
      // Create more dynamic depth-based color mixing
      // Use the wave patterns to create more interesting color blends
      // Make the color mixing directly respond to the wave amplitude
      
      // Create a more dynamic color transition based on wave patterns
      // This creates a more direct relationship between wave height and color
      float foregroundColorMix = mix(0.3, 0.7, foregroundWave);
      float backgroundColorMix = mix(0.7, 0.3, backgroundWave);
      
      // Apply color cycling that's synchronized with the wave patterns
      // Reduce the influence of colorCyclePhase to minimize optical motion during scrubbing
      float reducedCycleInfluence = waveDepthFactor * 0.2; // Reduced from 0.5 to 0.2
      foregroundColorMix = mix(foregroundColorMix, sin(colorCyclePhase + foregroundWave * 3.14) * 0.5 + 0.5, reducedCycleInfluence);
      backgroundColorMix = mix(backgroundColorMix, sin(colorCyclePhase + backgroundWave * 3.14 + 1.57) * 0.5 + 0.5, reducedCycleInfluence);
      
      vec3 foregroundColor = mix(color1, color2, foregroundColorMix);
      vec3 backgroundColor = mix(color2, color1, backgroundColorMix);
      
      // Add subtle color variations that are synchronized with the wave patterns
      // Reduce the intensity of color variations to minimize optical motion during scrubbing
      // Use colorCycleTime for color variations to maintain continuity
      float waveSyncFactor = sin(time * waveSpeed * 0.2) * 0.5 + 0.5;
      foregroundColor += vec3(sin(colorCycleTime * 0.5) * 0.015, cos(colorCycleTime * 0.6) * 0.015, sin(colorCycleTime * 0.7) * 0.015) * foregroundWave;
      backgroundColor += vec3(cos(colorCycleTime * 0.4) * 0.015, sin(colorCycleTime * 0.5) * 0.015, cos(colorCycleTime * 0.6) * 0.015) * backgroundWave;
      
      // Create a more dynamic depth blend that's influenced by the wave depth parameter
      // This creates a stronger connection between the depth parameter and the visual effect
      float depthBlendRange = 0.3 + waveDepthFactor * 0.4; // Dynamic blend range based on wave depth
      float depthBlendMin = 0.5 - depthBlendRange * 0.5;
      float depthBlendMax = 0.5 + depthBlendRange * 0.5;
      float depthBlend = smoothInterpolation(depthBlendMin, depthBlendMax, middleWave);
      
      // Make the depth blend more responsive to the wave pattern
      depthBlend = mix(depthBlend, middleWave, waveDepthFactor * 0.5);
      
      // Create a more dynamic color blend based on wave patterns
      vec3 baseColor = mix(backgroundColor, foregroundColor, depthBlend);
      
      // Apply a subtle color shift based on the wave pattern
      // This creates a more direct relationship between wave height and color
      float colorShiftAmount = waveDepthFactor * 0.2;
      vec3 shiftedColor = mix(baseColor, 
                             vec3(baseColor.r * (1.0 + middleWave * 0.1),
                                  baseColor.g * (1.0 + foregroundWave * 0.1),
                                  baseColor.b * (1.0 + backgroundWave * 0.1)),
                             colorShiftAmount);
      baseColor = shiftedColor;
      
      // Apply darkness to the colors with slight time variation for "breathing" effect
      // Synchronize the darkness variation with the wave pattern, reduced intensity for less optical motion
      // Keep using time for wave-related breathing effect
      float darknessVariation = colorDarkness * (1.0 + sin(time * 0.2) * 0.025 + middleWave * 0.05);
      baseColor = mix(baseColor, vec3(0.0, 0.0, 0.0), darknessVariation);
      
      // Calculate lighting based on wave normal with consistent color influence
      vec3 waveNormal = calculateNormal(uv, initialColor);
      
      // Blend between the wave normal and the surface normal for subtle effect
      // Make the normal blend more dynamic with time and directly tied to the wave depth
      // Use the wave pattern to directly influence the normal calculation
      float normalBlendFactor = waveDepthFactor * (0.5 + middleWave * 0.5);
      // Add variation to the normal based on the wave pattern
      vec3 modifiedWaveNormal = waveNormal;
      modifiedWaveNormal.xy += vec2(sin(foregroundWave * 6.28) * 0.1, cos(backgroundWave * 6.28) * 0.1) * waveDepthFactor;
      modifiedWaveNormal = normalize(modifiedWaveNormal);
      
      vec3 normal = normalize(mix(vNormal, modifiedWaveNormal, normalBlendFactor));
      
      // Lighting calculations
      vec3 viewDir = normalize(vViewPosition);
      vec3 lightDir = normalize(lightDirection);
      
      // Add subtle movement to the light direction for more dynamic lighting
      // Synchronize light movement with wave patterns for better synergy, reduced intensity
      // Make the light direction respond directly to the wave pattern (keep using time for wave-related motion)
      lightDir.x += sin(time * 0.2) * 0.025 * middleWave;
      lightDir.y += cos(time * 0.25) * 0.025 * middleWave;
      // Add a subtle rotation to the light direction based on the wave pattern
      float lightRotation = (foregroundWave - 0.5) * waveDepthFactor * 0.2;
      vec3 rotatedLightDir = vec3(
          lightDir.x * cos(lightRotation) - lightDir.y * sin(lightRotation),
          lightDir.x * sin(lightRotation) + lightDir.y * cos(lightRotation),
          lightDir.z
      );
      lightDir = normalize(rotatedLightDir);
      
      // Ambient lighting with subtle color variation
      // Make the ambient color variation respond to the wave pattern, reduced intensity
      // Create a more dynamic ambient color that's influenced by the wave pattern (keep using time for wave-related motion)
      vec3 ambientVariation = vec3(sin(time * 0.3) * 0.015, cos(time * 0.4) * 0.015, sin(time * 0.5) * 0.015) * middleWave;
      // Add color cycling to the ambient lighting
      ambientVariation += (foregroundColor - backgroundColor) * foregroundWave * 0.05 * waveDepthFactor;
      vec3 ambientColor = baseColor * (1.0 + ambientVariation);
      vec3 ambient = ambientLight * ambientColor;
      
      // Diffuse lighting with enhanced contrast
      // Make the diffuse lighting more responsive to the wave pattern
      float diff = max(dot(normal, lightDir), 0.0);
      // Add variation to the diffuse lighting based on the wave pattern
      diff = pow(diff, 1.2 + foregroundWave * 0.3); // Add contrast to the diffuse lighting
      // Enhance diffuse lighting based on wave height for better synergy
      diff *= 1.0 + middleWave * waveDepthFactor * 0.5;
      // Add a subtle color shift to the diffuse lighting based on the wave pattern
      vec3 diffuseColor = baseColor;
      diffuseColor = mix(diffuseColor, foregroundColor, foregroundWave * waveDepthFactor * 0.2);
      vec3 diffuse = directionalLight * diff * diffuseColor;
      
      // Specular lighting (Blinn-Phong) with time-based variation
      vec3 halfwayDir = normalize(lightDir + viewDir);
      // Make the specular power respond to the wave pattern
      float specPower = shininess * (1.0 + foregroundWave * waveDepthFactor * 2.0);
      float spec = pow(max(dot(normal, halfwayDir), 0.0), specPower);
      // Add time-based variation to the specular highlights
      // Synchronize specular highlights with wave patterns, reduced intensity (keep using time for wave-related motion)
      float specularVariation = 1.0 + sin(time * 0.5) * 0.1 * foregroundWave;
      // Add color to the specular highlights based on the wave pattern
      vec3 specularColor = mix(vec3(1.0), foregroundColor * 1.5, foregroundWave * waveDepthFactor * 0.3);
      vec3 specular = specularStrength * specularVariation * spec * specularColor;
      
      // Combine lighting components
      vec3 color = ambient + diffuse + specular;
      
      // Add highlights based on wave height for extra depth with more variation
      // Make highlights directly respond to the wave pattern for better synergy, reduced intensity (keep using time for wave-related motion)
      float highlightIntensity = smoothInterpolation(0.4, 0.6, foregroundWave) * waveDepthFactor * (1.0 + sin(time * 0.4) * 0.1);
      // Add color tint to highlights based on the wave pattern
      // Create a more dynamic highlight color that's influenced by the wave pattern
      vec3 highlightColor = mix(vec3(0.1, 0.1, 0.15), mix(color1, color2, foregroundWave) * 0.5, waveDepthFactor * 0.5);
      // Add variation to the highlight color based on the wave pattern
      highlightColor = mix(highlightColor, foregroundColor * 0.7, middleWave * 0.5);
      color += highlightColor * highlightIntensity;
      
      // Apply film noise effects
      color = applyFilmNoise(color, uv);
      
      // Calculate non-linear edge fade with corner rounding
      float distanceField = calculateEdgeFade(uv);
      
      // Apply different softness to all edges
      float alpha = 1.0;
      
      // Vertical edges (top/bottom)
      if (uv.y >= 0.5) {
        // Top half
        float normalizedDist = (distanceField - 0.5) / 0.5; // Normalize to 0-1 range for top half
        alpha *= 1.0 - smoothInterpolation(1.0 - topEdgeSoftness, 1.0, normalizedDist);
      } else {
        // Bottom half
        float normalizedDist = (distanceField - 0.5) / 0.5; // Normalize to 0-1 range for bottom half
        alpha *= 1.0 - smoothInterpolation(1.0 - bottomEdgeSoftness, 1.0, normalizedDist);
      }
      
      // Horizontal edges (left/right)
      if (uv.x >= 0.5) {
        // Right half
        float normalizedDist = (abs(uv.x - 0.5) / 0.5) / edgeDepth;
        alpha *= 1.0 - smoothInterpolation(1.0 - rightEdgeSoftness, 1.0, normalizedDist);
      } else {
        // Left half
        float normalizedDist = (abs(uv.x - 0.5) / 0.5) / edgeDepth;
        alpha *= 1.0 - smoothInterpolation(1.0 - leftEdgeSoftness, 1.0, normalizedDist);
      }
      
      // Add subtle noise to alpha for a more organic edge (keep using time for wave-related motion)
      float edgeNoise = fbm(uv * noiseScale * 2.0 + time * 0.05 * noiseSpeed);
      alpha *= 0.95 + edgeNoise * 0.05;

      gl_FragColor = vec4(color, alpha);
    }
  `;

  // Create a full-screen plane geometry with more segments for better wave detail
  const geometry = new THREE.PlaneGeometry(
    window.innerWidth,
    window.innerHeight,
    window.innerWidth / 10, // More segments for smoother wave patterns
    window.innerHeight / 10
  );

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: true,
    side: THREE.DoubleSide, // Render both sides
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Create GUI controls
  window.gui = new dat.GUI({ width: 300, closed: true });
  const gui = window.gui; // Keep local reference for backwards compatibility
  gui.domElement.style.position = "absolute";
  gui.domElement.style.top = "10px";
  gui.domElement.style.right = "10px";

  // Change the close button text from "Close Controls" to "Open Controls"
  const closeButton = gui.domElement.querySelector(".close-button");
  if (closeButton) {
    closeButton.innerHTML = "Open Controls";

    // Add event listener to toggle the text when clicked
    closeButton.addEventListener("click", function () {
      setTimeout(() => {
        this.innerHTML = gui.closed ? "Open Controls" : "Close Controls";
      }, 50);
    });
  }

  // Create a folder for camera controls
  const cameraFolder = gui.addFolder("Camera Controls");

  // Add zoom control
  cameraFolder
    .add(cameraParams, "zoom", 0.1, 5)
    .name("Zoom Level")
    .step(0.001)
    .onChange((value) => {
      // Update camera zoom
      camera.zoom = value;
      camera.updateProjectionMatrix();
    });

  // Close the camera folder by default
  cameraFolder.close();

  // Create a folder for animation speed controls
  const speedFolder = gui.addFolder("Animation Speed Controls");

  // Add controls for animation speed parameters
  speedFolder
    .add(uniforms.mainSpeed, "value", 0.0001, 0.1)
    .name("Main Speed")
    .step(0.0001)
    .onChange((value) => {
      uniforms.mainSpeed.value = value;
    });

  speedFolder
    .add(uniforms.waveSpeed, "value", 0.0001, 5)
    .name("Wave Speed")
    .step(0.0001)
    .onChange((value) => {
      uniforms.waveSpeed.value = value;
    });

  speedFolder
    .add(uniforms.noiseSpeed, "value", 0.0001, 5)
    .name("Noise Speed")
    .step(0.0001)
    .onChange((value) => {
      uniforms.noiseSpeed.value = value;
    });

  speedFolder
    .add(uniforms.colorCycleSpeed, "value", 0.000001, 5)
    .name("Color Cycle Speed")
    .step(0.000001)
    .onChange((value) => {
      uniforms.colorCycleSpeed.value = value;
    });

  speedFolder
    .add(uniforms.colorCycleOffset, "value", 0.0, 6.28)
    .name("Color Cycle Offset")
    .step(0.01)
    .onChange((value) => {
      uniforms.colorCycleOffset.value = value;
    });

  // Open the speed folder by default
  speedFolder.open();

  // Add color pickers for the gradient colors
  const colorFolder = gui.addFolder("Color Controls");

  // Convert THREE.Color to hex format for the color picker
  const color1Hex = "#" + uniforms.color1.value.getHexString();
  const color2Hex = "#" + uniforms.color2.value.getHexString();

  // Add color picker for the first color
  colorFolder
    .addColor({ color: color1Hex }, "color")
    .name("Color 1")
    .onChange((value) => {
      // Update the uniform with the new color
      if (typeof value === "string") {
        // Value is a hex string
        uniforms.color1.value.set(value);
      } else {
        // Value might be an RGB object
        uniforms.color1.value.setRGB(value.r / 255, value.g / 255, value.b / 255);
      }
    });

  // Add color picker for the second color
  colorFolder
    .addColor({ color: color2Hex }, "color")
    .name("Color 2")
    .onChange((value) => {
      // Update the uniform with the new color
      if (typeof value === "string") {
        // Value is a hex string
        uniforms.color2.value.set(value);
      } else {
        // Value might be an RGB object
        uniforms.color2.value.setRGB(value.r / 255, value.g / 255, value.b / 255);
      }
    });

  // Add color darkness control
  colorFolder
    .add(uniforms.colorDarkness, "value", 0.0, 2.0)
    .name("Color Darkness")
    .step(0.001)
    .onChange((value) => {
      uniforms.colorDarkness.value = value;
    });

  // Add color-wave interaction controls
  colorFolder
    .add(uniforms.colorWaveInfluence, "value", 0.0, 1.0)
    .name("Color → Wave Influence")
    .onChange((value) => {
      uniforms.colorWaveInfluence.value = value;
    });

  colorFolder
    .add(uniforms.colorFrequencyShift, "value", 0.0, 1.0)
    .name("Color → Frequency Effect")
    .onChange((value) => {
      uniforms.colorFrequencyShift.value = value;
    });

  colorFolder
    .add(uniforms.colorAmplitudeEffect, "value", 0.0, 1.0)
    .name("Color → Amplitude Effect")
    .onChange((value) => {
      uniforms.colorAmplitudeEffect.value = value;
    });

  // Open the color folder by default
  colorFolder.open();

  // Create a folder for wave controls
  const waveFolder = gui.addFolder("Wave Controls");

  // Add controls for wave parameters
  waveFolder
    .add(uniforms.waveAmplitude, "value", 0, 12)
    .step(0.0001)
    .name("Wave Amplitude")
    .onChange((value) => {
      uniforms.waveAmplitude.value = value;
    });

  waveFolder
    .add(uniforms.waveFrequency, "value", 0.1, 5)
    .name("Wave Frequency")
    .onChange((value) => {
      uniforms.waveFrequency.value = value;
    });

  waveFolder
    .add(uniforms.waveDepth, "value", 0, 1)
    .name("Wave Depth Effect")
    .onChange((value) => {
      uniforms.waveDepth.value = value;
    });

  waveFolder
    .add(uniforms.noiseScale, "value", 0, 5)
    .name("Noise Scale")
    .onChange((value) => {
      uniforms.noiseScale.value = value;
    });

  waveFolder
    .add(uniforms.noiseInfluence, "value", 0, 1)
    .name("Noise Influence")
    .onChange((value) => {
      uniforms.noiseInfluence.value = value;
    });

  waveFolder
    .add(uniforms.layerOffset, "value", 0, 1)
    .name("Layer Depth Offset")
    .onChange((value) => {
      uniforms.layerOffset.value = value;
    });

  // Flow direction controls
  const flowFolder = waveFolder.addFolder("Flow Direction");

  flowFolder
    .add(uniforms.flowDirection.value, "x", -2, 2)
    .name("Horizontal Flow")
    .onChange((value) => {
      uniforms.flowDirection.value.x = value;
    });

  flowFolder
    .add(uniforms.flowDirection.value, "y", -2, 2)
    .name("Vertical Flow")
    .onChange((value) => {
      uniforms.flowDirection.value.y = value;
    });

  // Create a folder for appearance controls
  const appearanceFolder = gui.addFolder("Appearance Controls");

  // Add film noise controls
  const filmNoiseFolder = gui.addFolder("Film Noise Controls");

  filmNoiseFolder
    .add(uniforms.filmNoiseIntensity, "value", 0.0, 1.0)
    .name("Noise Intensity")
    .onChange((value) => {
      uniforms.filmNoiseIntensity.value = value;
    });

  filmNoiseFolder
      .add({ speed: uniforms.filmNoiseSpeed.value * 1e6 }, "speed", 1, 8)
      .name("Noise Speed (×1e-6)")
      .step(0.1)
      .onChange((v) => {
        uniforms.filmNoiseSpeed.value = v * 1e-6;
      });

  filmNoiseFolder
    .add(uniforms.filmGrainSize, "value", 0.5, 50.0)
    .name("Grain Size")
    .onChange((value) => {
      uniforms.filmGrainSize.value = value;
    });

  filmNoiseFolder
    .add(uniforms.filmScratchIntensity, "value", 0.0, 0.1)
    .name("Scratch Intensity")
    .onChange((value) => {
      uniforms.filmScratchIntensity.value = value;
    });

  // Film noise folder starts closed
  // filmNoiseFolder.open();

  // Add controls for x-offset with a much larger range
  appearanceFolder
    .add(uniforms.xOffset, "value", -1.0, 1.0)
    .step(0.001)
    .name("X Position")
    .onChange((value) => {
      uniforms.xOffset.value = value;
    });

  // Add controls for y-offset with a much larger range
  appearanceFolder
    .add(uniforms.yOffset, "value", -1.0, 1.0)
    .step(0.001)
    .name("Y Position")
    .onChange((value) => {
      uniforms.yOffset.value = value;
    });

  // Add controls for fade edges and width
  appearanceFolder
    .add(uniforms.fadeWidth, "value", 0.1, 1.0)
    .name("Visible Area Size")
    .onChange((value) => {
      uniforms.fadeWidth.value = value;
    });

  appearanceFolder
    .add(uniforms.topEdgeSoftness, "value", 0.0, 1.0)
    .name("Top Edge Softness")
    .onChange((value) => {
      uniforms.topEdgeSoftness.value = value;
    });

  appearanceFolder
    .add(uniforms.bottomEdgeSoftness, "value", 0.0, 1.0)
    .name("Bottom Edge Softness")
    .onChange((value) => {
      uniforms.bottomEdgeSoftness.value = value;
    });

  // Add controls for left and right edge softness
  appearanceFolder
    .add(uniforms.leftEdgeSoftness, "value", 0.0, 1.0)
    .name("Left Edge Softness")
    .onChange((value) => {
      uniforms.leftEdgeSoftness.value = value;
    });

  appearanceFolder
    .add(uniforms.rightEdgeSoftness, "value", 0.0, 1.0)
    .name("Right Edge Softness")
    .onChange((value) => {
      uniforms.rightEdgeSoftness.value = value;
    });

  // Add controls for edge appearance
  appearanceFolder
    .add(uniforms.leftCornerRoundness, "value", 0.0, 1.0)
    .name("Left Corner Roundness")
    .onChange((value) => {
      uniforms.leftCornerRoundness.value = value;
    });

  appearanceFolder
    .add(uniforms.rightCornerRoundness, "value", 0.0, 1.0)
    .name("Right Corner Roundness")
    .onChange((value) => {
      uniforms.rightCornerRoundness.value = value;
    });

  appearanceFolder
    .add(uniforms.edgeDepth, "value", 0.1, 3.0)
    .name("Edge Burn-in Depth")
    .onChange((value) => {
      uniforms.edgeDepth.value = value;
    });

  appearanceFolder
    .add(uniforms.edgeContrast, "value", 0.5, 3.0)
    .name("Edge Contrast")
    .onChange((value) => {
      uniforms.edgeContrast.value = value;
    });

  appearanceFolder
    .add(uniforms.edgeNoiseAmount, "value", 0.0, 1.0)
    .name("Edge Noise Amount")
    .onChange((value) => {
      uniforms.edgeNoiseAmount.value = value;
    });

  appearanceFolder
    .add(uniforms.edgeNoiseScale, "value", 0.5, 10.0)
    .name("Edge Noise Scale")
    .onChange((value) => {
      uniforms.edgeNoiseScale.value = value;
    });

  // Add a folder for bottom wave edge controls
  const bottomWaveFolder = gui.addFolder("Bottom Wave Edge Controls");

  bottomWaveFolder
    .add(uniforms.bottomWaveEnabled, "value")
    .name("Enable Bottom Wave")
    .onChange((value) => {
      uniforms.bottomWaveEnabled.value = value;
      // Reposition globe when wave is enabled/disabled
      if (globeModel && globeParams.responsive) {
        positionGlobeBehindBottomWave();
      }
    });

  bottomWaveFolder
    .add(uniforms.bottomWaveDepth, "value", 0.0, 0.5)
    .name("Wave Depth")
    .step(0.001)
    .onChange((value) => {
      uniforms.bottomWaveDepth.value = value;
      // Reposition globe when wave depth changes
      if (globeModel && globeParams.responsive) {
        positionGlobeBehindBottomWave();
      }
    });

  bottomWaveFolder
    .add(uniforms.bottomWaveWidth, "value", 1.0, 20.0)
    .name("Wave Width")
    .step(0.001)
    .onChange((value) => {
      uniforms.bottomWaveWidth.value = value;
    });

  bottomWaveFolder
    .add(uniforms.bottomWaveSpeed, "value", 0.0, 5.0)
    .name("Wave Speed")
    .step(0.001)
    .onChange((value) => {
      uniforms.bottomWaveSpeed.value = value;
    });

  bottomWaveFolder
    .add(uniforms.bottomWaveOffset, "value", -5.0, 5.0)
    .name("Wave Offset")
    .step(0.001)
    .onChange((value) => {
      uniforms.bottomWaveOffset.value = value;
    });

  // Create a folder for lighting controls
  const lightingFolder = gui.addFolder("Lighting Controls");

  lightingFolder
    .add(uniforms.ambientLight, "value", 0, 1)
    .name("Ambient Light")
    .onChange((value) => {
      uniforms.ambientLight.value = value;
    });

  lightingFolder
    .add(uniforms.directionalLight, "value", 0, 1)
    .name("Directional Light")
    .step(0.001)
    .onChange((value) => {
      uniforms.directionalLight.value = value;
    });

  lightingFolder
    .add(uniforms.specularStrength, "value", 0, 1)
    .step(0.001)
    .name("Specular Strength")
    .onChange((value) => {
      uniforms.specularStrength.value = value;
    });

  lightingFolder
    .add(uniforms.shininess, "value", 1, 128)
    .name("Shininess")
    .onChange((value) => {
      uniforms.shininess.value = value;
    });

  // Light direction controls
  const lightDirFolder = lightingFolder.addFolder("Light Direction");

  lightDirFolder
    .add(uniforms.lightDirection.value, "x", -1, 1)
    .name("X")
    .onChange(() => {
      uniforms.lightDirection.value.normalize();
    });

  lightDirFolder
    .add(uniforms.lightDirection.value, "y", -1, 1)
    .name("Y")
    .onChange(() => {
      uniforms.lightDirection.value.normalize();
    });

  lightDirFolder
    .add(uniforms.lightDirection.value, "z", 0, 1)
    .name("Z")
    .onChange(() => {
      uniforms.lightDirection.value.normalize();
    });

  // Lighting folder starts closed
  // lightingFolder.open();

  // Create a folder for globe model controls
  const globeFolder = gui.addFolder("Globe Model Controls");

  // Add lighting specifically for the globe model
  const globeLight = new THREE.DirectionalLight(0xffffff, 10);
  globeLight.position.set(1, 1, 1);
  scene.add(globeLight);

  const globeAmbientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(globeAmbientLight);

  // Globe lighting controls
  const globeLightingFolder = globeFolder.addFolder("Lighting");

  globeLightingFolder
    .add({ intensity: 3 }, "intensity", 0, 5)
    .name("Direct Light")
    .onChange((value) => {
      globeLight.intensity = value;
    });

  globeLight.intensity = 3.0;

  globeLightingFolder
    .add({ intensity: globeAmbientLight.intensity }, "intensity", 0, 5)
    .name("Ambient Light")
    .onChange((value) => {
      globeAmbientLight.intensity = value;
    });

  // Visibility toggle
  globeFolder
    .add(globeParams, "visible")
    .name("Show Globe")
    .onChange((value) => {
      if (globeModel) {
        globeModel.visible = value;
      }
    });

  // Scale control
  globeFolder
    .add(globeParams, "scale", 0.1, 50)
    .name("Size")
    .step(0.1)
    .onChange((value) => {
      if (globeModel) {
        // Update the base scale value when manually changed
        globeParams.baseScale = value;
        // Apply the scale
        globeModel.scale.set(value, value, value);
      }
    });

  // Responsive scaling toggle
  globeFolder
    .add(globeParams, "responsive")
    .name("Responsive Size")
    .onChange((value) => {
      // If responsive is toggled off, reset to the current base scale
      if (!value && globeModel) {
        globeModel.scale.set(globeParams.baseScale, globeParams.baseScale, globeParams.baseScale);
      } else if (value) {
        // If toggled on, immediately apply responsive scaling
        updateGlobeSize();
      }
    });

  // Add a manual resize button
  globeFolder
    .add(
      {
        resizeGlobe: function () {
          if (globeModel) {
            updateGlobeSize();
          }
        },
      },
      "resizeGlobe"
    )
    .name("Force Resize");

  // Add button to position behind wave
  globeFolder
    .add(
      {
        positionBehindWave: function () {
          if (globeModel) {
            positionGlobeBehindBottomWave();
          }
        },
      },
      "positionBehindWave"
    )
    .name("Position Behind Wave");

  // Function to position the globe behind the bottom wave edge
  function positionGlobeBehindBottomWave() {
    if (!globeModel) return;

    // Get the current viewport dimensions
    const vw = window.innerWidth;
    const svh = window.innerHeight;

    // Check if we're in mobile viewport (640px or less)
    if (vw <= 640) {
      // Set the Y position to 0 for mobile viewports to center it
      globeModel.position.y = 0;
      globeModel.position.z = -10; // Keep Z position consistent

      // Update the position values in the GUI
      for (let i = 0; i < positionFolder.__controllers.length; i++) {
        const controller = positionFolder.__controllers[i];
        if (controller.property === "positionY") {
          // Update without triggering onChange
          controller.setValue(0);
        } else if (controller.property === "positionZ") {
          // Update without triggering onChange
          controller.setValue(-10);
        }
      }
      return;
    }

    // Check if we're in tablet viewport (between 640px and 1024px)
    if (vw > 640 && vw <= 1024) {
      // Set a more centered Y position for tablet viewports
      // Position it higher than the mobile position to be more centered
      const centeredYPosition = 192; // More centered than the mobile 192
      globeModel.position.y = centeredYPosition;
      globeModel.position.z = -10; // Keep Z position consistent

      // Update the position values in the GUI
      for (let i = 0; i < positionFolder.__controllers.length; i++) {
        const controller = positionFolder.__controllers[i];
        if (controller.property === "positionY") {
          // Update without triggering onChange
          controller.setValue(centeredYPosition);
        } else if (controller.property === "positionZ") {
          // Update without triggering onChange
          controller.setValue(-10);
        }
      }
      return;
    }

    // For desktop viewports (> 1024px), use fixed positioning
    // Set fixed Y position and Z position for desktop
    const desktopYPosition = -40;
    const desktopZPosition = -10;

    // Apply the positions to the globe model
    globeModel.position.y = desktopYPosition;
    globeModel.position.z = desktopZPosition;

    // Update the position values in the GUI
    for (let i = 0; i < positionFolder.__controllers.length; i++) {
      const controller = positionFolder.__controllers[i];
      if (controller.property === "positionY") {
        // Update without triggering onChange
        controller.setValue(desktopYPosition);
      } else if (controller.property === "positionZ") {
        // Update without triggering onChange
        controller.setValue(desktopZPosition);
      }
    }
  }

  // Function to update globe size based on viewport
  function updateGlobeSize() {
    if (!globeModel || !globeParams.responsive) return;

    // Get the current viewport width
    const vw = window.innerWidth;

    // Check if we're on desktop (> 1024px)
    if (vw > 1024) {
      // For desktop, use fixed scale of 40
      const desktopScale = 40;
      globeModel.scale.set(desktopScale, desktopScale, desktopScale);

      // Update GUI slider without triggering onChange
      for (let i = 0; i < globeFolder.__controllers.length; i++) {
        if (globeFolder.__controllers[i].property === "scale") {
          globeFolder.__controllers[i].setValue(desktopScale);
          break;
        }
      }

      // Position the globe with fixed desktop positioning
      positionGlobeBehindBottomWave();
      return;
    }

    // For mobile and tablet (≤ 1024px), keep the responsive calculation
    // Calculate target width - 90vw for tablet, 120vw (33% larger) for mobile
    let targetWidth;
    if (vw <= 640) {
      // Mobile: 90vw * 1.33 = 120vw (33% larger)
      targetWidth = vw * 1.2; // 120% of viewport width for mobile
    } else {
      // Tablet: keep original 90vw
      targetWidth = vw * 0.9;
    }

    // We need the actual size of the model in its natural state
    // Store the original scale
    const originalScale = {
      x: globeModel.scale.x,
      y: globeModel.scale.y,
      z: globeModel.scale.z,
    };

    try {
      // Temporarily set scale to 1 to get natural size
      globeModel.scale.set(1, 1, 1);

      // Force update of matrix to ensure accurate bounding box calculation
      globeModel.updateMatrixWorld(true);

      // Compute the bounding box
      const bbox = new THREE.Box3().setFromObject(globeModel);
      const modelWidth = bbox.max.x - bbox.min.x;

      // Restore original scale immediately after measurement
      globeModel.scale.set(originalScale.x, originalScale.y, originalScale.z);

      // Calculate scale needed to make the model 90vw in pixels
      // We convert from pixels to THREE.js world units
      // The view frustrum width in world units is (camera.right - camera.left) / camera.zoom
      const viewFrustrumWidthInWorld = (camera.right - camera.left) / camera.zoom;
      const pixelsToWorldRatio = viewFrustrumWidthInWorld / vw;

      // Target width in world units
      const targetWorldWidth = targetWidth * pixelsToWorldRatio;

      // Calculate the needed scale
      const newScale = targetWorldWidth / modelWidth;

      // Apply the new scale
      globeModel.scale.set(newScale, newScale, newScale);

      // Update GUI slider without triggering onChange
      for (let i = 0; i < globeFolder.__controllers.length; i++) {
        if (globeFolder.__controllers[i].property === "scale") {
          globeFolder.__controllers[i].setValue(newScale);
          break;
        }
      }

      // After sizing the globe, position it behind the bottom wave
      // This will now account for mobile viewport positioning
      positionGlobeBehindBottomWave();
    } catch (error) {
      console.error("Error updating globe size:", error);
      // Restore original scale if there was an error
      globeModel.scale.set(originalScale.x, originalScale.y, originalScale.z);
    }
  }

  // Position controls
  const positionFolder = globeFolder.addFolder("Position");

  positionFolder
    .add(globeParams, "positionX", -500, 500)
    .name("X Position")
    .step(1)
    .onChange((value) => {
      if (globeModel) {
        globeModel.position.x = value;
      }
    });

  positionFolder
    .add(globeParams, "positionY", -500, 500)
    .name("Y Position")
    .step(1)
    .onChange((value) => {
      if (globeModel) {
        globeModel.position.y = value;
      }
    });

  positionFolder
    .add(globeParams, "positionZ", -500, 500)
    .name("Z Position")
    .step(1)
    .onChange((value) => {
      if (globeModel) {
        globeModel.position.z = value;
      }
    });

  // Rotation controls
  const rotationFolder = globeFolder.addFolder("Rotation");

  rotationFolder
    .add(globeParams, "rotationX", 0, 360)
    .name("X Rotation")
    .step(1)
    .onChange((value) => {
      if (globeModel) {
        globeModel.rotation.x = (value * Math.PI) / 180;
      }
    });

  rotationFolder
    .add(globeParams, "rotationY", 0, 360)
    .name("Y Rotation")
    .step(1)
    .onChange((value) => {
      if (globeModel) {
        globeModel.rotation.y = (value * Math.PI) / 180;
      }
    });

  rotationFolder
    .add(globeParams, "rotationZ", 0, 360)
    .name("Z Rotation")
    .step(1)
    .onChange((value) => {
      if (globeModel) {
        globeModel.rotation.z = (value * Math.PI) / 180;
      }
    });

  // Auto-rotation controls
  globeFolder
    .add(globeParams, "autoRotate")
    .name("Auto Rotate")
    .onChange((value) => {
      globeParams.autoRotate = value;
    });

  globeFolder
    .add(globeParams, "baseRotateSpeed", 0.05, 1)
    .name("Base Rotation Speed")
    .step(0.01)
    .onChange((value) => {
      globeParams.baseRotateSpeed = value;
    });

  globeFolder
    .add(globeParams, "scrollRotateSpeed", 0.05, 1)
    .name("Scroll Rotation Speed")
    .step(0.01)
    .onChange((value) => {
      globeParams.scrollRotateSpeed = value;
    });

  // Open the globe folder by default
  globeFolder.open();

  // Create a folder for gradient overlay controls
  const overlayFolder = gui.addFolder("Gradient Overlay Controls");

  // Visibility toggle
  overlayFolder
    .add(overlayParams, "enabled")
    .name("Show Overlay")
    .onChange((value) => {
      if (overlayMesh) {
        overlayMesh.visible = value;
      }
    });

  // Top opacity control with clarified name
  const topOpacityController = overlayFolder
    .add(overlayParams, "startOpacity", 0, 1)
    .name("Top Opacity")
    .step(0.01)
    .onChange((value) => {
      if (overlayMaterial) {
        overlayMaterial.uniforms.startOpacity.value = value;
      }
    });
  // Modify the display name
  topOpacityController.__li.querySelector(".property-name").innerHTML = "Top Opacity (Top Edge)";

  // Bottom opacity control with clarified name
  const bottomOpacityController = overlayFolder
    .add(overlayParams, "endOpacity", 0, 1)
    .name("Bottom Opacity")
    .step(0.01)
    .onChange((value) => {
      if (overlayMaterial) {
        overlayMaterial.uniforms.endOpacity.value = value;
      }
    });
  // Modify the display name
  bottomOpacityController.__li.querySelector(".property-name").innerHTML = "Bottom Opacity (Bottom Edge)";

  // Plane Y position control (moves the entire overlay)
  overlayFolder
    .add(overlayParams, "yOffset", -2, 2)
    .name("Vertical Position (moves only)")
    .step(0.01)
    .onChange((value) => {
      if (overlayMesh) {
        // Only update position, never affect height
        updateOverlayPosition();
      }
    });

  // Gradient Y offset control (affects only the gradient within the plane)
  overlayFolder
    .add(overlayParams, "offsetY", -1, 1)
    .name("Gradient Shift")
    .step(0.01)
    .onChange((value) => {
      if (overlayMaterial) {
        overlayMaterial.uniforms.offsetY.value = value;
      }
    });

  // Height control
  overlayFolder
    .add(overlayParams, "height", 0.1, 5)
    .name("Gradient Distribution (not size)")
    .step(0.1)
    .onChange((value) => {
      if (overlayMaterial) {
        overlayMaterial.uniforms.heightMultiplier.value = value;
      }
    });

  // Color control
  overlayFolder
    .addColor(overlayParams, "color")
    .name("Color")
    .onChange((value) => {
      if (overlayMaterial) {
        overlayMaterial.uniforms.overlayColor.value.set(value);
      }
    });

  // Debug button to make overlay fully opaque temporarily
  overlayFolder
    .add(
      {
        debugOverlay: function () {
          if (overlayMaterial) {
            // Save current values
            const savedStart = overlayMaterial.uniforms.startOpacity.value;
            const savedEnd = overlayMaterial.uniforms.endOpacity.value;

            // Make overlay fully opaque with a bright color to check visibility
            overlayMaterial.uniforms.startOpacity.value = 1.0;
            overlayMaterial.uniforms.endOpacity.value = 1.0;
            overlayMaterial.uniforms.overlayColor.value.set("#FF00FF"); // Bright magenta

            // Reset after 2 seconds
            setTimeout(() => {
              overlayMaterial.uniforms.startOpacity.value = savedStart;
              overlayMaterial.uniforms.endOpacity.value = savedEnd;
              overlayMaterial.uniforms.overlayColor.value.set(overlayParams.color);
            }, 2000);
          }
        },
      },
      "debugOverlay"
    )
    .name("Debug Visibility");

  // Open the overlay folder by default
  overlayFolder.open();

  // Create particle system with performance-based count
  let particleCount = perfSettings.particleCount; // Use performance-based particle count
  console.log('[Background Init] Using particle count:', particleCount);
  let particles = new Float32Array(particleCount * 3);
  let particleVelocities = new Float32Array(particleCount * 3);
  let particleColors = new Float32Array(particleCount * 3);

  // Track scroll position
  let scrollY = 0;
  let lastScrollY = 0;

  // Define scroll control object before it's used in any calculations
  const scrollObj = {
    scrollSpeed: 0.005,
    verticalSpread: 1.0,
    horizontalSpread: 0.56,
    damping: 0.95,
    depthRange: 1000, // Default depth range
    sizeMin: 1.1, // Minimum particle size
    sizeMax: 4.0, // Maximum particle size
    floatSpeed: 0.8, // Floating speed multiplier
    verticalOffset: 0, // Vertical offset for the entire particle system
  };

  // Set vertical and horizontal distribution areas based on the spread values
  let verticalDistribution = window.innerHeight * scrollObj.verticalSpread;
  let horizontalDistribution = window.innerWidth * scrollObj.horizontalSpread;

  // Function to redistribute particles with size variation
  function redistributeParticles() {
    // Create a size attribute for individual particle sizes
    const sizes = new Float32Array(particleCount);
    
    // Reuse color object to avoid creating thousands of objects
    const depthColor = new THREE.Color(particleColorObj.color);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Randomly assign a size between min and max
      const sizeRatio = Math.random();
      // Calculate the actual size value between min and max
      const particleSize = scrollObj.sizeMin + sizeRatio * (scrollObj.sizeMax - scrollObj.sizeMin);

      // Store the size value directly - we'll divide by baseSize in the shader
      sizes[i] = particleSize / customParticleMaterial.uniforms.baseSize.value;

      // Adjust particle color slightly based on size to enhance depth perception
      // Larger particles are brighter (appear closer) - increased brightness factor
      const brightnessAdjust = 0.8 + sizeRatio * 0.6; // Increased from 0.6 + 0.4 to 0.8 + 0.6
      particleColors[i3] = depthColor.r * brightnessAdjust;
      particleColors[i3 + 1] = depthColor.g * brightnessAdjust;
      particleColors[i3 + 2] = depthColor.b * brightnessAdjust;
    }

    // Add the size attribute to the geometry
    particleGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    particleGeometry.attributes.position.needsUpdate = true;
    particleGeometry.attributes.color.needsUpdate = true;
    particleGeometry.attributes.size.needsUpdate = true;
  }

  // Initialize particles with random positions and velocities
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    // Random positions within horizontal and vertical spread ranges
    particles[i3] = (Math.random() - 0.5) * horizontalDistribution;
    particles[i3 + 1] = (Math.random() - 0.5) * verticalDistribution + scrollObj.verticalOffset;
    particles[i3 + 2] = Math.random() * 500 - 250; // Random z position for rendering order

    // Random velocities
    particleVelocities[i3] = (Math.random() - 0.5) * 0.5;
    particleVelocities[i3 + 1] = (Math.random() - 0.5) * 0.5;
    particleVelocities[i3 + 2] = (Math.random() - 0.5) * 0.2;

    // Set default color to #25e5ff (bright cyan)
    const color = new THREE.Color("#25e5ff");
    particleColors[i3] = color.r;
    particleColors[i3 + 1] = color.g;
    particleColors[i3 + 2] = color.b;
  }

  // Create particle geometry and material
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute("position", new THREE.BufferAttribute(particles, 3));
  particleGeometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));
  memoryManager.track(particleGeometry, 'geometry'); // Track for cleanup

  // Create a sparkle texture for particles
  const sparkleTexture = createSparkleTexture();
  memoryManager.track(sparkleTexture, 'texture'); // Track for cleanup

  // Function to create a sparkle texture
  function createSparkleTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 256; // Increased from 128 to 256 for more detail
    canvas.height = 256;
    const context = canvas.getContext("2d");

    // Create a radial gradient for the base glow
    const gradient = context.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2
    );

    // Create a multi-layered glow effect with a bright core and soft outer halo
    gradient.addColorStop(0, "rgba(255, 255, 255, 1.0)"); // Bright center
    gradient.addColorStop(0.05, "rgba(255, 255, 255, 1.0)"); // Maintain brightness for core
    gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.9)"); // Start of first halo
    gradient.addColorStop(0.4, "rgba(255, 255, 255, 0.5)"); // Middle of first halo
    gradient.addColorStop(0.6, "rgba(255, 255, 255, 0.3)"); // Outer edge of first halo
    gradient.addColorStop(0.8, "rgba(255, 255, 255, 0.1)"); // Start of outer halo
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)"); // Fade to transparent

    // Fill with gradient
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Add star-like cross shape for the core
    context.beginPath();
    context.moveTo(canvas.width / 2, canvas.width * 0.3); // Shorter lines (70% of previous length)
    context.lineTo(canvas.width / 2, canvas.width * 0.7);
    context.moveTo(canvas.width * 0.3, canvas.height / 2);
    context.lineTo(canvas.width * 0.7, canvas.height / 2);

    // Add diagonal lines for more star-like appearance
    context.moveTo(canvas.width * 0.35, canvas.height * 0.35); // Shorter diagonals
    context.lineTo(canvas.width * 0.65, canvas.height * 0.65);
    context.moveTo(canvas.width * 0.65, canvas.height * 0.35);
    context.lineTo(canvas.width * 0.35, canvas.height * 0.65);

    // Set line style - make lines brighter and thicker
    context.strokeStyle = "rgba(255, 255, 255, 1.0)";
    context.lineWidth = 4;
    context.stroke();

    // Add a second, larger glow layer
    const outerGlow = context.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      canvas.width * 0.2, // Start outside the core
      canvas.width / 2,
      canvas.height / 2,
      canvas.width * 0.7 // Extend further than the main gradient
    );

    outerGlow.addColorStop(0, "rgba(255, 255, 255, 0.3)"); // Subtle start
    outerGlow.addColorStop(0.5, "rgba(255, 255, 255, 0.1)"); // Very faint middle
    outerGlow.addColorStop(1, "rgba(255, 255, 255, 0)"); // Fade to transparent

    // Apply the outer glow with additive blending
    context.globalCompositeOperation = "lighter";
    context.fillStyle = outerGlow;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Create texture from canvas
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  // Convert to ShaderMaterial to support custom size attribute
  const customParticleMaterial = new THREE.ShaderMaterial({
    uniforms: {
      baseSize: { value: 6.0 },
      opacity: { value: 0 }, // Start with 0 opacity
      map: { value: sparkleTexture },
      brightness: { value: 1.4 },
      haloStrength: { value: 1.4 }, // Control halo intensity
      haloSize: { value: 1.3 }, // Control halo size relative to particle
    },
    vertexShader: `
      attribute vec3 color;
      attribute float size;
      uniform float baseSize;
      uniform float haloSize;
      
      varying vec3 vColor;
      varying float vSize;
      
      void main() {
        vColor = color;
        vSize = size;
        
        // Calculate position in clip space
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        
        // Apply individual size attribute without attenuation
        // Multiply by haloSize to make room for the glow effect
        gl_PointSize = size * baseSize * haloSize;
      }
    `,
    fragmentShader: `
      uniform sampler2D map;
      uniform float opacity;
      uniform float brightness;
      uniform float haloStrength;
      
      varying vec3 vColor;
      varying float vSize;
      
      void main() {
        // Calculate distance from center of point (in 0-1 range)
        vec2 centeredUV = gl_PointCoord - 0.5;
        float dist = length(centeredUV) * 2.0; // 0 at center, 1 at edge
        
        // Sample the texture
        vec4 texColor = texture2D(map, gl_PointCoord);
        
        // Apply color, opacity and brightness
        vec3 brightColor = vColor * brightness;
        
        // Create a halo effect by boosting brightness near the center
        // and adding a subtle color shift toward white for the halo
        float haloFactor = max(0.0, 1.0 - dist);
        haloFactor = pow(haloFactor, 1.5); // Adjust power for halo shape
        
        // Boost the core brightness
        float coreBrightness = 1.0 + haloFactor * haloStrength;
        
        // Blend toward white for the halo (subtle color shift)
        vec3 haloColor = mix(brightColor, vec3(1.0, 1.0, 1.0), haloFactor * 0.3);
        
        // Apply the halo effect
        vec3 finalColor = haloColor * coreBrightness;
        
        // Apply color and opacity with enhanced brightness and halo
        gl_FragColor = vec4(finalColor, texColor.a * opacity);
        
        // Discard transparent pixels
        if (gl_FragColor.a < 0.05) discard;
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: false,
  });

  const particleSystem = new THREE.Points(particleGeometry, customParticleMaterial);
  // Enable frustum culling for particle system
  particleSystem.frustumCulled = true;
  // Add to particle scene instead of main scene
  particleScene.add(particleSystem);

  // Add particle controls to GUI
  const particleFolder = gui.addFolder("Particle System");

  // Particle count control
  const particleCountObj = { count: particleCount };
  particleFolder
    .add(particleCountObj, "count", 100, 1000, 10)
    .name("Particle Count")
    .onChange((value) => {
      // Update the particle count
      particleCount = Math.floor(value);

      // Create new arrays with the new size
      const newParticles = new Float32Array(particleCount * 3);
      const newVelocities = new Float32Array(particleCount * 3);
      const newColors = new Float32Array(particleCount * 3);

      // Initialize all particles
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Copy existing data if available
        if (i < particles.length / 3) {
          newParticles[i3] = particles[i3];
          newParticles[i3 + 1] = particles[i3 + 1];
          newParticles[i3 + 2] = particles[i3 + 2];

          newVelocities[i3] = particleVelocities[i3];
          newVelocities[i3 + 1] = particleVelocities[i3 + 1];
          newVelocities[i3 + 2] = particleVelocities[i3 + 2];

          newColors[i3] = particleColors[i3];
          newColors[i3 + 1] = particleColors[i3 + 1];
          newColors[i3 + 2] = particleColors[i3 + 2];
        } else {
          // Create new particles with extended vertical and horizontal ranges
          newParticles[i3] = (Math.random() - 0.5) * horizontalDistribution;
          newParticles[i3 + 1] = (Math.random() - 0.5) * verticalDistribution + scrollObj.verticalOffset;
          newParticles[i3 + 2] = Math.random() * 500 - 250; // Random z position

          newVelocities[i3] = (Math.random() - 0.5) * 0.5;
          newVelocities[i3 + 1] = (Math.random() - 0.5) * 0.5;
          newVelocities[i3 + 2] = (Math.random() - 0.5) * 0.2;

          // Use the current color from the color picker
          const color = new THREE.Color(particleColorObj.color);
          newColors[i3] = color.r;
          newColors[i3 + 1] = color.g;
          newColors[i3 + 2] = color.b;
        }
      }

      // Replace the old arrays with the new ones
      particles = newParticles;
      particleVelocities = newVelocities;
      particleColors = newColors;

      // Dispose old attributes first to free memory
      if (particleGeometry.attributes.position) {
        particleGeometry.attributes.position.array = null;
      }
      if (particleGeometry.attributes.color) {
        particleGeometry.attributes.color.array = null;
      }

      // Update the geometry attributes
      particleGeometry.setAttribute("position", new THREE.BufferAttribute(particles, 3));
      particleGeometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

      // Force update the geometry
      particleGeometry.attributes.position.needsUpdate = true;
      particleGeometry.attributes.color.needsUpdate = true;

      // Redistribute particle sizes
      redistributeParticles();
    });

  // Particle color control
  const particleColorObj = {
    color: "#25e5ff", // Default to bright cyan
  };
  particleFolder
    .addColor(particleColorObj, "color")
    .name("Particle Color")
    .onChange((value) => {
      const color = new THREE.Color(value);
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        particleColors[i3] = color.r;
        particleColors[i3 + 1] = color.g;
        particleColors[i3 + 2] = color.b;
      }
      // Reuse existing attribute instead of creating new one
      if (particleGeometry.attributes.color) {
        particleGeometry.attributes.color.array.set(particleColors);
        particleGeometry.attributes.color.needsUpdate = true;
      } else {
        particleGeometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));
      }
    });

  // Add particle size and glow controls
  particleFolder
    .add(customParticleMaterial.uniforms.baseSize, "value", 2, 15, 0.5)
    .name("Base Particle Size")
    .onChange((value) => {
      // Update all individual particle sizes when base size changes
      redistributeParticles();
    });
  particleFolder.add(customParticleMaterial.uniforms.opacity, "value", 0, 1, 0.1).name("Opacity");

  // Add brightness control
  particleFolder
    .add(customParticleMaterial.uniforms.brightness, "value", 1.0, 3.0, 0.1)
    .name("Brightness")
    .onChange((value) => {
      // No need to redistribute particles, just update the uniform
      customParticleMaterial.uniforms.brightness.value = value;
    });

  // Add sparkle intensity control
  const sparkleObj = { intensity: 1.5 };
  particleFolder
    .add(sparkleObj, "intensity", 0.1, 3.0, 0.1)
    .name("Sparkle Intensity")
    .onChange((value) => {
      customParticleMaterial.uniforms.opacity.value = value; // Direct mapping to opacity
    });

  // Size Attenuation control with proper explanation
  const sizeAttenuationObj = {
    enabled: false, // Start with size attenuation disabled
  };

  // Add a more descriptive tooltip to explain what Size Attenuation does
  const sizeAttenuationController = particleFolder
    .add(sizeAttenuationObj, "enabled")
    .name("Size Attenuation")
    .onChange((value) => {
      // Update the shader to include size attenuation if enabled
      if (value) {
        customParticleMaterial.vertexShader = `
          attribute vec3 color;
          attribute float size;
          uniform float baseSize;
          
          varying vec3 vColor;
          
          void main() {
            vColor = color;
            
            // Calculate position in clip space
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            
            // Apply size attenuation based on distance
            float distance = length(mvPosition.xyz);
            gl_PointSize = size * baseSize * (300.0 / distance);
          }
        `;
      } else {
        customParticleMaterial.vertexShader = `
          attribute vec3 color;
          attribute float size;
          uniform float baseSize;
          
          varying vec3 vColor;
          
          void main() {
            vColor = color;
            
            // Calculate position in clip space
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            
            // Apply individual size attribute without attenuation
            gl_PointSize = size * baseSize;
          }
        `;
      }

      // Need to set this flag to tell THREE.js to recompile the shader
      customParticleMaterial.needsUpdate = true;

      // Redistribute particles with appropriate depth when toggling size attenuation
      redistributeParticles();
    });

  // Add a tooltip element to the controller
  const tooltip = document.createElement("div");
  tooltip.className = "gui-tooltip";
  tooltip.textContent = "When enabled, particles appear smaller as they move further away";
  tooltip.style.position = "absolute";
  tooltip.style.backgroundColor = "rgba(0,0,0,0.8)";
  tooltip.style.color = "#fff";
  tooltip.style.padding = "5px";
  tooltip.style.borderRadius = "3px";
  tooltip.style.fontSize = "11px";
  tooltip.style.zIndex = "10000";
  tooltip.style.display = "none";
  document.body.appendChild(tooltip);

  // Show tooltip on hover
  const controllerElement = sizeAttenuationController.domElement;
  controllerElement.addEventListener("mouseenter", (e) => {
    const rect = controllerElement.getBoundingClientRect();
    tooltip.style.left = rect.right + "px";
    tooltip.style.top = rect.top + "px";
    tooltip.style.display = "block";
  });

  controllerElement.addEventListener("mouseleave", () => {
    tooltip.style.display = "none";
  });

  // Add twinkle effect to particles
  let twinkleTime = 0;

  // Add scroll event listener
  window.addEventListener("scroll", () => {
    scrollY = window.scrollY;
  });

  // ===== MOUSE FOLLOW PARTICLES SYSTEM =====

  // Mouse follow particle system setup
  const maxMouseParticles = 30; // Maximum number of trailing particles
  let mouseParticles = [];
  let mousePosition = { x: 0, y: 0 };
  let lastMousePosition = { x: 0, y: 0 };
  let mouseParticleId = 0;

  // Track cumulative mouse movement for initial activation threshold
  let cumulativeMovement = 0;
  let isMouseParticleSystemActive = false;
  let initialMovementThreshold = 250; // Pixels of cumulative movement needed to start particles

  // Track recent mouse movement for dynamic spawn offset
  let recentMovements = [];
  let maxRecentMovements = 10; // Number of recent movements to track
  let currentSpawnOffset; // Will be initialized after mouseParticleParams is defined

  // Drawing mode tracking
  let isDrawing = false;
  let drawnParticles = []; // Separate array for drawn particles

  // Detect mobile devices for performance optimization
  const isMobileDevice =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth <= 768 ||
    (window.matchMedia && window.matchMedia("(hover: none)").matches) ||
    "ontouchstart" in window;

  // Force disable on known touch devices to prevent interference
  const shouldDisableOnMobile = isMobileDevice;

  // Mouse follow particle parameters
  const mouseParticleParams = {
    enabled: false, // Start disabled, will be enabled when enter-experience button is clicked
    mobileDisabled: shouldDisableOnMobile || !perfSettings.mouseParticles, // Disable based on device type OR performance settings
    spawnRate: performanceTier === 'high' ? 0.52 : (performanceTier === 'medium' ? 0.35 : 0.0),
    maxParticles: performanceTier === 'high' ? 150 : (performanceTier === 'medium' ? 75 : 0), // Reduce for lower tiers
    baseSize: 1.9, // Base particle size
    fadeInSpeed: 0.62, // Maximum opacity/brightness (0-1) - controls peak intensity
    fadeOutSpeed: 0.88, // Fade out intensity multiplier (0-1) - controls fade strength
    trailLength: 0.0005, // How much particles lag behind mouse (0-1)
    speedVariation: 0.2, // Random variation in trail following speed (0-1)
    jitterAmount: 0.08, // Random jittery movement intensity (0-1)
    spawnOffsetMin: 0.08, // Minimum random spawn position offset for organic spread (0-1)
    spawnOffsetMax: 0.8, // Maximum random spawn position offset for organic spread (0-1)
    minLifetime: 1.5, // Minimum particle lifetime in seconds
    maxLifetime: 3.5, // Maximum particle lifetime in seconds
    drawnLife: 12.0, // Lifetime for drawn particles in seconds (easter egg)
  };

  // Initialize currentSpawnOffset now that mouseParticleParams is defined
  currentSpawnOffset = mouseParticleParams.spawnOffsetMin;

  // Global function to enable mouse particles (called from enter-experience button)
  window.enableMouseParticles = function () {
    // Only enable if not on mobile device
    if (!mouseParticleParams.mobileDisabled) {
      mouseParticleParams.enabled = true;
    }
  };

  // Create mouse particle geometry and material (clone of main particles)
  const mouseParticleGeometry = new THREE.BufferGeometry();
  memoryManager.track(mouseParticleGeometry, 'geometry'); // Track for cleanup

  // Create material for mouse particles (clone and modify existing material)
  const mouseParticleMaterial = new THREE.ShaderMaterial({
    uniforms: {
      baseSize: { value: mouseParticleParams.baseSize },
      map: { value: sparkleTexture }, // Reuse the same texture
      brightness: { value: 1.4 },
      haloStrength: { value: 1.4 },
      haloSize: { value: 1.3 },
    },
    vertexShader: `
      attribute vec3 color;
      attribute float size;
      attribute float opacity;
      uniform float baseSize;
      uniform float haloSize;
      
      varying vec3 vColor;
      varying float vOpacity;
      varying float vSize;
      
      void main() {
        vColor = color;
        vOpacity = opacity;
        vSize = size;
        
        // Convert mouse coordinates to world coordinates
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        
        // Apply size with opacity influence for fading effect
        gl_PointSize = size * baseSize * haloSize;
      }
    `,
    fragmentShader: `
      uniform sampler2D map;
      uniform float brightness;
      uniform float haloStrength;
      
      varying vec3 vColor;
      varying float vOpacity;
      
      void main() {
        // Calculate distance from center of point (in 0-1 range)
        vec2 centeredUV = gl_PointCoord - 0.5;
        float dist = length(centeredUV) * 2.0;
        
        // Sample the texture
        vec4 texColor = texture2D(map, gl_PointCoord);
        
        // Apply color and brightness
        vec3 brightColor = vColor * brightness;
        
        // Create halo effect
        float haloFactor = max(0.0, 1.0 - dist);
        haloFactor = pow(haloFactor, 1.5);
        
        // Boost core brightness
        float coreBrightness = 1.0 + haloFactor * haloStrength;
        
        // Blend toward white for halo
        vec3 haloColor = mix(brightColor, vec3(1.0, 1.0, 1.0), haloFactor * 0.3);
        
        // Apply the halo effect
        vec3 finalColor = haloColor * coreBrightness;
        
        // Apply opacity and texture alpha
        float finalOpacity = texColor.a * vOpacity;
        gl_FragColor = vec4(finalColor, finalOpacity);
        
        // Discard transparent pixels
        if (gl_FragColor.a < 0.01) discard;
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: false,
  });

  // Mouse particle system
  const mouseParticleSystem = new THREE.Points(mouseParticleGeometry, mouseParticleMaterial);
  particleScene.add(mouseParticleSystem); // Add to same particle scene

  // Function to convert mouse coordinates to world coordinates
  function mouseToWorldCoords(mouseX, mouseY) {
    // Convert from screen coordinates to normalized device coordinates
    const x = (mouseX / window.innerWidth) * 2 - 1;
    const y = -(mouseY / window.innerHeight) * 2 + 1;

    // Convert to world coordinates using camera projection
    const worldX = (x * (camera.right - camera.left)) / 2 / camera.zoom;
    const worldY = (y * (camera.top - camera.bottom)) / 2 / camera.zoom;

    return { x: worldX, y: worldY };
  }

  // Function to create a new mouse particle
  function createMouseParticle(worldX, worldY) {
    const particle = {
      id: mouseParticleId++,
      position: { x: worldX, y: worldY, z: Math.random() * 100 - 50 },
      targetPosition: { x: worldX, y: worldY },
      velocity: { x: 0, y: 0 },
      size: 0.8 + Math.random() * 0.4, // Slight size variation
      opacity: 0.0, // Start with 0 opacity for proper fade in
      targetOpacity: 1,
      life: 0,
      maxLife:
        mouseParticleParams.minLifetime +
        Math.random() * (mouseParticleParams.maxLifetime - mouseParticleParams.minLifetime),
      color: { r: 0.145, g: 0.898, b: 1.0 }, // #25e5ff converted to 0-1 range
      trailSpeed: 0.05 + Math.random() * 0.03, // Varying trail speeds for natural effect
      fadePhase: "in", // 'in', 'hold', 'out'
    };

    return particle;
  }

  // Function to create a new drawn particle (for drawing mode)
  function createDrawnParticle(worldX, worldY) {
    const particle = {
      id: mouseParticleId++,
      position: { x: worldX, y: worldY, z: Math.random() * 100 - 50 },
      originalPosition: { x: worldX, y: worldY }, // Store original position for twinkling
      targetPosition: { x: worldX, y: worldY }, // Drawn particles stay in place
      velocity: { x: 0, y: 0 },
      size: 0.8 + Math.random() * 0.4,
      opacity: 0.0,
      baseOpacity: 0.0, // Base opacity before twinkling
      targetOpacity: 1,
      life: 0,
      maxLife: mouseParticleParams.drawnLife, // Use drawnLife parameter
      color: { r: 1.0, g: 0.647, b: 0.0 }, // Orange color for drawn particles (#ff8500)
      trailSpeed: 0, // No trailing for drawn particles - they stay put
      fadePhase: "in",
      isDrawn: true, // Flag to identify drawn particles
      // Twinkling properties
      twinklePhase: Math.random() * Math.PI * 2, // Random starting phase for oscillation
      twinkleSpeed: 0.8 + Math.random() * 0.4, // Random twinkling speed (0.8-1.2)
      twinkleRadius: 2 + Math.random() * 3, // Random movement radius (2-5 pixels)
    };

    return particle;
  }

  // Track previous particle count to detect size changes
  let previousMouseParticleCount = 0;
  
  // Function to update mouse particle geometry
  function updateMouseParticleGeometry() {
    // Combine both regular and drawn particles
    const allParticles = [...mouseParticles, ...drawnParticles];
    const currentCount = allParticles.length;

    // If no particles and geometry already cleared, skip
    if (currentCount === 0) {
      if (previousMouseParticleCount === 0) {
        return; // Already cleared, nothing to do
      }
      // Delete all attributes when clearing to 0 particles
      mouseParticleGeometry.deleteAttribute('position');
      mouseParticleGeometry.deleteAttribute('color');
      mouseParticleGeometry.deleteAttribute('size');
      mouseParticleGeometry.deleteAttribute('opacity');
      previousMouseParticleCount = 0;
      return;
    }

    const positions = new Float32Array(currentCount * 3);
    const colors = new Float32Array(currentCount * 3);
    const sizes = new Float32Array(currentCount);
    const opacities = new Float32Array(currentCount);

    for (let i = 0; i < currentCount; i++) {
      const particle = allParticles[i];
      const i3 = i * 3;

      // Position
      positions[i3] = particle.position.x;
      positions[i3 + 1] = particle.position.y;
      positions[i3 + 2] = particle.position.z;

      // Color
      colors[i3] = particle.color.r;
      colors[i3 + 1] = particle.color.g;
      colors[i3 + 2] = particle.color.b;

      // Size and opacity
      sizes[i] = particle.size;
      opacities[i] = particle.opacity;
    }

    // Check if particle count changed (size changed)
    const sizeChanged = currentCount !== previousMouseParticleCount;

    if (sizeChanged) {
      // Particle count changed - MUST delete and recreate attributes
      // Three.js does NOT support resizing buffer attributes
      if (mouseParticleGeometry.attributes.position) {
        mouseParticleGeometry.deleteAttribute('position');
        mouseParticleGeometry.deleteAttribute('color');
        mouseParticleGeometry.deleteAttribute('size');
        mouseParticleGeometry.deleteAttribute('opacity');
      }
      
      // Create new attributes with correct size
      mouseParticleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      mouseParticleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      mouseParticleGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
      mouseParticleGeometry.setAttribute("opacity", new THREE.BufferAttribute(opacities, 1));
      
      previousMouseParticleCount = currentCount;
    } else {
      // Same particle count - safe to reuse and update in place (no memory leak)
      mouseParticleGeometry.attributes.position.array.set(positions);
      mouseParticleGeometry.attributes.color.array.set(colors);
      mouseParticleGeometry.attributes.size.array.set(sizes);
      mouseParticleGeometry.attributes.opacity.array.set(opacities);
      
      // Mark attributes as needing update
      mouseParticleGeometry.attributes.position.needsUpdate = true;
      mouseParticleGeometry.attributes.color.needsUpdate = true;
      mouseParticleGeometry.attributes.size.needsUpdate = true;
      mouseParticleGeometry.attributes.opacity.needsUpdate = true;
    }
  }

  // Mouse move event listener
  window.addEventListener("mousemove", (event) => {
    if (!mouseParticleParams.enabled || mouseParticleParams.mobileDisabled) {
      return;
    }

    lastMousePosition.x = mousePosition.x;
    lastMousePosition.y = mousePosition.y;
    mousePosition.x = event.clientX;
    mousePosition.y = event.clientY;

    // Calculate mouse movement distance
    const deltaX = mousePosition.x - lastMousePosition.x;
    const deltaY = mousePosition.y - lastMousePosition.y;
    const movement = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Track cumulative movement to activate particle system
    if (!isMouseParticleSystemActive) {
      cumulativeMovement += movement;
      if (cumulativeMovement >= initialMovementThreshold) {
        isMouseParticleSystemActive = true;
      }
    }

    // Track recent movements for dynamic spawn offset calculation
    recentMovements.push(movement);
    if (recentMovements.length > maxRecentMovements) {
      recentMovements.shift(); // Remove oldest movement
    }

    // Calculate average movement intensity over recent frames
    if (recentMovements.length > 0) {
      const avgMovement = recentMovements.reduce((sum, mov) => sum + mov, 0) / recentMovements.length;
      const maxMovement = 20; // Maximum expected movement per frame for normalization
      const movementIntensity = Math.min(avgMovement / maxMovement, 1.0); // Normalize to 0-1

      // Interpolate between min and max spawn offset based on movement intensity
      currentSpawnOffset =
        mouseParticleParams.spawnOffsetMin +
        (mouseParticleParams.spawnOffsetMax - mouseParticleParams.spawnOffsetMin) * movementIntensity;
    }

    // Only spawn particles if mouse particle system is active, mouse is moving, and we haven't hit the limit
    if (isMouseParticleSystemActive && movement > 1 && mouseParticles.length < mouseParticleParams.maxParticles) {
      // Random chance to spawn particle based on spawn rate
      if (Math.random() < mouseParticleParams.spawnRate) {
        const worldCoords = mouseToWorldCoords(mousePosition.x, mousePosition.y);

        // Apply dynamic spawn offset for organic positioning
        const offsetRadius = currentSpawnOffset * 50; // Scale to world units
        const offsetAngle = Math.random() * Math.PI * 2; // Random angle
        const offsetX = Math.cos(offsetAngle) * offsetRadius * Math.random(); // Random distance within radius
        const offsetY = Math.sin(offsetAngle) * offsetRadius * Math.random();

        const newParticle = createMouseParticle(worldCoords.x + offsetX, worldCoords.y + offsetY);
        mouseParticles.push(newParticle);
      }
    }

    // Drawing mode: Create particles when left mouse button is held down
    if (isDrawing && mouseParticles.length < mouseParticleParams.maxParticles) {
      // More frequent spawning when drawing
      if (Math.random() < 0.8) {
        // Higher spawn rate for drawing
        const worldCoords = mouseToWorldCoords(mousePosition.x, mousePosition.y);

        // Less offset for drawing mode to create more precise lines
        const offsetRadius = 10; // Fixed small offset for drawing
        const offsetAngle = Math.random() * Math.PI * 2;
        const offsetX = Math.cos(offsetAngle) * offsetRadius * Math.random();
        const offsetY = Math.sin(offsetAngle) * offsetRadius * Math.random();

        const drawnParticle = createDrawnParticle(worldCoords.x + offsetX, worldCoords.y + offsetY);
        drawnParticles.push(drawnParticle);
      }
    }
  });

  // Mouse down event listener to start drawing
  window.addEventListener("mousedown", (event) => {
    if (!mouseParticleParams.enabled || mouseParticleParams.mobileDisabled) return;
    if (event.button === 0) {
      // Left mouse button
      isDrawing = true;
    }
  });

  // Mouse up event listener to stop drawing
  window.addEventListener("mouseup", (event) => {
    if (event.button === 0) {
      // Left mouse button
      isDrawing = false;
    }
  });

  // Touch event listeners for mobile support
  let lastTouchPosition = { x: 0, y: 0 };
  let touchPosition = { x: 0, y: 0 };
  let isTouching = false;

  // Touch start event listener
  window.addEventListener(
    "touchstart",
    (event) => {
      if (!mouseParticleParams.enabled || mouseParticleParams.mobileDisabled) return;

      // Only prevent default if the touch is on the canvas background, not on UI elements
      const target = event.target;
      const isUIElement =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("header") ||
        target.closest("nav");

      if (!isUIElement) {
        // Prevent default to avoid scrolling issues only when not touching UI elements
        event.preventDefault();
      }

      // Get the first touch point
      const touch = event.touches[0];
      touchPosition.x = touch.clientX;
      touchPosition.y = touch.clientY;
      lastTouchPosition.x = touchPosition.x;
      lastTouchPosition.y = touchPosition.y;

      isTouching = true;
      isDrawing = true; // Enable drawing mode for touch
    },
    { passive: false }
  );

  // Touch move event listener
  window.addEventListener(
    "touchmove",
    (event) => {
      if (!mouseParticleParams.enabled || mouseParticleParams.mobileDisabled || !isTouching) return;

      // Only prevent default if the touch is on the canvas background, not on UI elements
      const target = event.target;
      const isUIElement =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("header") ||
        target.closest("nav");

      if (!isUIElement) {
        // Prevent default to avoid scrolling issues only when not touching UI elements
        event.preventDefault();
      }

      // Get the first touch point
      const touch = event.touches[0];
      lastTouchPosition.x = touchPosition.x;
      lastTouchPosition.y = touchPosition.y;
      touchPosition.x = touch.clientX;
      touchPosition.y = touch.clientY;

      // Update mouse position for particle system consistency
      mousePosition.x = touchPosition.x;
      mousePosition.y = touchPosition.y;

      // Calculate touch movement distance
      const deltaX = touchPosition.x - lastTouchPosition.x;
      const deltaY = touchPosition.y - lastTouchPosition.y;
      const movement = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Track cumulative movement to activate particle system
      if (!isMouseParticleSystemActive) {
        cumulativeMovement += movement;
        if (cumulativeMovement >= initialMovementThreshold) {
          isMouseParticleSystemActive = true;
        }
      }

      // Track recent movements for dynamic spawn offset calculation
      recentMovements.push(movement);
      if (recentMovements.length > maxRecentMovements) {
        recentMovements.shift(); // Remove oldest movement
      }

      // Calculate average movement intensity over recent frames
      if (recentMovements.length > 0) {
        const avgMovement = recentMovements.reduce((sum, mov) => sum + mov, 0) / recentMovements.length;
        const maxMovement = 20; // Maximum expected movement per frame for normalization
        const movementIntensity = Math.min(avgMovement / maxMovement, 1.0); // Normalize to 0-1

        // Interpolate between min and max spawn offset based on movement intensity
        currentSpawnOffset =
          mouseParticleParams.spawnOffsetMin +
          (mouseParticleParams.spawnOffsetMax - mouseParticleParams.spawnOffsetMin) * movementIntensity;
      }

      // Only spawn particles if system is active, touch is moving, and we haven't hit the limit
      if (isMouseParticleSystemActive && movement > 1 && mouseParticles.length < mouseParticleParams.maxParticles) {
        // Random chance to spawn particle based on spawn rate
        if (Math.random() < mouseParticleParams.spawnRate) {
          const worldCoords = mouseToWorldCoords(touchPosition.x, touchPosition.y);

          // Apply dynamic spawn offset for organic positioning
          const offsetRadius = currentSpawnOffset * 50; // Scale to world units
          const offsetAngle = Math.random() * Math.PI * 2; // Random angle
          const offsetX = Math.cos(offsetAngle) * offsetRadius * Math.random(); // Random distance within radius
          const offsetY = Math.sin(offsetAngle) * offsetRadius * Math.random();

          const newParticle = createMouseParticle(worldCoords.x + offsetX, worldCoords.y + offsetY);
          mouseParticles.push(newParticle);
        }
      }

      // Touch drawing mode: Create particles when touching and moving
      if (isDrawing && mouseParticles.length < mouseParticleParams.maxParticles) {
        // More frequent spawning when drawing with touch
        if (Math.random() < 0.8) {
          // Higher spawn rate for drawing
          const worldCoords = mouseToWorldCoords(touchPosition.x, touchPosition.y);

          // Less offset for drawing mode to create more precise lines
          const offsetRadius = 10; // Fixed small offset for drawing
          const offsetAngle = Math.random() * Math.PI * 2;
          const offsetX = Math.cos(offsetAngle) * offsetRadius * Math.random();
          const offsetY = Math.sin(offsetAngle) * offsetRadius * Math.random();

          const drawnParticle = createDrawnParticle(worldCoords.x + offsetX, worldCoords.y + offsetY);
          drawnParticles.push(drawnParticle);
        }
      }
    },
    { passive: false }
  );

  // Touch end event listener
  window.addEventListener("touchend", (event) => {
    isTouching = false;
    isDrawing = false;
  });

  // Touch cancel event listener (for when touch is interrupted)
  window.addEventListener("touchcancel", (event) => {
    isTouching = false;
    isDrawing = false;
  });

  // Function to animate mouse particles
  function animateMouseParticles() {
    if (mouseParticles.length === 0 && drawnParticles.length === 0) return; // Early exit if no particles
    if (mouseParticleParams.mobileDisabled) return; // Skip animation on mobile

    const worldCoords = mouseToWorldCoords(mousePosition.x, mousePosition.y);

    // Update existing regular mouse particles
    for (let i = mouseParticles.length - 1; i >= 0; i--) {
      const particle = mouseParticles[i];
      particle.life += 0.016; // Assume 60fps

      // Update target position to current mouse position (only for regular particles)
      if (!particle.isDrawn) {
        particle.targetPosition.x = worldCoords.x;
        particle.targetPosition.y = worldCoords.y;

        // Apply eased trailing movement
        const trailSpeed = particle.trailSpeed * mouseParticleParams.trailLength;
        particle.position.x += (particle.targetPosition.x - particle.position.x) * trailSpeed;
        particle.position.y += (particle.targetPosition.y - particle.position.y) * trailSpeed;

        // Add slight random jittery movement for organic feel
        particle.position.x += (Math.random() - 0.5) * 2 * mouseParticleParams.jitterAmount;
        particle.position.y += (Math.random() - 0.5) * 2 * mouseParticleParams.jitterAmount;
      }

      // Handle smooth fade phases with proper opacity transitions
      const lifeRatio = particle.life / particle.maxLife;

      if (lifeRatio < 0.15) {
        // Fade in phase (first 15% of life) - smooth transition from 0 to 1
        particle.fadePhase = "in";
        const fadeInProgress = lifeRatio / 0.15; // 0 to 1 over the fade in period
        const fadeInCurve = 1 - Math.pow(1 - fadeInProgress, 2); // Ease-out curve for smoother start
        particle.opacity = fadeInCurve * mouseParticleParams.fadeInSpeed;
      } else if (lifeRatio < 0.65) {
        // Hold phase (middle 50% of life) - maintain full opacity
        particle.fadePhase = "hold";
        particle.opacity = mouseParticleParams.fadeInSpeed; // Use fadeInSpeed as max opacity
      } else {
        // Fade out phase (last 35% of life) - smooth transition from 1 to 0
        particle.fadePhase = "out";
        const fadeOutProgress = (lifeRatio - 0.65) / 0.35; // 0 to 1 over the fade out period
        const fadeOutCurve = Math.pow(1 - fadeOutProgress, 2); // Ease-in curve for smoother end
        particle.opacity = fadeOutCurve * mouseParticleParams.fadeInSpeed * mouseParticleParams.fadeOutSpeed;
      }

      // Remove particle when it's too old or fully faded
      if (particle.life >= particle.maxLife || particle.opacity <= 0) {
        mouseParticles.splice(i, 1);
      }
    }

    // Update existing drawn particles (they twinkle in place)
    for (let i = drawnParticles.length - 1; i >= 0; i--) {
      const particle = drawnParticles[i];
      particle.life += 0.016; // Assume 60fps

      // Update twinkling phase
      particle.twinklePhase += 0.016 * particle.twinkleSpeed;

      // Apply gentle twinkling movement around original position
      const twinkleX = Math.sin(particle.twinklePhase) * particle.twinkleRadius * 0.4;
      const twinkleY = Math.cos(particle.twinklePhase * 1.05) * particle.twinkleRadius * 0.4; // Different frequency for Y

      particle.position.x = particle.originalPosition.x + twinkleX;
      particle.position.y = particle.originalPosition.y + twinkleY;

      // Handle smooth fade phases with proper opacity transitions
      const lifeRatio = particle.life / particle.maxLife;

      if (lifeRatio < 0.15) {
        // Fade in phase (first 15% of life) - smooth transition from 0 to 1
        particle.fadePhase = "in";
        const fadeInProgress = lifeRatio / 0.15;
        const fadeInCurve = 1 - Math.pow(1 - fadeInProgress, 2);
        particle.baseOpacity = fadeInCurve * mouseParticleParams.fadeInSpeed;
      } else if (lifeRatio < 0.85) {
        // Hold phase (longer for drawn particles) - maintain full opacity
        particle.fadePhase = "hold";
        particle.baseOpacity = mouseParticleParams.fadeInSpeed;
      } else {
        // Fade out phase (last 15% of life) - smooth transition from 1 to 0
        particle.fadePhase = "out";
        const fadeOutProgress = (lifeRatio - 0.85) / 0.15;
        const fadeOutCurve = Math.pow(1 - fadeOutProgress, 2);
        particle.baseOpacity = fadeOutCurve * mouseParticleParams.fadeInSpeed * mouseParticleParams.fadeOutSpeed;
      }

      // Apply twinkling opacity oscillation on top of base opacity
      const twinkleOpacity = 0.7 + 0.3 * Math.sin(particle.twinklePhase * 2.0); // Oscillate between 0.7-1.0
      particle.opacity = particle.baseOpacity * twinkleOpacity;

      // Remove particle when it's too old or fully faded
      if (particle.life >= particle.maxLife || particle.opacity <= 0) {
        drawnParticles.splice(i, 1);
      }
    }

    // Update geometry
    updateMouseParticleGeometry();

    // Update dynamic offset display in GUI
    dynamicOffsetControl.currentOffset = currentSpawnOffset;
  }

  // Add GUI controls for mouse particles
  const mouseParticleFolder = gui.addFolder("Mouse Follow Particles");

  // Add mobile status display
  mouseParticleFolder
    .add({ mobileDetected: mouseParticleParams.mobileDisabled }, "mobileDetected")
    .name("Mobile Detected (Disabled)")
    .listen(); // Make it read-only

  mouseParticleFolder
    .add(mouseParticleParams, "enabled")
    .name("Enable Mouse Particles")
    .onChange((value) => {
      if (!value) {
        // Clear all particles when disabled
        mouseParticles = [];
        drawnParticles = [];
        updateMouseParticleGeometry();
        // Reset activation system
        isMouseParticleSystemActive = false;
        cumulativeMovement = 0;
        recentMovements = [];
        currentSpawnOffset = mouseParticleParams.spawnOffsetMin;
        isDrawing = false;
      }
    });

  mouseParticleFolder
    .add(mouseParticleParams, "spawnRate", 0.1, 1.0, 0.1)
    .name("Spawn Rate")
    .onChange((value) => {
      mouseParticleParams.spawnRate = value;
    });

  mouseParticleFolder
    .add(mouseParticleParams, "maxParticles", 10, 50, 1)
    .name("Max Particles")
    .onChange((value) => {
      mouseParticleParams.maxParticles = value;
      // Remove excess particles if we lowered the limit
      while (mouseParticles.length > value) {
        mouseParticles.pop();
      }
      updateMouseParticleGeometry();
    });

  mouseParticleFolder
    .add(mouseParticleParams, "baseSize", 2.0, 10.0, 0.5)
    .name("Particle Size")
    .onChange((value) => {
      mouseParticleMaterial.uniforms.baseSize.value = value;
    });

  mouseParticleFolder
    .add(mouseParticleParams, "trailLength", 0.1, 1.0, 0.1)
    .name("Trail Length")
    .onChange((value) => {
      mouseParticleParams.trailLength = value;
    });

  mouseParticleFolder
    .add(mouseParticleParams, "speedVariation", 0.0, 1.0, 0.1)
    .name("Speed Variation")
    .onChange((value) => {
      mouseParticleParams.speedVariation = value;
    });

  mouseParticleFolder
    .add(mouseParticleParams, "jitterAmount", 0.0, 1.0, 0.05)
    .name("Jitter Amount")
    .onChange((value) => {
      mouseParticleParams.jitterAmount = value;
    });

  mouseParticleFolder
    .add(mouseParticleParams, "spawnOffsetMin", 0.0, 1.0, 0.05)
    .name("Spawn Offset Min")
    .onChange((value) => {
      mouseParticleParams.spawnOffsetMin = value;
    });

  mouseParticleFolder
    .add(mouseParticleParams, "spawnOffsetMax", 0.0, 1.0, 0.05)
    .name("Spawn Offset Max")
    .onChange((value) => {
      mouseParticleParams.spawnOffsetMax = value;
    });

  // Add display for current dynamic spawn offset (read-only)
  const dynamicOffsetControl = {
    currentOffset: currentSpawnOffset,
  };
  mouseParticleFolder.add(dynamicOffsetControl, "currentOffset", 0.0, 1.0).name("Current Offset (Dynamic)").listen(); // Makes it update automatically

  mouseParticleFolder
    .add(mouseParticleParams, "fadeInSpeed", 0.1, 1.0, 0.01)
    .name("Max Opacity")
    .onChange((value) => {
      mouseParticleParams.fadeInSpeed = value;
    });

  mouseParticleFolder
    .add(mouseParticleParams, "fadeOutSpeed", 0.1, 1.0, 0.01)
    .name("Fade Strength")
    .onChange((value) => {
      mouseParticleParams.fadeOutSpeed = value;
    });

  mouseParticleFolder
    .add(mouseParticleParams, "drawnLife", 1.0, 10.0, 0.1)
    .name("Drawn Particle Life")
    .onChange((value) => {
      mouseParticleParams.drawnLife = value;
    });

  // Add control for initial movement threshold
  mouseParticleFolder
    .add({ movementThreshold: initialMovementThreshold }, "movementThreshold", 100, 400, 10)
    .name("Initial Movement Needed")
    .onChange((value) => {
      // Update the threshold variable
      initialMovementThreshold = value;
    });

  // Add button to reset the activation system
  mouseParticleFolder
    .add(
      {
        resetActivation: function () {
          isMouseParticleSystemActive = false;
          cumulativeMovement = 0;
          recentMovements = [];
          currentSpawnOffset = mouseParticleParams.spawnOffsetMin;
          mouseParticles = [];
          drawnParticles = [];
          isDrawing = false;
          updateMouseParticleGeometry();
        },
      },
      "resetActivation"
    )
    .name("Reset Activation");

  // Close the mouse particle folder by default
  mouseParticleFolder.close();

  // Function to update particle positions with the new vertical offset
  function applyVerticalOffset() {
    const positions = particleGeometry.attributes.position.array;
    const oldOffset = scrollObj.previousOffset || 0;
    const offsetDelta = scrollObj.verticalOffset - oldOffset;

    // Store the current offset for future reference
    scrollObj.previousOffset = scrollObj.verticalOffset;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Simply apply the delta offset to all particles
      positions[i3 + 1] += offsetDelta;

      // Check if particles are now outside the distribution range and wrap if needed
      const relativePos = positions[i3 + 1] - scrollObj.verticalOffset;
      const halfDist = verticalDistribution / 2;

      if (relativePos > halfDist) {
        positions[i3 + 1] = -halfDist + scrollObj.verticalOffset;
      } else if (relativePos < -halfDist) {
        positions[i3 + 1] = halfDist + scrollObj.verticalOffset;
      }
    }

    particleGeometry.attributes.position.needsUpdate = true;
  }

  // Create reusable color object to avoid creating new objects in animation loop
  const reusableBaseColor = new THREE.Color();
  
  // Separate animation loop for particles
  function animateParticles() {
    const positions = particleGeometry.attributes.position.array;
    const colors = particleGeometry.attributes.color.array;
    const sizes = particleGeometry.attributes.size ? particleGeometry.attributes.size.array : null;

    // Update twinkle time
    twinkleTime += 0.01;

    // Calculate scroll delta for smooth movement with easing
    const scrollDelta = (scrollY - lastScrollY) * scrollObj.scrollSpeed;

    // Apply easing to the scroll movement with stronger damping
    // This makes particles slow down and stop more quickly
    lastScrollY = scrollY * (1 - scrollObj.damping) + lastScrollY * scrollObj.damping;

    // Only update particle positions if movement is not paused
    if (!window.particlesMovementPaused) {
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Get the size ratio for this particle (if sizes exist)
        const sizeRatio = sizes ? (sizes[i] - scrollObj.sizeMin) / (scrollObj.sizeMax - scrollObj.sizeMin) : 0.5;

        // Adjust float speed based on size - smaller particles move more slowly
        const particleFloatSpeed = scrollObj.floatSpeed * (0.5 + sizeRatio * 0.5);

        // Update positions with float speed applied
        positions[i3] += particleVelocities[i3] * particleFloatSpeed;
        positions[i3 + 1] += particleVelocities[i3 + 1] * particleFloatSpeed;
        positions[i3 + 2] += particleVelocities[i3 + 2] * particleFloatSpeed;

        // Move particles up based on scroll with size-based parallax effect
        // Larger particles (appearing closer) move faster
        positions[i3 + 1] += scrollDelta * (0.5 + sizeRatio * 0.5);

        // Bounce off horizontal boundaries
        if (Math.abs(positions[i3]) > horizontalDistribution / 2) {
          particleVelocities[i3] *= -1;
        }

        // Wrap around vertical boundaries instead of bouncing
        // This creates an infinite scrolling effect
        // Account for vertical offset in the boundary check
        const relativePos = positions[i3 + 1] - scrollObj.verticalOffset;
        const halfDist = verticalDistribution / 2;

        if (relativePos > halfDist) {
          positions[i3 + 1] = -halfDist + scrollObj.verticalOffset;
        } else if (relativePos < -halfDist) {
          positions[i3 + 1] = halfDist + scrollObj.verticalOffset;
        }

        // Bounce off z boundaries
        if (Math.abs(positions[i3 + 2]) > 250) {
          particleVelocities[i3 + 2] *= -1;
        }
      }

      // Only need to update position attribute if we actually changed positions
      particleGeometry.attributes.position.needsUpdate = true;
    }

    // Always update colors for twinkle effect, even when movement is paused
    // This ensures a smooth transition when particles become visible again
    // Reuse the color object instead of creating new ones (critical for memory performance)
    reusableBaseColor.set(particleColorObj.color);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Get the size ratio for this particle (if sizes exist)
      const sizeRatio = sizes ? (sizes[i] - scrollObj.sizeMin) / (scrollObj.sizeMax - scrollObj.sizeMin) : 0.5;

      // Add twinkle effect - subtle brightness variation over time
      const twinkleFactor = 0.2 * Math.sin(twinkleTime + i * 0.1) + 0.9; // Increased from 0.15/0.85 to 0.2/0.9

      // Apply size-based brightness - larger particles are brighter
      const sizeBrightness = 0.8 + sizeRatio * 0.6; // Increased from 0.6/0.4 to 0.8/0.6

      colors[i3] = reusableBaseColor.r * twinkleFactor * sizeBrightness;
      colors[i3 + 1] = reusableBaseColor.g * twinkleFactor * sizeBrightness;
      colors[i3 + 2] = reusableBaseColor.b * twinkleFactor * sizeBrightness;
    }

    particleGeometry.attributes.color.needsUpdate = true;
    requestAnimationFrame(animateParticles);
  }

  // Start particle animation
  animateParticles();

  // Main shader animation loop using adaptive renderer
  function animate(deltaTime) {
    // Check if timeline has paused the background for performance
    if (window.backgroundPaused) {
      // Skip all rendering and updates when timeline is active
      // This pauses:
      // - Film grain animation (uniforms.time.value not updating)
      // - Wave movements
      // - Color cycling
      // - Particle animations
      // - Mouse particle effects
      // - Globe rotation (if applicable)
      return;
    }

    // Update shader uniforms with slower speed
    uniforms.time.value += 0.001; // Reduced from 0.01 to 0.001

    // Check if we've been above Phase 3 trigger too long and stabilize effects to prevent weird behavior
    // This applies when we're above the #events section trigger point (Phase 1 or Phase 2)
    if (isAbovePhase3Trigger()) {
      const timeInPhase1 = Date.now() - phase1StartTime;
      if (timeInPhase1 > PHASE1_RESET_TIMEOUT) {
        // Instead of resetting time, adjust the colorCycleOffset to maintain perfect continuity
        // Calculate the current effective time (time + offset) and preserve it
        const currentEffectiveTime = uniforms.time.value + uniforms.colorCycleOffset.value;
        uniforms.colorCycleOffset.value = currentEffectiveTime;
        uniforms.time.value = 0.0; // Reset time but maintain perfect continuity through offset
        phase1StartTime = Date.now(); // Reset the timer
      }
    }

    // Update mouse particles
    animateMouseParticles();

    // Gradually fade in particles if needed - but only if not fully hidden by scrolling
    if (!window.particlesFullyHidden && customParticleMaterial.uniforms.opacity.value < targetParticleOpacity) {
      customParticleMaterial.uniforms.opacity.value += 0.001; // Slower, more elegant fade in
      if (customParticleMaterial.uniforms.opacity.value > targetParticleOpacity) {
        customParticleMaterial.uniforms.opacity.value = targetParticleOpacity;
      }
    }

    // Ensure particles stay hidden when they should be
    if (window.particlesFullyHidden && customParticleMaterial.uniforms.opacity.value > 0) {
      customParticleMaterial.uniforms.opacity.value = 0;
    }

    // Update globe model rotation if auto-rotate is enabled
    if (globeModel && globeParams.autoRotate && !globeParams.rotationPaused) {
      // Determine which rotation speed to use based on scroll state
      // COMMENTED OUT: Faster rotation during scroll - now uses constant base speed
      // const rotationSpeed = isScrolling
      //   ? globeParams.scrollRotateSpeed // Use faster speed when scrolling
      //   : globeParams.baseRotateSpeed; // Use normal speed when not scrolling

      // Always use base rotation speed (no faster spinning during scroll)
      const rotationSpeed = globeParams.baseRotateSpeed;

      // Apply rotation to the model directly, keeping its position fixed
      globeModel.rotation.y += rotationSpeed * 0.01;
    }

    // Update overlay position to keep it in front of the camera
    if (overlayMesh) {
      // Always ensure overlay remains perfectly flat
      overlayMesh.rotation.set(0, 0, 0);
      updateOverlayPosition();
    }

    // Correct rendering order:
    // 1. First render main background shader
    renderer.autoClear = true; // Clear before first render
    renderer.render(scene, camera); // Render scene with background shader

    // 2. Then render particles on top of background (only if visible)
    if (!window.particlesFullyHidden || (mouseParticles.length > 0 && mouseParticleParams.enabled)) {
      renderer.autoClear = false; // Don't clear after first render
      renderer.render(particleScene, camera); // Render particles including mouse particles
    }

    // Note: The globe is part of the main scene, so it's already rendered appropriately
    // This ensures: Background -> Particles -> Globe+Overlay (correct z-order)
  }

  // Initialize performance monitor (optional, for debugging)
  const perfMonitor = new PerformanceMonitor();
  window.shaderBackgroundPerfMonitor = perfMonitor;
  
  // Enable performance monitoring in debug mode
  const debugPerformance = new URLSearchParams(window.location.search).has('debugPerf');
  if (debugPerformance) {
    perfMonitor.createDebugOverlay();
    console.log('[Background Init] Performance monitoring enabled');
  }
  
  // Set up warning callback for performance issues
  perfMonitor.setWarningCallback((warnings) => {
    console.warn('[Performance Warning]', warnings);
    // Could potentially trigger quality reduction here
  });
  
  // Initialize adaptive renderer with performance-based FPS
  const adaptiveRenderer = new AdaptiveRenderer((deltaTime) => {
    animate(deltaTime);
    // Update performance monitor after each frame
    perfMonitor.update(renderer);
  }, perfSettings.targetFPS);
  adaptiveRenderer.start();
  
  // Store references for external control
  window.shaderBackgroundRenderer = adaptiveRenderer;
  
  // Hook into backgroundPaused to control renderer
  Object.defineProperty(window, 'backgroundPaused', {
    get() { return this._backgroundPaused || false; },
    set(value) {
      this._backgroundPaused = value;
      if (adaptiveRenderer) {
        adaptiveRenderer.setPausedByTimeline(value);
      }
    }
  });

  // Listen for timeline background pause events to disable film grain for performance
  window.addEventListener('timeline:backgroundPaused', (event) => {
    if (uniforms && uniforms.filmGrainEnabled) {
      // Disable film grain when entering timeline (paused=true)
      // Enable when leaving timeline (paused=false)
      uniforms.filmGrainEnabled.value = !event.detail.paused;
    }
  });

  // Listen for very early particle fade start event (before hero animation)
  document.addEventListener("veryEarlyParticleFade", () => {
    // Start with a higher opacity target for more noticeable fade-in
    targetParticleOpacity = 0.3;

    // Also immediately start the fade if material is available
    if (customParticleMaterial && customParticleMaterial.uniforms && customParticleMaterial.uniforms.opacity) {
      // Start from current value and ensure it's not 0
      if (customParticleMaterial.uniforms.opacity.value < 0.1) {
        customParticleMaterial.uniforms.opacity.value = 0.05;
      }
    }
  });

  // Listen for early particle fade start event (after text animation)
  document.addEventListener("particleFadeStart", () => {
    // Increase target opacity to continue fade-in
    targetParticleOpacity = 0.3;
  });

  // Also keep the original event listener for completion
  document.addEventListener("heroAnimationComplete", () => {
    // Ensure particles are fully visible when hero animation completes
    targetParticleOpacity = 0.5;
  });

  // Function to recalculate scene based on window size
  function handleResize() {
    const width = window.innerWidth;
    const height = getTrueViewportHeight();

    // Update canvas and renderer size
    renderer.setSize(width, height);

    // Update camera
    camera.left = -width / 2;
    camera.right = width / 2;
    camera.top = height / 2;
    camera.bottom = -height / 2;
    camera.updateProjectionMatrix();

    // Update resolution uniform
    uniforms.resolution.value.set(width, height);

    // Update the plane geometry to match the new window size
    mesh.geometry.dispose(); // Clean up old geometry
    mesh.geometry = new THREE.PlaneGeometry(width, height, width / 10, height / 10);

    // Update vertical and horizontal distribution based on new window dimensions
    verticalDistribution = height * scrollObj.verticalSpread;
    horizontalDistribution = width * scrollObj.horizontalSpread;

    // Update the vertical offset range in the GUI only if GUI exists
    if (typeof gui !== "undefined" && gui && gui.__folders && gui.__folders["Particle System"]) {
      const particleFolder = gui.__folders["Particle System"];
      if (particleFolder && particleFolder.__controllers) {
        for (let i = 0; i < particleFolder.__controllers.length; i++) {
          if (particleFolder.__controllers[i].property === "verticalOffset") {
            particleFolder.__controllers[i].min(-height * 3);
            particleFolder.__controllers[i].max(height * 2);
            break;
          }
        }
      }
    }

    // Reposition and resize the globe model to maintain 90vw
    if (globeModel && globeParams.responsive) {
      // Add a delay before resizing the globe to ensure resize is fully complete
      clearTimeout(globeResizeTimeout); // Clear any pending globe resize
      globeResizeTimeout = setTimeout(() => {
        // Explicitly call updateGlobeSize to ensure the globe maintains 90vw
        updateGlobeSize();
      }, 150); // 150ms delay

      // Update position controllers with new ranges based on new dimensions
      if (
        typeof gui !== "undefined" &&
        gui &&
        gui.__folders &&
        gui.__folders["Globe Model Controls"] &&
        gui.__folders["Globe Model Controls"].__folders &&
        gui.__folders["Globe Model Controls"].__folders["Position"]
      ) {
        const positionFolder = gui.__folders["Globe Model Controls"].__folders["Position"];
        if (positionFolder && positionFolder.__controllers) {
          for (let i = 0; i < positionFolder.__controllers.length; i++) {
            const controller = positionFolder.__controllers[i];
            if (controller.property === "positionX") {
              controller.min(-width / 2);
              controller.max(width / 2);
            } else if (controller.property === "positionY") {
              controller.min(-height / 2);
              controller.max(height / 2);
            }
          }
        }
      }
    }

    // Update the gradient overlay size
    updateOverlaySize();
  }

  // Function to update overlay size based on current viewport
  function updateOverlaySize() {
    if (overlayMesh) {
      // Get viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Camera world units
      const worldWidth = camera.right - camera.left;
      const worldHeight = camera.top - camera.bottom;

      // Calculate the scale to convert from pixels to world units
      const pixelToWorldX = worldWidth / viewportWidth;
      const pixelToWorldY = worldHeight / viewportHeight;

      // Always use exactly 66% of viewport height for the overlay
      const fixedOverlayWidthWorld = worldWidth;
      const fixedOverlayHeightWorld = viewportHeight * 0.66 * pixelToWorldY;

      // Update geometry with new dimensions - keep it perfectly flat
      overlayMesh.geometry.dispose(); // Clean up old geometry
      overlayMesh.geometry = new THREE.PlaneGeometry(fixedOverlayWidthWorld, fixedOverlayHeightWorld);

      // Keep the overlay perfectly parallel to the view plane
      overlayMesh.rotation.set(0, 0, 0);

      // Update position based on current y-offset
      updateOverlayPosition();
    }
  }

  // Handle window resize with debouncing for better performance
  let resizeTimeout;
  let globeResizeTimeout; // Timeout specifically for globe resizing
  function handleResize() {
    const width = window.innerWidth;
    const height = getTrueViewportHeight();

    // Update canvas and renderer size
    renderer.setSize(width, height);

    // Update camera
    camera.left = -width / 2;
    camera.right = width / 2;
    camera.top = height / 2;
    camera.bottom = -height / 2;
    camera.updateProjectionMatrix();

    // Update resolution uniform
    uniforms.resolution.value.set(width, height);

    // Update the plane geometry to match the new window size
    mesh.geometry.dispose(); // Clean up old geometry
    mesh.geometry = new THREE.PlaneGeometry(width, height, width / 10, height / 10);

    // Update vertical and horizontal distribution based on new window dimensions
    verticalDistribution = height * scrollObj.verticalSpread;
    horizontalDistribution = width * scrollObj.horizontalSpread;

    // Update the vertical offset range in the GUI only if GUI exists
    if (typeof gui !== "undefined" && gui && gui.__folders["Particle System"]) {
      const particleFolder = gui.__folders["Particle System"];
      if (particleFolder && particleFolder.__controllers) {
        for (let i = 0; i < particleFolder.__controllers.length; i++) {
          if (particleFolder.__controllers[i].property === "verticalOffset") {
            particleFolder.__controllers[i].min(-height * 3);
            particleFolder.__controllers[i].max(height * 2);
            break;
          }
        }
      }
    }

    // Reposition and resize the globe model to maintain 90vw
    if (globeModel && globeParams.responsive) {
      // Add a delay before resizing the globe to ensure resize is fully complete
      clearTimeout(globeResizeTimeout); // Clear any pending globe resize
      globeResizeTimeout = setTimeout(() => {
        // Explicitly call updateGlobeSize to ensure the globe maintains 90vw
        updateGlobeSize();
      }, 150); // 150ms delay

      // Update position controllers with new ranges based on new dimensions
      for (let i = 0; i < positionFolder.__controllers.length; i++) {
        const controller = positionFolder.__controllers[i];
        if (controller.property === "positionX") {
          controller.min(-width / 2);
          controller.max(width / 2);
        } else if (controller.property === "positionY") {
          controller.min(-height / 2);
          controller.max(height / 2);
        }
      }
    }

    // Update the gradient overlay size
    updateOverlaySize();
  }

  // Debounced resize handler
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    clearTimeout(globeResizeTimeout); // Clear any pending globe resize

    // Add a delay before resizing the globe to ensure resize is fully complete
    if (globeModel && globeParams.responsive) {
      globeResizeTimeout = setTimeout(() => {
        updateGlobeSize();
      }, 150); // 150ms delay
    }

    // Debounce other resize operations that might be more expensive
    resizeTimeout = setTimeout(handleResize, 150); // Debounce resize events
  });

  // Also listen for orientation change events specifically for mobile
  window.addEventListener("orientationchange", () => {
    clearTimeout(resizeTimeout);
    clearTimeout(globeResizeTimeout); // Clear any pending globe resize

    // Add a delay before resizing the globe on orientation change
    if (globeModel && globeParams.responsive) {
      globeResizeTimeout = setTimeout(() => {
        updateGlobeSize();
      }, 300); // Longer delay for orientation changes
    }

    // Wait a bit longer after orientation change as it takes time for the browser to settle
    resizeTimeout = setTimeout(handleResize, 300);
  });

  // Listen for the visibilitychange event to handle when the page becomes visible again
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      clearTimeout(globeResizeTimeout); // Clear any pending globe resize

      // Store current dimensions to check if there's been a significant change
      const currentWidth = window.innerWidth;
      const currentHeight = getTrueViewportHeight();

      // We store the last known dimensions to compare against
      if (!window.lastKnownDimensions) {
        window.lastKnownDimensions = {
          width: currentWidth,
          height: currentHeight,
        };
      }

      // Calculate the percentage change in dimensions
      const widthChange = Math.abs(currentWidth - window.lastKnownDimensions.width) / window.lastKnownDimensions.width;
      const heightChange =
        Math.abs(currentHeight - window.lastKnownDimensions.height) / window.lastKnownDimensions.height;

      // Only resize if there's a significant change in viewport dimensions (more than 5%)
      const significantChange = widthChange > 0.05 || heightChange > 0.05;

      if (significantChange) {
        // Update the stored dimensions
        window.lastKnownDimensions.width = currentWidth;
        window.lastKnownDimensions.height = currentHeight;

        // Only update globe size if there's a significant change
        if (globeModel && globeParams.responsive) {
          globeResizeTimeout = setTimeout(() => {
            updateGlobeSize();
          }, 150); // 150ms delay
        }

        // Only force a resize if there's a significant change
        setTimeout(handleResize, 100);
      } else {
      }
    } else {
      // When tab becomes hidden, store the current dimensions
      window.lastKnownDimensions = {
        width: window.innerWidth,
        height: getTrueViewportHeight(),
      };
    }
  });

  // Special handler for mobile browsers where the address bar can appear/disappear
  let lastHeight = getTrueViewportHeight();
  function checkForAddressBarChange() {
    const currentHeight = getTrueViewportHeight();

    // If height changed significantly (address bar appeared/disappeared)
    if (Math.abs(currentHeight - lastHeight) > 50) {
      handleResize();
      lastHeight = currentHeight;
    }

    // Continue checking periodically
    requestAnimationFrame(checkForAddressBarChange);
  }

  // Start checking for address bar changes
  checkForAddressBarChange();

  // Add keyboard controls for zoom
  window.addEventListener("keydown", (event) => {
    // Plus key to zoom in
    if (event.key === "+" || event.key === "=") {
      cameraParams.zoom = Math.min(cameraParams.zoom + 0.1, 5);
      camera.zoom = cameraParams.zoom;
      camera.updateProjectionMatrix();
      // Update the GUI display
      if (typeof gui !== "undefined" && gui && gui.__folders["Camera Controls"]) {
        const cameraFolder = gui.__folders["Camera Controls"];
        if (cameraFolder && cameraFolder.__controllers) {
          for (let i = 0; i < cameraFolder.__controllers.length; i++) {
            if (cameraFolder.__controllers[i].property === "zoom") {
              cameraFolder.__controllers[i].updateDisplay();
              break;
            }
          }
        }
      }
    }
    // Minus key to zoom out
    if (event.key === "-" || event.key === "_") {
      cameraParams.zoom = Math.max(cameraParams.zoom - 0.1, 0.1);
      camera.zoom = cameraParams.zoom;
      camera.updateProjectionMatrix();
      // Update the GUI display
      if (typeof gui !== "undefined" && gui && gui.__folders["Camera Controls"]) {
        const cameraFolder = gui.__folders["Camera Controls"];
        if (cameraFolder && cameraFolder.__controllers) {
          for (let i = 0; i < cameraFolder.__controllers.length; i++) {
            if (cameraFolder.__controllers[i].property === "zoom") {
              cameraFolder.__controllers[i].updateDisplay();
              break;
            }
          }
        }
      }
    }
  });

  // Add a scroll speed control to GUI
  particleFolder
    .add(scrollObj, "scrollSpeed", 0.001, 0.05, 0.018)
    .name("Scroll Sensitivity")
    .step(0.001)
    .onChange((value) => {
      // This value will be used in the animation loop
      scrollObj.scrollSpeed = value;
    });

  // Add damping control to GUI
  particleFolder
    .add(scrollObj, "damping", 0.8, 0.99, 0.01)
    .name("Scroll Damping")
    .onChange((value) => {
      scrollObj.damping = value;
    });

  particleFolder
    .add(scrollObj, "verticalSpread", 1.0, 5.0, 0.5)
    .name("Vertical Spread")
    .onChange((value) => {
      // Store the old distribution value
      const oldDistribution = verticalDistribution;

      // Update vertical distribution
      verticalDistribution = window.innerHeight * value;

      // Calculate the scale factor for adjusting positions
      const scaleFactor = verticalDistribution / oldDistribution;

      // Redistribute particles vertically while maintaining relative positions
      const positions = particleGeometry.attributes.position.array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Get the relative position from the center of distribution
        const relativePos = positions[i3 + 1] - scrollObj.verticalOffset;

        // Scale the relative position by the new distribution size
        const newRelativePos = relativePos * scaleFactor;

        // Apply the new position with offset
        positions[i3 + 1] = newRelativePos + scrollObj.verticalOffset;

        // Check if the particle is outside the new bounds and reset if needed
        if (Math.abs(newRelativePos) > verticalDistribution / 2) {
          positions[i3 + 1] = (Math.random() - 0.5) * verticalDistribution + scrollObj.verticalOffset;
        }
      }

      particleGeometry.attributes.position.needsUpdate = true;
    });

  particleFolder
    .add(scrollObj, "horizontalSpread", 0.02, 5.0, 0.01)
    .name("Horizontal Spread")
    .onChange((value) => {
      // Store the old distribution value
      const oldDistribution = horizontalDistribution;

      // Update horizontal distribution
      horizontalDistribution = window.innerWidth * value;

      // Calculate the scale factor for adjusting positions
      const scaleFactor = horizontalDistribution / oldDistribution;

      // Redistribute particles horizontally while maintaining relative positions
      const positions = particleGeometry.attributes.position.array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Get the current horizontal position relative to center
        const relativePos = positions[i3];

        // Scale the relative position by the new distribution size
        const newRelativePos = relativePos * scaleFactor;

        // Apply the new position
        positions[i3] = newRelativePos;

        // Check if the particle is outside the new bounds and reset if needed
        if (Math.abs(newRelativePos) > horizontalDistribution / 2) {
          positions[i3] = (Math.random() - 0.5) * horizontalDistribution;
        }
      }

      particleGeometry.attributes.position.needsUpdate = true;
    });

  // Add vertical offset control with extended range
  particleFolder
    .add(scrollObj, "verticalOffset", -window.innerHeight * 3, window.innerHeight * 2, 10)
    .name("Vertical Position")
    .onChange((value) => {
      // Store the previous value before updating
      if (scrollObj.previousOffset === undefined) {
        scrollObj.previousOffset = 0;
      }

      scrollObj.verticalOffset = value;
      applyVerticalOffset();
    });

  // Add size range controls
  particleFolder
    .add(scrollObj, "sizeMin", 1, 5, 0.01)
    .name("Min Particle Size")
    .onChange((value) => {
      scrollObj.sizeMin = value;
      // Make sure min is always less than max
      if (scrollObj.sizeMin >= scrollObj.sizeMax) {
        scrollObj.sizeMax = scrollObj.sizeMin + 1;
        // Update the max controller display
        if (typeof gui !== "undefined" && gui && gui.__folders["Particle System"]) {
          const particleFolder = gui.__folders["Particle System"];
          if (particleFolder && particleFolder.__controllers) {
            for (let i = 0; i < particleFolder.__controllers.length; i++) {
              if (particleFolder.__controllers[i].property === "sizeMax") {
                particleFolder.__controllers[i].updateDisplay();
                break;
              }
            }
          }
        }
      }
      // Redistribute particles with new size range
      redistributeParticles();
    });

  particleFolder
    .add(scrollObj, "sizeMax", 5, 10, 0.01)
    .name("Max Particle Size")
    .onChange((value) => {
      scrollObj.sizeMax = value;
      // Make sure max is always greater than min
      if (scrollObj.sizeMax <= scrollObj.sizeMin) {
        scrollObj.sizeMin = scrollObj.sizeMax - 1;
        // Update the min controller display
        if (typeof gui !== "undefined" && gui && gui.__folders["Particle System"]) {
          const particleFolder = gui.__folders["Particle System"];
          if (particleFolder && particleFolder.__controllers) {
            for (let i = 0; i < particleFolder.__controllers.length; i++) {
              if (particleFolder.__controllers[i].property === "sizeMin") {
                particleFolder.__controllers[i].updateDisplay();
                break;
              }
            }
          }
        }
      }
      // Redistribute particles with new size range
      redistributeParticles();
    });

  // Add float speed control
  particleFolder
    .add(scrollObj, "floatSpeed", 0.1, 3.0, 0.1)
    .name("Float Speed")
    .onChange((value) => {
      scrollObj.floatSpeed = value;
    });

  // Initialize particle sizes
  redistributeParticles();

  // Force redistribute all particles to respect the 1.0 vertical spread
  const positions = particleGeometry.attributes.position.array;
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    // Reset vertical positions to match the new verticalDistribution
    positions[i3 + 1] = (Math.random() - 0.5) * verticalDistribution + scrollObj.verticalOffset;
  }
  particleGeometry.attributes.position.needsUpdate = true;

  // Add halo controls
  particleFolder
    .add(customParticleMaterial.uniforms.haloStrength, "value", 0.0, 2.0, 0.1)
    .name("Halo Intensity")
    .onChange((value) => {
      customParticleMaterial.uniforms.haloStrength.value = value;
    });

  particleFolder
    .add(customParticleMaterial.uniforms.haloSize, "value", 1.0, 2.0, 0.1)
    .name("Halo Size")
    .onChange((value) => {
      customParticleMaterial.uniforms.haloSize.value = value;
    });

  // Variables to track scrolling
  let isScrolling = false;
  let scrollTimeout;

  // Function to set isScrolling to true when scrolling starts
  window.addEventListener("scroll", () => {
    isScrolling = true;

    // Clear the timeout if it exists
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    // Set a timeout to reset isScrolling when scrolling stops
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 150); // Consider scrolling stopped after 150ms of no scroll events
  });
}

// Add helper function to update lighting GUI
function updateLightingGUI() {
  const gui = window.gui;
  const uniforms = window.uniforms;
  if (typeof gui === "undefined" || !gui || !gui.__folders || !gui.__folders["Lighting Controls"]) return;

  const lightingFolder = gui.__folders["Lighting Controls"];

  // Find the ambient light controller and update it
  for (let i = 0; i < lightingFolder.__controllers.length; i++) {
    const controller = lightingFolder.__controllers[i];

    // Check for ambient light controller
    if (controller.property === "value" && controller.object === uniforms.ambientLight) {
      // Update the displayed value without triggering onChange
      controller.setValue(uniforms.ambientLight.value);
    }

    // Check for directional light controller
    if (controller.property === "value" && controller.object === uniforms.directionalLight) {
      // Update the displayed value without triggering onChange
      controller.setValue(uniforms.directionalLight.value);
    }
  }
}

// Add helper function to update wave GUI
function updateWaveGUI() {
  const gui = window.gui;

  const uniforms = window.uniforms;

  // Check Animation Speed Controls folder for waveSpeed
  if (gui.__folders["Animation Speed Controls"]) {
    const speedFolder = gui.__folders["Animation Speed Controls"];

    let foundWaveSpeed = false;
    for (let i = 0; i < speedFolder.__controllers.length; i++) {
      const controller = speedFolder.__controllers[i];

      // Check for wave speed controller in Speed Controls folder
      if (controller.property === "value" && controller.object === uniforms.waveSpeed) {
        // Update the displayed value without triggering onChange
        controller.setValue(uniforms.waveSpeed.value);
        foundWaveSpeed = true;
        break;
      }
    }
  }

  // Check Wave Controls folder for waveAmplitude and other wave properties
  if (gui.__folders["Wave Controls"]) {
    const waveFolder = gui.__folders["Wave Controls"];

    for (let i = 0; i < waveFolder.__controllers.length; i++) {
      const controller = waveFolder.__controllers[i];

      // Check for wave amplitude controller
      if (controller.property === "value" && controller.object === uniforms.waveAmplitude) {
        // Update the displayed value without triggering onChange
        controller.setValue(uniforms.waveAmplitude.value);
      }

      // Check for wave frequency controller
      if (controller.property === "value" && controller.object === uniforms.waveFrequency) {
        // Update the displayed value without triggering onChange
        controller.setValue(uniforms.waveFrequency.value);
      }
    }
  } else {
  }
}
