
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // This defines the global process.env.API_KEY string that the app code expects.
    // Vite will replace occurrences in the source with the value from your Vercel/System environment.
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  },
  build: {
    target: 'esnext'
  },
  server: {
    port: 3000
  }
});
