<script lang="ts">
  import { enhance } from '$app/forms';
  let { data, form } = $props();

  let showModal = $state(false);
  let isEditing = $state(false);

  let formId = $state('');
  let formName = $state('');
  let formDescription = $state('');
  let formIcon = $state('');

  let searchQuery = $state('');

  function openCreateModal() {
    isEditing = false;
    formId = '';
    formName = '';
    formDescription = '';
    formIcon = '';
    showModal = true;
  }

  function openEditModal(item: any) {
    isEditing = true;
    formId = item.id;
    formName = item.name || '';
    formDescription = item.description || '';
    formIcon = item.icon || '';
    showModal = true;
  }

  let filteredItems = $derived(
    data.items.filter((item: any) =>
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
</script>

<svelte:head>
  <title>Manajemen Program Studi — Admin HIMA FST</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
    <div>
      <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
        <span class="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
        Jurusan & Prodi FST
      </div>
      <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Program Studi</h1>
      <p class="text-sm text-slate-500 mt-1">Kelola daftar program studi yang ada di lingkungan Fakultas Sains dan Teknologi UT Bandung.</p>
    </div>
    <button
      onclick={openCreateModal}
      class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-all shadow-sm active:scale-[0.98]"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      Tambah Prodi Baru
    </button>
  </div>

  {#if form?.error}
    <div class="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 text-sm font-medium flex items-center gap-2">
      <svg class="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {form.error}
    </div>
  {/if}

  <!-- Search -->
  <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
    <div class="relative w-full sm:w-80">
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Cari program studi..."
        class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition"
      />
      <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <div class="text-xs text-slate-500 font-medium">
      Total: {filteredItems.length} Program Studi
    </div>
  </div>

  <!-- Table List -->
  <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm text-slate-600">
        <thead class="bg-slate-50/80 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200/80">
          <tr>
            <th class="px-6 py-4">Nama Program Studi</th>
            <th class="px-6 py-4">Deskripsi & Profil</th>
            <th class="px-6 py-4 text-center">Status Aktif</th>
            <th class="px-6 py-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          {#each filteredItems as item}
            <tr class="hover:bg-slate-50/60 transition">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-700 text-sm">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <div class="font-bold text-slate-900">{item.name}</div>
                    <div class="text-xs text-slate-400">ID: #{item.id}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 max-w-md">
                <div class="text-xs text-slate-600 line-clamp-2">{item.description || 'Belum ada deskripsi.'}</div>
              </td>
              <td class="px-6 py-4 text-center">
                <form method="POST" action="?/toggleActive" use:enhance class="inline-block">
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="current" value={item.is_active} />
                  <button
                    type="submit"
                    class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer {item.is_active ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200 border border-slate-200'}"
                  >
                    <span class="w-1.5 h-1.5 rounded-full {item.is_active ? 'bg-emerald-500' : 'bg-slate-400'}"></span>
                    {item.is_active ? 'Aktif' : 'Non-Aktif'}
                  </button>
                </form>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button
                    onclick={() => openEditModal(item)}
                    class="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                    title="Edit Prodi"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <form method="POST" action="?/delete" use:enhance class="inline">
                    <input type="hidden" name="id" value={item.id} />
                    <button
                      type="submit"
                      onclick={(e) => { if (!confirm(`Hapus prodi "${item.name}"?`)) e.preventDefault(); }}
                      class="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Hapus Prodi"
                    >
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          {:else}
            <tr>
              <td colspan="4" class="px-6 py-12 text-center text-slate-400">
                Belum ada data program studi.
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- Modal Create / Edit -->
{#if showModal}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
    <div class="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 overflow-hidden">
      <div class="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 class="text-lg font-bold text-slate-900">{isEditing ? 'Edit Program Studi' : 'Tambah Program Studi Baru'}</h3>
          <p class="text-xs text-slate-500">Program studi ini akan tampil di portal mahasiswa dan formulir pendaftaran.</p>
        </div>
        <button onclick={() => showModal = false} class="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form method="POST" action={isEditing ? '?/update' : '?/create'} use:enhance={() => { showModal = false; }} class="space-y-4 pt-4">
        {#if isEditing}
          <input type="hidden" name="id" value={formId} />
        {/if}

        <div>
          <label for="prodi_name" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Nama Program Studi *</label>
          <input
            id="prodi_name"
            type="text"
            name="name"
            bind:value={formName}
            required
            placeholder="Contoh: Sistem Informasi"
            class="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        <div>
          <label for="prodi_desc" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Deskripsi & Penjelasan Prodi</label>
          <textarea
            id="prodi_desc"
            name="description"
            bind:value={formDescription}
            rows="3"
            placeholder="Tuliskan gambaran kurikulum dan keunggulan program studi ini..."
            class="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          ></textarea>
        </div>

        <div class="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
          <button
            type="button"
            onclick={() => showModal = false}
            class="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
          >
            Batal
          </button>
          <button
            type="submit"
            class="px-5 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition shadow-sm"
          >
            {isEditing ? 'Simpan Perubahan' : 'Tambah Prodi'}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
