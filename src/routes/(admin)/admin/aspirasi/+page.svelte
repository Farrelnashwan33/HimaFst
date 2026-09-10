<script lang="ts">
  import { enhance } from '$app/forms';
  let { data, form } = $props();
  
  let showForm = $state(false);
</script>

<div class="mb-6 flex justify-between items-center">
  <div>
    <h2 class="text-2xl font-bold text-gray-900">Aspirasi Mahasiswa</h2>
    <p class="text-gray-600 text-sm mt-1">Kumpulan aspirasi dari mahasiswa.</p>
  </div>
  <button onclick={() => showForm = !showForm} class="px-4 py-2 bg-dark text-white rounded-lg font-medium hover:bg-black transition-colors">
    {showForm ? 'Batal' : '+ Tambah Data'}
  </button>
</div>

{#if form?.error}
  <div class="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100">{form.error}</div>
{/if}

{#if showForm}
  <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 animate-fade-in-up">
    <h3 class="text-lg font-bold text-gray-900 mb-4">Tambah Data Baru</h3>
    <form method="POST" action="?/create" use:enhance class="space-y-4">
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Subjek</label>
        <input type="text" name="subject" required class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-dark focus:border-dark">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Isi Aspirasi</label>
        <textarea name="content" required rows="3" class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-dark focus:border-dark"></textarea>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select name="status" required class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-dark focus:border-dark">
          <option value="pending">pending</option><option value="reviewed">reviewed</option><option value="resolved">resolved</option>
        </select>
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
          <th class="px-6 py-4 font-semibold">Subjek</th><th class="px-6 py-4 font-semibold">Status</th>
          <th class="px-6 py-4 font-semibold text-right">Aksi</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-50">
        {#each data.items as item}
          <tr class="hover:bg-gray-50/50 transition-colors">
            <td class="px-6 py-4 font-medium text-gray-900">{item.subject}</td><td class="px-6 py-4 font-medium text-gray-900">{item.status}</td>
            <td class="px-6 py-4 text-right">
              <form method="POST" action="?/delete" use:enhance class="inline">
                <input type="hidden" name="id" value={item.id}>
                <button type="submit" class="text-red-500 hover:text-red-700 font-medium text-sm ml-4" onclick={(e) => { if(!confirm('Hapus data ini?')) e.preventDefault(); }}>Hapus</button>
              </form>
            </td>
          </tr>
        {:else}
          <tr>
            <td colspan="3" class="px-6 py-8 text-center text-gray-500">Belum ada data.</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
