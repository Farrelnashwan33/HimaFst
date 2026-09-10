<script lang="ts">
  import { siteConfig } from '$lib/config/site';
</script>

<svelte:head>
  <title>Informasi | {siteConfig.name}</title>
  <meta name="description" content="Pusat Informasi Himpunan Mahasiswa Fakultas Sains dan Teknologi" />
</svelte:head>

<div class="max-w-4xl mx-auto fade-up py-8">
  <div class="mb-10">
    <div class="inline-flex items-center px-3 py-1 bg-white rounded-full shadow-sm border border-gray-100 mb-4">
      <span class="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-widest">Pusat Informasi</span>
    </div>
    <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-dark tracking-tight mb-4">
      Informasi Terkini
    </h1>
    <p class="text-base sm:text-lg text-gray-500 max-w-2xl leading-relaxed font-medium">
      Dapatkan berita, pengumuman, dan informasi penting terbaru seputar perkuliahan dan Himpunan Mahasiswa Fakultas Sains dan Teknologi.
    </p>
  </div>

  <div class="bg-white p-8 sm:p-12 text-center rounded-3xl shadow-sm border border-gray-100 mt-8">
    <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400 border border-gray-100">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8c-2 0-3 1-3 1s-1 1-1 3v14a2 2 0 0 0 2 2Z"/>
        <path d="M14 2v20"/>
        <path d="M8 2v20"/>
        <path d="M22 10h-8"/>
        <path d="M22 14h-8"/>
      </svg>
    </div>
    <h3 class="text-xl font-bold text-dark mb-3">Belum ada informasi</h3>
    <p class="text-gray-500 text-base max-w-md mx-auto leading-relaxed">
      Saat ini belum ada pengumuman atau berita terbaru yang dipublikasikan. Silakan periksa kembali nanti.
    </p>
  </div>
</div>
