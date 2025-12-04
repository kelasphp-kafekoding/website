import './style.css'
import './pages.css'
import { initHamburger } from './hamburger.js'
import { renderNavbar } from './components/navbar.js'
import { renderFooter } from './components/footer.js'

const app = document.querySelector('#app')

app.innerHTML = `
  ${renderNavbar()}

  <section class="error-404-section">
    <div class="error-404-container">
      <div class="error-404-illustration">
        <div class="error-code">404</div>
        <div class="error-icon">
          <i class="fa-solid fa-face-frown"></i>
        </div>
      </div>

      <div class="error-404-content">
        <h1 class="error-404-title">Halaman Tidak Ditemukan</h1>
        <p class="error-404-description">
          Halaman yang Anda cari tidak ditemukan.
        </p>
        
        <div class="error-404-actions">
          <button id="btn-back" class="btn-back">
            <i class="fa-solid fa-arrow-left"></i> Kembali
          </button>
          <a href="/" class="btn-primary">
            <i class="fa-solid fa-home"></i> Beranda
          </a>
          <a href="/materi.html" class="btn-secondary">
            <i class="fa-solid fa-book"></i> Materi
          </a>
        </div>

        <div class="error-404-countdown" id="countdown"></div>

        <div class="error-404-links">
          <h3>Halaman Populer:</h3>
          <div class="quick-links">
            <a href="/materi.html" class="quick-link">
              <i class="fa-solid fa-book-open"></i>
              <span>Materi PHP</span>
            </a>
            <a href="/#showcase" class="quick-link">
              <i class="fa-solid fa-laptop-code"></i>
              <span>Showcase</span>
            </a>
            <a href="/#gallery" class="quick-link">
              <i class="fa-solid fa-images"></i>
              <span>Galeri</span>
            </a>
            <a href="/tentang.html" class="quick-link">
              <i class="fa-solid fa-info-circle"></i>
              <span>Tentang</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  ${renderFooter()}
`

initHamburger()

// Back button handler
const btnBack = document.getElementById('btn-back')
btnBack.addEventListener('click', () => {
  // Check if there's history to go back to
  if (window.history.length > 1) {
    window.history.back()
  } else {
    // If no history, go to home
    window.location.href = '/'
  }
})

// Auto redirect countdown
let countdown = 15
const countdownElement = document.getElementById('countdown')

const updateCountdown = () => {
  if (countdown > 0) {
    countdownElement.innerHTML = `<i class="fa-solid fa-clock"></i> Redirect otomatis dalam <strong>${countdown}</strong> detik...`
    countdown--
  } else {
    window.location.href = '/'
  }
}

updateCountdown()
const countdownInterval = setInterval(updateCountdown, 1000)

// Stop countdown if user clicks any link or button
document.querySelectorAll('a, button').forEach(element => {
  element.addEventListener('click', () => {
    clearInterval(countdownInterval)
  })
})
