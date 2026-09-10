# HIMA FST Portal Database

This folder contains the SQL scripts required to set up the local MAMP database.

## Prerequisites
1. Ensure MAMP (or XAMPP) is installed and running (Apache and MySQL).
2. Open phpMyAdmin (usually `http://localhost:8888/phpMyAdmin` or `http://localhost/phpmyadmin`).

## Setup Instructions

1. **Import Schema**
   - In phpMyAdmin, go to the **Import** tab.
   - Choose the file `schema.sql` from this folder.
   - Click **Go** (atau Import).
   - *Ini akan membuat database `himafst_portal` beserta seluruh tabelnya secara otomatis.*

2. **Import Seed Data**
   - Pastikan Anda sedang berada di dalam database `himafst_portal` yang baru dibuat.
   - Pergi ke tab **Import**.
   - Pilih file `seed.sql`.
   - Klik **Go**.
   - *Ini akan memasukkan data sample seperti program studi, pengumuman, dan akun Admin.*

## Admin Credential
Setelah seed berhasil, Anda dapat login ke portal admin (`/admin/login`) menggunakan:

- **Email**: `admin@himafst.local`
- **Password**: `himafst123`

## Note for Vercel/Production
For production, we will use a cloud database (e.g., PlanetScale, Supabase, Vercel Postgres/MySQL) using environment variables. The schema remains the same, but you will run the schema script on the cloud database provider's SQL editor instead of local MAMP.
