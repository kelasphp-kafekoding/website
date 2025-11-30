export const welcomeSection = () => {
  const icons = [
    { src: '/icons/php.svg', alt: 'PHP' },
    { src: '/icons/laravel.svg', alt: 'Laravel' },
    { src: '/icons/mysql-icon-light.svg', alt: 'MySQL' },
    { src: '/icons/html5.svg', alt: 'HTML5' },
    { src: '/icons/css_old.svg', alt: 'CSS' },
    { src: '/icons/bootstrap.svg', alt: 'Bootstrap' },
    { src: '/icons/nginx.svg', alt: 'Nginx' },
    { src: '/icons/chrome.svg', alt: 'Chrome' },
    { src: '/icons/mariadb.svg', alt: 'MariaDB' },
    { src: '/icons/stackoverflow_wordmark.svg', alt: 'Stack Overflow' },
    { src: '/icons/powershell.svg', alt: 'PowerShell' },
    { src: '/icons/kk.png', alt: 'kafekoding' }
  ];

  const container = document.getElementById('icons-container');
  icons.forEach((icon, index) => {
    const img = document.createElement('img');
    img.src = icon.src;
    img.alt = icon.alt;
    img.className = 'floating-icon';
    img.style.animationDelay = `${index * 0.1}s`;
    container.appendChild(img);
  });
};
