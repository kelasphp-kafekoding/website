export const renderNavbar = () => {
  return `
    <navbar>
      <div class="logo-container" onclick="window.location.href='/'">
        <img src="/icons/kk.png" alt="Kafekoding" class="logo-img">
        <div class="logo-text">
          <div class="logo-title">Kelas PHP</div>
          <div class="logo-subtitle">Powered by Kafekoding</div>
        </div>
      </div>
      <button class="hamburger" id="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul class="nav-menu" id="nav-menu">
        <li><a href="/#home">Home</a></li>
        <li><a href="/materi.html">Materi</a></li>
        <li><a href="/#showcase">Showcase</a></li>
        <li><a href="/#gallery">Galeri</a></li>
        <li><a href="/#comments">Testimoni</a></li>
        <li><a href="/tentang.html">Tentang</a></li>
        <li><a href="/kontak.html">Kontak</a></li>
      </ul>
    </navbar>
  `
}
