import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Relative asset paths for GitHub Pages and local servers
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
