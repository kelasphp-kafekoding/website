# Control Flow PHP

![Control Flow](https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop)

## Apa itu Control Flow?

Control Flow adalah cara mengontrol alur eksekusi program. Ada dua jenis utama:
1. **Percabangan** (Conditional) - if, else, switch
2. **Perulangan** (Loop) - for, while, do-while, foreach

## Percabangan (Conditional Statements)

### 1. IF Statement

Menjalankan kode jika kondisi bernilai true.

```php
<?php
$umur = 20;

if ($umur >= 17) {
    echo "Anda sudah dewasa";
}
?>
```

### 2. IF-ELSE Statement

Menjalankan kode berbeda untuk kondisi true dan false.

```php
<?php
$nilai = 75;

if ($nilai >= 75) {
    echo "Lulus";
} else {
    echo "Tidak Lulus";
}
?>
```

### 3. IF-ELSEIF-ELSE Statement

Mengecek multiple kondisi.

```php
<?php
$nilai = 85;

if ($nilai >= 90) {
    echo "Grade: A";
} elseif ($nilai >= 80) {
    echo "Grade: B";
} elseif ($nilai >= 70) {
    echo "Grade: C";
} elseif ($nilai >= 60) {
    echo "Grade: D";
} else {
    echo "Grade: E";
}
?>
```

### 4. Nested IF

IF di dalam IF.

```php
<?php
$umur = 20;
$punyaKTP = true;

if ($umur >= 17) {
    if ($punyaKTP) {
        echo "Boleh membuat SIM";
    } else {
        echo "Buat KTP dulu";
    }
} else {
    echo "Umur belum cukup";
}
?>
```

### 5. SWITCH Statement

Alternatif untuk multiple if-elseif, lebih rapi untuk banyak kondisi.

```php
<?php
$hari = "Senin";

switch ($hari) {
    case "Senin":
        echo "Hari pertama kerja";
        break;
    case "Selasa":
    case "Rabu":
    case "Kamis":
        echo "Hari kerja biasa";
        break;
    case "Jumat":
        echo "Hari terakhir kerja";
        break;
    case "Sabtu":
    case "Minggu":
        echo "Hari libur";
        break;
    default:
        echo "Hari tidak valid";
}
?>
```

**Penting:** Jangan lupa `break` untuk menghentikan eksekusi!

### Contoh Praktis: Sistem Diskon

```php
<?php
$totalBelanja = 500000;
$member = true;

if ($member) {
    if ($totalBelanja >= 1000000) {
        $diskon = 20;
    } elseif ($totalBelanja >= 500000) {
        $diskon = 15;
    } else {
        $diskon = 10;
    }
} else {
    if ($totalBelanja >= 1000000) {
        $diskon = 10;
    } elseif ($totalBelanja >= 500000) {
        $diskon = 5;
    } else {
        $diskon = 0;
    }
}

$potongan = $totalBelanja * ($diskon / 100);
$bayar = $totalBelanja - $potongan;

echo "Total Belanja: Rp " . number_format($totalBelanja, 0, ',', '.') . "<br>";
echo "Diskon: $diskon%<br>";
echo "Potongan: Rp " . number_format($potongan, 0, ',', '.') . "<br>";
echo "Total Bayar: Rp " . number_format($bayar, 0, ',', '.') . "<br>";
?>
```

## Perulangan (Loop)

### 1. FOR Loop

Digunakan ketika jumlah iterasi sudah diketahui.

**Sintaks:**
```php
for (inisialisasi; kondisi; increment) {
    // kode yang diulang
}
```

**Contoh:**

```php
<?php
// Menampilkan angka 1-10
for ($i = 1; $i <= 10; $i++) {
    echo $i . " ";
}
// Output: 1 2 3 4 5 6 7 8 9 10

// Menampilkan angka genap
for ($i = 2; $i <= 20; $i += 2) {
    echo $i . " ";
}
// Output: 2 4 6 8 10 12 14 16 18 20

// Countdown
for ($i = 10; $i >= 1; $i--) {
    echo $i . " ";
}
// Output: 10 9 8 7 6 5 4 3 2 1
?>
```

### 2. WHILE Loop

Digunakan ketika jumlah iterasi tidak diketahui, bergantung pada kondisi.

**Sintaks:**
```php
while (kondisi) {
    // kode yang diulang
}
```

**Contoh:**

```php
<?php
// Menampilkan angka 1-5
$i = 1;
while ($i <= 5) {
    echo $i . " ";
    $i++;
}
// Output: 1 2 3 4 5

// Menghitung mundur
$countdown = 5;
while ($countdown > 0) {
    echo $countdown . " ";
    $countdown--;
}
echo "Go!";
// Output: 5 4 3 2 1 Go!

// Contoh praktis: validasi input
$password = "";
$attempt = 0;
while ($password != "rahasia" && $attempt < 3) {
    echo "Masukkan password: ";
    // $password = readline(); // untuk CLI
    $attempt++;
}
?>
```

### 3. DO-WHILE Loop

Mirip while, tapi kode dijalankan minimal 1 kali sebelum cek kondisi.

**Sintaks:**
```php
do {
    // kode yang diulang
} while (kondisi);
```

**Contoh:**

```php
<?php
// Perbedaan while vs do-while

// WHILE - tidak dijalankan jika kondisi false
$i = 10;
while ($i < 5) {
    echo $i; // Tidak tampil
}

// DO-WHILE - dijalankan minimal 1x
$i = 10;
do {
    echo $i; // Tampil: 10
} while ($i < 5);

// Contoh praktis: menu
do {
    echo "=== MENU ===\n";
    echo "1. Tambah Data\n";
    echo "2. Lihat Data\n";
    echo "3. Keluar\n";
    echo "Pilih: ";
    // $pilihan = readline();
    $pilihan = 3; // simulasi
} while ($pilihan != 3);
?>
```

### 4. FOREACH Loop

Khusus untuk iterasi array.

**Sintaks:**
```php
foreach ($array as $value) {
    // kode
}

// atau dengan key
foreach ($array as $key => $value) {
    // kode
}
```

**Contoh:**

```php
<?php
// Array indexed
$buah = ["Apel", "Jeruk", "Mangga", "Pisang"];

foreach ($buah as $item) {
    echo $item . "<br>";
}
// Output:
// Apel
// Jeruk
// Mangga
// Pisang

// Dengan index
foreach ($buah as $index => $item) {
    echo ($index + 1) . ". $item<br>";
}
// Output:
// 1. Apel
// 2. Jeruk
// 3. Mangga
// 4. Pisang

// Array associative
$siswa = [
    "nama" => "Budi",
    "umur" => 20,
    "kelas" => "PHP"
];

foreach ($siswa as $key => $value) {
    echo "$key: $value<br>";
}
// Output:
// nama: Budi
// umur: 20
// kelas: PHP
?>
```

## Break dan Continue

### BREAK
Menghentikan loop sepenuhnya.

```php
<?php
for ($i = 1; $i <= 10; $i++) {
    if ($i == 5) {
        break; // Stop di 5
    }
    echo $i . " ";
}
// Output: 1 2 3 4
?>
```

### CONTINUE
Melewati iterasi saat ini dan lanjut ke iterasi berikutnya.

```php
<?php
for ($i = 1; $i <= 10; $i++) {
    if ($i % 2 == 0) {
        continue; // Skip angka genap
    }
    echo $i . " ";
}
// Output: 1 3 5 7 9
?>
```

## Nested Loop

Loop di dalam loop.

```php
<?php
// Tabel perkalian
for ($i = 1; $i <= 5; $i++) {
    for ($j = 1; $j <= 5; $j++) {
        echo ($i * $j) . "\t";
    }
    echo "<br>";
}

// Output:
// 1  2  3  4  5
// 2  4  6  8  10
// 3  6  9  12 15
// 4  8  12 16 20
// 5  10 15 20 25

// Pola bintang
for ($i = 1; $i <= 5; $i++) {
    for ($j = 1; $j <= $i; $j++) {
        echo "* ";
    }
    echo "<br>";
}

// Output:
// *
// * *
// * * *
// * * * *
// * * * * *
?>
```

## Contoh Praktis

### 1. Daftar Produk dengan Harga

```php
<?php
$produk = [
    ["nama" => "Laptop", "harga" => 5000000],
    ["nama" => "Mouse", "harga" => 50000],
    ["nama" => "Keyboard", "harga" => 150000],
    ["nama" => "Monitor", "harga" => 2000000]
];

echo "<h3>Daftar Produk</h3>";
echo "<table border='1' cellpadding='10'>";
echo "<tr><th>No</th><th>Nama</th><th>Harga</th></tr>";

$no = 1;
foreach ($produk as $item) {
    echo "<tr>";
    echo "<td>$no</td>";
    echo "<td>{$item['nama']}</td>";
    echo "<td>Rp " . number_format($item['harga'], 0, ',', '.') . "</td>";
    echo "</tr>";
    $no++;
}

echo "</table>";
?>
```

### 2. Validasi Login (Simulasi)

```php
<?php
$username_benar = "admin";
$password_benar = "rahasia";
$max_attempt = 3;

for ($attempt = 1; $attempt <= $max_attempt; $attempt++) {
    echo "Percobaan ke-$attempt<br>";
    
    // Simulasi input
    $username = "admin";
    $password = ($attempt == 2) ? "rahasia" : "salah";
    
    if ($username == $username_benar && $password == $password_benar) {
        echo "Login berhasil!<br>";
        break;
    } else {
        echo "Username atau password salah!<br>";
        
        if ($attempt == $max_attempt) {
            echo "Akun diblokir!<br>";
        }
    }
}
?>
```

### 3. Hitung Rata-rata Nilai

```php
<?php
$nilai = [85, 90, 78, 92, 88];

$total = 0;
$jumlah = count($nilai);

foreach ($nilai as $n) {
    $total += $n;
}

$rata = $total / $jumlah;

echo "Nilai: " . implode(", ", $nilai) . "<br>";
echo "Total: $total<br>";
echo "Rata-rata: $rata<br>";

if ($rata >= 80) {
    echo "Predikat: Sangat Baik";
} elseif ($rata >= 70) {
    echo "Predikat: Baik";
} else {
    echo "Predikat: Cukup";
}
?>
```

## Kesimpulan

Anda telah mempelajari Control Flow di PHP:
- **Percabangan**: if, else, elseif, switch
- **Perulangan**: for, while, do-while, foreach
- **Kontrol**: break, continue
- **Nested**: loop di dalam loop

Selanjutnya kita akan belajar tentang Array dan Function!
