# ACS 150th Anniversary Banner - Implementation Guide

## Overview

400px tall, full-width banner featuring:
- ACS 150 logo (left/center on mobile)
- Live countdown to April 6, 2026 (center)
- Animated particle/wave background effect

## Files

- **`index-banner.html`** - Full standalone HTML page
- **`embed.html`** - Minimal embed code (CSS/JS links + container)
- **`embed.min.html`** - Minified embed code
- **`test-banner.html`** - Test/preview page

## Implementation (for AEM)

### Step 1: Upload Assets
Upload all files from `dist-banner` to AEM at:
`/content/dam/acsorg/150/assets/banner/`

### Step 2: Add Embed Code
Copy contents of `embed.html` into your AEM component:

```html
<!-- Load CSS and JS -->
<link rel="stylesheet" href="/content/dam/acsorg/150/assets/banner/style-[hash].css">
<script type="module" src="/content/dam/acsorg/150/assets/banner/index-banner-[hash].js"></script>

<!-- Banner Container -->
<div id="banner-container">
  <canvas id="canvas-webgl"></canvas>
  <div class="banner-logo">...</div>
  <div class="banner-countdown">...</div>
</div>
```

### Alternative: iframe Embed
```html
<iframe 
  src="/content/dam/acsorg/150/assets/banner/index-banner.html" 
  width="100%" 
  height="400" 
  frameborder="0"
  title="ACS 150th Anniversary">
</iframe>
```

## Technical Details

### Background Effect
- Simplified particle/wave shader (no ScrollTrigger dependencies)
- ~300 particles with sparkle effect
- Smooth wave animation
- WebGL with fallback

### Performance
- Lightweight compared to full page version
- No globe model, no phase transitions
- Optimized for banner use case

## Technical Requirements

- Modern browsers with WebGL support
- JavaScript enabled
- Internet connection for Google Fonts

## Support

For issues, check the browser console and verify WebGL support at https://get.webgl.org/
