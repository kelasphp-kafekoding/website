const extractImageFromMarkdown = async (filename) => {
  try {
    const response = await fetch(`/materi/${filename}`)
    if (!response.ok) return null
    
    const markdown = await response.text()
    const imgRegex = /!\[.*?\]\((.*?)\)/
    const match = markdown.match(imgRegex)
    return match ? match[1] : null
  } catch (error) {
    return null
  }
}

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('id-ID', options)
}

export const materiSection = async () => {
  const materiGrid = document.getElementById('materi-grid')
  
  try {
    const response = await fetch('/materi-list.json')
    const data = await response.json()
    
    if (data.materi && data.materi.length > 0) {
      // Ambil 3 materi pertama untuk homepage
      const limitedMateri = data.materi.slice(0, 3)
      
      // Extract images from markdown files
      const materiWithImages = await Promise.all(
        limitedMateri.map(async (materi) => {
          const imageFromMd = await extractImageFromMarkdown(materi.file)
          return {
            ...materi,
            thumbnail: imageFromMd || materi.thumbnail || 'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=400&h=250&fit=crop'
          }
        })
      )
      
      materiGrid.innerHTML = materiWithImages.map(materi => `
        <div class="materi-card" onclick="window.location.href='/materi-detail.html?file=${materi.file}&title=${encodeURIComponent(materi.title)}'">
          <div style="width: 100%; height: 200px; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; margin-bottom: 16px; overflow: hidden;">
            <img src="${materi.thumbnail}" alt="${materi.title}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <span style="display: inline-block; background: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 12px; font-size: 0.85rem; font-weight: 600; margin-bottom: 12px;">Materi ${materi.id}</span>
          <h3 style="font-size: 1.4rem; margin-bottom: 12px; color: var(--text); font-weight: 700;">${materi.title}</h3>
          <p style="color: var(--text-light); margin-bottom: 16px; line-height: 1.6;">${materi.description}</p>
          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid #f3f4f6; font-size: 0.9rem; color: var(--text-light);">
            <span><i class="fa-solid fa-user" style="margin-right: 6px;"></i>${materi.author}</span>
            <span>${formatDate(materi.date)}</span>
          </div>
        </div>
      `).join('')
      
      // Tambahkan tombol "LIHAT SEMUA MATERI"
      if (data.materi.length > 3) {
        materiGrid.innerHTML += `
          <div style="grid-column: 1 / -1; text-align: center; margin-top: 20px;">
            <a href="/materi.html" style="display: inline-block; background: var(--text); color: white; padding: 14px 36px; text-decoration: none; border-radius: 30px; font-weight: 700; transition: transform 0.25s ease, box-shadow 0.25s ease; box-shadow: 0 10px 30px rgba(10, 14, 39, 0.18);">
              LIHAT SEMUA MATERI
            </a>
          </div>
        `
      }
    } else {
      materiGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
          <div style="font-size: 4rem; margin-bottom: 20px;">📚</div>
          <h3 style="font-size: 1.5rem; margin-bottom: 12px; color: var(--text);">Materi Segera Hadir</h3>
          <p style="color: var(--text-light);">Materi pembelajaran akan segera ditambahkan</p>
        </div>
      `
    }
  } catch (error) {
    console.error('Error loading materi:', error)
    materiGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <div style="font-size: 4rem; margin-bottom: 20px;">📚</div>
        <h3 style="font-size: 1.5rem; margin-bottom: 12px; color: var(--text);">Materi Segera Hadir</h3>
        <p style="color: var(--text-light);">Materi pembelajaran akan segera ditambahkan</p>
      </div>
    `
  }
}
