<script lang="ts">
  import { siteConfig } from '$lib/config/site';
  import { RegistrationService, type RegistrationData } from '$lib/services/registration';
  import Button from '$lib/components/Button.svelte';

  let formData: RegistrationData = $state({
    fullName: '',
    nim: '',
    studyProgram: '',
    semester: '',
    whatsapp: '',
    email: '',
    division: '',
    reason: '',
    experience: '',
    dataConsent: false
  });

  let isLoading = $state(false);
  let errorMsg = $state('');
  let isSuccess = $state(false);

  const studyPrograms = ['Sistem Informasi', 'Teknik Informatika', 'Matematika', 'Biologi', 'Fisika', 'Kimia'];
  const divisions = ['Ketua', 'Wakil', 'Bendahara', 'Seketaris', 'Humas', 'Psdm', 'Medinfo'];

  async function handleSubmit(e: Event) {
    e.preventDefault();
    isLoading = true;
    errorMsg = '';
    
    if (!formData.whatsapp.match(/^[0-9+]+$/)) {
      errorMsg = 'Format nomor WhatsApp tidak valid (hanya angka).';
      isLoading = false;
      return;
    }

    const result = await RegistrationService.submitRegistration(formData);
    isLoading = false;
    
    if (result.success) {
      isSuccess = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      errorMsg = result.message || 'Gagal mengirim data. Silakan coba lagi.';
    }
  }
</script>

<svelte:head>
  <title>Gabung Himpunan Mahasiswa — {siteConfig.name}</title>
</svelte:head>

<div class="min-h-screen bg-soft pt-32 pb-24">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {#if isSuccess}
      <!-- Premium Success State -->
      <div class="bg-white rounded-[2.5rem] p-12 md:p-20 text-center shadow-[0_20px_50px_rgb(0,0,0,0.04)] border border-gray-100 fade-up">
        <div class="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner relative">
          <div class="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
          <svg class="w-16 h-16 text-green-500 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 class="text-4xl md:text-5xl font-black text-dark mb-4">Registration submitted.</h2>
        <p class="text-xl text-gray-500 mb-12 max-w-lg mx-auto">
          Terima kasih telah mendaftar menjadi bagian dari Himpunan Mahasiswa Fakultas Sains dan Teknologi.
        </p>
        <Button href={siteConfig.himaGroup} target="_blank" class="py-4 px-10 text-lg">
          Gabung Grup Himpunan Mahasiswa <span class="ml-2">→</span>
        </Button>
      </div>
    {:else}
      <!-- Header -->
      <div class="mb-16 fade-up">
        <h1 class="text-5xl md:text-6xl font-black text-dark mb-6 tracking-tight">Form Pendaftaran.</h1>
        <p class="text-xl text-gray-500 max-w-2xl leading-relaxed">
          Isi form di bawah ini dengan lengkap untuk bergabung menjadi bagian dari Himpunan Mahasiswa Fakultas Sains dan Teknologi.
        </p>
      </div>

      <!-- Form Container -->
      <div class="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgb(0,0,0,0.04)] border border-gray-100 fade-up">
        {#if errorMsg}
          <div class="bg-red-50 text-red-600 p-6 rounded-2xl mb-8 border border-red-100 font-medium flex items-start">
            <svg class="w-6 h-6 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {errorMsg}
          </div>
        {/if}

        <form onsubmit={handleSubmit} class="space-y-10">
          <!-- Section 1: Data Diri -->
          <div>
            <h3 class="text-2xl font-bold text-dark mb-6 pb-4 border-b border-gray-100">01. Data Diri</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label for="fullName" class="block text-sm font-bold text-dark mb-2 uppercase tracking-wide">Nama Lengkap *</label>
                <input type="text" id="fullName" bind:value={formData.fullName} required 
                       class="w-full px-5 py-4 rounded-xl border border-gray-200 bg-soft focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-dark font-medium" />
              </div>
              <div>
                <label for="nim" class="block text-sm font-bold text-dark mb-2 uppercase tracking-wide">NIM *</label>
                <input type="text" id="nim" bind:value={formData.nim} required 
                       class="w-full px-5 py-4 rounded-xl border border-gray-200 bg-soft focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-dark font-medium" />
              </div>
              <div>
                <label for="studyProgram" class="block text-sm font-bold text-dark mb-2 uppercase tracking-wide">Program Studi *</label>
                <select id="studyProgram" bind:value={formData.studyProgram} required 
                        class="w-full px-5 py-4 rounded-xl border border-gray-200 bg-soft focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-dark font-medium appearance-none">
                  <option value="" disabled>Pilih Program Studi</option>
                  {#each studyPrograms as program}
                    <option value={program}>{program}</option>
                  {/each}
                </select>
              </div>
              <div>
                <label for="semester" class="block text-sm font-bold text-dark mb-2 uppercase tracking-wide">Semester *</label>
                <select id="semester" bind:value={formData.semester} required 
                        class="w-full px-5 py-4 rounded-xl border border-gray-200 bg-soft focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-dark font-medium appearance-none">
                  <option value="" disabled>Pilih Semester</option>
                  {#each [1,3,5,7] as sem}
                    <option value={sem}>Semester {sem}</option>
                  {/each}
                </select>
              </div>
            </div>
          </div>

          <!-- Section 2: Kontak -->
          <div>
            <h3 class="text-2xl font-bold text-dark mb-6 pb-4 border-b border-gray-100">02. Kontak</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label for="whatsapp" class="block text-sm font-bold text-dark mb-2 uppercase tracking-wide">WhatsApp *</label>
                <input type="tel" id="whatsapp" bind:value={formData.whatsapp} required placeholder="Contoh: 62812345678"
                       class="w-full px-5 py-4 rounded-xl border border-gray-200 bg-soft focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-dark font-medium" />
              </div>
              <div>
                <label for="email" class="block text-sm font-bold text-dark mb-2 uppercase tracking-wide">Email Aktif *</label>
                <input type="email" id="email" bind:value={formData.email} required 
                       class="w-full px-5 py-4 rounded-xl border border-gray-200 bg-soft focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-dark font-medium" />
              </div>
            </div>
          </div>

          <!-- Section 3: Organisasi -->
          <div>
            <h3 class="text-2xl font-bold text-dark mb-6 pb-4 border-b border-gray-100">03. Minat & Pengalaman</h3>
            <div class="space-y-8">
              <div>
                <label for="division" class="block text-sm font-bold text-dark mb-2 uppercase tracking-wide">Pilihan Divisi Utama *</label>
                <select id="division" bind:value={formData.division} required 
                        class="w-full px-5 py-4 rounded-xl border border-gray-200 bg-soft focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-dark font-medium appearance-none">
                  <option value="" disabled>Pilih Divisi Utama</option>
                  {#each divisions as div}
                    <option value={div}>{div}</option>
                  {/each}
                </select>
              </div>
              <div>
                <label for="reason" class="block text-sm font-bold text-dark mb-2 uppercase tracking-wide">Alasan Bergabung *</label>
                <textarea id="reason" bind:value={formData.reason} required rows="3"
                          class="w-full px-5 py-4 rounded-xl border border-gray-200 bg-soft focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-dark font-medium resize-none"></textarea>
              </div>
              <div>
                <label for="experience" class="block text-sm font-bold text-dark mb-2 uppercase tracking-wide">Pengalaman Organisasi (Opsional)</label>
                <textarea id="experience" bind:value={formData.experience} rows="2" placeholder="Jika ada, sebutkan jabatan dan periode..."
                          class="w-full px-5 py-4 rounded-xl border border-gray-200 bg-soft focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-dark font-medium resize-none"></textarea>
              </div>
            </div>
          </div>

          <!-- Consent & Submit -->
          <div class="pt-8 border-t border-gray-100">
            <div class="flex items-start mb-10">
              <div class="flex items-center h-6">
                <input id="dataConsent" type="checkbox" bind:checked={formData.dataConsent} required
                       class="w-6 h-6 rounded border-gray-300 text-primary focus:ring-primary/30 transition-all cursor-pointer" />
              </div>
              <div class="ml-4">
                <label for="dataConsent" class="font-bold text-dark cursor-pointer select-none">Persetujuan Data *</label>
                <p class="text-gray-500 mt-1">Saya menyetujui data yang saya berikan digunakan untuk keperluan pendaftaran Himpunan Mahasiswa Fakultas Sains dan Teknologi.</p>
              </div>
            </div>

            <Button type="submit" variant="primary" class="w-full py-5 text-xl font-black tracking-wide" aria-busy={isLoading}>
              {#if isLoading}
                <svg class="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              {:else}
                Kirim Pendaftaran <span class="ml-2">→</span>
              {/if}
            </Button>
          </div>
        </form>
      </div>
    {/if}
  </div>
</div>
