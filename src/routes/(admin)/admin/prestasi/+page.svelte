<script lang="ts">
  import { enhance } from '$app/forms';
  let { data, form } = $props();

  let showModal = $state(false);
  let isEditing = $state(false);

  let formId = $state('');
  let formStudentName = $state('');
  let formTitle = $state('');
  let formAwardName = $state('');
  let formLevel = $state('Nasional');
  let formAwardDate = $state('');
  let formImageUrl = $state('');
  let formDescription = $state('');

  let searchQuery = $state('');
  let selectedLevel = $state('ALL');

  const levels = ['Internasional', 'Nasional', 'Regional', 'Provinsi', 'Kota/Kabupaten', 'Universitas', 'Fakultas'];

  function openCreateModal() {
    isEditing = false;
    formId = '';
    formStudentName = '';
    formTitle = '';
    formAwardName = '';
    formLevel = 'Nasional';
    formAwardDate = new Date().toISOString().split('T')[0];
    formImageUrl = '/prestasi/lutfi.png';
    formDescription = '';
    showModal = true;
  }

  function openEditModal(item: any) {
    isEditing = true;
    formId = item.id;
    formStudentName = item.student_name || '';
    formTitle = item.title || '';
    formAwardName = item.award_name || '';
    formLevel = item.level || 'Nasional';
    formAwardDate = item.award_date ? item.award_date.split('T')[0] : '';
    formImageUrl = item.image_url || '';
    formDescription = item.description || '';
    showModal = true;
  }

  let filteredItems = $derived(
    data.items.filter((item: any) => {
      const matchSearch =
        item.student_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.award_name?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchLevel = selectedLevel === 'ALL' || item.level === selectedLevel;
      return matchSearch && matchLevel;
    })
  );
</script>

<svelte:head>
  <title>Manajemen Prestasi Mahasiswa — Admin HIMA FST</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
    <div>
      <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold mb-2">
        <span class="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
        Hall of Fame & Prestasi
      </div>
      <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Prestasi Mahasiswa</h1>
      <p class="text-sm text-slate-500 mt-1">Kelola data penghargaan, kejuaraan, dan capaian mahasiswa FST yang ditampilkan di Hall of Fame.</p>
    </div>
    <button
      onclick={openCreateModal}
      class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-all shadow-sm active:scale-[0.98]"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      Tambah Prestasi Baru
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
        placeholder="Cari nama mahasiswa, prestasi..."
        class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition"
      />
      <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>

    <div class="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
      <button
        onclick={() => selectedLevel = 'ALL'}
        class="px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap {selectedLevel === 'ALL' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
      >
        Semua Tingkat
      </button>
      {#each levels as lvl}
        <button
          onclick={() => selectedLevel = lvl}
          class="px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap {selectedLevel === lvl ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
        >
          {lvl}
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
            <th class="px-6 py-4">Mahasiswa</th>
            <th class="px-6 py-4">Nama Prestasi & Event</th>
            <th class="px-6 py-4">Tingkat & Tanggal</th>
            <th class="px-6 py-4 text-center">Publikasi</th>
            <th class="px-6 py-4 text-center">Featured ⭐</th>
            <th class="px-6 py-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          {#each filteredItems as item}
            <tr class="hover:bg-slate-50/60 transition">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {#if item.image_url}
                      <img src={item.image_url} alt={item.student_name} class="w-full h-full object-cover" />
                    {:else}
                      <span class="text-xs font-bold text-slate-500">{item.student_name.charAt(0)}</span>
                    {/if}
                  </div>
                  <div>
                    <div class="font-bold text-slate-900">{item.student_name}</div>
                    <div class="text-xs text-slate-500 line-clamp-1">{item.description || 'Mahasiswa FST'}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="font-semibold text-slate-900">{item.title}</div>
                <div class="text-xs text-amber-600 font-medium mt-0.5">{item.award_name || item.title}</div>
              </td>
              <td class="px-6 py-4">
                <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/80">
                  {item.level || 'Nasional'}
                </span>
                {#if item.award_date}
                  <div class="text-[11px] text-slate-400 mt-1">
                    {new Date(item.award_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
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
              <td class="px-6 py-4 text-center">
                <form method="POST" action="?/toggleFeatured" use:enhance class="inline-block">
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="current" value={item.is_featured} />
                  <button
                    type="submit"
                    class="text-xl transition-all hover:scale-125 {item.is_featured ? 'opacity-100 filter drop-shadow' : 'opacity-25 hover:opacity-75'}"
                    title={item.is_featured ? 'Hapus dari Featured' : 'Jadikan Featured Banner'}
                  >
                    ⭐
                  </button>
                </form>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button
                    onclick={() => openEditModal(item)}
                    class="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                    title="Edit Prestasi"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <form method="POST" action="?/delete" use:enhance class="inline">
                    <input type="hidden" name="id" value={item.id} />
                    <button
                      type="submit"
                      onclick={(e) => { if (!confirm(`Hapus prestasi "${item.title}"?`)) e.preventDefault(); }}
                      class="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Hapus Prestasi"
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
              <td colspan="6" class="px-6 py-12 text-center text-slate-400">
                <svg class="w-10 h-10 mx-auto mb-2 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Belum ada data prestasi yang ditemukan.
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
          <h3 class="text-lg font-bold text-slate-900">{isEditing ? 'Edit Prestasi Mahasiswa' : 'Tambah Prestasi Baru'}</h3>
          <p class="text-xs text-slate-500">Data ini akan ditampilkan di Hall of Fame portal mahasiswa.</p>
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

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label for="student_name" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Nama Mahasiswa *</label>
            <input
              id="student_name"
              type="text"
              name="student_name"
              bind:value={formStudentName}
              required
              placeholder="Contoh: Lutfi Ardiansyah"
              class="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>
          <div>
            <label for="level" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Tingkat Prestasi</label>
            <select
              id="level"
              name="level"
              bind:value={formLevel}
              class="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white"
            >
              {#each levels as lvl}
                <option value={lvl}>{lvl}</option>
              {/each}
            </select>
          </div>
        </div>

        <div>
          <label for="title" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Nama Prestasi / Juara *</label>
          <input
            id="title"
            type="text"
            name="title"
            bind:value={formTitle}
            required
            placeholder="Contoh: Juara 1 Desain Poster Ilmiah"
            class="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label for="award_name" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Nama Event / Lomba</label>
            <input
              id="award_name"
              type="text"
              name="award_name"
              bind:value={formAwardName}
              placeholder="Contoh: DISPORSENI UT 2026"
              class="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>
          <div>
            <label for="award_date" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Tanggal Penghargaan</label>
            <input
              id="award_date"
              type="date"
              name="award_date"
              bind:value={formAwardDate}
              class="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>
        </div>

        <div>
          <label for="image_url" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Foto / URL Gambar</label>
          <input
            id="image_url"
            type="text"
            name="image_url"
            bind:value={formImageUrl}
            placeholder="Contoh: /prestasi/lutfi.png atau https://..."
            class="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          />
        </div>

        <div>
          <label for="description" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Deskripsi & Keterangan</label>
          <textarea
            id="description"
            name="description"
            bind:value={formDescription}
            rows="3"
            placeholder="Tuliskan keterangan detail mengenai prestasi ini..."
            class="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
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
            {isEditing ? 'Simpan Perubahan' : 'Tambah Prestasi'}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
