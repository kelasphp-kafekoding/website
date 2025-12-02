import { initHamburger } from './hamburger.js'
import './pages.css'

const app = document.querySelector('#app')

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('id-ID', options)
}

const renderLoading = () => {
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

    <div class="container">
      <h1>Materi Kelas PHP</h1>
      <p class="subtitle">Pelajari PHP dari dasar hingga mahir</p>
      <div class="loading">⏳ Memuat materi...</div>
    </div>
  `
  initHamburger()
}

const renderError = (error) => {
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

    <div class="container">
      <h1>Materi Kelas PHP</h1>
      <p class="subtitle">Pelajari PHP dari dasar hingga mahir</p>
      <div class="error">❌ ${error}</div>
    </div>
  `
  initHamburger()
}

const renderMateri = (materiList) => {
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

    <div class="container">
      <h1>Materi Kelas PHP</h1>
      <p class="subtitle">Pelajari PHP dari dasar hingga mahir</p>

      <div class="kelas-grid">
        ${materiList.map(materi => `
          <div class="card" onclick="window.location.href='/materi-detail.html?file=${materi.file}&title=${encodeURIComponent(materi.title)}'">
            <div style="width: 100%; height: 160px; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 8px; margin-bottom: 15px; overflow: hidden;">
              <img src="${materi.thumbnail}" alt="${materi.title}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <span class="card-tag">Materi ${materi.id}</span>
            <h3 class="card-title">${materi.title}</h3>
            <p class="card-desc">${materi.description}</p>
            <div class="card-meta">
              <span class="card-author">${materi.author}</span>
              <span class="card-date">${formatDate(materi.date)}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `
  initHamburger()
}

async function loadMateri() {
  renderLoading()

  try {
    const response = await fetch('/materi-list.json')
    
    if (!response.ok) {
      throw new Error('Gagal memuat daftar materi')
    }

    const data = await response.json()

    if (!data.materi || data.materi.length === 0) {
      renderError('Belum ada materi tersedia.')
      return
    }

    renderMateri(data.materi)
  } catch (error) {
    renderError(`Error: ${error.message}`)
  }
}

loadMateri()
