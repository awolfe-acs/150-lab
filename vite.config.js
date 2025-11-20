import { defineConfig } from "vite";
import { resolve } from "path";
import fs from "fs";
import path from "path";

export default defineConfig(({ mode, command }) => {
  // Determine output directory based on mode
  const outDir = 
    mode === "standard" ? "dist-aem" : 
    mode === "assets" ? "dist-assets" : 
    mode === "banner" ? "dist-banner" : 
    "dist";

  // Determine base path based on mode
  const basePath =
    mode === "github"
      ? "/150-lab/"
      : mode === "assets"
      ? "/150/"
      : mode === "standard"
      ? "/content/dam/acsorg/150/"
      : mode === "banner"
      ? "/content/dam/acsorg/150/assets/banner/"
      : "/";

  return {
    base: basePath,
    server: {
      host: true, // or use host: '0.0.0.0'
    },
    build: {
      outDir,
      cssCodeSplit: false,
      rollupOptions: {
        input: mode === "banner" ? resolve(__dirname, "index-banner.html") : resolve(__dirname, "index.html"),
        output: {
          // For banner mode, output JS and CSS to root, otherwise to assets/
          entryFileNames: mode === "banner" ? "[name]-[hash].js" : "assets/[name]-[hash].js",
          chunkFileNames: mode === "banner" ? "[name]-[hash].js" : "assets/[name]-[hash].js",
          assetFileNames: (assetInfo) => {
            // For banner mode, put CSS at root level
            if (mode === "banner" && assetInfo.name.endsWith(".css")) {
              return "[name]-[hash][extname]";
            }
            // Handle all media files consistently in the assets directory
            if (
              assetInfo.name.endsWith(".mp3") ||
              assetInfo.name.endsWith(".mp4") ||
              assetInfo.name.endsWith(".jpg") ||
              assetInfo.name.endsWith(".png") ||
              assetInfo.name.endsWith(".webp") ||
              assetInfo.name.endsWith(".svg") ||
              assetInfo.name.endsWith(".glb") ||
              assetInfo.name.endsWith(".gltf")
            ) {
              const type = assetInfo.name.split(".").pop();
              const subDir =
                type === "mp3"
                  ? "audio"
                  : type === "mp4"
                  ? "video"
                  : type === "glb" || type === "gltf"
                  ? "models"
                  : "images";
              return `assets/${subDir}/[name][extname]`;
            }
            return "assets/[name]-[hash][extname]";
          },
        },
      },
    },
    plugins: [
      {
        name: "remove-gui-in-production",
        apply: "build",
        generateBundle(options, bundle) {
          // Only run in build command (production builds) BUT NOT for banner mode
          // Banner mode uses its own debugGUI flag
          if (command === "build" && mode !== "banner") {
            // Find the main JS file in the bundle
            const jsFiles = Object.keys(bundle).filter((key) => key.endsWith(".js") && !key.includes("vendor"));

            if (jsFiles.length > 0) {
              const mainJsFile = jsFiles[0];
              const jsBundle = bundle[mainJsFile];

              if (jsBundle && jsBundle.type === "chunk") {
                // Prepend code to remove dat.GUI element
                const removeGuiCode = `
// Remove dat.GUI in production
(function() {
  const removeGui = () => {
    // Target multiple possible dat.GUI selectors
    const selectors = ['.dg.ac', '.dg', '[class*="dg"]'];
    let removed = false;
    
    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        if (element && element.parentNode) {
          element.parentNode.removeChild(element);
          removed = true;
        }
      });
    });
    
    if (removed) {
      console.log('dat.GUI removed in production build');
    }
  };
  
  // Try to remove immediately
  removeGui();
  
  // Also try after DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', removeGui);
  } else {
    // DOM is already loaded, try again
    removeGui();
  }
  
  // Try after short delays to catch any delayed GUI creation
  setTimeout(removeGui, 100);
  setTimeout(removeGui, 500);
  setTimeout(removeGui, 1000);
  
  // Also observe for any new GUI elements being added
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(() => {
      removeGui();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Stop observing after 5 seconds to avoid performance issues
    setTimeout(() => observer.disconnect(), 5000);
  }
})();

`;

                // Prepend the GUI removal code to the main JS bundle
                jsBundle.code = removeGuiCode + jsBundle.code;
              }
            }
          }
        },
      },
      {
        name: "html-transform-preload",
        transformIndexHtml(html, ctx) {
          // ✅ Only run this during the build process
          if (!ctx || !ctx.bundle) return html;

          const cssFile = Object.keys(ctx.bundle).find((key) => key.endsWith(".css"));
          const jsFile = Object.keys(ctx.bundle).find((key) => key.endsWith(".js"));

          // Use the correct base path based on build mode
          const basePath =
            mode === "github"
              ? "/150-lab/"
              : mode === "assets"
              ? "/150/"
              : mode === "standard"
              ? "/content/dam/acsorg/150/"
              : mode === "banner"
              ? "/content/dam/acsorg/150/assets/banner/"
              : "/";

          return html.replace(
            "</head>",
            `
              ${cssFile ? `<link rel="preload" href="${basePath}${cssFile}" as="style">` : ""}
              ${jsFile ? `<link rel="preload" href="${basePath}${jsFile}" as="script">` : ""}
            </head>`
          );
        },
      },
      {
        name: "create-banner-embed",
        apply: "build",
        closeBundle() {
          // Only run for banner mode
          if (mode !== "banner") return;

          const bannerDistDir = resolve(__dirname, "dist-banner");
          const indexHtmlPath = path.join(bannerDistDir, "index-banner.html");
          
          if (!fs.existsSync(indexHtmlPath)) {
            console.warn("Banner index file not found, skipping embed generation");
            return;
          }

          // Read the built HTML
          let html = fs.readFileSync(indexHtmlPath, "utf-8");

          // Find CSS and JS files - they're in the root of dist-banner for banner mode
          const files = fs.readdirSync(bannerDistDir);
          
          const cssFile = files.find((f) => f.endsWith(".css") && !f.includes("node_modules"));
          const jsFile = files.find((f) => f.endsWith(".js") && !f.includes("node_modules"));

          // Get the CSS and JS paths from the HTML
          const cssLinkMatch = html.match(/<link[^>]*rel="stylesheet"[^>]*href="([^"]*\.css)"[^>]*>/);
          const jsScriptMatch = html.match(/<script[^>]*type="module"[^>]*src="([^"]*\.js)"[^>]*>/);

          const cssPath = cssLinkMatch ? cssLinkMatch[1] : '';
          const jsPath = jsScriptMatch ? jsScriptMatch[1] : '';

          // Extract the entire banner-container div from the HTML (including all nested content)
          const bannerContainerMatch = html.match(/<div id="banner-container">[^]*?<\/div>\s*<\/body>/);
          let bannerContainerHTML = bannerContainerMatch ? bannerContainerMatch[0] : '';
          
          // Remove the closing body tag if it was captured
          bannerContainerHTML = bannerContainerHTML.replace(/<\/body>\s*$/, '').trim();
          // Ensure the closing div is present
          if (!bannerContainerHTML.endsWith('</div>')) {
            bannerContainerHTML += '\n    </div>';
          }

          if (!bannerContainerHTML) {
            console.warn('⚠️  Could not find banner-container in HTML');
            return;
          }

          // Create embed code with just CSS/JS links + banner-container
          const embedCode = `<!-- ACS 150th Anniversary Banner -->
<!-- Load CSS and JS -->
<link rel="stylesheet" href="${cssPath}">
<script type="module" src="${jsPath}"></script>

<!-- Banner Container -->
${bannerContainerHTML}
`;

          // Write the embed file
          const embedPath = path.join(bannerDistDir, "embed.html");
          fs.writeFileSync(embedPath, embedCode, "utf-8");
          console.log(`✅ Banner embed code created: ${embedPath}`);

          // Create a minified version
          const minified = embedCode
            .replace(/>\s+</g, "><")
            .replace(/\s{2,}/g, " ")
            .replace(/<!--[\s\S]*?-->/g, "")
            .trim();
          
          const embedMinPath = path.join(bannerDistDir, "embed.min.html");
          fs.writeFileSync(embedMinPath, minified, "utf-8");
          console.log(`✅ Minified banner embed code created: ${embedMinPath}`);

          // Create a README with instructions
          const readmeContent = `# ACS 150th Anniversary Countdown Banner

## Files

- \`index-banner.html\` - Full HTML page with banner (400px tall)
- \`embed.html\` - Minimal embed code (CSS/JS links + banner container div)
- \`embed.min.html\` - Minified version of embed.html

## Quick Start

### Option 1: Direct Embed (Recommended for AEM)
Copy the contents of \`embed.html\` or \`embed.min.html\` and paste into your page where you want the banner.

\`\`\`html
<!-- Load CSS and JS -->
<link rel="stylesheet" href="/content/dam/acsorg/150/assets/banner/style-[hash].css">
<script type="module" src="/content/dam/acsorg/150/assets/banner/index-banner-[hash].js"></script>

<!-- Banner Container -->
<div id="banner-container">
  <!-- Banner content here -->
</div>
\`\`\`

### Option 2: iframe Embed
\`\`\`html
<iframe src="/content/dam/acsorg/150/assets/banner/index-banner.html" 
        width="100%" height="400" frameborder="0"></iframe>
\`\`\`

## Dimensions

- Width: 100% (responsive)
- Height: 400px (fixed)

## Features

- ✅ Animated particle/wave background effect
- ✅ Live countdown to April 6, 2026
- ✅ Responsive logo and countdown
- ✅ Reduced motion support
`;
          
          const readmePath = path.join(bannerDistDir, "README.md");
          fs.writeFileSync(readmePath, readmeContent, "utf-8");
          console.log(`✅ Banner README created: ${readmePath}`);

          // Create implementation guide
          const implementationGuide = `# ACS 150th Anniversary Banner - Implementation Guide

## Overview

400px tall, full-width banner featuring:
- ACS 150 logo (left/center on mobile)
- Live countdown to April 6, 2026 (center)
- Animated particle/wave background effect

## Files

- **\`index-banner.html\`** - Full standalone HTML page
- **\`embed.html\`** - Minimal embed code (CSS/JS links + container)
- **\`embed.min.html\`** - Minified embed code
- **\`test-banner.html\`** - Test/preview page

## Implementation (for AEM)

### Step 1: Upload Assets
Upload all files from \`dist-banner\` to AEM at:
\`/content/dam/acsorg/150/assets/banner/\`

### Step 2: Add Embed Code
Copy contents of \`embed.html\` into your AEM component:

\`\`\`html
<!-- Load CSS and JS -->
<link rel="stylesheet" href="/content/dam/acsorg/150/assets/banner/style-[hash].css">
<script type="module" src="/content/dam/acsorg/150/assets/banner/index-banner-[hash].js"></script>

<!-- Banner Container -->
<div id="banner-container">
  <canvas id="canvas-webgl"></canvas>
  <div class="banner-logo">...</div>
  <div class="banner-countdown">...</div>
</div>
\`\`\`

### Alternative: iframe Embed
\`\`\`html
<iframe 
  src="/content/dam/acsorg/150/assets/banner/index-banner.html" 
  width="100%" 
  height="400" 
  frameborder="0"
  title="ACS 150th Anniversary">
</iframe>
\`\`\`

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
`;
          
          const guidePath = path.join(bannerDistDir, "IMPLEMENTATION_GUIDE.md");
          fs.writeFileSync(guidePath, implementationGuide, "utf-8");
          console.log(`✅ Banner implementation guide created: ${guidePath}`);

          // Create test HTML file
          const testHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ACS 150 Banner Test</title>
    <style>
        body { margin: 0; padding: 40px; font-family: Arial, sans-serif; background: #f5f5f5; }
        .container { max-width: 1400px; margin: 0 auto; }
        h1 { text-align: center; margin-bottom: 20px; }
        .banner-wrapper { width: 100%; height: 400px; margin: 20px 0; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .info { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
        pre { background: #2c2c2c; color: #fff; padding: 15px; border-radius: 4px; overflow-x: auto; }
    </style>
</head>
<body>
    <div class="container">
        <h1>ACS 150th Anniversary Banner Test</h1>
        
        <div class="info">
            <h2>iframe Embed (Recommended)</h2>
            <pre>&lt;iframe src="index-banner.html" width="100%" height="400" frameborder="0"&gt;&lt;/iframe&gt;</pre>
        </div>

        <div class="banner-wrapper">
            <iframe src="index-banner.html" width="100%" height="400" frameborder="0"></iframe>
        </div>

        <div class="info">
            <h2>Features</h2>
            <ul>
                <li>✅ Animated particle background effect</li>
                <li>✅ Live countdown to April 6, 2026</li>
                <li>✅ Responsive design</li>
                <li>✅ Reduced motion support</li>
                <li>✅ Fixed height: 400px</li>
            </ul>
        </div>
    </div>
</body>
</html>`;
          
          const testHtmlPath = path.join(bannerDistDir, "test-banner.html");
          fs.writeFileSync(testHtmlPath, testHtml, "utf-8");
          console.log(`✅ Banner test page created: ${testHtmlPath}`);
        },
      },
      {
        name: "copy-public-to-assets",
        apply: "build",
        closeBundle() {
          // Define the public directory and the destination assets directory
          const publicDir = resolve(__dirname, "public");
          // Use the correct output directory based on the build mode
          const assetsDir = resolve(__dirname, `${outDir}/assets`);

          // Create the assets directory if it doesn't exist
          if (!fs.existsSync(assetsDir)) {
            fs.mkdirSync(assetsDir, { recursive: true });
          }

          // Function to recursively copy files from source to destination
          const copyRecursive = (src, dest) => {
            // Get stats of the current file/directory
            const stats = fs.statSync(src);

            // If it's a directory, create it in the destination and copy its contents
            if (stats.isDirectory()) {
              // Create the destination directory if it doesn't exist
              if (!fs.existsSync(dest)) {
                fs.mkdirSync(dest, { recursive: true });
              }

              // Read the directory contents
              const entries = fs.readdirSync(src);

              // Copy each entry recursively
              for (const entry of entries) {
                // Skip .DS_Store files
                if (entry === ".DS_Store") continue;

                const srcPath = path.join(src, entry);
                const destPath = path.join(dest, entry);
                copyRecursive(srcPath, destPath);
              }
            }
            // If it's a file, copy it to the destination
            else if (stats.isFile()) {
              fs.copyFileSync(src, dest);
              console.log(`Copied: ${src} -> ${dest}`);
            }
          };

          // Copy each subdirectory from public to assets
          const entries = fs.readdirSync(publicDir);
          for (const entry of entries) {
            // Skip .DS_Store files
            if (entry === ".DS_Store") continue;

            const srcPath = path.join(publicDir, entry);
            const stats = fs.statSync(srcPath);

            // Only copy directories, not individual files at the root level
            if (stats.isDirectory()) {
              const destPath = path.join(assetsDir, entry);
              copyRecursive(srcPath, destPath);
            }
          }
        },
      },
    ],
  };
});
