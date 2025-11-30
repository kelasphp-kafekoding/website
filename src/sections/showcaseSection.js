export const showcaseSection = async () => {
  try {
    const response = await fetch('/showcase.json');
    const data = await response.json();
    const showcaseGrid = document.getElementById('showcase-grid');
    
    if (data.showcase.length === 0) {
      showcaseGrid.innerHTML = `
        <div class="coming-soon">
          <div class="coming-soon-icon">🚀</div>
          <h3>Coming Soon</h3>
          <p>Showcase proyek dari peserta akan segera ditampilkan di sini</p>
        </div>
      `;
    } else {
      showcaseGrid.innerHTML = data.showcase.map(project => `
        <div class="showcase-card">
          <img src="${project.gambar}" alt="${project.judul}" class="showcase-image">
          <h3>${project.judul}</h3>
          <p>${project.deks}</p>
          <div class="project-info">
            <span class="peserta-name">👤 ${project.namaPeserta}</span>
          </div>
          <div class="project-tech">
            ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
          <div class="project-links">
            <a href="${project.github}" target="_blank" class="link-btn">GitHub</a>
            <a href="${project.project}" target="_blank" class="link-btn">Project</a>
          </div>
        </div>
      `).join('');
    }
  } catch (err) {
    console.error('Error loading showcase:', err);
  }
};
