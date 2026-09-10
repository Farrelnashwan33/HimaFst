<script lang="ts">
  import { siteConfig } from '$lib/config/site';

  const events: any[] = [];
</script>

<svelte:head>
  <title>Kalender Kegiatan | {siteConfig.name}</title>
  <meta name="description" content="Kalender Kegiatan Himpunan Mahasiswa Fakultas Sains dan Teknologi" />
</svelte:head>

<div class="max-w-4xl mx-auto fade-up py-8">
  <div class="mb-10">
    <div class="inline-flex items-center px-3 py-1 bg-white rounded-full shadow-sm border border-gray-100 mb-4">
      <span class="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-widest">Jadwal & Agenda</span>
    </div>
    <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-dark tracking-tight mb-4">
      Kalender Kegiatan
    </h1>
    <p class="text-base sm:text-lg text-gray-500 max-w-2xl leading-relaxed font-medium">
      Pantau seluruh agenda akademik, event komunitas, dan jadwal penting Fakultas Sains dan Teknologi.
    </p>
  </div>

  <div class="relative border-l-2 border-gray-100 ml-4 md:ml-0 md:border-none space-y-8">
    {#each events as event}
      <div class="relative md:grid md:grid-cols-5 md:gap-8 items-start group">
        <!-- Desktop Timeline Dot -->
        <div class="hidden md:flex flex-col items-center col-span-1 pt-1">
          <div class="w-4 h-4 rounded-full bg-primary/20 border-2 border-primary group-hover:scale-150 transition-transform"></div>
          <div class="h-full w-0.5 bg-gray-100 mt-2"></div>
        </div>
        
        <!-- Mobile Timeline Dot -->
        <div class="absolute -left-[21px] top-2 md:hidden w-3 h-3 rounded-full bg-primary/20 border-2 border-primary group-hover:scale-150 transition-transform"></div>

        <div class="md:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group-hover:border-primary/30 group-hover:shadow-md transition-all ml-6 md:ml-0">
          <div class="flex flex-wrap items-center gap-3 mb-3">
            <span class="px-3 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs font-bold uppercase tracking-wider border border-gray-100">
              {event.category}
            </span>
            <span class="text-sm font-semibold text-primary flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              {event.date}
            </span>
          </div>
          <h3 class="text-xl font-bold text-dark mb-2">{event.title}</h3>
          <p class="text-gray-500 leading-relaxed mb-4 text-sm sm:text-base">{event.description}</p>
          <div class="inline-flex items-center gap-2 text-xs font-bold px-2.5 py-1 rounded-md {event.status === 'Sedang Berlangsung' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}">
            <span class="w-1.5 h-1.5 rounded-full {event.status === 'Sedang Berlangsung' ? 'bg-green-500 animate-pulse' : 'bg-orange-500'}"></span>
            {event.status}
          </div>
        </div>
      </div>
    {:else}
      <div class="bg-white p-8 text-center rounded-2xl shadow-sm border border-gray-100">
        <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
        </div>
        <h3 class="text-lg font-bold text-dark mb-2">Belum ada agenda</h3>
        <p class="text-gray-500 text-sm max-w-md mx-auto">Saat ini belum ada kegiatan atau agenda yang dijadwalkan. Silakan periksa kembali nanti.</p>
      </div>
    {/each}
  </div>
</div>
