export const showcaseSection = async () => {
  const showcaseGrid = document.getElementById('showcase-grid');
  
  try {
    const response = await fetch('/public/showcase.json');
    const data = await response.json();
    
    if (data.showcase && data.showcase.length > 0) {
      // Hanya tampilkan 6 project pertama
      const limitedProjects = data.showcase.slice(0, 6);
      
      showcaseGrid.innerHTML = limitedProjects.map(project => `
        <div class="showcase-card">
          <img src="${project.gambar}" alt="${project.judul}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 16px;">
          <h3 style="font-size: 1.3rem; margin-bottom: 12px; color: var(--text);">${project.judul}</h3>
          <p style="color: var(--text-light); margin-bottom: 16px; line-height: 1.6;">${project.deks}</p>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
            ${project.tech.map(tech => `<span style="background: #e0f2fe; color: #0369a1; padding: 4px 12px; border-radius: 12px; font-size: 0.85rem; font-weight: 600;">${tech}</span>`).join('')}
          </div>
          <p style="color: var(--text-light); font-size: 0.9rem; margin-bottom: 12px;"><i class="fa-solid fa-user" style="margin-right: 6px;"></i>${project.namaPeserta}</p>
          <div style="display: flex; gap: 12px;">
            <a href="${project.github}" target="_blank" style="color: var(--secondary); text-decoration: none; font-weight: 600;">GitHub →</a>
            <a href="${project.project}" target="_blank" style="color: var(--accent); text-decoration: none; font-weight: 600;">Live Demo →</a>
          </div>
        </div>
      `).join('');
      
      // Tambahkan tombol "LIHAT SEMUA" jika ada lebih dari 6 project
      if (data.showcase.length > 6) {
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
        <div class="coming-soon">
          <div class="coming-soon-icon">🚀</div>
          <h3>Coming Soon</h3>
          <p>Showcase proyek dari peserta akan segera ditampilkan di sini</p>
        </div>
      `;
    }
  } catch (error) {
    console.error('Error loading showcase:', error);
    showcaseGrid.innerHTML = `
      <div class="coming-soon">
        <div class="coming-soon-icon">🚀</div>
        <h3>Coming Soon</h3>
        <p>Showcase proyek dari peserta akan segera ditampilkan di sini</p>
      </div>
    `;
  }
};
