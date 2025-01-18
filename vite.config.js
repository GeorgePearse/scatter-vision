import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Determine if we're running in Docker
const inDocker = process.env.DOCKER_ENV === 'true'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: inDocker ? 'http://backend:8000' : 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: 'dist'
  }
}) 
