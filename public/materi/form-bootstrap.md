# Pertemuan 8 - Form + Bootstrap

Aplikasi pemesanan kantin sederhana menggunakan PHP dan Bootstrap.

---

## Tentang Materi Ini

Pertemuan 8 ini adalah **materi gabungan** dari semua konsep PHP dasar yang sudah dipelajari di pertemuan 1-7:

- **Sintaks Dasar PHP**: Tag `<?php ?>`, echo, komentar
- **Variable**: Menyimpan data dengan `$nama_variable`
- **Tipe Data**: String, Integer, Array
- **Operator**: Aritmatika (`+`, `-`, `*`), Perbandingan (`==`, `>`, `<`), Logika (`&&`, `||`)
- **Control Flow**: `if-else` untuk validasi dan kondisi
- **Loop**: `foreach` untuk menampilkan data array
- **Function**: Membuat function sendiri dengan parameter dan return value
- **Array**: Array multidimensi untuk data kompleks

Semua konsep ini digabungkan dalam satu aplikasi nyata: **Sistem Pemesanan Kantin**.

---

## Apa itu Bootstrap?

**Bootstrap** adalah framework CSS yang paling populer untuk membuat website yang responsif dan modern dengan cepat.

**Keuntungan menggunakan Bootstrap:**
- Tidak perlu menulis CSS dari nol
- Tampilan otomatis responsif (mobile-friendly)
- Komponen siap pakai (button, card, table, form)
- Konsisten di semua browser
- Dokumentasi lengkap dan mudah dipelajari

**Cara kerja Bootstrap:**
Cukup tambahkan class Bootstrap ke elemen HTML, maka styling otomatis diterapkan.

Contoh tanpa Bootstrap:
```html
<button style="background: blue; color: white; padding: 10px;">Klik</button>
```

Contoh dengan Bootstrap:
```html
<button class="btn btn-primary">Klik</button>
```

Hasilnya sama, tapi dengan Bootstrap lebih cepat dan konsisten!

---

## Persiapan Awal

### 1. Download Bootstrap

1. Kunjungi https://getbootstrap.com/docs/5.3/getting-started/download/
2. Download **Compiled CSS and JS**
3. Extract file zip yang sudah didownload
4. Copy folder `bootstrap` ke dalam folder `form/`

Struktur folder setelah copy Bootstrap:
```
form/
├── bootstrap/
│   ├── css/
│   │   └── bootstrap.min.css
│   └── js/
│       └── bootstrap.bundle.min.js
```

---

## Langkah Pembuatan Aplikasi

### LANGKAH 1: Buat File Data Menu

Buat file `form/stock.php`:

```php
<?php
// Data stock dan harga menu kantin Bu Wati
$menuKantin = array(
    array(
        'id' => 1,
        'nama' => 'Kopi',
        'harga' => 5000,
        'stock' => 50
    ),
    array(
        'id' => 2,
        'nama' => 'Teh',
        'harga' => 3000,
        'stock' => 40
    ),
    array(
        'id' => 3,
        'nama' => 'Susu',
        'harga' => 7000,
        'stock' => 30
    ),
    array(
        'id' => 4,
        'nama' => 'Nasi Goreng',
        'harga' => 15000,
        'stock' => 25
    ),
    array(
        'id' => 5,
        'nama' => 'Mie Goreng',
        'harga' => 12000,
        'stock' => 20
    ),
    array(
        'id' => 6,
        'nama' => 'Nasi Uduk',
        'harga' => 10000,
        'stock' => 15
    ),
    array(
        'id' => 7,
        'nama' => 'Roti Bakar',
        'harga' => 8000,
        'stock' => 35
    ),
    array(
        'id' => 8,
        'nama' => 'Gorengan',
        'harga' => 2000,
        'stock' => 600
    ),
    array(
        'id' => 9,
        'nama' => 'Air Mineral',
        'harga' => 3000,
        'stock' => 500
    )
);
?>
```

**Penjelasan:**
- Array multidimensi untuk menyimpan data menu
- Setiap menu punya id, nama, harga, dan stock

---

### LANGKAH 2: Buat Folder Action

Buat folder `form/action/` - folder ini akan berisi 3 file PHP untuk memproses data

---

### LANGKAH 3: Buat File Functions

Buat file `form/action/functions.php`:

```php
<?php
// Functions untuk operasi kantin

function getMenuById($id) {
    global $menuKantin;
    
    foreach ($menuKantin as $menu) {
        if ($menu['id'] == $id) {
            return $menu;
        }
    }
    
    return null;
}

function formatRupiah($angka) {
    return 'Rp ' . number_format($angka, 0, ',', '.');
}
?>
```

**Penjelasan:**
- `getMenuById($id)`: Function untuk mencari menu berdasarkan ID
  - Parameter: `$id` (ID menu yang dicari)
  - Return: Array data menu atau `null` jika tidak ditemukan
  - Menggunakan `global` untuk akses variabel `$menuKantin`
  - Loop `foreach` untuk cari menu yang sesuai

- `formatRupiah($angka)`: Function untuk format angka jadi Rupiah
  - Parameter: `$angka` (angka yang akan diformat)
  - Return: String format Rupiah (contoh: "Rp 15.000")
  - `number_format()` untuk tambah titik pemisah ribuan

---

### LANGKAH 4: Buat File Form Handler

Buat file `form/action/form_handler.php`:

```php
<?php
// Validasi dan ambil data dari form

// Cek apakah form sudah disubmit
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../index.php');
    exit;
}

// Ambil data pembeli
$nama_pembeli = isset($_POST['nama_pembeli']) ? trim($_POST['nama_pembeli']) : '';
$catatan = isset($_POST['catatan']) ? trim($_POST['catatan']) : '';

// Validasi nama pembeli
if (empty($nama_pembeli)) {
    die('Error: Nama pembeli harus diisi!');
}

// Ambil data menu yang dipilih
$menu_dipilih = isset($_POST['menu']) ? $_POST['menu'] : array();
$jumlah_pesanan = isset($_POST['jumlah']) ? $_POST['jumlah'] : array();

// Validasi minimal 1 menu dipilih
if (empty($menu_dipilih)) {
    die('Error: Pilih minimal 1 menu!');
}

// Generate nomor invoice
$nomor_invoice = 'INV-' . date('Ymd') . '-' . rand(1000, 9999);
$tanggal = date('d F Y H:i:s');
?>
```

**Penjelasan:**

1. **Cek Request Method**
   - `$_SERVER['REQUEST_METHOD']`: Cek apakah request adalah POST
   - Jika bukan POST, redirect ke index.php
   - `exit`: Hentikan eksekusi script

2. **Ambil Data dari Form**
   - `$_POST['nama_pembeli']`: Ambil nama pembeli dari form
   - `isset()`: Cek apakah data ada
   - `trim()`: Hapus spasi di awal dan akhir string
   - Operator ternary `? :` untuk set default value kosong

3. **Validasi Data**
   - `empty()`: Cek apakah variabel kosong
   - `die()`: Hentikan script dan tampilkan pesan error
   - Validasi nama pembeli tidak boleh kosong
   - Validasi minimal 1 menu harus dipilih

4. **Generate Invoice**
   - `date('Ymd')`: Format tanggal YYYYMMDD (contoh: 20260108)
   - `rand(1000, 9999)`: Generate angka random 4 digit
   - Format invoice: INV-20260108-1234
   - `date('d F Y H:i:s')`: Format tanggal lengkap untuk tampilan

---

### LANGKAH 5: Buat File Process Order

Buat file `form/action/process_order.php`:

```php
<?php
// Proses pesanan dan hitung total

$pesanan = array();
$total = 0;

// Loop setiap menu yang dipilih
foreach ($menu_dipilih as $menu_id) {
    // Ambil data menu dari database
    $menu = getMenuById($menu_id);
    
    if ($menu === null) {
        continue; // Skip jika menu tidak ditemukan
    }
    
    // Ambil jumlah pesanan untuk menu ini
    $jumlah = isset($jumlah_pesanan[$menu_id]) ? (int)$jumlah_pesanan[$menu_id] : 1;
    
    // Validasi jumlah tidak melebihi stock
    if ($jumlah > $menu['stock']) {
        $jumlah = $menu['stock'];
    }
    
    if ($jumlah < 1) {
        $jumlah = 1;
    }
    
    // Hitung subtotal
    $subtotal = $menu['harga'] * $jumlah;
    
    // Tambahkan ke array pesanan
    $pesanan[] = array(
        'id' => $menu['id'],
        'nama' => $menu['nama'],
        'harga' => $menu['harga'],
        'jumlah' => $jumlah,
        'subtotal' => $subtotal
    );
    
    // Tambahkan ke total
    $total += $subtotal;
}

// Validasi pesanan tidak kosong
if (empty($pesanan)) {
    die('Error: Tidak ada pesanan yang valid!');
}
?>
```

**Penjelasan:**

1. **Inisialisasi Variabel**
   - `$pesanan = array()`: Array kosong untuk simpan detail pesanan
   - `$total = 0`: Variabel untuk total harga

2. **Loop Menu yang Dipilih**
   - `foreach ($menu_dipilih as $menu_id)`: Loop setiap ID menu yang dipilih
   - `getMenuById($menu_id)`: Ambil detail menu dari stock.php
   - `continue`: Skip ke iterasi berikutnya jika menu tidak ditemukan

3. **Ambil dan Validasi Jumlah**
   - `(int)`: Type casting untuk pastikan nilai integer
   - Default jumlah = 1 jika tidak diisi
   - Validasi jumlah tidak boleh melebihi stock
   - Validasi jumlah minimal 1

4. **Hitung Subtotal**
   - `$subtotal = $menu['harga'] * $jumlah`: Harga × Jumlah
   - Simpan ke array `$pesanan` dengan struktur lengkap
   - `$total += $subtotal`: Tambahkan subtotal ke total keseluruhan

5. **Validasi Akhir**
   - Cek apakah ada pesanan yang valid
   - Jika tidak ada, tampilkan error

---

### LANGKAH 6: Buat Halaman Form Pemesanan

Buat file `form/index.php`:

```php
<?php
// Load data menu
require_once 'stock.php';
require_once 'action/functions.php';

// Siapkan data untuk tampilan
$pageTitle = 'Kantin Bu Wati';
$menus = $menuKantin;
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $pageTitle; ?></title>
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
</head>
<body class="bg-light">
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card shadow">
                    <div class="card-header bg-primary text-white text-center">
                        <h2 class="mb-0"><?php echo $pageTitle; ?></h2>
                        <p class="mb-0">Silakan pilih menu dan jumlah pesanan</p>
                    </div>
                    
                    <div class="card-body p-4">
                        <form action="dash.php" method="POST" id="formPesanan">
                            <div class="mb-4">
                                <label class="form-label fw-bold">Nama Pembeli</label>
                                <input type="text" class="form-control" name="nama_pembeli" required>
                            </div>
                            
                            <div class="mb-4">
                                <label class="form-label fw-bold">Pilih Menu</label>
                                <div class="list-group">
                                    <?php foreach ($menus as $menu): ?>
                                    <div class="list-group-item menu-item">
                                        <div class="row align-items-center">
                                            <div class="col-md-6">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" 
                                                           name="menu[]" value="<?php echo $menu['id']; ?>" 
                                                           id="menu<?php echo $menu['id']; ?>">
                                                    <label class="form-check-label" for="menu<?php echo $menu['id']; ?>">
                                                        <strong><?php echo $menu['nama']; ?></strong><br>
                                                        <small class="text-muted">Stock: <?php echo $menu['stock']; ?></small>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <span class="badge bg-success">
                                                    <?php echo formatRupiah($menu['harga']); ?>
                                                </span>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="number" class="form-control form-control-sm" 
                                                       name="jumlah[<?php echo $menu['id']; ?>]" 
                                                       min="1" max="<?php echo $menu['stock']; ?>" value="1">
                                            </div>
                                        </div>
                                    </div>
                                    <?php endforeach; ?>
                                </div>
                            </div>
                            
                            <div class="mb-4">
                                <label class="form-label fw-bold">Catatan (Opsional)</label>
                                <textarea class="form-control" name="catatan" rows="3" 
                                          placeholder="Contoh: Pedas, tanpa sayur, dll"></textarea>
                            </div>
                            
                            <div class="d-grid gap-2">
                                <button type="submit" class="btn btn-primary btn-lg">
                                    Pesan Sekarang
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script src="bootstrap/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

**Penjelasan:**
- Form dengan method POST ke `dash.php`
- Input nama pembeli (required)
- Checkbox untuk pilih menu (bisa multiple)
- Input number untuk jumlah per menu
- Textarea untuk catatan
- Menggunakan Bootstrap untuk styling responsif

**Class Bootstrap yang dipakai:**
- `container`, `row`, `col-md-8`: Grid system
- `card`, `card-header`, `card-body`: Komponen kartu
- `form-control`: Styling input
- `form-check`: Styling checkbox
- `btn btn-primary`: Styling button
- `badge bg-success`: Label harga

---

### LANGKAH 7: Buat Halaman Invoice

Buat file `form/dash.php`:

```php
<?php
// ========== PHP LOGIC ==========
require_once 'stock.php';
require_once 'action/functions.php';
require_once 'action/form_handler.php';
require_once 'action/process_order.php';

$pageTitle = 'Invoice - Kantin Bu Wati';
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $pageTitle; ?></title>
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
</head>
<body class="bg-light">
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card shadow">
                    <div class="card-header bg-success text-white text-center">
                        <h2 class="mb-0">Invoice Pesanan</h2>
                        <p class="mb-0">Kantin Bu Wati</p>
                    </div>
                    
                    <div class="card-body p-4">
                        <div class="row mb-4">
                            <div class="col-md-6">
                                <p class="mb-1"><strong>No. Invoice:</strong> <?php echo $nomor_invoice; ?></p>
                                <p class="mb-1"><strong>Tanggal:</strong> <?php echo $tanggal; ?></p>
                            </div>
                            <div class="col-md-6 text-md-end">
                                <p class="mb-1"><strong>Nama Pembeli:</strong></p>
                                <p class="mb-1"><?php echo htmlspecialchars($nama_pembeli); ?></p>
                            </div>
                        </div>
                        
                        <div class="table-responsive mb-4">
                            <table class="table table-bordered">
                                <thead class="table-light">
                                    <tr>
                                        <th>No</th>
                                        <th>Menu</th>
                                        <th class="text-end">Harga</th>
                                        <th class="text-center">Jumlah</th>
                                        <th class="text-end">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php 
                                    $no = 1;
                                    foreach ($pesanan as $item): 
                                    ?>
                                    <tr>
                                        <td><?php echo $no++; ?></td>
                                        <td><?php echo $item['nama']; ?></td>
                                        <td class="text-end"><?php echo formatRupiah($item['harga']); ?></td>
                                        <td class="text-center"><?php echo $item['jumlah']; ?></td>
                                        <td class="text-end"><?php echo formatRupiah($item['subtotal']); ?></td>
                                    </tr>
                                    <?php endforeach; ?>
                                </tbody>
                                <tfoot>
                                    <tr class="table-success">
                                        <td colspan="4" class="text-end"><strong>Total:</strong></td>
                                        <td class="text-end"><strong><?php echo formatRupiah($total); ?></strong></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        
                        <?php if (!empty($catatan)): ?>
                        <div class="alert alert-info">
                            <strong>Catatan:</strong> <?php echo htmlspecialchars($catatan); ?>
                        </div>
                        <?php endif; ?>
                        
                        <div class="d-grid gap-2">
                            <a href="index.php" class="btn btn-primary btn-lg">Pesan Lagi</a>
                            <button onclick="window.print()" class="btn btn-outline-secondary">Cetak Invoice</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script src="bootstrap/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

**Penjelasan:**
- Load semua file PHP yang diperlukan
- Tampilkan nomor invoice dan tanggal
- Tampilkan nama pembeli
- Tabel detail pesanan dengan Bootstrap
- Tampilkan total pembayaran
- Tampilkan catatan jika ada
- Tombol untuk pesan lagi dan cetak invoice

**Class Bootstrap untuk Tabel:**
- `table`: Tabel dasar Bootstrap
- `table-bordered`: Tambah border
- `table-responsive`: Responsif di mobile
- `text-end`: Align kanan
- `text-center`: Align tengah

---

## Cara Menjalankan

1. Pastikan XAMPP/WAMP sudah running
2. Letakkan folder `form` di `htdocs` (XAMPP) atau `www` (WAMP)
3. Buka browser, akses: `http://localhost/form/index.php`
4. Isi form dan klik "Pesan Sekarang"
5. Invoice akan muncul di halaman `dash.php`

---

## Struktur File Lengkap

```
form/
├── bootstrap/
│   ├── css/
│   │   └── bootstrap.min.css
│   └── js/
│       └── bootstrap.bundle.min.js
├── action/
│   ├── functions.php
│   ├── form_handler.php
│   └── process_order.php
├── index.php          (Halaman form pemesanan)
├── dash.php           (Halaman invoice)
└── stock.php          (Data menu)
```

---

## Konsep PHP yang Dipelajari (Gabungan Pertemuan 1-7)

### 1. Sintaks Dasar PHP
**Digunakan di:** Semua file PHP
```php
<?php
// Komentar
echo "Hello";
?>
```

### 2. Variable & Tipe Data
**Digunakan di:** `stock.php`, `form_handler.php`, `process_order.php`
```php
$nama_pembeli = "Budi";           // String
$harga = 5000;                     // Integer
$menuKantin = array(...);          // Array
```

### 3. Array Multidimensi
**Digunakan di:** `stock.php`
```php
$menuKantin = array(
    array('id' => 1, 'nama' => 'Kopi', 'harga' => 5000),
    array('id' => 2, 'nama' => 'Teh', 'harga' => 3000)
);
```

### 4. Operator
**Digunakan di:** `process_order.php`, `form_handler.php`
```php
// Aritmatika
$subtotal = $harga * $jumlah;
$total += $subtotal;

// Perbandingan
if ($jumlah > $menu['stock']) { }
if ($menu === null) { }

// Logika
if (!empty($nama_pembeli)) { }
```

### 5. Control Flow (if-else)
**Digunakan di:** `form_handler.php`, `process_order.php`
```php
if (empty($nama_pembeli)) {
    die('Error: Nama pembeli harus diisi!');
}

if ($jumlah > $menu['stock']) {
    $jumlah = $menu['stock'];
}
```

### 6. Loop (foreach)
**Digunakan di:** `index.php`, `dash.php`, `process_order.php`
```php
// Loop untuk tampilkan menu
foreach ($menus as $menu) {
    echo $menu['nama'];
}

// Loop untuk proses pesanan
foreach ($menu_dipilih as $menu_id) {
    // Proses setiap menu
}
```

### 7. Function
**Digunakan di:** `functions.php`
```php
function getMenuById($id) {
    // Parameter: $id
    // Return: array atau null
    return $menu;
}

function formatRupiah($angka) {
    return 'Rp ' . number_format($angka, 0, ',', '.');
}
```

### 8. Form Processing
**Digunakan di:** `form_handler.php`
```php
// Ambil data dari form
$nama_pembeli = $_POST['nama_pembeli'];
$menu_dipilih = $_POST['menu'];

// Validasi
if (empty($menu_dipilih)) {
    die('Error!');
}
```

### 9. Include File
**Digunakan di:** `index.php`, `dash.php`
```php
require_once 'stock.php';
require_once 'action/functions.php';
```

### 10. String & Number Manipulation
**Digunakan di:** `functions.php`, `form_handler.php`
```php
trim($nama_pembeli);              // Hapus spasi
number_format($angka, 0, ',', '.'); // Format angka
date('Ymd');                       // Format tanggal
(int)$jumlah;                      // Type casting
```

---

## Bootstrap yang Digunakan

### 1. Grid System
Layout responsif dengan 12 kolom
```html
<div class="container">
    <div class="row">
        <div class="col-md-8">
            <!-- Konten -->
        </div>
    </div>
</div>
```

### 2. Card Component
Kotak dengan border dan shadow
```html
<div class="card shadow">
    <div class="card-header bg-primary text-white">
        <h2>Judul</h2>
    </div>
    <div class="card-body">
        <!-- Konten -->
    </div>
</div>
```

### 3. Form Styling
```html
<input type="text" class="form-control">
<label class="form-label">Label</label>
<div class="form-check">
    <input type="checkbox" class="form-check-input">
</div>
```

### 4. Button
```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-success">Success</button>
<button class="btn btn-outline-secondary">Outline</button>
```

### 5. Table
```html
<table class="table table-bordered table-responsive">
    <thead class="table-light">
        <tr><th>Header</th></tr>
    </thead>
    <tbody>
        <tr><td>Data</td></tr>
    </tbody>
</table>
```

### 6. Utility Classes
```html
<!-- Spacing -->
<div class="mb-4">Margin bottom 4</div>
<div class="py-5">Padding Y 5</div>

<!-- Text -->
<p class="text-center">Center</p>
<p class="text-end">Right align</p>

<!-- Colors -->
<div class="bg-light">Background light</div>
<span class="text-white">White text</span>
```

---

## Troubleshooting

**Error: Bootstrap tidak muncul**
- Pastikan path Bootstrap benar: `bootstrap/css/bootstrap.min.css`
- Cek apakah folder bootstrap sudah di copy ke folder form

**Error: Call to undefined function**
- Pastikan semua file sudah di-include dengan `require_once`
- Cek urutan include file

**Form tidak submit**
- Cek atribut `action` dan `method` di tag `<form>`
- Pastikan button type="submit"

**Data tidak muncul di invoice**
- Cek atribut `name` di setiap input
- Pastikan menggunakan `$_POST` untuk ambil data
