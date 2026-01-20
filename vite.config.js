import { defineConfig } from "vite";
import { resolve } from "path";
import fs from "fs";
import path from "path";
import zlib from "zlib";

// Custom gzip plugin - creates .gz files alongside originals
// These work with standard <script src=""> when server is configured to serve .gz
function gzipPlugin(outputDir) {
  return {
    name: 'gzip-assets',
    apply: 'build',
    closeBundle() {
      const compressFile = (filePath) => {
        const content = fs.readFileSync(filePath);
        const compressed = zlib.gzipSync(content, { level: 9 });
        fs.writeFileSync(filePath + '.gz', compressed);
        
        const originalSize = (content.length / 1024).toFixed(2);
        const compressedSize = (compressed.length / 1024).toFixed(2);
        const ratio = ((1 - compressed.length / content.length) * 100).toFixed(1);
        console.log(`  📦 ${path.basename(filePath)}: ${originalSize}KB → ${compressedSize}KB (${ratio}% smaller)`);
      };
      
      const processDir = (dir) => {
        if (!fs.existsSync(dir)) return;
        
        const files = fs.readdirSync(dir, { withFileTypes: true });
        for (const file of files) {
          const fullPath = path.join(dir, file.name);
          if (file.isDirectory()) {
            processDir(fullPath);
          } else if (file.name.match(/\.(js|css|html|json|svg)$/)) {
            compressFile(fullPath);
          }
        }
      };
      
      console.log('\n🗜️  Creating gzipped versions...');
      processDir(resolve(__dirname, outputDir));
      console.log('✅ Gzip compression complete\n');
    }
  };
}

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
    // esbuild options for transformation and minification
    esbuild: {
      // Remove console.log in AEM production builds
      drop: mode === 'standard' ? ['console', 'debugger'] : ['debugger'],
      // Legal comments handling
      legalComments: 'none',
    },
    optimizeDeps: {
      // Pre-bundle GSAP to ensure it's available
      include: mode === "banner" ? ['gsap'] : undefined,
    },
    build: {
      outDir,
      cssCodeSplit: false,
      // Ensure minification is enabled
      minify: true,
      // Ensure target is modern enough for ES modules
      target: mode === "banner" ? 'es2018' : 'es2020',
      // Increase chunk size warning limit (we're optimizing differently)
      chunkSizeWarningLimit: 600,
      commonjsOptions: {
        // Ensure proper handling of CommonJS modules like GSAP
        transformMixedEsModules: true,
        // Explicitly include GSAP for proper transformation
        include: /node_modules|gsap/,
        // Force GSAP to be treated as ES module
        defaultIsModuleExports: 'auto'
      },
      rollupOptions: {
        input: mode === "banner" ? resolve(__dirname, "index-banner.html") : resolve(__dirname, "index.html"),
        // Ensure GSAP is bundled inline for banner mode (don't externalize it)
        external: mode === "banner" ? [] : undefined,
        output: {
          // Ensure ES module format for proper GSAP loading
          format: 'es',
          // For banner and standard (AEM) modes, inline all dynamic imports
          // This avoids issues with AEM's published view not resolving chunk URLs correctly
          // Dynamic imports work in author/preview but fail in published due to URL rewriting
          ...((mode === "banner" || mode === "standard") ? {
            inlineDynamicImports: true,
          } : {}),
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
              assetInfo.name.endsWith(".gltf") ||
              assetInfo.name.endsWith(".woff") ||
              assetInfo.name.endsWith(".woff2")
            ) {
              const type = assetInfo.name.split(".").pop();
              const subDir =
                type === "mp3"
                  ? "audio"
                  : type === "mp4"
                  ? "video"
                  : type === "glb" || type === "gltf"
                  ? "models"
                  : type === "woff" || type === "woff2"
                  ? "fonts"
                  : "images";
              // For banner mode, output directly to subDir without 'assets/' prefix
              // since base path already includes '/assets/banner/'
              return mode === "banner" ? `${subDir}/[name][extname]` : `assets/${subDir}/[name][extname]`;
            }
            return mode === "banner" ? "[name]-[hash][extname]" : "assets/[name]-[hash][extname]";
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
          if (command === "build" && mode !== "banner") {
            const jsFiles = Object.keys(bundle).filter((key) => key.endsWith(".js") && !key.includes("vendor"));
            if (jsFiles.length > 0) {
              const jsBundle = bundle[jsFiles[0]];
              if (jsBundle && jsBundle.type === "chunk") {
                // Minified dat.GUI removal code
                const removeGuiCode = `(function(){var r=function(){[".dg.ac",".dg",'[class*="dg"]'].forEach(function(s){document.querySelectorAll(s).forEach(function(e){e&&e.parentNode&&e.parentNode.removeChild(e)})})};r();document.readyState==="loading"?document.addEventListener("DOMContentLoaded",r):r();setTimeout(r,100);setTimeout(r,500);setTimeout(r,1e3);typeof MutationObserver!="undefined"&&function(){var o=new MutationObserver(r);o.observe(document.body,{childList:!0,subtree:!0});setTimeout(function(){return o.disconnect()},5e3)}()})();`;
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
        name: "html-transform-timeline-images",
        transformIndexHtml(html, ctx) {
          // Transform data-src paths for timeline images based on build mode
          // From: data-src="./public/images/timeline/..." or data-src="/public/images/timeline/..."
          
          if (mode === "standard") {
            // AEM build: /content/dam/acsorg/150/assets/images/timeline/...
            html = html.replace(
              /data-src="\.?\/public\/images\/timeline\//g,
              'data-src="/content/dam/acsorg/150/assets/images/timeline/'
            );
          } else if (mode === "github") {
            // GitHub Pages build: /150-lab/assets/images/timeline/...
            html = html.replace(
              /data-src="\.?\/public\/images\/timeline\//g,
              'data-src="/150-lab/assets/images/timeline/'
            );
          } else if (mode === "assets") {
            // Assets build: /150/assets/images/timeline/...
            html = html.replace(
              /data-src="\.?\/public\/images\/timeline\//g,
              'data-src="/150/assets/images/timeline/'
            );
          } else {
            // Default/dev build: Vite serves public folder at root
            // So public/images/timeline/... becomes /images/timeline/...
            html = html.replace(
              /data-src="\.?\/public\/images\/timeline\//g,
              'data-src="/images/timeline/'
            );
          }
          
          return html;
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
        name: "transform-font-paths-for-aem",
        apply: "build",
        async writeBundle() {
          // Only run for standard mode (dist-aem)
          if (mode !== "standard") return;

          // Find CSS files in the output directory
          const outputDir = resolve(__dirname, outDir, "assets");
          const files = fs.readdirSync(outputDir);
          
          // Process each CSS file
          for (const file of files) {
            if (file.endsWith(".css")) {
              const filePath = path.join(outputDir, file);
              let content = fs.readFileSync(filePath, "utf-8");
              
              // Transform font paths from /fonts/ to /assets/fonts/
              const originalContent = content;
              content = content.replace(
                /url\(\/content\/dam\/acsorg\/150\/fonts\//g,
                'url(/content/dam/acsorg/150/assets/fonts/'
              );
              
              // Only write if content changed
              if (content !== originalContent) {
                fs.writeFileSync(filePath, content, "utf-8");
                console.log(`✅ Transformed font paths in ${file} for AEM`);
              }
            }
          }
        },
      },
      {
        name: "copy-public-to-assets",
        apply: "build",
        closeBundle() {
          // Define the public directory and the destination assets directory
          const publicDir = resolve(__dirname, "public");
          // For banner mode, copy directly to outDir root (not to /assets subdirectory)
          // since the base path already includes /assets/banner/
          const assetsDir = mode === "banner" 
            ? resolve(__dirname, outDir)
            : resolve(__dirname, `${outDir}/assets`);

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
      // Add gzip compression for AEM builds (creates .gz files alongside originals)
      // Server must be configured to serve .gz files with Content-Encoding: gzip
      ...(mode === "standard" ? [gzipPlugin(outDir)] : []),
    ],
  };
});
