import { defineConfig } from "vite";
import { resolve } from "path";
import fs from "fs";
import path from "path";

export default defineConfig(({ mode, command }) => {
  // Determine output directory based on mode
  const outDir = mode === "standard" ? "dist-aem" : mode === "assets" ? "dist-assets" : "dist";

  // Determine base path based on mode
  const basePath =
    mode === "github"
      ? "/150-lab/"
      : mode === "assets"
      ? "/150/"
      : mode === "standard"
      ? "/content/dam/acsorg/150/"
      : "/";

  return {
    base: basePath,
    build: {
      outDir,
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
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
          // Only run in build command (production builds)
          if (command === "build") {
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
