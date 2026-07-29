import './style.css'
import './pages.css'
import { initHamburger } from './hamburger.js'
import { renderNavbar } from './components/navbar.js'
import { renderFooter } from './components/footer.js'

const app = document.querySelector('#app')

// Escape HTML entities
const escapeHtml = (str) => {
  const div = document.createElement('div')
  div.textContent = str
  return div.innerHTML
}

// Load quiz data
let quizData = {}

const loadQuizData = async () => {
  try {
    const response = await fetch('/quiz.json')
    if (response.ok) {
      quizData = await response.json()
    }
  } catch (error) {
    console.warn('Quiz data not available:', error)
  }
}

const loadMateriList = async () => {
  try {
    const response = await fetch('/materi-list.json')
    if (response.ok) return await response.json()
  } catch (error) {
    console.error('Error loading materi list:', error)
  }
  return { materi: [] }
}

const renderQuiz = (quiz) => {
  if (!quiz || !quiz.questions) return ''

  const safeTitle = escapeHtml(quiz.title)
  let html = `
    <div class="quiz-container">
      <div class="quiz-header-standalone">
        <a href="/materi.html" class="quiz-back-link">
          <i class="fa-solid fa-arrow-left"></i> Kembali ke Materi
        </a>
        <div class="quiz-header-content">
          <h1><i class="fa-solid fa-clipboard-question"></i> Kuis: ${safeTitle}</h1>
          <p class="quiz-desc-standalone">Jawab ${quiz.questions.length} pertanyaan berikut untuk menguji pemahamanmu tentang materi ini.</p>
          <div class="quiz-info-badges">
            <span class="quiz-badge"><i class="fa-solid fa-question-circle"></i> ${quiz.questions.length} Soal</span>
            <span class="quiz-badge"><i class="fa-solid fa-percent"></i> Minimal 75% untuk lulus</span>
            <span class="quiz-badge"><i class="fa-solid fa-clock"></i> Tanpa batas waktu</span>
          </div>
        </div>
      </div>

      <form id="quiz-form" class="quiz-form">
  `

  quiz.questions.forEach((q, i) => {
    const safeQuestion = escapeHtml(q.question)
    html += `
      <div class="quiz-question-standalone" id="quiz-q${i}">
        <div class="quiz-question-header">
          <span class="quiz-number">Soal ${i + 1}</span>
        </div>
        <p class="quiz-question-text-standalone">${safeQuestion}</p>
        <div class="quiz-options-standalone">
    `
    q.options.forEach((opt, j) => {
      const safeOption = escapeHtml(opt)
      html += `
        <label class="quiz-option-standalone" data-index="${j}">
          <input type="radio" name="quiz${i}" value="${j}">
          <span class="quiz-option-letter">${String.fromCharCode(65 + j)}</span>
          <span class="quiz-option-text">${safeOption}</span>
        </label>
      `
    })
    html += `
          <div class="quiz-feedback-standalone" id="quiz-feedback-${i}"></div>
        </div>
      </div>
    `
  })

  html += `
      </form>

      <div class="quiz-actions-standalone">
        <button class="quiz-submit-btn-standalone" id="quiz-submit-standalone">
          <i class="fa-solid fa-paper-plane"></i> Periksa Jawaban
        </button>
        <button class="quiz-reset-btn" id="quiz-reset-standalone" style="display:none;">
          <i class="fa-solid fa-rotate-right"></i> Ulangi Kuis
        </button>
      </div>

      <div class="quiz-result-standalone" id="quiz-result"></div>

      <div class="quiz-nav-bottom">
        <a href="/materi.html" class="quiz-nav-link">
          <i class="fa-solid fa-book-open"></i> Kembali ke Daftar Materi
        </a>
      </div>
    </div>
  `

  return html
}

const renderQuizPage = async () => {
  await loadQuizData()
  const materiList = await loadMateriList()

  const urlParams = new URLSearchParams(window.location.search)
  const materiId = parseInt(urlParams.get('m') || '1')

  const materi = materiList.materi.find(m => m.id === materiId)
  const quiz = quizData[materiId] || null

  if (!quiz) {
    app.innerHTML = `
      ${renderNavbar()}
      <section class="quiz-container">
        <div class="quiz-empty-state">
          <i class="fa-solid fa-clipboard-question" style="font-size: 3rem; color: var(--accent); margin-bottom: 16px;"></i>
          <h2>Kuis Tidak Tersedia</h2>
          <p>Kuis untuk materi ini belum tersedia.</p>
          <a href="/materi.html" class="btn btn-primary">
            <i class="fa-solid fa-arrow-left"></i> Kembali ke Materi
          </a>
        </div>
      </section>
      ${renderFooter()}
    `
    return
  }

  const materiTitle = materi?.title || quiz.title

  app.innerHTML = `
    ${renderNavbar()}

    <section class="quiz-page-section">
      <div class="quiz-page-header">
        <div class="quiz-page-context">
          <a href="/materi-detail.html?m=${materiId}" class="quiz-page-materi-link">
            <i class="fa-solid fa-book"></i> ${escapeHtml(materiTitle)}
          </a>
        </div>
        <h1 class="quiz-page-title"><i class="fa-solid fa-clipboard-question"></i> Kuis</h1>
      </div>

      ${renderQuiz(quiz)}
    </section>

    <button class="back-to-top" id="back-to-top" aria-label="Kembali ke atas">
      <i class="fa-solid fa-arrow-up"></i>
    </button>

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

  // Quiz submit handler
  const submitBtn = document.getElementById('quiz-submit-standalone')
  const resetBtn = document.getElementById('quiz-reset-standalone')
  const resultEl = document.getElementById('quiz-result')
  const quizForm = document.getElementById('quiz-form')

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const total = quiz.questions.length
      let correct = 0
      let allAnswered = true

      quiz.questions.forEach((q, i) => {
        const selected = document.querySelector(`input[name="quiz${i}"]:checked`)
        const feedback = document.getElementById(`quiz-feedback-${i}`)

        if (!selected) {
          allAnswered = false
          if (feedback) {
            feedback.innerHTML = '<i class="fa-solid fa-exclamation-circle"></i> Pilih salah satu jawaban'
            feedback.className = 'quiz-feedback-standalone quiz-unanswered'
          }
          return
        }

        const selectedIndex = parseInt(selected.value)
        if (selectedIndex === q.answer) {
          correct++
          if (feedback) {
            feedback.innerHTML = '<i class="fa-solid fa-check-circle"></i> Benar!'
            feedback.className = 'quiz-feedback-standalone quiz-correct'
          }
        } else {
          if (feedback) {
            feedback.innerHTML = `<i class="fa-solid fa-times-circle"></i> Salah. Jawaban yang benar: ${String.fromCharCode(65 + q.answer)}`
            feedback.className = 'quiz-feedback-standalone quiz-wrong'
          }
        }
      })

      if (!allAnswered) {
        resultEl.style.display = 'none'
        resultEl.innerHTML = ''
        return
      }

      const percentage = Math.round((correct / total) * 100)
      const passed = percentage >= 75
      const emoji = passed ? '🎉' : '💪'

      resultEl.innerHTML = `
        <div class="quiz-score-standalone ${passed ? 'quiz-pass' : 'quiz-fail'}">
          <div class="quiz-score-content">
            <span class="quiz-score-emoji">${emoji}</span>
            <div class="quiz-score-info">
              <span class="quiz-score-text">Skor: ${correct}/${total} (${percentage}%)</span>
              <span class="quiz-score-badge">${passed ? 'Lulus! Selamat!' : 'Belum Lulus (min. 75%)'}</span>
            </div>
          </div>
        </div>
      `
      resultEl.style.display = 'block'
      submitBtn.style.display = 'none'
      resetBtn.style.display = 'inline-flex'

      // Scroll to result
      resultEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      // Reset all radio buttons
      quizForm.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false)
      // Clear all feedbacks
      quizForm.querySelectorAll('.quiz-feedback-standalone').forEach(f => {
        f.innerHTML = ''
        f.className = 'quiz-feedback-standalone'
      })
      // Hide result
      resultEl.style.display = 'none'
      resultEl.innerHTML = ''
      // Show submit, hide reset
      submitBtn.style.display = 'inline-flex'
      resetBtn.style.display = 'none'
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  // Option click animation
  document.querySelectorAll('.quiz-option-standalone').forEach(opt => {
    opt.addEventListener('click', () => {
      const radio = opt.querySelector('input[type="radio"]')
      if (radio) radio.checked = true
    })
  })

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
}

renderQuizPage()
