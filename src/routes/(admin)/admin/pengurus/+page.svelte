<script lang="ts">
  import { enhance } from '$app/forms';
  let { data, form } = $props();

  let showModal = $state(false);
  let isEditing = $state(false);

  let formId = $state('');
  let formName = $state('');
  let formPosition = $state('');
  let formDivisionName = $state('');
  let formImageUrl = $state('');
  let formPeriod = $state('2026/2027');

  let searchQuery = $state('');
  let selectedDivision = $state('ALL');

  const defaultDivisions = [
    'Badan Pengurus Harian',
    'Bendahara',
    'Sekretaris',
    'Hubungan Masyarakat',
    'Pengembangan Sumber Daya Mahasiswa',
    'Media Informasi & Teknologi'
  ];

  let divisionList = $derived(
    data.divisions?.length > 0 ? data.divisions.map((d: any) => d.name) : defaultDivisions
  );

  function openCreateModal() {
    isEditing = false;
    formId = '';
    formName = '';
    formPosition = '';
    formDivisionName = divisionList[0] || 'Badan Pengurus Harian';
    formImageUrl = '/anggota/639728685_17893420674411782_4440245931304648053_n..webp';
    formPeriod = '2026/2027';
    showModal = true;
  }

  function openEditModal(item: any) {
    isEditing = true;
    formId = item.id;
    formName = item.name || '';
    formPosition = item.position || '';
    formDivisionName = item.division_name || divisionList[0] || 'Badan Pengurus Harian';
    formImageUrl = item.image_url || '';
    formPeriod = item.period || '2026/2027';
    showModal = true;
  }

  let filteredItems = $derived(
    data.items.filter((item: any) => {
      const matchSearch =
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.position?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.division_name?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchDivision = selectedDivision === 'ALL' || item.division_name === selectedDivision;
      return matchSearch && matchDivision;
    })
  );
</script>

<svelte:head>
  <title>Manajemen Pengurus HIMA — Admin HIMA FST</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
    <div>
      <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
        Struktur Kepengurusan
      </div>
      <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Pengurus HIMA FST</h1>
      <p class="text-sm text-slate-500 mt-1">Kelola data susunan pengurus, ketua, sekretaris, bendahara, dan koordinator divisi HIMA FST.</p>
    </div>
    <button
      onclick={openCreateModal}
      class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-all shadow-sm active:scale-[0.98]"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      Tambah Pengurus Baru
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
        placeholder="Cari nama pengurus, jabatan..."
        class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition"
      />
      <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>

    <div class="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
      <button
        onclick={() => selectedDivision = 'ALL'}
        class="px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap {selectedDivision === 'ALL' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
      >
        Semua Divisi
      </button>
      {#each divisionList as div}
        <button
          onclick={() => selectedDivision = div}
          class="px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap {selectedDivision === div ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
        >
          {div}
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
            <th class="px-6 py-4">Foto & Nama Pengurus</th>
            <th class="px-6 py-4">Jabatan</th>
            <th class="px-6 py-4">Divisi & Periode</th>
            <th class="px-6 py-4 text-center">Status Aktif</th>
            <th class="px-6 py-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          {#each filteredItems as item}
            <tr class="hover:bg-slate-50/60 transition">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-11 h-11 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0 flex items-center justify-center shadow-inner">
                    {#if item.image_url}
                      <img src={item.image_url} alt={item.name} class="w-full h-full object-cover" />
                    {:else}
                      <span class="text-sm font-bold text-slate-600">{item.name.charAt(0)}</span>
                    {/if}
                  </div>
                  <div>
                    <div class="font-bold text-slate-900">{item.name}</div>
                    <div class="text-xs text-slate-400">ID: #{item.id}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="font-semibold text-slate-900">{item.position}</span>
              </td>
              <td class="px-6 py-4">
                <div class="font-medium text-emerald-800 text-xs bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block border border-emerald-200/80">
                  {item.division_name || 'HIMA FST'}
                </div>
                <div class="text-[11px] text-slate-400 mt-1">Periode {item.period || '2026/2027'}</div>
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
                    class="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                    title="Edit Pengurus"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <form method="POST" action="?/delete" use:enhance class="inline">
                    <input type="hidden" name="id" value={item.id} />
                    <button
                      type="submit"
                      onclick={(e) => { if (!confirm(`Hapus pengurus "${item.name}"?`)) e.preventDefault(); }}
                      class="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Hapus Pengurus"
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Belum ada data pengurus yang ditemukan.
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
          <h3 class="text-lg font-bold text-slate-900">{isEditing ? 'Edit Pengurus HIMA' : 'Tambah Pengurus Baru'}</h3>
          <p class="text-xs text-slate-500">Data pengurus akan otomatis ditampilkan di halaman Pengurus Mahasiswa.</p>
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
          <label for="officer_name" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Nama Lengkap *</label>
          <input
            id="officer_name"
            type="text"
            name="name"
            bind:value={formName}
            required
            placeholder="Contoh: Tasya Angelicia"
            class="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label for="officer_position" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Jabatan *</label>
            <input
              id="officer_position"
              type="text"
              name="position"
              bind:value={formPosition}
              required
              placeholder="Contoh: Ketua Himpunan"
              class="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
          <div>
            <label for="officer_period" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Periode</label>
            <input
              id="officer_period"
              type="text"
              name="period"
              bind:value={formPeriod}
              placeholder="Contoh: 2026/2027"
              class="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <label for="officer_division" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Divisi / Bidang</label>
          <select
            id="officer_division"
            name="division_name"
            bind:value={formDivisionName}
            class="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
          >
            {#each divisionList as div}
              <option value={div}>{div}</option>
            {/each}
          </select>
        </div>

        <div>
          <label for="officer_image" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Foto Pengurus (Path / URL)</label>
          <input
            id="officer_image"
            type="text"
            name="image_url"
            bind:value={formImageUrl}
            placeholder="Contoh: /anggota/... atau https://..."
            class="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
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
            {isEditing ? 'Simpan Perubahan' : 'Tambah Pengurus'}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
