import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Two entry points, two bundles. Declaring them means the guide does not
    // ship the sales page's components and the sales page does not ship the
    // guide's — neither reader downloads the other's page.
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        guide: resolve(import.meta.dirname, 'guide.html'),
      },
    },
  },
})
