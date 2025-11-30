const API_URL = 'https://script.google.com/macros/s/AKfycbzThe-3DFXoXxJheSntYi5xYi-R6UG83BPq1pmRKJNO8Dt9AkIlPhljAZsxJF2JZEXrrg/exec';

let cachedComentarData = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 10000;

export const comentarService = {
  getComentar: async () => {
    const now = Date.now();
    
    if (cachedComentarData && (now - cacheTimestamp) < CACHE_DURATION) {
      console.log('✓ Returning cached comments');
      return { comentar: cachedComentarData };
    }

    try {
      console.log('Loading comments from API:', API_URL);
      
      const response = await fetch(API_URL, { method: 'GET' });
      console.log('GET Response status:', response.status, response.ok);
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      console.log('GET Response data:', data);
      
      if (data.comentar && Array.isArray(data.comentar)) {
        cachedComentarData = data.comentar;
        cacheTimestamp = now;
        console.log('✓ Loaded', cachedComentarData.length, 'comments from API');
        return { comentar: cachedComentarData };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('✗ Error loading from API:', err);
      console.log('Fallback to showcase.json...');
      
      try {
        const response = await fetch('/showcase.json');
        const data = await response.json();
        const fallbackComments = data.testimonials || [];
        
        cachedComentarData = fallbackComments;
        cacheTimestamp = now;
        console.log('✓ Loaded', fallbackComments.length, 'comments from fallback');
        
        return { comentar: fallbackComments };
      } catch (fallbackErr) {
        console.error('✗ Fallback failed:', fallbackErr);
        return { comentar: [] };
      }
    }
  },

  addComentar: async (newComment) => {
    try {
      console.log('Posting comment:', newComment);
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(newComment)
      });
      
      console.log('POST Response status:', response.status, response.ok);
      console.log('POST Response headers:', {
        'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
        'Content-Type': response.headers.get('Content-Type')
      });
      
      const data = await response.json();
      console.log('POST Response data:', data);
      
      if (response.ok || data.status === 200) {
        cachedComentarData = null;
        cacheTimestamp = 0;
        console.log('✓ Comment posted successfully and cache cleared');
        return { success: true, data: newComment };
      } else {
        throw new Error(data.message || `Server error: ${data.status}`);
      }
    } catch (err) {
      console.error('✗ Error posting comment:', err);
      throw err;
    }
  },

  clearCache: () => {
    cachedComentarData = null;
    cacheTimestamp = 0;
    console.log('Cache cleared');
  }
};
