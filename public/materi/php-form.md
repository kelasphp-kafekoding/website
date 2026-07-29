# Pertemuan 8 — PHP Form

![PHP Form](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop)

## Apa itu Form?

**Form** adalah elemen HTML yang digunakan untuk **mengumpulkan data dari pengguna** dan mengirimkannya ke server untuk diproses. Di PHP, data dari form bisa ditangkap menggunakan variabel superglobal `$_GET` dan `$_POST`.

### Analogi

Bayangkan form seperti **formulir pendaftaran** di sekolah:
- Ada kolom nama, alamat, kelas yang harus diisi
- Setelah diisi, formulir dikumpulkan ke bagian administrasi
- Administrasi (PHP) memproses data tersebut

---

## 1. Membuat Form HTML Dasar

Form HTML terdiri dari beberapa elemen:

| Elemen | Fungsi | Contoh |
|--------|--------|--------|
| `<form>` | Wadah form | `<form action="" method="POST">` |
| `<input>` | Input teks, email, password | `<input type="text" name="nama">` |
| `<textarea>` | Input teks panjang | `<textarea name="pesan">` |
| `<select>` | Dropdown pilihan | `<select name="kota">` |
| `<checkbox>` | Pilihan ganda | `<input type="checkbox" name="hobi[]">` |
| `<radio>` | Pilihan tunggal | `<input type="radio" name="gender">` |
| `<button>` | Tombol submit | `<button type="submit">Kirim</button>` |

### Contoh Form Sederhana

```html
<!DOCTYPE html>
<html>
<head>
    <title>Form Pendaftaran</title>
</head>
<body>
    <h2>Form Pendaftaran Siswa</h2>
    <form action="proses.php" method="POST">
        <label>Nama Lengkap:</label><br>
        <input type="text" name="nama" required><br><br>

        <label>Email:</label><br>
        <input type="email" name="email" required><br><br>

        <label>Jenis Kelamin:</label><br>
        <input type="radio" name="gender" value="Laki-laki"> Laki-laki
        <input type="radio" name="gender" value="Perempuan"> Perempuan<br><br>

        <label>Kota:</label><br>
        <select name="kota">
            <option value="padang">Padang</option>
            <option value="jakarta">Jakarta</option>
            <option value="bandung">Bandung</option>
        </select><br><br>

        <label>Hobi:</label><br>
        <input type="checkbox" name="hobi[]" value="coding"> Coding
        <input type="checkbox" name="hobi[]" value="membaca"> Membaca
        <input type="checkbox" name="hobi[]" value="olahraga"> Olahraga<br><br>

        <label>Pesan:</label><br>
        <textarea name="pesan" rows="4" cols="30"></textarea><br><br>

        <button type="submit">Daftar</button>
    </form>
</body>
</html>
```

---

## 2. Memproses Form dengan PHP

Data dari form bisa diproses menggunakan `$_POST` (metode POST) atau `$_GET` (metode GET).

### Perbedaan GET dan POST

| Fitur | GET | POST |
|-------|-----|------|
| Data terlihat di URL | Ya | Tidak |
| Cocok untuk | Pencarian, filter | Login, pendaftaran, update |
| Batas panjang data | Terbatas (~2048 karakter) | Tidak terbatas |
| Bookmark | Bisa di-bookmark | Tidak bisa |
| Keamanan | Kurang aman | Lebih aman |

### Contoh Proses Form (proses.php)

```php
<?php
// Ambil data dari form menggunakan $_POST
$nama = $_POST['nama'] ?? '';
$email = $_POST['email'] ?? '';
$gender = $_POST['gender'] ?? '';
$kota = $_POST['kota'] ?? '';
$hobi = $_POST['hobi'] ?? [];
$pesan = $_POST['pesan'] ?? '';

// Validasi sederhana
if (empty($nama) || empty($email)) {
    echo "Nama dan Email harus diisi!";
    exit;
}

// Tampilkan data
echo "<h2>Data Pendaftaran</h2>";
echo "Nama: " . htmlspecialchars($nama) . "<br>";
echo "Email: " . htmlspecialchars($email) . "<br>";
echo "Gender: " . htmlspecialchars($gender) . "<br>";
echo "Kota: " . htmlspecialchars($kota) . "<br>";
echo "Hobi: " . implode(", ", $hobi) . "<br>";
echo "Pesan: " . htmlspecialchars($pesan) . "<br>";
?>
```

---

## 3. Validasi Form

Validasi penting untuk memastikan data yang masuk **aman dan sesuai format**.

### Validasi Sisi Server (PHP)

```php
<?php
$errors = [];

// Validasi nama
if (empty($_POST['nama'])) {
    $errors[] = "Nama harus diisi";
} elseif (strlen($_POST['nama']) < 3) {
    $errors[] = "Nama minimal 3 karakter";
}

// Validasi email
if (empty($_POST['email'])) {
    $errors[] = "Email harus diisi";
} elseif (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Format email tidak valid";
}

// Validasi usia
if (isset($_POST['usia'])) {
    $usia = (int)$_POST['usia'];
    if ($usia < 17 || $usia > 60) {
        $errors[] = "Usia harus antara 17-60 tahun";
    }
}

// Tampilkan error
if (!empty($errors)) {
    echo "<ul>";
    foreach ($errors as $error) {
        echo "<li>$error</li>";
    }
    echo "</ul>";
} else {
    echo "Data valid! Registrasi berhasil.";
}
?>
```

### Fungsi `htmlspecialchars()` — Mencegah XSS

**Penting!** Selalu gunakan `htmlspecialchars()` saat menampilkan data dari form untuk mencegah serangan **XSS (Cross-Site Scripting)**.

```php
<?php
$nama = $_POST['nama']; // input user bisa berisi <script>alert('hack')</script>

// TANPA htmlspecialchars (BAHAYA!)
echo $nama; // Menjalankan script berbahaya

// DENGAN htmlspecialchars (AMAN!)
echo htmlspecialchars($nama); // Menampilkan teks biasa
?>
```

---

## 4. Contoh Lengkap: Form + Proses dalam Satu File

```php
<?php
// Cek apakah form sudah disubmit
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nama = htmlspecialchars($_POST['nama'] ?? '');
    $email = htmlspecialchars($_POST['email'] ?? '');
    
    if (!empty($nama) && !empty($email)) {
        echo "<h3>Terima kasih, $nama!</h3>";
        echo "<p>Email Anda: $email</p>";
    } else {
        echo "<p class='error'>Nama dan Email harus diisi!</p>";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Form Pendaftaran</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 500px; margin: 50px auto; }
        input, select, textarea { width: 100%; padding: 10px; margin: 5px 0 15px; }
        button { background: #4f46e5; color: white; padding: 12px 24px; border: none; cursor: pointer; }
        button:hover { background: #4338ca; }
        .error { color: red; }
    </style>
</head>
<body>
    <h2>Form Pendaftaran Kelas PHP</h2>
    
    <form method="POST">
        <label>Nama Lengkap:</label>
        <input type="text" name="nama" placeholder="Masukkan nama Anda" required>
        
        <label>Email:</label>
        <input type="email" name="email" placeholder="Masukkan email Anda" required>
        
        <label>Pesan:</label>
        <textarea name="pesan" rows="4" placeholder="Tulis pesan Anda..."></textarea>
        
        <button type="submit">Daftar</button>
    </form>
</body>
</html>
```

---

## 5. Upload File dengan Form

Untuk upload file, form harus menggunakan `enctype="multipart/form-data"`.

```html
<!-- Form upload -->
<form action="upload.php" method="POST" enctype="multipart/form-data">
    <label>Pilih File:</label>
    <input type="file" name="file" required>
    <button type="submit">Upload</button>
</form>
```

```php
<!-- upload.php -->
<?php
if ($_FILES['file']['error'] === UPLOAD_ERR_OK) {
    $fileTemp = $_FILES['file']['tmp_name'];
    $fileName = $_FILES['file']['name'];
    $fileSize = $_FILES['file']['size'];
    $fileType = $_FILES['file']['type'];
    
    // Pindahkan file ke folder tujuan
    $tujuan = "uploads/" . $fileName;
    
    if (move_uploaded_file($fileTemp, $tujuan)) {
        echo "File berhasil diupload: $fileName<br>";
        echo "Ukuran: " . ($fileSize / 1024) . " KB<br>";
        echo "Tipe: $fileType";
    } else {
        echo "Gagal upload file!";
    }
} else {
    echo "Error: " . $_FILES['file']['error'];
}
?>
```

---

## Kesimpulan

Pada pertemuan ini kamu telah mempelajari:

1. **Membuat form HTML** — input, select, checkbox, radio, textarea
2. **Memproses form dengan PHP** — `$_POST` dan `$_GET`
3. **Perbedaan GET dan POST** — kapan menggunakan masing-masing
4. **Validasi form** — memastikan data aman dan sesuai format
5. **Mencegah XSS** — menggunakan `htmlspecialchars()`
6. **Upload file** — menggunakan `enctype="multipart/form-data"`

**Tips Keamanan:**
- Selalu validasi input dari user
- Gunakan `htmlspecialchars()` untuk output
- Gunakan `filter_var()` untuk validasi email
- Jangan percaya input dari user sepenuhnya

Selanjutnya pada pertemuan 9-12 kita akan mempelajari **CRUD (Create, Read, Update, Delete)** dengan database MySQL!
