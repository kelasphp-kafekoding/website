const kelasData = {
  1: {
    nama: 'PHP Dasar',
    materi: [
      { judul: 'Pengenalan PHP', desc: 'Apa itu PHP dan cara kerjanya' },
      { judul: 'Setup Environment', desc: 'Menginstal PHP dan editor' },
      { judul: 'Syntax Dasar', desc: 'Memahami syntax PHP' },
      { judul: 'Variabel dan Tipe Data', desc: 'String, Int, Float, Boolean, Array' },
      { judul: 'Operator', desc: 'Aritmatika, Logika, Perbandingan' },
      { judul: 'Control Flow', desc: 'If/else, switch, ternary operator' },
      { judul: 'Loop', desc: 'For, foreach, while, do-while' },
      { judul: 'Function', desc: 'Membuat dan menggunakan function' }
    ]
  },
  2: {
    nama: 'PHP OOP',
    materi: [
      { judul: 'Konsep OOP', desc: 'Dasar-dasar pemrograman berorientasi objek' },
      { judul: 'Class dan Object', desc: 'Membuat class dan instansiasi object' },
      { judul: 'Property dan Method', desc: 'Mendeklarasikan dan menggunakan property dan method' },
      { judul: 'Constructor', desc: 'Konstruktor untuk inisialisasi object' },
      { judul: 'Inheritance', desc: 'Pewarisan class parent ke child' },
      { judul: 'Polymorphism', desc: 'Menggunakan method yang sama dengan behavior berbeda' },
      { judul: 'Interface', desc: 'Mendefinisikan contract untuk class' },
      { judul: 'Abstract Class', desc: 'Class abstract dan implementasinya' }
    ]
  },
  3: {
    nama: 'Database & PHP',
    materi: [
      { judul: 'SQL Dasar', desc: 'SELECT, INSERT, UPDATE, DELETE' },
      { judul: 'Database Design', desc: 'Normalisasi dan relasi antar tabel' },
      { judul: 'MySQLi Extension', desc: 'Koneksi database dengan MySQLi' },
      { judul: 'CRUD Operations', desc: 'Create, Read, Update, Delete data' },
      { judul: 'Prepared Statements', desc: 'Prevent SQL Injection dengan prepared statements' },
      { judul: 'JOIN dan Query Kompleks', desc: 'Inner join, left join, dan query lanjutan' },
      { judul: 'Aggregate Functions', desc: 'COUNT, SUM, AVG, MIN, MAX' },
      { judul: 'Transactions', desc: 'ACID properties dan transaction management' }
    ]
  },
  4: {
    nama: 'Laravel Framework',
    materi: [
      { judul: 'Pengenalan Laravel', desc: 'Framework terpopuler untuk PHP' },
      { judul: 'Setup Project', desc: 'Install dan konfigurasi Laravel' },
      { judul: 'Routing', desc: 'Membuat route dan controller' },
      { judul: 'Blade Template', desc: 'Template engine Laravel' },
      { judul: 'Model & Eloquent', desc: 'ORM dan query builder' },
      { judul: 'Migration & Seeding', desc: 'Database migration dan seeding' },
      { judul: 'Middleware', desc: 'HTTP middleware di Laravel' },
      { judul: 'Authentication', desc: 'Sistem login dan authorization' }
    ]
  },
  5: {
    nama: 'REST API dengan PHP',
    materi: [
      { judul: 'REST API Basics', desc: 'Konsep REST dan HTTP methods' },
      { judul: 'JSON dan Response', desc: 'Format JSON dan response structure' },
      { judul: 'Request Handling', desc: 'Validasi request dan error handling' },
      { judul: 'Authentication & Authorization', desc: 'JWT dan token-based authentication' },
      { judul: 'Versioning API', desc: 'Mengelola versi API' },
      { judul: 'Rate Limiting', desc: 'Implementasi rate limiting' },
      { judul: 'Documentation', desc: 'Dokumentasi API dengan OpenAPI' },
      { judul: 'Testing API', desc: 'Unit test dan integration test' }
    ]
  },
  6: {
    nama: 'PHP Advanced',
    materi: [
      { judul: 'Design Pattern', desc: 'Singleton, Factory, Observer, Strategy' },
      { judul: 'Security Best Practices', desc: 'XSS, CSRF, SQL Injection prevention' },
      { judul: 'Unit Testing', desc: 'PHPUnit dan testing framework' },
      { judul: 'Code Quality', desc: 'SOLID principles dan refactoring' },
      { judul: 'Performance Optimization', desc: 'Caching dan optimization techniques' },
      { judul: 'Dependency Injection', desc: 'DI container dan service provider' },
      { judul: 'Async PHP', desc: 'Queue dan background jobs' },
      { judul: 'DevOps Basics', desc: 'Deployment dan CI/CD' }
    ]
  }
}

const app = document.querySelector('#app')

const getKelasId = () => {
  const params = new URLSearchParams(window.location.search)
  return params.get('id') || '1'
}

const renderMateri = () => {
  const kelasId = getKelasId()
  const kelas = kelasData[kelasId]

  if (!kelas) {
    app.innerHTML = '<h1>Kelas tidak ditemukan</h1>'
    return
  }

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

    <div class="materi-container">
      <button class="back-button" onclick="window.location.href='/kelas.html?id=${kelasId}'">← Kembali ke Detail Kelas</button>

      <div class="materi-header">
        <h1>${kelas.nama}</h1>
        <p>Total ${kelas.materi.length} bab pembelajaran</p>
      </div>

      <div class="materi-list">
        ${kelas.materi.map((m, idx) => `
          <div class="materi-item">
            <div class="materi-item-number">${idx + 1}</div>
            <div class="materi-item-title">${m.judul}</div>
            <div class="materi-item-desc">${m.desc}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `
}

renderMateri()

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
