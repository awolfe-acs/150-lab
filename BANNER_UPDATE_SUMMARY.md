# Banner Update Summary

## What Was Fixed

### 1. Simplified Background Shader
Created `src/js/background-banner.js` - a lightweight version of the full page background:

**What It Includes:**
- ✅ Basic particle system (~300 particles with sparkle effect)
- ✅ Animated wave shader (plane geometry with custom shaders)
- ✅ Simple animation loop (no ScrollTrigger dependencies)
- ✅ WebGL with fallback support
- ✅ Proper cleanup on window unload

**What It Removes (from full background.js):**
- ❌ ScrollTrigger and GSAP dependencies
- ❌ Globe model loading (GLTFLoader, DRACOLoader)
- ❌ Phase transitions (cover area, hero-travel, events)
- ❌ Color darkness animations
- ❌ Mouse particle effects
- ❌ dat.GUI controls
- ❌ Performance monitoring and adaptive rendering
- ❌ AEM mode detection complexity

**Result:**
- **562KB JS** (down from 819KB)
- **31% smaller** bundle size
- **Faster initialization** - no model loading, no ScrollTrigger setup
- **Same visual effect** - particles + waves

### 2. Updated Banner Entry Point
Modified `src/banner.js`:
- Now imports `initBannerBackground()` instead of `initShaderBackground()`
- Removed GSAP dependency (not needed)
- Simpler initialization flow

### 3. Fixed Embed Code Generation
Updated `vite.config.js` plugin to generate proper embed code:

**Before:**
- Full HTML document with ~5000 lines (inlined 800KB of JS)
- Had to scroll through massive script tag to find HTML

**After:**
```html
<!-- CSS and JS Links -->
<link rel="stylesheet" href="/content/dam/acsorg/150/assets/banner/style-[hash].css">
<script type="module" src="/content/dam/acsorg/150/assets/banner/index-banner-[hash].js"></script>

<!-- Banner Container -->
<div id="banner-container">
  <canvas id="canvas-webgl"></canvas>
  <div class="banner-logo">...</div>
  <div class="banner-countdown">...</div>
</div>
```

**Two versions generated:**
- `embed.html` - Clean, formatted, with comments
- `embed.min.html` - Minified, no comments, single line

### 4. Updated Documentation
- `README.md` - Updated with new embed structure
- `IMPLEMENTATION_GUIDE.md` - Simplified implementation steps
- `test-banner.html` - Still works with iframe embed

## File Structure

```
dist-banner/
├── index-banner.html          # Full HTML page (for iframe)
├── embed.html                 # Clean embed code (CSS + JS links + div)
├── embed.min.html             # Minified embed code
├── style-[hash].css           # Banner styles (~3.8KB)
├── index-banner-[hash].js     # Banner JS (~562KB)
├── test-banner.html           # Test/preview page
├── README.md                  # Quick start guide
├── IMPLEMENTATION_GUIDE.md    # Detailed implementation
└── assets/                    # Audio, images, models, etc.
```

## How to Use

### For AEM Deployment:
1. Upload all files from `dist-banner/` to `/content/dam/acsorg/150/assets/banner/`
2. Copy contents of `embed.html` into your AEM component
3. The banner will initialize the background shader automatically

### For Testing:
- Open `test-banner.html` in a browser
- Or serve `index-banner.html` directly

## Background Effect Details

### Simplified Banner Background
- **Scene:** Orthographic camera, wave plane, particle system
- **Particles:** 300 sparkle particles with radial gradient texture
- **Wave:** Plane geometry (128x128) with custom vertex/fragment shaders
- **Animation:** Sine wave deformation + particle Z-axis movement
- **Colors:** Blue (#0091DA) to Purple (#8E44AD) gradient
- **Performance:** Lightweight, no heavy model loading

### What You See:
- Animated wave plane in the background
- Floating sparkle particles moving in 3D
- Smooth rotation and wave motion
- WebGL canvas fills the 400px tall banner container

## Verification Checklist

✅ `embed.html` has just CSS/JS links + banner container div  
✅ `embed.min.html` is minified and ready to copy  
✅ `index-banner.html` works as standalone page  
✅ Background shader initializes (check browser console for "[Banner] Background initialized")  
✅ Countdown timer works  
✅ JS bundle is smaller (562KB vs 819KB)  
✅ Main `background.js` for full page is unchanged  
✅ No GSAP/ScrollTrigger dependencies in banner  

## Build Command

```bash
npm run build:banner
```

Outputs to `dist-banner/` directory.

