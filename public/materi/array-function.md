# Array di PHP

## Apa itu Array?

Array adalah **wadah yang bisa menyimpan banyak data sekaligus** dalam satu variabel.

### Analogi
Bayangkan array seperti **rak buku**:
- Setiap buku punya **nomor rak** (indeks)
- Nomor rak dimulai dari **0** (bukan 1)
- Kamu bisa ambil buku dengan menyebut nomor raknya

## Penjelasan Kode array.php

### 1. Membuat Array
```php
$sahabat = ["Arief", "Sefira", "Asria", "Kamila", "Avin", "Syarla", "Marsya"];
```
Array `$sahabat` berisi 7 nama dengan indeks 0-6.

### 2. Mengakses Elemen Array
```php
echo $sahabat[4]; // Output: Avin
```
Mengambil data di indeks 4 (elemen ke-5).

### 3. Array Push - Menambah di Akhir
```php
array_push($sahabat, "silvi");
```
Menambahkan "silvi" ke akhir array (indeks 7).

**Analogi**: Menambah buku baru di rak paling belakang.

### 4. Menampilkan Elemen Baru
```php
echo $sahabat[7]; // Output: silvi
```
Akses elemen yang baru ditambahkan.

### 5. Array Pop - Menghapus dari Akhir
```php
array_pop($sahabat);
```
Menghapus elemen terakhir ("silvi" dihapus).

**Analogi**: Mengambil buku paling belakang dari rak.

### 6. Push Lagi
```php
array_push($sahabat, "dimas");
echo $sahabat[7]; // Output: dimas
```
Tambah "dimas" di akhir, sekarang indeks 7 berisi "dimas".

### 7. Lihat Semua Isi Array
```php
print_r($sahabat);
```
Menampilkan seluruh isi array.

## Poin Penting Array

- Array dimulai dari indeks **0**
- **array_push()** menambah di akhir
- **array_pop()** menghapus dari akhir
- Setelah pop, indeks yang dihapus bisa diisi lagi dengan push
- **print_r()** untuk melihat isi array lengkap

---

# Function di PHP

## Apa itu Function?

Function adalah **blok kode yang bisa dipakai berulang kali** tanpa perlu menulis ulang kodenya.

### Analogi
Bayangkan function seperti **mesin kopi**:
- Kamu masukkan **bahan** (parameter)
- Mesin memproses
- Keluar **hasil** (return value)

## Penjelasan Kode function.php

### 1. Membuat Function
```php
function contohFunction($nilai1, $nilai2) {
    $hasil = $nilai1 + $nilai2;
    return $hasil;
}
```

**Penjelasan:**
- `function contohFunction` = nama function
- `($nilai1, $nilai2)` = parameter (input)
- `$hasil = $nilai1 + $nilai2` = proses penjumlahan
- `return $hasil` = mengembalikan hasil

### 2. Memanggil Function
```php
echo "Hasil: " . contohFunction(5, 3);
```

**Penjelasan:**
- `contohFunction(5, 3)` = panggil function dengan input 5 dan 3
- Function menghitung: 5 + 3 = 8
- Output: **Hasil: 8**

### Cara Kerja:
1. Function menerima 2 angka (5 dan 3)
2. Menjumlahkan kedua angka
3. Mengembalikan hasilnya (8)
4. Hasil ditampilkan dengan `echo`

## Poin Penting Function

- Function membuat kode lebih **rapi** dan **reusable**
- **Parameter** = input yang dikirim ke function ($nilai1, $nilai2)
- **Return** = output yang dikembalikan function
- Function bisa dipanggil berkali-kali dengan input berbeda
- Contoh: `contohFunction(10, 20)` akan menghasilkan 30
