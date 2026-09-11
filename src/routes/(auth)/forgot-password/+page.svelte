<script lang="ts">
  import { enhance } from '$app/forms';
  import { siteConfig } from '$lib/config/site';

  let { form } = $props();
  let showPassword = $state(false);
  let showConfirmPassword = $state(false);
</script>

<svelte:head>
  <title>Reset Password | {siteConfig.name}</title>
</svelte:head>

<div class="w-full">
  <div class="text-center sm:text-left mb-8">
    <div class="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#0f4c81] rounded-full text-xs font-semibold mb-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      Pemulihan Akun
    </div>
    <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">
      Lupa Password?
    </h2>
    <p class="mt-2 text-sm text-gray-600">
      Masukkan Email dan NIM terdaftar untuk mereset kata sandi akun Anda.
    </p>
  </div>

  {#if form?.success}
    <div class="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-4 shadow-sm animate-in fade-in duration-300">
      <div class="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <div>
        <h3 class="text-lg font-bold text-emerald-900">Password Berhasil Diubah!</h3>
        <p class="text-sm text-emerald-700 mt-1">{form.message}</p>
      </div>
      <a
        href="/login"
        class="inline-flex items-center justify-center w-full py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#0f4c81] to-[#1e3a8a] hover:from-[#1e3a8a] hover:to-[#0f4c81] shadow-md shadow-blue-900/10 transition-all transform hover:-translate-y-[1px]"
      >
        Masuk Sekarang
      </a>
    </div>
  {:else}
    <form class="space-y-5" method="POST" use:enhance>
      {#if form?.error}
        <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm">
          <p class="text-sm text-red-700 font-medium">{form.error}</p>
        </div>
      {/if}

      <div class="space-y-1">
        <label for="email" class="block text-sm font-semibold text-gray-700">Email Terdaftar</label>
        <input
          id="email"
          name="email"
          type="email"
          autocomplete="email"
          required
          value={form?.email ?? ''}
          placeholder="contoh: mahasiswa@ecampus.ut.ac.id"
          class="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0f4c81]/50 focus:border-[#0f4c81] transition-all sm:text-sm"
        />
      </div>

      <div class="space-y-1">
        <label for="nim" class="block text-sm font-semibold text-gray-700">NIM (Nomor Induk Mahasiswa)</label>
        <input
          id="nim"
          name="nim"
          type="text"
          required
          value={form?.nim ?? ''}
          placeholder="contoh: 043123456"
          class="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0f4c81]/50 focus:border-[#0f4c81] transition-all sm:text-sm"
        />
      </div>

      <div class="space-y-1">
        <label for="newPassword" class="block text-sm font-semibold text-gray-700">Password Baru</label>
        <div class="relative">
          <input
            id="newPassword"
            name="newPassword"
            type={showPassword ? 'text' : 'password'}
            required
            minlength="8"
            placeholder="Minimal 8 karakter"
            class="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0f4c81]/50 focus:border-[#0f4c81] transition-all sm:text-sm pr-10"
          />
          <button
            type="button"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
            onclick={() => (showPassword = !showPassword)}
            aria-label="Tampilkan password"
          >
            {#if showPassword}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            {/if}
          </button>
        </div>
      </div>

      <div class="space-y-1">
        <label for="confirmPassword" class="block text-sm font-semibold text-gray-700">Konfirmasi Password Baru</label>
        <div class="relative">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            required
            minlength="8"
            placeholder="Ulangi password baru"
            class="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0f4c81]/50 focus:border-[#0f4c81] transition-all sm:text-sm pr-10"
          />
          <button
            type="button"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
            onclick={() => (showConfirmPassword = !showConfirmPassword)}
            aria-label="Tampilkan konfirmasi password"
          >
            {#if showConfirmPassword}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            {/if}
          </button>
        </div>
      </div>

      <div class="pt-2">
        <button
          type="submit"
          class="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md shadow-blue-900/10 text-sm font-bold text-white bg-gradient-to-r from-[#0f4c81] to-[#1e3a8a] hover:from-[#1e3a8a] hover:to-[#0f4c81] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0f4c81] transition-all transform hover:-translate-y-[1px]"
        >
          Reset Password Sekarang
        </button>
      </div>
    </form>
  {/if}

  <div class="mt-8 pt-6 border-t border-gray-100 text-center">
    <a href="/login" class="inline-flex items-center gap-2 text-sm font-semibold text-[#0f4c81] hover:text-[#1e3a8a] transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
      Kembali ke Halaman Login
    </a>
  </div>
</div>
