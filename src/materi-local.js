import './style.css'
import './pages.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { initHamburger } from './hamburger.js'
import { renderNavbar } from './components/navbar.js'
import { renderFooter } from './components/footer.js'

AOS.init({ duration: 600, once: true, offset: 50, easing: 'ease-out-cubic' })

const app = document.querySelector('#app')

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('id-ID', options)
}

const renderLoading = () => {
  app.innerHTML = `
    ${renderNavbar()}
    <section class="page-section">
      <div class="page-container">
        <div class="page-heading">
          <span class="section-label"><i class="fa-solid fa-book-open"></i> Materi</span>
          <h1>Materi Kelas PHP</h1>
          <p class="subtitle">Pelajari PHP dari dasar hingga mahir</p>
        </div>
        <div class="loading-state">Memuat materi...</div>
      </div>
    </section>
  `
  initHamburger()
}

const renderError = (error) => {
  app.innerHTML = `
    ${renderNavbar()}
    <section class="page-section">
      <div class="page-container">
        <div class="page-heading">
          <span class="section-label"><i class="fa-solid fa-book-open"></i> Materi</span>
          <h1>Materi Kelas PHP</h1>
          <p class="subtitle">Pelajari PHP dari dasar hingga mahir</p>
        </div>
        <div class="error-state">${error}</div>
      </div>
    </section>
  `
  initHamburger()
}

const renderMateri = (materiList) => {
  app.innerHTML = `
    ${renderNavbar()}

    <section class="page-section">
      <div class="page-container">
        <div class="page-heading">
          <span class="section-label"><i class="fa-solid fa-book-open"></i> Materi</span>
          <h1>Materi Kelas PHP</h1>
          <p class="subtitle">Pelajari PHP dari dasar hingga mahir dengan materi terstruktur</p>
        </div>

        <div class="kelas-grid">
          ${materiList.map((materi, index) => `
            <div class="card" data-aos="fade-up" data-aos-delay="${index * 50}">
              <div class="card-thumb">
                <img src="${materi.thumbnail}" alt="${materi.title}" loading="lazy">
              </div>
              <div class="card-body-inner">
                <span class="card-tag">Materi ${materi.id}</span>
                <h3 class="card-title-inner">${materi.title}</h3>
                <p class="card-desc-inner">${materi.description}</p>
                <div class="card-meta">
                  <span class="card-author">${materi.author}</span>
                  <span class="card-date">${formatDate(materi.date)}</span>
                </div>
                <button class="card-button" onclick="window.location.href='/materi-detail.html?m=${materi.slug}'">Baca Materi</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
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

  setTimeout(() => AOS.refresh(), 100)

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

const extractImageFromMarkdown = async (filename) => {
  try {
    const response = await fetch(`/materi/${filename}`)
    if (!response.ok) return null
    const markdown = await response.text()
    const imgRegex = /!\[.*?\]\((.*?)\)/
    const match = markdown.match(imgRegex)
    return match ? match[1] : null
  } catch (error) {
    return null
  }
}

async function loadMateri() {
  renderLoading()

  try {
    const response = await fetch('/materi-list.json')
    if (!response.ok) throw new Error('Gagal memuat daftar materi')

    const data = await response.json()

    if (!data.materi || data.materi.length === 0) {
      renderError('Belum ada materi tersedia.')
      return
    }

    const materiWithImages = await Promise.all(
      data.materi.map(async (materi) => {
        const imageFromMd = await extractImageFromMarkdown(materi.file)
        return {
          ...materi,
          thumbnail: imageFromMd || materi.thumbnail || 'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=400&h=250&fit=crop'
        }
      })
    )

    renderMateri(materiWithImages)
  } catch (error) {
    renderError(`Error: ${error.message}`)
  }
}

loadMateri()
