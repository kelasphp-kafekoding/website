import './style.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { welcomeSection } from './sections/welcomeSection.js'
import { showcaseSection } from './sections/showcaseSection.js'
import { testimonialSection } from './sections/testimonialSection.js'

console.log('Main.js loaded');

AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

const app = document.querySelector('#app')
console.log('App element:', app);

app.innerHTML = `
  <navbar>
    <div class="logo-container">
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
      <li><a href="/">Home</a></li>
      <li><a href="/tentang.html">Tentang</a></li>
      <li><a href="/kontak.html">Kontak</a></li>
    </ul>
  </navbar>

  <section class="welcome-section" id="home">
    <div class="welcome-content">
      <h1 data-aos="fade-up">Selamat Datang di Kafekoding</h1>
      <h2 class="welcome-subtitle" data-aos="fade-up" data-aos-delay="50">Kelas PHP</h2>
      <p data-aos="fade-up" data-aos-delay="100">Belajar PHP dengan cara yang menyenangkan dan interaktif</p>
      <button data-aos="fade-up" data-aos-delay="200" onclick="window.location.href='/materi.html'">Lihat Materi</button>
    </div>
    
    <div class="icons-showcase" id="icons-container"></div>
  </section>

  <section class="showcase-section">
    <div class="showcase-container">
      <h2>Showcase Proyek Peserta</h2>
      <p class="showcase-subtitle">Karya-karya menakjubkan dari peserta Kelas PHP</p>
      <div class="showcase-grid" id="showcase-grid"></div>
    </div>
  </section>

  <section class="comments-section">
    <div class="comments-container">
      <h2>Apa Kata Mereka <span id="comments-count">(0)</span></h2>
      <p class="comments-subtitle">Dengarkan pengalaman dan testimonial dari komunitas</p>
      
      <div class="comments-wrapper">
        <div>
          <div class="comments-list" id="comments-list">
            <div class="loading-spinner">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div class="pagination" id="pagination"></div>
        </div>
        
        <div class="comment-form-wrapper">
          <h3>Tulis Pendapatmu</h3>
          <form id="comment-form" class="comment-form">
            <div class="form-group">
              <input type="text" id="comment-name" placeholder="Nama Lengkap" required />
            </div>
            <div class="form-group">
              <input type="text" id="comment-status" placeholder="Status (Mahasiswa, Freelancer, dll)" required />
            </div>
            <div class="form-group">
              <textarea id="comment-message" placeholder="Tulis pesan Anda (1-2 kalimat)" required></textarea>
            </div>
            <button type="submit" class="btn-submit">Kirim Pendapat</button>
            <div id="form-message" class="form-message"></div>
          </form>
        </div>
      </div>
    </div>
  </section>

`

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

welcomeSection();
showcaseSection();

console.log('Attempting to load tsParticles from window...');

// Coba pakai window.tsParticles dari CDN atau global scope
if (window.tsParticles) {
  console.log('window.tsParticles found:', window.tsParticles);
  
  window.tsParticles.load("tsparticles", {
    particles: {
      number: { value: 50 },
      shape: { type: "circle" },
      size: { value: { min: 3, max: 10 } },
      opacity: { value: 0.8 },
      color: { value: "#0a0e27" },
      move: {
        enable: true,
        speed: 1.2,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "out" }
      }
    },
    background: { color: "transparent" }
  }).then(() => {
    console.log('tsParticles loaded successfully');
  }).catch(err => {
    console.error('Error:', err);
  });
} else {
  console.error('window.tsParticles not found - trying dynamic import...');
  
  (async () => {
    try {
      const tsParticles = (await import('tsparticles')).tsParticles;
      const { loadFull } = await import('tsparticles');
      
      console.log('Dynamic import successful, tsParticles:', tsParticles);
      await loadFull(tsParticles);
      
      await tsParticles.load("tsparticles", {
        particles: {
          number: { value: 50 },
          shape: { type: "circle" },
          size: { value: { min: 3, max: 10 } },
          opacity: { value: 0.8 },
          color: { value: "#0a0e27" },
          move: {
            enable: true,
            speed: 1.2,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "out" }
          }
        },
        background: { color: "transparent" }
      });
      
      console.log('tsParticles loaded successfully from dynamic import');
    } catch (err) {
      console.error('Failed to load tsParticles:', err);
    }
  })();
}

testimonialSection();
