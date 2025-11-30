const kelasData = {
  1: {
    nama: 'PHP Dasar',
    deskripsi: 'Pelajari fundamentals PHP dari nol. Kelas ini dirancang untuk pemula yang ingin memahami konsep dasar pemrograman PHP, syntax, variabel, dan operator.',
    durasi: '4 minggu',
    level: 'Pemula',
    topik: 'Syntax, Variabel, Operator',
    materi: [
      {
        judul: 'Pengenalan PHP',
        desc: 'Apa itu PHP dan cara kerjanya'
      },
      {
        judul: 'Setup Environment',
        desc: 'Menginstal PHP dan editor'
      },
      {
        judul: 'Syntax Dasar',
        desc: 'Memahami syntax PHP'
      },
      {
        judul: 'Variabel dan Tipe Data',
        desc: 'String, Int, Float, Boolean, Array'
      },
      {
        judul: 'Operator',
        desc: 'Aritmatika, Logika, Perbandingan'
      },
      {
        judul: 'Control Flow',
        desc: 'If/else, switch, ternary operator'
      },
      {
        judul: 'Loop',
        desc: 'For, foreach, while, do-while'
      },
      {
        judul: 'Function',
        desc: 'Membuat dan menggunakan function'
      }
    ]
  },
  2: {
    nama: 'PHP OOP',
    deskripsi: 'Menguasai Object-Oriented Programming di PHP. Pelajari class, object, inheritance, polymorphism, dan interface.',
    durasi: '6 minggu',
    level: 'Menengah',
    topik: 'Class, Inheritance, Interface',
    materi: [
      {
        judul: 'Konsep OOP',
        desc: 'Dasar-dasar pemrograman berorientasi objek'
      },
      {
        judul: 'Class dan Object',
        desc: 'Membuat class dan instansiasi object'
      },
      {
        judul: 'Property dan Method',
        desc: 'Mendeklarasikan dan menggunakan property dan method'
      },
      {
        judul: 'Constructor',
        desc: 'Konstruktor untuk inisialisasi object'
      },
      {
        judul: 'Inheritance',
        desc: 'Pewarisan class parent ke child'
      },
      {
        judul: 'Polymorphism',
        desc: 'Menggunakan method yang sama dengan behavior berbeda'
      },
      {
        judul: 'Interface',
        desc: 'Mendefinisikan contract untuk class'
      },
      {
        judul: 'Abstract Class',
        desc: 'Class abstract dan implementasinya'
      }
    ]
  },
  3: {
    nama: 'Database & PHP',
    deskripsi: 'Integrasi database dengan PHP. Belajar MySQL, query, CRUD operations, dan prepared statements.',
    durasi: '5 minggu',
    level: 'Menengah',
    topik: 'MySQL, Query, CRUD',
    materi: [
      {
        judul: 'SQL Dasar',
        desc: 'SELECT, INSERT, UPDATE, DELETE'
      },
      {
        judul: 'Database Design',
        desc: 'Normalisasi dan relasi antar tabel'
      },
      {
        judul: 'MySQLi Extension',
        desc: 'Koneksi database dengan MySQLi'
      },
      {
        judul: 'CRUD Operations',
        desc: 'Create, Read, Update, Delete data'
      },
      {
        judul: 'Prepared Statements',
        desc: 'Prevent SQL Injection dengan prepared statements'
      },
      {
        judul: 'JOIN dan Query Kompleks',
        desc: 'Inner join, left join, dan query lanjutan'
      },
      {
        judul: 'Aggregate Functions',
        desc: 'COUNT, SUM, AVG, MIN, MAX'
      },
      {
        judul: 'Transactions',
        desc: 'ACID properties dan transaction management'
      }
    ]
  },
  4: {
    nama: 'Laravel Framework',
    deskripsi: 'Build aplikasi web modern dengan Laravel. Pelajari MVC, routing, eloquent ORM, dan migration.',
    durasi: '8 minggu',
    level: 'Mahir',
    topik: 'MVC, Routing, Eloquent',
    materi: [
      {
        judul: 'Pengenalan Laravel',
        desc: 'Framework terpopuler untuk PHP'
      },
      {
        judul: 'Setup Project',
        desc: 'Install dan konfigurasi Laravel'
      },
      {
        judul: 'Routing',
        desc: 'Membuat route dan controller'
      },
      {
        judul: 'Blade Template',
        desc: 'Template engine Laravel'
      },
      {
        judul: 'Model & Eloquent',
        desc: 'ORM dan query builder'
      },
      {
        judul: 'Migration & Seeding',
        desc: 'Database migration dan seeding'
      },
      {
        judul: 'Middleware',
        desc: 'HTTP middleware di Laravel'
      },
      {
        judul: 'Authentication',
        desc: 'Sistem login dan authorization'
      }
    ]
  },
  5: {
    nama: 'REST API dengan PHP',
    deskripsi: 'Membuat REST API profesional dengan PHP. Pelajari API design, authentication, dan best practices.',
    durasi: '6 minggu',
    level: 'Mahir',
    topik: 'API Design, JSON, Authentication',
    materi: [
      {
        judul: 'REST API Basics',
        desc: 'Konsep REST dan HTTP methods'
      },
      {
        judul: 'JSON dan Response',
        desc: 'Format JSON dan response structure'
      },
      {
        judul: 'Request Handling',
        desc: 'Validasi request dan error handling'
      },
      {
        judul: 'Authentication & Authorization',
        desc: 'JWT dan token-based authentication'
      },
      {
        judul: 'Versioning API',
        desc: 'Mengelola versi API'
      },
      {
        judul: 'Rate Limiting',
        desc: 'Implementasi rate limiting'
      },
      {
        judul: 'Documentation',
        desc: 'Dokumentasi API dengan OpenAPI'
      },
      {
        judul: 'Testing API',
        desc: 'Unit test dan integration test'
      }
    ]
  },
  6: {
    nama: 'PHP Advanced',
    deskripsi: 'Teknik-teknik PHP tingkat lanjut. Pelajari design pattern, security, testing, dan optimization.',
    durasi: '7 minggu',
    level: 'Mahir',
    topik: 'Design Pattern, Security, Testing',
    materi: [
      {
        judul: 'Design Pattern',
        desc: 'Singleton, Factory, Observer, Strategy'
      },
      {
        judul: 'Security Best Practices',
        desc: 'XSS, CSRF, SQL Injection prevention'
      },
      {
        judul: 'Unit Testing',
        desc: 'PHPUnit dan testing framework'
      },
      {
        judul: 'Code Quality',
        desc: 'SOLID principles dan refactoring'
      },
      {
        judul: 'Performance Optimization',
        desc: 'Caching dan optimization techniques'
      },
      {
        judul: 'Dependency Injection',
        desc: 'DI container dan service provider'
      },
      {
        judul: 'Async PHP',
        desc: 'Queue dan background jobs'
      },
      {
        judul: 'DevOps Basics',
        desc: 'Deployment dan CI/CD'
      }
    ]
  }
}

const app = document.querySelector('#app')

const getKelasId = () => {
  const params = new URLSearchParams(window.location.search)
  return params.get('id') || '1'
}

const renderKelas = () => {
  const kelasId = getKelasId()
  const kelas = kelasData[kelasId]

  if (!kelas) {
    app.innerHTML = '<h1>Kelas tidak ditemukan</h1>'
    return
  }

  const levelClass = {
    'Pemula': 'level-pemula',
    'Menengah': 'level-menengah',
    'Mahir': 'level-mahir'
  }[kelas.level]

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

    <div class="detail-container">
      <button class="back-button" onclick="window.location.href='/kelas-list.html'">← Kembali ke Daftar Kelas</button>

      <div class="detail-header">
        <div style="display: flex; gap: 15px; align-items: flex-start; margin-bottom: 20px;">
          <span class="level-badge ${levelClass}">${kelas.level}</span>
          <span style="color: #6b7280; font-weight: 500;">⏱️ ${kelas.durasi}</span>
        </div>
        <h1>${kelas.nama}</h1>
        <p class="detail-description">${kelas.deskripsi}</p>
      </div>

      <div class="detail-content" style="grid-template-columns: 1fr;">
        <div class="sidebar" style="grid-column: auto;">
          <div class="sidebar-card">
            <h3>📌 Ringkasan</h3>
            <ul class="info-list">
              <li><strong>Level:</strong> ${kelas.level}</li>
              <li><strong>Durasi:</strong> ${kelas.durasi}</li>
              <li><strong>Topik:</strong> ${kelas.topik}</li>
              <li><strong>Total Bab:</strong> ${kelas.materi.length}</li>
            </ul>
          </div>

          <button class="btn-daftar" onclick="window.location.href='/materi.html?id=${kelasId}'">Lihat Materi Kelas</button>

          <div class="sidebar-card">
            <h3>ℹ️ Informasi</h3>
            <ul class="info-list">
              <li>✓ Akses seumur hidup</li>
              <li>✓ Sertifikat resmi</li>
              <li>✓ Support community</li>
              <li>✓ Update materi gratis</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `
}

renderKelas()

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
