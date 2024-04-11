import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['/squad-react/dist/squad-logo-white.png'],
    manifest: {
      name: 'SQUAD',
      short_name: 'SQUAD',
      theme_color: '#000000',
      background_color: '#000000',
      display: 'standalone',
      scope: '/squad-react/dist/',
      start_url: '/squad-react/dist/',
      icons: [
        {
          src: '/squad-react/dist/squad-icon.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '/squad-react/dist/squad-icon-maskable.png',
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
