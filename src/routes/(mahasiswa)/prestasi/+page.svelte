<script lang="ts">
  import { siteConfig } from '$lib/config/site';

  const achievements = [
    {
      name: 'Lutfi Ardiansyah',
      award: 'DISPORSENI Nasional UT 2026',
      date: '2026',
      image: '/prestasi/lutfi.png',
      description: 'Mahasiswa S1 Sistem Informasi yang berprestasi mewakili Fakultas Sains dan Teknologi Universitas Terbuka Bandung pada ajang DISPORSENI Nasional UT 2026.'
    },
    {
      name: 'Wasil Mawardi Assul Toni',
      award: 'DISPORSENI Nasional UT 2026',
      date: '2026',
      image: '/prestasi/wasil.png',
      description: 'Mahasiswa S1 Sistem Informasi yang berprestasi mewakili Fakultas Sains dan Teknologi Universitas Terbuka Bandung pada ajang DISPORSENI Nasional UT 2026.'
    },
    {
      name: 'Alfi Tahar',
      award: 'DISPORSENI Nasional UT 2026',
      date: '2026',
      image: '/prestasi/alfi.png',
      description: 'Mahasiswa S1 Sains & Data yang berprestasi mewakili Fakultas Sains dan Teknologi Universitas Terbuka Bandung pada ajang DISPORSENI Nasional UT 2026.'
    }
  ];
</script>

<svelte:head>
  <title>Prestasi | {siteConfig.name}</title>
  <meta name="description" content="Prestasi Mahasiswa Fakultas Sains dan Teknologi" />
</svelte:head>

<div class="max-w-6xl mx-auto fade-up py-8">
  <div class="mb-10 text-center max-w-2xl mx-auto">
    <div class="inline-flex items-center px-3 py-1 bg-white rounded-full shadow-sm border border-gray-100 mb-4">
      <span class="text-[10px] sm:text-xs font-bold text-yellow-500 uppercase tracking-widest">Hall of Fame</span>
    </div>
    <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-dark tracking-tight mb-4">
      Prestasi Mahasiswa
    </h1>
    <p class="text-base sm:text-lg text-gray-500 leading-relaxed font-medium">
      Kebanggaan Fakultas Sains dan Teknologi. Menampilkan pencapaian luar biasa dari mahasiswa di berbagai bidang akademik dan non-akademik.
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each achievements as item}
      <div class="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group text-center flex flex-col items-center">
        <div class="relative mb-6">
          <div class="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <img src={item.image} alt={item.name} class="relative w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover" />
          <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center text-white text-sm shadow-md">
            🏆
          </div>
        </div>
        <h3 class="text-xl font-bold text-dark mb-1">{item.name}</h3>
        <p class="text-xs font-semibold text-gray-400 mb-4 uppercase tracking-wider">{item.date}</p>
        <p class="text-primary font-bold text-base mb-3">{item.award}</p>
        <p class="text-sm text-gray-500 leading-relaxed">{item.description}</p>
      </div>
    {/each}
  </div>
</div>
