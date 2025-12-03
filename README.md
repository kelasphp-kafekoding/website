# Kafekoding - Kelas PHP

Platform pembelajaran PHP interaktif dari komunitas Kafekoding dengan materi terstruktur, showcase proyek, dan komunitas yang aktif.

## Fitur

- Materi Pembelajaran PHP dari dasar hingga mahir
- Showcase Proyek dari peserta kelas
- Galeri dokumentasi kegiatan
- Testimoni peserta
- Interface responsif dan modern

## Tech Stack

![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)

## Instalasi

```bash
git clone https://github.com/username-kamu/website.git
cd website
npm install
npm run dev
```

## Kontribusi

Ingin berkontribusi? Lihat **[CONTRIBUTOR.md](./CONTRIBUTOR.md)** untuk panduan lengkap.

Quick start:
1. Fork repository
2. Clone & buat branch: `git checkout -b Nama_Sekolah`
3. Buat perubahan & commit
4. Push & buat Pull Request

**Catatan:** Hanya proyek dari anggota Kelas PHP Kafekoding yang ditampilkan.

## Tambah Materi

1. Buat file `public/materi/nama-materi.md`
2. Update `materi-list.json`:

```json
{
  "id": 8,
  "slug": "nama-materi",
  "title": "Judul",
  "description": "Deskripsi",
  "file": "nama-materi.md",
  "author": "Nama",
  "date": "2025-12-01"
}
```

## Tambah Showcase

Edit `public/showcase.json`:

```json
{
  "id": 1,
  "title": "Nama Proyek",
  "description": "Deskripsi",
  "image": "URL",
  "github": "URL",
  "demo": "URL",
  "author": "Nama"
}
```

## Halaman

- Home - Beranda
- Materi - Pembelajaran
- Showcase - Galeri proyek
- Galeri - Dokumentasi kelas
- Testimoni - Feedback peserta
- Tentang - Info Kafekoding
- Kontak - Hubungi kami

## Mentor

- GitHub: [@rifaldo-dev](https://github.com/rifaldo-dev)
- Instagram: [@rifaldo.dev](https://www.instagram.com/rifaldo.dev)
