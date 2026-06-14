# Panduan Kontribusi

Terima kasih telah tertarik berkontribusi di Kafekoding Kelas PHP! Ikuti panduan ini untuk memulai.

---

## 👥 Siapa yang Bisa Berkontribusi?

- Peserta aktif Kelas PHP Komunitas Kafekoding
- Memiliki proyek yang sudah selesai dan berfungsi
- Bersedia mengikuti panduan kontribusi

---

## 📝 Jenis Kontribusi

### 1. Tambah Showcase Proyek (via CLI) ⭐ Recommended

Cara paling gampang berkontribusi! Cukup jalankan satu command:

```bash
npx kelasphp-showcase add \
  --id proj-todo-app \
  --judul "To-Do List Application" \
  --deskripsi "Aplikasi manajemen tugas berbasis web dengan fitur CRUD" \
  --gambar "https://i.imgur.com/screenshot.png" \
  --nama "Budi Santoso" \
  --tech "PHP,MySQL,Bootstrap" \
  --github "https://github.com/budi/todo-app" \
  --demo "https://todo-app.vercel.app"
```

**Langkah:**

1. Fork & clone repo
2. `npm install`
3. Jalankan command `npx kelasphp-showcase add` dengan data proyek kamu
4. Commit file `public/showcase.json` yang ter-update
5. Push & buat Pull Request

**CLI Commands:**
- `npx kelasphp-showcase add [options]` — Tambah proyek baru
- `npx kelasphp-showcase list` — Lihat semua proyek
- `npx kelasphp-showcase remove --id <id>` — Hapus proyek
- `npx kelasphp-showcase --help` — Bantuan lengkap

**Format:**
- Tech stack: pisahkan dengan `,` (koma), contoh: `"PHP,MySQL,Bootstrap"`
- ID: gunakan format slug, contoh: `proj-nama-proyek`

---

### 2. Tambah Showcase Proyek (Manual)

**File yang diubah:**
- `public/showcase.json`

**Langkah:**

Tambahkan entry baru di array `showcase`:

```json
{
  "id": "proj12",
  "judul": "Project Nama Anda",
  "deks": "Deskripsi singkat proyek Anda",
  "gambar": "https://url-gambar-proyek.jpg",
  "namaPeserta": "Nama Lengkap",
  "tech": ["PHP", "MySQL", "Bootstrap"],
  "github": "https://github.com/username/repo",
  "project": "https://demo-link.com"
}
```

### 3. Tambah Materi Pembelajaran

**File yang diubah:**
- `public/materi/` - Tambah file markdown baru
- `public/materi-list.json` - Update daftar materi

**Langkah:**

1. Buat file markdown di `public/materi/nama-materi.md`
2. Tulis materi dengan format markdown
3. Tambahkan entry di `public/materi-list.json`:

```json
{
  "id": 8,
  "slug": "nama-materi",
  "title": "Judul Materi",
  "description": "Deskripsi singkat materi",
  "file": "nama-materi.md",
  "author": "Nama Anda",
  "date": "2026-01-01"
}
```

### 4. Perbaikan Bug & Improvement

- Fix responsive design
- Improve performance
- Perbaikan typo/dokumentasi
- Update styling

---

## 🔄 Proses Kontribusi

### Step 1: Fork Repository

Klik tombol **Fork** di halaman [repository GitHub](https://github.com/kelasphp-kafekoding/website)

### Step 2: Clone Repository

```bash
git clone https://github.com/USERNAME-ANDA/website.git
cd website
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Buat Branch Baru

Format: `Nama_Lengkap_Sekolah`

```bash
git checkout -b Nama_Lengkap_Sekolah
```

Contoh:
```bash
git checkout -b Budi_Santoso_SMKN1
```

### Step 5: Buat Perubahan

Lakukan perubahan yang diinginkan, lalu test di local:

```bash
npm run dev
```

### Step 6: Commit Changes

```bash
git add .
git commit -m "feat: deskripsi perubahan"
```

**Format commit message:**

| Prefix | Kegunaan |
|--------|----------|
| `feat:` | Fitur baru |
| `fix:` | Perbaikan bug |
| `docs:` | Dokumentasi |
| `style:` | Styling/CSS |
| `chore:` | Update lainnya |

Contoh:
```bash
git commit -m "feat: add showcase proj-todo-app"
git commit -m "fix: responsive navbar mobile"
git commit -m "docs: update README"
```

### Step 7: Push ke Branch

```bash
git push origin Nama_Lengkap_Sekolah
```

### Step 8: Buat Pull Request

1. Buka repository Anda di GitHub
2. Klik tombol **Compare & pull request**
3. Isi judul dan deskripsi PR
4. Klik **Create Pull Request**

---

## ✅ Checklist Sebelum PR

- [ ] Branch name sesuai format: `Nama_Lengkap_Sekolah`
- [ ] Commit message jelas dan deskriptif
- [ ] Tidak ada conflict dengan branch main
- [ ] Sudah ditest di local (`npm run dev`)
- [ ] File JSON valid (tidak ada syntax error)
- [ ] Gambar sudah dioptimasi (jika ada)

---

## 📋 Standar Penulisan

### Format JSON

- Gunakan lowercase dengan hyphen untuk `slug` dan `id`
- Gunakan format tanggal `YYYY-MM-DD`
- Pastikan JSON valid sebelum commit

---

## ⏱️ Review Process

- Tim maintainer akan review PR dalam 3-7 hari
- Mungkin ada feedback atau request perubahan
- Setelah approved, PR akan di-merge ke main

---

## 🏆 Kontributor

Nama Anda akan masuk ke daftar kontributor setelah PR di-approve!

| Nama | Sekolah/Kampus | Kontribusi |
|------|----------------|------------|
| M. Rifaldo Saputra | Metamedia | Lead Developer |
| *Nama Anda* | *Sekolah* | *Kontribusi* |

---

## ❓ Pertanyaan?

Hubungi mentor:

- GitHub: [@rifaldo-dev](https://github.com/rifaldo-dev)
- Instagram: [@rifaldo.dev](https://www.instagram.com/rifaldo.dev)

---

Selamat berkontribusi! 🚀
