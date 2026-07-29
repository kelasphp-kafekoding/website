# Pertemuan 9 - Pengenalan CRUD pada PHP

![CRUD Database](https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop)

## Apa itu CRUD?

**CRUD** adalah singkatan dari empat operasi dasar yang selalu ada dalam aplikasi yang menggunakan database:

| Singkatan | Kepanjangan | Arti | SQL Command |
|-----------|-------------|------|-------------|
| **C** | Create | Menambah data baru | `INSERT` |
| **R** | Read | Membaca/menampilkan data | `SELECT` |
| **U** | Update | Mengubah data yang sudah ada | `UPDATE` |
| **D** | Delete | Menghapus data | `DELETE` |

### Analogi

Bayangkan kamu punya **buku catatan daftar nama teman**:
- **Create** → Menambah nama baru ke buku catatan
- **Read** → Membaca/melihat isi buku catatan
- **Update** → Mengganti nama yang salah tulis
- **Delete** → Menghapus nama dari buku catatan

---

## 1. Koneksi PHP ke Database MySQL

Sebelum bisa melakukan CRUD, kita harus **menghubungkan PHP ke database MySQL**. PHP menyediakan fungsi `mysqli_connect()` untuk ini.

### Membuat Database dan Tabel

Buat database melalui phpMyAdmin atau MySQL CLI:

```sql
-- Buat database
CREATE DATABASE kelas_php;
USE kelas_php;

-- Buat tabel siswa
CREATE TABLE siswa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    kelas VARCHAR(50),
    nilai INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert data contoh
INSERT INTO siswa (nama, email, kelas, nilai) VALUES
('Arief', 'arief@email.com', 'PHP-A', 85),
('Sefira', 'sefira@email.com', 'PHP-B', 90),
('Kamila', 'kamila@email.com', 'PHP-A', 78),
('Asria', 'asria@email.com', 'PHP-B', 92),
('Avin', 'avin@email.com', 'PHP-A', 88);
```

### File Koneksi (config.php)

Buat file terpisah untuk koneksi database agar bisa di-include di mana saja:

```php
<?php
// config.php - Konfigurasi koneksi database
$host = "localhost";
$username = "root";
$password = "";
$database = "kelas_php";

// Membuat koneksi
$conn = mysqli_connect($host, $username, $password, $database);

// Cek koneksi
if (!$conn) {
    die("Koneksi gagal: " . mysqli_connect_error());
}

// echo "Koneksi berhasil!";
?>
```

---

## 2. Struktur Folder CRUD

Buatlah struktur folder seperti berikut:

```
project-crud/
├── config.php          (koneksi database)
├── index.php           (Read - menampilkan data)
├── tambah.php          (Create - form tambah data)
├── proses_tambah.php   (Create - proses simpan data)
├── edit.php            (Update - form edit data)
├── proses_edit.php     (Update - proses update data)
├── hapus.php           (Delete - proses hapus data)
└── assets/
    └── bootstrap/      (opsional, untuk styling)
```

---

## 3. Read - Menampilkan Data

```php
<?php
require_once 'config.php';

// Query untuk mengambil semua data siswa
$query = "SELECT * FROM siswa ORDER BY id DESC";
$result = mysqli_query($conn, $query);

// Cek apakah query berhasil
if (!$result) {
    die("Query gagal: " . mysqli_error($conn));
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Data Siswa</title>
    <style>
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background: #4f46e5; color: white; }
        .btn { padding: 5px 15px; text-decoration: none; color: white; border-radius: 4px; }
        .btn-tambah { background: #16a34a; }
        .btn-edit { background: #2563eb; }
        .btn-hapus { background: #dc2626; }
    </style>
</head>
<body>
    <h2>Data Siswa Kelas PHP</h2>
    
    <a href="tambah.php" class="btn btn-tambah">+ Tambah Data</a>
    <br><br>

    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Kelas</th>
                <th>Nilai</th>
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
                echo "<td>" . htmlspecialchars($row['email']) . "</td>";
                echo "<td>" . htmlspecialchars($row['kelas']) . "</td>";
                echo "<td>" . htmlspecialchars($row['nilai']) . "</td>";
                echo "<td>";
                echo "<a href='edit.php?id=" . $row['id'] . "' class='btn btn-edit'>Edit</a> ";
                echo "<a href='hapus.php?id=" . $row['id'] . "' class='btn btn-hapus' onclick='return confirm(\"Yakin hapus?\")'>Hapus</a>";
                echo "</td>";
                echo "</tr>";
                $no++;
            }
            ?>
        </tbody>
    </table>
</body>
</html>
```

### Penjelasan Fungsi MySQLi

| Fungsi | Kegunaan |
|--------|----------|
| `mysqli_connect()` | Membuat koneksi ke database |
| `mysqli_query()` | Menjalankan query SQL |
| `mysqli_fetch_assoc()` | Mengambil baris data sebagai array asosiatif |
| `mysqli_num_rows()` | Menghitung jumlah baris hasil query |
| `mysqli_error()` | Menampilkan pesan error jika query gagal |
| `mysqli_close()` | Menutup koneksi database |

---

## 4. Create - Form Tambah Data

### Form (tambah.php)

```php
<!DOCTYPE html>
<html>
<head>
    <title>Tambah Siswa</title>
</head>
<body>
    <h2>Tambah Data Siswa</h2>
    
    <form action="proses_tambah.php" method="POST">
        <label>Nama:</label><br>
        <input type="text" name="nama" required><br><br>
        
        <label>Email:</label><br>
        <input type="email" name="email" required><br><br>
        
        <label>Kelas:</label><br>
        <input type="text" name="kelas" required><br><br>
        
        <label>Nilai:</label><br>
        <input type="number" name="nilai" min="0" max="100" required><br><br>
        
        <button type="submit">Simpan</button>
        <a href="index.php">Kembali</a>
    </form>
</body>
</html>
```

### Proses Simpan (proses_tambah.php)

```php
<?php
require_once 'config.php';

// Ambil data dari form
$nama = mysqli_real_escape_string($conn, $_POST['nama']);
$email = mysqli_real_escape_string($conn, $_POST['email']);
$kelas = mysqli_real_escape_string($conn, $_POST['kelas']);
$nilai = (int)$_POST['nilai'];

// Query INSERT
$query = "INSERT INTO siswa (nama, email, kelas, nilai) VALUES ('$nama', '$email', '$kelas', $nilai)";

// Eksekusi query
if (mysqli_query($conn, $query)) {
    echo "Data berhasil ditambahkan!";
} else {
    echo "Gagal: " . mysqli_error($conn);
}

// Kembali ke halaman utama
echo "<br><a href='index.php'>Kembali</a>";
?>
```

---

## Kesimpulan

Pada pertemuan ini kamu telah mempelajari:

1. **Pengertian CRUD** - Create, Read, Update, Delete
2. **Membuat database dan tabel** di MySQL
3. **Koneksi PHP ke MySQL** menggunakan `mysqli_connect()`
4. **Read (SELECT)** - Menampilkan data dari database ke tabel HTML
5. **Create (INSERT)** - Menambah data baru melalui form

**Penting:**
- Selalu buat file `config.php` terpisah untuk koneksi
- Gunakan `mysqli_real_escape_string()` untuk mencegah SQL Injection
- Gunakan `htmlspecialchars()` untuk output
- Selalu cek apakah query berhasil dengan `mysqli_error()`

Selanjutnya pada pertemuan 10 kita akan mempelajari cara **membuat tabel database** secara lebih detail dan **memfilter data**!
