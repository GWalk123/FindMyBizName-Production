import { defineConfig } from 'vite';

export default defineConfig({
  // Specify the root directory for your project
  root: 'client', // Adjust this if your client files are located in a different folder
  build: {
    outDir: '../dist', // Specify the output directory relative to the root
    rollupOptions: {
      input: {
        main: 'client/index.html', // Adjust this to point to your main HTML file
      },
    },
  },
});
