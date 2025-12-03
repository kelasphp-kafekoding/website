# Panduan Kontributor

Terima kasih telah tertarik berkontribusi di Kafekoding! Ikuti panduan ini untuk memulai.

## Siapa Bisa Kontribusi?

- Anggota Kelas PHP Komunitas Kafekoding
- Peserta aktif dalam program pembelajaran
- Memiliki proyek yang sudah selesai dan berfungsi

## Jenis Kontribusi

### 1. Tambah Materi Pembelajaran

**File yang diubah:**
- `public/materi/` - Tambah file markdown baru
- `public/materi-list.json` - Update daftar materi

**Langkah:**
1. Buat file markdown di `public/materi/nama-materi.md`
2. Tulis materi dengan markdown format
3. Update `public/materi-list.json`:

```json
{
  "id": 8,
  "slug": "nama-materi-unique",
  "title": "Judul Materi",
  "description": "Deskripsi singkat materi",
  "file": "nama-materi.md",
  "author": "Nama Anda",
  "date": "2025-12-03"
}
```

### 2. Tambah Showcase Proyek

**File yang diubah:**
- `public/showcase.json`

**Langkah:**
Tambahkan entry baru di `public/showcase.json`:

```json
{
  "id": 10,
  "title": "Nama Proyek Anda",
  "description": "Deskripsi singkat proyek",
  "image": "https://url-gambar-proyek.jpg",
  "github": "https://github.com/username/repo",
  "demo": "https://demo-link.com",
  "author": "Nama Anda"
}
```

### 3. Perbaikan Bug & Improvement

- Update styling
- Fix responsive design
- Improve performance
- Perbaikan typo/dokumentasi

## Proses Kontribusi

### Step 1: Fork Repository

Klik tombol **Fork** di halaman repository GitHub

### Step 2: Clone Repository

```bash
git clone https://github.com/username-anda/website.git
cd website
```

### Step 3: Buat Branch

```bash
git checkout -b Nama_Lengkap_Nama_Sekolah
```

Contoh:
```bash
git checkout -b Rifaldo_Saputra_metamedia
```

### Step 4: Buat Perubahan

Buat perubahan yang Anda inginkan:
- Tambah materi
- Update showcase
- Perbaiki bug
- Improvement fitur

### Step 5: Commit Changes

```bash
git add .
git commit -m "feat: deskripsi perubahan"
```

**Format commit message:**
- `feat:` untuk fitur baru
- `fix:` untuk perbaikan bug
- `docs:` untuk dokumentasi
- `style:` untuk styling
- `chore:` untuk update lainnya

Contoh:
```bash
git commit -m "feat: add new php tutorial material"
git commit -m "fix: responsive design on gallery"
git commit -m "docs: update README"
```

### Step 6: Push ke Branch

```bash
git push origin Rifaldo_Saputra_metamedia
```

### Step 7: Buat Pull Request

1. Buka repository Anda di GitHub
2. Klik tombol **Pull Request**
3. Pilih branch Anda dan repository utama
4. Isi judul dan deskripsi PR
5. Klik **Create Pull Request**

## Review Process

- Tim maintainer akan review PR Anda dalam 3-7 hari kerja
- Mungkin ada feedback atau request perubahan
- Setelah approved, PR akan di-merge ke main branch

## Checklist Sebelum PR

- [ ] Branch name sesuai format: `Nama_Lengkap_Nama_Kampus`
- [ ] Commit message jelas dan deskriptif
- [ ] Tidak ada conflict dengan branch main
- [ ] Kode sudah ditest di local
- [ ] Tidak ada hardcode path atau sensitive data
- [ ] File JSON sudah di-format dengan benar
- [ ] Gambar/asset sudah optimal (jika ada)

## Standar Kode

### Markdown Materi

```markdown
# Judul Materi

Pengenalan singkat...

## Apa itu [Topik]?

Penjelasan...

## Cara Kerja

1. Step pertama
2. Step kedua
3. Step ketiga

## Contoh Kode

\`\`\`php
<?php
echo "Hello World";
?>
\`\`\`

## Kesimpulan

Summary...

## Referensi

- [Link 1](url)
- [Link 2](url)
```

### JSON Format

```json
{
  "id": 1,
  "slug": "lowercase-with-hyphens",
  "title": "Judul dengan Capitalize",
  "description": "Deskripsi singkat",
  "file": "lowercase-filename.md",
  "author": "Nama Lengkap",
  "date": "YYYY-MM-DD"
}
```

## Tips Berkontribusi

1. **Komunikasi** - Diskusikan ide besar sebelum mulai
2. **Research** - Pastikan materi akurat dan up-to-date
3. **Testing** - Test di local sebelum push
4. **Dokumentasi** - Pastikan README/docs update
5. **Feedback** - Terima saran dengan terbuka

## Pertanyaan?

Hubungi mentor/maintainer:
- GitHub: [@rifaldo-dev](https://github.com/rifaldo-dev)
- Instagram: [@rifaldo.dev](https://www.instagram.com/rifaldo.dev)

## Kontributor

<div align="center">

### Tim Pengembang

[![rifaldo-dev](https://img.shields.io/badge/GitHub-rifaldo--dev-black?style=flat&logo=github)](https://github.com/rifaldo-dev)

**M. Rifaldo Saputra**  
*Lead Developer | Mentor*  
[![Instagram](https://img.shields.io/badge/Instagram-rifaldo.dev-E4405F?style=flat&logo=instagram&logoColor=white)](https://www.instagram.com/rifaldo.dev)
[![GitHub](https://img.shields.io/badge/GitHub-rifaldo--dev-black?style=flat&logo=github)](https://github.com/rifaldo-dev)

---

### Kontributor Aktif

*Daftar peserta yang berkontribusi pada platform ini*

| Nama | Sekolah/Kampus | Kontribusi | GitHub |
|------|-----------------|-----------|--------|
| Rifaldo Saputra | Metamedia | Lead Dev | [@rifaldo-dev](https://github.com/rifaldo-dev) |
| *Nama Kontributor* | *Sekolah* | *Materi/Showcase* | *GitHub* |

---

### Bagaimana Nama Anda Masuk Daftar?

1. Fork repository ini
2. Kontribusi (tambah materi, showcase, atau improvement)
3. Buat Pull Request
4. Tunggu PR di-approve
5. Nama Anda akan masuk ke daftar kontributor!

</div>

---

Selamat berkontribusi! 🚀
