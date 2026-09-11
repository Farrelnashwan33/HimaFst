<script lang="ts">
  import { enhance } from '$app/forms';
  let { data, form } = $props();

  let showDetailModal = $state(false);
  let selectedApplicant: any = $state(null);

  let searchQuery = $state('');
  let selectedStatus = $state('ALL');

  const statuses = ['MENUNGGU', 'DITINJAU', 'DITERIMA', 'DITOLAK'];

  function openDetail(item: any) {
    selectedApplicant = item;
    showDetailModal = true;
  }

  let filteredItems = $derived(
    data.items.filter((item: any) => {
      const matchSearch =
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nim?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.prodi?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.division_choice?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = selectedStatus === 'ALL' || item.status === selectedStatus;
      return matchSearch && matchStatus;
    })
  );

  function getStatusBadge(status: string) {
    switch (status?.toUpperCase()) {
      case 'MENUNGGU':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'DITINJAU':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'DITERIMA':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'DITOLAK':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  }
</script>

<svelte:head>
  <title>Pendaftaran Calon Pengurus HIMA — Admin HIMA FST</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
    <div>
      <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold mb-2">
        <span class="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
        Open Recruitment
      </div>
      <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Pendaftaran Pengurus HIMA</h1>
      <p class="text-sm text-slate-500 mt-1">Kelola data seluruh pendaftar, seleksi administrasi, pilihan divisi, dan verifikasi status calon pengurus.</p>
    </div>
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
        placeholder="Cari nama, NIM, email, prodi..."
        class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:bg-white transition"
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
        Semua ({data.items.length})
      </button>
      {#each statuses as st}
        <button
          onclick={() => selectedStatus = st}
          class="px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap {selectedStatus === st ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
        >
          {st} ({data.items.filter((i: any) => i.status === st).length})
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
            <th class="px-6 py-4">Pendaftar</th>
            <th class="px-6 py-4">Program Studi</th>
            <th class="px-6 py-4">Pilihan Divisi</th>
            <th class="px-6 py-4">Status Seleksi</th>
            <th class="px-6 py-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          {#each filteredItems as item}
            <tr class="hover:bg-slate-50/60 transition">
              <td class="px-6 py-4">
                <div class="font-bold text-slate-900">{item.name}</div>
                <div class="text-xs text-slate-500">NIM: {item.nim} • {item.email}</div>
                {#if item.whatsapp}
                  <a
                    href="https://wa.me/{item.whatsapp.replace(/\D/g, '')}"
                    target="_blank"
                    rel="noreferrer"
                    class="text-[11px] text-emerald-600 hover:underline inline-flex items-center gap-1 mt-0.5"
                  >
                    <span>💬 WA: {item.whatsapp}</span>
                  </a>
                {/if}
              </td>
              <td class="px-6 py-4">
                <span class="font-semibold text-slate-800 text-xs">{item.prodi || '—'}</span>
                {#if item.semester}
                  <div class="text-[11px] text-slate-400">Semester {item.semester}</div>
                {/if}
              </td>
              <td class="px-6 py-4">
                <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200/80">
                  {item.division_choice || 'Umum'}
                </span>
              </td>
              <td class="px-6 py-4">
                <form method="POST" action="?/updateStatus" use:enhance class="inline-block">
                  <input type="hidden" name="id" value={item.id} />
                  <select
                    name="status"
                    value={item.status || 'MENUNGGU'}
                    onchange={(e) => (e.target as HTMLSelectElement).form?.requestSubmit()}
                    class="px-2.5 py-1 text-xs font-bold rounded-lg border focus:outline-none cursor-pointer {getStatusBadge(item.status)}"
                  >
                    {#each statuses as st}
                      <option value={st}>{st}</option>
                    {/each}
                  </select>
                </form>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button
                    onclick={() => openDetail(item)}
                    class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition"
                  >
                    Detail
                  </button>
                  <form method="POST" action="?/delete" use:enhance class="inline">
                    <input type="hidden" name="id" value={item.id} />
                    <button
                      type="submit"
                      onclick={(e) => { if (!confirm(`Hapus pendaftaran "${item.name}"?`)) e.preventDefault(); }}
                      class="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Hapus Pendaftaran"
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
                Belum ada pendaftaran yang sesuai filter.
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- Modal Detail Applicant -->
{#if showDetailModal && selectedApplicant}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
    <div class="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
      <div class="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 class="text-lg font-bold text-slate-900">Detail Pendaftar HIMA</h3>
          <p class="text-xs text-slate-500">Tanggal: {new Date(selectedApplicant.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        <button onclick={() => showDetailModal = false} class="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="space-y-4 py-4 overflow-y-auto pr-1 text-sm">
        <div class="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
          <div>
            <div class="text-[11px] font-semibold text-slate-400 uppercase">Nama Lengkap</div>
            <div class="font-bold text-slate-900 mt-0.5">{selectedApplicant.name}</div>
          </div>
          <div>
            <div class="text-[11px] font-semibold text-slate-400 uppercase">NIM</div>
            <div class="font-bold text-slate-900 mt-0.5">{selectedApplicant.nim}</div>
          </div>
          <div>
            <div class="text-[11px] font-semibold text-slate-400 uppercase">Program Studi</div>
            <div class="font-medium text-slate-800 mt-0.5">{selectedApplicant.prodi || '—'} (Smt {selectedApplicant.semester || '—'})</div>
          </div>
          <div>
            <div class="text-[11px] font-semibold text-slate-400 uppercase">Pilihan Divisi</div>
            <div class="font-bold text-purple-700 mt-0.5">{selectedApplicant.division_choice}</div>
          </div>
          <div>
            <div class="text-[11px] font-semibold text-slate-400 uppercase">Email</div>
            <div class="text-slate-800 mt-0.5 text-xs">{selectedApplicant.email}</div>
          </div>
          <div>
            <div class="text-[11px] font-semibold text-slate-400 uppercase">WhatsApp</div>
            <div class="text-slate-800 mt-0.5 text-xs">{selectedApplicant.whatsapp}</div>
          </div>
        </div>

        <div>
          <div class="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Alasan Bergabung:</div>
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 text-xs leading-relaxed whitespace-pre-line">
            {selectedApplicant.reason || 'Tidak ada keterangan.'}
          </div>
        </div>

        <div>
          <div class="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Pengalaman Organisasi / Keahlian:</div>
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 text-xs leading-relaxed whitespace-pre-line">
            {selectedApplicant.experience || 'Tidak ada keterangan.'}
          </div>
        </div>

        <form method="POST" action="?/updateStatus" use:enhance={() => { showDetailModal = false; }} class="pt-3 border-t border-slate-100">
          <input type="hidden" name="id" value={selectedApplicant.id} />
          <label for="modal_applicant_status" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Update Status Seleksi</label>
          <div class="flex items-center gap-2">
            <select
              id="modal_applicant_status"
              name="status"
              value={selectedApplicant.status}
              class="flex-grow px-3 py-2 text-sm border border-slate-200 rounded-xl bg-white"
            >
              {#each statuses as st}
                <option value={st}>{st}</option>
              {/each}
            </select>
            <button
              type="submit"
              class="px-4 py-2 bg-slate-900 text-white font-semibold text-sm rounded-xl hover:bg-slate-800"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}
