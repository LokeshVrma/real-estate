import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://real-estate-production-69eb.up.railway.app/',
        changeOrigin: true,
      },
    },
  },
});
