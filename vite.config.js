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
        tentang: resolve(__dirname, 'tentang.html'),
        kontak: resolve(__dirname, 'kontak.html'),
        notFound: resolve(__dirname, '404.html'),
      }
    }
  },
  appType: 'mpa'
})
