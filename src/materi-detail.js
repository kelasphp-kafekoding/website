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

// Load quiz data
let quizData = {}

const loadQuizData = async () => {
  try {
    const response = await fetch('/quiz.json')
    if (response.ok) {
      const data = await response.json()
      quizData = data
    }
  } catch (error) {
    console.warn('Quiz data not available:', error)
  }
}

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

// Escape HTML entities to prevent XSS and rendering issues
const escapeHtml = (str) => {
  const div = document.createElement('div')
  div.textContent = str
  return div.innerHTML
}

const renderQuiz = (quiz) => {
  if (!quiz || !quiz.questions) return ''

  const safeTitle = escapeHtml(quiz.title)
  let html = `
    <div class="quiz-section" id="quiz-section">
      <div class="quiz-header">
        <h2><i class="fa-solid fa-clipboard-question"></i> Kuis: ${safeTitle}</h2>
        <p class="quiz-desc">Jawab ${quiz.questions.length} pertanyaan berikut untuk menguji pemahamanmu.</p>
      </div>
  `

  quiz.questions.forEach((q, i) => {
    const safeQuestion = escapeHtml(q.question)
    html += `
      <div class="quiz-question" id="quiz-q${i}">
        <p class="quiz-question-text"><strong>${i + 1}.</strong> ${safeQuestion}</p>
        <div class="quiz-options">
    `
    q.options.forEach((opt, j) => {
      const safeOption = escapeHtml(opt)
      html += `
        <label class="quiz-option">
          <input type="radio" name="quiz${i}" value="${j}" onchange="checkQuizAnswer(${i}, ${j}, ${q.answer})">
          <span>${String.fromCharCode(65 + j)}. ${safeOption}</span>
        </label>
      `
    })
    html += `
          <div class="quiz-feedback" id="quiz-feedback-${i}"></div>
        </div>
      </div>
    `
  })

  html += `
      <button class="quiz-submit-btn" id="quiz-submit" onclick="showQuizResults()">
        <i class="fa-solid fa-paper-plane"></i> Periksa Jawaban
      </button>
      <div class="quiz-result" id="quiz-result"></div>
    </div>
  `

  return html
}

// Global quiz checker
window.checkQuizAnswer = (qIndex, selected, correct) => {
  const feedback = document.getElementById(`quiz-feedback-${qIndex}`)
  if (feedback) {
    if (selected === correct) {
      feedback.innerHTML = '<i class="fa-solid fa-check-circle"></i> Benar!'
      feedback.className = 'quiz-feedback quiz-correct'
    } else {
      feedback.innerHTML = '<i class="fa-solid fa-times-circle"></i> Salah, coba lagi.'
      feedback.className = 'quiz-feedback quiz-wrong'
    }
  }
}

window.showQuizResults = () => {
  const quiz = window.__currentQuiz
  if (!quiz) return

  let correct = 0
  quiz.questions.forEach((q, i) => {
    const selected = document.querySelector(`input[name="quiz${i}"]:checked`)
    if (selected && parseInt(selected.value) === q.answer) {
      correct++
    }
  })

  const total = quiz.questions.length
  const percentage = Math.round((correct / total) * 100)
  const resultEl = document.getElementById('quiz-result')
  const emoji = percentage >= 75 ? '🎉' : '💪'

  resultEl.innerHTML = `
    <div class="quiz-score ${percentage >= 75 ? 'quiz-pass' : 'quiz-fail'}">
      <span class="quiz-score-emoji">${emoji}</span>
      <span class="quiz-score-text">Skor: ${correct}/${total} (${percentage}%)</span>
      ${percentage >= 75 ? '<span class="quiz-score-badge">Lulus!</span>' : '<span class="quiz-score-badge">Belum Lulus (min. 75%)</span>'}
    </div>
  `
  resultEl.style.display = 'block'
}

const renderMateriDetail = async () => {
  await loadQuizData()

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

  // Get quiz for this materi
  const quiz = quizData[materiData.id] || null
  window.__currentQuiz = quiz

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

          ${quiz ? renderQuiz(quiz) : ''}

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
