<script lang="ts">
  import { enhance } from '$app/forms';
  import { siteConfig } from '$lib/config/site';

  let { form } = $props();
  let showPassword = $state(false);
</script>

<svelte:head>
  <title>Portal Admin | {siteConfig.name}</title>
</svelte:head>

<div class="w-full">
  <div class="text-center sm:text-left mb-8">
    <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">
      Portal Pengurus
    </h2>
    <p class="mt-2 text-sm text-gray-600">
      Panel Administrasi Himpunan Mahasiswa Fakultas Sains dan Teknologi.
    </p>
  </div>

  <form class="space-y-6" method="POST" use:enhance>
    {#if form?.error}
      <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm">
        <p class="text-sm text-red-700">{form.error}</p>
      </div>
    {/if}

    <div class="space-y-1">
      <label for="email" class="block text-sm font-semibold text-gray-700">Email Admin</label>
      <input id="email" name="email" type="email" autocomplete="email" required value={form?.email ?? ''} placeholder="Masukkan email admin" class="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/50 focus:border-gray-900 transition-all sm:text-sm">
    </div>

    <div class="space-y-1">
      <label for="password" class="block text-sm font-semibold text-gray-700">Password</label>
      <div class="relative">
        <input id="password" name="password" type={showPassword ? 'text' : 'password'} autocomplete="current-password" required placeholder="Masukkan password" class="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/50 focus:border-gray-900 transition-all sm:text-sm pr-10">
        <button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none" onclick={() => showPassword = !showPassword}>
          {#if showPassword}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          {:else}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          {/if}
        </button>
      </div>
    </div>

    <div class="pt-4">
      <button type="submit" class="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all transform hover:-translate-y-[1px]">
        Masuk sebagai Pengurus
      </button>
    </div>
  </form>
</div>
