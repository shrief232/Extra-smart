import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  appType: 'spa', 
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html'
      },
      output: {
        manualChunks: undefined,
      },
    },
    minify: 'terser',
    sourcemap: false,
    terserOptions: {
      compress: {
        drop_console: true, 
      }
    }
  },
  base: '/',
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
})
