<script lang="ts">
  import { enhance } from '$app/forms';
  import { siteConfig } from '$lib/config/site';

  let { data, form } = $props();

  let isModalOpen = $state(false);
  let editingItem = $state<any>(null);

  function openCreateModal() {
    editingItem = null;
    isModalOpen = true;
  }

  function openEditModal(item: any) {
    editingItem = { ...item };
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
    editingItem = null;
  }
</script>

<svelte:head>
  <title>Kelola Informasi | {siteConfig.name}</title>
</svelte:head>

<div class="space-y-6 fade-in">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <h1 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Kelola Informasi & Pengumuman</h1>
      <p class="text-xs sm:text-sm text-slate-500 font-medium mt-1">
        Pengumuman yang dipublikasikan di sini akan langsung tampil pada dashboard dan halaman informasi mahasiswa.
      </p>
    </div>
    <button
      type="button"
      onclick={openCreateModal}
      class="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#0f4c81] to-[#1e3a8a] hover:from-[#1e3a8a] hover:to-[#0f4c81] text-white rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-blue-900/10 transition-all transform hover:-translate-y-0.5"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      Buat Pengumuman Baru
    </button>
  </div>

  {#if form?.message}
    <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in">
      ✓ {form.message}
    </div>
  {/if}

  {#if form?.error}
    <div class="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-bold animate-in fade-in">
      ✕ {form.error}
    </div>
  {/if}

  <!-- Announcements List Cards / Table -->
  <div class="grid grid-cols-1 gap-4">
    {#each (data.announcements || []) as ann}
      <div class="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80 hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div class="space-y-2 min-w-0 flex-1">
          <div class="flex items-center gap-2.5 flex-wrap">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider
              {ann.is_published ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}">
              <span class="w-1.5 h-1.5 rounded-full mr-1.5 {ann.is_published ? 'bg-emerald-500' : 'bg-slate-400'}"></span>
              {ann.is_published ? 'Published' : 'Draft'}
            </span>
            <span class="text-xs text-slate-400 font-medium">
              {ann.created_at ? new Date(ann.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
            </span>
          </div>

          <h3 class="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {ann.title}
          </h3>

          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 whitespace-pre-line">
            {ann.content}
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex sm:flex-col items-center sm:items-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <form method="POST" action="?/toggle" use:enhance class="inline">
            <input type="hidden" name="id" value={ann.id} />
            <input type="hidden" name="current" value={ann.is_published} />
            <button
              type="submit"
              class="px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors
                {ann.is_published
                  ? 'border-slate-200 text-slate-600 hover:bg-slate-100'
                  : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}"
            >
              {ann.is_published ? 'Unpublish' : 'Publish'}
            </button>
          </form>

          <button
            type="button"
            onclick={() => openEditModal(ann)}
            class="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            Edit
          </button>

          <form method="POST" action="?/delete" use:enhance class="inline">
            <input type="hidden" name="id" value={ann.id} />
            <button
              type="submit"
              class="px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
              onclick={(e) => {
                if (!confirm(`Hapus pengumuman "${ann.title}"?`)) e.preventDefault();
              }}
            >
              Hapus
            </button>
          </form>
        </div>
      </div>
    {:else}
      <div class="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
        <div class="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
          📢
        </div>
        <h3 class="text-base font-bold text-slate-700">Belum ada informasi</h3>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">Klik tombol "Buat Pengumuman Baru" untuk mempublikasikan informasi penting pertama Anda.</p>
      </div>
    {/each}
  </div>
</div>

<!-- Modal Form Create / Edit -->
{#if isModalOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
    <div class="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 relative">
      <div class="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 class="text-lg font-black text-slate-900">
            {editingItem ? 'Edit Informasi' : 'Buat Informasi Baru'}
          </h3>
          <p class="text-xs text-slate-500">Isi data pengumuman yang akan ditampilkan di portal</p>
        </div>
        <button
          type="button"
          onclick={closeModal}
          class="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
          aria-label="Tutup"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <form
        method="POST"
        action={editingItem ? '?/update' : '?/create'}
        use:enhance={() => {
          closeModal();
        }}
        class="space-y-4"
      >
        {#if editingItem}
          <input type="hidden" name="id" value={editingItem.id} />
        {/if}

        <div class="space-y-1">
          <label for="ann-title" class="block text-xs font-bold text-slate-700">Judul Pengumuman</label>
          <input
            id="ann-title"
            name="title"
            type="text"
            required
            value={editingItem?.title || ''}
            placeholder="contoh: Pendaftaran Pengurus HIMA FST Periode 2026/2027 Dibuka!"
            class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
          />
        </div>

        <div class="space-y-1">
          <label for="ann-content" class="block text-xs font-bold text-slate-700">Isi Informasi / Deskripsi</label>
          <textarea
            id="ann-content"
            name="content"
            rows="6"
            required
            placeholder="Tuliskan isi pengumuman secara lengkap di sini..."
            class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
          >{editingItem?.content || ''}</textarea>
        </div>

        <div class="flex items-center gap-2 pt-1">
          <input
            id="ann-publish"
            name="is_published"
            type="checkbox"
            value="1"
            checked={editingItem ? Boolean(editingItem.is_published) : true}
            class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-slate-300"
          />
          <label for="ann-publish" class="text-xs font-semibold text-slate-700 cursor-pointer">
            Langsung publikasikan ke Portal Mahasiswa
          </label>
        </div>

        <div class="flex justify-end gap-2 pt-4 border-t border-slate-100">
          <button
            type="button"
            onclick={closeModal}
            class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors"
          >
            {editingItem ? 'Simpan Perubahan' : 'Terbitkan Sekarang'}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
