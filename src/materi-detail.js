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

hljs.registerLanguage('php', php)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('bash', bash)

const app = document.querySelector('#app')

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

const loadMateriData = async (slugOrId, data) => {
  try {
    if (!data) {
      const response = await fetch('/materi-list.json')
      if (!response.ok) throw new Error('Materi list not found')
      data = await response.json()
    }
    const materiById = data.materi.find(m => m.id === parseInt(slugOrId))
    if (materiById) return materiById
    const materiBySlug = data.materi.find(m => m.slug === slugOrId)
    if (materiBySlug) return materiBySlug
    throw new Error('Materi not found')
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

const renderSidebar = (materiList, currentId) => {
  return materiList.map(m => `
    <a href="/materi-detail.html?m=${m.id}" class="sidebar-item ${m.id === currentId ? 'active' : ''}">
      <span class="sidebar-number">${m.id}</span>
      <span class="sidebar-title">${m.title}</span>
    </a>
  `).join('')
}

const renderMateriDetail = async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const slug = urlParams.get('m') || urlParams.get('slug') || '1'

  const response = await fetch('/materi-list.json')
  const data = await response.json()

  const materiData = await loadMateriData(slug, data)

  if (!materiData) {
    window.location.href = '/404.html'
    return
  }

  const content = await loadMarkdown(materiData.file)

  const currentIndex = data.materi.findIndex(m => m.id === materiData.id)
  const previousMateri = currentIndex > 0 ? data.materi[currentIndex - 1] : null
  const nextMateri = currentIndex < data.materi.length - 1 ? data.materi[currentIndex + 1] : null

  const term = `materi:${materiData.id}`

  // Check if quiz exists for this materi
  let hasQuiz = false
  try {
    const quizResponse = await fetch('/quiz.json')
    if (quizResponse.ok) {
      const quizData = await quizResponse.json()
      hasQuiz = !!quizData[materiData.id]
    }
  } catch (e) {
    hasQuiz = false
  }

  app.innerHTML = `
    ${renderNavbar()}

    <section class="materi-detail-section">
      <div class="materi-layout materi-layout-right-sidebar">
        <aside class="materi-sidebar">
          <button class="sidebar-header" id="sidebar-toggle">
            <div class="sidebar-header-left">
              <i class="fa-solid fa-book"></i>
              <span>Daftar Materi</span>
            </div>
            <i class="fa-solid fa-chevron-down sidebar-arrow"></i>
          </button>
          <nav class="sidebar-nav" id="sidebar-nav">
            ${renderSidebar(data.materi, materiData.id)}
          </nav>
        </aside>

        <div class="materi-detail-container">
          <article class="markdown-content">
            ${content}
          </article>

          ${hasQuiz ? `
          <div class="quiz-cta-section">
            <div class="quiz-cta-content">
              <div class="quiz-cta-icon">
                <i class="fa-solid fa-clipboard-question"></i>
              </div>
              <div class="quiz-cta-text">
                <h3>Uji Pemahamanmu</h3>
                <p>Jawab kuis untuk menguji pemahaman materi ini. Kamu butuh minimal 75% untuk lulus.</p>
              </div>
              <a href="/kuis-terpisah.html?m=${materiData.id}" class="quiz-cta-button">
                <i class="fa-solid fa-pen-to-square"></i> Kerjakan Kuis
              </a>
            </div>
          </div>
          ` : ''}

          <div class="materi-navigation">
            ${previousMateri ? `
              <a href="/materi-detail.html?m=${previousMateri.id}" class="nav-button nav-prev">
                <i class="fa-solid fa-chevron-left"></i> ${previousMateri.title}
              </a>
            ` : `<div class="nav-button-placeholder"></div>`}

            ${nextMateri ? `
              <a href="/materi-detail.html?m=${nextMateri.id}" class="nav-button nav-next">
                ${nextMateri.title} <i class="fa-solid fa-chevron-right"></i>
              </a>
            ` : `<div class="nav-button-placeholder"></div>`}
          </div>
        </div>
      </div>
    </section>

    <button class="back-to-top" id="back-to-top" aria-label="Kembali ke atas">
      <i class="fa-solid fa-arrow-up"></i>
    </button>

    ${renderGiscusWrapper()}
    ${renderFooter()}
  `

  initHamburger()

  // Navbar scroll shadow
  const navbar = document.querySelector('navbar')
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20)
    })
  }

  // Sidebar accordion
  const sidebarToggle = document.getElementById('sidebar-toggle')
  const sidebarNav = document.getElementById('sidebar-nav')

  if (sidebarToggle && sidebarNav) {
    const isMobile = () => window.innerWidth <= 1024
    if (isMobile()) sidebarNav.classList.add('collapsed')

    sidebarToggle.addEventListener('click', () => {
      if (isMobile()) {
        sidebarNav.classList.toggle('collapsed')
        sidebarToggle.classList.toggle('active')
      }
    })

    window.addEventListener('resize', () => {
      if (!isMobile()) {
        sidebarNav.classList.remove('collapsed')
        sidebarToggle.classList.remove('active')
      } else if (!sidebarToggle.classList.contains('active')) {
        sidebarNav.classList.add('collapsed')
      }
    })
  }

  // Back to top
  const backToTop = document.getElementById('back-to-top')
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 300)
    })
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  setTimeout(() => { initGiscus(term) }, 100)
}

renderMateriDetail()
