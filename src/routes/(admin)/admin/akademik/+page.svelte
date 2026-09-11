<script lang="ts">
  import { enhance } from '$app/forms';
  let { data, form } = $props();

  let showModal = $state(false);
  let isEditing = $state(false);

  let formId = $state('');
  let formTitle = $state('');
  let formContent = $state('');
  let formType = $state('Tuton');
  let formLinkUrl = $state('');

  let searchQuery = $state('');
  let selectedType = $state('ALL');

  const types = ['Tuton', 'Jadwal', 'Kalender Akademik', 'Perkuliahan', 'Link Penting', 'Umum'];

  function openCreateModal() {
    isEditing = false;
    formId = '';
    formTitle = '';
    formContent = '';
    formType = 'Tuton';
    formLinkUrl = 'https://elearning.ut.ac.id';
    showModal = true;
  }

  function openEditModal(item: any) {
    isEditing = true;
    formId = item.id;
    formTitle = item.title || '';
    formContent = item.content || '';
    formType = item.type || 'Tuton';
    formLinkUrl = item.link_url || '';
    showModal = true;
  }

  let filteredItems = $derived(
    data.items.filter((item: any) => {
      const matchSearch =
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchType = selectedType === 'ALL' || item.type === selectedType;
      return matchSearch && matchType;
    })
  );
</script>

<svelte:head>
  <title>Manajemen Informasi Akademik — Admin HIMA FST</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
    <div>
      <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-semibold mb-2">
        <span class="w-1.5 h-1.5 rounded-full bg-cyan-600"></span>
        Informasi & Perkuliahan
      </div>
      <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Akademik & Perkuliahan</h1>
      <p class="text-sm text-slate-500 mt-1">Kelola panduan Tuton, jadwal UAS, kalender akademik, dan tautan penting mahasiswa FST.</p>
    </div>
    <button
      onclick={openCreateModal}
      class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-all shadow-sm active:scale-[0.98]"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      Tambah Info Akademik
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

  <!-- Filters & Search -->
  <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
    <div class="relative w-full md:w-80">
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Cari info akademik..."
        class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 focus:bg-white transition"
      />
      <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>

    <div class="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
      <button
        onclick={() => selectedType = 'ALL'}
        class="px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap {selectedType === 'ALL' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
      >
        Semua Tipe
      </button>
      {#each types as t}
        <button
          onclick={() => selectedType = t}
          class="px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap {selectedType === t ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
        >
          {t}
        </button>
      {/each}
    </div>
  </div>

  <!-- Table List -->
  <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm text-slate-600">
        <thead class="bg-slate-50/80 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200/80">
          <tr>
            <th class="px-6 py-4">Judul Informasi</th>
            <th class="px-6 py-4">Kategori / Tipe</th>
            <th class="px-6 py-4">Tautan Link</th>
            <th class="px-6 py-4 text-center">Status Publikasi</th>
            <th class="px-6 py-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          {#each filteredItems as item}
            <tr class="hover:bg-slate-50/60 transition">
              <td class="px-6 py-4">
                <div class="font-bold text-slate-900">{item.title}</div>
                <div class="text-xs text-slate-500 mt-1 max-w-md line-clamp-1">{item.content}</div>
              </td>
              <td class="px-6 py-4">
                <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-50 text-cyan-700 border border-cyan-200/80">
                  {item.type || 'Umum'}
                </span>
              </td>
              <td class="px-6 py-4">
                {#if item.link_url}
                  <a
                    href={item.link_url}
                    target="_blank"
                    rel="noreferrer"
                    class="text-xs font-medium text-cyan-600 hover:text-cyan-800 underline flex items-center gap-1"
                  >
                    Buka Tautan
                    <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                {:else}
                  <span class="text-slate-400 text-xs">—</span>
                {/if}
              </td>
              <td class="px-6 py-4 text-center">
                <form method="POST" action="?/togglePublish" use:enhance class="inline-block">
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="current" value={item.is_published} />
                  <button
                    type="submit"
                    class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer {item.is_published ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200 border border-slate-200'}"
                  >
                    <span class="w-1.5 h-1.5 rounded-full {item.is_published ? 'bg-emerald-500' : 'bg-slate-400'}"></span>
                    {item.is_published ? 'Published' : 'Draft'}
                  </button>
                </form>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button
                    onclick={() => openEditModal(item)}
                    class="p-1.5 text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition"
                    title="Edit Informasi"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <form method="POST" action="?/delete" use:enhance class="inline">
                    <input type="hidden" name="id" value={item.id} />
                    <button
                      type="submit"
                      onclick={(e) => { if (!confirm(`Hapus informasi "${item.title}"?`)) e.preventDefault(); }}
                      class="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Hapus Informasi"
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
              <td colspan="5" class="px-6 py-12 text-center text-slate-400">
                Belum ada data informasi akademik.
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
          <h3 class="text-lg font-bold text-slate-900">{isEditing ? 'Edit Informasi Akademik' : 'Tambah Info Akademik Baru'}</h3>
          <p class="text-xs text-slate-500">Informasi ini akan membantu mahasiswa seputar jadwal perkuliahan dan Tuton.</p>
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
          <label for="acad_title" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Judul Informasi *</label>
          <input
            id="acad_title"
            type="text"
            name="title"
            bind:value={formTitle}
            required
            placeholder="Contoh: Panduan Pelaksanaan Tuton 2026.1"
            class="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
          />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label for="acad_type" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Kategori / Tipe</label>
            <select
              id="acad_type"
              name="type"
              bind:value={formType}
              class="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 bg-white"
            >
              {#each types as t}
                <option value={t}>{t}</option>
              {/each}
            </select>
          </div>
          <div>
            <label for="acad_link" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Link URL</label>
            <input
              id="acad_link"
              type="text"
              name="link_url"
              bind:value={formLinkUrl}
              placeholder="https://..."
              class="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
            />
          </div>
        </div>

        <div>
          <label for="acad_content" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Isi & Keterangan *</label>
          <textarea
            id="acad_content"
            name="content"
            bind:value={formContent}
            required
            rows="4"
            placeholder="Tuliskan detail panduan atau pengumuman akademik..."
            class="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
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
            {isEditing ? 'Simpan Perubahan' : 'Tambah Info'}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
