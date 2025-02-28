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
    zoom: 1.25,
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
    mainSpeed: { value: 0.03 }, // Overall animation speed multiplier
    waveSpeed: { value: 8.0 }, // Controls how fast the waves animate
    noiseSpeed: { value: 1.8 }, // Speed of the noise animation
    colorCycleSpeed: { value: 8.0 }, // Speed of color cycling/transitions
    //Color parameters
    color1: { value: new THREE.Color(0x32c2d6) },
    color2: { value: new THREE.Color(0x004199) },
    colorDarkness: { value: 0.0 }, // Controls overall darkness of colors
    colorWaveInfluence: { value: 0.4 }, // Controls how much colors affect wave patterns
    colorFrequencyShift: { value: 0.3 }, // Controls how colors shift wave frequencies
    colorAmplitudeEffect: { value: 0.5 }, // Controls how colors affect wave amplitude
    //Wave parameters
    waveAmplitude: { value: 3.0 }, // Controls wave height
    waveFrequency: { value: 2.2 }, // Controls wave frequency
    waveDepth: { value: 0.9 }, // Controls perceived depth of waves
    flowDirection: { value: new THREE.Vector2(-0.7, 0.82) }, // Controls the direction of wave movement
    noiseScale: { value: 2.5 }, // Scale of noise pattern
    noiseInfluence: { value: 0.0 }, // How much noise affects the pattern
    layerOffset: { value: 0.4 }, // Offset between color layers for depth
    //Appearance parameters
    yOffset: { value: 0.145 },
    topEdgeSoftness: { value: 1.0 }, // Controls the softness of the top edge fade
    bottomEdgeSoftness: { value: 1.0 }, // Controls the softness of the bottom edge fade
    leftEdgeSoftness: { value: 0.2 }, // Controls the softness of the left edge fade
    rightEdgeSoftness: { value: 0.12 }, // Controls the softness of the right edge fade
    fadeWidth: { value: 1.0 }, // Controls the width of the fade area
    leftCornerRoundness: { value: 0.8 }, // Controls how much the fade rounds into left corners
    rightCornerRoundness: { value: 1.0 }, // Controls how much the fade rounds into right corners
    edgeNoiseAmount: { value: 0.12 }, // Controls the amount of noise on the edges
    edgeNoiseScale: { value: 3.0 }, // Controls the scale of noise on the edges
    edgeDepth: { value: 0.86 }, // Controls how far the burn-in effect extends into the canvas
    edgeContrast: { value: 2.0 }, // Controls the contrast/sharpness of the edge transition
    // Bottom wave edge parameters
    bottomWaveEnabled: { value: true }, // Enable/disable the bottom wave edge
    bottomWaveDepth: { value: 0.108 }, // Controls the depth/amplitude of the bottom wave
    bottomWaveWidth: { value: 6.664 }, // Controls the width/frequency of the bottom wave
    bottomWaveSpeed: { value: 1.78 }, // Controls the speed of the bottom wave animation
    bottomWaveOffset: { value: 1.35 }, // Controls the horizontal offset of the bottom wave
    // Film noise parameters
    filmNoiseIntensity: { value: 0.1 }, // Controls the intensity of the film noise
    filmNoiseSpeed: { value: 0.00001 }, // Controls the speed of the film noise animation
    filmGrainSize: { value: 10.0 }, // Controls the size of the film grain
    filmScratchIntensity: { value: 0.0 }, // Controls the intensity of film scratches
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
    xOffset: { value: 0.0 },
  };

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
    uniform float noiseSpeed;
    uniform float waveSpeed;
    uniform float filmNoiseIntensity;
    uniform float filmNoiseSpeed;
    uniform float filmGrainSize;
    uniform float filmScratchIntensity;
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
      
      // Add color cycling effect integrated with the morphing
      // Make color cycling directly respond to depth for better synergy
      float colorCycleComponent = time * colorCycleSpeed * (1.0 - depth * 0.3);
      
      // Create pulsing amplitude effect over time for more organic movement
      // Make the pulse effect respond to depth for better synergy
      float pulseEffect = sin(depthTimeComponent * 0.2) * 0.2 + 0.8;
      
      // Generate waves with more organic variation
      // Make the waves directly respond to the depth parameter for better depth-color synergy
      float depthFactor = 1.0 - depth * 0.5; // Higher value for foreground
      
      // Use depth to influence wave frequency and phase for better synergy
      // Create a more direct relationship between wave height and color transitions
      float wave1 = sin(morphUv.x * frequencyMod * (4.0 + depth) + colorCycleComponent * depthFactor + colorPhaseShift) * 0.5 + 0.5;
      float wave2 = sin(morphUv.y * frequencyMod * (3.0 + depth * 0.5) + colorCycleComponent * 0.7 * depthFactor + colorPhaseShift * 0.8) * 0.5 + 0.5;
      float wave3 = sin((morphUv.x + morphUv.y) * frequencyMod * (2.0 + depth * 0.3) + colorCycleComponent * 1.3 * depthFactor + colorPhaseShift * 0.6) * 0.5 + 0.5;
      
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
      // Create a time-varying color mix for more dynamic effects
      // Make the color mix factor respond to the wave depth for better synergy
      float waveDepthFactor = waveDepth * (1.0 + sin(time * 0.3) * 0.1);
      
      // Create a more dynamic color mix that's influenced by the wave depth
      float colorCyclePhase = time * colorCycleSpeed;
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
      foregroundColorMix = mix(foregroundColorMix, sin(colorCyclePhase + foregroundWave * 3.14) * 0.5 + 0.5, waveDepthFactor * 0.5);
      backgroundColorMix = mix(backgroundColorMix, sin(colorCyclePhase + backgroundWave * 3.14 + 1.57) * 0.5 + 0.5, waveDepthFactor * 0.5);
      
      vec3 foregroundColor = mix(color1, color2, foregroundColorMix);
      vec3 backgroundColor = mix(color2, color1, backgroundColorMix);
      
      // Add subtle color variations that are synchronized with the wave patterns
      float waveSyncFactor = sin(time * waveSpeed * 0.2) * 0.5 + 0.5;
      foregroundColor += vec3(sin(time * 0.5) * 0.03, cos(time * 0.6) * 0.03, sin(time * 0.7) * 0.03) * foregroundWave;
      backgroundColor += vec3(cos(time * 0.4) * 0.03, sin(time * 0.5) * 0.03, cos(time * 0.6) * 0.03) * backgroundWave;
      
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
      // Synchronize the darkness variation with the wave pattern
      float darknessVariation = colorDarkness * (1.0 + sin(time * 0.2) * 0.05 + middleWave * 0.1);
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
      // Synchronize light movement with wave patterns for better synergy
      // Make the light direction respond directly to the wave pattern
      lightDir.x += sin(time * 0.2) * 0.05 * middleWave;
      lightDir.y += cos(time * 0.25) * 0.05 * middleWave;
      // Add a subtle rotation to the light direction based on the wave pattern
      float lightRotation = (foregroundWave - 0.5) * waveDepthFactor * 0.2;
      vec3 rotatedLightDir = vec3(
          lightDir.x * cos(lightRotation) - lightDir.y * sin(lightRotation),
          lightDir.x * sin(lightRotation) + lightDir.y * cos(lightRotation),
          lightDir.z
      );
      lightDir = normalize(rotatedLightDir);
      
      // Ambient lighting with subtle color variation
      // Make the ambient color variation respond to the wave pattern
      // Create a more dynamic ambient color that's influenced by the wave pattern
      vec3 ambientVariation = vec3(sin(time * 0.3) * 0.03, cos(time * 0.4) * 0.03, sin(time * 0.5) * 0.03) * middleWave;
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
      // Synchronize specular highlights with wave patterns
      float specularVariation = 1.0 + sin(time * 0.5) * 0.2 * foregroundWave;
      // Add color to the specular highlights based on the wave pattern
      vec3 specularColor = mix(vec3(1.0), foregroundColor * 1.5, foregroundWave * waveDepthFactor * 0.3);
      vec3 specular = specularStrength * specularVariation * spec * specularColor;
      
      // Combine lighting components
      vec3 color = ambient + diffuse + specular;
      
      // Add highlights based on wave height for extra depth with more variation
      // Make highlights directly respond to the wave pattern for better synergy
      float highlightIntensity = smoothInterpolation(0.4, 0.6, foregroundWave) * waveDepthFactor * (1.0 + sin(time * 0.4) * 0.2);
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
    .add(uniforms.waveSpeed, "value", 0, 25)
    .name("Wave Speed")
    .onChange((value) => {
      uniforms.waveSpeed.value = value;
    });

  speedFolder
    .add(uniforms.noiseSpeed, "value", 0, 25)
    .name("Noise Speed")
    .onChange((value) => {
      uniforms.noiseSpeed.value = value;
    });

  speedFolder
    .add(uniforms.colorCycleSpeed, "value", 0, 25)
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

  // Open the flow folder by default to make it more visible
  flowFolder.open();

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
    });

  bottomWaveFolder
    .add(uniforms.bottomWaveDepth, "value", 0.0, 0.5)
    .name("Wave Depth")
    .step(0.001)
    .onChange((value) => {
      uniforms.bottomWaveDepth.value = value;
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

  // Open the bottom wave folder by default
  bottomWaveFolder.open();

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
