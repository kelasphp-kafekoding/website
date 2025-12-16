const API_URL = 'https://script.google.com/macros/s/AKfycbyIwhn0QcwmnQfswCH6cEkLNQD85cL-1R2MdZPDRdJ2LKM-F2FExbORAy7lMPXcyvUM/exec';
const LOCAL_STORAGE_KEY = 'kelas_php_comments_local';

let cachedComentarData = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 30000;

function getLocalComments() {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    return [];
  }
}

function saveLocalComments(comments) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(comments));
  } catch (err) {
    // Silent fail
  }
}

export const comentarService = {
  getComentar: async () => {
    const now = Date.now();
    
    if (cachedComentarData && (now - cacheTimestamp) < CACHE_DURATION) {
      return { comentar: cachedComentarData };
    }

    try {
      const response = await fetch(API_URL, { 
        method: 'GET',
        mode: 'cors'
      });
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      
      if (data.comentar && Array.isArray(data.comentar)) {
        cachedComentarData = data.comentar;
        cacheTimestamp = now;
        return { comentar: data.comentar };
      } else {
        throw new Error('Invalid response');
      }
    } catch (err) {
      // Fallback to showcase.json
      try {
        const response = await fetch('/showcase.json');
        const data = await response.json();
        const comments = data.testimonials || [];
        cachedComentarData = comments;
        cacheTimestamp = now;
        return { comentar: comments };
      } catch (fallbackErr) {
        return { comentar: [] };
      }
    }
  },

  addComentar: async (newComment) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(newComment),
        mode: 'cors'
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.status === 200) {
          cachedComentarData = null;
          cacheTimestamp = 0;
          return { success: true, data: newComment };
        }
      }
      throw new Error('API error');
    } catch (err) {
      // Fallback to localStorage
      const localComments = getLocalComments();
      localComments.push(newComment);
      saveLocalComments(localComments);
      cachedComentarData = null;
      cacheTimestamp = 0;
      return { success: true, data: newComment, source: 'localStorage' };
    }
  },

  clearCache: () => {
    cachedComentarData = null;
    cacheTimestamp = 0;
  }
};
