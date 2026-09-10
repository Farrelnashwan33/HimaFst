<script lang="ts">
  import { enhance } from '$app/forms';
  let { data, form } = $props();
</script>

<div class="mb-6">
  <h2 class="text-2xl font-bold text-gray-900">Data Mahasiswa</h2>
  <p class="text-gray-600 text-sm mt-1">Daftar mahasiswa yang terdaftar di portal.</p>
</div>

{#if form?.error}
  <div class="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100">{form.error}</div>
{/if}

<div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
  <div class="overflow-x-auto">
    <table class="w-full text-left text-sm">
      <thead class="bg-gray-50 text-gray-600 border-b border-gray-100">
        <tr>
          <th class="px-6 py-4 font-semibold">Nama Lengkap</th><th class="px-6 py-4 font-semibold">NIM</th><th class="px-6 py-4 font-semibold">WhatsApp</th><th class="px-6 py-4 font-semibold">Semester</th>
          <th class="px-6 py-4 font-semibold text-right">Aksi</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-50">
        {#each data.items as item}
          <tr class="hover:bg-gray-50/50 transition-colors">
            <td class="px-6 py-4 font-medium text-gray-900">{item.full_name}</td><td class="px-6 py-4 font-medium text-gray-900">{item.nim}</td><td class="px-6 py-4 font-medium text-gray-900">{item.whatsapp}</td><td class="px-6 py-4 font-medium text-gray-900">{item.semester}</td>
            <td class="px-6 py-4 text-right">
              <form method="POST" action="?/delete" use:enhance class="inline">
                <input type="hidden" name="id" value={item.id}>
                <button type="submit" class="text-red-500 hover:text-red-700 font-medium text-sm ml-4" onclick={(e) => { if(!confirm('Hapus data ini?')) e.preventDefault(); }}>Hapus</button>
              </form>
            </td>
          </tr>
        {:else}
          <tr>
            <td colspan="5" class="px-6 py-8 text-center text-gray-500">Belum ada data.</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
