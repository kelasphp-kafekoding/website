import './style.css';
import { initHamburger } from './hamburger.js';
import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';

const app = document.querySelector('#app');

app.innerHTML = `
  ${renderNavbar()}

  <section class="kontak-section">
    <div class="kontak-container">
      <div class="section-heading">
        <span class="section-label"><i class="fa-solid fa-paper-plane"></i> Kontak</span>
        <h1 class="page-title">Hubungi Kami</h1>
        <p class="page-subtitle">Ada pertanyaan atau ingin bergabung? Jangan ragu untuk menghubungi kami melalui saluran di bawah ini!</p>
      </div>

      <div class="kontak-content">
        <div class="kontak-info">
          <div class="kontak-card">
            <div class="kontak-icon"><i class="fa-brands fa-whatsapp"></i></div>
            <h3>WhatsApp</h3>
            <p>Chat langsung dengan admin kami untuk konsultasi</p>
            <a href="https://wa.me/6285156789012" target="_blank" rel="noopener noreferrer" class="kontak-link"><i class="fa-solid fa-arrow-right" style="margin-right: 6px;"></i> Hubungi via WhatsApp</a>
          </div>

          <div class="kontak-card">
            <div class="kontak-icon"><i class="fa-brands fa-instagram"></i></div>
            <h3>Instagram</h3>
            <p>Follow untuk update terbaru dan inspirasi</p>
            <a href="https://instagram.com/kafekoding" target="_blank" rel="noopener noreferrer" class="kontak-link"><i class="fa-solid fa-arrow-right" style="margin-right: 6px;"></i> @kafekoding</a>
          </div>

          <div class="kontak-card">
            <div class="kontak-icon"><i class="fa-solid fa-envelope"></i></div>
            <h3>Email</h3>
            <p>Kirim pertanyaan atau saran via email</p>
            <a href="mailto:hello@kafekoding.com" class="kontak-link"><i class="fa-solid fa-arrow-right" style="margin-right: 6px;"></i> hello@kafekoding.com</a>
          </div>

          <div class="kontak-card">
            <div class="kontak-icon"><i class="fa-brands fa-github"></i></div>
            <h3>GitHub</h3>
            <p>Lihat repository dan berkontribusi</p>
            <a href="https://github.com/kelasphp-kafekoding" target="_blank" rel="noopener noreferrer" class="kontak-link"><i class="fa-solid fa-arrow-right" style="margin-right: 6px;"></i> kelasphp-kafekoding</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  ${renderFooter()}
`;

initHamburger();

// Navbar scroll shadow
const navbar = document.querySelector('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}
