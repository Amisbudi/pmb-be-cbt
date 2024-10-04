# Deployment Back-End dengan Docker CBT Back-End (ExpressJS Postgresql)

Panduan ini akan membantu Anda untuk melakukan deployment aplikasi backend-end ExpressJS menggunakan Docker. Proses deployment ini dikelola melalui Docker Compose, jadi pastikan file `docker-compose.yml` dan `Dockerfile` sudah dikonfigurasi dengan benar.

## Prasyarat

- Docker terpasang di mesin Anda.
- Docker Compose terpasang.
- File `Dockerfile` dan `docker-compose.yml` telah disiapkan dengan benar.

## Langkah-langkah Deployment

### 1. Sesuaikan Port

Pastikan konfigurasi port di `docker-compose.yml` sudah benar. Secara default, ExpressJS berjalan di port `3000`, namun Anda dapat menyesuaikan port yang akan digunakan.

### 2. Membangun dan Menjalankan Kontainer Docker

Setelah port dikonfigurasi di `docker-compose.yml`, Anda dapat membangun dan menjalankan kontainer Docker dengan perintah berikut:

```bash
docker-compose up -d
```

Flag -d digunakan untuk menjalankan kontainer dalam mode detached, yang berarti kontainer akan berjalan di latar belakang.

### 3. Mengakses Aplikasi

Setelah kontainer berjalan, aplikasi React Anda dapat diakses melalui port yang telah ditentukan di file `docker-compose.yml`.

Sebagai contoh, jika Anda memetakan port `3000`, buka browser dan akses alamat berikut:

```bash
https://be-cbt.trisakti.ac.id
```

### 3. Mengubah Database di Config.js

Ubah konfigurasi database di file `config.js` sesuai dengan pengaturan environment Anda. Sebagai contoh, jika Anda menggunakan PostgreSQL untuk pengembangan, konfigurasinya bisa seperti ini:

```js
"development": {
    "username": "dev",
    "password": "",
    "database": "cat_db",
    "host": "localhost",
    "dialect": "postgres",
    "port": 5432
  },
```

Pastikan untuk menyesuaikan `username`, `password`, dan detail lainnya sesuai dengan environment yang digunakan.

### 4. Jalankan Migration dan Seeder jika diperlukan

Setelah konfigurasi selesai, jalankan migration untuk membuat tabel di database:

```bash
npx sequelize-cli db:migrate
```

Jika Anda juga memiliki data awal yang perlu diisikan, gunakan seeder dengan perintah berikut:

```bash
npx sequelize-cli db:seed:all
```

Ini akan menjalankan semua seeder yang sudah dibuat.

### 5. Menghentikan Aplikasi

Untuk menghentikan kontainer yang berjalan, gunakan perintah berikut:

```bash
docker-compose down
```

Perintah ini akan menghentikan dan menghapus kontainer yang dibuat oleh Docker Compose.
