import './style.css'

const kelasData = [
  {
    id: 1,
    nama: 'PHP Dasar',
    deskripsi: 'Pelajari fundamentals PHP dari nol',
    durasi: '4 minggu',
    level: 'Pemula',
    topik: 'Syntax, Variabel, Operator'
  },
  {
    id: 2,
    nama: 'PHP OOP',
    deskripsi: 'Menguasai Object-Oriented Programming',
    durasi: '6 minggu',
    level: 'Menengah',
    topik: 'Class, Inheritance, Interface'
  },
  {
    id: 3,
    nama: 'Database & PHP',
    deskripsi: 'Integrasi database dengan PHP',
    durasi: '5 minggu',
    level: 'Menengah',
    topik: 'MySQL, Query, CRUD'
  },
  {
    id: 4,
    nama: 'Laravel Framework',
    deskripsi: 'Build aplikasi dengan Laravel modern',
    durasi: '8 minggu',
    level: 'Mahir',
    topik: 'MVC, Routing, Eloquent'
  },
  {
    id: 5,
    nama: 'REST API dengan PHP',
    deskripsi: 'Membuat REST API profesional',
    durasi: '6 minggu',
    level: 'Mahir',
    topik: 'API Design, JSON, Authentication'
  },
  {
    id: 6,
    nama: 'PHP Advanced',
    deskripsi: 'Teknik-teknik PHP tingkat lanjut',
    durasi: '7 minggu',
    level: 'Mahir',
    topik: 'Design Pattern, Security, Testing'
  }
]

const app = document.querySelector('#app')

const getLevelClass = (level) => {
  const levels = {
    'Pemula': 'level-pemula',
    'Menengah': 'level-menengah',
    'Mahir': 'level-mahir'
  }
  return levels[level] || ''
}

app.innerHTML = `
  <navbar>
    <div class="logo"><a href="/">☕ Kafekoding</a></div>
    <ul class="nav-menu">
      <li><a href="/">Home</a></li>
      <li><a href="/kelas-list.html">Kelas</a></li>
      <li><a href="/">Tentang</a></li>
      <li><a href="/">Kontak</a></li>
    </ul>
  </navbar>

  <div class="kelas-container">
    <div class="kelas-section">
      <h1>Kelas PHP Kafekoding</h1>
      <p class="kelas-subtitle">Pilih kelas sesuai dengan level kamu dan mulai belajar sekarang</p>
      
      <div class="kelas-grid">
        ${kelasData.map(kelas => `
          <div class="kelas-card">
            <div class="kelas-header">
              <div class="level-badge ${getLevelClass(kelas.level)}">${kelas.level}</div>
              <div class="durasi">${kelas.durasi}</div>
            </div>
            <h3 class="kelas-nama">${kelas.nama}</h3>
            <p class="kelas-desc">${kelas.deskripsi}</p>
            <div class="kelas-topik">
              <span class="topik-label">Topik:</span>
              <span class="topik-text">${kelas.topik}</span>
            </div>
            <button class="btn-daftar" onclick="window.location.href='/kelas.html?id=${kelas.id}'">Daftar Kelas</button>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
`
