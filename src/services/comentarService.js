const API_URL = 'https://script.google.com/macros/s/AKfycbyIwhn0QcwmnQfswCH6cEkLNQD85cL-1R2MdZPDRdJ2LKM-F2FExbORAy7lMPXcyvUM/exec';
const LOCAL_STORAGE_KEY = 'kelas_php_comments_local';

let cachedComentarData = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 10000;

function getLocalComments() {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.error('Error reading localStorage:', err);
    return [];
  }
}

function saveLocalComments(comments) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(comments));
    console.log('✓ Comments saved to localStorage');
  } catch (err) {
    console.error('Error saving to localStorage:', err);
  }
}

export const comentarService = {
  getComentar: async () => {
    const now = Date.now();
    
    if (cachedComentarData && (now - cacheTimestamp) < CACHE_DURATION) {
      console.log('✓ Returning cached comments');
      return { comentar: cachedComentarData };
    }

    try {
      console.log('Trying to load from Google Apps Script:', API_URL);
      
      const response = await fetch(API_URL, { 
        method: 'GET',
        mode: 'cors'
      });
      console.log('GET Response status:', response.status, response.ok);
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      console.log('GET Response data:', data);
      
      if (data.comentar && Array.isArray(data.comentar)) {
        const localComments = getLocalComments();
        const allComments = [...data.comentar, ...localComments];
        cachedComentarData = allComments;
        cacheTimestamp = now;
        console.log('✓ Loaded', allComments.length, 'comments from API + local');
        return { comentar: allComments };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (apiErr) {
      console.error('✗ Error loading from API:', apiErr);
      console.log('Fallback to showcase.json + localStorage...');
      
      try {
        const response = await fetch('/showcase.json');
        const data = await response.json();
        const showcaseComments = data.testimonials || [];
        const localComments = getLocalComments();
        
        const allComments = [...showcaseComments, ...localComments];
        cachedComentarData = allComments;
        cacheTimestamp = now;
        
        console.log('✓ Loaded', allComments.length, 'comments from fallback');
        return { comentar: allComments };
      } catch (fallbackErr) {
        console.error('✗ Fallback failed:', fallbackErr);
        const localComments = getLocalComments();
        return { comentar: localComments };
      }
    }
  },

  addComentar: async (newComment) => {
    try {
      console.log('Trying to post to Google Apps Script:', newComment);
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(newComment),
        mode: 'cors'
      });
      
      console.log('POST Response status:', response.status, response.ok);
      
      if (response.ok) {
        const data = await response.json();
        console.log('POST Response data:', data);
        
        if (data.status === 200) {
          cachedComentarData = null;
          cacheTimestamp = 0;
          console.log('✓ Comment posted to API successfully');
          return { success: true, data: newComment, source: 'api' };
        }
      }
      
      throw new Error('API response not OK');
    } catch (apiErr) {
      console.error('✗ Error posting to API:', apiErr);
      console.log('Falling back to localStorage...');
      
      try {
        const localComments = getLocalComments();
        localComments.push(newComment);
        saveLocalComments(localComments);
        
        cachedComentarData = null;
        cacheTimestamp = 0;
        
        console.log('✓ Comment saved to localStorage');
        return { success: true, data: newComment, source: 'localStorage' };
      } catch (localErr) {
        console.error('✗ Error saving to localStorage:', localErr);
        throw new Error('Gagal menyimpan komentar. ' + localErr.message);
      }
    }
  },

  clearCache: () => {
    cachedComentarData = null;
    cacheTimestamp = 0;
    console.log('Cache cleared');
  }
};
