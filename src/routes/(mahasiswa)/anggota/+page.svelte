<script lang="ts">
  import Card from '$lib/components/Card.svelte';
  import { siteConfig } from '$lib/config/site';

  let { data } = $props();
</script>

<svelte:head>
  <title>Pengurus - {siteConfig.name}</title>
</svelte:head>

<section class="relative pt-40 pb-20 lg:pt-48 lg:pb-32 bg-soft min-h-screen">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div class="text-center max-w-3xl mx-auto mb-16 fade-up">
      <h1 class="text-4xl sm:text-5xl lg:text-7xl font-black text-dark tracking-tight leading-tight mb-6">
        Pengurus <span class="text-primary">Himpunan Mahasiswa</span>
      </h1>
      <p class="text-base sm:text-lg text-gray-500 leading-relaxed font-normal">
        Daftar pengurus Himpunan Mahasiswa Fakultas Sains dan Teknologi Universitas Terbuka Bandung.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each data.members as member, i}
        <Card class="fade-up overflow-hidden group">
          <div class="aspect-[4/5] bg-gray-100 relative">
            {#if member.image_url}
              <img src={member.image_url} alt={member.name} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            {:else}
              <div class="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                <svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            {/if}
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-dark mb-1">{member.name}</h3>
            <p class="text-primary font-semibold text-sm uppercase tracking-wider">{member.position}</p>
            <p class="text-gray-500 text-sm mt-2">Divisi: {member.division_name || 'HIMA FST'}</p>
          </div>
        </Card>
      {:else}
        <div class="col-span-full bg-white p-12 text-center rounded-2xl shadow-sm border border-gray-100">
          <p class="text-gray-500">Belum ada data pengurus aktif.</p>
        </div>
      {/each}
    </div>
  </div>
</section>
