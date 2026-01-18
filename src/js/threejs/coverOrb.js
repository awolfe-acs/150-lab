import * as THREE from 'three';
import logger from '../utils/logger.js';
import performanceDetector from '../utils/performanceDetector.js';

export function initCoverOrb() {
  const canvas = document.querySelector('#timeline-cover-canvas');
  if (!canvas) {
    logger.warn('Cover orb canvas not found');
    return;
  }
  
  // Prevent double initialization
  if (window.coverOrbInitialized) {
    logger.warn('Cover orb already initialized, skipping duplicate call');
    return window.coverOrbControls;
  }
  
  window.coverOrbInitialized = true;
  
  // Mobile optimization settings
  const isMobile = performanceDetector.isMobile();

  // Scene setup
  const scene = new THREE.Scene();
  
  // Camera setup
  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.z = 3.5;

  // Renderer setup with mobile optimizations
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: !isMobile, // Disable antialiasing on mobile
    powerPreference: isMobile ? 'low-power' : 'default'
  });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  // Lower pixel ratio on mobile for better performance
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 2));

  // Default Parameters (tuned for desired look)
  const params = {
    noiseStrength: 0.13,
    noiseSpeed: 0.11,
    noiseDensity: 0.73,
    colorDeep: '#9b7bff', // Darker blue/purple
    colorLight: '#0063d8', // Teal
    colorHighlight: '#00a4af', // Turquoise highlight was 00d3c0
    fresnelPower: 1.3,
    fresnelIntensity: 0.33,
    pulseSpeed: 0.68,
    pulseIntensity: 0.14,
    rotationSpeed: 0.24,
    // New parameters
    glitterStrength: 0.078,
    glitterDensity: 70.0,
    specularStrength: 1.2,
    glossiness: 28.0
  };

  // Shader Material
  const vertexShader = `
    uniform float uTime;
    uniform float uNoiseStrength;
    uniform float uNoiseSpeed;
    uniform float uNoiseDensity;
    
    varying vec2 vUv;
    varying vec3 vNormal;
    varying float vDisplacement;
    varying vec3 vPosition;
    varying vec3 vViewPosition;

    // Simplex 3D Noise 
    // by Ian McEwan, Ashima Arts
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

    float snoise(vec3 v){ 
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

      // First corner
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 = v - i + dot(i, C.xxx) ;

      // Other corners
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );

      //  x0 = x0 - 0.0 + 0.0 * C 
      vec3 x1 = x0 - i1 + 1.0 * C.xxx;
      vec3 x2 = x0 - i2 + 2.0 * C.xxx;
      vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

      // Permutations
      i = mod(i, 289.0 ); 
      vec4 p = permute( permute( permute( 
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

      // Gradients
      // ( N*N points uniformly over a square, mapped onto an octahedron.)
      float n_ = 1.0/7.0; // N=7
      vec3  ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );

      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);

      //Normalise gradients
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      // Mix final noise value
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                    dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      vUv = uv;
      vNormal = normal;
      
      // Calculate noise based displacement
      float noiseVal = snoise(position * uNoiseDensity + uTime * uNoiseSpeed);
      vDisplacement = noiseVal;
      
      // Displace position along normal
      vec3 newPosition = position + normal * (noiseVal * uNoiseStrength);
      vPosition = newPosition;
      
      vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
      vViewPosition = -mvPosition.xyz;
      
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColorDeep;
    uniform vec3 uColorLight;
    uniform vec3 uColorHighlight;
    uniform float uFresnelPower;
    uniform float uFresnelIntensity;
    uniform float uPulseSpeed;
    uniform float uPulseIntensity;
    uniform float uGlitterStrength;
    uniform float uGlitterDensity;
    uniform float uSpecularStrength;
    uniform float uGlossiness;
    
    varying vec2 vUv;
    varying vec3 vNormal;
    varying float vDisplacement;
    varying vec3 vPosition;
    varying vec3 vViewPosition;

    // Simple pseudo-random function
    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      // Mix colors based on displacement/noise
      float mixFactor = smoothstep(-0.5, 0.5, vDisplacement);
      vec3 baseColor = mix(uColorDeep, uColorLight, mixFactor);
      
      vec3 viewDirection = normalize(vViewPosition);
      vec3 normal = normalize(vNormal);
      
      // Fresnel effect for metallic look
      float fresnel = pow(1.0 - dot(viewDirection, normal), uFresnelPower);
      
      // Specular Reflection (Blinn-Phong)
      vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0)); // Directional light from top-right-front
      vec3 halfDir = normalize(lightDir + viewDirection);
      float specAngle = max(dot(normal, halfDir), 0.0);
      float specular = pow(specAngle, uGlossiness);
      
      // Glitter Effect
      // Use normal direction for sparkles so they move naturally with rotation
      // Add very slow time component for subtle life
      float glitterNoise = random(vNormal.xy * uGlitterDensity + uTime * 0.05);
      
      // Use smoothstep for softer, more blended sparkles instead of harsh static
      // High threshold (0.95) ensures only peaks sparkle
      float glitter = smoothstep(0.95, 1.0, glitterNoise) * uGlitterStrength * (fresnel + specular);
      
      // Combine
      vec3 finalColor = baseColor;
      finalColor += uColorHighlight * fresnel * uFresnelIntensity; // Rim light
      finalColor += uColorHighlight * specular * uSpecularStrength; // Glossy highlight
      finalColor += vec3(1.0) * glitter; // White sparkles
      
      // Add subtle pulse to alpha/brightness
      float pulse = 1.0 - uPulseIntensity + uPulseIntensity * sin(uTime * uPulseSpeed);
      
      gl_FragColor = vec4(finalColor * pulse, 1.0);
    }
  `;

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uNoiseStrength: { value: params.noiseStrength },
      uNoiseSpeed: { value: params.noiseSpeed },
      uNoiseDensity: { value: params.noiseDensity },
      uColorDeep: { value: new THREE.Color(params.colorDeep) },
      uColorLight: { value: new THREE.Color(params.colorLight) },
      uColorHighlight: { value: new THREE.Color(params.colorHighlight) },
      uFresnelPower: { value: params.fresnelPower },
      uFresnelIntensity: { value: params.fresnelIntensity },
      uPulseSpeed: { value: params.pulseSpeed },
      uPulseIntensity: { value: params.pulseIntensity },
      uGlitterStrength: { value: params.glitterStrength },
      uGlitterDensity: { value: params.glitterDensity },
      uSpecularStrength: { value: params.specularStrength },
      uGlossiness: { value: params.glossiness }
    },
    transparent: true
  });

  // Geometry - reduced segments on mobile for better performance
  const sphereSegments = isMobile ? 64 : 128;
  const geometry = new THREE.SphereGeometry(1, sphereSegments, sphereSegments);
  const orb = new THREE.Mesh(geometry, material);
  scene.add(orb);

  // Expose params, uniforms, and material for debugging/console access
  window.coverOrbParams = params;
  window.coverOrbUniforms = material.uniforms;
  window.coverOrbMaterial = material;
  window.coverOrbOrb = orb;

  // Setup DAT.GUI
  const setupGUI = () => {
    if (window.gui) {
      // Check if folder already exists to prevent duplicates
      if (window.gui.__folders && window.gui.__folders["Cover Orb"]) {
        return;
      }

      const folder = window.gui.addFolder('Cover Orb');
      
      // Bind to params (will sync to uniforms in animate loop)
      folder.add(params, 'noiseStrength', 0, 2).name('Noise Strength');
      folder.add(params, 'noiseSpeed', 0, 2).name('Noise Speed');
      folder.add(params, 'noiseDensity', 0, 5).name('Noise Density');
      
      folder.addColor(params, 'colorDeep').name('Color Deep');
      folder.addColor(params, 'colorLight').name('Color Light');
      folder.addColor(params, 'colorHighlight').name('Color Highlight');
      
      folder.add(params, 'fresnelPower', 0, 5).name('Fresnel Power');
      folder.add(params, 'fresnelIntensity', 0, 5).name('Fresnel Intensity');
      
      folder.add(params, 'specularStrength', 0, 2).name('Spec Strength');
      folder.add(params, 'glossiness', 1, 100).name('Glossiness');
      
      folder.add(params, 'glitterStrength', 0, 2).name('Glitter Str');
      folder.add(params, 'glitterDensity', 1, 200).name('Glitter Dens');
      
      folder.add(params, 'pulseSpeed', 0, 5).name('Pulse Speed');
      folder.add(params, 'pulseIntensity', 0, 1).name('Pulse Intensity');
      
      folder.add(params, 'rotationSpeed', 0, 1).name('Rotation Speed');
      
      folder.open();
    } else {
      setTimeout(setupGUI, 1500);
    }
  };
  
  // Start checking for GUI after a delay to ensure main GUI is initialized
  setTimeout(setupGUI, 1500);

  // Animation Loop with FPS throttling
  const clock = new THREE.Clock();
  let animationId;
  let isPaused = false;
  let isScrolling = false;
  
  // FPS throttling
  const targetFPS = isMobile ? 45 : 60;
  const scrollFPS = isMobile ? 30 : 45;
  let currentFPS = targetFPS;
  let frameInterval = 1000 / currentFPS;
  let lastFrameTime = 0;
  
  // Subscribe to scroll state changes
  performanceDetector.onScrollStateChange(({ isScrolling: scrolling }) => {
    isScrolling = scrolling;
    currentFPS = scrolling ? scrollFPS : targetFPS;
    frameInterval = 1000 / currentFPS;
  });
  
  const animate = () => {
    if (isPaused) return;
    
    animationId = requestAnimationFrame(animate);
    
    const currentTime = performance.now();
    const deltaTime = currentTime - lastFrameTime;
    
    // FPS throttling - skip frame if not enough time has passed
    if (deltaTime < frameInterval) {
      return;
    }
    
    // Skip rendering if page is hidden
    if (document.hidden) {
      return;
    }
    
    lastFrameTime = currentTime - (deltaTime % frameInterval);
    
    const elapsedTime = clock.getElapsedTime();
    material.uniforms.uTime.value = elapsedTime;
    
    // Update uniforms from params (syncs GUI changes to shader)
    material.uniforms.uNoiseStrength.value = params.noiseStrength;
    material.uniforms.uNoiseSpeed.value = params.noiseSpeed;
    material.uniforms.uNoiseDensity.value = params.noiseDensity;
    material.uniforms.uColorDeep.value.set(params.colorDeep);
    material.uniforms.uColorLight.value.set(params.colorLight);
    material.uniforms.uColorHighlight.value.set(params.colorHighlight);
    material.uniforms.uFresnelPower.value = params.fresnelPower;
    material.uniforms.uFresnelIntensity.value = params.fresnelIntensity;
    material.uniforms.uPulseSpeed.value = params.pulseSpeed;
    material.uniforms.uPulseIntensity.value = params.pulseIntensity;
    material.uniforms.uGlitterStrength.value = params.glitterStrength;
    material.uniforms.uGlitterDensity.value = params.glitterDensity;
    material.uniforms.uSpecularStrength.value = params.specularStrength;
    material.uniforms.uGlossiness.value = params.glossiness;
    
    // Rotation
    orb.rotation.y = elapsedTime * params.rotationSpeed;
    orb.rotation.z = elapsedTime * (params.rotationSpeed * 0.5);
    
    renderer.render(scene, camera);
  };
  
  animate();

  // Handle Resize
  const handleResize = () => {
    if (!canvas) return;
    
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const aspect = width / height;
    
    // Update camera
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    
    // Adjust camera distance to ensure orb fits within 90% of viewport width
    // Sphere radius = 1, Diameter = 2
    // We want diameter to be max 90% of visible width
    // Visible Width = 2 * dist * tan(FOV/2) * aspect
    // FOV is 45 degrees
    // dist >= 2.68 / aspect
    
    const minZ = 3.5;
    const requiredZ = 2.7 / aspect; 
    
    camera.position.z = Math.max(minZ, requiredZ);
    
    // Update renderer
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  window.addEventListener('resize', handleResize);
  
  // Initial resize check
  handleResize();

  const controls = {
    pause: () => {
      isPaused = true;
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    },
    resume: () => {
      if (isPaused) {
        isPaused = false;
        animate();
      }
    },
    cleanup: () => {
      isPaused = true;
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      window.coverOrbInitialized = false;
    }
  };
  
  // Store controls reference globally
  window.coverOrbControls = controls;
  
  return controls;
}
