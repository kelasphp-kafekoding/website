# Sintaks Dasar PHP

![PHP Syntax](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop)

## Struktur Dasar PHP

File PHP harus diawali dengan tag `<?php` dan diakhiri dengan `?>` (opsional jika hanya berisi kode PHP).

```php
<?php
// Kode PHP di sini
?>
```

## ⚠️ Aturan Penting dalam PHP

### 1. Setiap Statement Harus Diakhiri Titik Koma (;)

```php
<?php
// ✅ BENAR
echo "Hello World";
$nama = "Kafekoding";

// ❌ SALAH - Tidak ada titik koma
echo "Hello World"
$nama = "Kafekoding"
?>
```

### 2. PHP Case-Sensitive untuk Variabel

```php
<?php
$nama = "Kafekoding";
$Nama = "Kafe";
$NAMA = "Koding";

echo $nama;  // Kafekoding
echo $Nama;  // Kafe
echo $NAMA;  // Koding
// Ketiga variabel ini BERBEDA!
?>
```

### 3. PHP TIDAK Case-Sensitive untuk Function dan Class

```php
<?php
// Semua ini SAMA
ECHO "Hello";
Echo "Hello";
echo "Hello";

// Function juga tidak case-sensitive
STRLEN("test");
strlen("test");
StrLen("test");
?>
```

### 4. Variabel Harus Diawali dengan $

```php
<?php
// ✅ BENAR
$nama = "Kafekoding";
$_kota = "Padang";
$tahun2025 = 2025;

// ❌ SALAH
nama = "Kafekoding";      // Tidak ada $
$2tahun = 2025;           // Tidak boleh diawali angka
$nama-kelas = "PHP";      // Tidak boleh pakai dash (-)
$nama kelas = "PHP";      // Tidak boleh ada spasi
?>
```

### 5. String Harus Dalam Tanda Kutip

```php
<?php
// ✅ BENAR
$nama = "Kafekoding";     // Double quote
$kota = 'Padang';         // Single quote

// ❌ SALAH
$nama = Kafekoding;       // Tanpa kutip akan error
?>
```

### 6. Perbedaan Single Quote (') dan Double Quote (")

```php
<?php
$nama = "Kafekoding";

// Double quote - variabel di-parse
echo "Halo $nama";        // Output: Halo Kafekoding

// Single quote - variabel TIDAK di-parse
echo 'Halo $nama';        // Output: Halo $nama
?>
```

### 7. Tidak Boleh Ada Spasi dalam Nama Variabel

```php
<?php
// ✅ BENAR
$namaLengkap = "Kafekoding";
$nama_lengkap = "Kafekoding";
$namalengkap = "Kafekoding";

// ❌ SALAH
$nama lengkap = "Kafekoding";  // Ada spasi
?>
```

### 8. Hati-hati dengan Tanda Kutip dalam String

```php
<?php
// ✅ BENAR - Escape dengan backslash
$pesan = "Dia berkata \"Halo\"";
$pesan2 = 'It\'s a beautiful day';

// ✅ BENAR - Gunakan kutip berbeda
$pesan3 = "It's a beautiful day";
$pesan4 = 'Dia berkata "Halo"';

// ❌ SALAH
$pesan5 = "Dia berkata "Halo"";  // Error: kutip tidak di-escape
?>
```

### 9. Perhatikan Penulisan Tag PHP

```php
// ✅ BENAR
<?php
echo "Hello";
?>

// ❌ SALAH
<php
echo "Hello";
?>

// ❌ SALAH
<?
echo "Hello";
?>
// Tag pendek <? tidak direkomendasikan
```

### 10. Jangan Lupa Closing Tag untuk File Mixed (HTML + PHP)

```php
<!-- ✅ BENAR untuk file mixed -->
<!DOCTYPE html>
<html>
<body>
<?php
echo "Hello";
?>
<p>HTML content</p>
</body>
</html>

<!-- ✅ BENAR untuk file PHP only (tanpa closing tag) -->
<?php
echo "Hello";
// Tidak perlu ?>
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
$_alamat = "padang";
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
$kota = "Padang";
$tahunDidirikan = 2013;
$slogan = "Kami memilih turun tangan";

echo "Selamat datang di $nama!<br>";
echo "Lokasi: $kota<br>";
echo "Didirikan: $tahunDidirikan<br>";
echo "Slogan: $slogan";
?>
```

Output:
```
Selamat datang di Kafekoding!
Lokasi: Padang
Didirikan: 2013
Slogan: Kami memilih turun tangan
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

### 5. NULL

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

### 3. var_dump()
Menampilkan tipe data dan nilai:

```php
<?php
$nama = "Kafekoding";
var_dump($nama);
// Output: string(10) "Kafekoding"
?>
```

## Contoh Program Lengkap: Biodata Sederhana

```php
<?php
echo "BIODATA DIRI <br><br>";

$nama = "M. Rifaldo Saputra";
$umur = 20;
$asal = "Padang";
$hobi = "Ngoding";

echo "Nama : $nama <br>";
echo "Umur : $umur tahun <br>";
echo "Asal : $asal <br>";
echo "Hobi : $hobi";
?>
```

**Output yang dihasilkan:**
```
BIODATA DIRI

Nama : M. RIfaldo Saputra
Umur : 20 tahun
Asal : Padang
Hobi : Ngoding
```

### Penjelasan Kode:
1. `echo "BIODATA DIRI <br><br>";` - Menampilkan judul dengan 2 baris kosong
2. `$nama = "M. Rifaldo Saputra";` - Menyimpan nama dalam variabel
3. `$umur = 20;` - Menyimpan umur (tipe data integer)
4. `$asal = "Padang";` - Menyimpan asal kota
5. `$hobi = "Ngoding";` - Menyimpan hobi
6. `echo "Nama : $nama <br>";` - Menampilkan nama dengan variabel di dalam string
7. Tag `<br>` digunakan untuk membuat baris baru di HTML

## Kesimpulan

Anda telah mempelajari sintaks dasar PHP meliputi:
- Struktur dasar PHP
- Variabel dan tipe data
- Konversi tipe data
- Cara menampilkan output

Selanjutnya kita akan belajar tentang operator di PHP!
