import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5500',
    },
  },
  resolve: {
    alias: {
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
      '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
      '@interfaces': fileURLToPath(new URL('./src/shared/interfaces', import.meta.url)),
      '@interceptors': fileURLToPath(new URL('./src/shared/interceptors', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/shared/services', import.meta.url)),
      '@constants': fileURLToPath(new URL('./src/shared/constants', import.meta.url)),
    },
  },
})
