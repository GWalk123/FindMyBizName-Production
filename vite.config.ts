import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './client/index.html'
      }
    }
  },
  server: {
    port: 3000
  }
});
