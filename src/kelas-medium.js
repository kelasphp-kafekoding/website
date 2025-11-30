import { initHamburger } from './hamburger.js'
import './pages.css'

const app = document.querySelector('#app')

const MEDIUM_USERNAME = 'rifaldo'
const CORS_PROXY = 'https://api.rss2json.com/v1/api.json?rss_url='
const MEDIUM_RSS_URL = `https://medium.com/feed/@${MEDIUM_USERNAME}`

const getTagNumber = (tags) => {
  if (!tags || tags.length === 0) return 999
  
  const materiaTags = tags
    .map(tag => typeof tag === 'string' ? tag.toLowerCase().trim() : '')
    .filter(tag => tag.includes('materi'))
  
  if (materiaTags.length > 0) {
    const match = materiaTags[0].match(/(\d+)/)
    const num = match ? parseInt(match[1]) : 999
    console.log('Tag found:', materiaTags[0], '-> Number:', num)
    return num
  }
  return 999
}

const getTagNumberDisplay = (tags) => {
  const num = getTagNumber(tags)
  return num === 999 ? '?' : num
}

const extractThumbnail = (content) => {
  if (!content) return 'https://via.placeholder.com/300x200?text=Kafekoding'
  const imgRegex = /<img[^>]+src="([^">]+)"/
  const match = content.match(imgRegex)
  return match ? match[1] : 'https://via.placeholder.com/300x200?text=Kafekoding'
}

const extractTagFromContent = (content) => {
  if (!content) return []
  
  const tags = []
  
  const hashtagRegex = /#(materi\d+)/gi
  const hashMatches = content.match(hashtagRegex)
  if (hashMatches) {
    const hashTags = hashMatches.map(tag => tag.substring(1).toLowerCase())
    tags.push(...hashTags)
    console.log('Hashtag found:', hashTags)
  }
  
  const plainMatches = content.match(/materi\d+/gi)
  if (plainMatches) {
    const plainTags = plainMatches.map(tag => tag.toLowerCase())
    tags.push(...plainTags)
    console.log('Plain text tag found:', plainTags)
  }
  
  return [...new Set(tags)]
}

const cleanDescription = (html) => {
  if (!html) return 'Klik untuk membaca selengkapnya'
  const text = html.replace(/<[^>]*>/g, '')
  return text.length > 150 ? text.substring(0, 150) + '...' : text
}

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('id-ID', options)
}

const renderLoading = () => {
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
        <li><a href="/materi.html">Materi</a></li>
        <li><a href="/tentang.html">Tentang</a></li>
        <li><a href="/kontak.html">Kontak</a></li>
      </ul>
    </navbar>

    <div class="container">
      <h1>Kelas PHP Kafekoding</h1>
      <p class="subtitle">Artikel pembelajaran dari Rifaldo di Medium</p>
      <div class="loading">⏳ Memuat artikel dari Medium...</div>
    </div>
  `
  initHamburger()
}

const renderError = (error) => {
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
        <li><a href="/materi.html">Materi</a></li>
        <li><a href="/tentang.html">Tentang</a></li>
        <li><a href="/kontak.html">Kontak</a></li>
      </ul>
    </navbar>

    <div class="container">
      <h1>Kelas PHP Kafekoding</h1>
      <p class="subtitle">Artikel pembelajaran dari Rifaldo di Medium</p>
      <div class="error">❌ ${error}</div>
    </div>
  `
  initHamburger()
}

const renderArticles = (articles) => {
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
        <li><a href="/materi.html">Materi</a></li>
        <li><a href="/tentang.html">Tentang</a></li>
        <li><a href="/kontak.html">Kontak</a></li>
      </ul>
    </navbar>

    <div class="container">
      <h1>Kelas PHP Kafekoding</h1>
      <p class="subtitle">Artikel pembelajaran dari Rifaldo di Medium</p>

      <div class="kelas-grid">
        ${articles.map(article => `
          <div class="card" onclick="window.open('${article.link}', '_blank')">
            <div style="width: 100%; height: 160px; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 8px; margin-bottom: 15px; overflow: hidden;">
              <img src="${article.thumbnail}" alt="${article.title}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <span class="card-tag">Materi ${getTagNumberDisplay(article.categories)}</span>
            <h3 class="card-title">${article.title}</h3>
            <p class="card-desc">${article.description}</p>
            <div class="card-meta">
              <span class="card-author">${article.author}</span>
              <span class="card-date">${article.date}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `
  initHamburger()
}

async function fetchMediumArticles() {
  renderLoading()

  try {
    const response = await fetch(CORS_PROXY + encodeURIComponent(MEDIUM_RSS_URL))
    
    if (!response.ok) {
      throw new Error('Gagal mengambil data dari Medium')
    }

    const data = await response.json()

    if (!data.items || data.items.length === 0) {
      renderError('Belum ada artikel di Medium. Silakan buat artikel dengan tag materi1, materi2, dst.')
      return
    }

    const articles = data.items
      .map(item => {
        const mediumTags = item.categories || []
        const contentTags = extractTagFromContent(item.description)
        const allTags = [...mediumTags, ...contentTags]
        
        const article = {
          title: item.title,
          description: cleanDescription(item.description),
          author: data.feed.title || 'Rifaldo',
          date: formatDate(item.pubDate),
          link: item.link,
          thumbnail: extractThumbnail(item.description),
          categories: allTags,
          tagNumber: getTagNumber(allTags)
        }
        
        console.log(`✓ "${item.title}"`, {
          mediumTags,
          contentTags,
          allTags,
          tagNumber: article.tagNumber
        })
        
        return article
      })
      .sort((a, b) => a.tagNumber - b.tagNumber)

    const filteredArticles = articles.filter(article => article.tagNumber !== 999)
    
    console.log('=== All Articles ===', articles)
    console.log('=== Filtered Articles (dengan tag materi) ===', filteredArticles)

    if (filteredArticles.length === 0) {
      renderError('Belum ada artikel dengan tag materi1, materi2, dst. Pastikan artikel Medium Anda menggunakan tag tersebut.')
      return
    }

    renderArticles(filteredArticles)
  } catch (error) {
    renderError(`Error: ${error.message}. Pastikan username Medium benar: @${MEDIUM_USERNAME}`)
  }
}

fetchMediumArticles()
