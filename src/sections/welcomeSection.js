export const welcomeSection = () => {
  // Skip floating icons on mobile for better performance
  if (window.innerWidth < 768) return;
  
  const icons = [
    { src: '/icons/php.svg', alt: 'PHP' },
    { src: '/icons/laravel.svg', alt: 'Laravel' },
    { src: '/icons/mysql-icon-light.svg', alt: 'MySQL' },
    { src: '/icons/html5.svg', alt: 'HTML5' },
    { src: '/icons/css_old.svg', alt: 'CSS' },
    { src: '/icons/bootstrap.svg', alt: 'Bootstrap' }
  ];

  const container = document.getElementById('icons-container');
  if (!container) return;
  
  icons.forEach((icon, index) => {
    const img = document.createElement('img');
    img.src = icon.src;
    img.alt = icon.alt;
    img.className = 'floating-icon';
    img.loading = 'lazy';
    img.style.animationDelay = `${index * 0.15}s`;
    container.appendChild(img);
  });
};
