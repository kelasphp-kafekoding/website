import './style.css'

console.log('Main.js loaded');

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
      <li><a href="public/tentang.html">Tentang</a></li>
      <li><a href="public/kontak.html">Kontak</a></li>
    </ul>
  </navbar>

  <section class="welcome-section" id="home">
    <div class="welcome-content">
      <h1>Selamat Datang di Kafekoding</h1>
      <p>Belajar PHP dengan cara yang menyenangkan dan interaktif</p>
      <button onclick="window.location.href='public/kelas.html'">Lihat Kelas</button>
    </div>
    
    <div class="icons-showcase" id="icons-container"></div>
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

const icons = [
  { src: '/icons/php.svg', alt: 'PHP' },
  { src: '/icons/laravel.svg', alt: 'Laravel' },
  { src: '/icons/mysql-icon-light.svg', alt: 'MySQL' },
  { src: '/icons/html5.svg', alt: 'HTML5' },
  { src: '/icons/css_old.svg', alt: 'CSS' },
  { src: '/icons/bootstrap.svg', alt: 'Bootstrap' },
  { src: '/icons/nginx.svg', alt: 'Nginx' },
  { src: '/icons/chrome.svg', alt: 'Chrome' },
  { src: '/icons/mariadb.svg', alt: 'MariaDB' },
  { src: '/icons/stackoverflow_wordmark.svg', alt: 'Stack Overflow' },
  { src: '/icons/powershell.svg', alt: 'PowerShell' },
  { src: '/icons/kk.png', alt: 'kafekoding' }

];

const container = document.getElementById('icons-container');
icons.forEach((icon, index) => {
  const img = document.createElement('img');
  img.src = icon.src;
  img.alt = icon.alt;
  img.className = 'floating-icon';
  img.style.animationDelay = `${index * 0.1}s`;
  container.appendChild(img);
});

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
