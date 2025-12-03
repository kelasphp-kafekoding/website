# Operator pada PHP

![PHP Operators](https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop)

## Apa itu Operator?

Operator adalah simbol yang digunakan untuk melakukan operasi pada variabel dan nilai.

## 1. Operator Aritmatika

Digunakan untuk operasi matematika dasar.

| Operator | Nama | Contoh | Hasil |
|----------|------|--------|-------|
| `+` | Penjumlahan | `$a + $b` | Jumlah dari $a dan $b |
| `-` | Pengurangan | `$a - $b` | Selisih dari $a dan $b |
| `*` | Perkalian | `$a * $b` | Hasil kali $a dan $b |
| `/` | Pembagian | `$a / $b` | Hasil bagi $a dan $b |
| `%` | Modulus | `$a % $b` | Sisa bagi $a dan $b |
| `**` | Pangkat | `$a ** $b` | $a pangkat $b |

### Contoh:

```php
<?php
$a = 10;
$b = 3;

echo $a + $b;  // 13
echo $a - $b;  // 7
echo $a * $b;  // 30
echo $a / $b;  // 3.333...
echo $a % $b;  // 1 (sisa bagi)
echo $a ** $b; // 1000 (10 pangkat 3)

// Contoh praktis
$harga = 50000;
$jumlah = 3;
$total = $harga * $jumlah;
echo "Total: Rp " . $total; // Total: Rp 150000
?>
```

## 2. Operator Penugasan (Assignment)

Digunakan untuk memberikan nilai ke variabel.

| Operator | Contoh | Sama dengan |
|----------|--------|-------------|
| `=` | `$a = 5` | $a = 5 |
| `+=` | `$a += 3` | $a = $a + 3 |
| `-=` | `$a -= 3` | $a = $a - 3 |
| `*=` | `$a *= 3` | $a = $a * 3 |
| `/=` | `$a /= 3` | $a = $a / 3 |
| `%=` | `$a %= 3` | $a = $a % 3 |
| `.=` | `$a .= "text"` | $a = $a . "text" |

### Contoh:

```php
<?php
$nilai = 10;

$nilai += 5;  // $nilai = 10 + 5 = 15
echo $nilai;  // 15

$nilai -= 3;  // $nilai = 15 - 3 = 12
echo $nilai;  // 12

$nilai *= 2;  // $nilai = 12 * 2 = 24
echo $nilai;  // 24

$nilai /= 4;  // $nilai = 24 / 4 = 6
echo $nilai;  // 6

// String concatenation assignment
$nama = "Kafe";
$nama .= "koding";
echo $nama; // Kafekoding
?>
```

## 3. Operator String

Digunakan untuk menggabungkan string.

| Operator | Nama | Contoh |
|----------|------|--------|
| `.` | Concatenation | `$a . $b` |
| `.=` | Concatenation assignment | `$a .= $b` |

### Contoh:

```php
<?php
$firstName = "Kafe";
$lastName = "koding";

// Concatenation
$fullName = $firstName . $lastName;
echo $fullName; // Kafekoding

// Dengan spasi
$fullName = $firstName . " " . $lastName;
echo $fullName; // Kafe koding

// Concatenation assignment
$greeting = "Hello ";
$greeting .= "World";
echo $greeting; // Hello World

// Contoh praktis
$nama = "Budi";
$kelas = "PHP";
$pesan = "Selamat datang " . $nama . " di kelas " . $kelas . "!";
echo $pesan; // Selamat datang Budi di kelas PHP!
?>
```

## 4. Operator Perbandingan

Digunakan untuk membandingkan dua nilai.

| Operator | Nama | Contoh | Hasil |
|----------|------|--------|-------|
| `==` | Sama dengan | `$a == $b` | True jika $a sama dengan $b |
| `===` | Identik | `$a === $b` | True jika $a sama dengan $b dan tipe data sama |
| `!=` | Tidak sama | `$a != $b` | True jika $a tidak sama dengan $b |
| `!==` | Tidak identik | `$a !== $b` | True jika $a tidak sama dengan $b atau tipe data berbeda |
| `>` | Lebih besar | `$a > $b` | True jika $a lebih besar dari $b |
| `<` | Lebih kecil | `$a < $b` | True jika $a lebih kecil dari $b |
| `>=` | Lebih besar sama dengan | `$a >= $b` | True jika $a lebih besar atau sama dengan $b |
| `<=` | Lebih kecil sama dengan | `$a <= $b` | True jika $a lebih kecil atau sama dengan $b |

### Contoh:

```php
<?php
$a = 10;
$b = "10";
$c = 20;

// Perbandingan nilai
var_dump($a == $b);  // true (nilai sama)
var_dump($a === $b); // false (tipe data berbeda)
var_dump($a != $c);  // true (10 tidak sama dengan 20)
var_dump($a !== $b); // true (tipe data berbeda)

// Perbandingan angka
var_dump($a > 5);    // true
var_dump($a < 20);   // true
var_dump($a >= 10);  // true
var_dump($a <= 10);  // true

// Contoh praktis
$umur = 18;
if ($umur >= 17) {
    echo "Anda sudah dewasa";
} else {
    echo "Anda masih anak-anak";
}
?>
```

## 5. Operator Logika

Digunakan untuk menggabungkan kondisi.

| Operator | Nama | Contoh | Hasil |
|----------|------|--------|-------|
| `&&` atau `and` | AND | `$a && $b` | True jika $a dan $b true |
| `\|\|` atau `or` | OR | `$a \|\| $b` | True jika salah satu true |
| `!` | NOT | `!$a` | True jika $a false |
| `xor` | XOR | `$a xor $b` | True jika salah satu true, tapi tidak keduanya |

### Contoh:

```php
<?php
$umur = 20;
$punyaKTP = true;

// AND - kedua kondisi harus true
if ($umur >= 17 && $punyaKTP) {
    echo "Boleh membuat SIM";
}

// OR - salah satu kondisi true
$isWeekend = true;
$isHoliday = false;

if ($isWeekend || $isHoliday) {
    echo "Hari libur!";
}

// NOT - membalik nilai boolean
$login = false;
if (!$login) {
    echo "Silakan login terlebih dahulu";
}

// XOR - salah satu true, tapi tidak keduanya
$pagi = true;
$malam = false;

if ($pagi xor $malam) {
    echo "Salah satu waktu aktif";
}
?>
```

## 6. Operator Increment & Decrement

Digunakan untuk menambah atau mengurangi nilai variabel sebesar 1.

| Operator | Nama | Contoh | Hasil |
|----------|------|--------|-------|
| `++$a` | Pre-increment | `++$a` | Tambah $a dulu, lalu return |
| `$a++` | Post-increment | `$a++` | Return $a dulu, lalu tambah |
| `--$a` | Pre-decrement | `--$a` | Kurangi $a dulu, lalu return |
| `$a--` | Post-decrement | `$a--` | Return $a dulu, lalu kurangi |

### Contoh:

```php
<?php
$a = 5;

echo ++$a; // 6 (tambah dulu, lalu tampilkan)
echo $a;   // 6

$b = 5;
echo $b++; // 5 (tampilkan dulu, lalu tambah)
echo $b;   // 6

// Contoh praktis: counter
$counter = 0;
$counter++; // 1
$counter++; // 2
$counter++; // 3
echo "Total klik: $counter"; // Total klik: 3
?>
```

## 7. Operator Ternary

Shorthand untuk if-else sederhana.

```php
<?php
// Sintaks: (kondisi) ? nilai_jika_true : nilai_jika_false

$umur = 20;
$status = ($umur >= 17) ? "Dewasa" : "Anak-anak";
echo $status; // Dewasa

// Contoh lain
$nilai = 85;
$grade = ($nilai >= 75) ? "Lulus" : "Tidak Lulus";
echo $grade; // Lulus

// Nested ternary
$score = 85;
$hasil = ($score >= 90) ? "A" : (($score >= 75) ? "B" : "C");
echo $hasil; // B
?>
```

## 8. Operator Null Coalescing

Digunakan untuk memberikan nilai default jika variabel null atau tidak ada.

```php
<?php
// Sintaks: $var ?? 'default'

$nama = null;
echo $nama ?? "Guest"; // Guest

$username = "Budi";
echo $username ?? "Guest"; // Budi

// Contoh praktis dengan $_GET
$page = $_GET['page'] ?? 'home';
echo $page; // 'home' jika $_GET['page'] tidak ada

// Chain null coalescing
$a = null;
$b = null;
$c = "Kafekoding";
echo $a ?? $b ?? $c ?? "Default"; // Kafekoding
?>
```

## Latihan

```php
<?php
// Hitung total belanja dengan diskon
$hargaBarang = 100000;
$jumlah = 3;
$diskon = 10; // persen

$subtotal = $hargaBarang * $jumlah;
$potongan = $subtotal * ($diskon / 100);
$total = $subtotal - $potongan;

echo "Subtotal: Rp " . number_format($subtotal, 0, ',', '.') . "<br>";
echo "Diskon ($diskon%): Rp " . number_format($potongan, 0, ',', '.') . "<br>";
echo "Total: Rp " . number_format($total, 0, ',', '.') . "<br>";

// Output:
// Subtotal: Rp 300.000
// Diskon (10%): Rp 30.000
// Total: Rp 270.000
?>
```

## Kesimpulan

Anda telah mempelajari berbagai operator di PHP:
- Operator Aritmatika
- Operator Penugasan
- Operator String
- Operator Perbandingan
- Operator Logika
- Dan operator lainnya

Selanjutnya kita akan belajar tentang Control Flow (percabangan dan perulangan)!
