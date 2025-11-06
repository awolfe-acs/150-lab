# ACS Timeline Implementation Plan

## Overview
This document outlines the implementation plan for an interactive, horizontally-scrolling timeline experience that showcases the 150-year history of the American Chemical Society.

## Quick Reference
- **Morphing Sphere Visual Reference**: `morphing-sphere-reference.js` (glass/refractive sphere with vertex morphing)
- **Reference Images**: See attached screenshots showing initial state and content display state
- **Key Elements**:
  - `#timeline-window-start` - Inline span in intro text (reference point)
  - `#timeline-window-bg` - Expanding background div (z-index: -1)
  - `#acs-timeline` - Main timeline section with pinned content

## Reference Images Analysis

### Image 1: Initial Timeline State
- Large centered countdown display showing "1876s" (time remaining until ACS founding)
- Subtitle: "When ACS is born"
- Morphing sphere with blue gradient in center
- Horizontal timeline scrubber at bottom with decade markers (1870s, 1900s, 2000s, 2010s, 2020s)
- Waving dot plane as backdrop in lower viewport
- X close button in top-right corner

### Image 2: Content Display State
- Same layout with content panel appearing on right side
- Year heading (1876)
- Descriptive text about the historical event
- Historical photograph
- Timeline remains interactive at bottom

## Technical Requirements

### 1. ScrollTrigger Pinning System
- **Trigger Point**: When `#acs-timeline` top reaches viewport top
- **Pin Duration**: Controlled by horizontal scroll distance (calculated dynamically)
- **Wrapper Required**: Create a wrapper element that governs the full horizontal scroll extent

### 2. Timeline Window Expansion Animation

The timeline window expansion uses two elements:
- **`#timeline-window-start`**: Inline span wrapping the word "timeline" (reference point)
- **`#timeline-window-bg`**: Separate div that expands to fill viewport (sits behind in z-index)

Animation behavior:
- **Initial State**: `#timeline-window-bg` positioned to match dimensions of `#timeline-window-start`
- **Animation**: Expands from inline text dimensions to full viewport coverage
- **Final State**: Blue gradient background filling entire viewport
- **Z-Index**: `#timeline-window-bg` stays behind all content (lower z-index)
- **Timing**: Occurs during the initial phase of the pin, before timeline content fades in
- **Implementation**: Use GSAP to scale and position `#timeline-window-bg`, getting initial dimensions from `#timeline-window-start`

### 3. Horizontal Timeline Scroll
- **Direction**: Content scrolls horizontally (left to right) as user scrolls vertically
- **Sync**: Vertical scroll position directly maps to horizontal timeline position
- **Implementation**: Use `x` transform on timeline container, calculated based on scroll progress
- **No Separate Scrollbar**: Must use main page scrollbar only

### 4. Timeline Visual Elements (Fade-in Sequence)

After the timeline window fills the viewport, fade in elements in this order:

#### A. Timeline Scrubber (Bottom)
- **Position**: Fixed to bottom of viewport
- **Components**:
  - Horizontal progress line
  - Decade markers (1870s, 1900s, 2000s, 2010s, 2020s, etc.)
  - Active indicator dot
  - Progress fill
- **Styling**: Based on reference image - thin line with markers at intervals
- **Interactivity**: 
  - Visual indicator follows scroll position
  - Potentially clickable for navigation (stretch goal)

#### B. Morphing Sphere (Center) - **Three.js**
- **Position**: Center of viewport, floating
- **Implementation**: Three.js sphere geometry with glass/refractive material (see `morphing-sphere-reference.js`)
- **Animation**: Vertex-based morphing using sine wave displacement + slow rotation
- **Styling**: Glass/refractive appearance with blue tinted transmission
- **Material**: `MeshPhysicalMaterial` with transmission, refraction, and clearcoat
- **Technique**: Background rendered to texture for refraction effect
- **Detail**: High-poly sphere (128x128 segments) for smooth morphing
- **Purpose**: Central visual anchor point with sophisticated glass effect
- **Rendering**: Three.js WebGL renderer with render target for refraction

#### C. Waving Dot Plane (Lower Background) - **Three.js**
- **Position**: Lower third of viewport, behind other elements
- **Implementation**: Three.js InstancedMesh for performance (grid of dots)
- **Animation**: Sine wave displacement animation on Y-axis
- **Styling**: Subtle, low-contrast white dots with varying opacity
- **Material**: PointsMaterial or small sphere instances
- **Performance**: Use InstancedMesh to render thousands of dots efficiently
- **Rendering**: Same Three.js scene as sphere

### 5. Timeline Content Panels

Each decade/milestone should have associated content panels that fade in as the user scrolls:

#### Content Structure
```html
<div class="timeline-event" data-year="1876">
  <div class="event-marker"></div>
  <div class="event-panel">
    <div class="event-content">
      <h3 class="event-year">1876</h3>
      <p class="event-description">...</p>
      <div class="event-media">
        <img src="..." alt="...">
      </div>
    </div>
  </div>
</div>
```

#### Content Positioning
- **Left Side**: Large countdown timer showing time to/from that event
- **Right Side**: Event details panel (as shown in reference image 2)
- **Transition**: Content fades in as timeline scrolls to that position
- **Staggering**: Multiple events should have smooth transitions between them

### 6. Close Button
- **Position**: Fixed to top-right corner
- **Style**: X icon (as shown in reference)
- **Function**: Scroll past the timeline section (unpin it)
- **Alternative**: Could trigger smooth scroll to next section

### 7. Background Pause/Resume (Performance Optimization)

To save performance bandwidth for timeline Three.js visuals, pause the global background rendering when fully inside the timeline:

#### Pause Timing
- **When to Pause**: After timeline window fully expands and visual elements fade in (approximately 20% into timeline scroll progress)
- **Reason**: User cannot see the global background anymore, so pausing is invisible

#### Resume Timing
- **When to Resume**: Before exiting timeline in either direction
  - **Scrolling Back Up**: Resume at ~15% scroll progress (before window starts to contract)
  - **Scrolling Down**: Resume at ~95% scroll progress (before unpin begins)
- **Reason**: Background needs to be active again before user can see it

#### Implementation
- Access global background via `window.backgroundPaused` flag (similar to existing `window.particlesMovementPaused`)
- Background's `animate()` function checks this flag and skips rendering when paused
- Timeline ScrollTrigger's `onUpdate` callback manages pause state based on progress thresholds

#### What Gets Paused
From `background.js`:
- Shader background rendering (`renderer.render(scene, camera)`)
- Particle scene rendering (`renderer.render(particleScene, camera)`)
- Globe rotation updates
- Mouse particle animations
- Shader uniform updates (`uniforms.time.value`)

#### Performance Benefit
- Saves ~30-50% GPU/CPU on background rendering
- Frees up resources for timeline sphere morphing and dot plane animations
- Maintains 60fps for timeline interactions

## Implementation Structure

### A. File Organization

Create new timeline module following existing architecture:

```
src/
  js/
    animations/
      timeline.js             (main timeline animation logic)
      timelineScroll.js       (horizontal scroll mechanics)
      timelineElements.js     (scrubber DOM animations)
    threejs/
      timelineScene.js        (Three.js scene setup and management)
      timelineSphere.js       (morphing sphere Three.js object)
      timelineDotPlane.js     (waving dot plane Three.js object)
  scss/
    components/
      _timeline.scss          (timeline styles)
      _timeline-events.scss   (event panel styles)
      _timeline-scrubber.scss (scrubber styles)
```

### B. HTML Structure

```html
<!-- In the #get-involved section, before #acs-timeline -->
<div class="get-involved-message">
  <h4 class="split-lines text-align-center">
    Explore the <span id="timeline-window-start">timeline</span>, celebrate 150 years of innovation...
  </h4>
</div>

<!-- Timeline section -->
<section id="acs-timeline">
  <!-- Pin wrapper for scroll calculations -->
  <div class="timeline-pin-spacer">
    
    <!-- Main timeline container (what gets pinned) -->
    <div class="timeline-container">
      
      <!-- Timeline close button -->
      <button class="timeline-close" aria-label="Close timeline">
        <svg><!-- X icon --></svg>
      </button>
      
      <!-- Three.js container for sphere and dot plane -->
      <div class="timeline-threejs-container">
        <canvas id="timeline-canvas"></canvas>
      </div>
      
      <!-- Horizontal scrolling timeline content -->
      <div class="timeline-track">
        
        <!-- Timeline events (multiple) -->
        <div class="timeline-event" data-year="1876">
          <div class="event-content-wrapper">
            <div class="countdown-display">
              <div class="countdown-value">1876s</div>
              <div class="countdown-label">When ACS is born</div>
            </div>
            <div class="event-panel">
              <h3>1876</h3>
              <p>The first meeting for organization of the American Chemical Society...</p>
              <div class="event-image">
                <img src="..." alt="...">
              </div>
            </div>
          </div>
        </div>
        
        <!-- More timeline events... -->
        <div class="timeline-event" data-year="1900">...</div>
        <div class="timeline-event" data-year="1950">...</div>
        <!-- etc. -->
        
      </div>
      
      <!-- Bottom scrubber -->
      <div class="timeline-scrubber">
        <div class="scrubber-line">
          <div class="scrubber-progress"></div>
        </div>
        <div class="scrubber-markers">
          <div class="marker" data-decade="1870s">
            <div class="marker-dot"></div>
            <div class="marker-label">1870s</div>
          </div>
          <div class="marker" data-decade="1900s">
            <div class="marker-dot"></div>
            <div class="marker-label">1900s</div>
          </div>
          <!-- More markers... -->
        </div>
      </div>
      
    </div>
  </div>
</section>

<!-- Expanding background element (sits behind everything via z-index) -->
<div id="timeline-window-bg"></div>
```

**Key Structure Points:**
1. `#timeline-window-start` is an inline span in the intro text (reference point for initial size)
2. `#acs-timeline` contains all timeline content
3. `#timeline-window-bg` is positioned after the timeline section but appears behind via z-index
4. The background div starts with dimensions matching `#timeline-window-start` and expands to viewport

### C. GSAP ScrollTrigger Implementation

#### Phase 1: Pin Setup & Window Expansion

```javascript
// In timeline.js

export function initTimelineAnimation() {
  const timeline = document.querySelector('#acs-timeline');
  const timelineWindowStart = document.querySelector('#timeline-window-start');
  const timelineWindowBg = document.querySelector('#timeline-window-bg');
  const timelineContainer = timeline.querySelector('.timeline-container');
  const timelineTrack = timeline.querySelector('.timeline-track');
  
  // Get initial dimensions from the inline span reference point
  // This will be recalculated on ScrollTrigger refresh (resize, orientation change)
  const getStartRect = () => timelineWindowStart.getBoundingClientRect();
  const startRect = getStartRect();
  
  // Calculate total horizontal scroll distance
  const events = gsap.utils.toArray('.timeline-event');
  const trackWidth = events.length * window.innerWidth; // Each event takes full viewport width
  
  // Calculate the pin spacer height
  // This controls how much vertical scrolling is needed
  const scrollDistance = trackWidth;
  
  // Master timeline for all timeline animations
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: timeline,
      start: 'top top',
      end: `+=${scrollDistance}`,
      pin: timelineContainer,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        updateTimelineScrubber(self.progress);
        manageBackgroundPause(self.progress);
      }
    }
  });
  
  // Phase 1: Expand timeline window background (first 10% of scroll)
  // Start from dimensions of #timeline-window-start, expand to full viewport
  // Use function for 'from' values so they recalculate on invalidateOnRefresh
  tl.fromTo(timelineWindowBg, 
    // FROM state (function returns values, recalculated on refresh)
    () => {
      const rect = getStartRect();
      return {
        position: 'fixed',
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        backgroundColor: '#1a8fb8',
        zIndex: -1, // Behind everything
        opacity: 0.5
      };
    },
    // TO state
    {
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      opacity: 1,
      duration: 0.1 // 10% of timeline
    }, 
    0
  );
  
  // Phase 2: Fade in visual elements (10-20% of scroll)
  tl.from('.timeline-scrubber', {
    opacity: 0,
    y: 50,
    duration: 0.05
  }, 0.1);
  
  tl.from('.timeline-sphere', {
    opacity: 0,
    scale: 0.5,
    duration: 0.05
  }, 0.12);
  
  tl.from('.timeline-dots-background', {
    opacity: 0,
    duration: 0.05
  }, 0.14);
  
  // Phase 3: Horizontal scrolling (20-100% of scroll)
  tl.to(timelineTrack, {
    x: -trackWidth + window.innerWidth,
    duration: 0.8,
    ease: 'none'
  }, 0.2);
  
  // Phase 4: Fade in/out events based on position
  events.forEach((event, index) => {
    const startProgress = 0.2 + (index / events.length) * 0.7;
    const fadeInDuration = 0.05;
    const fadeOutDuration = 0.05;
    
    tl.fromTo(event, {
      opacity: 0,
      x: 100
    }, {
      opacity: 1,
      x: 0,
      duration: fadeInDuration
    }, startProgress);
    
    // Fade out before next event (optional)
    if (index < events.length - 1) {
      tl.to(event, {
        opacity: 0,
        x: -100,
        duration: fadeOutDuration
      }, startProgress + fadeInDuration + 0.05);
    }
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
  // Pause background when fully in timeline (after window expansion and fade-ins complete)
  const pauseThreshold = 0.20; // Pause at 20% progress
  const resumeThresholdStart = 0.15; // Resume at 15% when scrolling back up
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
```

#### Phase 2: Scrubber Update

```javascript
function updateTimelineScrubber(progress) {
  const scrubberProgress = document.querySelector('.scrubber-progress');
  const markers = gsap.utils.toArray('.marker');
  
  // Update progress line
  gsap.to(scrubberProgress, {
    scaleX: progress,
    transformOrigin: 'left',
    duration: 0.1
  });
  
  // Update active marker
  const activeIndex = Math.floor(progress * markers.length);
  markers.forEach((marker, index) => {
    if (index === activeIndex) {
      marker.classList.add('active');
    } else {
      marker.classList.remove('active');
    }
  });
}
```

### D. Timeline Three.js Scene Setup

#### Scene Initialization (Updated for Glass Sphere)
```javascript
// In timelineScene.js
import * as THREE from 'three';
import { createTimelineSphereSystem, updateMorphingSphere, resizeSphereSystem } from './timelineSphere.js';
import { createTimelineDotPlane } from './timelineDotPlane.js';

export class TimelineScene {
  constructor() {
    this.canvas = document.getElementById('timeline-canvas');
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.sphereSystem = null; // Contains sphere, background, render target
    this.dotPlane = null;
    this.clock = new THREE.Clock();
    this.isAnimating = false;
    
    this.init();
  }
  
  init() {
    // Create scene
    this.scene = new THREE.Scene();
    
    // Create camera (matching reference: 45° FOV)
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.camera.position.set(0, 0, 3); // Position from reference
    
    // Create renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Add lights for the glass sphere (required for MeshPhysicalMaterial)
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    this.scene.add(pointLight);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);
    
    // Create sphere system (includes sphere, background, render target)
    this.sphereSystem = createTimelineSphereSystem();
    this.scene.add(this.sphereSystem.sphere);
    
    // Create dot plane
    this.dotPlane = createTimelineDotPlane();
    this.scene.add(this.dotPlane);
    
    // Handle resize
    window.addEventListener('resize', () => this.onResize());
    
    // Start animation loop
    this.startAnimation();
  }
  
  startAnimation() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.animate();
  }
  
  stopAnimation() {
    this.isAnimating = false;
  }
  
  animate() {
    if (!this.isAnimating) return;
    
    requestAnimationFrame(() => this.animate());
    
    const elapsedTime = this.clock.getElapsedTime();
    
    // Update morphing sphere (renders background to texture, morphs vertices)
    updateMorphingSphere(this.sphereSystem, elapsedTime, this.renderer, this.camera);
    
    // Update dot plane
    if (this.dotPlane && this.dotPlane.material.uniforms) {
      this.dotPlane.material.uniforms.uTime.value = elapsedTime;
    }
    
    // Render main scene (includes background rendered by sphere system)
    this.renderer.autoClear = true;
    this.renderer.render(this.scene, this.camera);
  }
  
  onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Update camera
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    
    // Update renderer
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Update sphere system (background shader and render target)
    if (this.sphereSystem) {
      resizeSphereSystem(this.sphereSystem, width, height);
    }
  }
  
  dispose() {
    this.stopAnimation();
    
    // Dispose sphere system
    if (this.sphereSystem) {
      this.sphereSystem.sphere.geometry.dispose();
      this.sphereSystem.sphere.material.dispose();
      this.sphereSystem.bgMaterial.dispose();
      this.sphereSystem.refractRT.dispose();
    }
    
    // Dispose dot plane
    if (this.dotPlane) {
      this.dotPlane.geometry.dispose();
      this.dotPlane.material.dispose();
    }
    
    // Dispose renderer
    this.renderer.dispose();
  }
}

export function initTimelineScene() {
  return new TimelineScene();
}
```

#### Morphing Sphere (Three.js) - Based on Reference

```javascript
// In timelineSphere.js
import * as THREE from 'three';

export function createTimelineSphereSystem() {
  // This returns an object containing the sphere, background, and render target
  // Based on morphing-sphere-reference.js
  
  // Create render target for refraction effect
  const refractRT = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
  refractRT.texture.generateMipmaps = false; // Crucial for performance
  refractRT.texture.minFilter = THREE.LinearFilter; // Crucial for quality
  
  // === Background scene for refraction ===
  const bgScene = new THREE.Scene();
  const bgCamera = new THREE.Camera();
  
  const bgGeometry = new THREE.PlaneGeometry(2, 2);
  const bgMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0.0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uResolution;

      // Timeline blue colors (matching ACS brand)
      vec3 c1 = vec3(0.29, 0.72, 0.91); // #4fb8e9 light blue
      vec3 c2 = vec3(0.13, 0.53, 0.72); // #2088b8 mid blue
      vec3 c3 = vec3(0.10, 0.37, 0.56); // #1a5f8f dark blue
      vec3 c4 = vec3(0.00, 0.83, 1.00); // #00d4ff accent
      vec3 c5 = vec3(0.20, 0.45, 0.65); // intermediate shade

      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
      
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1, 0));
        float c = hash(i + vec2(0, 1));
        float d = hash(i + vec2(1, 1));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy / uResolution.xy);
        uv -= 0.5;
        uv.x *= uResolution.x / uResolution.y;
        float t = uTime * 0.05;

        // Multi-octave noise
        float n = noise(uv * 2.0 + t);
        n += 0.5 * noise(uv * 4.0 - t * 0.5);
        n += 0.25 * noise(uv * 8.0 + t * 0.25);
        n = smoothstep(0.3, 0.8, n);

        // Animate between blue shades
        vec3 col = mix(c1, c2, abs(sin(uTime * 0.2)));
        col = mix(col, c3, abs(sin(uTime * 0.3 + 1.0)));
        col = mix(col, c4, abs(sin(uTime * 0.4 + 2.0)));
        col = mix(col, c5, n);
        
        gl_FragColor = vec4(col, 1.0);
      }
    `,
    depthWrite: false,
  });
  
  const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
  bgScene.add(bgMesh);
  
  // === Glass/Refractive sphere ===
  const geometry = new THREE.SphereGeometry(1, 128, 128); // High detail for smooth morphing
  
  // Glass material with blue tint
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    transmission: 1.0,           // Full transmission (glass effect)
    transparent: true,
    opacity: 1.0,
    thickness: 2.0,              // Glass thickness
    roughness: 0.02,             // Very smooth
    reflectivity: 0.8,           // High reflectivity
    ior: 1.45,                   // Index of refraction (glass-like)
    attenuationColor: new THREE.Color('#4fb8e9'), // Blue tint
    attenuationDistance: 2.0,    // Tint depth
    envMap: refractRT.texture,   // Use render target for refraction
    envMapIntensity: 1.5,
    clearcoat: 1.0,              // Clear coat layer
    clearcoatRoughness: 0.05,    // Smooth clearcoat
  });
  
  const sphere = new THREE.Mesh(geometry, glassMaterial);
  sphere.position.set(0, 0, 0);
  
  // Store base positions for morphing
  const pos = geometry.attributes.position;
  const basePositions = Float32Array.from(pos.array);
  
  return {
    sphere,
    geometry,
    basePositions,
    bgScene,
    bgCamera,
    bgMaterial,
    refractRT,
  };
}

export function updateMorphingSphere(sphereSystem, time, renderer, mainCamera) {
  // Update background shader time
  sphereSystem.bgMaterial.uniforms.uTime.value = time;
  
  // Render background to texture for refraction
  renderer.setRenderTarget(sphereSystem.refractRT);
  renderer.render(sphereSystem.bgScene, sphereSystem.bgCamera);
  renderer.setRenderTarget(null);
  
  // Morph sphere vertices using sine wave displacement
  const pos = sphereSystem.geometry.attributes.position;
  const base = sphereSystem.basePositions;
  const count = pos.count;
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const bx = base[i3];
    const by = base[i3 + 1];
    const bz = base[i3 + 2];
    
    // Apply sine wave displacement (from reference)
    pos.array[i3]     = bx + 0.08 * Math.sin(time * 0.7 + bx * 2.1 + by * 1.7);
    pos.array[i3 + 1] = by + 0.08 * Math.sin(time * 0.7 + by * 2.3 + bz * 1.9);
    pos.array[i3 + 2] = bz + 0.08 * Math.sin(time * 0.7 + bz * 2.5 + bx * 1.3);
  }
  
  pos.needsUpdate = true;
  sphereSystem.geometry.computeVertexNormals(); // Recalculate normals for proper lighting
  
  // Slow rotation
  sphereSystem.sphere.rotation.y += 0.002;
}

export function resizeSphereSystem(sphereSystem, width, height) {
  sphereSystem.bgMaterial.uniforms.uResolution.value.set(width, height);
  sphereSystem.refractRT.setSize(width, height);
}
```

**Key Adaptations from Reference Code:**
1. **Color Palette**: Changed from multi-color gradient to ACS blue shades (#4fb8e9, #2088b8, #1a5f8f, #00d4ff)
2. **Integration**: Adapted to work within timeline scene (not standalone page)
3. **Background**: Sphere background shader adapted to match timeline aesthetic
4. **Module Structure**: Refactored from single-file to modular architecture
5. **Disposal**: Added proper cleanup for memory management
6. **Render Pipeline**: Integrated with main timeline scene render loop

#### Waving Dot Plane (Three.js)
```javascript
// In timelineDotPlane.js
import * as THREE from 'three';

export function createTimelineDotPlane() {
  // Configuration
  const dotSpacing = 0.3;
  const cols = 60;
  const rows = 40;
  const totalDots = cols * rows;
  
  // Create geometry for instanced mesh
  const dotGeometry = new THREE.SphereGeometry(0.02, 8, 8);
  
  // Custom shader material for wave animation
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uWaveStrength: { value: 0.3 },
      uWaveSpeed: { value: 0.5 }
    },
    vertexShader: `
      uniform float uTime;
      uniform float uWaveStrength;
      uniform float uWaveSpeed;
      
      varying float vOpacity;
      
      void main() {
        vec3 pos = position;
        
        // Get instance position
        vec3 instancePos = vec3(
          mod(float(gl_InstanceID), 60.0) * 0.3 - 9.0,
          floor(float(gl_InstanceID) / 60.0) * 0.3 - 6.0,
          0.0
        );
        
        // Calculate wave displacement
        float wave = sin(instancePos.x * 0.5 + instancePos.y * 0.5 + uTime * uWaveSpeed) * uWaveStrength;
        instancePos.z += wave;
        
        // Calculate opacity based on wave
        vOpacity = 0.3 + sin(instancePos.x * 0.5 + uTime * uWaveSpeed) * 0.2;
        
        // Apply transformations
        vec4 mvPosition = modelViewMatrix * vec4(instancePos + pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying float vOpacity;
      
      void main() {
        // Circular point shape
        vec2 coord = gl_PointCoord - vec2(0.5);
        if (length(coord) > 0.5) discard;
        
        gl_FragColor = vec4(1.0, 1.0, 1.0, vOpacity);
      }
    `,
    transparent: true,
    depthWrite: false
  });
  
  // Create instanced mesh
  const instancedMesh = new THREE.InstancedMesh(dotGeometry, material, totalDots);
  
  // Position instances in grid
  const dummy = new THREE.Object3D();
  let index = 0;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      dummy.position.set(
        col * dotSpacing - (cols * dotSpacing) / 2,
        row * dotSpacing - (rows * dotSpacing) / 2,
        -3 // Position behind sphere
      );
      
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(index, dummy.matrix);
      index++;
    }
  }
  
  instancedMesh.instanceMatrix.needsUpdate = true;
  
  return instancedMesh;
}
```

### E. Global Background Pause Implementation

Modify `background.js` to respect the pause flag:

```javascript
// In background.js - Update the main animate() function

function animate() {
  requestAnimationFrame(animate);
  
  // Check if timeline has paused the background for performance
  if (window.backgroundPaused) {
    // Skip all rendering and updates when timeline is active
    // The requestAnimationFrame loop continues but does nothing
    return;
  }

  // Update shader uniforms with slower speed
  uniforms.time.value += 0.001;
  
  // ... rest of existing animate() function code
  // (all existing background updates and rendering)
}
```

**Key Points:**
- The `requestAnimationFrame` loop continues running (doesn't stop)
- Early return when paused prevents all rendering and updates
- When `window.backgroundPaused` becomes false again, rendering resumes seamlessly
- No visible pause/unpause artifacts because resume happens before user sees background
- Simple flag check adds minimal performance overhead when not paused

**Alternative Approach** (if needed):
If you want to completely stop the animation loop:
```javascript
let animationId;
let isBackgroundRunning = true;

function animate() {
  if (!isBackgroundRunning) return;
  
  animationId = requestAnimationFrame(animate);
  
  // ... existing animation code
}

// Add global control functions
window.pauseBackground = () => {
  isBackgroundRunning = false;
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
};

window.resumeBackground = () => {
  if (!isBackgroundRunning) {
    isBackgroundRunning = true;
    animate();
  }
};
```

Then in timeline.js:
```javascript
function manageBackgroundPause(progress) {
  const pauseThreshold = 0.20;
  const resumeThresholdEnd = 0.95;
  
  if (progress > pauseThreshold && progress < resumeThresholdEnd) {
    if (typeof window.pauseBackground === 'function') {
      window.pauseBackground();
    }
  } else {
    if (typeof window.resumeBackground === 'function') {
      window.resumeBackground();
    }
  }
}
```

**Recommended**: Use the simple flag approach first (cleaner, less risky). Only switch to stop/start loop if more performance is needed.

### F. Styling Considerations

#### Key SCSS Variables
```scss
// Timeline colors
$timeline-blue-light: #4fb3d9;
$timeline-blue-mid: #2088b8;
$timeline-blue-dark: #1a5f8f;
$timeline-accent: #00d4ff;

// Timeline measurements
$timeline-scrubber-height: 80px;
$timeline-event-width: 100vw;
$timeline-sphere-size: 400px;
```

#### Critical Initial Styles

```scss
// #timeline-window-start: Inline span in the text (reference point only)
#timeline-window-start {
  // No special styles needed - just inline text
  // May add subtle styling to hint at interactivity (optional)
}

// #timeline-window-bg: The expanding background element
#timeline-window-bg {
  position: fixed;
  z-index: -1; // Behind all content
  pointer-events: none; // Don't block interactions
  will-change: transform, width, height, opacity;
  
  // Initial state will be set by GSAP based on #timeline-window-start dimensions
  // GSAP will animate this to fill viewport
}

// #acs-timeline: Timeline section container
#acs-timeline {
  position: relative;
  width: 100%;
  // Height will be determined by ScrollTrigger pin-spacer
}
```

#### Responsive Considerations
- Mobile: Timeline events should stack more compactly
- Tablet: Adjust sphere size and dot spacing
- Desktop: Full experience as designed

## Implementation Phases

### Phase 1: Basic Structure (Day 1)
- [ ] Verify HTML structure: `#timeline-window-start`, `#acs-timeline`, `#timeline-window-bg`
- [ ] Set up basic SCSS files and variables
- [ ] Add initial styles for `#timeline-window-bg` (position: fixed, z-index: -1)
- [ ] Create timeline.js module with ScrollTrigger pin
- [ ] Implement window expansion animation using `getBoundingClientRect()`
- [ ] Test background expansion from inline dimensions to full viewport
- [ ] Test pin/unpin behavior

### Phase 2: Visual Elements (Day 2)
- [ ] Set up Three.js scene for timeline
- [ ] Implement morphing sphere with shader material
- [ ] Implement waving dot plane with InstancedMesh
- [ ] Implement timeline scrubber component (DOM)
- [ ] Add scrubber update logic
- [ ] Add fade-in sequence for all elements
- [ ] Test Three.js rendering performance

### Phase 3: Horizontal Scrolling (Day 3)
- [ ] Calculate proper scroll distance
- [ ] Implement horizontal scroll mechanics
- [ ] Add timeline event structure
- [ ] Create event transition animations
- [ ] Test scroll synchronization
- [ ] Implement background pause/resume logic
- [ ] Modify background.js to respect pause flag
- [ ] Test performance improvement

### Phase 4: Content & Polish (Day 4)
- [ ] Add historical content for each event
- [ ] Style event panels to match reference
- [ ] Implement countdown displays for each event
- [ ] Add close button functionality
- [ ] Refine animations and timing

### Phase 5: Enhancements (Day 5)
- [ ] Add morphing animation to sphere
- [ ] Implement scrubber interactivity (click to navigate)
- [ ] Add loading states
- [ ] Performance optimization
- [ ] Mobile/tablet refinements
- [ ] Accessibility improvements (keyboard navigation, ARIA labels)

## Timeline Content Data Structure

Create a data file with timeline events:

```javascript
// timelineData.js
export const timelineEvents = [
  {
    year: 1876,
    decade: '1870s',
    countdown: '1876s',
    countdownLabel: 'When ACS is born',
    title: '1876',
    description: 'Led by Charles F. Chandler, the first meeting for organization of the American Chemical Society is held at the New York College of Pharmacy. Chemists from New York City and the vicinity are invited to attend.',
    image: '/images/timeline/1876-college.jpg',
    imageAlt: 'New York College of Pharmacy building, 1876'
  },
  {
    year: 1900,
    decade: '1900s',
    countdown: '876s',
    countdownLabel: 'Years since founding',
    title: '1900',
    description: '...',
    image: '...',
    imageAlt: '...'
  },
  // ... more events
];
```

## Performance Considerations

1. **Lazy Load Images**: Only load event images when they're near viewport
2. **Three.js Optimization**: 
   - Use `InstancedMesh` for dot plane (thousands of dots with single draw call)
   - Pause/resume animation loop when timeline is not visible
   - Dispose geometries, materials, and render targets when timeline is unmounted
   - Use lower poly counts on mobile devices
3. **Glass Sphere Performance**:
   - **High-end devices**: 128x128 sphere geometry with full MeshPhysicalMaterial
   - **Mid-range devices**: 64x64 sphere geometry, maintain quality
   - **Low-end devices**: 32x32 sphere geometry, simplified material (MeshStandardMaterial instead)
   - **Render target**: Full resolution on desktop, half-res on mobile for refraction
   - **Vertex morphing**: CPU-bound operation, consider reducing update frequency on mobile
4. **ScrollTrigger Optimization**: Use `anticipatePin`, `invalidateOnRefresh`
5. **GPU Acceleration**: Use `will-change` and transforms for better performance on DOM elements
6. **Mobile Optimization**: 
   - Reduce dot plane density (fewer instances: 1200 instead of 2400)
   - Lower sphere geometry detail (see #3 above)
   - Half-resolution render target for refraction
   - Disable antialiasing on low-end devices
   - Consider skipping vertex morphing or reducing frequency
7. **Background Pause Critical**: The glass sphere with refraction is GPU-intensive, making the global background pause even more important for maintaining 60fps

## Accessibility Requirements

1. **Keyboard Navigation**: 
   - Arrow keys to navigate between events
   - Escape key to close timeline
   - Tab navigation for interactive elements

2. **Screen Readers**:
   - Proper ARIA labels for all interactive elements
   - Announce current event when scrolling
   - Descriptive alt text for all images

3. **Reduced Motion**:
   - Respect `prefers-reduced-motion` media query
   - Provide simplified animations or instant transitions

4. **Focus Management**:
   - Maintain visible focus indicators
   - Trap focus within timeline when active

## Dependencies

### Required Packages
```json
{
  "dependencies": {
    "three": "^0.160.0"  // Add to package.json if not present
  }
}
```

**Note**: Check if Three.js is already installed. If not, run:
```powershell
npm install three
```

**Existing Dependencies** (already in project):
- `gsap` (with ScrollTrigger) - Already installed
- `lenis` - Already installed for smooth scrolling

## Browser Compatibility

- **Target Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Fallbacks**: 
  - Static timeline for older browsers
  - Feature detection for WebGL support (required for Three.js)
  - Graceful degradation for reduced motion
  - Fallback message if WebGL not available

## Testing Checklist

- [ ] Smooth scrolling performance (60fps)
- [ ] Pin/unpin behavior at boundaries
- [ ] Window expansion animation
- [ ] Horizontal scroll synchronization
- [ ] Event transitions
- [ ] Scrubber updates
- [ ] Close button functionality
- [ ] Mobile touch scrolling
- [ ] Tablet landscape/portrait
- [ ] Desktop various screen sizes
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Browser compatibility
- [ ] Performance under load

## Notes & Considerations

1. **Window Expansion Structure**: 
   - `#timeline-window-start` is the inline span wrapping the word "timeline" (serves as reference point)
   - `#timeline-window-bg` is a separate div element that does the actual expanding
   - The background element starts with dimensions matching `#timeline-window-start` via `getBoundingClientRect()`
   - Background sits behind all content via negative z-index (`z-index: -1`)
   - This separation allows the text to remain in place while the background expands
   
   **Z-Index Layering (bottom to top):**
   ```
   Layer 1 (z-index: -1): #timeline-window-bg (expanding blue background)
   Layer 2 (default):     Page content, #timeline-window-start text
   Layer 3 (positive):    #acs-timeline content (Three.js canvas, scrubber, events)
   ```

2. **Integration**: The timeline module should follow the existing pattern in `main.js` - imported and called within `initAnimations()`.

3. **Lenis Integration**: Ensure timeline scrolling works with the existing Lenis smooth scroll implementation.

4. **Glass Sphere Approach**: 
   - Using the reference code from `morphing-sphere-reference.js` for the sphere visual
   - This provides a sophisticated glass/refractive effect with animated background
   - More GPU-intensive than simple shader approach, but creates stunning visual
   - Requires render target, lighting, and MeshPhysicalMaterial
   - Worth the performance cost for the "wow factor" of the timeline entrance

5. **Content Management**: Timeline content should be easily editable - consider whether to hardcode in HTML or use a data structure in JS.

6. **Testing the Glass Effect**: 
   - Test on various devices to ensure acceptable performance
   - May need fallback to simpler material on low-end devices
   - The background pause system is crucial for this approach

7. **Future Enhancements**:
   - Interactive scrubber (click to jump to year)
   - Search functionality
   - Filtering by category/theme
   - Share specific events
   - Deep linking to specific years
   - More sophisticated sphere morphing patterns (currently sine wave-based)

## Questions to Resolve

1. How many timeline events total? (This affects scroll distance calculation)
2. Should each event take exactly one viewport width, or variable widths?
3. Should the close button scroll to next section, or unpin and continue?
4. Should scrubber markers be clickable for navigation in v1?
5. What's the desired sphere morphing pattern (if any in v1)?
6. Should there be sound effects for timeline interactions?
7. Mobile strategy: same horizontal scroll, or alternative layout?

---

## Summary of Key Technical Decisions

### Three.js for Visual Elements
- **Morphing Sphere**: Glass/refractive sphere using MeshPhysicalMaterial (based on `morphing-sphere-reference.js`)
  - Background shader rendered to texture for refraction effect
  - Vertex morphing using sine wave displacement
  - Blue-tinted glass appearance with transmission, clearcoat, and high IOR
  - 128x128 sphere geometry for smooth morphing
- **Waving Dot Plane**: Three.js InstancedMesh (2400+ dots) with shader-based wave animation
- **Performance**: Single Three.js scene with render target for sphere refraction, separate canvas from global background

### Background Pause Optimization
- Global background (shader + particles) pauses when user is fully in timeline (20%-95% scroll progress)
- Resumes before user can see it when exiting in either direction
- Saves 30-50% GPU/CPU for timeline animations
- Implemented via simple `window.backgroundPaused` flag check

### DOM Elements (Not Three.js)
- `#timeline-window-start` - Inline span wrapping "timeline" text (reference point)
- `#timeline-window-bg` - Expanding background element (animated from inline size to viewport)
- Timeline scrubber (bottom navigation line with markers)
- Event content panels (text, images, countdown displays)
- Close button

### Animation Architecture
- Single GSAP ScrollTrigger controls entire timeline experience
- Horizontal scroll mapped to vertical scroll progress
- Three.js animation loop runs independently, synced via ScrollTrigger callbacks
- Background pause/resume triggered via ScrollTrigger onUpdate

---

**Status**: Ready for implementation
**Created**: November 5, 2025
**Updated**: November 5, 2025
  - Added Three.js requirements and background pause logic
  - Integrated glass/refractive sphere approach from `morphing-sphere-reference.js`
  - Updated sphere implementation to use MeshPhysicalMaterial with render target
  - Added performance considerations for glass sphere
  - **Updated structure**: Clarified `#timeline-window-start` (inline span) and `#timeline-window-bg` (expanding div)
  - Added z-index layering explanation and getBoundingRect implementation details
**Repo**: 150-lab

