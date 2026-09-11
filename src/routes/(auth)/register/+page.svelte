<script lang="ts">
  import { enhance } from '$app/forms';
  import { siteConfig } from '$lib/config/site';

  let { form, data } = $props();

  let showPassword = $state(false);
  let showConfirmPassword = $state(false);
  let isLoading = $state(false);
</script>

<svelte:head>
  <title>Registrasi Mahasiswa | {siteConfig.name}</title>
</svelte:head>

<div class="w-full">
  <div class="text-center sm:text-left mb-8">
    <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">
      Buat Akun Mahasiswa
    </h2>
    <p class="mt-2 text-sm text-gray-600">
      Bergabung dengan Portal {siteConfig.name}
    </p>
  </div>

  {#if form?.success}
    <div class="bg-green-50 border-l-4 border-green-500 p-6 rounded-md shadow-sm mb-6">
      <h3 class="text-lg font-bold text-green-800 mb-2">Registrasi Berhasil!</h3>
      <p class="text-sm text-green-700 mb-4">Silakan login menggunakan email dan password Anda.</p>
      <a href="/login" class="inline-flex justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
        Pergi ke Login
      </a>
    </div>
  {:else}
    <form class="space-y-5" method="POST" use:enhance={() => {
      isLoading = true;
      return async ({ update }) => {
        await update();
        isLoading = false;
      };
    }}>
      {#if form?.error}
        <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm">
          <p class="text-sm text-red-700">{form.error}</p>
        </div>
      {/if}

      <div class="space-y-1">
        <label for="fullName" class="block text-sm font-semibold text-gray-700">Nama Lengkap</label>
        <input id="fullName" name="fullName" type="text" required value={form?.fullName ?? ''} placeholder="Masukkan nama lengkap" class="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0f4c81]/50 focus:border-[#0f4c81] transition-all sm:text-sm">
      </div>

      <div class="space-y-1">
        <label for="nim" class="block text-sm font-semibold text-gray-700">NIM</label>
        <input id="nim" name="nim" type="text" required value={form?.nim ?? ''} placeholder="Masukkan NIM" class="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0f4c81]/50 focus:border-[#0f4c81] transition-all sm:text-sm">
      </div>

      <div class="space-y-1">
        <label for="email" class="block text-sm font-semibold text-gray-700">Email</label>
        <input id="email" name="email" type="email" required value={form?.email ?? ''} placeholder="Masukkan email aktif" class="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0f4c81]/50 focus:border-[#0f4c81] transition-all sm:text-sm">
      </div>

      <div class="space-y-1">
        <label for="whatsapp" class="block text-sm font-semibold text-gray-700">Nomor WhatsApp</label>
        <input id="whatsapp" name="whatsapp" type="text" required value={form?.whatsapp ?? ''} placeholder="Contoh: 08123456789" class="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0f4c81]/50 focus:border-[#0f4c81] transition-all sm:text-sm">
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-1">
          <label for="programStudi" class="block text-sm font-semibold text-gray-700">Program Studi</label>
          <input id="programStudi" name="programStudi" type="text" required value={form?.programStudi ?? ''} placeholder="Contoh: Sistem Informasi" class="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0f4c81]/50 focus:border-[#0f4c81] transition-all sm:text-sm">
        </div>

        <div class="space-y-1">
          <label for="semester" class="block text-sm font-semibold text-gray-700">Semester</label>
          <input id="semester" name="semester" type="number" min="1" max="14" required value={form?.semester ?? ''} placeholder="Semester" class="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0f4c81]/50 focus:border-[#0f4c81] transition-all sm:text-sm">
        </div>
      </div>

      <div class="space-y-1">
        <label for="password" class="block text-sm font-semibold text-gray-700">Password</label>
        <div class="relative">
          <input id="password" name="password" type={showPassword ? 'text' : 'password'} required placeholder="Minimal 8 karakter" class="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0f4c81]/50 focus:border-[#0f4c81] transition-all sm:text-sm pr-10">
          <button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none" onclick={() => showPassword = !showPassword}>
            {#if showPassword}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            {/if}
          </button>
        </div>
      </div>

      <div class="space-y-1">
        <label for="confirmPassword" class="block text-sm font-semibold text-gray-700">Konfirmasi Password</label>
        <div class="relative">
          <input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} required placeholder="Ulangi password" class="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0f4c81]/50 focus:border-[#0f4c81] transition-all sm:text-sm pr-10">
          <button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none" onclick={() => showConfirmPassword = !showConfirmPassword}>
            {#if showConfirmPassword}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            {/if}
          </button>
        </div>
      </div>

      <div class="pt-4">
        <button type="submit" disabled={isLoading} class="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md shadow-blue-900/10 text-sm font-bold text-white bg-gradient-to-r from-[#0f4c81] to-[#1e3a8a] hover:from-[#1e3a8a] hover:to-[#0f4c81] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0f4c81] transition-all transform hover:-translate-y-[1px] disabled:opacity-70 disabled:cursor-not-allowed">
          {#if isLoading}
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Memproses...
          {:else}
            Daftar Sekarang
          {/if}
        </button>
      </div>
    </form>
  {/if}

  <div class="mt-8 pt-6 border-t border-gray-100 text-center">
    <p class="text-sm text-gray-600">
      Sudah punya akun? 
      <a href="/login" class="font-bold text-[#0f4c81] hover:text-[#1e3a8a] transition-colors">
        Masuk
      </a>
    </p>
  </div>
</div>
