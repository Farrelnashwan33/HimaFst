<script lang="ts">
  import { enhance } from '$app/forms';
  let { data, form } = $props();
  
  let showForm = $state(false);
  let searchQuery = $state('');
  
  let filteredAnnouncements = $derived(
    data.announcements.filter((a: any) => 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      a.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
</script>

<div class="mb-6 flex justify-between items-center">
  <div>
    <h2 class="text-2xl font-bold text-gray-900">Kelola Informasi</h2>
    <p class="text-gray-600 text-sm mt-1">Manajemen pengumuman dan berita untuk mahasiswa.</p>
  </div>
  <button onclick={() => showForm = !showForm} class="px-4 py-2 bg-dark text-white rounded-lg font-medium hover:bg-black transition-colors">
    {showForm ? 'Batal' : '+ Tambah Informasi'}
  </button>
</div>

{#if form?.error}
  <div class="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100">{form.error}</div>
{/if}

{#if showForm}
  <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 animate-fade-in-up">
    <h3 class="text-lg font-bold text-gray-900 mb-4">Tambah Informasi Baru</h3>
    <form method="POST" action="?/create" use:enhance class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Judul</label>
        <input type="text" name="title" required class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-dark focus:border-dark">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Isi Konten</label>
        <textarea name="content" required rows="4" class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-dark focus:border-dark"></textarea>
      </div>
      <div>
        <label class="flex items-center gap-2">
          <input type="checkbox" name="is_published" value="true" checked class="rounded text-dark focus:ring-dark">
          <span class="text-sm font-medium text-gray-700">Langsung Publish</span>
        </label>
      </div>
      <div class="pt-2">
        <button type="submit" class="px-6 py-2.5 bg-primary text-white rounded-xl font-bold hover:bg-primary-700 transition-colors">
          Simpan
        </button>
      </div>
    </form>
  </div>
{/if}

<div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
  <div class="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
    <div class="relative w-64">
      <input type="text" bind:value={searchQuery} placeholder="Cari informasi..." class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-primary">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-2.5 text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" x2="16.65" y1="21" y2="16.65"></line></svg>
    </div>
  </div>
  <div class="overflow-x-auto">
    <table class="w-full text-left text-sm">
      <thead class="bg-gray-50 text-gray-600 border-b border-gray-100">
        <tr>
          <th class="px-6 py-4 font-semibold">Judul</th>
          <th class="px-6 py-4 font-semibold">Status</th>
          <th class="px-6 py-4 font-semibold">Tanggal</th>
          <th class="px-6 py-4 font-semibold text-right">Aksi</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-50">
        {#each filteredAnnouncements as item}
          <tr class="hover:bg-gray-50/50 transition-colors">
            <td class="px-6 py-4 font-medium text-gray-900">{item.title}</td>
            <td class="px-6 py-4">
              <span class="px-2.5 py-1 text-xs font-medium rounded-full {item.is_published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}">
                {item.is_published ? 'Published' : 'Draft'}
              </span>
            </td>
            <td class="px-6 py-4 text-gray-500">{new Date(item.created_at).toLocaleDateString('id-ID')}</td>
            <td class="px-6 py-4 text-right">
              <form method="POST" action="?/delete" use:enhance class="inline">
                <input type="hidden" name="id" value={item.id}>
                <button type="submit" class="text-red-500 hover:text-red-700 font-medium text-sm ml-4" onclick={(e) => { if(!confirm('Hapus informasi ini?')) e.preventDefault(); }}>Hapus</button>
              </form>
            </td>
          </tr>
        {:else}
          <tr>
            <td colspan="4" class="px-6 py-8 text-center text-gray-500">Belum ada data informasi.</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
