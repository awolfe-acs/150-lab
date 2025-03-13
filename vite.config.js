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
          // Put audio files in the assets directory
          if (assetInfo.name.endsWith('.mp3')) {
            return 'assets/audio/[name][extname]';
          }
          // Put video files in the video directory
          if (assetInfo.name.endsWith('.mp4')) {
            return 'assets/video/[name][extname]';
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
    {
      name: "copy-audio-files",
      apply: 'build',
      closeBundle() {
        // Copy audio files from public/audio to assets/audio in the dist folder
        const publicAudioDir = resolve(__dirname, 'public/audio');
        const distAudioDir = resolve(__dirname, 'dist/assets/audio');
        
        // Create the audio directory in assets if it doesn't exist
        if (!fs.existsSync(distAudioDir)) {
          fs.mkdirSync(distAudioDir, { recursive: true });
        }
        
        // Copy all audio files
        if (fs.existsSync(publicAudioDir)) {
          const audioFiles = fs.readdirSync(publicAudioDir);
          audioFiles.forEach(file => {
            if (file.endsWith('.mp3')) {
              fs.copyFileSync(
                resolve(publicAudioDir, file),
                resolve(distAudioDir, file)
              );
            }
          });
        }
      }
    },
    {
      name: "copy-video-files",
      apply: 'build',
      closeBundle() {
        // Copy video files from public/video to video in the dist folder
        const publicVideoDir = resolve(__dirname, 'public/video');
        const distVideoDir = resolve(__dirname, 'dist/video');
        
        // Create the video directory if it doesn't exist
        if (!fs.existsSync(distVideoDir)) {
          fs.mkdirSync(distVideoDir, { recursive: true });
        }
        
        // Copy all video files
        if (fs.existsSync(publicVideoDir)) {
          const videoFiles = fs.readdirSync(publicVideoDir);
          videoFiles.forEach(file => {
            if (file.endsWith('.mp4')) {
              fs.copyFileSync(
                resolve(publicVideoDir, file),
                resolve(distVideoDir, file)
              );
            }
          });
        }
      }
    }
  ],
}));
