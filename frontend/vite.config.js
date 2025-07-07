import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{port:5173},
    base: './' // 👈 this helps for correct asset paths in production
})
