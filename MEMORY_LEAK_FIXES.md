# Critical Memory Leak Fixes

## Problem
Memory usage was growing from 0 to 632MB in under 30 seconds, causing performance warnings and potential "Out of Memory" crashes.

## Root Causes Identified

### 1. BufferAttribute Recreation in Mouse Particle System (CRITICAL)
**Location**: `src/js/background.js` - `updateMouseParticleGeometry()` function (lines ~3847-3924)

**Issue**: Creating new `THREE.BufferAttribute` objects **every frame** when updating mouse particle positions, colors, sizes, and opacities. With frequent mouse movement, this was creating thousands of new objects per second.

**Fix**: 
- Track previous particle count to detect size changes
- Use `deleteAttribute()` to properly remove old attributes before creating new ones
- Reuse existing BufferAttributes by updating their `.array` property using `.set()` when count is the same
- Only create new BufferAttributes when the particle count actually changes
- Handle empty state (0 particles) by deleting attributes

**Code Change**:
```javascript
// Before (MEMORY LEAK):
mouseParticleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
mouseParticleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
// ... created new objects EVERY frame

// After (OPTIMIZED):
let previousMouseParticleCount = 0;

function updateMouseParticleGeometry() {
  const currentCount = allParticles.length;
  const sizeChanged = currentCount !== previousMouseParticleCount;
  
  if (sizeChanged) {
    // Delete old attributes (prevents resize error)
    mouseParticleGeometry.deleteAttribute('position');
    // Create new ones with correct size
    mouseParticleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    previousMouseParticleCount = currentCount;
  } else {
    // Reuse existing attributes (no new objects, no resize)
    mouseParticleGeometry.attributes.position.array.set(positions);
    mouseParticleGeometry.attributes.position.needsUpdate = true;
  }
}
```

**Critical Fix**: Added proper `deleteAttribute()` calls to prevent Three.js error: "The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported."

**Impact**: Eliminates creation of 4 new BufferAttribute objects per frame = ~240 objects/second at 60fps, while preventing resize errors

---

### 2. THREE.Color Recreation in Particle Animation Loop (CRITICAL)
**Location**: `src/js/background.js` - `animateParticles()` function (line 4521)

**Issue**: Creating a new `THREE.Color` object **for every particle, every frame**. With potentially thousands of particles, this was creating thousands of new Color objects every frame.

**Fix**:
- Create one reusable `THREE.Color` object outside the animation loop
- Use `.set()` method to update the color value instead of creating new objects

**Code Change**:
```javascript
// Before (MEMORY LEAK):
for (let i = 0; i < particleCount; i++) {
  const baseColor = new THREE.Color(particleColorObj.color); // Created 1000s of times per frame!
  colors[i3] = baseColor.r * twinkleFactor * sizeBrightness;
}

// After (OPTIMIZED):
// Outside the loop, created once:
const reusableBaseColor = new THREE.Color();

// Inside the animation function:
reusableBaseColor.set(particleColorObj.color); // Reuse, don't recreate
for (let i = 0; i < particleCount; i++) {
  colors[i3] = reusableBaseColor.r * twinkleFactor * sizeBrightness;
}
```

**Impact**: Eliminates creation of `particleCount` (e.g., 1000+) new Color objects per frame = ~60,000+ objects/second at 60fps

---

### 3. BufferAttribute Recreation in Color Updates
**Location**: `src/js/background.js` - Particle color control onChange (line 3503)

**Issue**: Creating new BufferAttribute when updating particle colors via GUI controls.

**Fix**: Reuse existing BufferAttribute by updating its array

**Code Change**:
```javascript
// Before:
particleGeometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

// After:
if (particleGeometry.attributes.color) {
  particleGeometry.attributes.color.array.set(particleColors);
  particleGeometry.attributes.color.needsUpdate = true;
} else {
  particleGeometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));
}
```

**Impact**: Prevents unnecessary object creation during user interactions

---

### 4. THREE.Color Recreation in redistributeParticles()
**Location**: `src/js/background.js` - `redistributeParticles()` function (line 3207)

**Issue**: Creating a new THREE.Color object for each particle when redistributing sizes.

**Fix**: Create one color object outside the loop and reuse it

**Code Change**:
```javascript
// Before:
for (let i = 0; i < particleCount; i++) {
  const depthColor = new THREE.Color(particleColorObj.color); // Created 1000s of times
}

// After:
const depthColor = new THREE.Color(particleColorObj.color); // Created once
for (let i = 0; i < particleCount; i++) {
  // Use depthColor
}
```

**Impact**: Eliminates creation of `particleCount` objects when sizes change

---

## Critical Error Fixed

### Three.js BufferAttribute Resize Error
**Error Message**: `THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`

**Cause**: Three.js does NOT support changing the size of BufferAttribute arrays after they're created. Attempting to modify the array size (even by directly assigning a new array) causes this error.

**Solution**: 
- Track the previous particle count
- When particle count changes, use `deleteAttribute()` to completely remove the old attribute
- Then create a new attribute with `setAttribute()` with the correct size
- When particle count stays the same, safely use `.array.set()` to update values in place

This ensures we never attempt to resize an existing BufferAttribute, which Three.js explicitly prohibits.

---

## Expected Results

### Memory Usage
- **Before**: 0 → 632MB in 30 seconds (exponential growth)
- **After**: Should stabilize at 100-150MB with minimal growth over time

### Performance
- **Frame Rate**: More consistent 60fps
- **Memory Warnings**: Should be eliminated or drastically reduced
- **Garbage Collection**: Far less frequent, smoother performance

### Visual Impact
**NONE** - All fixes are purely performance optimizations with zero visual changes. Mouse particles, background particles, colors, and animations all look exactly the same.

---

## Testing Recommendations

1. **Open DevTools Performance Monitor**:
   - Chrome DevTools → More tools → Performance monitor
   - Watch "JS heap size" metric

2. **Test Scenarios**:
   - Move mouse continuously for 30 seconds
   - Scroll up and down rapidly
   - Let page idle for a few minutes
   - Change particle colors in debug GUI

3. **Expected Behavior**:
   - Memory should grow initially then stabilize
   - No more 632MB in 30 seconds
   - Performance warnings should not trigger (or very rarely)
   - Smooth 60fps throughout

---

## Technical Details

### Why BufferAttribute Reuse Matters
Three.js BufferAttributes contain typed arrays (Float32Array) which:
- Cannot be garbage collected while referenced
- Take significant memory (positions: 3 floats × particle count × 4 bytes)
- Creating new ones every frame overwhelms the garbage collector

### Why Color Object Reuse Matters
THREE.Color objects:
- Contain RGB values plus internal state
- Are created as full JavaScript objects (heap allocation)
- Creating thousands per frame causes massive GC pressure
- `.set()` method updates values without new allocation

### Memory Management Best Practices Applied
1. **Object Pooling**: Reuse objects instead of creating new ones
2. **Lazy Allocation**: Only create new objects when truly necessary
3. **Explicit Disposal**: Clear references to help garbage collector
4. **Array Reuse**: Use `.set()` to update TypedArray contents

---

## Files Modified
- `src/js/background.js`
  - Line 3196: Added reusable color in redistributeParticles()
  - Line 3504-3509: Optimized color attribute updates
  - Lines 3882-3912: Optimized updateMouseParticleGeometry()
  - Line 4450: Added reusable color for animation loop
  - Lines 4517-4534: Optimized particle color updates in animateParticles()

---

## Additional Notes

These fixes follow the user's requirement: **"we do *not* want to impact how they are visually. they are visually perfect, and we want to be noninvasive to the visuals, but rather just performance optimization."**

All changes are purely internal memory management optimizations with zero visual impact.

