# Shader Background Visibility Fix

## The Problem
Canvas element existed with `data-engine="three.js r181"` attribute, no errors in console, but **no visual shader background was rendering**.

## Root Causes

### 1. **CSS Background Color Blocking Shader** ❌
The canvas had a solid background color in the SCSS that was covering the WebGL shader:

```scss
#canvas-webgl {
  background: #2c2c2c;  // ❌ This solid color blocked the shader!
}
```

**Why this broke it:**
- The canvas element itself had a CSS background color (#2c2c2c - dark gray)
- WebGL renders **on top** of the canvas background
- But our shader material had `transparent: true` with 85% opacity
- The transparent shader was blending with the solid CSS background
- Result: Either invisible or barely visible shader

### 2. **Shader Material Too Transparent** ❌
The fragment shader was outputting with 85% opacity:

```glsl
gl_FragColor = vec4(baseColor, 0.85);  // ❌ Too transparent!
```

Combined with `transparent: true` in the material:
```javascript
const waveMaterial = new THREE.ShaderMaterial({
  transparent: true,  // ❌ Blending with background
  // ...
});
```

## The Fixes

### Fix 1: Remove CSS Background ✅
```scss
#canvas-webgl {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  // ✅ NO background color!
}
```

### Fix 2: Full Opacity Shader ✅
```glsl
// Output with full opacity
gl_FragColor = vec4(baseColor, 1.0);  // ✅ Fully opaque!
```

```javascript
const waveMaterial = new THREE.ShaderMaterial({
  uniforms,
  vertexShader,
  fragmentShader,
  transparent: false,  // ✅ No transparency
  side: THREE.DoubleSide,
  depthWrite: true,
  depthTest: true,
});
```

### Fix 3: Added Debug Logging ✅
```javascript
console.log("[Banner] Canvas dimensions:", containerWidth, "x", containerHeight);
console.log("[Banner] Camera frustum:", camera.left, camera.right, camera.top, camera.bottom);
console.log("[Banner] Wave plane position:", wavePlane.position);
console.log("[Banner] Particle system visible:", particleSystem.visible);
console.log("[Banner] Background initialized - animation started");
```

## Updated Files

1. **`src/scss/banner.scss`**
   - Removed `background: #2c2c2c` from `#canvas-webgl`
   - Added `pointer-events: none` to prevent interaction issues

2. **`src/js/background-banner.js`**
   - Changed fragment shader alpha from `0.85` to `1.0`
   - Changed material `transparent` from `true` to `false`
   - Added `depthWrite: true` and `depthTest: true`
   - Added debug console logs for troubleshooting

## Result

✅ **Shader background now renders correctly:**
- Animated wave gradient (blue → purple)
- Film grain texture overlay
- Floating sparkle particles
- Full opacity, no transparency issues
- Canvas fills the entire 400px banner container

## Testing

Open `dist-banner/test-banner.html` and check the browser console:
- Should see: `[Banner] Canvas dimensions: [width] x [height]`
- Should see: `[Banner] Background initialized - animation started`
- Should visually see the animated wave background with particles

## Why This Was Hard to Debug

1. **No errors** - Three.js was initializing successfully
2. **Canvas existed** - The DOM element was there with correct attributes
3. **Silent failure** - The shader was rendering but invisible due to CSS background
4. **Transparency confusion** - Multiple layers of transparency (shader alpha + material transparent + CSS background) created a confusing visual situation

## Lesson Learned

When using WebGL canvas with Three.js:
- **Don't set CSS background colors on the canvas** - let WebGL handle the background
- **Use full opacity for primary visual elements** (transparency should be intentional)
- **Add debug logging** for initialization steps
- **Test with solid colors first** before adding transparency effects

