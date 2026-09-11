<script lang="ts">
  import { enhance } from '$app/forms';
  let { data, form } = $props();

  let showModal = $state(false);
  let isEditing = $state(false);
  let selectedEvent: any = $state(null);

  let formId = $state('');
  let formTitle = $state('');
  let formDescription = $state('');
  let formDate = $state('');
  let formTime = $state('09:00 WIB');
  let formLocation = $state('Online via Zoom');
  let formCategory = $state('Webinar');
  let formStatus = $state('Mendatang');

  let searchQuery = $state('');
  let selectedCategory = $state('ALL');

  const categories = ['Webinar', 'Workshop', 'Tuton', 'Festival', 'Rapat', 'Lomba', 'Akademik', 'Lainnya'];
  const statuses = ['Mendatang', 'Sedang Berlangsung', 'Selesai'];

  function openCreateModal() {
    isEditing = false;
    selectedEvent = null;
    formId = '';
    formTitle = '';
    formDescription = '';
    formDate = new Date().toISOString().split('T')[0];
    formTime = '09:00 WIB';
    formLocation = 'Online via Zoom';
    formCategory = 'Webinar';
    formStatus = 'Mendatang';
    showModal = true;
  }

  function openEditModal(event: any) {
    isEditing = true;
    selectedEvent = event;
    formId = event.id;
    formTitle = event.title || '';
    formDescription = event.description || '';
    formDate = event.event_date ? event.event_date.split('T')[0] : '';
    formTime = event.event_time || '09:00 WIB';
    formLocation = event.location || '';
    formCategory = event.category || 'Webinar';
    formStatus = event.status || 'Mendatang';
    showModal = true;
  }

  let filteredItems = $derived(
    data.items.filter((item: any) => {
      const matchSearch =
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
      return matchSearch && matchCategory;
    })
  );
</script>

<svelte:head>
  <title>Manajemen Kalender Kegiatan — Admin HIMA FST</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
    <div>
      <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
        <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
        Agenda & Kegiatan
      </div>
      <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Kalender Kegiatan</h1>
      <p class="text-sm text-slate-500 mt-1">Kelola seluruh agenda, workshop, webinar, dan jadwal kegiatan yang tampil di portal mahasiswa.</p>
    </div>
    <button
      onclick={openCreateModal}
      class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-all shadow-sm active:scale-[0.98]"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      Tambah Kegiatan Baru
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
        placeholder="Cari judul, lokasi, agenda..."
        class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition"
      />
      <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>

    <div class="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
      <button
        onclick={() => selectedCategory = 'ALL'}
        class="px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap {selectedCategory === 'ALL' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
      >
        Semua
      </button>
      {#each categories as cat}
        <button
          onclick={() => selectedCategory = cat}
          class="px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap {selectedCategory === cat ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
        >
          {cat}
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
            <th class="px-6 py-4">Agenda / Kegiatan</th>
            <th class="px-6 py-4">Kategori & Status</th>
            <th class="px-6 py-4">Waktu & Tempat</th>
            <th class="px-6 py-4 text-center">Status Publikasi</th>
            <th class="px-6 py-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          {#each filteredItems as item}
            <tr class="hover:bg-slate-50/60 transition">
              <td class="px-6 py-4">
                <div class="font-bold text-slate-900">{item.title}</div>
                <div class="text-xs text-slate-500 mt-1 max-w-md line-clamp-1">{item.description || 'Tidak ada deskripsi'}</div>
              </td>
              <td class="px-6 py-4">
                <div class="flex flex-col gap-1 items-start">
                  <span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                    {item.category || 'Kegiatan'}
                  </span>
                  <span class="px-2 py-0.5 rounded text-[11px] font-semibold {item.status === 'Sedang Berlangsung' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : item.status === 'Selesai' ? 'bg-slate-100 text-slate-600' : 'bg-amber-50 text-amber-700 border border-amber-100'}">
                    {item.status || 'Mendatang'}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(item.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
                <div class="text-[11px] text-slate-500 mt-0.5">{item.event_time || '09:00 WIB'} • {item.location || 'Online'}</div>
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
                    class="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Edit Kegiatan"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <form method="POST" action="?/delete" use:enhance class="inline">
                    <input type="hidden" name="id" value={item.id} />
                    <button
                      type="submit"
                      onclick={(e) => { if (!confirm(`Hapus kegiatan "${item.title}"?`)) e.preventDefault(); }}
                      class="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Hapus Kegiatan"
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
                <svg class="w-10 h-10 mx-auto mb-2 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Tidak ada agenda yang ditemukan.
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
          <h3 class="text-lg font-bold text-slate-900">{isEditing ? 'Edit Kegiatan' : 'Tambah Kegiatan Baru'}</h3>
          <p class="text-xs text-slate-500">Isi detail kegiatan untuk ditampilkan di portal mahasiswa.</p>
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
          <label for="event_title" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Judul Kegiatan *</label>
          <input
            id="event_title"
            type="text"
            name="title"
            bind:value={formTitle}
            required
            placeholder="Contoh: Webinar Cyber Security & Big Data"
            class="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label for="event_category" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Kategori</label>
            <select
              id="event_category"
              name="category"
              bind:value={formCategory}
              class="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
            >
              {#each categories as cat}
                <option value={cat}>{cat}</option>
              {/each}
            </select>
          </div>
          <div>
            <label for="event_status" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Status</label>
            <select
              id="event_status"
              name="status"
              bind:value={formStatus}
              class="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
            >
              {#each statuses as stat}
                <option value={stat}>{stat}</option>
              {/each}
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label for="event_date" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Tanggal *</label>
            <input
              id="event_date"
              type="date"
              name="event_date"
              bind:value={formDate}
              required
              class="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
          <div>
            <label for="event_time" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Waktu</label>
            <input
              id="event_time"
              type="text"
              name="event_time"
              bind:value={formTime}
              placeholder="Contoh: 09:00 - 12:00 WIB"
              class="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label for="event_location" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Lokasi / Tautan</label>
          <input
            id="event_location"
            type="text"
            name="location"
            bind:value={formLocation}
            placeholder="Contoh: Zoom Meeting / Aula UT Bandung"
            class="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div>
          <label for="event_description" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Deskripsi Kegiatan</label>
          <textarea
            id="event_description"
            name="description"
            bind:value={formDescription}
            rows="3"
            placeholder="Tuliskan gambaran ringkas mengenai kegiatan ini..."
            class="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          ></textarea>
        </div>

        {#if !isEditing}
          <input type="hidden" name="is_published" value="1" />
        {/if}

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
            {isEditing ? 'Simpan Perubahan' : 'Buat Kegiatan'}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
