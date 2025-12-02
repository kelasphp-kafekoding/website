import './style.css'
import { initHamburger } from './hamburger.js'

const app = document.querySelector('#app')

const loadShowcase = async () => {
  try {
    const response = await fetch('/public/showcase.json')
    const data = await response.json()
    
    return data.showcase || []
  } catch (error) {
    console.error('Error loading showcase:', error)
    return []
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
        
        <div class="showcase-grid">
          ${projects.length > 0 ? projects.map(project => `
            <div class="showcase-card">
              <img src="${project.gambar}" alt="${project.judul}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 16px;">
              <h3 style="font-size: 1.3rem; margin-bottom: 12px; color: var(--text);">${project.judul}</h3>
              <p style="color: var(--text-light); margin-bottom: 16px; line-height: 1.6;">${project.deks}</p>
              <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
                ${project.tech.map(tech => `<span style="background: #e0f2fe; color: #0369a1; padding: 4px 12px; border-radius: 12px; font-size: 0.85rem; font-weight: 600;">${tech}</span>`).join('')}
              </div>
              <p style="color: var(--text-light); font-size: 0.9rem; margin-bottom: 12px;"><i class="fa-solid fa-user" style="margin-right: 6px;"></i>${project.namaPeserta}</p>
              <div style="display: flex; gap: 12px;">
                <a href="${project.github}" target="_blank" style="color: var(--secondary); text-decoration: none; font-weight: 600;">GitHub →</a>
                <a href="${project.project}" target="_blank" style="color: var(--accent); text-decoration: none; font-weight: 600;">Live Demo →</a>
              </div>
            </div>
          `).join('') : `
            <div class="coming-soon">
              <div class="coming-soon-icon">🚀</div>
              <h3>Coming Soon</h3>
              <p>Showcase proyek dari peserta akan segera ditampilkan di sini</p>
            </div>
          `}
        </div>
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

renderShowcase()
