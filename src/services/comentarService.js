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
      console.log('Loading comments from showcase.json...');
      
      const response = await fetch('/showcase.json');
      const data = await response.json();
      const showcaseComments = data.testimonials || [];
      const localComments = getLocalComments();
      
      const allComments = [...showcaseComments, ...localComments];
      cachedComentarData = allComments;
      cacheTimestamp = now;
      
      console.log('✓ Loaded', allComments.length, 'comments (showcase + local)');
      return { comentar: allComments };
    } catch (err) {
      console.error('✗ Error loading comments:', err);
      const localComments = getLocalComments();
      return { comentar: localComments };
    }
  },

  addComentar: async (newComment) => {
    try {
      console.log('Saving comment to localStorage:', newComment);
      
      const localComments = getLocalComments();
      localComments.push(newComment);
      saveLocalComments(localComments);
      
      cachedComentarData = null;
      cacheTimestamp = 0;
      
      console.log('✓ Comment saved successfully');
      return { success: true, data: newComment };
    } catch (err) {
      console.error('✗ Error saving comment:', err);
      throw new Error('Gagal menyimpan komentar. ' + err.message);
    }
  },

  clearCache: () => {
    cachedComentarData = null;
    cacheTimestamp = 0;
    console.log('Cache cleared');
  }
};
