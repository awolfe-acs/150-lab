import { defineConfig } from "vite";
import { resolve } from 'path';
import fs from 'fs';

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/150-lab/" : "/",
  build: {
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

        return html.replace(
          "</head>",
          `
            ${
              cssFile
                ? `<link rel="preload" href="/150-lab/assets/${cssFile}" as="style">`
                : ""
            }
            ${
              jsFile
                ? `<link rel="preload" href="/150-lab/assets/${jsFile}" as="script">`
                : ""
            }
          </head>`
        );
      },
    },
  ],
}));
