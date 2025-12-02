import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        materi: resolve(__dirname, 'materi.html'),
        showcase: resolve(__dirname, 'showcase.html'),
        materiDetail: resolve(__dirname, 'materi-detail.html'),
      }
    }
  },
  server: {
    proxy: {
      '^/materi/[^/]+$': {
        target: 'http://localhost:5173',
        rewrite: (path) => {
          const slug = path.split('/').pop()
          return `/materi-detail.html?m=${slug}`
        }
      }
    }
  }
})
