# Pertemuan 11 - Menampilkan Data dari Database dengan PHP

![Data Display](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop)

## Pengambilan Data (SELECT)

Setelah data tersimpan di database, langkah selanjutnya adalah **menampilkannya** ke halaman web. Query `SELECT` digunakan untuk mengambil data dari database.

### Sintaks Dasar

```sql
SELECT kolom1, kolom2, ... FROM nama_tabel WHERE kondisi ORDER BY kolom ASC/DESC LIMIT jumlah;
```

### Komponen SELECT

| Komponen | Fungsi | Wajib? |
|----------|--------|--------|
| `SELECT` | Menentukan kolom yang diambil | Ya |
| `FROM` | Menentukan tabel sumber | Ya |
| `WHERE` | Filter kondisi | Tidak |
| `ORDER BY` | Urutan data | Tidak |
| `LIMIT` | Batasi jumlah data | Tidak |
| `JOIN` | Gabungkan tabel | Tidak |

---

## 1. Menampilkan Semua Data

```php
<?php
require_once 'config.php';

// Query: ambil semua data siswa
$query = "SELECT * FROM siswa";
$result = mysqli_query($conn, $query);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Data Siswa</title>
    <style>
        body { font-family: Arial; margin: 30px; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 10px; }
        th { background: #4f46e5; color: white; }
        tr:nth-child(even) { background: #f9fafb; }
    </style>
</head>
<body>
    <h2>Daftar Siswa Kelas PHP</h2>

    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Kelas</th>
                <th>Nilai</th>
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
                echo "</tr>";
                $no++;
            }
            ?>
        </tbody>
    </table>
</body>
</html>
```

### Penjelasan Fungsi Fetch

| Fungsi | Deskripsi |
|--------|-----------|
| `mysqli_fetch_assoc($result)` | Mengambil 1 baris sebagai **array asosiatif** (akses via nama kolom: `$row['nama']`) |
| `mysqli_fetch_array($result)` | Mengambil 1 baris sebagai array numerik + asosiatif |
| `mysqli_fetch_object($result)` | Mengambil 1 baris sebagai **object** (akses via `$row->nama`) |
| `mysqli_fetch_row($result)` | Mengambil 1 baris sebagai **array numerik** (akses via `$row[0]`) |
| `mysqli_num_rows($result)` | Menghitung **jumlah baris** hasil query |

### Contoh `mysqli_fetch_object`

```php
<?php
$query = "SELECT * FROM siswa";
$result = mysqli_query($conn, $query);

while ($row = mysqli_fetch_object($result)) {
    echo "$row->nama - $row->email - Nilai: $row->nilai<br>";
}
?>
```

---

## 2. Filter Data dengan WHERE

```php
<?php
require_once 'config.php';

// Filter: hanya kelas PHP-A
$query = "SELECT * FROM siswa WHERE kelas = 'PHP-A'";
$result = mysqli_query($conn, $query);

echo "<h2>Siswa Kelas PHP-A</h2>";
echo "<p>Jumlah: " . mysqli_num_rows($result) . " siswa</p>";

while ($row = mysqli_fetch_assoc($result)) {
    echo htmlspecialchars($row['nama']) . " - Nilai: " . $row['nilai'] . "<br>";
}
?>
```

### Operator WHERE

| Operator | Fungsi | Contoh |
|----------|--------|--------|
| `=` | Sama dengan | `WHERE nilai = 90` |
| `!=` | Tidak sama dengan | `WHERE kelas != 'PHP-A'` |
| `>` | Lebih dari | `WHERE nilai > 80` |
| `<` | Kurang dari | `WHERE nilai < 70` |
| `>=` | Lebih dari atau sama dengan | `WHERE nilai >= 80` |
| `<=` | Kurang dari atau sama dengan | `WHERE nilai <= 70` |
| `LIKE` | Pencarian pola | `WHERE nama LIKE '%arif%'` |
| `IN` | Salah satu dari daftar | `WHERE kelas IN ('PHP-A', 'PHP-B')` |
| `BETWEEN` | Antara dua nilai | `WHERE nilai BETWEEN 80 AND 100` |

### Pencarian dengan LIKE

```php
<?php
$search = isset($_GET['q']) ? $_GET['q'] : '';

// Cari nama yang mengandung kata yang diinput
$query = "SELECT * FROM siswa WHERE nama LIKE '%$search%'";
$result = mysqli_query($conn, $query);

echo "<h2>Hasil Pencarian: '$search'</h2>";
echo "<p>Ditemukan " . mysqli_num_rows($result) . " data</p>";
?>
```

---

## 3. Mengurutkan Data

```php
<?php
// Urutkan berdasarkan nilai (tertinggi ke terendah)
$query = "SELECT * FROM siswa ORDER BY nilai DESC";

// Urutkan berdasarkan nama (A-Z)
$query = "SELECT * FROM siswa ORDER BY nama ASC";

// Urutkan ganda: kelas dulu, lalu nilai
$query = "SELECT * FROM siswa ORDER BY kelas ASC, nilai DESC";
?>
```

### LIMIT dan OFFSET

```php
<?php
// Ambil 10 data pertama
$query = "SELECT * FROM siswa ORDER BY nilai DESC LIMIT 10";

// Pagination: halaman 2, 10 data per halaman
$halaman = 2;
$per_halaman = 10;
$offset = ($halaman - 1) * $per_halaman;

$query = "SELECT * FROM siswa ORDER BY id DESC LIMIT $per_halaman OFFSET $offset";
?>
```

---

## 4. Menghitung Data (Aggregate Functions)

```php
<?php
require_once 'config.php';

// Hitung total siswa
$query_total = "SELECT COUNT(*) as total FROM siswa";
$result = mysqli_query($conn, $query_total);
$row = mysqli_fetch_assoc($result);
echo "Total siswa: " . $row['total'] . "<br>";

// Hitung rata-rata nilai
$query_rata = "SELECT AVG(nilai) as rata FROM siswa";
$result = mysqli_query($conn, $query_rata);
$row = mysqli_fetch_assoc($result);
echo "Rata-rata nilai: " . round($row['rata'], 1) . "<br>";

// Nilai tertinggi dan terendah
$query_range = "SELECT MAX(nilai) as tertinggi, MIN(nilai) as terendah FROM siswa";
$result = mysqli_query($conn, $query_range);
$row = mysqli_fetch_assoc($result);
echo "Nilai tertinggi: " . $row['tertinggi'] . "<br>";
echo "Nilai terendah: " . $row['terendah'] . "<br>";

// GROUP BY: rata-rata per kelas
$query_group = "SELECT kelas, COUNT(*) as jumlah, AVG(nilai) as rata_nilai 
                FROM siswa GROUP BY kelas ORDER BY rata_nilai DESC";
$result = mysqli_query($conn, $query_group);

echo "<h3>Rata-rata per Kelas</h3>";
echo "<table border='1'>";
echo "<tr><th>Kelas</th><th>Jumlah</th><th>Rata-rata</th></tr>";
while ($row = mysqli_fetch_assoc($result)) {
    echo "<tr>";
    echo "<td>" . htmlspecialchars($row['kelas']) . "</td>";
    echo "<td>" . $row['jumlah'] . "</td>";
    echo "<td>" . round($row['rata_nilai'], 1) . "</td>";
    echo "</tr>";
}
echo "</table>";
?>
```

### Fungsi Aggregate

| Fungsi | Deskripsi |
|--------|-----------|
| `COUNT(*)` | Menghitung jumlah baris |
| `SUM(kolom)` | Menjumlahkan nilai kolom |
| `AVG(kolom)` | Menghitung rata-rata |
| `MAX(kolom)` | Mencari nilai tertinggi |
| `MIN(kolom)` | Mencari nilai terendah |

---

## 5. JOIN - Menggabungkan Tabel

```php
<?php
require_once 'config.php';

// Tampilkan nama siswa beserta nilainya
$query = "SELECT siswa.nama, siswa.kelas, mata_pelajaran.nama_mapel, nilai.nilai 
          FROM nilai 
          INNER JOIN siswa ON nilai.siswa_id = siswa.id 
          INNER JOIN mata_pelajaran ON nilai.mapel_id = mata_pelajaran.id 
          ORDER BY nilai.nilai DESC";

$result = mysqli_query($conn, $query);

echo "<h3>Rekap Nilai Siswa</h3>";
echo "<table border='1'>";
echo "<tr><th>Nama</th><th>Kelas</th><th>Mata Pelajaran</th><th>Nilai</th></tr>";

while ($row = mysqli_fetch_assoc($result)) {
    echo "<tr>";
    echo "<td>" . htmlspecialchars($row['nama']) . "</td>";
    echo "<td>" . htmlspecialchars($row['kelas']) . "</td>";
    echo "<td>" . htmlspecialchars($row['nama_mapel']) . "</td>";
    echo "<td>" . $row['nilai'] . "</td>";
    echo "</tr>";
}
echo "</table>";
?>
```

### Jenis JOIN

| JOIN | Keterangan |
|------|------------|
| `INNER JOIN` | Hanya baris yang cocok di kedua tabel |
| `LEFT JOIN` | Semua baris dari tabel kiri + yang cocok dari kanan |
| `RIGHT JOIN` | Semua baris dari tabel kanan + yang cocok dari kiri |
| `FULL JOIN` | Semua baris dari kedua tabel |

---

## Kesimpulan

Pada pertemuan ini kamu telah mempelajari:

1. **SELECT** - Mengambil data dari database
2. **WHERE** - Memfilter data berdasarkan kondisi
3. **ORDER BY** - Mengurutkan data
4. **LIMIT & OFFSET** - Pagination
5. **Aggregate Functions** - COUNT, SUM, AVG, MAX, MIN
6. **GROUP BY** - Mengelompokkan data
7. **JOIN** - Menggabungkan tabel

**Tips:**
- Selalu gunakan `mysqli_fetch_assoc()` untuk kemudahan akses via nama kolom
- Gunakan `htmlspecialchars()` saat menampilkan data ke HTML
- Gunakan `mysqli_real_escape_string()` atau prepared statements untuk keamanan
- Gunakan `LIMIT` untuk performa saat data banyak

Selanjutnya pada pertemuan 12 kita akan mempelajari cara **mengubah dan menghapus data** dari database!
