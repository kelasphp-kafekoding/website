export const showcaseSection = async () => {
  const showcaseGrid = document.getElementById('showcase-grid');
  showcaseGrid.innerHTML = `
    <div class="coming-soon">
      <div class="coming-soon-icon">🚀</div>
      <h3>Coming Soon</h3>
      <p>Showcase proyek dari peserta akan segera ditampilkan di sini</p>
    </div>
  `;
};
