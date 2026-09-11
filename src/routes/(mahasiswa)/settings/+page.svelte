<script lang="ts">
  import { enhance } from '$app/forms';
  import { siteConfig } from '$lib/config/site';

  let { data, form } = $props();

  let showCurrentPassword = $state(false);
  let showNewPassword = $state(false);
  let showConfirmPassword = $state(false);
  let activeTab = $state<'profile' | 'security'>('profile');
</script>

<svelte:head>
  <title>Pengaturan Akun | {siteConfig.name}</title>
</svelte:head>

<div class="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto space-y-8 fade-in">
  <!-- Header -->
  <div>
    <h1 class="text-3xl font-black text-dark tracking-tight">Pengaturan Akun</h1>
    <p class="text-sm sm:text-base text-gray-500 font-medium mt-1">
      Kelola informasi profil pribadi dan keamanan akun mahasiswa Anda.
    </p>
  </div>

  <!-- Tabs -->
  <div class="flex items-center gap-2 border-b border-gray-200">
    <button
      type="button"
      onclick={() => (activeTab = 'profile')}
      class="pb-3 px-4 text-sm font-bold border-b-2 transition-all {activeTab === 'profile'
        ? 'border-primary text-primary'
        : 'border-transparent text-gray-500 hover:text-gray-700'}"
    >
      Informasi Profil
    </button>
    <button
      type="button"
      onclick={() => (activeTab = 'security')}
      class="pb-3 px-4 text-sm font-bold border-b-2 transition-all {activeTab === 'security'
        ? 'border-primary text-primary'
        : 'border-transparent text-gray-500 hover:text-gray-700'}"
    >
      Keamanan & Kata Sandi
    </button>
  </div>

  <!-- Tab 1: Profile Information -->
  {#if activeTab === 'profile'}
    <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
      <h2 class="text-xl font-bold text-dark mb-6">Data Diri Mahasiswa</h2>

      {#if form?.profileSuccess}
        <div class="mb-6 bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-md">
          <p class="text-sm font-semibold text-emerald-800">{form.profileSuccess}</p>
        </div>
      {/if}

      {#if form?.profileError}
        <div class="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          <p class="text-sm font-semibold text-red-800">{form.profileError}</p>
        </div>
      {/if}

      <form method="POST" action="?/updateProfile" use:enhance class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div class="space-y-1 sm:col-span-2">
            <label for="fullName" class="block text-sm font-semibold text-gray-700">Nama Lengkap</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={data.profile?.full_name || ''}
              class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all font-medium"
            />
          </div>

          <div class="space-y-1">
            <label for="email" class="block text-sm font-semibold text-gray-700">Email Akun (Tetap)</label>
            <input
              id="email"
              type="email"
              disabled
              value={data.user?.email || ''}
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-500 font-medium cursor-not-allowed"
            />
          </div>

          <div class="space-y-1">
            <label for="nim" class="block text-sm font-semibold text-gray-700">NIM</label>
            <input
              id="nim"
              type="text"
              disabled
              value={data.profile?.nim || '-'}
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-500 font-medium cursor-not-allowed"
            />
          </div>

          <div class="space-y-1">
            <label for="whatsapp" class="block text-sm font-semibold text-gray-700">Nomor WhatsApp</label>
            <input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              value={data.profile?.whatsapp || ''}
              placeholder="contoh: 081234567890"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all font-medium"
            />
          </div>

          <div class="space-y-1">
            <label for="semester" class="block text-sm font-semibold text-gray-700">Semester Saat Ini</label>
            <select
              id="semester"
              name="semester"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all font-medium bg-white"
            >
              <option value="">Pilih Semester</option>
              {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as s}
                <option value={String(s)} selected={data.profile?.semester === String(s)}>
                  Semester {s}
                </option>
              {/each}
            </select>
          </div>

          <div class="space-y-1 sm:col-span-2">
            <label for="programStudi" class="block text-sm font-semibold text-gray-700">Program Studi</label>
            <select
              id="programStudi"
              name="programStudi"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all font-medium bg-white"
            >
              <option value="">Pilih Program Studi</option>
              {#each (data.studyPrograms || []) as prodi}
                <option value={prodi.name} selected={data.profile?.program_studi === prodi.name || data.profile?.prodi_name === prodi.name}>
                  {prodi.name}
                </option>
              {/each}
            </select>
          </div>
        </div>

        <div class="flex justify-end pt-4 border-t border-gray-100">
          <button
            type="submit"
            class="px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-md shadow-primary/20 hover:bg-primary-700 transition-all transform hover:-translate-y-0.5"
          >
            Simpan Perubahan Profil
          </button>
        </div>
      </form>
    </div>
  {/if}

  <!-- Tab 2: Security & Change Password -->
  {#if activeTab === 'security'}
    <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
      <h2 class="text-xl font-bold text-dark mb-2">Ganti Kata Sandi</h2>
      <p class="text-sm text-gray-500 mb-6">Pastikan password baru Anda memiliki minimal 8 karakter demi keamanan akun.</p>

      {#if form?.passwordSuccess}
        <div class="mb-6 bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-md">
          <p class="text-sm font-semibold text-emerald-800">{form.passwordSuccess}</p>
        </div>
      {/if}

      {#if form?.passwordError}
        <div class="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          <p class="text-sm font-semibold text-red-800">{form.passwordError}</p>
        </div>
      {/if}

      <form method="POST" action="?/changePassword" use:enhance class="space-y-5 max-w-lg">
        <div class="space-y-1">
          <label for="currentPassword" class="block text-sm font-semibold text-gray-700">Password Saat Ini</label>
          <div class="relative">
            <input
              id="currentPassword"
              name="currentPassword"
              type={showCurrentPassword ? 'text' : 'password'}
              required
              placeholder="Masukkan password saat ini"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all font-medium pr-10"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
              onclick={() => (showCurrentPassword = !showCurrentPassword)}
              aria-label="Tampilkan password saat ini"
            >
              {#if showCurrentPassword}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              {:else}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              {/if}
            </button>
          </div>
        </div>

        <div class="space-y-1">
          <label for="newPassword" class="block text-sm font-semibold text-gray-700">Password Baru</label>
          <div class="relative">
            <input
              id="newPassword"
              name="newPassword"
              type={showNewPassword ? 'text' : 'password'}
              required
              minlength="8"
              placeholder="Minimal 8 karakter"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all font-medium pr-10"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
              onclick={() => (showNewPassword = !showNewPassword)}
              aria-label="Tampilkan password baru"
            >
              {#if showNewPassword}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              {:else}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
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
              class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all font-medium pr-10"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
              onclick={() => (showConfirmPassword = !showConfirmPassword)}
              aria-label="Tampilkan konfirmasi password"
            >
              {#if showConfirmPassword}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              {:else}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              {/if}
            </button>
          </div>
        </div>

        <div class="pt-4">
          <button
            type="submit"
            class="px-6 py-3 bg-dark text-white rounded-xl font-bold text-sm shadow-md hover:bg-black transition-all transform hover:-translate-y-0.5"
          >
            Ubah Password
          </button>
        </div>
      </form>
    </div>
  {/if}
</div>
