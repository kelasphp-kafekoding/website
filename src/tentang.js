import './style.css';
import { initHamburger } from './hamburger.js';
import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';

const app = document.querySelector('#app');

app.innerHTML = `
  ${renderNavbar()}

  <section class="tentang-section">
    <div class="tentang-container">
      <div class="section-heading">
        <span class="section-label"><i class="fa-solid fa-info-circle"></i> Tentang</span>
        <h1 class="page-title">Tentang Kelas PHP</h1>
        <p class="page-subtitle">Platform pembelajaran PHP yang dirancang untuk pemula hingga menengah, dengan pendekatan praktis dan berbasis proyek.</p>
      </div>

      <div class="tentang-content">
        <div class="tentang-card">
          <div class="tentang-icon"><i class="fa-solid fa-graduation-cap"></i></div>
          <h3>Apa itu Kelas PHP?</h3>
          <p>Kelas PHP adalah program pembelajaran yang dirancang untuk membantu pemula hingga menengah dalam menguasai bahasa pemrograman PHP. Kami menyediakan materi terstruktur, proyek nyata, dan dukungan komunitas yang aktif.</p>
        </div>

        <div class="tentang-card">
          <div class="tentang-icon"><i class="fa-solid fa-bullseye"></i></div>
          <h3>Tujuan Kami</h3>
          <p>Membantu setiap peserta memahami konsep dasar hingga lanjutan PHP, serta mampu membangun aplikasi web yang fungsional dan profesional dengan menggunakan teknologi terkini.</p>
        </div>

        <div class="tentang-card">
          <div class="tentang-icon"><i class="fa-solid fa-users"></i></div>
          <h3>Komunitas</h3>
          <p>Bergabung dengan komunitas Kafekoding yang aktif dan suportif. Diskusi, berbagi pengalaman, dan berkembang bersama sesama developer dari berbagai latar belakang.</p>
        </div>

        <div class="tentang-card">
          <div class="tentang-icon"><i class="fa-solid fa-laptop-code"></i></div>
          <h3>Metode Belajar</h3>
          <p>Pembelajaran berbasis proyek dengan pendekatan praktis. Setiap materi dilengkapi contoh kode, latihan interaktif, dan tantangan untuk memperkuat pemahaman peserta.</p>
        </div>
      </div>

      <div class="tentang-cta">
        <h3>Siap untuk memulai?</h3>
        <p>Mulai perjalanan belajar PHP kamu sekarang!</p>
        <a href="/materi.html" class="btn-mulai">Lihat Materi <i class="fa-solid fa-arrow-right" style="margin-left: 8px;"></i></a>
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
