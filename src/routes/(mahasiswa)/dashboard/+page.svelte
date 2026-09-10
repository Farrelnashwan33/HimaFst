<script lang="ts">
  import { siteConfig } from '$lib/config/site';
  import StatCard from '$lib/components/dashboard/StatCard.svelte';
  import AnnouncementCard from '$lib/components/dashboard/AnnouncementCard.svelte';
  import FloatingContact from '$lib/components/FloatingContact.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let { data } = $props();

  // programStudi array logic - normally we'd fetch this from DB too, but since we didn't add it to the +page.server.ts load yet, we'll leave it for now or just hardcode it temporarily, wait actually we can just fetch it later, I'll keep the hardcoded for now just for visual, but the user didn't mention program_studi on dashboard in the "hero" section. Wait, there is a "Program Studi Fakultas Sains dan Teknologi" section on the dashboard! 
  const programStudi = [
    'Sistem Informasi UT Bandung', 'Teknologi Pangan UT Bandung', 'Agribisnis UT Bandung', 'Perencanaan dan Wilayah Kota', 'Sains dan Data UT Bandung',
    'Biologi UT Bandung', 'Statistika UT Bandung'
  ];
</script>


<svelte:head>
  <title>Dashboard | {siteConfig.name}</title>
  <meta name="description" content="Portal Himpunan Mahasiswa Fakultas Sains dan Teknologi UT Bandung Dashboard" />
</svelte:head>

<div class="max-w-7xl mx-auto space-y-8 sm:space-y-10 fade-up">
  
  <!-- Header Section -->
  <section class="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-white relative overflow-hidden">
    <!-- Abstract background shape -->
    <div class="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
    
    <div class="relative z-10">
      <div class="inline-flex items-center px-3 py-1 bg-white rounded-full shadow-sm border border-gray-100 mb-4">
        <span class="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></span>
        <span class="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest">{data.hero?.badge || 'PORTAL MAHASISWA'}</span>
      </div>
      
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-dark tracking-tight mb-4">
        {data.hero?.title || 'Welcome'}
      </h1>
      
      <p class="text-base sm:text-lg text-gray-500 max-w-2xl mb-8 leading-relaxed font-medium">
        {data.hero?.subtitle || ''}
      </p>

      <!-- Quick Action Buttons -->
      <div class="flex flex-wrap items-center gap-3">
        {#each (data.quickAccess || []).slice(0,4) as qa, i}
          {#if i === 0}
            <a href={qa.url} target={qa.url.startsWith('http') ? '_blank' : '_self'} rel={qa.url.startsWith('http') ? 'noopener noreferrer' : ''} class="px-6 py-3 bg-primary text-white text-sm font-bold rounded-xl shadow-[0_8px_16px_rgb(255,117,31,0.25)] hover:-translate-y-1 hover:shadow-[0_12px_20px_rgb(255,117,31,0.3)] transition-all">
              {qa.name}
            </a>
          {:else}
            <a href={qa.url} target={qa.url.startsWith('http') ? '_blank' : '_self'} rel={qa.url.startsWith('http') ? 'noopener noreferrer' : ''} class="px-6 py-3 bg-white text-dark text-sm font-bold border border-gray-100 rounded-xl shadow-sm hover:bg-gray-50 transition-colors">
              {qa.name}
            </a>
          {/if}
        {/each}
      </div>
    </div>
  </section>

  <!-- Statistics -->
  <section class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
    <StatCard 
      title="Total Mahasiswa" 
      value={(data.stats?.students || 0).toString()} 
      subtitle="Terdaftar aktif" 
      icon='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' 
      colorClass="bg-blue-50 text-blue-500"
    />
    <StatCard 
      title="Program Kerja" 
      value={(data.stats?.programs || 0).toString()} 
      subtitle="Sepanjang tahun" 
      icon='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>' 
      colorClass="bg-primary/10 text-primary"
    />
    <StatCard 
      title="Event Mendatang" 
      value={(data.stats?.upcomingEvents || 0).toString()} 
      subtitle="Bulan ini" 
      icon='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>' 
      colorClass="bg-purple-50 text-purple-500"
    />
    <StatCard 
      title="Prestasi" 
      value={(data.stats?.achievements || 0).toString()} 
      subtitle="Nasional & Regional" 
      icon='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>' 
      colorClass="bg-yellow-50 text-yellow-500"
    />
  </section>

  <!-- Content Split -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    
    <!-- Left Column (Main Content) -->
    <div class="lg:col-span-2 space-y-8 sm:space-y-10">
      
      <!-- Pengumuman Terbaru -->
      <section>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl sm:text-2xl font-black text-dark">Pengumuman Terbaru</h2>
          <a href="#" class="text-sm font-semibold text-primary hover:text-primary-700">Lihat Semua</a>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {#each (data.announcements || []) as ann}
            <AnnouncementCard 
              category="Pengumuman"
              title={ann.title} 
              date={new Date(ann.created_at).toLocaleDateString('id-ID', {day:'numeric', month:'short', year:'numeric'})} 
              summary={(ann.content || '').substring(0,100) + '...'} 
              href={`/informasi/${ann.id}`} 
            />
          {:else}
            <p class="text-gray-500 text-sm">Belum ada pengumuman terbaru.</p>
          {/each}
        </div>
      </section>

      <!-- Event Mendatang -->
      <section>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl sm:text-2xl font-black text-dark">Event Mendatang</h2>
        </div>
        <div class="space-y-4">
          {#each (data.events || []) as act}
            <div class="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <div class="w-14 h-14 rounded-xl bg-primary/10 flex flex-col items-center justify-center text-primary flex-shrink-0">
                <span class="text-xl font-black leading-none">{new Date(act.event_date).getDate()}</span>
                <span class="text-[10px] font-bold uppercase">{new Date(act.event_date).toLocaleString('id-ID', {month:'short'})}</span>
              </div>
              <div class="flex-grow">
                <div class="flex items-center gap-2 mb-1">
                  <span class="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-gray-100 text-gray-500">{act.category || 'Event'}</span>
                  <span class="text-xs font-bold text-primary">• {act.status}</span>
                </div>
                <h4 class="text-lg font-bold text-dark mb-1">{act.title}</h4>
                <p class="text-sm text-gray-500 flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  {(act.description || '').substring(0,30)}...
                </p>
              </div>
              <a href={`/kalender/${act.id}`} class="w-full sm:w-auto mt-2 sm:mt-0 px-4 py-2 bg-gray-50 hover:bg-primary hover:text-white text-dark text-sm font-semibold rounded-lg transition-colors text-center">
                Detail
              </a>
            </div>
          {:else}
             <p class="text-gray-500 text-sm">Belum ada event mendatang.</p>
          {/each}
        </div>
      </section>

      <!-- Program Studi -->
      <section>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl sm:text-2xl font-black text-dark">Program Studi Fakultas Sains dan Teknologi</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {#each programStudi as prodi}
            <a href="/program-studi" class="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100 flex flex-col items-center text-center gap-3 hover:border-primary/40 hover:shadow-md transition-all group">
              <div class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m4 6 8-4 8 4"/><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/><path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4"/><path d="M18 5v17"/><path d="M6 5v17"/><circle cx="12" cy="9" r="2"/></svg>
              </div>
              <span class="text-xs sm:text-sm font-bold text-dark leading-tight">{prodi}</span>
            </a>
          {/each}
        </div>
      </section>

    </div>

    <!-- Right Column (Sidebar Content) -->
    <div class="space-y-8 sm:space-y-10">
      


      <!-- Hall of Fame -->
      <section>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl sm:text-2xl font-black text-dark">Hall of Fame</h2>
        </div>
        <!-- Simplified slider/stack effect for Hall of fame -->
        <div class="relative bg-gradient-to-br from-[#FFF6ED] to-white rounded-2xl p-6 border border-primary/10 shadow-[0_8px_24px_rgba(255,117,31,0.08)] overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-10 text-5xl">🏆</div>
          
          <div class="mb-4">
            <span class="inline-block px-2.5 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-bold uppercase tracking-widest rounded mb-2">PENGHARGAAN</span>
            <h4 class="text-lg font-black text-dark leading-tight">Juara 1 Lomba Produk Inovatif</h4>
            <p class="text-xs text-gray-500 mt-1 font-medium">DISPORSENI Nasional UT 2026</p>
          </div>

          <div class="space-y-3 mt-6">
            {#each (data.achievements || []) as person}
              <div class="flex items-center gap-3 p-2 rounded-xl hover:bg-white/60 transition-colors">
                <div class="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shadow-sm flex-shrink-0">
                  <img src={person.image_url || `https://ui-avatars.com/api/?name=${person.student_name}&background=random`} alt={person.student_name} class="w-full h-full object-cover" />
                </div>
                <div>
                  <h5 class="text-sm font-bold text-dark">{person.student_name}</h5>
                  <p class="text-[10px] font-bold text-primary uppercase tracking-wider">{person.award_name}</p>
                </div>
              </div>
            {:else}
              <p class="text-xs text-gray-500 text-center py-4">Belum ada data prestasi.</p>
            {/each}
          </div>
        </div>
      </section>

      <!-- Quick Access -->
      <section>
        <h2 class="text-xl sm:text-2xl font-black text-dark mb-6">Quick Access</h2>
        <div class="grid grid-cols-1 gap-3">
          {#each (data.quickAccess || []) as qa}
            <a href={qa.url} target={qa.url.startsWith('http') ? '_blank' : '_self'} rel={qa.url.startsWith('http') ? 'noopener noreferrer' : ''} class="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary/40 hover:shadow-md transition-all group">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-gray-50 text-gray-500 group-hover:text-primary group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                  <!-- Simplified icon for now, could use lucide-svelte or generic icon based on qa.icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                </div>
                <span class="text-sm font-bold text-dark line-clamp-1">{qa.name}</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400 group-hover:text-primary transition-colors"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
            </a>
          {/each}
        </div>
      </section>

    </div>
  </div>
</div>
