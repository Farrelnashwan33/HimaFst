<script lang="ts">
  import { siteConfig } from '$lib/config/site';
  import Button from '$lib/components/Button.svelte';
</script>

<svelte:head>
  <title>Grup WhatsApp — {siteConfig.name}</title>
</svelte:head>

<div class="min-h-screen bg-soft pt-32 pb-24">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <div class="text-center mb-20 fade-up">
      <h1 class="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tight">Stay Connected.</h1>
      <p class="text-xl text-gray-500 max-w-2xl mx-auto">
        Bergabunglah dengan komunitas resmi kami di WhatsApp untuk mendapatkan informasi terbaru dan berdiskusi.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
      
      <!-- Fakultas Sains dan Teknologi 2026 Card -->
      <div class="bg-white rounded-[3rem] p-12 text-center shadow-[0_20px_50px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col items-center justify-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgb(0,0,0,0.08)] group fade-up">
        <div class="w-24 h-24 bg-green-50 rounded-3xl flex items-center justify-center mb-8 transform group-hover:rotate-12 transition-transform duration-500">
          <svg class="w-12 h-12 text-green-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.003 2c-5.523 0-10 4.477-10 10 0 1.99.585 3.844 1.584 5.393L2.24 22l4.757-1.246a9.957 9.957 0 004.996 1.34h.005c5.52 0 10-4.477 10-10 0-5.52-4.48-10-10-10zm0 18.006h-.003a8.174 8.174 0 01-4.164-1.139l-.299-.177-3.097.812.827-3.018-.194-.31a8.136 8.136 0 01-1.248-4.35C3.824 6.37 8.358 1.83 14 1.83c2.81 0 5.452 1.096 7.441 3.088A10.518 10.518 0 0124 12.366c0 5.823-4.73 10.556-10.553 10.556h-.002z"/>
          </svg>
        </div>
        <div class="relative z-10 p-8 flex flex-col h-full">
          <h2 class="text-4xl font-black text-dark mb-4">Fakultas Sains dan Teknologi 2026</h2>
          <p class="text-lg text-gray-600 mb-8 flex-grow">
            Join the official Fakultas Sains dan Teknologi 2026 community. Khusus untuk mahasiswa baru angkatan 2026.
          </p>
          <Button href={siteConfig.fstGroup} target="_blank" class="w-full py-5 text-lg shadow-[0_10px_30px_rgb(34,197,94,0.2)] bg-green-500 hover:bg-green-600 focus:ring-green-500">
            Join Fakultas Sains dan Teknologi 2026 <span class="ml-2">→</span>
          </Button>
        </div>
      </div>

      <!-- Himpunan Mahasiswa Card -->
      <div class="bg-dark rounded-[3rem] p-12 text-center shadow-[0_20px_50px_rgb(0,0,0,0.2)] border border-gray-800 flex flex-col items-center justify-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgb(0,0,0,0.4)] group fade-up relative overflow-hidden" style="transition-delay: 100ms;">
        <div class="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50 mix-blend-overlay"></div>
        <div class="relative z-10 w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mb-8 transform group-hover:rotate-12 transition-transform duration-500 border border-white/10">
          <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.003 2c-5.523 0-10 4.477-10 10 0 1.99.585 3.844 1.584 5.393L2.24 22l4.757-1.246a9.957 9.957 0 004.996 1.34h.005c5.52 0 10-4.477 10-10 0-5.52-4.48-10-10-10zm0 18.006h-.003a8.174 8.174 0 01-4.164-1.139l-.299-.177-3.097.812.827-3.018-.194-.31a8.136 8.136 0 01-1.248-4.35C3.824 6.37 8.358 1.83 14 1.83c2.81 0 5.452 1.096 7.441 3.088A10.518 10.518 0 0124 12.366c0 5.823-4.73 10.556-10.553 10.556h-.002z"/>
          </svg>
        </div>
        <div class="relative z-10 p-8 flex flex-col h-full justify-between">
          <div>
            <h2 class="relative z-10 text-4xl font-black text-white mb-4">Himpunan Mahasiswa</h2>
            <p class="relative z-10 text-lg text-white/90 mb-8">
              Connect with Himpunan Mahasiswa community. Terbuka untuk seluruh mahasiswa aktif Fakultas Sains dan Teknologi.
            </p>
          </div>
          <Button href={siteConfig.himaGroup} target="_blank" variant="primary" class="relative z-10 w-full py-5 text-lg shadow-[0_10px_30px_rgb(255,117,31,0.2)]">
            Join Himpunan Mahasiswa <span class="ml-2">→</span>
          </Button>
        </div>
      </div>
      
    </div>
  </div>
</div>
