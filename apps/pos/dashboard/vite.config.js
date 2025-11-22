import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Timestamp único para evitar cache
const BUILD_ID = Date.now()

// Detectar si estamos en Docker o desarrollo local
// En Docker: /app/dashboard → packages está en /app/packages (../packages)
// En local: apps/pos/dashboard → packages está en raíz (../../../packages)
const isDocker = !fs.existsSync(path.resolve(__dirname, '../../../packages'))
const packagesPath = isDocker ? '../packages' : '../../../packages'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@billtracky/components': path.resolve(__dirname, `${packagesPath}/components`),
      '@billtracky/stores': path.resolve(__dirname, `${packagesPath}/stores`),
      '@billtracky/utils': path.resolve(__dirname, `${packagesPath}/utils`),
      '@billtracky/api-client': path.resolve(__dirname, `${packagesPath}/api-client`),
    },
    dedupe: ['react', 'react-dom', 'zustand', 'zod'],
    // Asegurar que Vite busque dependencias en el node_modules del dashboard
    preserveSymlinks: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'zustand', 'lucide-react', '@tanstack/react-query', '@tanstack/react-virtual', 'date-fns', 'react-datepicker', 'sonner', 'zod'],
    // Forzar que busque deps en node_modules del dashboard
    force: true,
  },
  // NO externalizar ninguna dependencia - bundelar todo
  ssr: {
    noExternal: true,
  },
  build: {
    rollupOptions: {
      output: {
        // Forzar nuevos hashes en cada build
        entryFileNames: `assets/[name]-[hash]-${Date.now()}.js`,
        chunkFileNames: `assets/[name]-[hash]-${Date.now()}.js`,
        assetFileNames: `assets/[name]-[hash]-${Date.now()}.[ext]`
      }
    }
  },
  server: {
    port: 5175,
    strictPort: true,
  },
})
