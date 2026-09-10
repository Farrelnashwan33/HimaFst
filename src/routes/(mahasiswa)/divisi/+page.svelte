<script lang="ts">
  import { siteConfig } from '$lib/config/site';
  
  const divisions = [
    { title: 'Ketua', description: 'Pemimpin dan penanggung jawab seluruh kegiatan organisasi.', icon: '👑' },
    { title: 'Wakil', description: 'Membantu ketua dalam menjalankan tugas dan fungsi organisasi.', icon: '🤝' },
    { title: 'Bendahara', description: 'Pengelolaan keuangan dan administrasi pendanaan organisasi.', icon: '💰' },
    { title: 'Sekretaris', description: 'Pengelolaan administrasi kesekretariatan dan tata usaha.', icon: '📝' },
    { title: 'Humas', description: 'Hubungan masyarakat dan komunikasi pihak eksternal.', icon: '📢' },
    { title: 'PSDM', description: 'Pengembangan sumber daya mahasiswa untuk menciptakan kader yang berkualitas.', icon: '🎓' },
    { title: 'Medinfo', description: 'Informasi, komunikasi, teknologi, dan pengelolaan media organisasi.', icon: '💻' },
  ];
</script>

<svelte:head>
  <title>Divisi | {siteConfig.name}</title>
  <meta name="description" content="Divisi Himpunan Mahasiswa Fakultas Sains dan Teknologi" />
</svelte:head>

<div class="max-w-7xl mx-auto fade-up">
  
  <div class="mb-10">
    <div class="inline-flex items-center px-3 py-1 bg-white rounded-full shadow-sm border border-gray-100 mb-4">
      <span class="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest">Struktur Organisasi</span>
    </div>
    <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-dark tracking-tight mb-4">
      Divisi Himpunan Mahasiswa Fakultas Sains dan Teknologi
    </h1>
    <p class="text-base sm:text-lg text-gray-500 max-w-2xl leading-relaxed font-medium">
      Temukan divisi yang sesuai dengan minat dan potensimu. Berikan kontribusi terbaik dari tempat yang tepat.
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
    {#each divisions as div}
      <div class="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col h-full">
        <div class="w-14 h-14 flex items-center justify-center bg-gray-50 rounded-xl text-3xl mb-6 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
          {div.icon}
        </div>
        <h3 class="text-xl font-bold text-dark mb-2 group-hover:text-primary transition-colors">{div.title}</h3>
        <p class="text-sm text-gray-500 leading-relaxed flex-grow">{div.description}</p>
      </div>
    {/each}
  </div>
  
</div>
