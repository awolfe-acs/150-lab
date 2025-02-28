import * as THREE from "three";
import * as dat from "dat.gui";

export function initShaderBackground() {
  // Get the canvas element
  const canvas = document.getElementById("shaderBackground");
  if (!canvas) return;

  // Set canvas to fill the viewport and position it fixed in the background
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.zIndex = "-1"; // Place behind other content

  // Create the WebGL renderer
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Create scene and an orthographic camera
  const scene = new THREE.Scene();

  // Camera parameters with zoom control
  const cameraParams = {
    zoom: 1.08,
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

  // Define uniforms with tunable parameters - increased default values for larger displacement
  const uniforms = {
    time: { value: 0.0 },
    resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    // Animation speed parameters
    mainSpeed: { value: 0.0164 }, // Overall animation speed multiplier
    waveSpeed: { value: 2.1 }, // Speed of the wave movement
    noiseSpeed: { value: 3.0 }, // Speed of the noise animation
    colorCycleSpeed: { value: 3.0 }, // Speed of color cycling/transitions
    //Color parameters
    color1: { value: new THREE.Color(0x32c2d6) },
    color2: { value: new THREE.Color(0x004199) },
    colorDarkness: { value: 0.0 }, // Controls overall darkness of colors
    colorWaveInfluence: { value: 0.5 }, // Controls how much colors affect wave patterns
    colorFrequencyShift: { value: 1.0 }, // Controls how colors shift wave frequencies
    colorAmplitudeEffect: { value: 1.0 }, // Controls how colors affect wave amplitude
    //Wave parameters
    waveAmplitude: { value: 1.66 }, // Controls wave height
    waveFrequency: { value: 5.0 }, // Controls wave frequency
    waveDepth: { value: 1.0 }, // Controls perceived depth of waves
    flowDirection: { value: new THREE.Vector2(-1.3, 0.4) }, // Direction of wave flow
    noiseScale: { value: 0.1 }, // Scale of noise pattern
    noiseInfluence: { value: 0.28 }, // How much noise affects the pattern
    layerOffset: { value: 0.2 }, // Offset between color layers for depth
    //Appearance parameters
    yOffset: { value: 0.12 },
    topEdgeSoftness: { value: 1.0 }, // Controls the softness of the top edge fade
    bottomEdgeSoftness: { value: 1.0 }, // Controls the softness of the bottom edge fade
    fadeWidth: { value: 1.0 }, // Controls the width of the fade area
    leftCornerRoundness: { value: 0.8 }, // Controls how much the fade rounds into left corners
    rightCornerRoundness: { value: 1.0 }, // Controls how much the fade rounds into right corners
    edgeNoiseAmount: { value: 0.12 }, // Controls the amount of noise on the edges
    edgeNoiseScale: { value: 3.0 }, // Controls the scale of noise on the edges
    edgeDepth: { value: 0.86 }, // Controls how far the burn-in effect extends into the canvas
    edgeContrast: { value: 2.0 }, // Controls the contrast/sharpness of the edge transition
    // Film noise parameters
    filmNoiseIntensity: { value: 0.05 }, // Controls the intensity of the film noise
    filmNoiseSpeed: { value: 0.00001 }, // Controls the speed of the film noise animation
    filmGrainSize: { value: 10.0 }, // Controls the size of the film grain
    filmScratchIntensity: { value: 0.0 }, // Controls the intensity of film scratches
    // Lighting parameters
    lightDirection: { value: new THREE.Vector3(0.5, 0.5, 1.0).normalize() },
    ambientLight: { value: 0.4 }, // Ambient light intensity
    directionalLight: { value: 1.0 }, // Directional light intensity
    specularStrength: { value: 0.0 }, // Specular highlight strength
    shininess: { value: 1.0 }, // Shininess factor for specular highlights
    //Displacement parameters (kept but set to 0 by default)
    displacementStrength: { value: 0.0 },
    displacementScale: { value: 0.0001 },
    displacementDepth: { value: 0.0 },
  };

  // Enhanced vertex shader with larger displacement
  const vertexShader = `
    uniform float time;
    uniform float waveSpeed;
    uniform float noiseSpeed;
    uniform vec2 resolution;
    uniform float yOffset;
    varying vec2 vUv;
    varying vec3 vViewPosition;
    varying vec3 vNormal;
    
    void main() {
      vUv = uv;
      
      // Apply yOffset to the entire mesh by shifting the y position
      vec3 positionWithOffset = position;
      positionWithOffset.y += yOffset * resolution.y; // Scale by resolution for pixel-based offset
      
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
    uniform float topEdgeSoftness;
    uniform float bottomEdgeSoftness;
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
    uniform float noiseSpeed;
    uniform float waveSpeed;
    uniform float filmNoiseIntensity;
    uniform float filmNoiseSpeed;
    uniform float filmGrainSize;
    uniform float filmScratchIntensity;
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
      vec2 flowUv = uv + colorModifiedFlow * time * waveSpeed * 0.1;
      
      // Modify frequency based on color
      float frequencyMod = waveFrequency * (1.0 + (colorHue - 0.5) * colorFrequencyShift);
      
      // Create multiple wave layers with different frequencies for depth
      // Use color intensity to modify wave phase
      float colorPhaseShift = colorIntensity * colorWaveInfluence * 3.0;
      
      float wave1 = sin(flowUv.x * frequencyMod * 4.0 + time * colorCycleSpeed + colorPhaseShift) * 0.5 + 0.5;
      float wave2 = sin(flowUv.y * frequencyMod * 3.0 + time * colorCycleSpeed * 0.7 + colorPhaseShift * 0.8) * 0.5 + 0.5;
      float wave3 = sin((flowUv.x + flowUv.y) * frequencyMod * 2.0 + time * colorCycleSpeed * 1.3 + colorPhaseShift * 0.6) * 0.5 + 0.5;
      
      // Apply depth offset to create parallax effect
      float depthOffset = depth * layerOffset;
      wave1 = sin(flowUv.x * frequencyMod * 4.0 + time * colorCycleSpeed + depthOffset + colorPhaseShift) * 0.5 + 0.5;
      wave2 = sin(flowUv.y * frequencyMod * 3.0 + time * colorCycleSpeed * 0.7 + depthOffset + colorPhaseShift * 0.8) * 0.5 + 0.5;
      wave3 = sin((flowUv.x + flowUv.y) * frequencyMod * 2.0 + time * colorCycleSpeed * 1.3 + depthOffset + colorPhaseShift * 0.6) * 0.5 + 0.5;
      
      // Combine waves with weighted averaging for a more complex pattern
      // Use color components to weight the waves differently
      float rWeight = localColor.r * 0.5 + 0.2; // 0.2-0.7 range
      float gWeight = localColor.g * 0.5 + 0.2; // 0.2-0.7 range
      float bWeight = localColor.b * 0.5 + 0.2; // 0.2-0.7 range
      
      // Normalize weights
      float totalWeight = rWeight + gWeight + bWeight;
      rWeight /= totalWeight;
      gWeight /= totalWeight;
      bWeight /= totalWeight;
      
      float wave = wave1 * rWeight + wave2 * gWeight + wave3 * bWeight;
      
      // Apply noise influence for organic movement
      float noiseValue = fbm(uv * noiseScale + time * 0.1 * noiseSpeed);
      // Use color intensity to control noise mixing
      float noiseMix = noiseInfluence * (1.0 - depth * 0.5) * (1.0 + colorIntensity * colorWaveInfluence);
      wave = mix(wave, noiseValue, clamp(noiseMix, 0.0, 1.0));
      
      // Apply color-based amplitude modulation
      float amplitudeMod = 1.0 + (colorIntensity - 0.5) * colorAmplitudeEffect;
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
      // Use color intensity to affect the wave amplitude
      float colorIntensity = getColorIntensity(localColor);
      float amplitudeMod = waveAmplitude * (1.0 + (colorIntensity - 0.5) * colorAmplitudeEffect);
      
      vec3 dx = vec3(epsilon, 0.0, (right - center) * amplitudeMod);
      vec3 dy = vec3(0.0, epsilon, (top - center) * amplitudeMod);
      
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
        verticalDist = abs(centeredUV.y) / (0.5 * edgeDepth);
      } else {
        // Top half - adjust for corner roundness to prevent cutting off
        verticalDist = abs(centeredUV.y) / (0.5 * edgeDepth);
      }
      
      // Calculate horizontal distance for corner rounding
      float horizontalDist = abs(centeredUV.x) / (0.5 * edgeDepth);
      
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
    
    // Function to generate film grain noise
    float filmGrain(vec2 uv, float time) {
      // High frequency noise for grain
      float noise1 = random(uv * filmGrainSize + time * 10.0);
      float noise2 = random(uv * filmGrainSize * 2.0 - time * 15.0);
      
      // Mix different noise frequencies for more natural look
      return mix(noise1, noise2, 0.5) * 2.0 - 1.0;
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
    
    // Function to apply film noise effects
    vec3 applyFilmNoise(vec3 color, vec2 uv) {
      // Generate time-varying film grain
      float grain = filmGrain(uv, time * filmNoiseSpeed);
      
      // Generate film scratches
      float scratches = filmScratches(uv, time * filmNoiseSpeed * 0.5);
      
      // Apply grain to the color
      color += grain * filmNoiseIntensity;
      
      // Apply scratches (brighten the color where scratches occur)
      color += scratches * filmScratchIntensity;
      
      return color;
    }
    
    void main() {
      vec2 uv = vUv;
      
      // Get initial color blend for feedback
      vec3 initialColor = mix(color1, color2, 0.5);
      
      // Create multiple depth layers for parallax effect with color influence
      float foregroundWave = wavePattern(uv, 0.0, mix(color1, color2, 0.3)); // Foreground layer
      float middleWave = wavePattern(uv, 0.5, mix(color1, color2, 0.5));     // Middle layer
      float backgroundWave = wavePattern(uv, 1.0, mix(color1, color2, 0.7)); // Background layer
      
      // Create depth-based color mixing
      vec3 foregroundColor = mix(color1, color2, foregroundWave);
      vec3 backgroundColor = mix(color2, color1, backgroundWave);
      
      // Blend layers based on wave depth to create parallax effect
      float depthBlend = smoothInterpolation(0.3, 0.7, middleWave);
      vec3 baseColor = mix(backgroundColor, foregroundColor, depthBlend);
      
      // Apply darkness to the colors
      baseColor = mix(baseColor, vec3(0.0, 0.0, 0.0), colorDarkness);
      
      // Calculate lighting based on wave normal with color influence
      vec3 waveNormal = calculateNormal(uv, baseColor);
      
      // Blend between the wave normal and the surface normal for subtle effect
      vec3 normal = normalize(mix(vNormal, waveNormal, waveDepth));
      
      // Lighting calculations
      vec3 viewDir = normalize(vViewPosition);
      vec3 lightDir = normalize(lightDirection);
      
      // Ambient lighting
      vec3 ambient = ambientLight * baseColor;
      
      // Diffuse lighting
      float diff = max(dot(normal, lightDir), 0.0);
      vec3 diffuse = directionalLight * diff * baseColor;
      
      // Specular lighting (Blinn-Phong)
      vec3 halfwayDir = normalize(lightDir + viewDir);
      float spec = pow(max(dot(normal, halfwayDir), 0.0), shininess);
      vec3 specular = specularStrength * spec * vec3(1.0);
      
      // Combine lighting components
      vec3 color = ambient + diffuse + specular;
      
      // Add highlights based on wave height for extra depth
      float highlightIntensity = smoothInterpolation(0.4, 0.6, foregroundWave) * waveDepth;
      color += vec3(0.1, 0.1, 0.15) * highlightIntensity;
      
      // Apply film noise effects
      color = applyFilmNoise(color, uv);
      
      // Calculate non-linear edge fade with corner rounding
      float distanceField = calculateEdgeFade(uv);
      
      // Apply different softness to top and bottom edges
      float alpha;
      if (uv.y >= 0.5) {
        // Top half
        float normalizedDist = (distanceField - 0.5) / 0.5; // Normalize to 0-1 range for top half
        alpha = 1.0 - smoothInterpolation(1.0 - topEdgeSoftness, 1.0, normalizedDist);
      } else {
        // Bottom half
        float normalizedDist = (distanceField - 0.5) / 0.5; // Normalize to 0-1 range for bottom half
        alpha = 1.0 - smoothInterpolation(1.0 - bottomEdgeSoftness, 1.0, normalizedDist);
      }
      
      // Add subtle noise to alpha for a more organic edge
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
  const gui = new dat.GUI({ width: 300 });
  gui.domElement.style.position = "absolute";
  gui.domElement.style.top = "10px";
  gui.domElement.style.right = "10px";

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

  // Open the camera folder by default
  cameraFolder.open();

  // Create a folder for animation speed controls
  const speedFolder = gui.addFolder("Animation Speed Controls");

  // Add controls for animation speed parameters
  speedFolder
    .add(uniforms.mainSpeed, "value", 0, 0.1)
    .name("Main Speed")
    .step(0.0001)
    .onChange((value) => {
      uniforms.mainSpeed.value = value;
    });

  speedFolder
    .add(uniforms.waveSpeed, "value", 0, 5)
    .name("Wave Speed")
    .onChange((value) => {
      uniforms.waveSpeed.value = value;
    });

  speedFolder
    .add(uniforms.noiseSpeed, "value", 0, 5)
    .name("Noise Speed")
    .onChange((value) => {
      uniforms.noiseSpeed.value = value;
    });

  speedFolder
    .add(uniforms.colorCycleSpeed, "value", 0, 5)
    .name("Color Cycle Speed")
    .onChange((value) => {
      uniforms.colorCycleSpeed.value = value;
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
    .add(uniforms.colorDarkness, "value", 0.0, 1.0)
    .name("Color Darkness")
    .onChange((value) => {
      uniforms.colorDarkness.value = value;
    });

  // Add color-wave interaction controls
  colorFolder
    .add(uniforms.colorWaveInfluence, "value", 0.0, 1.0)
    .name("Color-Wave Influence")
    .onChange((value) => {
      uniforms.colorWaveInfluence.value = value;
    });

  colorFolder
    .add(uniforms.colorFrequencyShift, "value", 0.0, 1.0)
    .name("Color Frequency Effect")
    .onChange((value) => {
      uniforms.colorFrequencyShift.value = value;
    });

  colorFolder
    .add(uniforms.colorAmplitudeEffect, "value", 0.0, 1.0)
    .name("Color Amplitude Effect")
    .onChange((value) => {
      uniforms.colorAmplitudeEffect.value = value;
    });

  // Open the color folder by default
  colorFolder.open();

  // Create a folder for wave controls
  const waveFolder = gui.addFolder("Wave Controls");

  // Add controls for wave parameters
  waveFolder
    .add(uniforms.waveAmplitude, "value", 0, 2)
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
    .add(uniforms.noiseScale, "value", 0.1, 5)
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
    .name("X Direction")
    .onChange((value) => {
      uniforms.flowDirection.value.x = value;
    });

  flowFolder
    .add(uniforms.flowDirection.value, "y", -2, 2)
    .name("Y Direction")
    .onChange((value) => {
      uniforms.flowDirection.value.y = value;
    });

  // Open the wave folder by default
  waveFolder.open();

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
    .add(uniforms.filmNoiseSpeed, "value", 0.00001, 1.0)
    .name("Noise Speed")
    .step(0.00001)
    .onChange((value) => {
      uniforms.filmNoiseSpeed.value = value;
    });

  filmNoiseFolder
    .add(uniforms.filmGrainSize, "value", 0.5, 10.0)
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
    .onChange((value) => {
      uniforms.directionalLight.value = value;
    });

  lightingFolder
    .add(uniforms.specularStrength, "value", 0, 1)
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
    .add(uniforms.lightDirection.value, "z", 0, 2)
    .name("Z")
    .onChange(() => {
      uniforms.lightDirection.value.normalize();
    });

  // Lighting folder starts closed
  // lightingFolder.open();

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    // Apply main speed multiplier to the time increment
    uniforms.time.value += 0.01 * uniforms.mainSpeed.value;
    renderer.render(scene, camera);
  }
  animate();

  // Handle window resize
  window.addEventListener("resize", () => {
    // Update canvas and renderer size
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Update camera
    camera.left = -window.innerWidth / 2;
    camera.right = window.innerWidth / 2;
    camera.top = window.innerHeight / 2;
    camera.bottom = -window.innerHeight / 2;
    camera.updateProjectionMatrix();

    // Update resolution uniform
    uniforms.resolution.value.set(window.innerWidth, window.innerHeight);

    // Update the plane geometry to match the new window size
    mesh.geometry.dispose(); // Clean up old geometry
    mesh.geometry = new THREE.PlaneGeometry(
      window.innerWidth,
      window.innerHeight,
      window.innerWidth / 10,
      window.innerHeight / 10
    );
  });

  // Add keyboard controls for zoom
  window.addEventListener("keydown", (event) => {
    // Plus key to zoom in
    if (event.key === "+" || event.key === "=") {
      cameraParams.zoom = Math.min(cameraParams.zoom + 0.1, 5);
      camera.zoom = cameraParams.zoom;
      camera.updateProjectionMatrix();
      // Update the GUI display
      for (let i = 0; i < cameraFolder.__controllers.length; i++) {
        if (cameraFolder.__controllers[i].property === "zoom") {
          cameraFolder.__controllers[i].updateDisplay();
          break;
        }
      }
    }
    // Minus key to zoom out
    if (event.key === "-" || event.key === "_") {
      cameraParams.zoom = Math.max(cameraParams.zoom - 0.1, 0.1);
      camera.zoom = cameraParams.zoom;
      camera.updateProjectionMatrix();
      // Update the GUI display
      for (let i = 0; i < cameraFolder.__controllers.length; i++) {
        if (cameraFolder.__controllers[i].property === "zoom") {
          cameraFolder.__controllers[i].updateDisplay();
          break;
        }
      }
    }
  });
}
