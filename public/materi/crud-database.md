# Pertemuan 10 — Membuat Tabel Database

![Database](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop)

## Mengenal Database Relasional

Database **relasional** menyimpan data dalam bentuk **tabel** yang saling terhubung melalui **relasi** (hubungan). Setiap tabel memiliki **kolom (field)** dan **baris (record)**.

### Analogi

Bayangkan database seperti **lemari arsip**:
- Setiap **laci** = satu tabel (tabel siswa, tabel nilai, dll)
- Setiap **folder** di laci = satu baris/record
- Setiap **kolom di folder** = field (nama, email, kelas, dll)

---

## 1. Tipe Data di MySQL

Sebelum membuat tabel, kita harus memahami tipe data yang tersedia:

### Tipe Data String/Teks

| Tipe Data | Ukuran Maksimum | Keterangan |
|-----------|----------------|------------|
| `CHAR(n)` | 255 karakter | Teks tetap (fixed), cocok untuk kode |
| `VARCHAR(n)` | 255 karakter | Teks variatif, cocok untuk nama, alamat |
| `TEXT` | 65,535 karakter | Teks panjang, cocok untuk artikel |
| `MEDIUMTEXT` | 16 MB | Teks sangat panjang |
| `LONGTEXT` | 4 GB | Teks super panjang |

### Tipe Data Angka

| Tipe Data | Rentang Nilai | Keterangan |
|-----------|--------------|------------|
| `TINYINT` | -128 s/d 127 | Angka kecil (usia, status) |
| `SMALLINT` | -32,768 s/d 32,767 | Angka sedang |
| `INT` | -2.1 miliar s/d 2.1 miliar | Angka umum (ID, jumlah) |
| `BIGINT` | -9.2 x 10^18 s/d 9.2 x 10^18 | Angka sangat besar |
| `FLOAT` | Bilangan desimal (7 digit) | Angka pecahan |
| `DOUBLE` | Bilangan desimal (15 digit) | Angka pecahan presisi tinggi |
| `DECIMAL(p,s)` | Presisi tetap | Cocok untuk harga/saldo |

### Tipe Data Tanggal/Waktu

| Tipe Data | Format | Keterangan |
|-----------|--------|------------|
| `DATE` | `YYYY-MM-DD` | Hanya tanggal |
| `TIME` | `HH:MM:SS` | Hanya waktu |
| `DATETIME` | `YYYY-MM-DD HH:MM:SS` | Tanggal + waktu |
| `TIMESTAMP` | `YYYY-MM-DD HH:MM:SS` | Tanggal + waktu (otomatis update) |

### Tipe Data Lainnya

| Tipe Data | Keterangan |
|-----------|------------|
| `BOOLEAN` | `TRUE` atau `FALSE` (0 atau 1) |
| `ENUM` | Pilihan tetap (contoh: 'Laki-laki', 'Perempuan') |
| `BLOB` | Data biner (file, gambar) |

---

## 2. Membuat Database dan Tabel

### Langkah 1: Buat Database

```sql
-- Buat database baru
CREATE DATABASE IF NOT EXISTS kelas_php;

-- Gunakan database
USE kelas_php;
```

### Langkah 2: Buat Tabel Siswa

```sql
CREATE TABLE siswa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    kelas VARCHAR(50) NOT NULL,
    nilai INT DEFAULT 0,
    status ENUM('Aktif', 'Tidak Aktif') DEFAULT 'Aktif',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Penjelasan Constraint

| Constraint | Fungsi |
|------------|--------|
| `PRIMARY KEY` | Identitas unik setiap baris (tidak boleh duplikat) |
| `AUTO_INCREMENT` | Nilai otomatis bertambah 1 setiap ada data baru |
| `NOT NULL` | Kolom wajib diisi (tidak boleh kosong) |
| `UNIQUE` | Nilai tidak boleh sama antar baris |
| `DEFAULT` | Nilai bawaan jika tidak diisi |
| `ON UPDATE CURRENT_TIMESTAMP` | Otomatis update saat baris diubah |

---

## 3. Membuat Relasi Antar Tabel

Database relasional memungkinkan **satu tabel terhubung ke tabel lain**.

### Contoh: Tabel Siswa dan Tabel Nilai

```sql
-- Tabel mata_pelajaran
CREATE TABLE mata_pelajaran (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama_mapel VARCHAR(100) NOT NULL,
    kode_mapel VARCHAR(10) UNIQUE NOT NULL
);

-- Tabel nilai (terhubung ke siswa dan mata_pelajaran)
CREATE TABLE nilai (
    id INT PRIMARY KEY AUTO_INCREMENT,
    siswa_id INT NOT NULL,
    mapel_id INT NOT NULL,
    nilai DECIMAL(5,2) NOT NULL,
    keterangan VARCHAR(255),
    tanggal DATE DEFAULT (CURRENT_DATE),
    
    -- Foreign Key: menghubungkan ke tabel lain
    FOREIGN KEY (siswa_id) REFERENCES siswa(id) ON DELETE CASCADE,
    FOREIGN KEY (mapel_id) REFERENCES mata_pelajaran(id) ON DELETE CASCADE
);
```

### Diagram Relasi

```
┌─────────────────┐     ┌──────────────────┐     ┌───────────────────┐
│   mata_pelajaran │     │      nilai        │     │      siswa        │
├─────────────────┤     ├──────────────────┤     ├───────────────────┤
│ id (PK)         │◄────│ mapel_id (FK)    │     │ id (PK)           │
│ nama_mapel      │     │ siswa_id (FK)    │────►│ nama              │
│ kode_mapel      │     │ nilai            │     │ email             │
└─────────────────┘     │ keterangan       │     │ kelas             │
                        │ tanggal          │     │ status            │
                        └──────────────────┘     └───────────────────┘
```

### Penjelasan Foreign Key

**Foreign Key (FK)** adalah kolom yang nilainya merujuk ke **Primary Key (PK)** di tabel lain.

| Properti | Keterangan |
|----------|------------|
| `FOREIGN KEY (siswa_id) REFERENCES siswa(id)` | Kolom `siswa_id` di tabel `nilai` merujuk ke kolom `id` di tabel `siswa` |
| `ON DELETE CASCADE` | Jika siswa dihapus, semua nilai terkait ikut terhapus |
| `ON DELETE RESTRICT` | Siswa tidak bisa dihapus jika masih punya nilai |
| `ON DELETE SET NULL` | Jika siswa dihapus, `siswa_id` jadi NULL |

---

## 4. Memodifikasi Tabel (ALTER)

Tabel yang sudah dibuat bisa diubah strukturnya:

```sql
-- Tambah kolom baru
ALTER TABLE siswa ADD COLUMN alamat TEXT;

-- Ubah tipe data kolom
ALTER TABLE siswa MODIFY COLUMN nilai DECIMAL(5,2);

-- Hapus kolom
ALTER TABLE siswa DROP COLUMN alamat;

-- Rename kolom
ALTER TABLE siswa CHANGE COLUMN nama nama_lengkap VARCHAR(150);

-- Hapus tabel
DROP TABLE nilai;

-- Hapus database
DROP DATABASE kelas_php;
```

---

## 5. Insert Data dari PHP

```php
<?php
require_once 'config.php';

// Data yang akan dimasukkan
$nama = "Rifaldo";
$email = "rifaldo@email.com";
$kelas = "PHP-A";
$nilai = 95;

// Query INSERT
$query = "INSERT INTO siswa (nama, email, kelas, nilai) 
          VALUES ('$nama', '$email', '$kelas', $nilai)";

if (mysqli_query($conn, $query)) {
    echo "Data berhasil ditambahkan! ID: " . mysqli_insert_id($conn);
} else {
    echo "Error: " . mysqli_error($conn);
}
?>
```

### Insert Multiple Rows

```php
<?php
require_once 'config.php';

$data = [
    ['Budi', 'budi@email.com', 'PHP-B', 80],
    ['Siti', 'siti@email.com', 'PHP-A', 88],
    ['Andi', 'andi@email.com', 'PHP-B', 75],
];

foreach ($data as $d) {
    $nama = mysqli_real_escape_string($conn, $d[0]);
    $email = mysqli_real_escape_string($conn, $d[1]);
    $kelas = mysqli_real_escape_string($conn, $d[2]);
    $nilai = (int)$d[3];
    
    $query = "INSERT INTO siswa (nama, email, kelas, nilai) 
              VALUES ('$nama', '$email', '$kelas', $nilai)";
    
    mysqli_query($conn, $query);
}

echo count($data) . " data berhasil ditambahkan!";
?>
```

---

## Kesimpulan

Pada pertemuan ini kamu telah mempelajari:

1. **Tipe data MySQL** — VARCHAR, INT, DECIMAL, DATE, ENUM, dll
2. **Membuat database dan tabel** dengan constraint (PK, NOT NULL, UNIQUE, DEFAULT)
3. **Relasi antar tabel** menggunakan Foreign Key
4. **Memodifikasi tabel** dengan ALTER TABLE
5. **Insert data** dari PHP ke database

**Tips:**
- Selalu gunakan `VARCHAR` bukan `CHAR` kecuali data fixed-length (kode)
- Gunakan `DECIMAL` untuk data keuangan (bukan `FLOAT`)
- Selalu set `AUTO_INCREMENT` pada Primary Key
- Gunakan Foreign Key untuk menjaga integritas data

Selanjutnya pada pertemuan 11 kita akan mempelajari cara **menampilkan data dari database dengan PHP**!
