# Control Flow: Perulangan (Looping)

![Looping PHP](https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop)

## Apa itu Perulangan?

**Perulangan (looping)** adalah mekanisme yang memungkinkan kita menjalankan blok kode yang sama **secara berulang-ulang** sampai kondisi tertentu terpenuhi. Tanpa perulangan, kita harus menulis kode yang sama berulang kali secara manual.

### Analogi

Bayangkan kamu diminta menulis angka 1 sampai 100. Tanpa loop, kamu harus menulis `echo 1;`, `echo 2;`, ..., `echo 100;` sebanyak 100 baris. Dengan loop, cukup 3 baris kode!

---

## 1. FOR Loop

Perulangan `for` digunakan ketika kita **sudah tahu jumlah pengulangan** yang dibutuhkan.

### Struktur

```php
for (inisialisasi; kondisi; increment) {
    // kode yang diulang
}
```

| Bagian | Fungsi | Contoh |
|--------|--------|--------|
| Inisialisasi | Menentukan nilai awal variabel penghitung | `$i = 1` |
| Kondisi | Menentukan kapan loop berhenti | `$i <= 10` |
| Increment | Mengubah nilai variabel setiap iterasi | `$i++` |

### Cara Kerja

1. **Inisialisasi** dijalankan sekali di awal
2. **Kondisi** dicek — jika `true`, blok kode dijalankan
3. Setelah blok kode selesai, **increment** dijalankan
4. Kembali ke langkah 2

### Contoh

```php
<?php
// Menampilkan angka 1 sampai 10
for ($i = 1; $i <= 10; $i++) {
    echo "Angka ke-$i<br>";
}

// Menampilkan bilangan genap 2-20
for ($i = 2; $i <= 20; $i += 2) {
    echo "$i ";
}
// Output: 2 4 6 8 10 12 14 16 18 20

// Countdown dari 5 ke 1
for ($i = 5; $i >= 1; $i--) {
    echo "$i ";
}
// Output: 5 4 3 2 1
?>
```

---

## 2. WHILE Loop

Perulangan `while` digunakan ketika kita **tidak tahu pasti jumlah pengulangan**, tetapi tahu **kondisi berhentinya**.

### Struktur

```php
while (kondisi) {
    // kode yang diulang
}
```

### Perbedaan dengan FOR

- **FOR** → inisialisasi, kondisi, dan increment dalam satu baris
- **WHILE** → hanya ada kondisi, inisialisasi dan increment harus ditulis terpisah

### Contoh

```php
<?php
// Menghitung nilai rata-rata
$nilai = [80, 90, 75, 85, 95];
$total = 0;
$i = 0;

while ($i < count($nilai)) {
    $total += $nilai[$i];
    $i++;
}

$rata = $total / count($nilai);
echo "Total: $total<br>";
echo "Rata-rata: $rata";
// Output: Total: 425, Rata-rata: 85

// Loop dengan kondisi eksternal
$password = "rahasia";
$input = "";
$percobaan = 0;

do {
    $input = "rahasia"; // simulasi input user
    $percobaan++;
    
    if ($input == $password) {
        echo "Login berhasil! (percobaan ke-$percobaan)";
    }
} while ($input != $password && $percobaan < 3);
?>
```

---

## 3. DO-WHILE Loop

Sama seperti `while`, tetapi **kode dijalankan minimal satu kali** meskipun kondisi sudah `false` dari awal.

### Struktur

```php
do {
    // kode yang diulang
} while (kondisi);
```

### Perbedaan WHILE vs DO-WHILE

| Fitur | WHILE | DO-WHILE |
|-------|-------|----------|
| Cek kondisi | Di awal (sebelum eksekusi) | Di akhir (setelah eksekusi) |
| Minimal eksekusi | 0 kali (jika kondisi false) | 1 kali (selalu dieksekusi dulu) |
| Cocok untuk | Loop dengan kondisi awal | Input berulang (menu, login) |

### Contoh

```php
<?php
// WHILE: tidak dijalankan jika kondisi false dari awal
$i = 10;
while ($i < 5) {
    echo "Ini tidak akan tampil";
}
// Tidak ada output

// DO-WHILE: dijalankan minimal 1x
$i = 10;
do {
    echo "Ini tampil sekali: $i";
} while ($i < 5);
// Output: Ini tampil sekali: 10

// Menu interaktif (simulasi)
$pilihan = "4"; // simulasi: user pilih keluar
do {
    echo "=== MENU ===<br>";
    echo "1. Tambah Data<br>";
    echo "2. Lihat Data<br>";
    echo "3. Hapus Data<br>";
    echo "4. Keluar<br>";
    
    if ($pilihan == "1") echo "Tambah data diproses<br>";
    if ($pilihan == "2") echo "Data ditampilkan<br>";
    if ($pilihan == "3") echo "Data dihapus<br>";
    
    echo "Pilihan: $pilihan<br>";
} while ($pilihan != "4");
?>
```

---

## 4. FOREACH Loop

Khusus untuk iterasi **array**. Sangat berguna saat memproses data dari database atau form.

### Struktur

```php
// Tanpa key
foreach ($array as $value) {
    // kode
}

// Dengan key
foreach ($array as $key => $value) {
    // kode
}
```

### Contoh

```php
<?php
// Array biasa
$buah = ["Apel", "Jeruk", "Mangga", "Pisang"];

foreach ($buah as $item) {
    echo "Buah: $item<br>";
}

// Array dengan index
foreach ($buah as $index => $item) {
    echo "Buah ke-" . ($index + 1) . ": $item<br>";
}

// Array asosiatif (seperti data dari database)
$siswa = [
    ["nama" => "Arief", "nilai" => 85],
    ["nama" => "Sefira", "nilai" => 90],
    ["nama" => "Kamila", "nilai" => 78],
    ["nama" => "Asria", "nilai" => 92],
    ["nama" => "Avin", "nilai" => 88]
];

echo "<table border='1'>";
echo "<tr><th>No</th><th>Nama</th><th>Nilai</th><th>Grade</th></tr>";

$no = 1;
foreach ($siswa as $s) {
    $grade = $s["nilai"] >= 80 ? "A" : ($s["nilai"] >= 70 ? "B" : "C");
    echo "<tr>";
    echo "<td>$no</td>";
    echo "<td>{$s['nama']}</td>";
    echo "<td>{$s['nilai']}</td>";
    echo "<td>$grade</td>";
    echo "</tr>";
    $no++;
}
echo "</table>";
?>
```

---

## 5. Break dan Continue

Kontrol tambahan di dalam loop:

### BREAK
Menghentikan loop **sepenuhnya**.

```php
<?php
for ($i = 1; $i <= 10; $i++) {
    if ($i == 5) {
        break; // Hentikan loop saat i = 5
    }
    echo "$i ";
}
// Output: 1 2 3 4
?>
```

### CONTINUE
**Melewati** iterasi saat ini dan lanjut ke iterasi berikutnya.

```php
<?php
for ($i = 1; $i <= 10; $i++) {
    if ($i % 2 == 0) {
        continue; // Skip angka genap
    }
    echo "$i ";
}
// Output: 1 3 5 7 9
?>
```

---

## 6. Nested Loop

Loop di dalam loop — berguna untuk membuat pola atau tabel.

```php
<?php
// Tabel perkalian
echo "<h3>Tabel Perkalian</h3>";
for ($i = 1; $i <= 5; $i++) {
    for ($j = 1; $j <= 5; $j++) {
        echo ($i * $j) . "\t";
    }
    echo "<br>";
}

// Pola bintang segitiga
echo "<h3>Pola Segitiga</h3>";
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

---

## Latihan

### Latihan 1: Deret Fibonacci
Buatlah program yang menampilkan 10 bilangan Fibonacci pertama.

```php
<?php
$a = 0;
$b = 1;
echo "Deret Fibonacci:<br>";
for ($i = 0; $i < 10; $i++) {
    echo "$a ";
    $c = $a + $b;
    $a = $b;
    $b = $c;
}
// Output: 0 1 1 2 3 5 8 13 21 34
?>
```

### Latihan 2: Hitung Faktorial
Buatlah program yang menghitung faktorial dari sebuah angka.

```php
<?php
$n = 5;
$faktorial = 1;

for ($i = 1; $i <= $n; $i++) {
    $faktorial *= $i;
}

echo "Faktorial dari $n = $faktorial";
// Output: Faktorial dari 5 = 120
?>
```

---

## Kesimpulan

Pada pertemuan ini kamu telah mempelajari:

| Jenis Loop | Kapan Digunakan | Struktur |
|------------|----------------|----------|
| `for` | Jumlah iterasi sudah diketahui | `for (init; kondisi; increment)` |
| `while` | Jumlah iterasi tidak diketahui | `while (kondisi)` |
| `do-while` | Harus eksekusi minimal 1x | `do { ... } while (kondisi)` |
| `foreach` | Iterasi array | `foreach ($arr as $val)` |

**Tips:**
- Gunakan `for` untuk loop dengan jumlah pasti
- Gunakan `while` atau `do-while` untuk loop bersyarat
- Gunakan `foreach` untuk array
- Gunakan `break` untuk menghentikan loop
- Gunakan `continue` untuk skip iterasi

Selanjutnya kita akan belajar tentang **Function dan Array** pada pertemuan 7!
