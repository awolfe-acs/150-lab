# Pixel-Based Camera Fix - Matching background.js Exactly

## The Real Problem

The banner background shader was invisible because we were using a **frustumSize-based** orthographic camera approach instead of the **pixel-based** approach used in the original `background.js`.

## Original background.js Approach

### Camera Setup (Pixel-Based):
```javascript
const camera = new THREE.OrthographicCamera(
  -window.innerWidth / 2,   // left
  window.innerWidth / 2,    // right
  window.innerHeight / 2,   // top
  -window.innerHeight / 2,  // bottom
  -1000,                    // near
  1000                      // far
);
camera.position.z = 1;
camera.zoom = 1;
camera.updateProjectionMatrix();
```

### Plane Geometry (Pixel-Based):
```javascript
const geometry = new THREE.PlaneGeometry(
  window.innerWidth,        // width in pixels
  window.innerHeight,       // height in pixels
  window.innerWidth / 10,   // width segments
  window.innerHeight / 10   // height segments
);
```

### Resize Handler:
```javascript
function handleResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  renderer.setSize(width, height);
  
  // Update camera with pixel dimensions
  camera.left = -width / 2;
  camera.right = width / 2;
  camera.top = height / 2;
  camera.bottom = -height / 2;
  camera.updateProjectionMatrix();
  
  // Recreate plane geometry with new pixel dimensions
  mesh.geometry.dispose();
  mesh.geometry = new THREE.PlaneGeometry(
    width, 
    height, 
    width / 10, 
    height / 10
  );
}
```

## What We Had (WRONG)

### Camera Setup (FrustumSize-Based):
```javascript
// ❌ WRONG APPROACH
const frustumSize = 10;
const aspect = containerWidth / containerHeight;
const camera = new THREE.OrthographicCamera(
  frustumSize * aspect / -2,  // ~-21.475
  frustumSize * aspect / 2,   // ~21.475
  frustumSize / 2,            // 5
  frustumSize / -2,           // -5
  0.1,
  1000
);
camera.position.z = 5;
```

### Plane Geometry (World Units):
```javascript
// ❌ WRONG - Using world units
const worldWidth = frustumSize * aspect;  // ~43
const worldHeight = frustumSize;          // 10
const planeGeometry = new THREE.PlaneGeometry(
  worldWidth,   // 43 world units
  worldHeight,  // 10 world units
  ...
);
```

**Problem:** This created a coordinate system mismatch where:
- Camera frustum: ~43 × 10 world units
- Plane: 1718 × 400 pixels needed to be mapped
- Result: Shader coordinates and sizes were all wrong!

## The Fix - Match background.js Exactly

### Updated Camera (Pixel-Based):
```javascript
// ✅ CORRECT - Pixel-based like background.js
const camera = new THREE.OrthographicCamera(
  -containerWidth / 2,   // left (e.g., -859)
  containerWidth / 2,    // right (e.g., 859)
  containerHeight / 2,   // top (e.g., 200)
  -containerHeight / 2,  // bottom (e.g., -200)
  -1000,                 // near
  1000                   // far
);
camera.position.z = 1;
camera.zoom = 1;
camera.updateProjectionMatrix();
```

### Updated Plane (Pixel-Based):
```javascript
// ✅ CORRECT - Pixel dimensions like background.js
const planeGeometry = new THREE.PlaneGeometry(
  containerWidth,                    // 1718 pixels
  containerHeight,                   // 400 pixels
  Math.floor(containerWidth / 10),   // width segments
  Math.floor(containerHeight / 10)   // height segments
);
```

### Updated Resize Handler:
```javascript
// ✅ CORRECT - Matches background.js exactly
function onWindowResize() {
  const width = bannerContainer.clientWidth;
  const height = bannerContainer.clientHeight;
  
  // Update renderer
  renderer.setSize(width, height);
  
  // Update camera - pixel-based
  camera.left = -width / 2;
  camera.right = width / 2;
  camera.top = height / 2;
  camera.bottom = -height / 2;
  camera.updateProjectionMatrix();
  
  // Update resolution uniform
  uniforms.resolution.value.set(width, height);
  
  // Recreate plane geometry with new pixel dimensions
  wavePlane.geometry.dispose();
  wavePlane.geometry = new THREE.PlaneGeometry(
    width,
    height,
    Math.floor(width / 10),
    Math.floor(height / 10)
  );
}
```

## Why Pixel-Based Works

1. **Direct 1:1 Mapping:**
   - Camera frustum = exact pixel dimensions
   - Plane size = exact pixel dimensions
   - No coordinate conversion needed

2. **Shader Coordinates:**
   - `uniforms.resolution` matches camera bounds
   - UV coordinates map correctly to pixels
   - Film grain and effects render at correct scale

3. **Consistency with Original:**
   - Same approach as background.js
   - Proven to work in production
   - No guessing about coordinate systems

## Comparison

### Before (FrustumSize Approach):
```
Container: 1718 × 400 pixels
Camera frustum: -21.475 to 21.475 (width), -5 to 5 (height)
Plane: 43 × 10 world units
Result: ❌ Coordinate system mismatch, shader invisible
```

### After (Pixel-Based Approach):
```
Container: 1718 × 400 pixels
Camera frustum: -859 to 859 (width), -200 to 200 (height)
Plane: 1718 × 400 pixels
Result: ✅ Perfect 1:1 mapping, shader visible!
```

## Files Changed

### `src/js/background-banner.js`

**Camera Setup:**
- Changed from frustumSize-based to pixel-based coordinates
- Matches original background.js exactly
- Near/far planes: -1000 to 1000 (same as original)
- Position z: 1 (not 5)
- Zoom: 1 (explicit, like original)

**Plane Geometry:**
- Uses `containerWidth` and `containerHeight` directly (pixels)
- Segments based on pixel dimensions divided by 10
- Perfect 1:1 match with camera frustum

**Resize Handler:**
- Pixel-based camera updates
- Recreates plane geometry with new pixel dimensions
- Matches original background.js resize logic

## Result

✅ **Shader background now renders correctly:**
- Full 400px banner coverage
- Animated blue → purple gradient waves
- Film grain overlay at correct scale
- Floating particle system
- All shader effects visible and working

## Key Lesson

**When working with Three.js orthographic cameras for 2D effects:**

1. ✅ **DO:** Use pixel-based camera bounds that match your canvas dimensions
2. ✅ **DO:** Size planes in pixels to match camera frustum exactly
3. ✅ **DO:** Follow established patterns in your codebase
4. ❌ **DON'T:** Mix coordinate systems (pixels vs world units)
5. ❌ **DON'T:** Use arbitrary frustum sizes unless you have a specific reason

The original `background.js` had it right all along - we just needed to follow the same pattern!

