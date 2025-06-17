
# PadelPop 🎾

Main Padel cantik di lapangan estetik<br/>
Bookingnya di #PadelPop aja 😎

## Authors

- Daffa Bagus Maulana - 221051163
- Putra Mahandika - 2110511047
- Ananda Divana - 2210511053
- Dafa Andika Firmansyah - 2210511049
- Farel Bayhaqi - 2210511073
- Faiz Firstian Nugroho - 2210511045


## Features

1. 🔐 Autentikasi Aman (Auth)<br/>
Nikmati kemudahan login dengan email dan password, atau langsung masuk menggunakan akun Google.

2. 📝 Pendaftaran Pengguna (Auth)<br/>
Buat akun dengan mudah melalui halaman registrasi. Cukup isi nama, email, dan password, dan kamu siap untuk memesan lapangan padel kapan saja.

3. 📅 Booking Lapangan Real-Time (Field)<br/>
Lihat daftar lapangan yang tersedia lengkap dengan lokasi dan jadwal kosong (tanggal dan jam). Tidak perlu lagi menebak-nebak – semua informasi tersedia secara real-time langsung dari database.

4. 📋 Manajemen Reservasi (Booking)<br/>
Cek dan kelola semua lapangan yang sudah kamu pesan melalui halaman khusus "Reservasi Saya". Jadwalkan ulang atau lihat status booking-mu kapan saja.

5. 🔐 Keamanan Data Pengguna (auth)<br/>
Tenang... Data kamu tidak diperjualbelikan kok. Kami sudah pakai enkripsi password dan sistem autentikasi kami dilengkapi dengan JWT untuk menjamin keamanan data pengguna. Semoga aman yaaa (kecuali nominalnya menarik 😂)

## Tech Stack
| Technology                 | Function             |
|----------------------------|----------------------|
| HTML + JavaScript          | Frontend             |
| Node.js                    | Backend              |
| Express.js                 | Framework API        |
| jsonwebtoken               | Authentication Token |
| Passport.js + Google OAuth | Login via Google     |
| express-rate-limit         | Rate limiting        |
| MySQL                      | Database             |
| Swagger                    | Documentation        |

## Dokumentasi Service
![Gambar Arsitektur Mikroservis](https://github.com/daffmaulana/PadelPop/blob/master/arsitektur.png)
### 1. Autentikasi (`/api/auth`)
Service auth digunakan untuk melakukan autentikasi akun berdasarkan email dan password sebelum masuk ke dalam sistem.
- `POST /register` - Registrasi pengguna baru
- `POST /login` - Login pengguna
- `GET /google` - Login dengan Google
- `GET /google/callback` - Callback untuk autentikasi Google

### 2. Fields (`/api/fields`)
Service fields digunakan untuk menghandle spesifikasi lapangan seperti nama, lokasi, dan biaya per jam.
- `GET /` - Daftar lapangan
- `GET /:id` - Daftar lapangan sesuai id
<br/>-khusus admin-
- `POST /` - Tambahkan lapangan
- `PUT /:id` - Edit lapangan sesuai id
- `DELETE /:id` - Hapus lapangan sesuai id

### 3. Booking (`/api/bookings`)
Service booking digunakan untuk menghandle pemesanan lapangan seperti membuat pesanan baru, menghapus pesanan, atau mencegah konflik double-order.
- `GET /my` - Riwayat booking sesuai akun
- `POST /` - Membuat booking baru
- `DELETE /:id` - Menghapus booking sesuai id
<br/>-khusus admin-
- `GET /` - Daftar semua riwayat booking
- `GET /:id` - Riwayat booking sesuai id
- `POST /admin` - Membuat booking baru
- `PUT /:id` - Edit booking sesuai id
- `DELETE /:id` - Hapus booking sesuai id

### 4. Users (`/api/users`)
Service users hanya dapat digunakan oleh admin untuk menghandle akun yang terdaftar pada database.
-khusus admin-
- `GET /` - Daftar akun terdaftar
- `POST /` - Buat akun baru
- `PUT /:id` - Edit informasi akun sesuai id
- `DELETE /:id` - Hapus akun sesuai id

### 5. Frontend (`public/index.html`)
Menyediakan tampilan HTML pada browser dan skrip JS untuk masing-masing halaman yang diperlukan seperti login, register, melihat field, melakukan booking, melihat riwayat booking, dan dashboard admin. 

### 6. Database (`mySQL`)
Melakukan penyimpanan semua data yang digunakan oleh sistem dan masing-masing service.


## Checklist Penugasan

- Sistem memiliki REST API untuk CRUD data. Data disimpan dalam database (pilih RDBMS atau NoSQL). 🟢
- Gunakan JWT untuk autentikasi pengguna. 🟢
- Sediakan opsi login menggunakan OAuth (Google). 🟢
- Batasi jumlah permintaan API untuk setiap pengguna dalam jangka waktu tertentu. 🟢
- Mengintegrasikan perangkat IoT (optional) 🔴
- Data dari IoT dikirim melalui broker pesan (message broker) seperti RabbitMQ atau Kafka. 🔴
- Gunakan API Gateway untuk mengelola lalu lintas antar layanan, termasuk routing dan validasi. 🟢
- Setiap layanan dikemas menggunakan Docker. 🔴
- Gunakan Kubernetes untuk mengorkestrasi layanan, memastikan ketersediaan dan penskalaan otomatis. 🔴
- Implementasikan HTTPS menggunakan sertifikat SSL/TLS. 🟢
- Enkripsi data sensitif di server. 🟢

## Deployment

1. Clone / Fork repository ke direktori lokal
2. Create database baru di mySQL dengan file mySQL yang tersedia.
3. Create file .env di root direktori lokal
```bash
PORT=3000
PORTS=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=padel_reservation
JWT_SECRET=my-32-character-ultra-secure-and-ultra-long-secret
GOOGLE_CLIENT_ID=[set your own/ contact Daffa]
GOOGLE_CLIENT_SECRET=[set your own/ contact Daffa]
```
4. Run the server
```bash
node server.js
```
5. Akses localhost yang menggunakan https
```bash
https://localhost:3001
```
