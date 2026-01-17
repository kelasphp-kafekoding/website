import './style.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
// welcomeSection removed - using new hero with code typing
import { showcaseSection } from './sections/showcaseSection.js'
import { testimonialSection } from './sections/testimonialSection.js'
import { renderFooter } from './components/footer.js'

// Initialize AOS - shorter duration on mobile
const isMobile = window.innerWidth < 768;
AOS.init({
  duration: isMobile ? 400 : 700,
  once: true,
  offset: isMobile ? 30 : 80,
  easing: 'ease-out-cubic'
});

const app = document.querySelector('#app')

app.innerHTML = `
  <navbar>
    <div class="logo-container">
      <img src="/icons/kk.png" alt="Kafekoding" class="logo-img">
      <div class="logo-text">
        <div class="logo-title">Kelas PHP</div>
        <div class="logo-subtitle">Powered by Kafekoding</div>
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
    <div class="hero-container">
      <div class="hero-text">
        
        <h1 data-aos="fade-up" data-aos-delay="100">Selamat Datang di <span class="text-gradient">Kelas PHP</span></h1>
        <p data-aos="fade-up" data-aos-delay="200">Belajar PHP dengan cara yang menyenangkan dan interaktif</p>
        <div class="hero-buttons" data-aos="fade-up" data-aos-delay="300">
          <button class="btn-primary" onclick="window.location.href='/materi.html'"><i class="fa-solid fa-play"></i> Mulai Belajar</button>
          <button class="btn-secondary" onclick="window.location.href='#showcase'"><i class="fa-solid fa-folder-open"></i> Lihat Showcase</button>
        </div>
      </div>
      
      <div class="hero-code" data-aos="fade-left" data-aos-delay="400">
        <div class="code-window">
          <div class="code-header">
            <div class="code-dots">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <div class="code-tabs">
              <button class="code-tab active" data-tab="code"><i class="fa-brands fa-php"></i> index.php</button>
              <button class="code-tab" data-tab="terminal"><i class="fa-solid fa-terminal"></i> Terminal</button>
            </div>
          </div>
          <div class="code-body" id="tab-code">
            <div class="code-with-lines">
              <div class="line-numbers" id="line-numbers"></div>
              <pre><code id="typing-code"></code></pre>
            </div>
          </div>
          <div class="code-body terminal-body" id="tab-terminal" style="display: none;">
            <pre><code id="typing-terminal"></code></pre>
          </div>
        </div>
        <div class="floating-icons-code">
          <img src="/icons/php.svg" alt="PHP" class="float-icon icon-1">
          <img src="/icons/html5.svg" alt="HTML5" class="float-icon icon-2">
          <img src="/icons/mysql-icon-light.svg" alt="MySQL" class="float-icon icon-3">
        </div>
      </div>
    </div>
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
          <img src="/assets/pertemuan9.jpeg" alt="Sesi Coding Bersama" loading="lazy" decoding="async">
          <div class="gallery-overlay">
            <span class="gallery-caption">Sesi Coding Bersama</span>
          </div>
        </div>
        <div class="gallery-item" data-index="3" data-aos="zoom-in" data-aos-delay="300">
          <img src="/assets/pertemuan12.png" alt="Pertemuan 12 - Belajar Interaksi dengan Database CRUD" loading="lazy" decoding="async">
          <div class="gallery-overlay">
            <span class="gallery-caption">Pertemuan 12 - Belajar Interaksi dengan Database CRUD</span>
          </div>
        </div>
        <div class="gallery-item" data-index="4" data-aos="zoom-in" data-aos-delay="400">
          <img src="/assets/pertemuan12a.png" alt="Pertemuan 12 - Belajar Interaksi dengan Database CRUD" loading="lazy" decoding="async">
          <div class="gallery-overlay">
            <span class="gallery-caption">Pertemuan 12 - Belajar Interaksi dengan Database CRUD</span>
          </div>
        </div>
        <div class="gallery-item" data-index="5" data-aos="zoom-in" data-aos-delay="500">
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=267&fit=crop&auto=format&q=75" alt="Team Collaboration" loading="lazy" decoding="async">
          <div class="gallery-overlay">
            <span class="gallery-caption">Team Collaboration</span>
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
              <input type="text" id="comment-status" placeholder="Mahasiswa Metamedia, Mahasiswa UPI YPTK, dll" required />
            </div>
            <div class="form-group">
              <label for="comment-message">Pendapat Anda</label>
              <textarea id="comment-message" placeholder="Tulis pesan Anda (1-2 kalimat)" required></textarea>
            </div>
            <div class="form-group g-recaptcha" id="recaptcha-container"></div>
            <button type="submit" class="btn-submit">Kirim Pendapat</button>
            <div id="form-message" class="form-message"></div>
          </form>
        </div>
      </div>
    </div>
  </section>

  <button class="back-to-top" id="back-to-top" aria-label="Kembali ke atas">
    <i class="fa-solid fa-arrow-up"></i>
  </button>

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

// Code typing animation
const initTypingAnimation = () => {
  const codeElement = document.getElementById('typing-code');
  const terminalElement = document.getElementById('typing-terminal');
  const lineNumbersElement = document.getElementById('line-numbers');
  if (!codeElement) return;
  
  // PHP Code
  const codeLines = [
    '<span class="keyword">&lt;?php</span>',
    '',
    '<span class="comment">// Kelas PHP Kafekoding</span>',
    '<span class="variable">$materi</span> = <span class="bracket">[</span>',
    '  <span class="string">"Sintaks Dasar"</span>,',
    '  <span class="string">"Operator"</span>,',
    '  <span class="string">"Control Flow"</span>,',
    '  <span class="string">"Array"</span>,',
    '  <span class="string">"Function"</span>,',
    '  <span class="string">"Form"</span>,',
    '  <span class="string">"Database"</span>,',
    '  <span class="string">"CRUD"</span>,',
    '<span class="bracket">]</span>;',
    '',
    '<span class="keyword">echo</span> <span class="string">"Selamat Belajar!"</span>;',
  ];
  
  // Generate line numbers
  if (lineNumbersElement) {
    lineNumbersElement.innerHTML = codeLines.map((_, i) => `<span>${i + 1}</span>`).join('\n');
  }
  
  // Terminal output
  const terminalLines = [
    '<span class="terminal-prompt">$</span> php -S localhost:80',
    '',
    '<span class="terminal-info">[Thu Dec 18 10:30:00 2026]</span> PHP Development Server started',
    '<span class="terminal-success">Listening on http://localhost:80</span>',
    'Document root is <span class="terminal-path">C:/xampp/htdocs/kelasphp</span>',
    'Press Ctrl+C to quit.',
    '',
    '<span class="terminal-output">[Thu Dec 18 10:30:05]</span> <span class="terminal-success">200</span> /index.php',
  ];
  
  let codeFinished = false;
  let terminalFinished = false;
  
  // Generic typing function
  const typeContent = (element, lines, onComplete) => {
    let lineIndex = 0;
    let charIndex = 0;
    let currentText = '';
    
    const type = () => {
      if (lineIndex < lines.length) {
        const currentLine = lines[lineIndex];
        
        if (charIndex < currentLine.length) {
          if (currentLine[charIndex] === '<') {
            const tagEnd = currentLine.indexOf('>', charIndex);
            if (tagEnd !== -1) {
              currentText += currentLine.substring(charIndex, tagEnd + 1);
              charIndex = tagEnd + 1;
            }
          } else {
            currentText += currentLine[charIndex];
            charIndex++;
          }
          element.innerHTML = currentText + '<span class="typing-cursor"></span>';
          setTimeout(type, 25);
        } else {
          currentText += '\n';
          lineIndex++;
          charIndex = 0;
          setTimeout(type, 80);
        }
      } else {
        element.innerHTML = currentText;
        if (onComplete) onComplete();
      }
    };
    
    type();
  };
  
  // Start code typing
  setTimeout(() => {
    typeContent(codeElement, codeLines, () => {
      codeFinished = true;
    });
  }, 800);
  
  // Tab switching
  const tabs = document.querySelectorAll('.code-tab');
  const tabCode = document.getElementById('tab-code');
  const tabTerminal = document.getElementById('tab-terminal');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const tabName = tab.dataset.tab;
      if (tabName === 'code') {
        tabCode.style.display = 'block';
        tabTerminal.style.display = 'none';
      } else {
        tabCode.style.display = 'none';
        tabTerminal.style.display = 'block';
        
        // Start terminal typing if not started
        if (!terminalFinished && terminalElement.innerHTML === '') {
          typeContent(terminalElement, terminalLines, () => {
            terminalFinished = true;
          });
        }
      }
    });
  });
};

initTypingAnimation();
showcaseSection();
initGallery();

// Initialize reCAPTCHA with dynamic sitekey based on hostname
const initRecaptcha = () => {
  const container = document.getElementById('recaptcha-container');
  if (!container) return;
  
  const hostname = window.location.hostname;
  let sitekey;
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    sitekey = '6Le0NC8sAAAAAIUTZPfUjVE_I3BNoRYUcRPb1BLy';
  } else if (hostname.includes('kelasphp.vercel.app')) {
    sitekey = '6LcD5xwsAAAAACCknilZ9y8BuprHx8w2xlmpkLOV';
  } else {
    // kelasphp.web.id dan domain lainnya
    sitekey = '6LchNS8sAAAAAIMOrrdvGlKILEM6--Pyc6Iso0XG';
  }
  
  container.setAttribute('data-sitekey', sitekey);
};

initRecaptcha();

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

// Back to top button
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

testimonialSection();
