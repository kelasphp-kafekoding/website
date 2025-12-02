# Setup Environment PHP

![Setup Environment](https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=400&fit=crop)

## Apa yang Dibutuhkan?

Untuk mulai belajar PHP, Anda membutuhkan beberapa tools berikut:

### 1. Web Server
Web server diperlukan untuk menjalankan file PHP. Pilihan yang populer:
- **Apache** (paling umum)
- **Nginx** (lebih cepat)
- **Built-in PHP Server** (untuk development)

### 2. PHP Interpreter
PHP interpreter adalah program yang menjalankan kode PHP Anda.

### 3. Database (Opsional)
Untuk aplikasi yang membutuhkan penyimpanan data:
- **MySQL** / **MariaDB** (paling populer)
- **PostgreSQL**
- **SQLite**

### 4. Text Editor / IDE
Untuk menulis kode PHP:
- **VS Code** (gratis, recommended)
- **PHPStorm** (berbayar, fitur lengkap)
- **Sublime Text**
- **Notepad++**

## Cara Install PHP

### Opsi 1: XAMPP (Recommended untuk Pemula)

XAMPP adalah paket all-in-one yang berisi Apache, MySQL, dan PHP.

#### Langkah Instalasi XAMPP:

1. **Download XAMPP**
   - Kunjungi [https://www.apachefriends.org](https://www.apachefriends.org)
   - Download sesuai sistem operasi Anda

2. **Install XAMPP**
   - Jalankan installer
   - Pilih komponen: Apache, MySQL, PHP, phpMyAdmin
   - Pilih lokasi instalasi (default: C:\xampp)

3. **Jalankan XAMPP**
   - Buka XAMPP Control Panel
   - Start Apache dan MySQL
   - Cek di browser: `http://localhost`

4. **Lokasi File PHP**
   - Simpan file PHP di folder: `C:\xampp\htdocs\`
   - Contoh: `C:\xampp\htdocs\belajar\index.php`
   - Akses di browser: `http://localhost/belajar/index.php`

### Opsi 2: Laragon (Modern & Cepat)

Laragon adalah alternatif XAMPP yang lebih modern dan cepat.

#### Langkah Instalasi Laragon:

1. Download dari [https://laragon.org](https://laragon.org)
2. Install dengan default settings
3. Start All
4. File PHP disimpan di: `C:\laragon\www\`

### Opsi 3: Install Manual (Linux/Mac)

#### Ubuntu/Debian:
```bash
sudo apt update
sudo apt install apache2
sudo apt install php libapache2-mod-php
sudo apt install mysql-server
sudo systemctl restart apache2
```

#### macOS (dengan Homebrew):
```bash
brew install php
brew install mysql
brew services start php
brew services start mysql
```

### Opsi 4: PHP Built-in Server (Untuk Development)

PHP memiliki web server bawaan yang bisa digunakan untuk development:

```bash
php -S localhost:8000
```

Kemudian akses di browser: `http://localhost:8000`

## Verifikasi Instalasi

### 1. Cek Versi PHP

Buka terminal/command prompt dan jalankan:

```bash
php -v
```

Output:
```
PHP 8.2.0 (cli) (built: Dec  6 2022 15:31:23) (NTS)
Copyright (c) The PHP Group
Zend Engine v4.2.0, Copyright (c) Zend Technologies
```

### 2. Buat File Test

Buat file `info.php` di folder htdocs:

```php
<?php
phpinfo();
?>
```

Akses di browser: `http://localhost/info.php`

Anda akan melihat halaman dengan informasi lengkap tentang PHP.

## Konfigurasi PHP

File konfigurasi PHP berada di `php.ini`. Beberapa setting penting:

### Lokasi php.ini:
- XAMPP: `C:\xampp\php\php.ini`
- Laragon: `C:\laragon\bin\php\php-8.x\php.ini`
- Linux: `/etc/php/8.x/apache2/php.ini`

### Setting yang Sering Diubah:

```ini
; Maksimal ukuran file upload
upload_max_filesize = 20M
post_max_size = 20M

; Maksimal waktu eksekusi
max_execution_time = 300

; Menampilkan error (untuk development)
display_errors = On
error_reporting = E_ALL

; Timezone
date.timezone = Asia/Jakarta
```

Setelah mengubah `php.ini`, restart Apache.

## Tools Tambahan

### 1. Composer
Package manager untuk PHP. Install dari [getcomposer.org](https://getcomposer.org)

```bash
composer --version
```

### 2. Git
Version control system. Install dari [git-scm.com](https://git-scm.com)

```bash
git --version
```

### 3. Postman
Untuk testing API. Download dari [postman.com](https://www.postman.com)

## Troubleshooting

### Apache tidak bisa start
- **Penyebab**: Port 80 sudah digunakan (biasanya oleh Skype atau IIS)
- **Solusi**: Ubah port Apache di `httpd.conf` atau matikan aplikasi yang menggunakan port 80

### MySQL tidak bisa start
- **Penyebab**: Port 3306 sudah digunakan
- **Solusi**: Ubah port MySQL atau matikan service MySQL lain

### File PHP tidak dijalankan
- **Penyebab**: Apache tidak mengenali file PHP
- **Solusi**: Pastikan module PHP sudah aktif di Apache

## Kesimpulan

Setelah setup environment selesai, Anda siap untuk mulai belajar PHP! Pastikan semua tools sudah terinstall dengan baik sebelum melanjutkan ke materi berikutnya.

**Recommended Setup untuk Pemula:**
- XAMPP atau Laragon
- VS Code dengan extension PHP Intelephense
- Browser modern (Chrome/Firefox)
