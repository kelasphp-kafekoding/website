# Array dan Function PHP

![Array and Function](https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=400&fit=crop)

## PART 1: ARRAY

### Apa itu Array?

Array adalah variabel yang dapat menyimpan banyak nilai dalam satu variabel.

### 1. Array Indexed (Numeric Array)

Array dengan index berupa angka (dimulai dari 0).

```php
<?php
// Cara 1: menggunakan array()
$buah = array("Apel", "Jeruk", "Mangga");

// Cara 2: menggunakan []
$warna = ["Merah", "Hijau", "Biru"];

// Mengakses elemen
echo $buah[0]; // Apel
echo $buah[1]; // Jeruk
echo $buah[2]; // Mangga

// Mengubah nilai
$buah[1] = "Pisang";
echo $buah[1]; // Pisang

// Menambah elemen
$buah[] = "Durian"; // Ditambah di akhir
$buah[10] = "Semangka"; // Index spesifik
?>
```

### 2. Array Associative

Array dengan index berupa string (key-value pair).

```php
<?php
$siswa = [
    "nama" => "Budi Santoso",
    "umur" => 20,
    "kelas" => "PHP",
    "nilai" => 85
];

// Mengakses elemen
echo $siswa["nama"];  // Budi Santoso
echo $siswa["umur"];  // 20

// Mengubah nilai
$siswa["nilai"] = 90;

// Menambah elemen
$siswa["alamat"] = "Jakarta";
?>
```

### 3. Multidimensional Array

Array di dalam array.

```php
<?php
$mahasiswa = [
    [
        "nama" => "Budi",
        "umur" => 20,
        "nilai" => [85, 90, 78]
    ],
    [
        "nama" => "Ani",
        "umur" => 19,
        "nilai" => [92, 88, 95]
    ],
    [
        "nama" => "Citra",
        "umur" => 21,
        "nilai" => [78, 82, 80]
    ]
];

// Mengakses elemen
echo $mahasiswa[0]["nama"]; // Budi
echo $mahasiswa[1]["umur"]; // 19
echo $mahasiswa[0]["nilai"][0]; // 85

// Loop multidimensional array
foreach ($mahasiswa as $mhs) {
    echo "Nama: " . $mhs["nama"] . "<br>";
    echo "Umur: " . $mhs["umur"] . "<br>";
    echo "Nilai: " . implode(", ", $mhs["nilai"]) . "<br><br>";
}
?>
```

### Fungsi-fungsi Array

#### 1. count() - Menghitung jumlah elemen

```php
<?php
$buah = ["Apel", "Jeruk", "Mangga"];
echo count($buah); // 3
?>
```

#### 2. array_push() - Menambah elemen di akhir

```php
<?php
$buah = ["Apel", "Jeruk"];
array_push($buah, "Mangga", "Pisang");
print_r($buah); // ["Apel", "Jeruk", "Mangga", "Pisang"]
?>
```

#### 3. array_pop() - Menghapus elemen terakhir

```php
<?php
$buah = ["Apel", "Jeruk", "Mangga"];
$last = array_pop($buah);
echo $last; // Mangga
print_r($buah); // ["Apel", "Jeruk"]
?>
```

#### 4. array_shift() - Menghapus elemen pertama

```php
<?php
$buah = ["Apel", "Jeruk", "Mangga"];
$first = array_shift($buah);
echo $first; // Apel
print_r($buah); // ["Jeruk", "Mangga"]
?>
```

#### 5. array_unshift() - Menambah elemen di awal

```php
<?php
$buah = ["Jeruk", "Mangga"];
array_unshift($buah, "Apel");
print_r($buah); // ["Apel", "Jeruk", "Mangga"]
?>
```

#### 6. in_array() - Cek apakah nilai ada di array

```php
<?php
$buah = ["Apel", "Jeruk", "Mangga"];
if (in_array("Jeruk", $buah)) {
    echo "Jeruk ada di array";
}
?>
```

#### 7. array_search() - Cari index dari nilai

```php
<?php
$buah = ["Apel", "Jeruk", "Mangga"];
$index = array_search("Jeruk", $buah);
echo $index; // 1
?>
```

#### 8. sort() & rsort() - Mengurutkan array

```php
<?php
$angka = [5, 2, 8, 1, 9];

sort($angka); // Ascending
print_r($angka); // [1, 2, 5, 8, 9]

rsort($angka); // Descending
print_r($angka); // [9, 8, 5, 2, 1]
?>
```

#### 9. array_merge() - Menggabungkan array

```php
<?php
$arr1 = ["Apel", "Jeruk"];
$arr2 = ["Mangga", "Pisang"];
$result = array_merge($arr1, $arr2);
print_r($result); // ["Apel", "Jeruk", "Mangga", "Pisang"]
?>
```

#### 10. explode() & implode() - Konversi string <-> array

```php
<?php
// explode: string ke array
$str = "Apel,Jeruk,Mangga";
$arr = explode(",", $str);
print_r($arr); // ["Apel", "Jeruk", "Mangga"]

// implode: array ke string
$buah = ["Apel", "Jeruk", "Mangga"];
$str = implode(", ", $buah);
echo $str; // Apel, Jeruk, Mangga
?>
```

---

## PART 2: FUNCTION

### Apa itu Function?

Function adalah blok kode yang dapat digunakan berulang kali.

### 1. Function Dasar

```php
<?php
// Membuat function
function sapa() {
    echo "Halo, Selamat datang!";
}

// Memanggil function
sapa(); // Halo, Selamat datang!
?>
```

### 2. Function dengan Parameter

```php
<?php
function sapa($nama) {
    echo "Halo, $nama!";
}

sapa("Budi");    // Halo, Budi!
sapa("Ani");     // Halo, Ani!

// Multiple parameter
function perkenalan($nama, $umur) {
    echo "Nama saya $nama, umur $umur tahun";
}

perkenalan("Budi", 20); // Nama saya Budi, umur 20 tahun
?>
```

### 3. Function dengan Default Parameter

```php
<?php
function sapa($nama = "Tamu") {
    echo "Halo, $nama!";
}

sapa("Budi"); // Halo, Budi!
sapa();       // Halo, Tamu!

// Multiple default parameter
function buatProfil($nama, $umur = 18, $kota = "Jakarta") {
    echo "$nama, $umur tahun, dari $kota";
}

buatProfil("Budi");              // Budi, 18 tahun, dari Jakarta
buatProfil("Ani", 20);           // Ani, 20 tahun, dari Jakarta
buatProfil("Citra", 22, "Bandung"); // Citra, 22 tahun, dari Bandung
?>
```

### 4. Function dengan Return Value

```php
<?php
function tambah($a, $b) {
    return $a + $b;
}

$hasil = tambah(5, 3);
echo $hasil; // 8

// Return multiple values (menggunakan array)
function hitungLingkaran($radius) {
    $luas = 3.14 * $radius * $radius;
    $keliling = 2 * 3.14 * $radius;
    
    return [
        "luas" => $luas,
        "keliling" => $keliling
    ];
}

$hasil = hitungLingkaran(7);
echo "Luas: " . $hasil["luas"];
echo "Keliling: " . $hasil["keliling"];
?>
```

### 5. Function dengan Type Declaration

```php
<?php
// Parameter type
function tambah(int $a, int $b): int {
    return $a + $b;
}

echo tambah(5, 3); // 8

// String type
function sapa(string $nama): string {
    return "Halo, $nama!";
}

echo sapa("Budi"); // Halo, Budi!

// Array type
function hitungRata(array $nilai): float {
    $total = array_sum($nilai);
    return $total / count($nilai);
}

$nilai = [85, 90, 78, 92];
echo hitungRata($nilai); // 86.25
?>
```

### 6. Variable Scope

```php
<?php
// Global scope
$nama = "Budi";

function tampilNama() {
    global $nama; // Akses variabel global
    echo $nama;
}

tampilNama(); // Budi

// Local scope
function test() {
    $lokal = "Hanya di dalam function";
    echo $lokal;
}

test(); // Hanya di dalam function
// echo $lokal; // Error: undefined variable
?>
```

### 7. Anonymous Function (Closure)

```php
<?php
// Function tanpa nama
$sapa = function($nama) {
    return "Halo, $nama!";
};

echo $sapa("Budi"); // Halo, Budi!

// Sebagai callback
$angka = [1, 2, 3, 4, 5];
$kuadrat = array_map(function($n) {
    return $n * $n;
}, $angka);

print_r($kuadrat); // [1, 4, 9, 16, 25]
?>
```

### 8. Arrow Function (PHP 7.4+)

```php
<?php
// Sintaks lebih pendek
$tambah = fn($a, $b) => $a + $b;
echo $tambah(5, 3); // 8

// Dengan array_map
$angka = [1, 2, 3, 4, 5];
$kuadrat = array_map(fn($n) => $n * $n, $angka);
print_r($kuadrat); // [1, 4, 9, 16, 25]
?>
```

## Contoh Praktis

### 1. Sistem Penilaian

```php
<?php
function hitungGrade($nilai) {
    if ($nilai >= 90) return "A";
    elseif ($nilai >= 80) return "B";
    elseif ($nilai >= 70) return "C";
    elseif ($nilai >= 60) return "D";
    else return "E";
}

function hitungRataRata($nilai) {
    return array_sum($nilai) / count($nilai);
}

$siswa = [
    ["nama" => "Budi", "nilai" => [85, 90, 78]],
    ["nama" => "Ani", "nilai" => [92, 88, 95]],
    ["nama" => "Citra", "nilai" => [78, 82, 80]]
];

echo "<h3>Laporan Nilai</h3>";
echo "<table border='1' cellpadding='10'>";
echo "<tr><th>Nama</th><th>Nilai</th><th>Rata-rata</th><th>Grade</th></tr>";

foreach ($siswa as $s) {
    $rata = hitungRataRata($s["nilai"]);
    $grade = hitungGrade($rata);
    
    echo "<tr>";
    echo "<td>{$s['nama']}</td>";
    echo "<td>" . implode(", ", $s["nilai"]) . "</td>";
    echo "<td>" . number_format($rata, 2) . "</td>";
    echo "<td>$grade</td>";
    echo "</tr>";
}

echo "</table>";
?>
```

### 2. Kalkulator Sederhana

```php
<?php
function kalkulator($angka1, $operator, $angka2) {
    switch ($operator) {
        case '+':
            return $angka1 + $angka2;
        case '-':
            return $angka1 - $angka2;
        case '*':
            return $angka1 * $angka2;
        case '/':
            if ($angka2 == 0) {
                return "Error: Tidak bisa dibagi 0";
            }
            return $angka1 / $angka2;
        default:
            return "Operator tidak valid";
    }
}

echo kalkulator(10, '+', 5);  // 15
echo kalkulator(10, '-', 5);  // 5
echo kalkulator(10, '*', 5);  // 50
echo kalkulator(10, '/', 5);  // 2
echo kalkulator(10, '/', 0);  // Error: Tidak bisa dibagi 0
?>
```

### 3. Validasi Data

```php
<?php
function validasiEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function validasiPassword($password) {
    // Minimal 8 karakter
    if (strlen($password) < 8) {
        return false;
    }
    return true;
}

function validasiUsername($username) {
    // Hanya huruf, angka, dan underscore
    return preg_match('/^[a-zA-Z0-9_]+$/', $username);
}

// Test
$email = "budi@example.com";
$password = "rahasia123";
$username = "budi_123";

if (validasiEmail($email)) {
    echo "Email valid<br>";
}

if (validasiPassword($password)) {
    echo "Password valid<br>";
}

if (validasiUsername($username)) {
    echo "Username valid<br>";
}
?>
```

## Kesimpulan

Anda telah mempelajari:
- **Array**: indexed, associative, multidimensional
- **Fungsi Array**: count, push, pop, sort, merge, dll
- **Function**: dasar, parameter, return, type declaration
- **Advanced**: anonymous function, arrow function

Selanjutnya kita akan belajar membuat Form dengan Bootstrap 5!
