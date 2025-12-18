import './style.css'
import { initHamburger } from './hamburger.js'
import { renderFooter } from './components/footer.js'

const app = document.querySelector('#app')

// Sanitize HTML to prevent XSS attacks
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Sanitize URL to prevent javascript: protocol attacks
function sanitizeUrl(url) {
  if (!url) return '#';
  const trimmed = url.trim().toLowerCase();
  if (trimmed.startsWith('javascript:') || trimmed.startsWith('data:')) {
    return '#';
  }
  return url;
}

const loadShowcase = async () => {
  try {
    const response = await fetch('/showcase.json')
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
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
    showcaseGrid.innerHTML = projects.map(project => `
      <div class="showcase-card">
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
            <span class="card-author"><i class="fa-solid fa-user"></i>${escapeHtml(project.namaPeserta)}</span>
            <div class="card-links">
              <a href="${sanitizeUrl(project.github)}" target="_blank" rel="noopener noreferrer" class="card-link" title="GitHub"><i class="fa-brands fa-github"></i></a>
              <a href="${sanitizeUrl(project.project)}" target="_blank" rel="noopener noreferrer" class="card-link demo" title="Live Demo"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
            </div>
          </div>
        </div>
      </div>
    `).join('')
  } else {
    showcaseGrid.innerHTML = `
      <div class="coming-soon" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <div class="coming-soon-icon" style="font-size: 4rem; margin-bottom: 20px;">🔍</div>
        <h3 style="font-size: 1.5rem; margin-bottom: 12px; color: var(--text);">Tidak Ada Hasil</h3>
        <p style="color: var(--text-light);">Coba kata kunci lain untuk pencarian</p>
      </div>
    `
  }
}

const renderShowcase = async () => {
  const projects = await loadShowcase()
  
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

    <section class="showcase-page-section">
      <div class="showcase-page-container">
        <h1 class="showcase-page-title">Showcase Proyek Peserta</h1>
        <p class="showcase-page-subtitle">Karya-karya menakjubkan dari peserta Kelas PHP Kafekoding</p>
        
        <div class="search-container" style="max-width: 600px; margin: 0 auto 40px; position: relative;">
          <input 
            type="text" 
            id="search-input" 
            placeholder="Cari proyek, nama peserta, atau teknologi..." 
            style="width: 100%; padding: 14px 50px 14px 20px; border: 2px solid #e5e7eb; border-radius: 30px; font-size: 1rem; outline: none; transition: border-color 0.3s ease;"
          />
          <i class="fa-solid fa-search" style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); color: #9ca3af; font-size: 1.1rem;"></i>
        </div>
        
        <div class="showcase-grid" id="showcase-grid"></div>
      </div>
    </section>

    ${renderFooter()}
  `
  
  initHamburger()
  
  // Render semua proyek
  renderProjects(projects)
  
  // Setup search functionality
  const searchInput = document.getElementById('search-input')
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase()
    
    const filteredProjects = projects.filter(project => {
      return (
        project.judul.toLowerCase().includes(searchTerm) ||
        project.namaPeserta.toLowerCase().includes(searchTerm) ||
        project.deks.toLowerCase().includes(searchTerm) ||
        project.tech.some(tech => tech.toLowerCase().includes(searchTerm))
      )
    })
    
    renderProjects(filteredProjects)
  })
  
  // Focus effect
  searchInput.addEventListener('focus', (e) => {
    e.target.style.borderColor = '#3b82f6'
  })
  
  searchInput.addEventListener('blur', (e) => {
    e.target.style.borderColor = '#e5e7eb'
  })
}

renderShowcase()
