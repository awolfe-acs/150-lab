# ACS 150th Anniversary Banner - Project Summary

## ✅ Project Complete

I've successfully created a promotional banner version of your ACS 150th Anniversary countdown with the animated background effect!

## 📦 What Was Created

### Source Files

1. **`index-banner.html`** - The banner HTML template
   - Full-width banner (100% width × 400px height)
   - ACS logo on the left
   - Countdown on the right
   - Canvas element for the animated background

2. **`src/banner.js`** - Banner entry point
   - Initializes the shader background
   - Initializes the countdown timer
   - Minimal dependencies (only what's needed for the banner)

3. **`src/scss/banner.scss`** - Banner-specific styles
   - Responsive layout with flexbox
   - Logo and countdown positioning
   - Mobile-friendly breakpoints
   - Reduced motion support

### Build Configuration

4. **Updated `vite.config.js`**
   - Added `banner` build mode
   - Outputs to `/dist-banner/`
   - Generates embed files with inline CSS/JS
   - Creates documentation automatically

5. **Updated `package.json`**
   - Added `npm run build:banner` script

## 🎯 Build Output (`/dist-banner/`)

When you run `npm run build:banner`, it generates:

### Main Files
- **`index-banner.html`** (16.5 KB) - Standard HTML with external CSS/JS links
- **`embed.html`** (~822 KB) - All-in-one version with inline CSS/JS
- **`embed.min.html`** (~810 KB) - Minified all-in-one version

### Documentation
- **`README.md`** - Quick reference guide
- **`IMPLEMENTATION_GUIDE.md`** - Detailed implementation instructions
- **`test-banner.html`** - Interactive demo/test page

### Assets
- **`assets/style-*.css`** - Compiled styles
- **`assets/index-banner-*.js`** - Compiled JavaScript (includes Three.js, GSAP, background shader)
- **`assets/models/globe-hd.glb`** - 3D globe model for background effect
- All other necessary assets from `/public/`

## 🚀 How to Build

```bash
cd C:\dev\Work\ACS\150-lab
npm run build:banner
```

This will:
1. ✅ Build optimized HTML, CSS, and JS
2. ✅ Generate inline embed versions
3. ✅ Create documentation files
4. ✅ Copy all necessary assets

## 📋 How to Use

### Method 1: iframe Embed (Recommended) ⭐

```html
<iframe 
  src="https://your-domain.com/path/to/index-banner.html" 
  width="100%" 
  height="400" 
  frameborder="0"
  title="ACS 150th Anniversary Countdown"
></iframe>
```

**Best for:** Quick deployment, style isolation, cross-domain use

### Method 2: Direct Inline Embed

Copy the contents of `dist-banner/embed.min.html` and paste it directly into your HTML.

**Best for:** Single-page implementation, no external dependencies

### Method 3: External Files

Upload all files from `dist-banner/` to your server and link to them normally.

**Best for:** Multiple pages, leveraging browser caching

## 🎨 Features

- ✅ **Animated particle background** - Same WebGL shader effect as the main site
- ✅ **Live countdown** - Counts down to April 6, 2026
- ✅ **Responsive design** - Adapts to different screen sizes
- ✅ **Accessibility** - Reduced motion support, proper ARIA labels
- ✅ **Optimized** - All dependencies bundled, optimized for production

## 📐 Specifications

- **Width:** 100% (full width, responsive)
- **Height:** 400px (fixed)
- **Background:** Animated particle/wave effect (requires WebGL)
- **Fonts:** Open Sans from Google Fonts
- **Target Date:** April 6, 2026 00:00:00

## 🧪 Testing

1. Open `dist-banner/test-banner.html` in a browser
2. You'll see:
   - The banner displayed in an iframe
   - Implementation examples
   - Feature list
   - Usage instructions

## 🔧 Customization

### Change the Countdown Date

Edit `src/banner.js`:

```javascript
const targetDate = new Date("2026-04-06T00:00:00").getTime();
```

Then rebuild:
```bash
npm run build:banner
```

### Adjust Banner Height

Edit `src/scss/banner.scss`:

```scss
html, body {
  height: 500px; // Change from 400px
}

#banner-container {
  height: 500px; // Change from 400px
}
```

Then rebuild.

## 📊 File Sizes

- **index-banner.html:** 16.5 KB
- **embed.html:** ~822 KB (includes all CSS/JS)
- **embed.min.html:** ~810 KB (minified)
- **Total with assets:** ~840 KB

The background effect uses the same globe model and shaders as the main site, so it's the same high-quality animation.

## 🌐 Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- Requires WebGL for animated background
- Falls back gracefully on unsupported browsers

## 📁 Deployment Checklist

- [ ] Run `npm run build:banner`
- [ ] Test with `dist-banner/test-banner.html`
- [ ] Upload all files from `dist-banner/` to your server
- [ ] Choose implementation method (iframe, inline, or external)
- [ ] Verify the banner loads correctly
- [ ] Check that the countdown is updating
- [ ] Verify the background animation works

## 🎉 Next Steps

1. **Test locally:** Open `dist-banner/test-banner.html` in a browser
2. **Choose method:** Pick iframe, inline, or external file method
3. **Deploy:** Upload the files to your server
4. **Implement:** Add the banner to your website

## 📝 Notes

- The banner uses the exact same background shader and effects as the main page
- The countdown timer updates every second with smooth animations
- All dependencies (Three.js, GSAP, shaders) are bundled into the JavaScript file
- The only external dependency is Google Fonts (for Open Sans)

## 🆘 Troubleshooting

**Background not animating?**
- Check WebGL support: https://get.webgl.org/
- Verify globe-hd.glb is accessible
- Check browser console for errors

**Countdown not updating?**
- Ensure JavaScript is enabled
- Verify the target date is in the future
- Check for console errors

**Styling issues?**
- Use iframe method to isolate styles
- Check for CSS conflicts with your site

## 📚 Documentation Files

All documentation is in `dist-banner/`:
- `README.md` - Quick reference
- `IMPLEMENTATION_GUIDE.md` - Detailed guide
- `test-banner.html` - Interactive demo

---

**Ready to deploy!** 🚀

Run `npm run build:banner` and you'll have everything you need in the `/dist-banner/` directory.

