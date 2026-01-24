import * as THREE from 'three';
import logger from '../utils/logger.js';
import performanceDetector from '../utils/performanceDetector.js';

export function initTimelineShader() {
  const canvas = document.querySelector('#timeline-shader-bg');
  if (!canvas) {
    logger.warn('Timeline Shader: Canvas #timeline-shader-bg not found');
    return;
  }

  // Get performance settings for mobile optimization
  const perfSettings = performanceDetector.getSettings();
  const isMobile = performanceDetector.isMobile();
  
  // Use performance-based dot counts for mobile
  const dotCounts = perfSettings.timelineShaderDotCount || { x: 62, y: 36 };

  // Configuration Parameters
  const params = {
    dotCountX: dotCounts.x, // Reduced on mobile for performance
    dotCountY: dotCounts.y, // Reduced on mobile for performance
    spacing: 0.8,   // Spacing between dots
    dotSize: isMobile ? 8.0 : 10.0,   // Size of each dot (smaller on mobile)
    waveSpeed: 0.32,
    waveFrequencyX: 0.16,
    waveFrequencyY: 0.32,
    waveAmplitude: 1.9,
    color: '#4fb3d9', // Timeline blue light
    opacity: 0.58,
    rotationX: -1.7, // Angled plane
    rotationY: 0,
    rotationZ: 0.26,
    cameraZ: 60,
    // Ocean bobbing (entire plane Y-axis movement)
    bobbingAmplitude: 1.4,  // How much the plane bobs up/down
    bobbingSpeed: 0.22,      // Speed of the bobbing motion
    // Position controls
    positionX: -2.0,
    positionY: -30.0,
    positionZ: -16.0,
    // Fade intensity (fog-like effect)
    fadeIntensity: 0.86  // 0 = no fade, 1 = strong fade in distance
  };

  // Expose params for debugging
  window.timelineShaderParams = params;
  
  // Add Scale parameter - responsive based on viewport width
  // Use larger scale for wide viewports (> 1440px) to maintain visual density
  params.scale = window.innerWidth > 1440 ? 3.4 : 3.4;

  // Add to dat.GUI if available
  // Wait a moment for GUI to be initialized if it's not yet available
  setTimeout(() => {
    if (window.gui) {
      // Check if folder already exists
      let folder = window.gui.__folders['Timeline Shader'];
      if (!folder) {
        folder = window.gui.addFolder('Timeline Shader');
      }
      
      folder.add(params, 'waveSpeed', 0, 2).name('Wave Speed');
      folder.add(params, 'waveAmplitude', 0, 10).name('Amplitude');
      folder.add(params, 'waveFrequencyX', 0, 1).name('Freq X');
      folder.add(params, 'waveFrequencyY', 0, 1).name('Freq Y');
      
      folder.add(params, 'bobbingAmplitude', 0, 20).name('Bob Amplitude');
      folder.add(params, 'bobbingSpeed', 0, 2).name('Bob Speed');
      
      folder.add(params, 'fadeIntensity', 0, 1).name('Fade Intensity').onChange(v => {
        if (material && material.uniforms) {
          material.uniforms.uFadeIntensity.value = v;
        }
      });
      
      folder.add(params, 'dotSize', 0.1, 10).name('Dot Size').onChange(v => {
        if (material && material.uniforms) {
          material.uniforms.uSize.value = v * renderer.getPixelRatio();
        }
      });
      
      folder.addColor(params, 'color').name('Dot Color').onChange(v => {
        if (material && material.uniforms) {
          material.uniforms.uColor.value.set(v);
        }
      });
      
      folder.add(params, 'opacity', 0, 1).name('Opacity').onChange(v => {
        if (material && material.uniforms) {
          material.uniforms.uOpacity.value = v;
        }
      });
      
      folder.add(params, 'scale', 0.1, 5).name('Scale').onChange(v => {
        if (points) {
          points.scale.set(v, v, v);
        }
      });
      
      const posFolder = folder.addFolder('Position');
      posFolder.add(params, 'positionX', -200, 200).name('Pos X');
      posFolder.add(params, 'positionY', -200, 200).name('Pos Y');
      posFolder.add(params, 'positionZ', -200, 200).name('Pos Z');
      
      const rotFolder = folder.addFolder('Rotation');
      rotFolder.add(params, 'rotationX', -Math.PI, Math.PI).name('Rot X');
      rotFolder.add(params, 'rotationY', -Math.PI, Math.PI).name('Rot Y');
      rotFolder.add(params, 'rotationZ', -Math.PI, Math.PI).name('Rot Z');
      
      // folder.open();
    }
  }, 1000); // Delay to ensure main GUI is ready

  // Scene Setup
  const scene = new THREE.Scene();
  
  // Camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = params.cameraZ;

  // Renderer with mobile-optimized settings
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: false, // Disabled to save memory on framebuffers
    powerPreference: isMobile ? 'low-power' : 'default'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Use even lower pixel ratio on mobile for better performance (0.75 for significant savings)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 0.75 : 1.25));
  
  // Set initial canvas element dimensions to match viewport
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;

  // Geometry - Grid of Points
  const geometry = new THREE.BufferGeometry();
  const positions = [];
  const indices = []; // For UV mapping simulation if needed, or just use position

  // Center the grid
  const startX = -(params.dotCountX * params.spacing) / 2;
  const startY = -(params.dotCountY * params.spacing) / 2;

  for (let i = 0; i < params.dotCountX; i++) {
    for (let j = 0; j < params.dotCountY; j++) {
      const x = startX + i * params.spacing;
      const y = startY + j * params.spacing;
      const z = 0;
      positions.push(x, y, z);
    }
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

  // Shader Material
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(params.color) },
      uOpacity: { value: params.opacity },
      uSize: { value: params.dotSize * renderer.getPixelRatio() },
      uFrequencyX: { value: params.waveFrequencyX },
      uFrequencyY: { value: params.waveFrequencyY },
      uAmplitude: { value: params.waveAmplitude },
      uFadeIntensity: { value: params.fadeIntensity }
    },
    vertexShader: `
      uniform float uTime;
      uniform float uSize;
      uniform float uFrequencyX;
      uniform float uFrequencyY;
      uniform float uAmplitude;
      
      varying float vDepth;
      
      void main() {
        vec3 pos = position;
        
        // Calculate wave displacement
        // Combine sine waves for organic movement
        float wave1 = sin(pos.x * uFrequencyX + uTime) * uAmplitude;
        float wave2 = cos(pos.y * uFrequencyY + uTime * 0.8) * uAmplitude * 0.5;
        
        pos.z += wave1 + wave2;
        
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        
        // Pass depth to fragment shader for fade effect
        vDepth = -mvPosition.z;
        
        // Size attenuation based on depth
        gl_PointSize = uSize * (30.0 / vDepth);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uFadeIntensity;
      
      varying float vDepth;
      
      void main() {
        // Circular dot shape
        vec2 center = gl_PointCoord - vec2(0.5);
        float dist = length(center);
        
        if (dist > 0.5) discard;
        
        // Soft edge
        float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
        
        // Apply fog-like fade based on depth
        // Normalize depth to 0-1 range (adjust these values for fade distance)
        float depthFade = 1.0 - smoothstep(30.0, 100.0, vDepth);
        depthFade = mix(1.0, depthFade, uFadeIntensity);
        
        gl_FragColor = vec4(uColor, uOpacity * alpha * depthFade);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  // Points Mesh
  const points = new THREE.Points(geometry, material);
  
  // Apply initial rotation
  points.rotation.x = params.rotationX;
  points.rotation.y = params.rotationY;
  points.rotation.z = params.rotationZ;
  
  // Apply initial scale
  points.scale.set(params.scale, params.scale, params.scale);
  
  // Apply initial position
  points.position.set(params.positionX, params.positionY, params.positionZ);
  
  scene.add(points);

  // Animation Loop with FPS throttling for mobile optimization
  // Use adaptive FPS based on scroll state: full FPS when scrolling for smooth params,
  // throttled FPS when idle to save battery
  const clock = new THREE.Clock();
  let animationId;
  let isPaused = false;
  let isVisible = true;
  let isScrolling = false;
  
  // FPS throttling configuration - more aggressive on mobile for battery savings
  const targetFPS = isMobile ? 30 : 60;  // 30fps on mobile (visually acceptable for dot field)
  const idleFPS = isMobile ? 20 : 45;    // 20fps when idle on mobile (minimal motion)
  let currentTargetFPS = targetFPS;
  let frameInterval = 1000 / currentTargetFPS;
  let lastFrameTime = 0;
  
  // Subscribe to scroll state changes
  performanceDetector.onScrollStateChange(({ isScrolling: scrolling }) => {
    isScrolling = scrolling;
    // During scroll, keep higher FPS for smooth param transitions
    // When idle, reduce FPS to save performance
    currentTargetFPS = scrolling ? targetFPS : idleFPS;
    frameInterval = 1000 / currentTargetFPS;
  });
  
  // Set up visibility observer
  const visibilityObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
      if (isVisible && isPaused) {
        // Resume if we became visible while paused
      }
    });
  }, { threshold: 0.1, rootMargin: '50px' });
  visibilityObserver.observe(canvas);

  function animate() {
    if (isPaused) return;
    
    animationId = requestAnimationFrame(animate);
    
    const currentTime = performance.now();
    const deltaTime = currentTime - lastFrameTime;
    
    // FPS throttling - skip frame if not enough time has passed
    if (deltaTime < frameInterval) {
      return;
    }
    
    // Skip rendering if not visible or page is hidden
    if (!isVisible || document.hidden) {
      return;
    }
    
    lastFrameTime = currentTime - (deltaTime % frameInterval);
    
    const elapsedTime = clock.getElapsedTime();
    
    // MOBILE OPTIMIZATION: Reduce time update frequency during scroll
    // This slows wave movement during scroll but maintains smooth appearance
    if (isMobile && isScrolling) {
      material.uniforms.uTime.value += 0.008; // Fixed slow increment during scroll
    } else {
      material.uniforms.uTime.value = elapsedTime * params.waveSpeed;
    }
    
    // Update uniforms from params (interpolated by ScrollTrigger onUpdate)
    // MOBILE OPTIMIZATION: Skip some uniform updates during scroll (they don't change often)
    if (!isMobile || !isScrolling) {
      material.uniforms.uFrequencyX.value = params.waveFrequencyX;
      material.uniforms.uFrequencyY.value = params.waveFrequencyY;
      material.uniforms.uAmplitude.value = params.waveAmplitude;
      material.uniforms.uColor.value.set(params.color);
      material.uniforms.uFadeIntensity.value = params.fadeIntensity;
    }
    // Always update opacity (needed for fade transitions)
    material.uniforms.uOpacity.value = params.opacity;
    
    // MOBILE: Skip ALL position/rotation/scale updates to prevent nudging during scroll
    // Position is set once at initialization and never touched again on mobile
    if (!isMobile) {
      // Apply ocean bobbing (entire plane Y-axis movement) - DESKTOP ONLY
      const bobbingOffset = Math.sin(elapsedTime * params.bobbingSpeed) * params.bobbingAmplitude;
      points.position.set(
        params.positionX,
        params.positionY + bobbingOffset,
        params.positionZ
      );
      
      // Update rotation/scale - DESKTOP ONLY
      points.rotation.x = params.rotationX;
      points.rotation.y = params.rotationY;
      points.rotation.z = params.rotationZ;
      points.scale.set(params.scale, params.scale, params.scale);
    }
    
    renderer.render(scene, camera);
  }

  // Handle Resize
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    material.uniforms.uSize.value = params.dotSize * renderer.getPixelRatio();
    
    // Update canvas element dimensions to match full viewport
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    
    // Update scale based on viewport width
    // Use larger scale for wide viewports (> 1440px) to maintain visual density
    params.scale = window.innerWidth > 1440 ? 3.4 : 3.4;
    points.scale.set(params.scale, params.scale, params.scale);
  }

  window.addEventListener('resize', onWindowResize);

  // Start Animation with initial timestamp
  requestAnimationFrame(animate);

  // Return control object
  return {
    stop: () => {
      isPaused = true;
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onWindowResize);
      visibilityObserver.disconnect();
    },
    resume: () => {
      if (isPaused) {
        isPaused = false;
        // Re-add resize listener
        window.addEventListener('resize', onWindowResize);
        // Force resize update to ensure proportionality - but NOT on mobile
        // On mobile, forced resize causes position nudging
        if (!isMobile) {
          onWindowResize();
        }
        
        clock.start(); // Reset clock on resume
        lastFrameTime = performance.now(); // Reset frame timing
        // Start animation loop
        requestAnimationFrame(animate);
      }
    },
    updateParams: (newParams) => {
      Object.assign(params, newParams);
    },
    // Expose for external performance tuning
    setTargetFPS: (fps) => {
      currentTargetFPS = fps;
      frameInterval = 1000 / fps;
    }
  };
}
