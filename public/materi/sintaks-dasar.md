# Sintaks Dasar PHP

![PHP Syntax](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop)

## Struktur Dasar PHP

File PHP harus diawali dengan tag `<?php` dan diakhiri dengan `?>` (opsional jika hanya berisi kode PHP).

```php
<?php
// Kode PHP di sini
?>
```

## Hello Kafekoding!

Mari kita buat program pertama untuk menampilkan "Hello Kafekoding!":

```php
<?php
echo "Hello Kafekoding!";
?>
```

### Cara Menjalankan:
1. Simpan file sebagai `hello.php` di folder `htdocs`
2. Buka browser: `http://localhost/hello.php`
3. Anda akan melihat: **Hello Kafekoding!**

## Komentar

Komentar digunakan untuk dokumentasi dan tidak akan dieksekusi.

```php
<?php
// Ini komentar satu baris

# Ini juga komentar satu baris

/*
   Ini komentar
   multi baris
*/

echo "Hello!"; // Komentar di akhir baris
?>
```

## Variabel

Variabel di PHP diawali dengan tanda `$` dan bersifat case-sensitive.

### Aturan Penamaan Variabel:
- Harus diawali dengan huruf atau underscore `_`
- Tidak boleh diawali dengan angka
- Hanya boleh berisi huruf, angka, dan underscore
- Case-sensitive (`$nama` berbeda dengan `$Nama`)

```php
<?php
// Variabel yang valid
$nama = "Kafekoding";
$umur = 5;
$_alamat = "Jakarta";
$nama2 = "Kafe";

// Variabel yang tidak valid
// $2nama = "Error"; // Tidak boleh diawali angka
// $nama-kafe = "Error"; // Tidak boleh pakai dash
?>
```

### Contoh Penggunaan Variabel:

```php
<?php
$nama = "Kafekoding";
$tahun = 2020;
$slogan = "Belajar PHP dengan Menyenangkan";

echo "Selamat datang di $nama!<br>";
echo "Didirikan tahun $tahun<br>";
echo $slogan;
?>
```

Output:
```
Selamat datang di Kafekoding!
Didirikan tahun 2020
Belajar PHP dengan Menyenangkan
```

## Tipe Data

PHP mendukung berbagai tipe data:

### 1. String (Teks)

```php
<?php
$nama = "Kafekoding";
$alamat = 'Jakarta Selatan';

// String dengan variabel
$pesan = "Halo, $nama!"; // Output: Halo, Kafekoding!
$pesan2 = 'Halo, $nama!'; // Output: Halo, $nama! (tidak di-parse)

// Concatenation (menggabungkan string)
$fullName = "Kafe" . "koding"; // Kafekoding
$greeting = "Hello " . $nama . "!"; // Hello Kafekoding!
?>
```

### 2. Integer (Bilangan Bulat)

```php
<?php
$umur = 25;
$tahun = 2024;
$negatif = -10;

echo $umur; // 25
?>
```

### 3. Float (Bilangan Desimal)

```php
<?php
$harga = 99.99;
$pi = 3.14159;
$suhu = -5.5;

echo $harga; // 99.99
?>
```

### 4. Boolean (True/False)

```php
<?php
$aktif = true;
$login = false;

if ($aktif) {
    echo "Status: Aktif";
}
?>
```

### 5. Array (Kumpulan Data)

```php
<?php
// Array indexed
$buah = array("Apel", "Jeruk", "Mangga");
// atau
$buah = ["Apel", "Jeruk", "Mangga"];

echo $buah[0]; // Apel
echo $buah[1]; // Jeruk

// Array associative
$siswa = [
    "nama" => "Budi",
    "umur" => 20,
    "kelas" => "PHP"
];

echo $siswa["nama"]; // Budi
?>
```

### 6. NULL

```php
<?php
$kosong = null;

if ($kosong === null) {
    echo "Variabel kosong";
}
?>
```

## Cek Tipe Data

Gunakan fungsi `var_dump()` atau `gettype()`:

```php
<?php
$nama = "Kafekoding";
$umur = 25;
$harga = 99.99;
$aktif = true;

var_dump($nama);  // string(10) "Kafekoding"
var_dump($umur);  // int(25)
var_dump($harga); // float(99.99)
var_dump($aktif); // bool(true)

echo gettype($nama); // string
?>
```

## Konversi Tipe Data (Type Casting)

```php
<?php
// String ke Integer
$angka = "123";
$int = (int)$angka;
echo $int; // 123

// Integer ke String
$umur = 25;
$str = (string)$umur;
echo $str; // "25"

// String ke Float
$harga = "99.99";
$float = (float)$harga;
echo $float; // 99.99

// Ke Boolean
$nilai = 1;
$bool = (bool)$nilai;
var_dump($bool); // bool(true)
?>
```

## Konstanta

Konstanta adalah variabel yang nilainya tidak bisa diubah.

```php
<?php
// Cara 1: menggunakan define()
define("NAMA_SITUS", "Kafekoding");
define("TAHUN", 2020);

echo NAMA_SITUS; // Kafekoding
echo TAHUN; // 2020

// Cara 2: menggunakan const
const PI = 3.14159;
const VERSI = "1.0.0";

echo PI; // 3.14159
?>
```

## Output

### 1. echo
Menampilkan satu atau lebih string:

```php
<?php
echo "Hello";
echo "Hello", " ", "World"; // Hello World
echo "Nilai: " . 100;
?>
```

### 2. print
Mirip dengan echo, tapi hanya bisa satu argumen:

```php
<?php
print "Hello World";
print "Nilai: " . 100;
?>
```

### 3. print_r()
Menampilkan informasi variabel (bagus untuk array):

```php
<?php
$buah = ["Apel", "Jeruk", "Mangga"];
print_r($buah);
// Output: Array ( [0] => Apel [1] => Jeruk [2] => Mangga )
?>
```

### 4. var_dump()
Menampilkan tipe data dan nilai:

```php
<?php
$nama = "Kafekoding";
var_dump($nama);
// Output: string(10) "Kafekoding"
?>
```

## Contoh Program Lengkap

```php
<?php
// Deklarasi variabel
$namaKelas = "Kelas PHP Kafekoding";
$jumlahPeserta = 50;
$hargaKelas = 150000.00;
$tersedia = true;

// Menampilkan informasi
echo "<h1>$namaKelas</h1>";
echo "<p>Jumlah Peserta: $jumlahPeserta orang</p>";
echo "<p>Harga: Rp " . number_format($hargaKelas, 0, ',', '.') . "</p>";

if ($tersedia) {
    echo "<p style='color: green;'>Status: Tersedia</p>";
} else {
    echo "<p style='color: red;'>Status: Penuh</p>";
}

// Array materi
$materi = [
    "Pengenalan PHP",
    "Sintaks Dasar",
    "Control Flow",
    "Function",
    "Database"
];

echo "<h3>Materi yang Dipelajari:</h3>";
echo "<ul>";
foreach ($materi as $item) {
    echo "<li>$item</li>";
}
echo "</ul>";
?>
```

## Kesimpulan

Anda telah mempelajari sintaks dasar PHP meliputi:
- Struktur dasar PHP
- Variabel dan tipe data
- Konstanta
- Cara menampilkan output

Selanjutnya kita akan belajar tentang operator di PHP!
