<script lang="ts">
  import { enhance } from '$app/forms';
  let { data, form } = $props();

  let activeTab = $state<'site' | 'profile'>('site');
</script>

<svelte:head>
  <title>Pengaturan Portal & Admin — Admin HIMA FST</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
    <div>
      <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
        <span class="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
        Konfigurasi Sistem
      </div>
      <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Pengaturan Admin</h1>
      <p class="text-sm text-slate-500 mt-1">Kelola informasi publik organisasi, teks banner hero, dan informasi akun admin.</p>
    </div>
  </div>

  {#if form?.error}
    <div class="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 text-sm font-medium flex items-center gap-2">
      <svg class="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {form.error}
    </div>
  {/if}

  {#if form?.success}
    <div class="bg-emerald-50 text-emerald-700 p-4 rounded-xl border border-emerald-200 text-sm font-medium flex items-center gap-2">
      <svg class="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      {form.message || 'Perubahan berhasil disimpan!'}
    </div>
  {/if}

  <!-- Tab Buttons -->
  <div class="flex items-center gap-2 border-b border-slate-200 pb-2">
    <button
      onclick={() => activeTab = 'site'}
      class="px-5 py-2.5 rounded-xl font-bold text-sm transition {activeTab === 'site' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}"
    >
      Pengaturan Portal Mahasiswa
    </button>
    <button
      onclick={() => activeTab = 'profile'}
      class="px-5 py-2.5 rounded-xl font-bold text-sm transition {activeTab === 'profile' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}"
    >
      Profil Akun Admin
    </button>
  </div>

  {#if activeTab === 'site'}
    <!-- Site Settings Form -->
    <div class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
      <h2 class="text-lg font-bold text-slate-900 mb-2">Tampilan & Informasi Organisasi</h2>
      <p class="text-xs text-slate-500 mb-6">Teks berikut otomatis memperbarui teks banner dan kontak di Portal Mahasiswa.</p>

      <form method="POST" action="?/updateSettings" use:enhance class="space-y-5">
        <div>
          <label for="setting_hero_badge" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Hero Badge Teks</label>
          <input
            id="setting_hero_badge"
            type="text"
            name="setting_hero_badge"
            value={data.settings?.hero_badge || 'PORTAL MAHASISWA'}
            class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
          />
        </div>

        <div>
          <label for="setting_hero_title" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Hero Judul Sambutan</label>
          <input
            id="setting_hero_title"
            type="text"
            name="setting_hero_title"
            value={data.settings?.hero_title || 'Welcome to Portal Fakultas Sains dan Teknologi 👋'}
            class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
          />
        </div>

        <div>
          <label for="setting_hero_subtitle" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Hero Subtitle / Deskripsi Singkat</label>
          <textarea
            id="setting_hero_subtitle"
            name="setting_hero_subtitle"
            rows="2"
            class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
          >{data.settings?.hero_subtitle || 'Ruang informasi, aspirasi, kegiatan, dan kolaborasi mahasiswa Fakultas Sains dan Teknologi UT Bandung.'}</textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <div>
            <label for="setting_org_name" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Nama Organisasi</label>
            <input
              id="setting_org_name"
              type="text"
              name="setting_org_name"
              value={data.settings?.org_name || 'HIMA FST UT Bandung'}
              class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
            />
          </div>
          <div>
            <label for="setting_faculty_name" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Nama Fakultas</label>
            <input
              id="setting_faculty_name"
              type="text"
              name="setting_faculty_name"
              value={data.settings?.faculty_name || 'Fakultas Sains dan Teknologi'}
              class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          <div>
            <label for="setting_contact_email" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Email Resmi</label>
            <input
              id="setting_contact_email"
              type="email"
              name="setting_contact_email"
              value={data.settings?.contact_email || 'himafst@ut.ac.id'}
              class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
            />
          </div>
          <div>
            <label for="setting_whatsapp_admin" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">WhatsApp Admin</label>
            <input
              id="setting_whatsapp_admin"
              type="text"
              name="setting_whatsapp_admin"
              value={data.settings?.whatsapp_admin || '081234567890'}
              class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
            />
          </div>
          <div>
            <label for="setting_instagram_link" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Instagram URL</label>
            <input
              id="setting_instagram_link"
              type="text"
              name="setting_instagram_link"
              value={data.settings?.instagram_link || 'https://instagram.com/himafst_ut'}
              class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
            />
          </div>
        </div>

        <div class="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            class="px-6 py-2.5 bg-slate-900 text-white font-bold text-sm rounded-xl hover:bg-slate-800 transition shadow-sm"
          >
            Simpan Pengaturan Portal
          </button>
        </div>
      </form>
    </div>
  {:else}
    <!-- Profile Admin Form -->
    <div class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm max-w-2xl">
      <h2 class="text-lg font-bold text-slate-900 mb-2">Profil Akun Pengurus / Admin</h2>
      <p class="text-xs text-slate-500 mb-6">Perbarui nama tampilan, email login, dan kata sandi akun Anda.</p>

      <form method="POST" action="?/updateProfile" use:enhance class="space-y-4">
        <div>
          <label for="admin_name" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
          <input
            id="admin_name"
            type="text"
            name="name"
            value={data.currentUser?.name || ''}
            required
            class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
          />
        </div>

        <div>
          <label for="admin_email" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Email Login</label>
          <input
            id="admin_email"
            type="email"
            name="email"
            value={data.currentUser?.email || ''}
            required
            class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
          />
        </div>

        <div>
          <label for="admin_password" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Ganti Password (Kosongkan jika tidak diubah)</label>
          <input
            id="admin_password"
            type="password"
            name="password"
            placeholder="Minimal 6 karakter"
            class="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
          />
        </div>

        <div class="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            class="px-6 py-2.5 bg-slate-900 text-white font-bold text-sm rounded-xl hover:bg-slate-800 transition shadow-sm"
          >
            Simpan Profil Admin
          </button>
        </div>
      </form>
    </div>
  {/if}
</div>
