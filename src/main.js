import './style.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { welcomeSection } from './sections/welcomeSection.js'
import { showcaseSection } from './sections/showcaseSection.js'
import { testimonialSection } from './sections/testimonialSection.js'
import { renderFooter } from './components/footer.js'

// Initialize AOS with optimized settings
AOS.init({
  duration: 700,
  once: true,
  offset: 80,
  easing: 'ease-out-cubic'
});

const app = document.querySelector('#app')

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
      <li><a href="/materi.html">Materi</a></li>
      <li><a href="#showcase">Showcase</a></li>
      <li><a href="#gallery">Galeri</a></li>
      <li><a href="#comments">Testimoni</a></li>
      <li><a href="/tentang.html">Tentang</a></li>
      <li><a href="/kontak.html">Kontak</a></li>
    </ul>
  </navbar>

  <section class="welcome-section" id="home">
    <div class="welcome-content">
      <h1 data-aos="fade-up">Selamat Datang di Kelas PHP</h1>
      <p data-aos="fade-up" data-aos-delay="100">Belajar PHP dengan cara yang menyenangkan dan interaktif</p>
      <button data-aos="fade-up" data-aos-delay="200" onclick="window.location.href='/materi.html'">Lihat Materi</button>
    </div>
    
    <div class="icons-showcase" id="icons-container"></div>
  </section>

  <section class="showcase-section" id="showcase">
    <div class="showcase-container">
      <h2 data-aos="fade-up">Showcase Proyek Peserta</h2>
      <p class="showcase-subtitle" data-aos="fade-up" data-aos-delay="100">Karya-karya menakjubkan dari peserta Kelas PHP</p>
      <div class="showcase-grid" id="showcase-grid"></div>
    </div>
  </section>

  <section class="gallery-section" id="gallery">
    <div class="gallery-container">
      <h2 data-aos="fade-up">Galeri Kelas PHP</h2>
      <p class="gallery-subtitle" data-aos="fade-up" data-aos-delay="100">Dokumentasi kegiatan dan momen belajar bersama di Kelas PHP Kafekoding</p>
      
      <div class="gallery-grid" id="gallery-grid">
        <div class="gallery-item" data-index="0" data-aos="zoom-in" data-aos-delay="0">
          <img src="/assets/meet.jpg" alt="Belajar Bersama Online" loading="lazy" decoding="async">
          <div class="gallery-overlay">
            <span class="gallery-caption">Belajar Bersama Online</span>
          </div>
        </div>
        <div class="gallery-item" data-index="1" data-aos="zoom-in" data-aos-delay="100">
          <img src="/assets/rotasisimulasi.jpg" alt="Rotasi Stasiun - Fix Materi" loading="lazy" decoding="async">
          <div class="gallery-overlay">
            <span class="gallery-caption">Rotasi Stasiun - Fix Materi</span>
          </div>
        </div>
        <div class="gallery-item" data-index="2" data-aos="zoom-in" data-aos-delay="200">
          <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop&auto=format" alt="Workshop PHP" loading="lazy" decoding="async">
          <div class="gallery-overlay">
            <span class="gallery-caption">Workshop PHP</span>
          </div>
        </div>
        <div class="gallery-item" data-index="3" data-aos="zoom-in" data-aos-delay="300">
          <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop&auto=format" alt="Presentasi Project" loading="lazy" decoding="async">
          <div class="gallery-overlay">
            <span class="gallery-caption">Presentasi Project</span>
          </div>
        </div>
        <div class="gallery-item" data-index="4" data-aos="zoom-in" data-aos-delay="400">
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&auto=format" alt="Team Collaboration" loading="lazy" decoding="async">
          <div class="gallery-overlay">
            <span class="gallery-caption">Team Collaboration</span>
          </div>
        </div>
        <div class="gallery-item" data-index="5" data-aos="zoom-in" data-aos-delay="500">
          <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop&auto=format" alt="Sertifikat Kelulusan" loading="lazy" decoding="async">
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
      <h2 data-aos="fade-up">Apa Kata Mereka <span id="comments-count">(0)</span></h2>
      <p class="comments-subtitle" data-aos="fade-up" data-aos-delay="100">Dengarkan pengalaman dan testimonial dari komunitas</p>
      
      <div class="comments-wrapper">
        <div data-aos="fade-right" data-aos-delay="200">
          <div class="comments-list" id="comments-list">
            <div class="loading-spinner">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div class="pagination" id="pagination"></div>
        </div>
        
        <div class="comment-form-wrapper" data-aos="fade-left" data-aos-delay="300">
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

  ${renderFooter()}

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

// Refresh AOS setelah konten dinamis di-render
setTimeout(() => AOS.refresh(), 500);

// Lazy load tsParticles - skip entirely for better performance
const loadParticles = async () => {
  // Skip particles for better performance (optional feature)
  if (window.innerWidth < 1024 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  
  // Only load after user interaction or idle
  if ('requestIdleCallback' in window) {
    requestIdleCallback(async () => {
      try {
        const { tsParticles } = await import('tsparticles-engine');
        const { loadSlim } = await import('tsparticles-slim');
        
        await loadSlim(tsParticles);
        
        await tsParticles.load("tsparticles", {
          particles: {
            number: { value: 20 },
            shape: { type: "circle" },
            size: { value: { min: 2, max: 4 } },
            opacity: { value: 0.4 },
            color: { value: "#0a0e27" },
            move: {
              enable: true,
              speed: 0.5,
              direction: "none",
              random: true,
              straight: false,
              outModes: { default: "out" }
            }
          },
          background: { color: "transparent" },
          detectRetina: false,
          fpsLimit: 20
        });
      } catch (err) {
        // Silently fail
      }
    }, { timeout: 3000 });
  }
};

// Load particles after page is fully loaded
if (document.readyState === 'complete') {
  setTimeout(loadParticles, 2000);
} else {
  window.addEventListener('load', () => setTimeout(loadParticles, 2000));
}

testimonialSection();
