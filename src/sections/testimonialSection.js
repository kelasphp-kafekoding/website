import { comentarService } from '../services/comentarService.js';

const COMMENTS_PER_PAGE = 5;
let allComments = [];
let currentPage = 1;

function generateRandomId() {
  return Math.random().toString(36).substr(2, 9);
}

function getJakartaTimestamp() {
  const now = new Date();
  const jakartaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
  return jakartaTime.toISOString();
}

function getRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  
  const seconds = Math.floor((now - date) / 1000);
  
  const intervals = {
    'tahun': 31536000,
    'bulan': 2592000,
    'minggu': 604800,
    'hari': 86400,
    'jam': 3600,
    'menit': 60,
  };
  
  for (const [key, value] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / value);
    if (interval >= 1) {
      return interval === 1 ? `1 ${key} yang lalu` : `${interval} ${key} yang lalu`;
    }
  }
  
  return 'Baru saja';
}

function renderComments(page = 1) {
  const commentsList = document.getElementById('comments-list');
  const commentsCount = document.getElementById('comments-count');
  const pagination = document.getElementById('pagination');
  
  if (allComments.length === 0) {
    commentsList.innerHTML = '<p class="no-comments">Belum ada komentar. Jadilah yang pertama!</p>';
    pagination.innerHTML = '';
    return;
  }
  
  const totalPages = Math.ceil(allComments.length / COMMENTS_PER_PAGE);
  const startIndex = (page - 1) * COMMENTS_PER_PAGE;
  const endIndex = startIndex + COMMENTS_PER_PAGE;
  const pageComments = allComments.slice(startIndex, endIndex);
  
  commentsCount.textContent = `(${allComments.length})`;
  
  commentsList.innerHTML = pageComments.map(comment => `
    <div class="comment-card" style="border-left-color: ${comment.color || '#3b82f6'};">
      <div class="comment-header">
        <div class="comment-info">
          <h4 class="comment-name">${comment.name}</h4>
          <p class="comment-status">${comment.status}</p>
        </div>
        <span class="comment-date">${getRelativeTime(comment.date)}</span>
      </div>
      <p class="comment-message">${comment.message}</p>
    </div>
  `).join('');
  
  if (totalPages > 1) {
    let paginationHTML = '<div class="pagination-controls">';
    paginationHTML += `<button class="pagination-btn" id="prev-btn" ${page === 1 ? 'disabled' : ''}>← Sebelumnya</button>`;
    
    for (let i = 1; i <= totalPages; i++) {
      paginationHTML += `<button class="pagination-btn ${i === page ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
    
    paginationHTML += `<button class="pagination-btn" id="next-btn" ${page === totalPages ? 'disabled' : ''}>Selanjutnya →</button>`;
    paginationHTML += '</div>';
    
    pagination.innerHTML = paginationHTML;
    
    document.getElementById('prev-btn')?.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderComments(currentPage);
        document.getElementById('comments-list').scrollIntoView({ behavior: 'smooth' });
      }
    });
    
    document.getElementById('next-btn')?.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderComments(currentPage);
        document.getElementById('comments-list').scrollIntoView({ behavior: 'smooth' });
      }
    });
    
    document.querySelectorAll('.pagination-btn[data-page]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        currentPage = parseInt(e.target.dataset.page);
        renderComments(currentPage);
        document.getElementById('comments-list').scrollIntoView({ behavior: 'smooth' });
      });
    });
  } else {
    pagination.innerHTML = '';
  }
}

async function loadComments() {
  try {
    const response = await comentarService.getComentar();
    allComments = response.comentar.reverse();
    console.log('✓ Loaded', allComments.length, 'comments');
    currentPage = 1;
    renderComments(currentPage);
  } catch (err) {
    console.error('✗ Error loading comments:', err);
    document.getElementById('comments-list').innerHTML = '<p class="error-message">Gagal memuat komentar. Silakan coba lagi.</p>';
  }
}

function setupCommentForm() {
  const form = document.getElementById('comment-form');
  const formMessage = document.getElementById('form-message');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('comment-name').value?.trim();
    const status = document.getElementById('comment-status').value?.trim();
    const message = document.getElementById('comment-message').value?.trim();
    
    if (!name || !message) {
      formMessage.textContent = 'Nama dan pesan harus diisi!';
      formMessage.className = 'form-message error';
      setTimeout(() => {
        formMessage.textContent = '';
        formMessage.className = 'form-message';
      }, 3000);
      return;
    }
    
    const colors = ['#a3bffa', '#fcd34d', '#c7d2fe', '#fecaca', '#d1fae5', '#fda29b', '#e0e7ff', '#fef08a'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const newComment = {
      id: generateRandomId(),
      name: name,
      status: status || 'Member',
      message: message,
      date: getJakartaTimestamp(),
      color: randomColor
    };
    
    formMessage.textContent = 'Mengirim...';
    formMessage.className = 'form-message sending';
    
    try {
      await comentarService.addComentar(newComment);
      
      formMessage.textContent = 'Pendapat Anda berhasil dikirim! Terima kasih! 🎉';
      formMessage.className = 'form-message success';
      form.reset();
      
      setTimeout(() => {
        loadComments();
      }, 1200);
    } catch (err) {
      console.error('✗ Error posting comment:', err);
      formMessage.textContent = 'Gagal mengirim. ' + err.message;
      formMessage.className = 'form-message error';
    }
    
    setTimeout(() => {
      formMessage.textContent = '';
      formMessage.className = 'form-message';
    }, 4000);
  });
}

export const testimonialSection = () => {
  loadComments();
  setupCommentForm();
  
  setInterval(loadComments, 10000);
};
