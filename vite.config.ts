import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  base: '/',
  build: {
    sourcemap: false,
  },
  plugins: [
    figmaAssetResolver(),
    // `?preview` on an image import yields a downscaled WebP for inline
    // gallery display; the untouched original stays available for the
    // full-resolution lightbox view.
    imagetools({
      defaultDirectives: (url) => {
        if (url.searchParams.has('preview')) {
          return new URLSearchParams({ w: '1600', format: 'webp', quality: '80', withoutEnlargement: 'true' })
        }
        return new URLSearchParams()
      },
    }),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  // Honor the PORT env var when the harness assigns one; fall back to Vite's
  // default so a plain `npm run dev` still works.
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : undefined,
  },
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
