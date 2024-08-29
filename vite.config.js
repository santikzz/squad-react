import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: "/",
  plugins: [react(),

  VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['/squad-icon-512-maskable.png'],
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
          src: '/squad-icon-512-maskable.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: '/squad-icon-512-maskable.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ],
      "screenshots": [
        {
          "src": "/screen.png",
          "sizes": "640x320",
          "type": "image/png",
          "form_factor": "wide",
          "label": "Application"
        },
        {
          "src": "/screen.png",
          "sizes": "640x320",
          "type": "image/png",
          "form_factor": "narrow",
          "label": "Application"
        }
      ]
    }
  })

  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
