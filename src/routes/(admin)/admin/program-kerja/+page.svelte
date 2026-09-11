<script lang="ts">
  import { enhance } from '$app/forms';
  let { data, form } = $props();

  let showModal = $state(false);
  let isEditing = $state(false);

  let formId = $state('');
  let formTitle = $state('');
  let formDivisionName = $state('');
  let formDescription = $state('');
  let formObjective = $state('');
  let formProgramDate = $state('');
  let formLocation = $state('');
  let formPersonInCharge = $state('');
  let formStatus = $state('Rencana');

  let searchQuery = $state('');
  let selectedStatus = $state('ALL');

  const statuses = ['Rencana', 'Berlangsung', 'Selesai', 'Ditunda'];

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
    formTitle = '';
    formDivisionName = divisionList[0] || 'HIMA FST';
    formDescription = '';
    formObjective = '';
    formProgramDate = new Date().toISOString().split('T')[0];
    formLocation = 'Online / Kampus UT';
    formPersonInCharge = '';
    formStatus = 'Rencana';
    showModal = true;
  }

  function openEditModal(item: any) {
    isEditing = true;
    formId = item.id;
    formTitle = item.title || '';
    formDivisionName = item.division_name || divisionList[0] || 'HIMA FST';
    formDescription = item.description || '';
    formObjective = item.objective || '';
    formProgramDate = item.program_date ? item.program_date.split('T')[0] : '';
    formLocation = item.location || '';
    formPersonInCharge = item.person_in_charge || '';
    formStatus = item.status || 'Rencana';
    showModal = true;
  }

  let filteredItems = $derived(
    data.items.filter((item: any) => {
      const matchSearch =
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.division_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.person_in_charge?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = selectedStatus === 'ALL' || item.status === selectedStatus;
      return matchSearch && matchStatus;
    })
  );

  function getStatusBadge(status: string) {
    switch (status) {
      case 'Berlangsung':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Selesai':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Ditunda':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  }
</script>

<svelte:head>
  <title>Program Kerja HIMA — Admin HIMA FST</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
    <div>
      <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
        <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
        Perencanaan & Proker
      </div>
      <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Program Kerja HIMA</h1>
      <p class="text-sm text-slate-500 mt-1">Kelola seluruh program kerja divisi, jadwal pelaksanaan, penanggung jawab, dan progres kegiatan.</p>
    </div>
    <button
      onclick={openCreateModal}
      class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-all shadow-sm active:scale-[0.98]"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      Tambah Program Kerja
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
        placeholder="Cari proker, divisi, PJ..."
        class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition"
      />
      <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>

    <div class="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
      <button
        onclick={() => selectedStatus = 'ALL'}
        class="px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap {selectedStatus === 'ALL' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
      >
        Semua
      </button>
      {#each statuses as st}
        <button
          onclick={() => selectedStatus = st}
          class="px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap {selectedStatus === st ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
        >
          {st}
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
            <th class="px-6 py-4">Nama Program Kerja</th>
            <th class="px-6 py-4">Divisi & PJ</th>
            <th class="px-6 py-4">Target Waktu & Tempat</th>
            <th class="px-6 py-4 text-center">Status</th>
            <th class="px-6 py-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          {#each filteredItems as item}
            <tr class="hover:bg-slate-50/60 transition">
              <td class="px-6 py-4">
                <div class="font-bold text-slate-900">{item.title}</div>
                {#if item.description}
                  <div class="text-xs text-slate-500 mt-0.5 line-clamp-1">{item.description}</div>
                {/if}
              </td>
              <td class="px-6 py-4">
                <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  {item.division_name || 'HIMA FST'}
                </span>
                {#if item.person_in_charge}
                  <div class="text-[11px] text-slate-500 mt-1">PJ: {item.person_in_charge}</div>
                {/if}
              </td>
              <td class="px-6 py-4">
                {#if item.program_date}
                  <div class="text-xs font-medium text-slate-800">
                    {new Date(item.program_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                {/if}
                <div class="text-[11px] text-slate-400">{item.location || 'Online'}</div>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="px-2.5 py-1 rounded-full text-xs font-bold border {getStatusBadge(item.status)}">
                  {item.status || 'Rencana'}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button
                    onclick={() => openEditModal(item)}
                    class="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Edit Proker"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <form method="POST" action="?/delete" use:enhance class="inline">
                    <input type="hidden" name="id" value={item.id} />
                    <button
                      type="submit"
                      onclick={(e) => { if (!confirm(`Hapus proker "${item.title}"?`)) e.preventDefault(); }}
                      class="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Hapus Proker"
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
                Belum ada data program kerja.
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
    <div class="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
      <div class="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 class="text-lg font-bold text-slate-900">{isEditing ? 'Edit Program Kerja' : 'Tambah Program Kerja Baru'}</h3>
          <p class="text-xs text-slate-500">Program kerja HIMA FST terkoordinasi antar divisi.</p>
        </div>
        <button onclick={() => showModal = false} class="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg" aria-label="Tutup">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form method="POST" action={isEditing ? '?/update' : '?/create'} use:enhance={() => { showModal = false; }} class="space-y-4 pt-4 overflow-y-auto pr-1">
        {#if isEditing}
          <input type="hidden" name="id" value={formId} />
        {/if}

        <div>
          <label for="proker_title" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Nama Program Kerja *</label>
          <input
            id="proker_title"
            type="text"
            name="title"
            bind:value={formTitle}
            required
            placeholder="Contoh: FST Coding Bootcamp 2026"
            class="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label for="proker_div" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Divisi Pelaksana</label>
            <select
              id="proker_div"
              name="division_name"
              bind:value={formDivisionName}
              class="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
            >
              {#each divisionList as div}
                <option value={div}>{div}</option>
              {/each}
            </select>
          </div>
          <div>
            <label for="proker_status" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Status Progres</label>
            <select
              id="proker_status"
              name="status"
              bind:value={formStatus}
              class="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
            >
              {#each statuses as st}
                <option value={st}>{st}</option>
              {/each}
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label for="proker_date" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Target Tanggal</label>
            <input
              id="proker_date"
              type="date"
              name="program_date"
              bind:value={formProgramDate}
              class="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
          <div>
            <label for="proker_pj" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Penanggung Jawab (PJ)</label>
            <input
              id="proker_pj"
              type="text"
              name="person_in_charge"
              bind:value={formPersonInCharge}
              placeholder="Contoh: Keisha Refanaura"
              class="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label for="proker_location" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Lokasi / Tempat Pelaksanaan</label>
          <input
            id="proker_location"
            type="text"
            name="location"
            bind:value={formLocation}
            placeholder="Contoh: Aula UT Bandung / Zoom Meeting"
            class="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div>
          <label for="proker_desc" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Deskripsi Program</label>
          <textarea
            id="proker_desc"
            name="description"
            bind:value={formDescription}
            rows="2"
            placeholder="Tuliskan gambaran pelaksanaan kegiatan..."
            class="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
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
            {isEditing ? 'Simpan Perubahan' : 'Tambah Proker'}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
