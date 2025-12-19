import './style.css'
import './pages.css'
import { marked } from 'marked'
import { initHamburger } from './hamburger.js'
import { renderNavbar } from './components/navbar.js'
import { renderFooter, renderGiscusWrapper, initGiscus } from './components/footer.js'
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

const renderSidebar = (materiList, currentSlug) => {
  return materiList.map(m => `
    <a href="/materi-detail.html?m=${m.slug}" class="sidebar-item ${m.slug === currentSlug ? 'active' : ''}">
      <span class="sidebar-number">${m.id}</span>
      <span class="sidebar-title">${m.title}</span>
    </a>
  `).join('')
}

const renderMateriDetail = async () => {
  // Get slug from URL parameter (support both 'm' and old 'file' for backward compatibility)
  const urlParams = new URLSearchParams(window.location.search)
  const slug = urlParams.get('m') || urlParams.get('slug') || '1'

  const response = await fetch('/materi-list.json')
  const data = await response.json()
  
  const materiData = await loadMateriData(slug)
  
  if (!materiData) {
    // Redirect to 404 page
    window.location.href = '/404.html'
    return
  }

  const content = await loadMarkdown(materiData.file)
  
  // Find current materi index
  const currentIndex = data.materi.findIndex(m => m.slug === materiData.slug)
  const previousMateri = currentIndex > 0 ? data.materi[currentIndex - 1] : null
  const nextMateri = currentIndex < data.materi.length - 1 ? data.materi[currentIndex + 1] : null

  // Buat term unik untuk Giscus berdasarkan slug materi
  const term = `materi:${materiData.slug}`

  app.innerHTML = `
    ${renderNavbar()}

    <section class="materi-detail-section">
      <div class="materi-layout">
        <aside class="materi-sidebar">
          <div class="sidebar-header">
            <i class="fa-solid fa-book"></i>
            <span>Daftar Materi</span>
          </div>
          <nav class="sidebar-nav">
            ${renderSidebar(data.materi, materiData.slug)}
          </nav>
        </aside>
        
        <div class="materi-detail-container">
          <article class="markdown-content">
            ${content}
          </article>

          <div class="materi-navigation">
            ${previousMateri ? `
              <a href="/materi-detail.html?m=${previousMateri.slug}" class="nav-button nav-prev">
                <i class="fa-solid fa-chevron-left"></i> ${previousMateri.title}
              </a>
            ` : `<div class="nav-button-placeholder"></div>`}
            
            ${nextMateri ? `
              <a href="/materi-detail.html?m=${nextMateri.slug}" class="nav-button nav-next">
                ${nextMateri.title} <i class="fa-solid fa-chevron-right"></i>
              </a>
            ` : `<div class="nav-button-placeholder"></div>`}
          </div>
        </div>
      </div>
    </section>

    ${renderGiscusWrapper()}
    ${renderFooter()}
  `

  initHamburger()
  
  // Delay untuk memastikan DOM sudah ready
  setTimeout(() => {
    initGiscus(term)
  }, 100)
}

renderMateriDetail()
