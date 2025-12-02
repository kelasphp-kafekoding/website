import './style.css'
import './pages.css'
import { marked } from 'marked'
import { initHamburger } from './hamburger.js'
import hljs from 'highlight.js/lib/core'
import php from 'highlight.js/lib/languages/php'
import javascript from 'highlight.js/lib/languages/javascript'
import sql from 'highlight.js/lib/languages/sql'
import bash from 'highlight.js/lib/languages/bash'

// Register languages
hljs.registerLanguage('php', php)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('bash', bash)

const app = document.querySelector('#app')

// Configure marked
marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value
    }
    return hljs.highlightAuto(code).value
  },
  breaks: true,
  gfm: true
})

const loadMateriData = async (slug) => {
  try {
    const response = await fetch('/materi-list.json')
    if (!response.ok) throw new Error('Materi list not found')
    
    const data = await response.json()
    const materi = data.materi.find(m => m.slug === slug || m.id === parseInt(slug))
    
    if (!materi) throw new Error('Materi not found')
    return materi
  } catch (error) {
    console.error('Error loading materi data:', error)
    return null
  }
}

const loadMarkdown = async (filename) => {
  try {
    const response = await fetch(`/materi/${filename}`)
    if (!response.ok) throw new Error('File not found')
    const markdown = await response.text()
    return marked.parse(markdown)
  } catch (error) {
    console.error('Error loading markdown:', error)
    return '<p>Materi tidak ditemukan.</p>'
  }
}

const renderMateriDetail = async () => {
  // Get slug from URL parameter (support both 'm' and old 'file' for backward compatibility)
  const urlParams = new URLSearchParams(window.location.search)
  const slug = urlParams.get('m') || urlParams.get('slug') || '1'

  const materiData = await loadMateriData(slug)
  
  if (!materiData) {
    app.innerHTML = '<div style="text-align: center; padding: 100px 20px;"><h1>Materi tidak ditemukan</h1><p><a href="/materi.html">Kembali ke daftar materi</a></p></div>'
    return
  }

  const content = await loadMarkdown(materiData.file)

  app.innerHTML = `
    <navbar>
      <div class="logo-container" onclick="window.location.href='/'">
        <img src="/icons/kk.png" alt="Kafekoding" class="logo-img">
        <div class="logo-text">
          <div class="logo-title">Kafekoding</div>
          <div class="logo-subtitle">Kelas PHP</div>
        </div>
      </div>
      <button class="hamburger" id="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul class="nav-menu" id="nav-menu">
        <li><a href="/#home">Home</a></li>
        <li><a href="/#showcase">Showcase</a></li>
        <li><a href="/#gallery">Galeri</a></li>
        <li><a href="/#comments">Testimoni</a></li>
        <li><a href="/tentang.html">Tentang</a></li>
        <li><a href="/kontak.html">Kontak</a></li>
      </ul>
    </navbar>

    <section class="materi-detail-section">
      <div class="materi-detail-container">
        <button class="back-button" onclick="window.history.back()">
          <i class="fa-solid fa-arrow-left"></i> Kembali
        </button>
        
        <article class="markdown-content">
          ${content}
        </article>
      </div>
    </section>

    <footer class="footer-section">
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-column">
            <div class="footer-logo">
              <img src="/icons/kk.png" alt="Kafekoding" class="footer-logo-img">
              <div>
                <div class="footer-logo-title">Kafekoding</div>
                <div class="footer-logo-subtitle">Kelas PHP</div>
              </div>
            </div>
            <p class="footer-desc">Platform pembelajaran PHP yang menyenangkan dan interaktif untuk semua level.</p>
          </div>
          
          <div class="footer-column">
            <h4>Menu</h4>
            <ul>
              <li><a href="/#home">Home</a></li>
              <li><a href="/#showcase">Showcase</a></li>
              <li><a href="/#gallery">Galeri</a></li>
              <li><a href="/#comments">Testimoni</a></li>
            </ul>
          </div>
          
          <div class="footer-column">
            <h4>Lainnya</h4>
            <ul>
              <li><a href="/tentang.html">Tentang</a></li>
              <li><a href="/kontak.html">Kontak</a></li>
            </ul>
          </div>
          
          <div class="footer-column">
            <h4>Ikuti Kami</h4>
            <ul>
              <li><a href="https://www.instagram.com/kafekoding" target="_blank">Instagram</a></li>
              <li><a href="https://www.tiktok.com/@kafekoding" target="_blank">TikTok</a></li>
              <li><a href="https://github.com/kelasphp-kafekoding/" target="_blank">GitHub</a></li>
            </ul>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; 2025 Kafekoding. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `

  initHamburger()
}

renderMateriDetail()
