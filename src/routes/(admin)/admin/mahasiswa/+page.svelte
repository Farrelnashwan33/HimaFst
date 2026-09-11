<script lang="ts">
  import { enhance } from '$app/forms';
  import { siteConfig } from '$lib/config/site';

  let { data, form } = $props();

  let searchQuery = $state('');
  let selectedProdi = $state('');
  let selectedStudent = $state<any>(null);
  let editingStudent = $state<any>(null);

  let filteredStudents = $derived(
    (data.students || []).filter((s: any) => {
      const matchSearch =
        searchQuery === '' ||
        (s.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.nim || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.email || '').toLowerCase().includes(searchQuery.toLowerCase());

      const matchProdi = selectedProdi === '' || (s.program_studi || '') === selectedProdi;

      return matchSearch && matchProdi;
    })
  );
</script>

<svelte:head>
  <title>Data Mahasiswa | {siteConfig.name}</title>
</svelte:head>

<div class="space-y-6 fade-in">
  <!-- Page Header -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <h1 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Data Mahasiswa Terdaftar</h1>
      <p class="text-xs sm:text-sm text-slate-500 font-medium mt-1">
        Daftar seluruh mahasiswa aktif yang telah mendaftar dan memiliki akun di Portal HIMA FST.
      </p>
    </div>
    <div class="flex items-center gap-2">
      <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
        <span class="w-2 h-2 rounded-full bg-blue-600"></span>
        Total: {data.students.length} Mahasiswa
      </span>
    </div>
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

  <!-- Search & Filter Controls -->
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
    <div class="sm:col-span-2 relative">
      <div class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      </div>
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Cari berdasarkan Nama, NIM, atau Email..."
        class="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
      />
    </div>

    <div>
      <select
        bind:value={selectedProdi}
        class="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
      >
        <option value="">Semua Program Studi</option>
        {#each (data.prodis || []) as prodi}
          <option value={prodi}>{prodi}</option>
        {/each}
      </select>
    </div>
  </div>

  <!-- Students Data Table -->
  <div class="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs">
        <thead class="bg-slate-50 text-slate-600 font-bold border-b border-slate-100 uppercase tracking-wider">
          <tr>
            <th class="px-5 py-4">Mahasiswa</th>
            <th class="px-5 py-4">NIM</th>
            <th class="px-5 py-4">Program Studi</th>
            <th class="px-5 py-4">Semester</th>
            <th class="px-5 py-4">Kontak WhatsApp</th>
            <th class="px-5 py-4">Tanggal Daftar</th>
            <th class="px-5 py-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          {#each filteredStudents as s}
            <tr class="hover:bg-slate-50/60 transition-colors">
              <td class="px-5 py-3.5">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
                    {s.name ? s.name[0].toUpperCase() : 'M'}
                  </div>
                  <div class="min-w-0">
                    <p class="font-bold text-slate-900 text-sm truncate">{s.name}</p>
                    <p class="text-[11px] text-slate-500 truncate">{s.email}</p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-3.5 font-bold text-slate-800">
                {s.nim || '-'}
              </td>
              <td class="px-5 py-3.5 text-slate-700 font-medium">
                {s.program_studi || '-'}
              </td>
              <td class="px-5 py-3.5">
                {#if s.semester}
                  <span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700">
                    Sem. {s.semester}
                  </span>
                {:else}
                  <span class="text-slate-400">-</span>
                {/if}
              </td>
              <td class="px-5 py-3.5">
                {#if s.whatsapp}
                  <a
                    href={`https://wa.me/${s.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-bold hover:underline"
                  >
                    <span>💬</span>
                    {s.whatsapp}
                  </a>
                {:else}
                  <span class="text-slate-400">-</span>
                {/if}
              </td>
              <td class="px-5 py-3.5 text-slate-500">
                {s.created_at ? new Date(s.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
              </td>
              <td class="px-5 py-3.5 text-right space-x-1">
                <button
                  type="button"
                  onclick={() => (selectedStudent = s)}
                  class="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-xs transition-colors"
                >
                  Detail
                </button>
                <button
                  type="button"
                  onclick={() => (editingStudent = { ...s })}
                  class="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-bold text-xs transition-colors"
                >
                  Edit
                </button>
                <form method="POST" action="?/delete" use:enhance class="inline">
                  <input type="hidden" name="userId" value={s.user_id} />
                  <button
                    type="submit"
                    class="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-bold text-xs transition-colors"
                    onclick={(e) => {
                      if (!confirm(`Hapus akun mahasiswa ${s.name}?`)) e.preventDefault();
                    }}
                  >
                    Hapus
                  </button>
                </form>
              </td>
            </tr>
          {:else}
            <tr>
              <td colspan="7" class="px-5 py-12 text-center text-slate-400">
                <div class="max-w-xs mx-auto space-y-1">
                  <p class="text-base font-bold text-slate-600">Tidak ada mahasiswa ditemukan</p>
                  <p class="text-xs text-slate-400">Coba ubah kata kunci pencarian atau filter program studi.</p>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- Modal Detail Mahasiswa -->
{#if selectedStudent}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
    <div class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 relative">
      <button
        type="button"
        onclick={() => (selectedStudent = null)}
        class="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
        aria-label="Tutup"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>

      <div class="flex items-center gap-4 border-b border-slate-100 pb-4">
        <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#0f4c81] to-[#1e3a8a] text-white flex items-center justify-center font-black text-xl shadow-md">
          {selectedStudent.name ? selectedStudent.name[0].toUpperCase() : 'M'}
        </div>
        <div>
          <h3 class="text-lg font-black text-slate-900">{selectedStudent.name}</h3>
          <p class="text-xs text-slate-500">{selectedStudent.email}</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 text-xs">
        <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
          <span class="block text-slate-400 font-bold mb-1">NIM</span>
          <span class="font-black text-slate-900 text-sm">{selectedStudent.nim || '-'}</span>
        </div>
        <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
          <span class="block text-slate-400 font-bold mb-1">SEMESTER</span>
          <span class="font-black text-slate-900 text-sm">Semester {selectedStudent.semester || '-'}</span>
        </div>
        <div class="col-span-2 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
          <span class="block text-slate-400 font-bold mb-1">PROGRAM STUDI</span>
          <span class="font-bold text-slate-900 text-sm">{selectedStudent.program_studi || '-'}</span>
        </div>
        <div class="col-span-2 p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
          <div>
            <span class="block text-slate-400 font-bold mb-1">WHATSAPP</span>
            <span class="font-bold text-slate-900">{selectedStudent.whatsapp || '-'}</span>
          </div>
          {#if selectedStudent.whatsapp}
            <a
              href={`https://wa.me/${selectedStudent.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs transition-colors"
            >
              Kirim Chat
            </a>
          {/if}
        </div>
      </div>

      <div class="flex justify-end pt-2">
        <button
          type="button"
          onclick={() => (selectedStudent = null)}
          class="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
        >
          Tutup
        </button>
      </div>
    </div>
  </div>
{/if}

<!-- Modal Edit Mahasiswa -->
{#if editingStudent}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
    <div class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 relative">
      <div class="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 class="text-lg font-black text-slate-900">Edit Data Mahasiswa</h3>
          <p class="text-xs text-slate-500">Perbarui data profil akun mahasiswa</p>
        </div>
        <button
          type="button"
          onclick={() => (editingStudent = null)}
          class="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
          aria-label="Tutup"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <form method="POST" action="?/update" use:enhance={() => {
        editingStudent = null;
      }} class="space-y-4">
        <input type="hidden" name="userId" value={editingStudent.user_id} />

        <div class="space-y-1">
          <label for="edit-name" class="block text-xs font-bold text-slate-700">Nama Lengkap</label>
          <input
            id="edit-name"
            name="name"
            type="text"
            required
            value={editingStudent.name}
            class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
          />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1">
            <label for="edit-nim" class="block text-xs font-bold text-slate-700">NIM</label>
            <input
              id="edit-nim"
              name="nim"
              type="text"
              value={editingStudent.nim || ''}
              class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            />
          </div>
          <div class="space-y-1">
            <label for="edit-semester" class="block text-xs font-bold text-slate-700">Semester</label>
            <select
              id="edit-semester"
              name="semester"
              class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white"
            >
              <option value="">Pilih Semester</option>
              {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as sm}
                <option value={String(sm)} selected={editingStudent.semester === String(sm)}>Semester {sm}</option>
              {/each}
            </select>
          </div>
        </div>

        <div class="space-y-1">
          <label for="edit-prodi" class="block text-xs font-bold text-slate-700">Program Studi</label>
          <select
            id="edit-prodi"
            name="programStudi"
            class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white"
          >
            <option value="">Pilih Program Studi</option>
            {#each (data.prodis || []) as pr}
              <option value={pr} selected={editingStudent.program_studi === pr}>{pr}</option>
            {/each}
          </select>
        </div>

        <div class="space-y-1">
          <label for="edit-whatsapp" class="block text-xs font-bold text-slate-700">Nomor WhatsApp</label>
          <input
            id="edit-whatsapp"
            name="whatsapp"
            type="text"
            value={editingStudent.whatsapp || ''}
            class="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
          />
        </div>

        <div class="flex justify-end gap-2 pt-4 border-t border-slate-100">
          <button
            type="button"
            onclick={() => (editingStudent = null)}
            class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
