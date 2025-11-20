# GUI Controls Guide - Banner Background Debugging

## Overview

The banner now includes **lil-gui controls** to interactively debug and adjust the camera, plane, and shader settings. This helps diagnose why the shader might appear as a tiny square instead of filling the full 400px banner.

## Available Controls

### 📷 Camera Folder
Controls the orthographic camera's position and zoom:

- **Position X** (-2000 to 2000): Move camera left/right
- **Position Y** (-2000 to 2000): Move camera up/down
- **Position Z** (-100 to 100): Move camera forward/backward (default: 1)
- **Zoom** (0.1 to 5): Camera zoom level (default: 1)

**Current Settings:**
```javascript
Position: (0, 0, 1)
Zoom: 1
```

### 📐 Camera Frustum Folder
Controls the orthographic camera's viewing bounds (what the camera can see):

- **Left** (-5000 to 0): Left edge of viewing area (default: -containerWidth/2, e.g., -859)
- **Right** (0 to 5000): Right edge of viewing area (default: containerWidth/2, e.g., 859)
- **Top** (0 to 5000): Top edge of viewing area (default: containerHeight/2, e.g., 200)
- **Bottom** (-5000 to 0): Bottom edge of viewing area (default: -containerHeight/2, e.g., -200)

**Current Settings (for 1718x400 canvas):**
```javascript
Left: -859
Right: 859
Top: 200
Bottom: -200
```

### 🌊 Wave Plane Folder
Controls the position and scale of the shader plane mesh:

- **Position X** (-2000 to 2000): Move plane left/right (default: 0)
- **Position Y** (-2000 to 2000): Move plane up/down (default: 0)
- **Position Z** (-1000 to 1000): Move plane forward/backward (default: 0)
- **Scale X** (0.01 to 10): Horizontal scale (default: 1)
- **Scale Y** (0.01 to 10): Vertical scale (default: 1)
- **Scale Z** (0.01 to 10): Depth scale (default: 1)

**Current Settings:**
```javascript
Position: (0, 0, 0)
Scale: (1, 1, 1)
```

### 🎨 Shader Folder
Controls the wave shader's visual properties:

- **Wave Speed** (0 to 5): Animation speed (default: 1.0)
- **Wave Amplitude** (0 to 2): Height of waves (default: 0.8)
- **Wave Frequency** (0 to 10): Number of waves (default: 4.0)
- **Wave Depth** (0 to 1): Color depth influence (default: 0.6)
- **Film Grain** (0 to 0.1): Film noise intensity (default: 0.02)

### ✨ Particles Folder
Controls the particle system:

- **Particle Size** (0 to 1): Size of sparkle particles (default: 0.15)
- **Particle Opacity** (0 to 1): Transparency of particles (default: 0.8)
- **Show Particles**: Toggle particle visibility (default: true)

### ℹ️ Info (Read-Only) Folder
Displays current dimensions:

- **Canvas Width**: Current canvas pixel width (e.g., 1718)
- **Canvas Height**: Current canvas pixel height (e.g., 400)
- **Plane Width**: Plane geometry width in pixels (e.g., 1718)
- **Plane Height**: Plane geometry height in pixels (e.g., 400)

## Troubleshooting: "Tiny Square" Issue

If you're seeing a tiny square instead of the full background, try adjusting these controls:

### Test 1: Check Camera Frustum
**Problem:** Camera frustum might not match the canvas size.

**Solution:** 
1. Open "Camera Frustum" folder
2. Check that:
   - `Left` = `-canvasWidth / 2` (e.g., -859 for 1718px)
   - `Right` = `canvasWidth / 2` (e.g., 859 for 1718px)
   - `Top` = `canvasHeight / 2` (e.g., 200 for 400px)
   - `Bottom` = `-canvasHeight / 2` (e.g., -200 for 400px)

### Test 2: Check Plane Scale
**Problem:** Plane might be scaled too small.

**Solution:**
1. Open "Wave Plane" folder
2. Try increasing **Scale X** and **Scale Y** to 2 or 3
3. If the square gets bigger, the plane is too small

### Test 3: Check Plane Position
**Problem:** Plane might be outside the camera's view.

**Solution:**
1. Open "Wave Plane" folder
2. Reset **Position X**, **Position Y**, **Position Z** all to 0
3. Plane should be centered in view

### Test 4: Check Camera Zoom
**Problem:** Camera might be zoomed in too much or too little.

**Solution:**
1. Open "Camera" folder
2. Try adjusting **Zoom** between 0.5 and 2
3. Default should be 1

### Test 5: Check Plane Size vs Camera
**Problem:** Plane geometry might not match camera frustum.

**Solution:**
1. Open "Info (Read-Only)" folder
2. Check that:
   - `Plane Width` = `Canvas Width`
   - `Plane Height` = `Canvas Height`
3. If they don't match, the plane is the wrong size

## Expected Values for 1718x400 Banner

```javascript
// Camera
camera.position: (0, 0, 1)
camera.zoom: 1
camera.left: -859
camera.right: 859
camera.top: 200
camera.bottom: -200

// Plane
wavePlane.position: (0, 0, 0)
wavePlane.scale: (1, 1, 1)
planeGeometry.width: 1718  // Should match canvas width
planeGeometry.height: 400  // Should match canvas height
```

## How to Use the GUI

1. **Open test-banner.html** in your browser
2. **Look for the GUI panel** in the top-right corner
3. **Click folder names** to expand/collapse sections
4. **Drag sliders** or **type values** to adjust settings
5. **Changes apply instantly** - watch the banner update in real-time

## Debugging Steps

1. **Verify dimensions** in the "Info" folder match your expectations
2. **Check camera frustum** matches canvas dimensions (divide by 2)
3. **Test plane scale** - try scaling up/down to see effect
4. **Test camera zoom** - try zooming in/out
5. **Check console logs** for reported dimensions:
   ```
   [Banner] Canvas dimensions: 1718 x 400
   [Banner] Camera frustum: -859 859 200 -200
   [Banner] Plane size (pixels): 1718 x 400
   ```

## Removing GUI (Production)

Once you've found the correct settings, you can:

1. **Note the working values** from the GUI
2. **Update the defaults** in `src/js/background-banner.js`
3. **Comment out or remove** the GUI code (lines with `const gui = new GUI()...`)
4. **Rebuild** with `npm run build:banner`

This keeps the GUI in development but removes it from production builds.

## Quick Fixes

### Make Plane Fill Full View
```javascript
// In GUI:
Camera Frustum -> Left: -859
Camera Frustum -> Right: 859
Camera Frustum -> Top: 200
Camera Frustum -> Bottom: -200
Wave Plane -> Scale X: 1
Wave Plane -> Scale Y: 1
Camera -> Zoom: 1
```

### Zoom Out to See More
```javascript
Camera -> Zoom: 0.5  // Shows twice as much area
```

### Zoom In for Detail
```javascript
Camera -> Zoom: 2  // Shows half as much area (2x magnification)
```

## Notes

- All changes are **live** and **non-persistent** (refresh to reset)
- The GUI is designed for **debugging only** - not for production
- Settings apply immediately without needing to restart
- Use console logs to verify values are updating correctly

