# Pertemuan 12 - Mengubah dan Menghapus Data dari Database

![Update Delete](https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop)

## Update dan Delete

Dua operasi CRUD terakhir yang akan kita pelajari: **Update** (mengubah data) dan **Delete** (menghapus data). Keduanya sama pentingnya dengan Create dan Read.

---

## 1. UPDATE - Mengubah Data

Query `UPDATE` digunakan untuk **mengubah data yang sudah ada** di database.

### Sintaks

```sql
UPDATE nama_tabel 
SET kolom1 = nilai_baru, kolom2 = nilai_baru 
WHERE kondisi;
```

> **PENTING:** Selalu gunakan `WHERE` pada UPDATE! Tanpa WHERE, SEMUA baris akan diubah.

### Contoh Query SQL

```sql
-- Ubah nilai Arief menjadi 90
UPDATE siswa SET nilai = 90 WHERE nama = 'Arief';

-- Ubah kelas Sefira menjadi PHP-A
UPDATE siswa SET kelas = 'PHP-A' WHERE email = 'sefira@email.com';

-- Ubah status semua siswa nilai < 70 menjadi Tidak Aktif
UPDATE siswa SET status = 'Tidak Aktif' WHERE nilai < 70;
```

---

## 2. Implementasi Update di PHP

### Halaman Edit (edit.php)

Form edit menampilkan data yang ada agar user bisa mengubahnya.

```php
<?php
require_once 'config.php';

// Ambil ID dari URL
$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($id <= 0) {
    die("ID tidak valid!");
}

// Ambil data siswa berdasarkan ID
$query = "SELECT * FROM siswa WHERE id = $id";
$result = mysqli_query($conn, $query);
$siswa = mysqli_fetch_assoc($result);

if (!$siswa) {
    die("Data tidak ditemukan!");
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Edit Siswa</title>
    <style>
        body { font-family: Arial; max-width: 500px; margin: 50px auto; }
        input, select { width: 100%; padding: 10px; margin: 5px 0 15px; box-sizing: border-box; }
        button { background: #2563eb; color: white; padding: 12px 24px; border: none; cursor: pointer; }
        a { color: #4f46e5; }
    </style>
</head>
<body>
    <h2>Edit Data Siswa</h2>
    
    <form action="proses_edit.php" method="POST">
        <!-- ID hidden - tidak diubah user -->
        <input type="hidden" name="id" value="<?php echo $siswa['id']; ?>">
        
        <label>Nama:</label>
        <input type="text" name="nama" value="<?php echo htmlspecialchars($siswa['nama']); ?>" required>
        
        <label>Email:</label>
        <input type="email" name="email" value="<?php echo htmlspecialchars($siswa['email']); ?>" required>
        
        <label>Kelas:</label>
        <input type="text" name="kelas" value="<?php echo htmlspecialchars($siswa['kelas']); ?>" required>
        
        <label>Nilai:</label>
        <input type="number" name="nilai" value="<?php echo $siswa['nilai']; ?>" min="0" max="100" required>
        
        <label>Status:</label>
        <select name="status">
            <option value="Aktif" <?php echo $siswa['status'] == 'Aktif' ? 'selected' : ''; ?>>Aktif</option>
            <option value="Tidak Aktif" <?php echo $siswa['status'] == 'Tidak Aktif' ? 'selected' : ''; ?>>Tidak Aktif</option>
        </select>
        
        <button type="submit">Update</button>
        <a href="index.php">Batal</a>
    </form>
</body>
</html>
```

### Proses Update (proses_edit.php)

```php
<?php
require_once 'config.php';

// Ambil data dari form
$id = (int)$_POST['id'];
$nama = mysqli_real_escape_string($conn, $_POST['nama']);
$email = mysqli_real_escape_string($conn, $_POST['email']);
$kelas = mysqli_real_escape_string($conn, $_POST['kelas']);
$nilai = (int)$_POST['nilai'];
$status = mysqli_real_escape_string($conn, $_POST['status']);

// Validasi
if ($id <= 0 || empty($nama) || empty($email)) {
    die("Data tidak valid!");
}

// Query UPDATE
$query = "UPDATE siswa SET 
            nama = '$nama', 
            email = '$email', 
            kelas = '$kelas', 
            nilai = $nilai, 
            status = '$status' 
          WHERE id = $id";

if (mysqli_query($conn, $query)) {
    echo "Data berhasil diupdate!";
} else {
    echo "Error: " . mysqli_error($conn);
}

echo "<br><a href='index.php'>Kembali</a>";
?>
```

---

## 3. DELETE - Menghapus Data

Query `DELETE` digunakan untuk **menghapus baris dari database**.

### Sintaks

```sql
DELETE FROM nama_tabel WHERE kondisi;
```

> **PENTING:** Selalu gunakan `WHERE` pada DELETE! Tanpa WHERE, SEMUA data akan terhapus.

### Contoh Query SQL

```sql
-- Hapus siswa dengan ID 5
DELETE FROM siswa WHERE id = 5;

-- Hapus semua siswa dari kelas PHP-B
DELETE FROM siswa WHERE kelas = 'PHP-B';

-- Hapus semua siswa yang nilainya 0
DELETE FROM siswa WHERE nilai = 0;
```

### Implementasi Delete di PHP

### Halaman Hapus (hapus.php)

```php
<?php
require_once 'config.php';

// Ambil ID dari URL
$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($id <= 0) {
    die("ID tidak valid!");
}

// Cek apakah data ada
$query_check = "SELECT nama FROM siswa WHERE id = $id";
$result = mysqli_query($conn, $query_check);
$siswa = mysqli_fetch_assoc($result);

if (!$siswa) {
    die("Data tidak ditemukan!");
}

// Lakukan delete
$query = "DELETE FROM siswa WHERE id = $id";

if (mysqli_query($conn, $query)) {
    echo "Data '<strong>" . htmlspecialchars($siswa['nama']) . "</strong>' berhasil dihapus!";
} else {
    echo "Gagal menghapus: " . mysqli_error($conn);
}

echo "<br><br><a href='index.php'>Kembali</a>";
?>
```

### Hapus dengan Konfirmasi

Untuk keamanan, selalu tampilkan konfirmasi sebelum menghapus:

```html
<!-- Di index.php, tombol hapus -->
<a href="hapus.php?id=<?php echo $row['id']; ?>" 
   class="btn btn-hapus" 
   onclick="return confirm('Yakin ingin menghapus <?php echo htmlspecialchars($row['nama']); ?>?')">
    Hapus
</a>
```

---

## 4. CRUD Lengkap dalam Satu Aplikasi

Berikut struktur lengkap aplikasi CRUD sederhana:

### Struktur File

```
crud-siswa/
├── config.php           ← Koneksi database
├── index.php            ← Read (tampilkan semua data)
├── tambah.php           ← Form tambah data baru
├── proses_tambah.php    ← Proses INSERT
├── edit.php             ← Form edit data
├── proses_edit.php      ← Proses UPDATE
├── hapus.php            ← Proses DELETE
└── cari.php             ← Pencarian data
```

### Tombol Aksi di index.php

```php
<?php
// Di dalam tabel, kolom "Aksi"
echo "<td>";
echo "<a href='edit.php?id=" . $row['id'] . "' class='btn-edit'>Edit</a> ";
echo "<a href='hapus.php?id=" . $row['id'] . "' class='btn-hapus' ";
echo "onclick=\"return confirm('Yakin hapus " . htmlspecialchars($row['nama']) . "?')\">Hapus</a>";
echo "</td>";
?>
```

---

## 5. Keamanan: Prevent SQL Injection

### Masalah

Jika input user langsung dimasukkan ke query, attacker bisa menyuntikkan kode SQL berbahaya:

```php
// BAHAYA! - SQL Injection
$nama = $_POST['nama']; // user input: ' OR 1=1 --
$query = "SELECT * FROM siswa WHERE nama = '$nama'";
// Hasil: SELECT * FROM siswa WHERE nama = '' OR 1=1 --'
// Ini mengembalikan SEMUA data!
```

### Solusi 1: mysqli_real_escape_string()

```php
$nama = mysqli_real_escape_string($conn, $_POST['nama']);
$query = "SELECT * FROM siswa WHERE nama = '$nama'";
// Aman! Karakter berbahaya di-escape
```

### Solusi 2: Prepared Statements (LEBIH AMAN)

```php
<?php
require_once 'config.php';

// Prepared Statement untuk INSERT
$stmt = mysqli_prepare($conn, "INSERT INTO siswa (nama, email, kelas, nilai) VALUES (?, ?, ?, ?)");

// Bind parameter (s = string, i = integer, d = double)
mysqli_stmt_bind_param($stmt, "sssi", $nama, $email, $kelas, $nilai);

// Execute
$nama = "Test User";
$email = "test@email.com";
$kelas = "PHP-A";
$nilai = 80;

mysqli_stmt_execute($stmt);
echo "Data berhasil ditambahkan!";

mysqli_stmt_close($stmt);
?>
```

### Prepared Statement untuk UPDATE

```php
<?php
$stmt = mysqli_prepare($conn, "UPDATE siswa SET nama=?, email=?, kelas=?, nilai=? WHERE id=?");
mysqli_stmt_bind_param($stmt, "sssii", $nama, $email, $kelas, $nilai, $id);

$nama = "Nama Baru";
$email = "email@baru.com";
$kelas = "PHP-B";
$nilai = 85;
$id = 1;

mysqli_stmt_execute($stmt);
echo "Update berhasil!";
?>
```

---

## 6. Latihan: CRUD Sederhana

Buatlah aplikasi CRUD untuk **Data Buku** dengan tabel berikut:

```sql
CREATE TABLE buku (
    id INT PRIMARY KEY AUTO_INCREMENT,
    judul VARCHAR(200) NOT NULL,
    penulis VARCHAR(100) NOT NULL,
    penerbit VARCHAR(100),
    tahun INT,
    harga DECIMAL(10,2),
    stok INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tantangan:
1. Tampilkan semua buku dalam tabel
2. Tambah buku baru melalui form
3. Edit buku yang sudah ada
4. Hapus buku dengan konfirmasi
5. Cari buku berdasarkan judul
6. Filter buku berdasarkan tahun

---

## Kesimpulan

Pada pertemuan ini kamu telah mempelajari:

| Operasi | Query | Implementasi |
|---------|-------|--------------|
| **Update** | `UPDATE ... SET ... WHERE` | Form edit → proses_edit.php |
| **Delete** | `DELETE FROM ... WHERE` | hapus.php dengan konfirmasi |
| **Keamanan** | Prepared Statements | `mysqli_prepare()` + `bind_param()` |

**Aturan Emas:**
- **SELALU** gunakan `WHERE` pada UPDATE dan DELETE
- **SELALU** gunakan `htmlspecialchars()` untuk output
- **SELALU** gunakan `mysqli_real_escape_string()` atau prepared statements untuk input
- **SELALU** tampilkan konfirmasi sebelum delete

Selanjutnya pada pertemuan 13-14 kita akan membuat **Mini Project** dengan menggabungkan semua konsep yang sudah dipelajari!
