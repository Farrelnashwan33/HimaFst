<script lang="ts">
  import { enhance } from '$app/forms';
  let { data, form } = $props();
</script>

<div class="mb-6 flex justify-between items-center">
  <div>
    <h2 class="text-2xl font-bold text-gray-900">Pengaturan Portal</h2>
    <p class="text-gray-600 text-sm mt-1">Konfigurasi tampilan utama Dashboard Mahasiswa.</p>
  </div>
</div>

{#if form?.error}
  <div class="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100">{form.error}</div>
{/if}

{#if form?.success}
  <div class="bg-green-50 text-green-600 p-4 rounded-xl mb-6 border border-green-100">Pengaturan berhasil diperbarui.</div>
{/if}

<div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
  <form method="POST" action="?/update" use:enhance class="space-y-6">
    
    <div class="space-y-4">
      <h3 class="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Hero Section (Dashboard)</h3>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Badge Text (Teks kecil di atas judul)</label>
        <input type="text" name="hero_badge" value={data.settings?.hero_badge ?? ''} class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-dark focus:border-dark">
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Judul Utama</label>
        <input type="text" name="hero_title" value={data.settings?.hero_title ?? ''} class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-dark focus:border-dark">
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Deskripsi / Subtitle</label>
        <textarea name="hero_subtitle" rows="3" class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-dark focus:border-dark">{data.settings?.hero_subtitle ?? ''}</textarea>
      </div>
    </div>

    <div class="space-y-4 pt-4">
      <h3 class="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Identitas Organisasi</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama Organisasi</label>
          <input type="text" name="org_name" value={data.settings?.org_name ?? ''} class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-dark focus:border-dark">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama Fakultas</label>
          <input type="text" name="faculty_name" value={data.settings?.faculty_name ?? ''} class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-dark focus:border-dark">
        </div>
      </div>
    </div>

    <div class="space-y-4 pt-4">
      <h3 class="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Kontak Utama</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">WhatsApp Admin</label>
          <input type="text" name="whatsapp_admin" value={data.settings?.whatsapp_admin ?? ''} placeholder="08..." class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-dark focus:border-dark">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Link Instagram</label>
          <input type="url" name="instagram_link" value={data.settings?.instagram_link ?? ''} class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-dark focus:border-dark">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email Kontak</label>
          <input type="email" name="contact_email" value={data.settings?.contact_email ?? ''} class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-dark focus:border-dark">
        </div>
      </div>
    </div>

    <div class="pt-6">
      <button type="submit" class="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-700 transition-colors w-full sm:w-auto">
        Simpan Pengaturan
      </button>
    </div>
  </form>
</div>
