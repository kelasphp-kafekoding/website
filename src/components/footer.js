export const renderFooter = () => {
  return `
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
              <li><a href="/materi.html">Materi</a></li>
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
}

export const renderGiscusWrapper = () => {
  return `
    <section class="comments-section">
      <div class="comments-container">
        <h2>Komentar</h2>
        <p class="comments-subtitle">Bagikan pendapat atau pertanyaan Anda tentang materi ini</p>
        <div class="giscus-wrapper"></div>
      </div>
    </section>
  `
}

export const initGiscus = (term = 'default-materi') => {
  const wrapper = document.querySelector('.giscus-wrapper')
  if (!wrapper) {
    console.warn('Giscus wrapper not found!')
    return
  }

  console.log('=== Giscus Init ===')
  console.log('Term:', term)

  // Remove all existing Giscus elements
  const existingGiscus = document.querySelectorAll('.giscus, giscus-widget, iframe.giscus-frame')
  existingGiscus.forEach(el => el.remove())

  // Remove all Giscus scripts
  const existingScripts = document.querySelectorAll('script[src*="giscus"]')
  existingScripts.forEach(script => script.remove())

  // Clear wrapper completely
  wrapper.innerHTML = ''

  // Create new script with unique term
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', 'kelasphp-kafekoding/website')
  script.setAttribute('data-repo-id', 'R_kgDOQfYiqQ')
  script.setAttribute('data-category', 'General')
  script.setAttribute('data-category-id', 'DIC_kwDOQfYiqc4CzSbS')
  script.setAttribute('data-mapping', 'specific')
  script.setAttribute('data-term', term)
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'bottom')
  script.setAttribute('data-theme', 'light')
  script.setAttribute('data-lang', 'id')
  script.setAttribute('data-loading', 'lazy')
  script.setAttribute('crossorigin', 'anonymous')
  script.async = true

  wrapper.appendChild(script)
  
  console.log('Giscus script added with term:', term)
}
