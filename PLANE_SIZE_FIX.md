# Shader Background Plane Size Fix - The Real Issue!

## The Problem
Three.js was initializing successfully with all console logs showing correct values, but **the shader background was completely invisible**.

Console showed:
```
[Banner] Canvas dimensions: 1718 x 400
[Banner] Camera frustum: -21.475 21.475 5 -5
[Banner] Wave plane position: W {x: 0, y: 0, z: 0}
[Banner] Particle system visible: true
[Banner] Background initialized - animation started
```

Everything looked correct but... no visual output!

## Root Cause: Plane Too Small! ❌

The plane geometry was **20 x 20 world units**, but the camera frustum was **~43 x 10 world units**.

```javascript
// ❌ WRONG - Plane way too small for the camera view!
const planeGeometry = new THREE.PlaneGeometry(20, 20, 128, 128);

// Camera frustum was:
// Width: 21.475 * 2 = ~43 units
// Height: 5 * 2 = 10 units
```

**Result:** The 20x20 plane was visible but didn't fill the viewport. It was like having a tiny TV screen in a large room - technically there but too small to see properly from the camera's perspective.

## The Fix ✅

Make the plane **match the camera frustum size**:

```javascript
// ✅ CORRECT - Plane matches camera frustum!
const worldWidth = frustumSize * aspect;  // ~21.475
const worldHeight = frustumSize;          // 10

const planeGeometry = new THREE.PlaneGeometry(
  worldWidth,                            // Matches camera width
  worldHeight,                           // Matches camera height
  Math.floor(containerWidth / 10),       // Segments for detail
  Math.floor(containerHeight / 10)       // Segments for detail
);
```

**Camera frustum calculation:**
```javascript
const frustumSize = 10;
const aspect = containerWidth / containerHeight;  // ~4.295

camera.left = frustumSize * aspect / -2;    // -21.475
camera.right = frustumSize * aspect / 2;    // 21.475
camera.top = frustumSize / 2;               // 5
camera.bottom = frustumSize / -2;           // -5
```

So the plane needs to be:
- **Width:** `frustumSize * aspect` = 10 × 4.295 = **~43 units**
- **Height:** `frustumSize` = **10 units**

## Comparison

### Before (Invisible):
- **Plane:** 20 × 20 units
- **Camera view:** 43 × 10 units
- **Coverage:** ~23% of width, 200% of height (wrong aspect!)

### After (Visible):
- **Plane:** 43 × 10 units
- **Camera view:** 43 × 10 units  
- **Coverage:** 100% - perfect fill!

## How The Original background.js Does It

The original uses **pixel dimensions** for the plane to exactly match the orthographic camera:

```javascript
// Original approach (pixel-based)
const geometry = new THREE.PlaneGeometry(
  window.innerWidth,    // Pixels
  window.innerHeight,   // Pixels
  window.innerWidth / 10, 
  window.innerHeight / 10
);

// Camera setup
camera.left = -width / 2;
camera.right = width / 2;
camera.top = height / 2;
camera.bottom = -height / 2;
```

This ensures the plane fills the entire camera view.

## Updated Files

### `src/js/background-banner.js`

1. **Plane creation:**
```javascript
const worldWidth = frustumSize * aspect;
const worldHeight = frustumSize;
const planeGeometry = new THREE.PlaneGeometry(
  worldWidth, 
  worldHeight, 
  Math.floor(containerWidth / 10), 
  Math.floor(containerHeight / 10)
);
```

2. **Resize handler:**
```javascript
function onWindowResize() {
  const newWidth = bannerContainer.clientWidth;
  const newHeight = bannerContainer.clientHeight;
  const aspect = newWidth / newHeight;
  
  // Update camera
  camera.left = frustumSize * aspect / -2;
  camera.right = frustumSize * aspect / 2;
  // ... (camera update)
  
  // Recreate plane geometry to match new dimensions
  const worldWidth = frustumSize * aspect;
  const worldHeight = frustumSize;
  wavePlane.geometry.dispose();
  wavePlane.geometry = new THREE.PlaneGeometry(
    worldWidth,
    worldHeight,
    Math.floor(newWidth / 10),
    Math.floor(newHeight / 10)
  );
}
```

3. **Debug logging:**
```javascript
console.log("[Banner] Plane size (world units):", worldWidth, "x", worldHeight);
console.log("[Banner] Plane size (geometry):", planeGeometry.parameters.width, "x", planeGeometry.parameters.height);
```

## Result

✅ **Shader background now fills the entire 400px banner:**
- Animated wave gradient (blue → purple)
- Film grain texture overlay
- Floating sparkle particles
- Plane perfectly matches camera frustum
- No clipping, no gaps

## Lesson Learned

When using Three.js with Orthographic Camera:
1. **Always match plane size to camera frustum size**
2. **Aspect ratio matters** - calculate world width as `frustumSize * aspect`
3. **Debug by logging both plane and frustum dimensions**
4. **Update geometry on resize** to maintain the match

The plane needs to fill the camera's view frustum, not just exist in the scene!

