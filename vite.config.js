import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false
  },
  // Add server configuration to allow external access
  server: {
    host: true, // This enables listening on all local IPs
    port: 5173  // Default Vite port (optional)
  }
})
