import { resolve } from 'path'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(fileURLToPath(new URL('.', import.meta.url)), 'index.html'),
        materi: resolve(fileURLToPath(new URL('.', import.meta.url)), 'materi.html'),
        showcase: resolve(fileURLToPath(new URL('.', import.meta.url)), 'showcase.html'),
        materiDetail: resolve(fileURLToPath(new URL('.', import.meta.url)), 'materi-detail.html'),
        tentang: resolve(fileURLToPath(new URL('.', import.meta.url)), 'tentang.html'),
        kontak: resolve(fileURLToPath(new URL('.', import.meta.url)), 'kontak.html'),
        notFound: resolve(fileURLToPath(new URL('.', import.meta.url)), '404.html'),
      }
    }
  },
  appType: 'mpa'
})
