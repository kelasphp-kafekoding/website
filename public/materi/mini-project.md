# Pertemuan 13-14 — Mini Project

![Mini Project](https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop)

## Membuat Website Sederhana dengan PHP, HTML, dan Bootstrap

Pada pertemuan ini, kita akan **menggabungkan semua konsep** yang sudah dipelajari (PHP, HTML, CSS, Bootstrap, dan MySQL) untuk membuat sebuah website sederhana yang fungsional.

### Konsep yang Sudah Dipelajari

| Pertemuan | Konsep |
|-----------|--------|
| 1 | Pengenalan PHP |
| 2 | Install editor & database |
| 3 | Sintaks dasar, tipe data, variabel |
| 4 | Operator |
| 5 | Control Flow (pengkondisian) |
| 6 | Control Flow (perulangan) |
| 7 | Function dan Array |
| 8 | PHP Form |
| 9 | CRUD: Pengenalan & koneksi database |
| 10 | CRUD: Membuat tabel database |
| 11 | CRUD: Menampilkan data (SELECT) |
| 12 | CRUD: Update dan Delete |

Sekarang saatnya menggabungkan semuanya menjadi **satu proyek nyata**!

---

## Proyek: Sistem Inventaris Sederhana

Kita akan membuat sistem inventaris sederhana untuk mengelola data barang.

### Fitur:
1. Halaman utama menampilkan daftar barang
2. Tambah barang baru
3. Edit barang
4. Hapus barang
5. Pencarian barang
6. Desain responsif dengan Bootstrap

---

## 1. Persiapan Database

```sql
-- Buat database
CREATE DATABASE inventaris_db;
USE inventaris_db;

-- Buat tabel barang
CREATE TABLE barang (
    id INT PRIMARY KEY AUTO_INCREMENT,
    kode VARCHAR(20) UNIQUE NOT NULL,
    nama VARCHAR(100) NOT NULL,
    kategori VARCHAR(50),
    jumlah INT DEFAULT 0,
    harga DECIMAL(12,2) DEFAULT 0,
    deskripsi TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Data contoh
INSERT INTO barang (kode, nama, kategori, jumlah, harga, deskripsi) VALUES
('BRG001', 'Laptop ASUS', 'Elektronik', 5, 7500000, 'Laptop ASUS ROG 15 inch'),
('BRG002', 'Mouse Logitech', 'Elektronik', 20, 250000, 'Mouse wireless Bluetooth'),
('BRG003', 'Keyboard Mechanical', 'Elektronik', 15, 500000, 'Keyboard RGB mechanical'),
('BRG004', 'Monitor LG 24"', 'Elektronik', 8, 2000000, 'Monitor IPS 24 inch'),
('BRG005', 'Headset Gaming', 'Elektronik', 12, 350000, 'Headset 7.1 surround sound'),
('BRG006', 'Meja Kerja', 'Furniture', 3, 1500000, 'Meja kerja kayu minimalis'),
('BRG007', 'Kursi Ergonomis', 'Furniture', 5, 2500000, 'Kursi kantor ergonomis');
```

---

## 2. Struktur Folder Proyek

```
inventaris/
├── config.php              ← Koneksi database
├── index.php               ← Halaman utama (daftar barang)
├── tambah.php              ← Form tambah barang
├── proses_tambah.php       ← Simpan barang baru
├── edit.php                ← Form edit barang
├── proses_edit.php         ← Update barang
├── hapus.php               ← Hapus barang
├── detail.php              ← Detail barang
├── footer.php              ← Footer template
├── assets/
│   └── bootstrap/          ← File Bootstrap (opsional)
└── README.md
```

---

## 3. File Koneksi (config.php)

```php
<?php
// config.php
$host = "localhost";
$username = "root";
$password = "";
$database = "inventaris_db";

$conn = mysqli_connect($host, $username, $password, $database);

if (!$conn) {
    die("Koneksi database gagal: " . mysqli_connect_error());
}

// Set encoding
mysqli_set_charset($conn, "utf8");
?>
```

---

## 4. Template Header (header.php)

Buat template header agar tidak perlu copy-paste di setiap halaman.

```php
<?php // header.php ?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($pageTitle) ? $pageTitle . " - " : ""; ?>Sistem Inventaris</title>
    <!-- Bootstrap CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        body { background: #f5f5f5; }
        .navbar { background: #4f46e5 !important; }
        .card { border: none; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .btn-primary { background: #4f46e5; border-color: #4f46e5; }
        .btn-primary:hover { background: #4338ca; }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container">
            <a class="navbar-brand" href="index.php">
                <i class="fas fa-boxes"></i> Sistem Inventaris
            </a>
            <div class="navbar-nav">
                <a class="nav-link" href="index.php"><i class="fas fa-home"></i> Beranda</a>
                <a class="nav-link" href="tambah.php"><i class="fas fa-plus"></i> Tambah</a>
            </div>
        </div>
    </nav>
    <div class="container mt-4">
```

### Template Footer (footer.php)

```php
<?php // footer.php ?>
    </div><!-- /.container -->
    
    <footer class="bg-dark text-white text-center py-3 mt-5">
        <p class="mb-0">&copy; <?php echo date('Y'); ?> Sistem Inventaris - Kelas PHP Kafekoding</p>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

---

## 5. Halaman Utama (index.php)

```php
<?php
require_once 'config.php';
$pageTitle = "Daftar Barang";
include 'header.php';

// Pencarian
$search = isset($_GET['q']) ? mysqli_real_escape_string($conn, $_GET['q']) : '';
$query = "SELECT * FROM barang WHERE nama LIKE '%$search%' OR kode LIKE '%$search%' ORDER BY id DESC";
$result = mysqli_query($conn, $query);
$total = mysqli_num_rows($result);
?>

<div class="d-flex justify-content-between align-items-center mb-4">
    <h2><i class="fas fa-boxes"></i> Daftar Barang</h2>
    <span class="badge bg-primary fs-6"><?php echo $total; ?> barang</span>
</div>

<!-- Form Pencarian -->
<div class="card p-3 mb-4">
    <form method="GET" class="d-flex gap-2">
        <input type="text" name="q" class="form-control" placeholder="Cari nama atau kode barang..." 
               value="<?php echo htmlspecialchars($search); ?>">
        <button type="submit" class="btn btn-primary"><i class="fas fa-search"></i> Cari</button>
        <?php if (!empty($search)): ?>
        <a href="index.php" class="btn btn-outline-secondary"><i class="fas fa-times"></i></a>
        <?php endif; ?>
    </form>
</div>

<!-- Tabel Data -->
<div class="card">
    <div class="card-body p-0">
        <div class="table-responsive">
            <table class="table table-hover mb-0">
                <thead class="table-dark">
                    <tr>
                        <th>No</th>
                        <th>Kode</th>
                        <th>Nama Barang</th>
                        <th>Kategori</th>
                        <th>Jumlah</th>
                        <th>Harga</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    if ($total > 0) {
                        $no = 1;
                        while ($row = mysqli_fetch_assoc($result)) {
                            echo "<tr>";
                            echo "<td>$no</td>";
                            echo "<td><strong>" . htmlspecialchars($row['kode']) . "</strong></td>";
                            echo "<td>" . htmlspecialchars($row['nama']) . "</td>";
                            echo "<td><span class='badge bg-info'>" . htmlspecialchars($row['kategori']) . "</span></td>";
                            echo "<td>" . $row['jumlah'] . "</td>";
                            echo "<td>Rp " . number_format($row['harga'], 0, ',', '.') . "</td>";
                            echo "<td>";
                            echo "<a href='detail.php?id=" . $row['id'] . "' class='btn btn-sm btn-outline-primary'><i class='fas fa-eye'></i></a> ";
                            echo "<a href='edit.php?id=" . $row['id'] . "' class='btn btn-sm btn-outline-warning'><i class='fas fa-edit'></i></a> ";
                            echo "<a href='hapus.php?id=" . $row['id'] . "' class='btn btn-sm btn-outline-danger' ";
                            echo "onclick=\"return confirm('Yakin hapus " . htmlspecialchars($row['nama']) . "?')\"><i class='fas fa-trash'></i></a>";
                            echo "</td>";
                            echo "</tr>";
                            $no++;
                        }
                    } else {
                        echo "<tr><td colspan='7' class='text-center text-muted py-4'>";
                        echo empty($search) ? "Belum ada data barang." : "Tidak ada hasil untuk '$search'.";
                        echo "</td></tr>";
                    }
                    ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

<?php include 'footer.php'; ?>
```

---

## 6. Form Tambah (tambah.php)

```php
<?php
$pageTitle = "Tambah Barang";
include 'header.php';
?>

<h2><i class="fas fa-plus"></i> Tambah Barang Baru</h2>

<div class="card mt-3">
    <div class="card-body">
        <form action="proses_tambah.php" method="POST">
            <div class="mb-3">
                <label class="form-label">Kode Barang</label>
                <input type="text" name="kode" class="form-control" placeholder="Contoh: BRG008" required>
            </div>
            
            <div class="mb-3">
                <label class="form-label">Nama Barang</label>
                <input type="text" name="nama" class="form-control" placeholder="Nama barang" required>
            </div>
            
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Kategori</label>
                    <input type="text" name="kategori" class="form-control" placeholder="Elektronik, Furniture, dll">
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Jumlah Stok</label>
                    <input type="number" name="jumlah" class="form-control" min="0" required>
                </div>
            </div>
            
            <div class="mb-3">
                <label class="form-label">Harga (Rp)</label>
                <input type="number" name="harga" class="form-control" min="0" required>
            </div>
            
            <div class="mb-3">
                <label class="form-label">Deskripsi</label>
                <textarea name="deskripsi" class="form-control" rows="3"></textarea>
            </div>
            
            <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Simpan</button>
            <a href="index.php" class="btn btn-outline-secondary">Batal</a>
        </form>
    </div>
</div>

<?php include 'footer.php'; ?>
```

---

## 7. Proses Simpan (proses_tambah.php)

```php
<?php
require_once 'config.php';

$kode = mysqli_real_escape_string($conn, $_POST['kode']);
$nama = mysqli_real_escape_string($conn, $_POST['nama']);
$kategori = mysqli_real_escape_string($conn, $_POST['kategori']);
$jumlah = (int)$_POST['jumlah'];
$harga = (float)$_POST['harga'];
$deskripsi = mysqli_real_escape_string($conn, $_POST['deskripsi']);

$query = "INSERT INTO barang (kode, nama, kategori, jumlah, harga, deskripsi) 
          VALUES ('$kode', '$nama', '$kategori', $jumlah, $harga, '$deskripsi')";

if (mysqli_query($conn, $query)) {
    header("Location: index.php?success=1");
} else {
    echo "Error: " . mysqli_error($conn);
}
?>
```

---

## 8. Edit dan Hapus (edit.php + hapus.php)

### Edit (edit.php)

```php
<?php
require_once 'config.php';
$pageTitle = "Edit Barang";
include 'header.php';

$id = (int)$_GET['id'];
$result = mysqli_query($conn, "SELECT * FROM barang WHERE id = $id");
$barang = mysqli_fetch_assoc($result);

if (!$barang) {
    echo "<p>Data tidak ditemukan!</p>";
    include 'footer.php';
    exit;
}
?>

<h2><i class="fas fa-edit"></i> Edit Barang</h2>

<div class="card mt-3">
    <div class="card-body">
        <form action="proses_edit.php" method="POST">
            <input type="hidden" name="id" value="<?php echo $barang['id']; ?>">
            
            <div class="mb-3">
                <label class="form-label">Kode Barang</label>
                <input type="text" name="kode" class="form-control" 
                       value="<?php echo htmlspecialchars($barang['kode']); ?>" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Nama Barang</label>
                <input type="text" name="nama" class="form-control" 
                       value="<?php echo htmlspecialchars($barang['nama']); ?>" required>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Kategori</label>
                    <input type="text" name="kategori" class="form-control" 
                           value="<?php echo htmlspecialchars($barang['kategori']); ?>">
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Jumlah Stok</label>
                    <input type="number" name="jumlah" class="form-control" min="0" 
                           value="<?php echo $barang['jumlah']; ?>" required>
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">Harga (Rp)</label>
                <input type="number" name="harga" class="form-control" min="0" 
                       value="<?php echo $barang['harga']; ?>" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Deskripsi</label>
                <textarea name="deskripsi" class="form-control" rows="3"><?php echo htmlspecialchars($barang['deskripsi']); ?></textarea>
            </div>
            
            <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Update</button>
            <a href="index.php" class="btn btn-outline-secondary">Batal</a>
        </form>
    </div>
</div>

<?php include 'footer.php'; ?>
```

### Hapus (hapus.php)

```php
<?php
require_once 'config.php';

$id = (int)$_GET['id'];
mysqli_query($conn, "DELETE FROM barang WHERE id = $id");
header("Location: index.php?deleted=1");
?>
```

---

## 9. Halaman Detail (detail.php)

```php
<?php
require_once 'config.php';
$pageTitle = "Detail Barang";
include 'header.php';

$id = (int)$_GET['id'];
$result = mysqli_query($conn, "SELECT * FROM barang WHERE id = $id");
$barang = mysqli_fetch_assoc($result);

if (!$barang) {
    echo "<p>Data tidak ditemukan!</p>";
    include 'footer.php';
    exit;
}
?>

<h2><i class="fas fa-eye"></i> Detail Barang</h2>

<div class="card mt-3">
    <div class="card-body">
        <table class="table table-bordered">
            <tr><th width="200">Kode</th><td><?php echo htmlspecialchars($barang['kode']); ?></td></tr>
            <tr><th>Nama</th><td><?php echo htmlspecialchars($barang['nama']); ?></td></tr>
            <tr><th>Kategori</th><td><span class="badge bg-info"><?php echo htmlspecialchars($barang['kategori']); ?></span></td></tr>
            <tr><th>Jumlah Stok</th><td><?php echo $barang['jumlah']; ?> unit</td></tr>
            <tr><th>Harga</th><td>Rp <?php echo number_format($barang['harga'], 0, ',', '.'); ?></td></tr>
            <tr><th>Deskripsi</th><td><?php echo nl2br(htmlspecialchars($barang['deskripsi'])); ?></td></tr>
            <tr><th>Ditambahkan</th><td><?php echo date('d F Y, H:i', strtotime($barang['created_at'])); ?></td></tr>
        </table>
        
        <a href="edit.php?id=<?php echo $barang['id']; ?>" class="btn btn-warning"><i class="fas fa-edit"></i> Edit</a>
        <a href="index.php" class="btn btn-outline-secondary"><i class="fas fa-arrow-left"></i> Kembali</a>
    </div>
</div>

<?php include 'footer.php'; ?>
```

---

## Kesimpulan

Mini project ini menggabungkan **semua konsep** yang telah dipelajari:

| Konsep | Implementasi |
|--------|--------------|
| PHP Dasar | Variabel, operator, kondisi |
| HTML | Struktur halaman, form, tabel |
| Bootstrap | Navbar, card, table, button, form styling |
| MySQL | CREATE TABLE, INSERT, SELECT, UPDATE, DELETE |
| Koneksi DB | mysqli_connect, config.php |
| Keamanan | htmlspecialchars, mysqli_real_escape_string |
| UX | Pencarian, konfirmasi hapus, pesan sukses |

**Tantangan Tambahan:**
1. Tambah fitur **pagination** (halaman 1, 2, 3...)
2. Tambah fitur **export ke CSV**
3. Tambah **grafik stok** menggunakan Chart.js
4. Tambah **login system** untuk admin

Selanjutnya pada pertemuan 15-16, kamu akan membuat **Project Akhir** sendiri sesuai dengan materi yang sudah dipelajari!
