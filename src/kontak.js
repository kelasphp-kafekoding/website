import './style.css';
import { initHamburger } from './hamburger.js';
import { renderFooter } from './components/footer.js';

const app = document.querySelector('#app');

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
      <li><a href="/materi.html">Materi</a></li>
      <li><a href="/#showcase">Showcase</a></li>
      <li><a href="/#gallery">Galeri</a></li>
      <li><a href="/#comments">Testimoni</a></li>
      <li><a href="/tentang.html">Tentang</a></li>
      <li><a href="/kontak.html">Kontak</a></li>
    </ul>
  </navbar>

  <section class="kontak-section">
    <div class="kontak-container">
      <h1>Hubungi Kami</h1>
      <p class="kontak-subtitle">Ada pertanyaan atau ingin bergabung? Jangan ragu untuk menghubungi kami!</p>
      
      <div class="kontak-content">
        <div class="kontak-info">
          <div class="kontak-card">
            <div class="kontak-icon"><i class="fa-brands fa-whatsapp"></i></div>
            <h3>WhatsApp</h3>
            <p>Chat langsung dengan admin</p>
            <a href="https://wa.me/6285156789012" target="_blank" rel="noopener noreferrer" class="kontak-link">Hubungi via WhatsApp</a>
          </div>
          
          <div class="kontak-card">
            <div class="kontak-icon"><i class="fa-brands fa-instagram"></i></div>
            <h3>Instagram</h3>
            <p>Follow untuk update terbaru</p>
            <a href="https://instagram.com/kafekoding" target="_blank" rel="noopener noreferrer" class="kontak-link">@kafekoding</a>
          </div>
          
          <div class="kontak-card">
            <div class="kontak-icon"><i class="fa-solid fa-envelope"></i></div>
            <h3>Email</h3>
            <p>Kirim pertanyaan via email</p>
            <a href="mailto:hello@kafekoding.com" class="kontak-link">hello@kafekoding.com</a>
          </div>
          
          <div class="kontak-card">
            <div class="kontak-icon"><i class="fa-brands fa-github"></i></div>
            <h3>GitHub</h3>
            <p>Lihat repository proyek</p>
            <a href="https://github.com/kelasphp-kafekoding" target="_blank" rel="noopener noreferrer" class="kontak-link">kelasphp-kafekoding</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  ${renderFooter()}
`;

initHamburger();
