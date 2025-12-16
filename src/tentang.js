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

  <section class="tentang-section">
    <div class="tentang-container">
      <h1>Tentang Kelas PHP</h1>
      <p class="tentang-subtitle">Belajar PHP dengan cara yang menyenangkan dan interaktif</p>
      
      <div class="tentang-content">
        <div class="tentang-card">
          <div class="tentang-icon"><i class="fa-solid fa-graduation-cap"></i></div>
          <h3>Apa itu Kelas PHP?</h3>
          <p>Kelas PHP adalah program pembelajaran yang dirancang untuk membantu pemula hingga menengah dalam menguasai bahasa pemrograman PHP. Kami menyediakan materi yang terstruktur dan mudah dipahami.</p>
        </div>
        
        <div class="tentang-card">
          <div class="tentang-icon"><i class="fa-solid fa-bullseye"></i></div>
          <h3>Tujuan Kami</h3>
          <p>Membantu setiap peserta untuk memahami konsep dasar hingga lanjutan PHP, serta mampu membangun aplikasi web yang fungsional dan profesional.</p>
        </div>
        
        <div class="tentang-card">
          <div class="tentang-icon"><i class="fa-solid fa-users"></i></div>
          <h3>Komunitas</h3>
          <p>Bergabung dengan komunitas Kafekoding yang aktif dan supportif. Diskusi, berbagi pengalaman, dan berkembang bersama sesama developer.</p>
        </div>
        
        <div class="tentang-card">
          <div class="tentang-icon"><i class="fa-solid fa-laptop-code"></i></div>
          <h3>Metode Belajar</h3>
          <p>Pembelajaran berbasis proyek dengan pendekatan praktis. Setiap materi dilengkapi dengan contoh kode dan latihan untuk memperkuat pemahaman.</p>
        </div>
      </div>
      
      <div class="tentang-cta">
        <h3>Siap untuk memulai?</h3>
        <p>Mulai perjalanan belajar PHP kamu sekarang!</p>
        <a href="/materi.html" class="btn-mulai">Lihat Materi</a>
      </div>
    </div>
  </section>

  ${renderFooter()}
`;

initHamburger();
