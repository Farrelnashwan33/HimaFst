<script lang="ts">
  import { siteConfig } from '$lib/config/site';
  import Button from '$lib/components/Button.svelte';
  import DivisionCard from '$lib/components/DivisionCard.svelte';
  import ActivityCard from '$lib/components/ActivityCard.svelte';
  import Card from '$lib/components/Card.svelte';
  
  let showMoreAbout = $state(false);

  const divisions = [
    { title: 'Ketua', description: 'Pemimpin dan penanggung jawab seluruh kegiatan organisasi.', icon: '👑' },
    { title: 'Wakil', description: 'Membantu ketua dalam menjalankan tugas dan fungsi organisasi.', icon: '🤝' },
    { title: 'Bendahara', description: 'Pengelolaan keuangan dan administrasi pendanaan organisasi.', icon: '💰' },
    { title: 'Seketaris', description: 'Pengelolaan administrasi kesekretariatan dan tata usaha.', icon: '📝' },
    { title: 'Humas', description: 'Hubungan masyarakat dan komunikasi pihak eksternal.', icon: '📢' },
    { title: 'Psdm', description: 'Pengembangan sumber daya mahasiswa untuk menciptakan kader yang berkualitas.', icon: '🎓' },
    { title: 'Medinfo', description: 'Informasi, komunikasi, teknologi, dan pengelolaan media organisasi.', icon: '💻' },
  ];

  const activities = [
    {
      title: 'Anggota HIMA',
      date: 'Periode 2026-2027',
      category: 'Anggota',
      description: 'Kenali lebih dekat daftar pengurus dan anggota dari berbagai divisi HIMA FST UT Bandung.',
      posterUrl: '',
      href: '/anggota',
      buttonText: 'Lihat Anggota'
    },
    {
      title: 'FST Berkarya',
      date: '1-10 Oktober 2026',
      category: 'Competition',
      description: 'Ajang kompetisi kreativitas dan inovasi mahasiswa FST dalam bidang teknologi dan sains terapan.',
      posterUrl: '',
      href: '#',
      buttonText: 'View Activity'
    }
  ];

  const whyJoin = [
    { number: '01', title: 'Leadership', desc: 'Bangun kemampuan memimpin dan mengambil keputusan.', icon: '👑' },
    { number: '02', title: 'Collaboration', desc: 'Berjejaring dan bekerja bersama mahasiswa lain.', icon: '🔗' },
    { number: '03', title: 'Growth', desc: 'Kembangkan kemampuan akademik maupun non-akademik.', icon: '📈' },
    { number: '04', title: 'Experience', desc: 'Dapatkan pengalaman nyata dalam mengelola kegiatan.', icon: '🎯' },
    { number: '05', title: 'Networking', desc: 'Bangun relasi dengan mahasiswa dan komunitas.', icon: '🌍' },
    { number: '06', title: 'Impact', desc: 'Berikan kontribusi nyata untuk lingkungan kampus.', icon: '✨' }
  ];
</script>

<svelte:head>
  <title>{siteConfig.name} — {siteConfig.fullname}</title>
  <meta name="description" content={siteConfig.description.replace(/\n/g, ' ')} />
</svelte:head>

<!-- HERO SECTION -->
<section class="relative min-h-[auto] lg:min-h-screen flex items-center pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-32 lg:pb-24 overflow-hidden bg-soft">
  <!-- Subtle background glowing gradients -->
  <div class="absolute inset-0 pointer-events-none">
    <div class="absolute top-0 right-0 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] lg:w-[800px] lg:h-[800px] bg-primary/[0.03] rounded-full blur-[80px] lg:blur-[120px] translate-x-1/3 -translate-y-1/4"></div>
    <div class="absolute bottom-0 left-0 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px] bg-primary/[0.02] rounded-full blur-[60px] lg:blur-[100px] -translate-x-1/3 translate-y-1/4"></div>
  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
    <div class="flex flex-col lg:flex-row gap-12 lg:gap-8 items-center">
      
      <!-- LEFT CONTENT (55%) -->
      <div class="w-full lg:w-[55%] fade-up lg:pr-8 text-center lg:text-left">
        <!-- Small Badge -->
        <div class="inline-flex items-center px-3 py-1.5 bg-white rounded-full shadow-sm border border-gray-100 mb-6 lg:mb-8 mx-auto lg:mx-0">
          <span class="w-1.5 h-1.5 rounded-full bg-primary mr-2 animate-pulse"></span>
          <span class="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-widest">Official Himpunan Mahasiswa</span>
        </div>
        
        <!-- Headline -->
        <h1 class="text-4xl sm:text-5xl lg:text-[5rem] font-black text-dark tracking-tight leading-[1.05] lg:leading-[1.05] mb-5 lg:mb-6">
          Grow Together.<br/>
          Create <span class="text-primary relative inline-block">FST<svg class="absolute -bottom-1 left-0 w-full text-primary/20 h-2 sm:h-3" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 10 Q 50 20 100 10" stroke="currentColor" stroke-width="4" fill="none" /></svg></span> Impact.
        </h1>
        
        <!-- Subheading -->
        <h2 class="text-lg sm:text-xl md:text-2xl font-medium text-dark/90 leading-snug mb-4 lg:mb-6 max-w-xl mx-auto lg:mx-0">
          Himpunan Mahasiswa Fakultas Sains dan Teknologi Universitas Terbuka Bandung.
        </h2>

        <!-- Description -->
        <p class="text-sm sm:text-base md:text-lg text-gray-500 leading-relaxed mb-8 lg:mb-10 max-w-[550px] mx-auto lg:mx-0 font-normal">
          Ruang bagi mahasiswa untuk bertumbuh, berkolaborasi, berkarya, dan menciptakan dampak bersama.
        </p>
        
        <!-- CTA -->
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
          <Button href="/gabung-hima" variant="primary" class="w-full sm:w-auto py-3.5 px-8 text-base font-semibold">
            Gabung HIMA <span class="ml-2 font-normal">→</span>
          </Button>
          <Button href="#tentang" variant="outline" class="w-full sm:w-auto py-3.5 px-8 text-base font-semibold bg-white">
            Kenali HIMA
          </Button>
        </div>
      </div>

      <!-- RIGHT VISUAL (45%) -->
      <div class="w-full lg:w-[45%] relative h-[450px] sm:h-[550px] lg:h-[650px] fade-up mt-8 lg:mt-0" style="transition-delay: 200ms;">
        <!-- Container for visual composition -->
        <div class="absolute inset-0 flex items-end justify-center w-full max-w-[400px] sm:max-w-[500px] lg:max-w-none mx-auto relative pt-12 pb-8">
          
          <!-- Soft Background Shape (Like the green shape in reference) -->
          <div class="absolute bottom-[5%] w-[85%] h-[80%] bg-gradient-to-tr from-emerald-100 to-teal-50 rounded-[3rem] lg:rounded-[4rem] transform -rotate-2 transition-transform duration-700 hover:rotate-0"></div>
          
          <!-- Ketua Image -->
          <div class="relative z-10 w-[80%] h-full flex items-end justify-center drop-shadow-2xl">
            <!-- Note: Using object-cover to fit the portrait, assuming it's a person photo -->
            <img src="/assets/ketua-hima.jpg" alt="Ketua HIMA FST" class="w-full h-full object-cover object-bottom rounded-b-[3rem] lg:rounded-b-[4rem]" />
          </div>

          <!-- Floating Glass Cards (Supporting Elements) -->
          
          <!-- Top Right Card (Like the purple Revenue card) -->
          <div class="absolute top-[10%] right-[-5%] lg:right-[0%] bg-white/95 backdrop-blur-xl px-5 py-4 rounded-2xl lg:rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-white flex flex-col animate-[bounce_6s_ease-in-out_infinite] scale-90 sm:scale-100 z-20">
            <span class="text-xs font-semibold text-gray-400 tracking-wide uppercase mb-1">Periode</span>
            <div class="flex items-center gap-3">
              <span class="text-2xl lg:text-3xl font-black text-dark">2026</span>
              <span class="px-2 py-1 bg-dark text-white text-[10px] font-bold rounded-full uppercase tracking-wider">Aktif</span>
            </div>
          </div>

          <!-- Bottom Left Card (Like the pink Latest Sale card) -->
          <div class="absolute bottom-[20%] left-[-10%] sm:left-[-5%] lg:left-[5%] bg-white/95 backdrop-blur-xl px-5 py-4 rounded-2xl lg:rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-white flex items-center justify-between gap-4 animate-[bounce_5s_ease-in-out_infinite_reverse] scale-90 sm:scale-100 z-20 min-w-[160px]">
            <div class="flex flex-col">
              <span class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Struktur HIMA</span>
              <span class="text-xl lg:text-2xl font-black text-dark">7</span>
            </div>
            <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
          </div>

          <!-- Bottom Right Card (Like the yellow Freedom Score card) -->
          <div class="absolute bottom-[5%] right-[-15%] sm:right-[-5%] lg:right-[0%] bg-[#FFFAF0] px-5 py-4 rounded-2xl lg:rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-white/50 animate-[bounce_7s_ease-in-out_infinite] scale-90 sm:scale-100 z-20 min-w-[170px]">
            <div class="flex justify-between items-start mb-2">
              <span class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Total Mahasiswa</span>
              <div class="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                <svg class="w-3 h-3 text-red-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path></svg>
              </div>
            </div>
            <span class="block text-2xl lg:text-3xl font-black text-dark mb-2">100+</span>
            <div class="flex flex-col gap-1 text-[10px] lg:text-xs font-medium text-gray-500">
              <span>Kolaborasi.</span>
              <span>Aspirasi.</span>
              <span>Prestasi.</span>
            </div>
          </div>
          
        </div>
      </div>
      
    </div>
  </div>
</section>





<!-- ABOUT SECTION -->
<section id="tentang" class="py-32 bg-soft">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
      <div class="fade-up sticky top-32">
        <h2 class="text-4xl sm:text-5xl md:text-6xl font-black text-dark leading-[1.1] mb-6">
          Lebih dari sekadar <br/>
          organisasi mahasiswa.
        </h2>
      </div>
      <div class="fade-up">
        <div class="text-lg text-gray-600 leading-relaxed mb-8 space-y-6">
          <p>
            HIMA FST UT Bandung adalah sebuah organisasi kemahasiswaan yang juga merupakan sebuah wadah penting untuk membentuk dan membangun kader-kader yang memiliki nilai, dan dapat bertanggung jawab dalam memberikan kontribusi terhadap kehidupan kampus maupun masyarakat agar tercipta suatu perkembangan.
          </p>
          {#if showMoreAbout}
            <div class="space-y-6 animate-[fadeIn_0.5s_ease-out_forwards] overflow-hidden">
              <p>
                Karena itu, diperlukan suatu sistem kaderisasi yang terstruktur, sistematis, dan berkelanjutan guna menciptakan kader yang tidak hanya memahami konsep dasar organisasi, tetapi juga mampu mengimplementasikan nilai-nilai tersebut dalam kehidupan nyata.
              </p>
              <p>
                Silabus kaderisasi ini disusun sebagai pedoman dalam proses pembinaan kader yang mencakup aspek kompetensi dan karakter, serta dirancang secara bertahap melalui beberapa tingkatan guna memastikan tercapainya output kader yang diharapkan.
              </p>
            </div>
          {/if}
        </div>
        
        <button 
          onclick={() => showMoreAbout = !showMoreAbout}
          class="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-dark transition-all duration-300 ease-in-out bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 hover:border-primary/20 focus:outline-none"
        >
          <span class="relative flex items-center gap-3">
            {showMoreAbout ? 'Tutup Penjelasan' : 'Kenali Lebih Jauh'}
            <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <svg class="w-4 h-4 transition-transform duration-500 {showMoreAbout ? 'rotate-180' : ''}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </span>
        </button>
      </div>
    </div>
  </div>
</section>

<!-- WHY JOIN SECTION -->
<section class="py-32 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-20 fade-up">
      <h3 class="text-xs sm:text-sm font-bold tracking-widest uppercase text-primary mb-2">PART OF A BIGGER COMMUNITY</h3>
      <h2 class="text-4xl md:text-5xl font-black text-dark mb-4">Program Studi FST</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {#each ['Sistem Informasi', 'Teknologi Pangan', 'Agribisnis', 'Perencanaan dan Wilayah Kota', 'Biologi', 'Sains Data', 'Matematika', 'Statistika'] as prog, i}
        <Card class="fade-up p-8 flex items-center justify-center text-center h-full min-h-[120px]" style="transition-delay: {(i % 4) * 100}ms;">
          <h3 class="text-xl font-bold text-[#4B5563]">{prog}</h3>
        </Card>
      {/each}
    </div>
  </div>
</section>

<!-- DIVISION SECTION -->
<section id="divisi" class="py-32 bg-dark text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="mb-20 fade-up">
      <h2 class="text-primary font-bold tracking-widest uppercase text-sm mb-4">Struktur Organisasi</h2>
      <h3 class="text-5xl md:text-7xl font-black leading-tight">Find Your <br/> Space.</h3>
      <p class="mt-6 text-xl text-gray-400 max-w-2xl">
        Temukan divisi yang sesuai dengan minat dan potensimu. Berikan kontribusi terbaik dari tempat yang tepat.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each divisions as div, i}
        <!-- Custom division card for dark mode -->
        <div class="fade-up group relative p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden cursor-pointer" style="transition-delay: {i * 100}ms;">
          <div class="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="text-5xl mb-8 relative z-10 opacity-70 group-hover:opacity-100 group-hover:scale-110 origin-left transition-all duration-500">{div.icon}</div>
          <div class="text-sm font-bold text-gray-500 tracking-widest uppercase mb-2 relative z-10">Divisi</div>
          <h4 class="text-2xl font-bold mb-4 relative z-10">{div.title.replace('Divisi ', '')}</h4>
          <p class="text-gray-400 leading-relaxed mb-8 relative z-10">{div.description}</p>
          
          <div class="flex items-center text-primary font-bold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 relative z-10">
            <span class="mr-2">Explore</span>
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- HALL OF FAME / PRESTASI -->
<section class="py-32 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-gradient-to-br from-[#FFF6ED] to-white rounded-[3rem] p-8 sm:p-12 md:p-16 flex flex-col items-center shadow-[0_20px_60px_rgb(255,117,31,0.06)] border border-primary/10 fade-up">
      
      <!-- Badge -->
      <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-100 text-yellow-700 font-bold rounded-full text-xs uppercase tracking-widest mb-8">
        <span>🏆</span> Hall of Fame
      </div>
      
      <!-- Heading -->
      <h3 class="text-4xl sm:text-5xl md:text-6xl font-black text-dark mb-4 leading-[1.1] text-center tracking-tight">
        Selamat & Sukses!
      </h3>
      <p class="text-base sm:text-lg md:text-xl text-gray-500 leading-relaxed mb-16 text-center max-w-2xl font-medium">
        Atas prestasinya meraih <span class="text-primary font-bold">Juara 1 Lomba Produk Inovatif</span> pada ajang DISPORSENI Nasional UT 2026.
      </p>

      <!-- Students Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-5xl mx-auto">
        <!-- Student 1 -->
        <div class="flex flex-col items-center group fade-up" style="transition-delay: 100ms;">
          <div class="w-full aspect-[3/4] rounded-[2rem] bg-gray-100 overflow-hidden relative border border-gray-200/50 shadow-md group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500">
            <!-- image -->
            <img src="/prestasi/lutfi.png" alt="Lutfi Ardiansyah" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent z-10 transition-opacity duration-300"></div>
            
            <div class="absolute bottom-6 left-0 w-full text-center z-20 px-4">
               <h4 class="text-xl font-bold text-white mb-1 tracking-tight">Lutfi Ardiansyah</h4>
               <p class="text-sm font-semibold text-primary/90 uppercase tracking-wider">S1 Sistem Informasi</p>
            </div>
          </div>
        </div>

        <!-- Student 2 (Staggered) -->
        <div class="flex flex-col items-center group md:mt-12 fade-up" style="transition-delay: 200ms;">
          <div class="w-full aspect-[3/4] rounded-[2rem] bg-gray-100 overflow-hidden relative border border-gray-200/50 shadow-md group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500">
            <!-- image -->
            <img src="/prestasi/wasil.png" alt="Wasil Mawardi A.T." class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent z-10 transition-opacity duration-300"></div>
            
            <div class="absolute bottom-6 left-0 w-full text-center z-20 px-4">
               <h4 class="text-xl font-bold text-white mb-1 tracking-tight">Wasil Mawardi A.T.</h4>
               <p class="text-sm font-semibold text-primary/90 uppercase tracking-wider">S1 Sistem Informasi</p>
            </div>
          </div>
        </div>

        <!-- Student 3 -->
        <div class="flex flex-col items-center group fade-up" style="transition-delay: 300ms;">
          <div class="w-full aspect-[3/4] rounded-[2rem] bg-gray-100 overflow-hidden relative border border-gray-200/50 shadow-md group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500">
            <!-- image -->
            <img src="/prestasi/alfi.png" alt="Alfi Tahar" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent z-10 transition-opacity duration-300"></div>
            
            <div class="absolute bottom-6 left-0 w-full text-center z-20 px-4">
               <h4 class="text-xl font-bold text-white mb-1 tracking-tight">Alfi Tahar</h4>
               <p class="text-sm font-semibold text-primary/90 uppercase tracking-wider">S1 Sains Data</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Footer / Org -->
      <div class="mt-16 text-center border-t border-gray-200/60 pt-8 w-full max-w-3xl fade-up" style="transition-delay: 400ms;">
        <p class="text-gray-400 font-bold text-xs sm:text-sm tracking-widest uppercase leading-loose">
          Mahasiswa Fakultas Sains & Teknologi<br/>
          <span class="text-gray-600">Universitas Terbuka Bandung</span>
        </p>
      </div>

    </div>
  </div>
</section>

<!-- ACTIVITIES SECTION -->
<section id="kegiatan" class="py-32 bg-soft">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="mb-20 fade-up">
      <h2 class="text-5xl md:text-6xl font-black text-dark">What We're Building.</h2>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
      {#each activities as act, i}
        <div class="fade-up" style="transition-delay: {i * 200}ms;">
          <ActivityCard {...act} />
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- JOIN HIMA SECTION -->
<section class="py-32 bg-dark relative overflow-hidden">
  <!-- Glowing orange background -->
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
  
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 fade-up">
    <h2 class="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
      Ready to be part of <br/> something bigger?
    </h2>
    <p class="text-xl md:text-2xl text-gray-400 mb-12">
      Gabung bersama HIMA FST dan mulai perjalananmu membangun inovasi dan relasi.
    </p>
    <div class="flex flex-col sm:flex-row justify-center gap-6">
      <Button href="/gabung-hima" variant="primary" class="py-5 px-10 text-xl shadow-[0_0_40px_rgb(255,117,31,0.3)] hover:shadow-[0_0_60px_rgb(255,117,31,0.5)]">
        Gabung HIMA <span class="ml-2">→</span>
      </Button>
      <Button href="/grup-whatsapp" variant="ghost" class="py-5 px-10 text-xl text-white hover:text-dark hover:bg-white border-2 border-transparent hover:border-white">
        Lihat Grup FST
      </Button>
    </div>
  </div>
</section>
