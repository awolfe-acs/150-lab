# ACS 150th Anniversary Countdown Banner

## Files

- `index-banner.html` - Full HTML page with banner (400px tall)
- `embed.html` - Minimal embed code (CSS/JS links + banner container div)
- `embed.min.html` - Minified version of embed.html

## Quick Start

### Option 1: Direct Embed (Recommended for AEM)
Copy the contents of `embed.html` or `embed.min.html` and paste into your page where you want the banner.

```html
<!-- Load CSS and JS -->
<link rel="stylesheet" href="/content/dam/acsorg/150/assets/banner/style-[hash].css">
<script type="module" src="/content/dam/acsorg/150/assets/banner/index-banner-[hash].js"></script>

<!-- Banner Container -->
<div id="banner-container">
  <!-- Banner content here -->
</div>
```

### Option 2: iframe Embed
```html
<iframe src="/content/dam/acsorg/150/assets/banner/index-banner.html" 
        width="100%" height="400" frameborder="0"></iframe>
```

## Dimensions

- Width: 100% (responsive)
- Height: 400px (fixed)

## Features

- ✅ Animated particle/wave background effect
- ✅ Live countdown to April 6, 2026
- ✅ Responsive logo and countdown
- ✅ Reduced motion support
