// Sanitize HTML to prevent XSS attacks
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Sanitize URL to prevent javascript: protocol attacks
function sanitizeUrl(url) {
  if (!url) return '#';
  const trimmed = url.trim().toLowerCase();
  if (trimmed.startsWith('javascript:') || trimmed.startsWith('data:')) {
    return '#';
  }
  return url;
}

const renderProjects = (projects, showViewAll = false, totalCount = 0) => {
  const showcaseGrid = document.getElementById('showcase-grid');
  
  if (projects.length > 0) {
    showcaseGrid.innerHTML = projects.map(project => `
      <div class="showcase-card">
        <div class="card-image">
          <img src="${sanitizeUrl(project.gambar)}" alt="${escapeHtml(project.judul)}" loading="lazy">
        </div>
        <div class="card-body">
          <h3 class="card-title">${escapeHtml(project.judul)}</h3>
          <p class="card-desc">${escapeHtml(project.deks)}</p>
          <div class="card-tech">
            ${project.tech.map(tech => `<span class="tech-badge">${escapeHtml(tech)}</span>`).join('')}
          </div>
          <div class="card-footer">
            <span class="card-author"><i class="fa-solid fa-user"></i>${escapeHtml(project.namaPeserta)}</span>
            <div class="card-links">
              <a href="${sanitizeUrl(project.github)}" target="_blank" rel="noopener noreferrer" class="card-link" title="GitHub"><i class="fa-brands fa-github"></i></a>
              <a href="${sanitizeUrl(project.project)}" target="_blank" rel="noopener noreferrer" class="card-link demo" title="Live Demo"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
            </div>
          </div>
        </div>
      </div>
    `).join('');
    
    if (showViewAll && totalCount > 6) {
      showcaseGrid.innerHTML += `
        <div style="grid-column: 1 / -1; text-align: center; margin-top: 20px;">
          <a href="/showcase.html" style="display: inline-block; background: var(--text); color: white; padding: 14px 36px; text-decoration: none; border-radius: 30px; font-weight: 700; transition: transform 0.25s ease, box-shadow 0.25s ease; box-shadow: 0 10px 30px rgba(10, 14, 39, 0.18);">
            LIHAT SEMUA
          </a>
        </div>
      `;
    }
  } else {
    showcaseGrid.innerHTML = `
      <div class="coming-soon" style="grid-column: 1 / -1;">
        <div class="coming-soon-icon">🔍</div>
        <h3>Tidak Ada Hasil</h3>
        <p>Coba kata kunci lain untuk pencarian</p>
      </div>
    `;
  }
};

export const showcaseSection = async () => {
  const showcaseContainer = document.querySelector('.showcase-container');
  
  // Tambahkan search bar sebelum grid
  const searchHTML = `
    <div class="showcase-search">
      <input type="text" id="showcase-search-input" placeholder="Cari proyek, nama, atau teknologi...">
      <i class="fa-solid fa-search"></i>
    </div>
  `;
  
  const subtitleEl = showcaseContainer.querySelector('.showcase-subtitle');
  if (subtitleEl) {
    subtitleEl.insertAdjacentHTML('afterend', searchHTML);
  }
  
  try {
    const response = await fetch('/showcase.json');
    const data = await response.json();
    
    if (data.showcase && data.showcase.length > 0) {
      const allProjects = data.showcase;
      const limitedProjects = allProjects.slice(0, 6);
      
      renderProjects(limitedProjects, true, allProjects.length);
      
      // Setup search
      const searchInput = document.getElementById('showcase-search-input');
      let debounceTimer;
      
      searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          const term = e.target.value.toLowerCase().trim();
          
          if (!term) {
            renderProjects(limitedProjects, true, allProjects.length);
            return;
          }
          
          const filtered = allProjects.filter(p => 
            p.judul.toLowerCase().includes(term) ||
            p.namaPeserta.toLowerCase().includes(term) ||
            p.deks.toLowerCase().includes(term) ||
            p.tech.some(t => t.toLowerCase().includes(term))
          );
          
          renderProjects(filtered, false);
        }, 300);
      });
    } else {
      renderProjects([]);
    }
  } catch (error) {
    console.error('Error loading showcase:', error);
    document.getElementById('showcase-grid').innerHTML = `
      <div class="coming-soon">
        <div class="coming-soon-icon">🚀</div>
        <h3>Coming Soon</h3>
        <p>Showcase proyek dari peserta akan segera ditampilkan di sini</p>
      </div>
    `;
  }
};
