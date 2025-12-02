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
      <li><a href="#home">Home</a></li>
      <li><a href="#showcase">Showcase</a></li>
      <li><a href="#gallery">Galeri</a></li>
      <li><a href="#comments">Testimoni</a></li>
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

  <section class="showcase-section" id="showcase">
    <div class="showcase-container">
      <h2>Showcase Proyek Peserta</h2>
      <p class="showcase-subtitle">Karya-karya menakjubkan dari peserta Kelas PHP</p>
      <div class="showcase-grid" id="showcase-grid"></div>
    </div>
  </section>

  <section class="gallery-section" id="gallery">
    <div class="gallery-container">
      <h2>Galeri Kelas PHP</h2>
      <p class="gallery-subtitle">Dokumentasi kegiatan dan momen belajar bersama di Kelas PHP Kafekoding</p>
      
      <div class="gallery-grid" id="gallery-grid">
        <div class="gallery-item" data-index="0">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" alt="Diskusi Kelompok">
          <div class="gallery-overlay">
            <span class="gallery-caption">Diskusi Kelompok</span>
          </div>
        </div>
        <div class="gallery-item" data-index="1">
          <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop" alt="Coding Session">
          <div class="gallery-overlay">
            <span class="gallery-caption">Coding Session</span>
          </div>
        </div>
        <div class="gallery-item" data-index="2">
          <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop" alt="Workshop PHP">
          <div class="gallery-overlay">
            <span class="gallery-caption">Workshop PHP</span>
          </div>
        </div>
        <div class="gallery-item" data-index="3">
          <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop" alt="Presentasi Project">
          <div class="gallery-overlay">
            <span class="gallery-caption">Presentasi Project</span>
          </div>
        </div>
        <div class="gallery-item" data-index="4">
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop" alt="Team Collaboration">
          <div class="gallery-overlay">
            <span class="gallery-caption">Team Collaboration</span>
          </div>
        </div>
        <div class="gallery-item" data-index="5">
          <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop" alt="Sertifikat Kelulusan">
          <div class="gallery-overlay">
            <span class="gallery-caption">Sertifikat Kelulusan</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div id="lightbox" class="lightbox">
    <span class="lightbox-close">&times;</span>
    <span class="lightbox-prev">&#10094;</span>
    <span class="lightbox-next">&#10095;</span>
    <img class="lightbox-content" id="lightbox-img">
    <div class="lightbox-caption" id="lightbox-caption"></div>
  </div>

  <section class="comments-section" id="comments">
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
              <label for="comment-name">Nama Lengkap</label>
              <input type="text" id="comment-name" placeholder="Masukkan nama Anda" required />
            </div>
            <div class="form-group">
              <label for="comment-status">Status</label>
              <input type="text" id="comment-status" placeholder="Mahasiswa, Freelancer, dll" required />
            </div>
            <div class="form-group">
              <label for="comment-message">Pendapat Anda</label>
              <textarea id="comment-message" placeholder="Tulis pesan Anda (1-2 kalimat)" required></textarea>
            </div>
            <div class="form-group g-recaptcha" data-sitekey="6LcD5xwsAAAAACCknilZ9y8BuprHx8w2xlmpkLOV"></div>
            <button type="submit" class="btn-submit">Kirim Pendapat</button>
            <div id="form-message" class="form-message"></div>
          </form>
        </div>
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

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    
    // Jika link adalah anchor (dimulai dengan #), gunakan smooth scroll
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

const initGallery = () => {
  const galleryItems = document.querySelectorAll('.gallery-item')
  const lightbox = document.getElementById('lightbox')
  const lightboxImg = document.getElementById('lightbox-img')
  const lightboxCaption = document.getElementById('lightbox-caption')
  const closeBtn = document.querySelector('.lightbox-close')
  const prevBtn = document.querySelector('.lightbox-prev')
  const nextBtn = document.querySelector('.lightbox-next')
  
  if (!galleryItems.length) return
  
  let currentIndex = 0
  const images = Array.from(galleryItems).map(item => ({
    src: item.querySelector('img').src,
    caption: item.querySelector('.gallery-caption').textContent
  }))

  const showImage = (index) => {
    currentIndex = index
    lightboxImg.src = images[index].src
    lightboxCaption.textContent = images[index].caption
    lightbox.style.display = 'flex'
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => showImage(index))
  })

  closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none'
  })

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length
    showImage(currentIndex)
  })

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length
    showImage(currentIndex)
  })

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none'
    }
  })

  document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
      if (e.key === 'Escape') lightbox.style.display = 'none'
      if (e.key === 'ArrowLeft') prevBtn.click()
      if (e.key === 'ArrowRight') nextBtn.click()
    }
  })
}

welcomeSection();
showcaseSection();
initGallery();

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
