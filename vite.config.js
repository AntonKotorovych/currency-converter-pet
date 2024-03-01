import { defineConfig } from 'vite';
import jsconfigPaths from 'vite-jsconfig-paths';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  build: {
    outDir: 'public'
  },
  plugins: [react(), jsconfigPaths()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          '@import "./src/styles/colorMatrix.scss"; @import "./src/styles/fonts.scss";'
      }
    }
  }
});
