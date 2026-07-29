import './style.css'
import './pages.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { initHamburger } from './hamburger.js'
import { renderNavbar } from './components/navbar.js'
import { renderFooter } from './components/footer.js'

AOS.init({ duration: 600, once: true, offset: 50, easing: 'ease-out-cubic' })

const app = document.querySelector('#app')

function escapeHtml(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

function sanitizeUrl(url) {
  if (!url) return '#'
  const trimmed = url.trim().toLowerCase()
  if (trimmed.startsWith('javascript:') || trimmed.startsWith('data:')) return '#'
  return url
}

const loadShowcase = async () => {
  try {
    const response = await fetch('/showcase.json')
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const data = await response.json()
    return data.showcase || []
  } catch (error) {
    console.error('Error loading showcase:', error)
    return []
  }
}

const renderProjects = (projects) => {
  const showcaseGrid = document.getElementById('showcase-grid')

  if (projects.length > 0) {
    showcaseGrid.innerHTML = projects.map((project, index) => `
      <div class="showcase-card" data-aos="fade-up" data-aos-delay="${index * 50}">
        <div class="card-image">
          <img src="${sanitizeUrl(project.gambar)}" alt="${escapeHtml(project.judul)}" loading="lazy">
        </div>
        <div class="card-body">
          <h3 class="card-title">${escapeHtml(project.judul)}</h3>
          <p class="card-desc">${escapeHtml(project.deks)}</p>
          <div class="card-tech">
            ${project.tech.map(tech => `<span class="tech-badge">${escapeHtml(tech)}</span>`).join('')}
          </div>
          <div class="card-footer">
            <span class="card-author"><i class="fa-solid fa-user"></i> ${escapeHtml(project.namaPeserta)}</span>
            <div class="card-links">
              <a href="${sanitizeUrl(project.github)}" target="_blank" rel="noopener noreferrer" class="card-link" title="GitHub"><i class="fa-brands fa-github"></i></a>
              <a href="${sanitizeUrl(project.project)}" target="_blank" rel="noopener noreferrer" class="card-link demo" title="Live Demo"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
            </div>
          </div>
        </div>
      </div>
    `).join('')
    setTimeout(() => AOS.refresh(), 100)
  } else {
    showcaseGrid.innerHTML = `
      <div class="coming-soon" style="grid-column: 1 / -1;">
        <div class="coming-soon-icon">🔍</div>
        <h3>Tidak Ada Hasil</h3>
        <p>Coba kata kunci lain untuk pencarian</p>
      </div>
    `
  }
}

const renderShowcase = async () => {
  const projects = await loadShowcase()

  app.innerHTML = `
    ${renderNavbar()}

    <section class="showcase-page-section">
      <div class="showcase-page-container">
        <div class="section-heading" data-aos="fade-up">
          <span class="section-label"><i class="fa-solid fa-laptop-code"></i> Showcase</span>
          <h1 class="page-title" style="font-size: clamp(1.8rem, 3.5vw, 2.5rem);">Proyek Peserta</h1>
          <p>Karya-karya menakjubkan dari peserta Kelas PHP Kafekoding</p>
        </div>

        <div class="search-container" data-aos="fade-up" data-aos-delay="100">
          <input
            type="text"
            id="search-input"
            class="search-input"
            placeholder="Cari proyek, nama peserta, atau teknologi..."
          />
          <i class="fa-solid fa-magnifying-glass search-input-icon"></i>
        </div>

        <div class="showcase-grid" id="showcase-grid"></div>
      </div>
    </section>

    ${renderFooter()}
  `

  initHamburger()
  renderProjects(projects)

  // Navbar scroll shadow
  const navbar = document.querySelector('navbar')
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20)
    })
  }

  // Search
  const searchInput = document.getElementById('search-input')
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase()
    const filteredProjects = projects.filter(project =>
      project.judul.toLowerCase().includes(searchTerm) ||
      project.namaPeserta.toLowerCase().includes(searchTerm) ||
      project.deks.toLowerCase().includes(searchTerm) ||
      project.tech.some(tech => tech.toLowerCase().includes(searchTerm))
    )
    renderProjects(filteredProjects)
  })
}

renderShowcase()
