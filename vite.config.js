import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        materi: resolve(__dirname, 'materi.html'),
        kelas: resolve(__dirname, 'kelas.html'),
        showcase: resolve(__dirname, 'showcase.html'),
      }
    }
  }
})
