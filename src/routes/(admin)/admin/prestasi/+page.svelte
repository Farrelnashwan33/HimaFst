<script lang="ts">
  import { enhance } from '$app/forms';
  let { data, form } = $props();
  
  let showForm = $state(false);
</script>

<div class="mb-6 flex justify-between items-center">
  <div>
    <h2 class="text-2xl font-bold text-gray-900">Prestasi Mahasiswa</h2>
    <p class="text-gray-600 text-sm mt-1">Data prestasi dan penghargaan mahasiswa.</p>
  </div>
  <button onclick={() => showForm = !showForm} class="px-4 py-2 bg-dark text-white rounded-lg font-medium hover:bg-black transition-colors">
    {showForm ? 'Batal' : '+ Tambah Data'}
  </button>
</div>

{#if form?.error}
  <div class="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100">{form.error}</div>
{/if}
{#if form?.success}
  <div class="bg-green-50 text-green-700 p-4 rounded-xl mb-6 border border-green-100">Berhasil disimpan!</div>
{/if}

{#if showForm}
  <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 animate-fade-in-up">
    <h3 class="text-lg font-bold text-gray-900 mb-4">Tambah Data Baru</h3>
    <form method="POST" action="?/create" use:enhance class="space-y-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama Mahasiswa</label>
          <input type="text" name="student_name" required class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-dark focus:border-dark">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama Prestasi / Penghargaan</label>
          <input type="text" name="title" required class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-dark focus:border-dark">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tingkat</label>
          <select name="level" class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-dark focus:border-dark">
            <option value="">-- Pilih Tingkat --</option>
            <option value="Internasional">Internasional</option>
            <option value="Nasional">Nasional</option>
            <option value="Regional">Regional</option>
            <option value="Provinsi">Provinsi</option>
            <option value="Kota/Kabupaten">Kota/Kabupaten</option>
            <option value="Universitas">Universitas</option>
            <option value="Fakultas">Fakultas</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Penghargaan</label>
          <input type="date" name="award_date" class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-dark focus:border-dark">
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Deskripsi (opsional)</label>
        <textarea name="description" rows="2" class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-dark focus:border-dark"></textarea>
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
  <div class="overflow-x-auto">
    <table class="w-full text-left text-sm">
      <thead class="bg-gray-50 text-gray-600 border-b border-gray-100">
        <tr>
          <th class="px-5 py-4 font-semibold">Mahasiswa</th>
          <th class="px-5 py-4 font-semibold">Prestasi</th>
          <th class="px-5 py-4 font-semibold">Tingkat</th>
          <th class="px-5 py-4 font-semibold text-center">Published</th>
          <th class="px-5 py-4 font-semibold text-center">Featured ⭐</th>
          <th class="px-5 py-4 font-semibold text-right">Aksi</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-50">
        {#each data.items as item}
          <tr class="hover:bg-gray-50/50 transition-colors">
            <td class="px-5 py-4 font-medium text-gray-900">{item.student_name}</td>
            <td class="px-5 py-4 text-gray-700">{item.title}</td>
            <td class="px-5 py-4">
              {#if item.level}
                <span class="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">{item.level}</span>
              {:else}
                <span class="text-gray-400 text-xs">—</span>
              {/if}
            </td>
            <td class="px-5 py-4 text-center">
              <form method="POST" action="?/togglePublish" use:enhance class="inline">
                <input type="hidden" name="id" value={item.id}>
                <input type="hidden" name="current" value={item.is_published ? 'true' : 'false'}>
                <button type="submit" class="w-10 h-6 rounded-full transition-colors {item.is_published ? 'bg-green-500' : 'bg-gray-300'} relative">
                  <span class="absolute top-0.5 {item.is_published ? 'right-0.5' : 'left-0.5'} w-5 h-5 bg-white rounded-full shadow transition-all"></span>
                </button>
              </form>
            </td>
            <td class="px-5 py-4 text-center">
              <form method="POST" action="?/toggleFeatured" use:enhance class="inline">
                <input type="hidden" name="id" value={item.id}>
                <input type="hidden" name="current" value={item.is_featured ? 'true' : 'false'}>
                <button type="submit" 
                  class="text-xl transition-all hover:scale-110 {item.is_featured ? 'opacity-100' : 'opacity-30 hover:opacity-60'}"
                  title={item.is_featured ? 'Hapus dari Featured' : 'Jadikan Featured'}>
                  ⭐
                </button>
              </form>
            </td>
            <td class="px-5 py-4 text-right">
              <form method="POST" action="?/delete" use:enhance class="inline">
                <input type="hidden" name="id" value={item.id}>
                <button type="submit" class="text-red-500 hover:text-red-700 font-medium text-sm"
                  onclick={(e) => { if(!confirm('Hapus data ini?')) e.preventDefault(); }}>
                  Hapus
                </button>
              </form>
            </td>
          </tr>
        {:else}
          <tr>
            <td colspan="6" class="px-6 py-8 text-center text-gray-500">Belum ada data prestasi.</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
