import { defineConfig } from "vite";
import { resolve } from 'path';
import fs from 'fs';
import path from 'path';

export default defineConfig(({ mode, command }) => {
  // Determine output directory based on mode
  const outDir = mode === "standard" ? "dist-aem" : 
                 mode === "assets" ? "dist-assets" : "dist";
  
  // Determine base path based on mode
  const basePath = mode === "github" ? "/150-lab/" : 
                   mode === "assets" ? "/150/" : "/";
  
  return {
    base: basePath,
    build: {
      outDir,
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            // Handle all media files consistently in the assets directory
            if (assetInfo.name.endsWith('.mp3') || 
                assetInfo.name.endsWith('.mp4') || 
                assetInfo.name.endsWith('.jpg') || 
                assetInfo.name.endsWith('.png') ||
                assetInfo.name.endsWith('.webp') ||
                assetInfo.name.endsWith('.svg')) {
              const type = assetInfo.name.split('.').pop();
              const subDir = type === 'mp3' ? 'audio' : 
                            type === 'mp4' ? 'video' : 'images';
              return `assets/${subDir}/[name][extname]`;
            }
            return 'assets/[name]-[hash][extname]';
          }
        }
      }
    },
    plugins: [
      {
        name: "html-transform-preload",
        transformIndexHtml(html, ctx) {
          // ✅ Only run this during the build process
          if (!ctx || !ctx.bundle) return html;

          const cssFile = Object.keys(ctx.bundle).find((key) =>
            key.endsWith(".css")
          );
          const jsFile = Object.keys(ctx.bundle).find((key) =>
            key.endsWith(".js")
          );

          // Use the correct base path based on build mode
          const basePath = mode === "github" ? "/150-lab/" : 
                           mode === "assets" ? "/150/" : "/";

          return html.replace(
            "</head>",
            `
              ${
                cssFile
                  ? `<link rel="preload" href="${basePath}${cssFile}" as="style">`
                  : ""
              }
              ${
                jsFile
                  ? `<link rel="preload" href="${basePath}${jsFile}" as="script">`
                  : ""
              }
            </head>`
          );
        },
      },
      {
        name: "copy-public-to-assets",
        apply: 'build',
        closeBundle() {
          // Define the public directory and the destination assets directory
          const publicDir = resolve(__dirname, 'public');
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
                if (entry === '.DS_Store') continue;
                
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
            if (entry === '.DS_Store') continue;
            
            const srcPath = path.join(publicDir, entry);
            const stats = fs.statSync(srcPath);
            
            // Only copy directories, not individual files at the root level
            if (stats.isDirectory()) {
              const destPath = path.join(assetsDir, entry);
              copyRecursive(srcPath, destPath);
            }
          }
        }
      }
    ],
  };
});
