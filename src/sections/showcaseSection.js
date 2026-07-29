import AOS from 'aos';

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
  if (!showcaseGrid) return;

  if (projects.length > 0) {
    showcaseGrid.innerHTML = projects.map((project, index) => `
      <div class="showcase-card" data-aos="fade-up" data-aos-delay="${index * 100}">
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
            <span class="card-author"><i class="fa-solid fa-user"></i> ${escapeHtml(project.namaPeserta)}</span>
            <div class="card-links">
              <a href="${sanitizeUrl(project.github)}" target="_blank" rel="noopener noreferrer" class="card-link" title="GitHub"><i class="fa-brands fa-github"></i></a>
              <a href="${sanitizeUrl(project.project)}" target="_blank" rel="noopener noreferrer" class="card-link demo" title="Live Demo"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    const isMobile = window.innerWidth <= 768;
    const limit = isMobile ? 3 : 6;
    if (showViewAll && totalCount > limit) {
      showcaseGrid.innerHTML += `
        <div style="grid-column: 1 / -1; text-align: center; margin-top: 16px;" data-aos="fade-up" data-aos-delay="${limit * 100}">
          <a href="/showcase.html" class="btn btn-dark" style="display: inline-flex;">
            Lihat Semua Proyek <i class="fa-solid fa-arrow-right" style="margin-left: 8px;"></i>
          </a>
        </div>
      `;
    }

    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  } else {
    showcaseGrid.innerHTML = `
      <div class="coming-soon" style="grid-column: 1 / -1;">
        <div class="coming-soon-icon">🚀</div>
        <h3>Coming Soon</h3>
        <p>Showcase proyek dari peserta akan segera ditampilkan di sini</p>
      </div>
    `;
  }
};

export const showcaseSection = async () => {
  const showcaseGrid = document.getElementById('showcase-grid');
  if (!showcaseGrid) return;

  try {
    const response = await fetch('/showcase.json');
    const data = await response.json();

    if (data.showcase && data.showcase.length > 0) {
      const allProjects = data.showcase;
      const isMobile = window.innerWidth <= 768;
      const limit = isMobile ? 3 : 6;
      const limitedProjects = allProjects.slice(0, limit);

      renderProjects(limitedProjects, true, allProjects.length);
    } else {
      renderProjects([]);
    }
  } catch (error) {
    console.error('Error loading showcase:', error);
    if (showcaseGrid) {
      showcaseGrid.innerHTML = `
        <div class="coming-soon" style="grid-column: 1 / -1;">
          <div class="coming-soon-icon">🚀</div>
          <h3>Coming Soon</h3>
          <p>Showcase proyek dari peserta akan segera ditampilkan di sini</p>
        </div>
      `;
    }
  }
};
