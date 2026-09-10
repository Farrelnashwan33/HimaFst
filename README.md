# HIMA FST Website

Website resmi Himpunan Mahasiswa Fakultas Sains dan Teknologi (HIMA FST) modern, responsif, dan berbasis SvelteKit.

## Tech Stack
- **Framework**: SvelteKit 5 (TypeScript)
- **Styling**: Tailwind CSS v4
- **Components**: Svelte 5 snippets/props architecture
- **Deployment**: Vercel / Cloudflare Pages ready (via adapter-auto)

## Struktur Folder Utama
- `src/lib/config/site.ts`: Konfigurasi terpusat (Nama, WA, Link Grup).
- `src/lib/components/`: Reusable UI components.
- `src/lib/services/`: Service layer untuk komunikasi ke database (Mock API).
- `src/routes/`: Halaman aplikasi (Home, Form Pendaftaran, Link Grup, Admin).
- `static/logo-komunitas/`: Lokasi penyimpanan logo utama dan gambar statis.

## Instalasi & Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Jalankan development server**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:5173`.

## Deployment

Aplikasi menggunakan `@sveltejs/adapter-auto`, yang akan secara otomatis mendeteksi environment (Vercel, Cloudflare, Netlify) saat Anda men-deploy.

### Vercel Deployment
1. Push project ini ke GitHub.
2. Login ke [Vercel](https://vercel.com).
3. Buat project baru dan import repository GitHub ini.
4. Framework Preset akan otomatis terdeteksi sebagai "SvelteKit".
5. Klik **Deploy**.

### Cloudflare Pages Deployment
1. Push project ke GitHub.
2. Login ke [Cloudflare Dashboard](https://dash.cloudflare.com) > Pages > Create a project > Connect to Git.
3. Pilih repository ini.
4. Pengaturan build:
   - Framework preset: SvelteKit
   - Build command: `npm run build`
   - Build output directory: `.svelte-kit/cloudflare`
5. Klik **Save and Deploy**.

> **Note**: Jika menemui masalah dengan Cloudflare Pages, Anda dapat mengganti adapter ke `@sveltejs/adapter-cloudflare`.

## Kustomisasi

### Mengganti Logo
Timpa file `static/logo-komunitas/logo-hima.jpeg` dengan logo baru (usahakan berukuran persegi panjang/square dan background transparan/putih jika memungkinkan). 
Atau ubah path logo di `src/lib/config/site.ts` jika nama file berbeda.

### Mengganti Link Grup dan Nomor WhatsApp
Buka `src/lib/config/site.ts` dan ubah `adminWhatsapp`, `fstGroup`, atau `himaGroup` sesuai kebutuhan. Pastikan format nomor WhatsApp adalah kode negara tanpa + (misal: `62822...`).

### Menambah/Menghapus Divisi & Kegiatan
- Untuk **Divisi**, buka `src/routes/+page.svelte` dan edit array `divisions`.
- Untuk **Kegiatan**, buka `src/routes/+page.svelte` dan edit array `activities`.

## Environment Variables
Jika Anda sudah menyambungkan Supabase/PostgreSQL untuk menyimpan pendaftar:
1. Buat file `.env` di root folder.
2. Isi credential API (Contoh: `PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`).
3. Jangan lupa tambahkan `.env` ke `.gitignore` (sudah tersedia secara default).
