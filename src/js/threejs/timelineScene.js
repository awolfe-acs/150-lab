import * as THREE from 'three';
import { createTimelineSphereSystem, updateMorphingSphere, resizeSphereSystem } from './timelineSphere.js';
import { createTimelineDotPlane } from './timelineDotPlane.js';
import performanceDetector from '../utils/performanceDetector.js';

export class TimelineScene {
  constructor() {
    this.canvas = document.getElementById('timeline-canvas');
    
    if (!this.canvas) {
      throw new Error('Timeline canvas not found');
    }
    
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.sphereSystem = null; // Contains sphere, background, render target
    this.dotPlane = null;
    this.clock = new THREE.Clock();
    this.isAnimating = false;
    
    // Mobile-optimized rendering
    this.isMobile = performanceDetector.isMobile();
    this.isScrolling = false;
    
    // FPS throttling
    this.targetFPS = this.isMobile ? 45 : 60;
    this.scrollFPS = this.isMobile ? 30 : 45;
    this.frameInterval = 1000 / this.targetFPS;
    this.lastFrameTime = 0;
    
    // Subscribe to scroll state changes
    performanceDetector.onScrollStateChange(({ isScrolling }) => {
      this.isScrolling = isScrolling;
      this.frameInterval = 1000 / (isScrolling ? this.scrollFPS : this.targetFPS);
    });

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

    // Create renderer with mobile-optimized settings
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: !this.isMobile, // Disable antialiasing on mobile for performance
      powerPreference: this.isMobile ? 'low-power' : 'default'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // Lower pixel ratio on mobile for better performance
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.isMobile ? 1.25 : 2));

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
    
    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastFrameTime;
    
    // FPS throttling - skip frame if not enough time has passed
    if (deltaTime < this.frameInterval) {
      return;
    }
    
    // Skip rendering if page is hidden
    if (document.hidden) {
      return;
    }
    
    this.lastFrameTime = currentTime - (deltaTime % this.frameInterval);

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

