<script lang="ts">
  import Card from '$lib/components/Card.svelte';
  import { siteConfig } from '$lib/config/site';

  let { data } = $props();

  const colorPalettes = [
    'from-blue-500/10 to-blue-500/5',
    'from-orange-500/10 to-orange-500/5',
    'from-green-500/10 to-green-500/5',
    'from-purple-500/10 to-purple-500/5',
    'from-emerald-500/10 to-emerald-500/5',
    'from-indigo-500/10 to-indigo-500/5',
    'from-rose-500/10 to-rose-500/5',
    'from-cyan-500/10 to-cyan-500/5'
  ];
</script>

<svelte:head>
  <title>Program Studi - {siteConfig.name}</title>
</svelte:head>

<section class="relative pt-40 pb-20 lg:pt-48 lg:pb-32 bg-soft overflow-hidden min-h-screen">
  <!-- Decorative Background -->
  <div class="absolute inset-0 pointer-events-none">
    <div class="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[100px]"></div>
    <div class="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-500/[0.03] rounded-full blur-[100px]"></div>
  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <!-- Header -->
    <div class="text-center max-w-3xl mx-auto mb-16 lg:mb-24 fade-up">
      <div class="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 mb-6 mx-auto">
        <span class="text-xs font-bold text-primary uppercase tracking-widest">Fakultas Sains dan Teknologi Community</span>
      </div>
      <h1 class="text-4xl sm:text-5xl md:text-6xl font-black text-dark tracking-tight mb-6 leading-tight">
        Program Studi<br/><span class="text-gray-400">di Fakultas Sains dan Teknologi UT Bandung.</span>
      </h1>
      <p class="text-base sm:text-lg text-gray-500 leading-relaxed font-normal">
        Kenali lebih dekat seluruh program studi unggulan yang tergabung dalam keluarga besar Fakultas Sains dan Teknologi Universitas Terbuka Bandung.
      </p>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each data.programs as prog, i}
        <div class="fade-up" style="transition-delay: {i * 75}ms;">
          <Card class="h-full flex flex-col p-8 bg-white border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300 group">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br {colorPalettes[i % colorPalettes.length]} mb-6 flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform duration-300">
              <span class="text-xl font-black text-dark/70 group-hover:text-primary transition-colors">{prog.name.charAt(0)}</span>
            </div>
            
            <h3 class="text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors">{prog.name}</h3>
            
            <p class="text-sm text-gray-500 leading-relaxed flex-grow font-normal">
              {prog.description || 'Program studi di Fakultas Sains dan Teknologi Universitas Terbuka.'}
            </p>
          </Card>
        </div>
      {:else}
        <div class="col-span-full bg-white p-12 text-center rounded-2xl shadow-sm border border-gray-100">
          <p class="text-gray-500">Belum ada program studi aktif yang ditampilkan.</p>
        </div>
      {/each}
    </div>
  </div>
</section>
