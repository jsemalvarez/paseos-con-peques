### Instalá el plugin PWA

```
npm install vite-plugin-pwa --save-dev
```

### Editá tu vite.config.js

```
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate', //prompt, autoUpdate
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'], // Cachea todo esto
      },
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/res\.cloudinary\.com\/.*\.(png|jpg|jpeg|svg|webp)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'cloudinary-img-profiles',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
            },
          },
        },
        {
          urlPattern: /^https:\/\/[abc]\.tile\.openstreetmap\.org\/.*/,
          handler: 'NetworkOnly', // O 'StaleWhileRevalidate' si querés que se vea lo último cargado y luego actualice
          options: {
            cacheName: 'leaflet-tiles',
          },
        }
      ],
      manifest: {
        name: 'Paseos con Peques',
        short_name: 'PcP',
        description: 'Mapa y eventos para familias con peques',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})

```

### Compilar y probar

```
npm run build
npx serve dist
```

npx serve dist abre un puerto en local para probar la PWA

### Extra: Agregar el botón de instalación en React

```
import { useEffect, useState } from 'react'

function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
    }
  }

  return (
    <button onClick={handleInstallClick} disabled={!deferredPrompt}>
      Instalar App
    </button>
  )
}

```
