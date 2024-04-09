import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico'],
    manifest: {
      name: 'SQUAD',
      short_name: 'SQUAD',
      theme_color: '#000000',
      background_color: '#000000',
      display: 'standalone',
      scope: '/',
      start_url: '/',
      icons: [
        {
          src: 'squad-icon.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'squad-icon-maskable.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    }
  })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
