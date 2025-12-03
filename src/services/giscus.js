export const initGiscus = (pathname = '/') => {
  // Create container for Giscus
  const giscusContainer = document.createElement('div')
  giscusContainer.className = 'giscus-container'
  giscusContainer.style.maxWidth = '1000px'
  giscusContainer.style.margin = '40px auto'
  giscusContainer.style.padding = '0 20px'

  // Get main element or app element
  const app = document.querySelector('#app')
  if (!app) return

  // Add container to the end of app (before scripts are loaded)
  // We'll append after content is rendered
  setTimeout(() => {
    if (!document.querySelector('.giscus-container')) {
      app.appendChild(giscusContainer)
      loadGiscus(pathname)
    }
  }, 100)
}

const loadGiscus = (pathname) => {
  // Check if script already exists
  if (document.querySelector('script[src="https://giscus.app/client.js"]')) {
    return
  }

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', 'kelasphp-kafekoding/website')
  script.setAttribute('data-repo-id', 'R_kgDOQfYiqQ')
  script.setAttribute('data-category', 'General')
  script.setAttribute('data-category-id', 'DIC_kwDOQfYiqc4CzSbS')
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-pathname', pathname)
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'bottom')
  script.setAttribute('data-theme', 'preferred_color_scheme')
  script.setAttribute('data-lang', 'id')
  script.setAttribute('crossorigin', 'anonymous')
  script.async = true

  const container = document.querySelector('.giscus-container')
  if (container) {
    container.appendChild(script)
  }
}
