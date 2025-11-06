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
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
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
    depthWrite: false
  });

  const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
  bgScene.add(bgMesh);

  // === Glass/Refractive sphere ===
  const geometry = new THREE.SphereGeometry(1, 128, 128); // High detail for smooth morphing

  // Glass material with blue tint
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    transmission: 1.0, // Full transmission (glass effect)
    transparent: true,
    opacity: 1.0,
    thickness: 2.0, // Glass thickness
    roughness: 0.02, // Very smooth
    reflectivity: 0.8, // High reflectivity
    ior: 1.45, // Index of refraction (glass-like)
    attenuationColor: new THREE.Color('#4fb8e9'), // Blue tint
    attenuationDistance: 2.0, // Tint depth
    envMap: refractRT.texture, // Use render target for refraction
    envMapIntensity: 1.5,
    clearcoat: 1.0, // Clear coat layer
    clearcoatRoughness: 0.05 // Smooth clearcoat
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
    refractRT
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
    pos.array[i3] = bx + 0.08 * Math.sin(time * 0.7 + bx * 2.1 + by * 1.7);
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

