# Pertemuan 15-16 — Project Akhir

![Project Akhir](https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop)

## Membuat Project CRUD Sendiri

Pada pertemuan terakhir ini, kamu diminta untuk **membuat project CRUD sendiri** menggunakan semua materi yang sudah dipelajari selama 14 pertemuan sebelumnya.

---

## Apa yang Harus Dibuat?

Buatlah sebuah aplikasi web sederhana dengan fitur **CRUD (Create, Read, Update, Delete)** menggunakan **PHP, MySQL, HTML, dan Bootstrap**.

### Syarat Minimum:

1. **Koneksi database** dengan file `config.php`
2. **Halaman Read** — menampilkan data dalam tabel
3. **Halaman Create** — form untuk menambah data baru
4. **Halaman Update** — form untuk mengubah data
5. **Halaman Delete** — menghapus data dengan konfirmasi
6. **Pencarian/Filter** — mencari data berdasarkan kata kunci
7. **Desain responsif** menggunakan Bootstrap
8. **Keamanan dasar** — `htmlspecialchars()` dan `mysqli_real_escape_string()`

---

## Ide Project

Berikut beberapa ide project yang bisa kamu pilih:

### Level Mudah

| Project | Deskripsi |
|---------|-----------|
| **Data Mahasiswa** | CRUD data mahasiswa (NIM, nama, jurusan, IPK) |
| **Buku Perpustakaan** | CRUD buku (ISBN, judul, penulis, stok) |
| **Data Karyawan** | CRUD karyawan (NIK, nama, jabatan, gaji) |
| **Daftar Barang Toko** | CRUD barang (kode, nama, harga, stok) |
| **Data Siswa** | CRUD siswa (NIS, nama, kelas, alamat) |

### Level Menengah

| Project | Deskripsi |
|---------|-----------|
| **Sistem Peminjaman Buku** | CRUD peminjaman dengan relasi mahasiswa-buku |
| **Aplikasi Absensi** | CRUD absensi dengan rekap per bulan |
| **Katalog Produk** | CRUD produk dengan kategori dan gambar |
| **Data Nilai Siswa** | CRUD nilai per mata pelajaran dengan rata-rata |
| **Sistem Tiket** | CRUD tiket komplain dengan status (pending/proses/selesai) |

### Level Lanjutan

| Project | Deskripsi |
|---------|-----------|
| **Sistem Pemesanan** | CRUD pesanan dengan detail item |
| **Aplikasi Inventaris** | CRUD barang dengan stok masuk/keluar |
| **Blog Sederhana** | CRUD artikel dengan kategori dan komentar |
| **Aplikasi Keuangan** | CRUD transaksi pemasukan/pengeluaran |
| **Sistem Pendaftaran** | CRUD pendaftaran dengan upload foto |

---

## Template Proyek

Berikut template dasar yang bisa kamu gunakan untuk memulai:

### 1. Database (SQL)

```sql
CREATE DATABASE project_saya;
USE project_saya;

-- Sesuaikan nama tabel dan kolom sesuai project kamu
CREATE TABLE data_saya (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(100) NOT NULL,
    -- tambah kolom sesuai kebutuhan
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Struktur File

```
project-saya/
├── config.php
├── index.php
├── tambah.php
├── proses_tambah.php
├── edit.php
├── proses_edit.php
├── hapus.php
├── header.php
├── footer.php
└── README.md
```

### 3. config.php

```php
<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "project_saya"; // ganti sesuai database kamu

$conn = mysqli_connect($host, $username, $password, $database);

if (!$conn) {
    die("Koneksi gagal: " . mysqli_connect_error());
}
?>
```

### 4. index.php (Halaman Utama)

```php
<?php
require_once 'config.php';
$pageTitle = "Daftar Data";
include 'header.php';

$search = isset($_GET['q']) ? mysqli_real_escape_string($conn, $_GET['q']) : '';
$query = "SELECT * FROM data_saya";

if (!empty($search)) {
    $query .= " WHERE nama LIKE '%$search%'";
}
$query .= " ORDER BY id DESC";

$result = mysqli_query($conn, $query);
?>

<div class="d-flex justify-content-between align-items-center mb-4">
    <h2><?php echo $pageTitle; ?></h2>
    <a href="tambah.php" class="btn btn-primary">+ Tambah</a>
</div>

<!-- Form Pencarian -->
<form method="GET" class="mb-3">
    <div class="input-group">
        <input type="text" name="q" class="form-control" placeholder="Cari..." 
               value="<?php echo htmlspecialchars($search); ?>">
        <button class="btn btn-outline-secondary" type="submit">Cari</button>
    </div>
</form>

<!-- Tabel Data -->
<div class="card">
    <div class="table-responsive">
        <table class="table table-striped mb-0">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <!-- tambah kolom lain sesuai project -->
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $no = 1;
                while ($row = mysqli_fetch_assoc($result)) {
                    echo "<tr>";
                    echo "<td>$no</td>";
                    echo "<td>" . htmlspecialchars($row['nama']) . "</td>";
                    // tambah kolom lain
                    echo "<td>";
                    echo "<a href='edit.php?id=" . $row['id'] . "' class='btn btn-sm btn-warning'>Edit</a> ";
                    echo "<a href='hapus.php?id=" . $row['id'] . "' class='btn btn-sm btn-danger' ";
                    echo "onclick='return confirm(\"Yakin hapus?\")'>Hapus</a>";
                    echo "</td>";
                    echo "</tr>";
                    $no++;
                }
                ?>
            </tbody>
        </table>
    </div>
</div>

<?php include 'footer.php'; ?>
```

---

## Checklist Evaluasi

Gunakan checklist ini untuk memastikan project kamu lengkap:

### Struktur & Kode

- [ ] File `config.php` untuk koneksi database
- [ ] Database dan tabel sudah dibuat
- [ ] File `header.php` dan `footer.php` untuk template
- [ ] Kode rapi dan terstruktur
- [ ] Ada komentar di kode untuk penjelasan

### Fitur CRUD

- [ ] **Create** — Form tambah data berfungsi
- [ ] **Read** — Data ditampilkan dalam tabel
- [ ] **Update** — Form edit data berfungsi
- [ ] **Delete** — Hapus data dengan konfirmasi
- [ ] **Search** — Pencarian data berfungsi

### Desain & UX

- [ ] Menggunakan Bootstrap
- [ ] Desain responsif (mobile-friendly)
- [ ] Ada tombol/navigasi yang jelas
- [ ] Ada pesan sukses/error

### Keamanan

- [ ] Menggunakan `htmlspecialchars()` untuk output
- [ ] Menggunakan `mysqli_real_escape_string()` untuk input
- [ ] Validasi input form

### Dokumentasi

- [ ] File `README.md` dengan penjelasan project
- [ ] Screenshot hasil project
- [ ] Penjelasan fitur-fitur yang dibuat

---

## Contoh README.md

```markdown
# [Nama Project Kamu]

Aplikasi [deskripsi singkat] dibuat sebagai project akhir Kelas PHP Kafekoding.

## Fitur
- Tambah data baru
- Lihat daftar data
- Edit data yang sudah ada
- Hapus data
- Pencarian data

## Teknologi
- PHP
- MySQL
- Bootstrap 5
- Font Awesome

## Cara Menjalankan
1. Import file SQL ke phpMyAdmin
2. Sesuaikan config.php
3. Buka di browser: http://localhost/nama-folder

## Screenshot
![Screenshot](screenshot.png)
```

---

## Tips Sukses

1. **Mulai dari yang sederhana** — jangan langsung buat fitur kompleks
2. **Test setiap fitur** — pastikan tambah, edit, hapus, dan cari berfungsi
3. **Buat backup** — simpan database sebelum menguji fitur delete
4. **Gunakan template** — header.php dan footer.php menghemat waktu
5. **Minta feedback** — tampilkan ke teman atau mentor untuk review
6. **Upload ke GitHub** — dokumentasikan project kamu di repositori

---

## Kesimpulan

Selamat! Kamu telah menyelesaikan **16 pertemuan** Kelas PHP Dasar. Berikut ringkasan perjalanan belajarmu:

| Pertemuan | Topik | Skill yang Didapat |
|-----------|-------|-------------------|
| 1 | Pengenalan PHP | Memahami apa itu PHP dan kegunaannya |
| 2 | Setup Environment | Instalasi VS Code, XAMPP, dan konfigurasi |
| 3 | Sintaks Dasar | Variabel, tipe data, komentar, output |
| 4 | Operator | Aritmatika, perbandingan, logika |
| 5 | Control Flow | If-else, switch |
| 6 | Perulangan | For, while, do-while, foreach |
| 7 | Function & Array | Membuat function dan manipulasi array |
| 8 | PHP Form | Form HTML, $_POST, $_GET, validasi |
| 9 | CRUD Pengenalan | Koneksi database, SELECT, INSERT |
| 10 | Database | Tipe data, constraint, foreign key |
| 11 | Read Data | WHERE, ORDER BY, LIMIT, JOIN |
| 12 | Update & Delete | UPDATE, DELETE, prepared statements |
| 13-14 | Mini Project | Menggabungkan semua konsep |
| 15-16 | Project Akhir | CRUD project mandiri |

### Langkah Selanjutnya:
- Pelajari **OOP PHP** (Object-Oriented Programming)
- Pelajari **MVC Pattern**
- Pelajari **Laravel Framework**
- Pelajari **REST API**
- Pelajari **Authentication & Authorization**

**Selamat dan sukses untuk perjalanan codingmu! 🎉**
