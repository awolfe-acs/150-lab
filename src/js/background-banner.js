import * as THREE from "three";
import GUI from "lil-gui";
import performanceDetector from "./utils/performanceDetector.js";
import { AdaptiveRenderer } from "./utils/adaptiveRenderer.js";
import { PerformanceMonitor } from "./utils/performanceMonitor.js";
import memoryManager from "./utils/memoryManager.js";
import aemModeDetector from "./utils/aemModeDetector.js";
import logger from "./utils/logger.js";

/**
 * Simplified shader background for banner
 * Just the core particle effect without ScrollTrigger, globe, or phase transitions
 * @param {Object} options - Configuration options
 * @param {boolean} options.debugGUI - Enable debug GUI controls (default: false)
 */
export async function initBannerBackground(options = {}) {
  const { debugGUI = false } = options;
  
  // Prevent multiple initializations
  if (window.bannerBackgroundInitialized) {
    logger.warn("Banner background already initialized.");
    return;
  }

  // Detect device performance tier
  const performanceTier = await performanceDetector.detect();
  const perfSettings = performanceDetector.getSettings();

  const canvas = document.getElementById("canvas-webgl");
  if (!canvas) {
    logger.warn("Banner canvas not found");
    return;
  }
  const aemMode = aemModeDetector.detect();
  const aemSettings = aemModeDetector.getSettings();
  if (aemSettings.mode === "fallback" || !aemSettings.enableBackground) {
    aemModeDetector.applyStaticBackground();
    window.bannerBackgroundInitialized = true;
    return;
  }
  const originalCanvasId = canvas.id;
  if (canvas.id !== "shaderBackground") {
    canvas.dataset.originalCanvasId = originalCanvasId;
    canvas.id = "shaderBackground";
  }
  canvas.classList.add("banner-shader-canvas");

  // Check for WebGL support
  function checkWebGLSupport() {
    try {
      const testCanvas = document.createElement("canvas");
      const webglContext = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      return !!webglContext;
    } catch (error) {
      return false;
    }
  }

  if (!checkWebGLSupport()) {
    logger.warn("WebGL not supported, showing fallback");
    canvas.style.display = "none";
    return;
  }

  // Use FULL VIEWPORT dimensions like background.js - CSS will clip it
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Scene setup
  const scene = new THREE.Scene();
  const particleScene = new THREE.Scene();

  // Camera setup - EXACTLY like background.js (full viewport, pixel-based)
  const camera = new THREE.OrthographicCamera(
    -viewportWidth / 2,
    viewportWidth / 2,
    viewportHeight / 2,
    -viewportHeight / 2,
    -1000,
    1000
  );
  camera.position.z = 1;
  camera.zoom = 1;
  camera.updateProjectionMatrix();

  // Renderer setup - FULL VIEWPORT like background.js
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'default',
  });
  
  renderer.setSize(viewportWidth, viewportHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  // Shader uniforms - mirrored from background.js initial state
  const uniforms = {
    time: { value: 0.0 },
    resolution: { value: new THREE.Vector2(viewportWidth, viewportHeight) },
    mainSpeed: { value: 0.00012 },
    waveSpeed: { value: 20.0 },
    noiseSpeed: { value: 0.45 },
    colorCycleSpeed: { value: 2.0 },
    colorCycleOffset: { value: 0.0 },
    color1: { value: new THREE.Color("#e2e2e2") },
    color2: { value: new THREE.Color("#515151") },
    colorDarkness: { value: 0.0 },
    colorWaveInfluence: { value: 0.0 },
    colorFrequencyShift: { value: 0.0 },
    colorAmplitudeEffect: { value: 0.0 },
    waveAmplitude: { value: 0.6 },
    waveFrequency: { value: 5.5 },
    waveDepth: { value: 0.2 },
    flowDirection: { value: new THREE.Vector2(-0.7, 0.82) },
    noiseScale: { value: 2.5 },
    noiseInfluence: { value: 0.0 },
    layerOffset: { value: 0.4 },
    yOffset: { value: 0.29 },
    xOffset: { value: -0.104 },
    topEdgeSoftness: { value: 1.0 },
    bottomEdgeSoftness: { value: 1.0 },
    leftEdgeSoftness: { value: 0.2 },
    rightEdgeSoftness: { value: 0.5 },
    fadeWidth: { value: 1.0 },
    leftCornerRoundness: { value: 0.8 },
    rightCornerRoundness: { value: 1.0 },
    edgeNoiseAmount: { value: 0.12 },
    edgeNoiseScale: { value: 3.0 },
    edgeDepth: { value: 0.9 },
    edgeContrast: { value: 2.0 },
    bottomWaveEnabled: { value: true },
    bottomWaveDepth: { value: 0.117 },
    bottomWaveWidth: { value: 6.475 },
    bottomWaveSpeed: { value: 0.0 },
    bottomWaveOffset: { value: -2.207 },
    filmGrainSize: { value: 1.0 },
    filmNoiseIntensity: { value: 0.088 },
    filmNoiseSpeed: { value: 0.00001 },
    filmScratchIntensity: { value: 0.0 },
    lightDirection: { value: new THREE.Vector3(0.5, 0.5, 1.0).normalize() },
    ambientLight: { value: 0.6 },
    directionalLight: { value: 0.6 },
    specularStrength: { value: 0.0 },
    shininess: { value: 128.0 },
    displacementStrength: { value: 0.0 },
    displacementScale: { value: 0.0001 },
    displacementDepth: { value: 0.0 },
  };

  // Create wave plane geometry - FULL VIEWPORT like background.js
  const planeGeometry = new THREE.PlaneGeometry(
    viewportWidth,
    viewportHeight,
    32,
    18
  );
  memoryManager.track(planeGeometry, "geometry");
  const wavePlaneScale = { x: 1.75, y: 1.5, z: 1.0 };
  
  // Shader material for wave effect - full shader copied from background.js
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
      positionWithOffset.y += yOffset * resolution.y;
      positionWithOffset.x += xOffset * resolution.x;

      // Pass normal and view position for lighting calculations
      vNormal = normalMatrix * normal;
      vec4 mvPosition = modelViewMatrix * vec4(positionWithOffset, 1.0);
      vViewPosition = -mvPosition.xyz;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(positionWithOffset, 1.0);
    }
  `;

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
    uniform bool bottomWaveEnabled;
    uniform float bottomWaveDepth;
    uniform float bottomWaveWidth;
    uniform float bottomWaveSpeed;
    uniform float bottomWaveOffset;
    varying vec2 vUv;
    varying vec3 vViewPosition;
    varying vec3 vNormal;

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    float fbm(vec2 st) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;

      for (int i = 0; i < 4; i++) {
        value += amplitude * noise(st * frequency);
        st += st * 0.2;
        frequency *= 2.0;
        amplitude *= 0.5;
      }

      return value;
    }

    float smoothInterpolation(float edge0, float edge1, float x) {
      float t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
      return t * t * (3.0 - 2.0 * t);
    }

    float getColorIntensity(vec3 color) {
      return dot(color, vec3(0.299, 0.587, 0.114));
    }

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

    float wavePattern(vec2 uv, float depth, vec3 localColor) {
      float colorIntensity = getColorIntensity(localColor);
      float colorHue = getColorHue(localColor);

      vec2 colorModifiedFlow = flowDirection;
      colorModifiedFlow += vec2(cos(colorHue * 6.28), sin(colorHue * 6.28)) * colorWaveInfluence * 0.5;

      float timeComponent = time * waveSpeed;
      float depthTimeComponent = timeComponent * (1.0 - depth * 0.3);

      vec2 flowUv = uv + colorModifiedFlow * depthTimeComponent * 0.3;

      float morphStrength = 0.05 * (1.0 - depth * 0.3);
      vec2 morphUv = flowUv;
      morphUv.x += sin(uv.y * 3.0 + depthTimeComponent * 0.7) * morphStrength;
      morphUv.y += cos(uv.x * 2.5 + depthTimeComponent * 0.6) * morphStrength;

      float frequencyMod = waveFrequency * (1.0 + (colorHue - 0.5) * colorFrequencyShift);

      float colorPhaseShift = colorIntensity * colorWaveInfluence * 3.0;

      float pulseEffect = sin(depthTimeComponent * 0.2) * 0.2 + 0.8;

      float depthFactor = 1.0 - depth * 0.5;

      float wave1 = sin(morphUv.x * frequencyMod * (4.0 + depth) + depthTimeComponent * depthFactor + colorPhaseShift) * 0.5 + 0.5;
      float wave2 = sin(morphUv.y * frequencyMod * (3.0 + depth * 0.5) + depthTimeComponent * 0.7 * depthFactor + colorPhaseShift * 0.8) * 0.5 + 0.5;
      float wave3 = sin((morphUv.x + morphUv.y) * frequencyMod * (2.0 + depth * 0.3) + depthTimeComponent * 1.3 * depthFactor + colorPhaseShift * 0.6) * 0.5 + 0.5;

      float depthOffset = depth * layerOffset;

      float rWeight = localColor.r * 0.33 + 0.22;
      float gWeight = localColor.g * 0.33 + 0.22;
      float bWeight = localColor.b * 0.33 + 0.22;
      float totalWeight = rWeight + gWeight + bWeight;
      rWeight /= totalWeight;
      gWeight /= totalWeight;
      bWeight /= totalWeight;

      float wave = wave1 * rWeight + wave2 * gWeight + wave3 * bWeight;

      float noiseTimeComponent = time * 0.1 * noiseSpeed * (1.0 - depth * 0.3);
      float noiseValue = fbm((uv + vec2(sin(timeComponent * 0.1), cos(timeComponent * 0.15))) * noiseScale + noiseTimeComponent);

      float noiseMix = noiseInfluence * depthFactor * (1.0 + colorIntensity * colorWaveInfluence);
      wave = mix(wave, noiseValue, clamp(noiseMix, 0.0, 1.0));

      float amplitudeMod = pulseEffect * (1.0 + (colorIntensity - 0.5) * colorAmplitudeEffect * depthFactor);
      wave = 0.5 + (wave - 0.5) * amplitudeMod;

      return clamp(wave, 0.0, 1.0);
    }

    vec3 calculateNormal(vec2 uv, float center, vec3 localColor) {
      float epsilon = 0.01;
      float right = wavePattern(uv + vec2(epsilon, 0.0), 0.5, localColor);
      float top = wavePattern(uv + vec2(0.0, epsilon), 0.5, localColor);

      float colorIntensity = getColorIntensity(localColor);
      float timeComponent = time * waveSpeed;
      float pulseEffect = sin(timeComponent * 0.2) * 0.2 + 0.8;
      float amplitudeMod = waveAmplitude * pulseEffect * (1.0 + (colorIntensity - 0.5) * colorAmplitudeEffect);

      vec3 dx = vec3(epsilon, 0.0, (right - center) * amplitudeMod * 1.5);
      vec3 dy = vec3(0.0, epsilon, (top - center) * amplitudeMod * 1.5);
      return normalize(cross(dx, dy));
    }

    float calculateEdgeFade(vec2 uv) {
      vec2 centeredUV = uv - 0.5;
      float verticalDist;
      if (centeredUV.y < 0.0) {
        if (bottomWaveEnabled) {
          float waveX = uv.x + bottomWaveOffset + time * bottomWaveSpeed * 0.1;
          float wave = sin(waveX * bottomWaveWidth) * bottomWaveDepth;
          float waveOffset = wave * 0.5 * edgeDepth;
          verticalDist = (abs(centeredUV.y) - waveOffset) / (0.5 * edgeDepth);
          verticalDist = max(verticalDist, 0.0);
        } else {
          verticalDist = abs(centeredUV.y) / (0.5 * edgeDepth);
        }
      } else {
        verticalDist = abs(centeredUV.y) / (0.5 * edgeDepth);
      }

      float horizontalDist = abs(centeredUV.x) / (0.5 * edgeDepth);
      float radialDist = length(centeredUV) / (0.7071 * edgeDepth);
      float cornerRoundness = (centeredUV.x < 0.0) ? leftCornerRoundness : rightCornerRoundness;
      float cornerBlend;
      if (centeredUV.y < 0.0) {
        cornerBlend = smoothstep(0.0, 1.0, pow(horizontalDist, 1.5));
      } else {
        float topFactor = smoothstep(0.3, 0.5, abs(centeredUV.y) / 0.5);
        cornerBlend = smoothstep(0.0, 1.0, pow(horizontalDist, 1.5)) * (1.0 - topFactor * cornerRoundness * 0.5);
      }

      float distanceField = mix(verticalDist, radialDist, cornerBlend * cornerRoundness);
      float edgeNoise = noise((uv + time * 0.01) * edgeNoiseScale) * edgeNoiseAmount;
      distanceField = distanceField + (edgeNoise - edgeNoiseAmount * 0.5) * 0.2;
      distanceField = pow(distanceField, edgeContrast);
      return distanceField;
    }

    float filmGrain(vec2 uv, float time) {
      float noise1 = random(uv * filmGrainSize + time * 10.0);
      float noise2 = random(uv * filmGrainSize * 2.0 - time * 15.0);
      return mix(noise1, noise2, 0.5) * 2.0 - 1.0;
    }

    float filmScratches(vec2 uv, float time) {
      float scratch = 0.0;
      for (int i = 0; i < 3; i++) {
        float seed = float(i) * 1.3;
        float xPos = fract(sin(time * 0.01 + seed) * 43758.5453);
        float height = fract(sin(time * 0.01 + seed + 1.0) * 43758.5453) * 0.5 + 0.5;
        float width = 0.002 * (sin(time * 0.1 + seed) * 0.5 + 0.5);
        if (abs(uv.x - xPos) < width && random(vec2(uv.y * 100.0, time + seed)) > 0.3) {
          scratch += 1.0 - smoothstep(0.0, width, abs(uv.x - xPos));
        }
      }
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

    vec3 applyFilmNoise(vec3 color, vec2 uv) {
      float grain = filmGrain(uv, time * filmNoiseSpeed);
      float scratches = filmScratches(uv, time * filmNoiseSpeed * 0.5);
      color += grain * filmNoiseIntensity;
      color += scratches * filmScratchIntensity;
      return color;
    }

    void main() {
      vec2 uv = vUv;

      float waveDepthFactor = waveDepth * (1.0 + sin(time * 0.3) * 0.1);
      float colorCycleTime = time + colorCycleOffset;
      float colorCyclePhase = colorCycleTime * colorCycleSpeed;
      float colorMixFactor = sin(colorCyclePhase * 0.1) * 0.1 + 0.5;

      vec3 initialColor = mix(color1, color2, colorMixFactor);
      float foregroundWave = wavePattern(uv, 0.0, initialColor);
      float middleWave = wavePattern(uv, 0.5, initialColor);
      float backgroundWave = wavePattern(uv, 1.0, initialColor);

      float foregroundColorMix = mix(0.3, 0.7, foregroundWave);
      float backgroundColorMix = mix(0.7, 0.3, backgroundWave);
      float reducedCycleInfluence = waveDepthFactor * 0.2;
      foregroundColorMix = mix(foregroundColorMix, sin(colorCyclePhase + foregroundWave * 3.14) * 0.5 + 0.5, reducedCycleInfluence);
      backgroundColorMix = mix(backgroundColorMix, sin(colorCyclePhase + backgroundWave * 3.14 + 1.57) * 0.5 + 0.5, reducedCycleInfluence);

      vec3 foregroundColor = mix(color1, color2, foregroundColorMix);
      vec3 backgroundColor = mix(color2, color1, backgroundColorMix);
      float waveSyncFactor = sin(time * waveSpeed * 0.2) * 0.5 + 0.5;
      foregroundColor += vec3(sin(colorCycleTime * 0.5) * 0.015, cos(colorCycleTime * 0.6) * 0.015, sin(colorCycleTime * 0.7) * 0.015) * foregroundWave;
      backgroundColor += vec3(cos(colorCycleTime * 0.4) * 0.015, sin(colorCycleTime * 0.5) * 0.015, cos(colorCycleTime * 0.6) * 0.015) * backgroundWave;

      float depthBlendRange = 0.3 + waveDepthFactor * 0.4;
      float depthBlendMin = 0.5 - depthBlendRange * 0.5;
      float depthBlendMax = 0.5 + depthBlendRange * 0.5;
      float depthBlend = smoothInterpolation(depthBlendMin, depthBlendMax, middleWave);
      depthBlend = mix(depthBlend, middleWave, waveDepthFactor * 0.5);
      vec3 baseColor = mix(backgroundColor, foregroundColor, depthBlend);

      float colorShiftAmount = waveDepthFactor * 0.2;
      vec3 shiftedColor = mix(baseColor,
                             vec3(baseColor.r * (1.0 + middleWave * 0.1),
                                  baseColor.g * (1.0 + foregroundWave * 0.1),
                                  baseColor.b * (1.0 + backgroundWave * 0.1)),
                             colorShiftAmount);
      baseColor = shiftedColor;

      float darknessVariation = colorDarkness * (1.0 + sin(time * 0.2) * 0.025 + middleWave * 0.05);
      baseColor = mix(baseColor, vec3(0.0, 0.0, 0.0), darknessVariation);

      vec3 waveNormal = calculateNormal(uv, middleWave, initialColor);
      float normalBlendFactor = waveDepthFactor * (0.5 + middleWave * 0.5);
      vec3 modifiedWaveNormal = waveNormal;
      modifiedWaveNormal.xy += vec2(sin(foregroundWave * 6.28) * 0.1, cos(backgroundWave * 6.28) * 0.1) * waveDepthFactor;
      modifiedWaveNormal = normalize(modifiedWaveNormal);
      vec3 normal = normalize(mix(vNormal, modifiedWaveNormal, normalBlendFactor));

      vec3 viewDir = normalize(vViewPosition);
      vec3 lightDir = normalize(lightDirection);
      lightDir.x += sin(time * 0.2) * 0.025 * middleWave;
      lightDir.y += cos(time * 0.25) * 0.025 * middleWave;
      float lightRotation = (foregroundWave - 0.5) * waveDepthFactor * 0.2;
      // Small-angle optimization: cos(x)≈1, sin(x)≈x for |x| < 0.2
      vec3 rotatedLightDir = vec3(
          lightDir.x - lightDir.y * lightRotation,
          lightDir.x * lightRotation + lightDir.y,
          lightDir.z
      );
      lightDir = normalize(rotatedLightDir);

      vec3 ambientVariation = vec3(sin(time * 0.3) * 0.015, cos(time * 0.4) * 0.015, sin(time * 0.5) * 0.015) * middleWave;
      ambientVariation += (foregroundColor - backgroundColor) * foregroundWave * 0.05 * waveDepthFactor;
      vec3 ambientColor = baseColor * (1.0 + ambientVariation);
      vec3 ambient = ambientLight * ambientColor;

      float diff = max(dot(normal, lightDir), 0.0);
      diff = pow(diff, 1.2 + foregroundWave * 0.3);
      diff *= 1.0 + middleWave * waveDepthFactor * 0.5;
      vec3 diffuseColor = baseColor;
      diffuseColor = mix(diffuseColor, foregroundColor, foregroundWave * waveDepthFactor * 0.2);
      vec3 diffuse = directionalLight * diff * diffuseColor;

      vec3 halfwayDir = normalize(lightDir + viewDir);
      float specPower = shininess * (1.0 + foregroundWave * waveDepthFactor * 2.0);
      float spec = pow(max(dot(normal, halfwayDir), 0.0), specPower);
      float specularVariation = 1.0 + sin(time * 0.5) * 0.1 * foregroundWave;
      vec3 specularColor = mix(vec3(1.0), foregroundColor * 1.5, foregroundWave * waveDepthFactor * 0.3);
      vec3 specular = specularStrength * specularVariation * spec * specularColor;

      vec3 color = ambient + diffuse + specular;

      float highlightIntensity = smoothInterpolation(0.4, 0.6, foregroundWave) * waveDepthFactor * (1.0 + sin(time * 0.4) * 0.1);
      vec3 highlightColor = mix(vec3(0.1, 0.1, 0.15), mix(color1, color2, foregroundWave) * 0.5, waveDepthFactor * 0.5);
      highlightColor = mix(highlightColor, foregroundColor * 0.7, middleWave * 0.5);
      color += highlightColor * highlightIntensity;

      color = applyFilmNoise(color, uv);

      float distanceField = calculateEdgeFade(uv);
      float alpha = 1.0;
      if (uv.y >= 0.5) {
        float normalizedDist = (distanceField - 0.5) / 0.5;
        alpha *= 1.0 - smoothInterpolation(1.0 - topEdgeSoftness, 1.0, normalizedDist);
      } else {
        float normalizedDist = (distanceField - 0.5) / 0.5;
        alpha *= 1.0 - smoothInterpolation(1.0 - bottomEdgeSoftness, 1.0, normalizedDist);
      }

      if (uv.x >= 0.5) {
        float normalizedDist = (abs(uv.x - 0.5) / 0.5) / edgeDepth;
        alpha *= 1.0 - smoothInterpolation(1.0 - rightEdgeSoftness, 1.0, normalizedDist);
      } else {
        float normalizedDist = (abs(uv.x - 0.5) / 0.5) / edgeDepth;
        alpha *= 1.0 - smoothInterpolation(1.0 - leftEdgeSoftness, 1.0, normalizedDist);
      }

      float edgeNoiseValue = noise(uv * noiseScale * 2.0 + time * 0.05 * noiseSpeed);
      alpha *= 0.95 + edgeNoiseValue * 0.05;

      gl_FragColor = vec4(color, alpha);
    }
  `;

  const waveMaterial = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    side: THREE.DoubleSide,
  });
  memoryManager.track(waveMaterial, "material");

  const wavePlane = new THREE.Mesh(planeGeometry, waveMaterial);
  wavePlane.scale.set(wavePlaneScale.x, wavePlaneScale.y, wavePlaneScale.z);
  memoryManager.track(wavePlane, "mesh");
  scene.add(wavePlane);

  // Create particles - EXACTLY like background.js with full viewport distribution
  const particleCount = perfSettings.particleCount ?? 300;
  const particles = new Float32Array(particleCount * 3);
  const particleVelocities = new Float32Array(particleCount * 3);
  const particleColors = new Float32Array(particleCount * 3);

  // Use full viewport dimensions for particle distribution
  let horizontalDistribution = viewportWidth * 1.2;
  let verticalDistribution = viewportHeight * 1.8;

  const baseParticleColor = new THREE.Color("#25e5ff");
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    particles[i3] = (Math.random() - 0.5) * horizontalDistribution;
    particles[i3 + 1] = (Math.random() - 0.5) * verticalDistribution;
    particles[i3 + 2] = (Math.random() - 0.5) * 100;

    particleVelocities[i3] = (Math.random() - 0.5) * 0.4;
    particleVelocities[i3 + 1] = (Math.random() - 0.5) * 0.4;
    particleVelocities[i3 + 2] = (Math.random() - 0.5) * 0.2;

    const brightness = 0.75 + Math.random() * 0.25;
    particleColors[i3] = baseParticleColor.r * brightness;
    particleColors[i3 + 1] = baseParticleColor.g * brightness;
    particleColors[i3 + 2] = baseParticleColor.b * brightness;
  }

  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute("position", new THREE.BufferAttribute(particles, 3));
  particleGeometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));
  memoryManager.track(particleGeometry, "geometry");

  // Create sparkle texture
  const canvas2d = document.createElement("canvas");
  canvas2d.width = 32;
  canvas2d.height = 32;
  const ctx = canvas2d.getContext("2d");
  
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.2, "rgba(255,255,255,0.8)");
  gradient.addColorStop(0.4, "rgba(255,255,255,0.3)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);
  
  const particleTexture = new THREE.CanvasTexture(canvas2d);
  memoryManager.track(particleTexture, "texture");

  const customParticleMaterial = new THREE.PointsMaterial({
    size: 4, // Much larger like background.js
    vertexColors: true,
    map: particleTexture,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: true, // Enable depth test like background.js
    sizeAttenuation: true,
  });
  memoryManager.track(customParticleMaterial, "material");

  const particleSystem = new THREE.Points(particleGeometry, customParticleMaterial);
  particleSystem.visible = false;
  particleScene.add(particleSystem);

  let twinkleTime = 0;
  function animateParticles(deltaTime) {
    const dt = deltaTime ? deltaTime / 16.666 : 1;
    const positions = particleGeometry.attributes.position.array;
    const colors = particleGeometry.attributes.color.array;
    const halfHorizontal = horizontalDistribution / 2;
    const halfVertical = verticalDistribution / 2;

    twinkleTime += 0.012 * dt;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      positions[i3] += particleVelocities[i3] * dt * 12;
      positions[i3 + 1] += particleVelocities[i3 + 1] * dt * 12;
      positions[i3 + 2] += particleVelocities[i3 + 2] * dt * 4;

      if (positions[i3] > halfHorizontal) {
        positions[i3] -= horizontalDistribution;
      } else if (positions[i3] < -halfHorizontal) {
        positions[i3] += horizontalDistribution;
      }

      if (positions[i3 + 1] > halfVertical) {
        positions[i3 + 1] -= verticalDistribution;
      } else if (positions[i3 + 1] < -halfVertical) {
        positions[i3 + 1] += verticalDistribution;
      }

      const twinkle = 0.75 + Math.sin(twinkleTime * 60 + i * 0.35) * 0.25;
      colors[i3] = baseParticleColor.r * twinkle;
      colors[i3 + 1] = baseParticleColor.g * twinkle;
      colors[i3 + 2] = baseParticleColor.b * twinkle;
    }

    particleGeometry.attributes.position.needsUpdate = true;
    particleGeometry.attributes.color.needsUpdate = true;
  }

  // Initialize Performance Monitor
  const perfMonitor = new PerformanceMonitor(renderer);

  // Main animation loop - EXACTLY like background.js uses AdaptiveRenderer
  function animate(deltaTime) {
    uniforms.time.value += uniforms.mainSpeed.value;
    if (Math.floor(uniforms.time.value * 1000) % 60 === 0) {

    }

    animateParticles(deltaTime);

    renderer.autoClear = true;
    renderer.render(scene, camera);
    renderer.autoClear = false;
    renderer.render(particleScene, camera);

    perfMonitor.update(renderer);
  }

  // Handle window resize - use full viewport like background.js
  function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
  
    // Update renderer
    renderer.setSize(width, height);
    
    // Update camera
    camera.left = -width / 2;
    camera.right = width / 2;
    camera.top = height / 2;
    camera.bottom = -height / 2;
    camera.updateProjectionMatrix();
    
    // Update resolution uniform
    uniforms.resolution.value.set(width, height);
    
    // Recreate plane geometry
    wavePlane.geometry.dispose();
    wavePlane.geometry = new THREE.PlaneGeometry(
      width,
      height,
      32,
      18
    );
    wavePlane.scale.set(wavePlaneScale.x, wavePlaneScale.y, wavePlaneScale.z);

    horizontalDistribution = width * 1.2;
    verticalDistribution = height * 1.8;

    const positions = particleGeometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = THREE.MathUtils.clamp(positions[i3], -horizontalDistribution / 2, horizontalDistribution / 2);
      positions[i3 + 1] = THREE.MathUtils.clamp(positions[i3 + 1], -verticalDistribution / 2, verticalDistribution / 2);
    }
    particleGeometry.attributes.position.needsUpdate = true;
  }

  window.addEventListener("resize", onWindowResize);

  // Cleanup on page unload
  window.addEventListener("beforeunload", () => {
    particleGeometry.dispose();
    customParticleMaterial.dispose();
    particleTexture.dispose();
    waveMaterial.dispose();
    planeGeometry.dispose();
    renderer.dispose();
    memoryManager.disposeAll();
  });
  
  // ===== DAT.GUI CONTROLS FOR DEBUGGING (only if debugGUI flag is true) =====
  if (debugGUI) {
    logger.log("[Banner] Debug GUI enabled");
    
    // Inject lil-gui CSS
    const guiStyle = document.createElement('style');
    guiStyle.textContent = `.lil-gui{--background-color:#1f1f1f;--text-color:#ebebeb;--title-background-color:#111;--title-text-color:#ebebeb;--widget-color:#424242;--hover-color:#4f4f4f;--focus-color:#595959;--number-color:#2cc9ff;--string-color:#a2db3c;--font-size:11px;--input-font-size:11px;--font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;--font-family-mono:Menlo,Monaco,Consolas,"Droid Sans Mono",monospace;--padding:4px;--spacing:4px;--widget-height:20px;--title-height:calc(var(--widget-height) + var(--spacing)*1.25);--name-width:45%;--slider-knob-width:2px;--slider-input-width:27%;--color-input-width:27%;--slider-input-min-width:45px;--color-input-min-width:45px;--folder-indent:7px;--widget-padding:0 0 0 3px;--widget-border-radius:2px;--checkbox-size:calc(var(--widget-height)*0.75);--scrollbar-width:5px;color:var(--text-color);font-family:var(--font-family);font-size:var(--font-size);font-style:normal;font-weight:400;line-height:1;text-align:left;touch-action:manipulation;user-select:none;-webkit-user-select:none}.lil-gui,.lil-gui *{box-sizing:border-box;margin:0;padding:0}.lil-gui.lil-root{background:var(--background-color);display:flex;flex-direction:column;width:var(--width,245px)}.lil-gui.lil-root>.lil-title{background:var(--title-background-color);color:var(--title-text-color)}.lil-gui.lil-root>.lil-children{overflow-x:hidden;overflow-y:auto}.lil-gui.lil-root>.lil-children::-webkit-scrollbar{background:var(--background-color);height:var(--scrollbar-width);width:var(--scrollbar-width)}.lil-gui.lil-root>.lil-children::-webkit-scrollbar-thumb{background:var(--focus-color);border-radius:var(--scrollbar-width)}.lil-gui.lil-force-touch-styles,.lil-gui.lil-force-touch-styles .lil-gui{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}.lil-gui.autoPlace,.lil-gui.lil-auto-place{max-height:100%;position:fixed;right:15px;top:0;z-index:1001}.lil-controller{align-items:center;display:flex;margin:var(--spacing) 0;padding:0 var(--padding)}.lil-controller.lil-disabled{opacity:.5}.lil-controller.lil-disabled,.lil-controller.lil-disabled *{pointer-events:none!important}.lil-controller>.lil-name{flex-shrink:0;line-height:var(--widget-height);min-width:var(--name-width);padding-right:var(--spacing);white-space:pre}.lil-controller .lil-widget{align-items:center;display:flex;min-height:var(--widget-height);position:relative;width:100%}.lil-controller.lil-string input{color:var(--string-color)}.lil-controller.lil-boolean{cursor:pointer}.lil-controller.lil-color .lil-display{border-radius:var(--widget-border-radius);height:var(--widget-height);position:relative;width:100%}.lil-controller.lil-color input[type=color]{cursor:pointer;height:100%;opacity:0;width:100%}.lil-controller.lil-color input[type=text]{flex-shrink:0;font-family:var(--font-family-mono);margin-left:var(--spacing);min-width:var(--color-input-min-width);width:var(--color-input-width)}.lil-controller.lil-option select{max-width:100%;opacity:0;position:absolute;width:100%}.lil-controller.lil-option .lil-display{background:var(--widget-color);border-radius:var(--widget-border-radius);height:var(--widget-height);line-height:var(--widget-height);max-width:100%;overflow:hidden;padding-left:.55em;padding-right:1.75em;pointer-events:none;position:relative;word-break:break-all}.lil-controller.lil-option .lil-display.lil-active{background:var(--focus-color)}.lil-controller.lil-option .lil-display:after{bottom:0;content:"↕";font-family:lil-gui;padding-right:.375em;position:absolute;right:0;top:0}.lil-controller.lil-option .lil-widget,.lil-controller.lil-option select{cursor:pointer}.lil-controller.lil-number input{color:var(--number-color)}.lil-controller.lil-number.lil-has-slider input{flex-shrink:0;margin-left:var(--spacing);min-width:var(--slider-input-min-width);width:var(--slider-input-width)}.lil-controller.lil-number .lil-slider{background:var(--widget-color);border-radius:var(--widget-border-radius);cursor:ew-resize;height:var(--widget-height);overflow:hidden;padding-right:var(--slider-knob-width);touch-action:pan-y;width:100%}.lil-controller.lil-number .lil-slider.lil-active{background:var(--focus-color)}.lil-controller.lil-number .lil-slider.lil-active .lil-fill{opacity:.95}.lil-controller.lil-number .lil-fill{border-right:var(--slider-knob-width) solid var(--number-color);box-sizing:content-box;height:100%}.lil-dragging .lil-gui{--hover-color:var(--widget-color)}.lil-dragging *{cursor:ew-resize!important}.lil-dragging.lil-vertical *{cursor:ns-resize!important}.lil-gui .lil-title{text-decoration-skip:objects;background:none;font-weight:600;height:var(--title-height);padding:0 var(--padding);text-align:left;width:100%}.lil-gui .lil-title:before{content:"▾";display:inline-block;font-family:lil-gui;padding-right:2px}.lil-gui .lil-title:active{background:var(--title-background-color);opacity:.75}.lil-gui.lil-root>.lil-title:focus{text-decoration:none!important}.lil-gui.lil-closed>.lil-title:before{content:"▸"}.lil-gui.lil-closed>.lil-children{opacity:0;transform:translateY(-7px)}.lil-gui.lil-closed:not(.lil-transition)>.lil-children{display:none}.lil-gui.lil-transition>.lil-children{overflow:hidden;pointer-events:none;transition-duration:.3s;transition-property:height,opacity,transform;transition-timing-function:cubic-bezier(.2,.6,.35,1)}.lil-gui .lil-children:empty:before{content:"Empty";display:block;font-style:italic;height:var(--widget-height);line-height:var(--widget-height);margin:var(--spacing) 0;opacity:.5;padding:0 var(--padding)}.lil-gui.lil-root>.lil-children>.lil-gui>.lil-title{border-width:0;border-bottom:1px solid var(--widget-color);border-left:0 solid var(--widget-color);border-right:0 solid var(--widget-color);border-top:1px solid var(--widget-color);transition:border-color .3s}.lil-gui.lil-root>.lil-children>.lil-gui.lil-closed>.lil-title{border-bottom-color:transparent}.lil-gui+.lil-controller{border-top:1px solid var(--widget-color);margin-top:0;padding-top:var(--spacing)}.lil-gui .lil-gui .lil-gui>.lil-title{border:none}.lil-gui .lil-gui .lil-gui>.lil-children{border:none;border-left:2px solid var(--widget-color);margin-left:var(--folder-indent)}.lil-gui .lil-gui .lil-controller{border:none}.lil-gui button,.lil-gui input,.lil-gui label{-webkit-tap-highlight-color:transparent}.lil-gui input{background:var(--widget-color);border:0;border-radius:var(--widget-border-radius);color:var(--text-color);font-family:var(--font-family);font-size:var(--input-font-size);height:var(--widget-height);outline:none;width:100%}.lil-gui input:disabled{opacity:1}.lil-gui input[type=number],.lil-gui input[type=text]{-moz-appearance:textfield;padding:var(--widget-padding)}.lil-gui input[type=number]:focus,.lil-gui input[type=text]:focus{background:var(--focus-color)}.lil-gui input[type=checkbox]{appearance:none;border-radius:var(--widget-border-radius);cursor:pointer;height:var(--checkbox-size);text-align:center;width:var(--checkbox-size)}.lil-gui input[type=checkbox]:checked:before{content:"✓";font-family:lil-gui;font-size:var(--checkbox-size);line-height:var(--checkbox-size)}.lil-gui button{border:none;color:var(--text-color);cursor:pointer;font-family:var(--font-family);font-size:var(--font-size);outline:none;width:100%}.lil-gui .lil-controller button{background:var(--widget-color);border-radius:var(--widget-border-radius);height:var(--widget-height);text-transform:none}.lil-gui .lil-controller button:active{background:var(--focus-color)}@font-face{font-family:lil-gui;src:url("data:application/font-woff2;charset=utf-8;base64,d09GMgABAAAAAALkAAsAAAAABtQAAAKVAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHFQGYACDMgqBBIEbATYCJAMUCwwABCAFhAoHgQQbHAbIDiUFEYVARAAAYQTVWNmz9MxhEgodq49wYRUFKE8GWNiUBxI2LBRaVnc51U83Gmhs0Q7JXWMiz5eteLwrKwuxHO8VFxUX9UpZBs6pa5ABRwHA+t3UxUnH20EvVknRerzQgX6xC/GH6ZUvTcAjAv122dF28OTqCXrPuyaDER30YBA1xnkVutDDo4oCi71Ca7rrV9xS8dZHbPHefsuwIyCpmT7j+MnjAH5X3984UZoFFuJ0yiZ4XEJFxjagEBeqs+e1iyK8Xf/nOuwF+vVK0ur765+vf7txotUi0m3N0m/84RGSrBCNrh8Ee5GjODjF4gnWP+dJrH/Lk9k4oT6d+gr6g/wssA2j64JJGP6cmx554vUZnpZfn6ZfX2bMwPPrlANsB86/DiHjhl0OP+c87+gaJo/gY084s3HoYL/ZkWHTRfBXvvoHnnkHvngKun4KBE/ede7tvq3/vQOxDXB1/fdNz6XbPdcr0Vhpojj9dG+owuSKFsslCi1tgEjirjXdwMiov2EioadxmqTHUCIwo8NgQaeIasAi0fTYSPTbSmwbMOFduyh9wvBrESGY0MtgRjtgQR8Q1bRPohn2UoCRZf9wyYANMXFeJTysqAe0I4mrherOekFdKMrYvJjLvOIUM9SuwYB5DVZUwwVjJJOaUnZCmcEkIZZrKqNvRGRMvmFZsmhP4VMKCSXBhSqUBxgMS7h0cZvEd71AWkEhGWaeMFcNnpqyJkyXgYL7PQ1MoSq0wDAkRtJIijkZSmqYTiSImfLiSWXIZwhRh3Rug2X0kk1Dgj+Iu43u5p98ghopcpSo0Uyc8SnjlYX59WUeaMoDqmVD2TOWD9a4pCRAzf2ECgwGcrHjPOWY9bNxq/OL3I/QjwEAAAA=") format("woff2")}@media (pointer:coarse){.lil-gui.lil-allow-touch-styles,.lil-gui.lil-allow-touch-styles .lil-gui{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}}@media (hover:hover){.lil-controller.lil-color .lil-display:hover:before{border:1px solid #fff9;border-radius:var(--widget-border-radius);bottom:0;content:" ";display:block;left:0;position:absolute;right:0;top:0}.lil-controller.lil-option .lil-display.lil-focus{background:var(--focus-color)}.lil-controller.lil-number .lil-slider:hover,.lil-controller.lil-option .lil-widget:hover .lil-display{background:var(--hover-color)}body:not(.lil-dragging) .lil-gui .lil-title:hover{background:var(--title-background-color);opacity:.85}.lil-gui .lil-title:focus{text-decoration:underline var(--focus-color)}.lil-gui input:hover{background:var(--hover-color)}.lil-gui input:active{background:var(--focus-color)}.lil-gui input[type=checkbox]:focus{box-shadow:inset 0 0 0 1px var(--focus-color)}.lil-gui .lil-controller button:hover{background:var(--hover-color)}.lil-gui .lil-controller button:focus{box-shadow:inset 0 0 0 1px var(--focus-color)}}`;
    document.head.appendChild(guiStyle);
    
    const gui = new GUI();
    gui.title("Banner Background Debug");
    
    // Camera controls
    const cameraFolder = gui.addFolder("Camera");
    cameraFolder.add(camera.position, "x", -10000, 10000, 1).name("Position X");
    cameraFolder.add(camera.position, "y", -10000, 10000, 1).name("Position Y");
    cameraFolder.add(camera.position, "z", -1000, 1000, 1).name("Position Z");
    cameraFolder.add(camera, "zoom", 0.001, 100, 0.001).name("Zoom").onChange(() => camera.updateProjectionMatrix());
    cameraFolder.open();
  
    // Camera frustum controls
    const frustumFolder = gui.addFolder("Camera Frustum");
    const frustumParams = {
      left: camera.left,
      right: camera.right,
      top: camera.top,
      bottom: camera.bottom,
    };
    frustumFolder.add(frustumParams, "left", -10000, 10000, 1).name("Left").onChange((v) => {
      camera.left = v;
      camera.updateProjectionMatrix();
    });
    frustumFolder.add(frustumParams, "right", -10000, 10000, 1).name("Right").onChange((v) => {
      camera.right = v;
      camera.updateProjectionMatrix();
    });
    frustumFolder.add(frustumParams, "top", -10000, 10000, 1).name("Top").onChange((v) => {
      camera.top = v;
      camera.updateProjectionMatrix();
    });
    frustumFolder.add(frustumParams, "bottom", -10000, 10000, 1).name("Bottom").onChange((v) => {
      camera.bottom = v;
      camera.updateProjectionMatrix();
    });
    frustumFolder.open();
  
    // Plane controls
    const planeFolder = gui.addFolder("Wave Plane");
    planeFolder.add(wavePlane.position, "x", -10000, 10000, 1).name("Position X");
    planeFolder.add(wavePlane.position, "y", -10000, 10000, 1).name("Position Y");
    planeFolder.add(wavePlane.position, "z", -10000, 10000, 1).name("Position Z");
    planeFolder.add(wavePlane.scale, "x", 0.001, 1000, 0.01).name("Scale X");
    planeFolder.add(wavePlane.scale, "y", 0.001, 1000, 0.01).name("Scale Y");
    planeFolder.add(wavePlane.scale, "z", 0.001, 1000, 0.01).name("Scale Z");
    planeFolder.open();
  
    // Shader uniforms
    const shaderFolder = gui.addFolder("Shader");
    shaderFolder.add(uniforms.waveSpeed, "value", 0, 20, 0.1).name("Wave Speed");
    shaderFolder.add(uniforms.waveAmplitude, "value", 0, 10, 0.1).name("Wave Amplitude");
    shaderFolder.add(uniforms.waveFrequency, "value", 0, 50, 0.1).name("Wave Frequency");
    shaderFolder.add(uniforms.waveDepth, "value", 0, 1, 0.01).name("Wave Depth");
    shaderFolder.add(uniforms.filmNoiseIntensity, "value", 0, 0.5, 0.001).name("Film Grain Intensity");
    shaderFolder.add(uniforms.filmGrainSize, "value", 0.005, 1, 0.001).name("Film Grain Size");
  
    // Particle controls
    const particleFolder = gui.addFolder("Particles");
    particleFolder.add(customParticleMaterial, "size", 0, 10, 0.01).name("Particle Size");
    particleFolder.add(customParticleMaterial, "opacity", 0, 1, 0.01).name("Particle Opacity");
    particleFolder.add(particleSystem, "visible").name("Show Particles");
  
    // Renderer info
    const infoFolder = gui.addFolder("Info (Read-Only)");
    const info = {
      viewportWidth: viewportWidth,
      viewportHeight: viewportHeight,
      planeWidth: planeGeometry.parameters.width,
      planeHeight: planeGeometry.parameters.height,
    };
    infoFolder.add(info, "viewportWidth").name("Viewport Width").disable();
    infoFolder.add(info, "viewportHeight").name("Viewport Height").disable();
    infoFolder.add(info, "planeWidth").name("Plane Width").disable();
    infoFolder.add(info, "planeHeight").name("Plane Height").disable();
    infoFolder.open();
  } else {

  }
  
  // Initialize adaptive renderer with performance-based FPS - EXACTLY like background.js
  const adaptiveRenderer = new AdaptiveRenderer((deltaTime) => {
    animate(deltaTime);
  }, perfSettings.targetFPS);
  
  adaptiveRenderer.start();

  window.bannerBackgroundInitialized = true;
}

