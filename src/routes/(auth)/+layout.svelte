<script lang="ts">
  import { page } from '$app/stores';
  let { children } = $props();
  
  let isLogin = $derived($page.url.pathname.includes('/login') && !$page.url.pathname.includes('/admin'));
  let isAdmin = $derived($page.url.pathname.includes('/admin'));
  let isRegister = $derived($page.url.pathname.includes('/register'));
</script>

<div class="min-h-screen bg-white flex flex-col md:flex-row relative overflow-hidden font-sans">
  
  <!-- LEFT/TOP PANEL -->
  <div class="relative w-full md:w-[45%] lg:w-[40%] flex-shrink-0 bg-gradient-to-b md:bg-gradient-to-br from-[#0f4c81] to-[#1e3a8a] flex flex-col items-center justify-center p-8 sm:p-12 text-white min-h-[35vh] md:min-h-screen z-10 shadow-xl shadow-blue-900/20">
    
    <!-- Content inside blue panel -->
    <div class="relative z-20 flex flex-col items-center text-center w-full max-w-sm mx-auto mt-4 md:mt-0 animate-fade-in-up">
      <!-- Logo Image -->
      <div class="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl flex items-center justify-center mb-6 sm:mb-8 shadow-xl shadow-black/20 overflow-hidden p-2">
        <img src="/logo-komunitas/logo-hima.jpeg" alt="Logo Himpunan Mahasiswa Fakultas Sains dan Teknologi" class="w-full h-full object-contain" />
      </div>
      
      <h2 class="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 tracking-tight drop-shadow-md">
        {#if isAdmin}
          Portal Pengurus
        {:else if isRegister}
          Gabung Bersama Kami
        {:else}
          Selamat Datang
        {/if}
      </h2>
      <p class="text-blue-50/90 text-sm sm:text-base leading-relaxed drop-shadow">
        {#if isAdmin}
          Panel Administrasi Himpunan Mahasiswa Fakultas Sains dan Teknologi.
        {:else}
          di Portal Himpunan Mahasiswa Fakultas Sains dan Teknologi.
        {/if}
      </p>
    </div>

    <!-- Scalloped / Cloud separator for Desktop (Right edge) -->
    <div class="absolute top-0 bottom-0 left-full w-24 hidden md:block z-0 pointer-events-none -ml-[1px]">
      <svg class="w-full h-full text-[#1e3a8a]" preserveAspectRatio="none" viewBox="0 0 100 1000">
        <path fill="currentColor" d="M0,0 Q60,50 0,100 Q40,150 0,200 Q70,250 0,300 Q50,350 0,400 Q80,450 0,500 Q40,550 0,600 Q60,650 0,700 Q50,750 0,800 Q70,850 0,900 Q40,950 0,1000 L0,1000 L0,0 Z"></path>
      </svg>
      <!-- Layered lighter wave for depth -->
      <svg class="absolute top-0 left-0 w-full h-full text-white/10" preserveAspectRatio="none" viewBox="0 0 100 1000" style="transform: translateX(12px);">
        <path fill="currentColor" d="M0,0 Q70,50 0,100 Q50,150 0,200 Q80,250 0,300 Q60,350 0,400 Q90,450 0,500 Q50,550 0,600 Q70,650 0,700 Q60,750 0,800 Q80,850 0,900 Q50,950 0,1000 L0,1000 L0,0 Z"></path>
      </svg>
    </div>

    <!-- Scalloped / Cloud separator for Mobile (Bottom edge) -->
    <div class="absolute bottom-0 left-0 right-0 h-12 translate-y-full block md:hidden w-full pointer-events-none overflow-hidden z-0 -mt-[1px]">
      <svg class="w-full h-full text-[#1e3a8a]" preserveAspectRatio="none" viewBox="0 0 1000 100">
        <path fill="currentColor" d="M0,0 Q50,60 100,0 Q150,40 200,0 Q250,70 300,0 Q350,50 400,0 Q450,80 500,0 Q550,40 600,0 Q650,60 700,0 Q750,50 800,0 Q850,70 900,0 Q950,40 1000,0 L1000,0 L0,0 Z"></path>
      </svg>
    </div>
  </div>

  <!-- RIGHT/BOTTOM PANEL (FORM AREA) -->
  <div class="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 md:pl-24 bg-white relative z-0 min-h-[65vh] md:min-h-screen pt-16 md:pt-12 overflow-y-auto">
    <!-- Subtle background decoration -->
    <div class="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-50 opacity-60 blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 md:left-24 w-80 h-80 rounded-full bg-indigo-50 opacity-60 blur-3xl pointer-events-none"></div>
    
    <div class="w-full max-w-md relative z-10 animate-fade-in">
      {@render children()}
    </div>
  </div>
</div>

<style>
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  :global(.animate-fade-in-up) {
    animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  :global(.animate-fade-in) {
    animation: fadeIn 0.8s ease-out 0.2s both;
  }
</style>
