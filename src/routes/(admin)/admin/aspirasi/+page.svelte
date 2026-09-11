<script lang="ts">
  import { enhance } from '$app/forms';
  let { data, form } = $props();

  let showReplyModal = $state(false);
  let selectedAspiration: any = $state(null);
  let replyText = $state('');
  let replyStatus = $state('DIPROSES');

  let searchQuery = $state('');
  let selectedStatus = $state('ALL');

  const statuses = ['BARU', 'DIPROSES', 'SELESAI', 'DITOLAK'];

  function openReplyModal(item: any) {
    selectedAspiration = item;
    replyText = item.reply || '';
    replyStatus = item.status === 'BARU' ? 'DIPROSES' : item.status;
    showReplyModal = true;
  }

  let filteredItems = $derived(
    data.items.filter((item: any) => {
      const matchSearch =
        item.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nim?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = selectedStatus === 'ALL' || item.status === selectedStatus;
      return matchSearch && matchStatus;
    })
  );

  function getStatusBadge(status: string) {
    switch (status?.toUpperCase()) {
      case 'BARU':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'DIPROSES':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'SELESAI':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'DITOLAK':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  }
</script>

<svelte:head>
  <title>Aspirasi Mahasiswa — Admin HIMA FST</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
    <div>
      <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold mb-2">
        <span class="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
        Kotak Suara Mahasiswa
      </div>
      <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Aspirasi & Masukan Mahasiswa</h1>
      <p class="text-sm text-slate-500 mt-1">Dengar dan tindak lanjuti kritik, saran, serta aspirasi dari mahasiswa Fakultas Sains dan Teknologi.</p>
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
        placeholder="Cari aspirasi, NIM, nama..."
        class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 focus:bg-white transition"
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

  <!-- Cards List -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    {#each filteredItems as item}
      <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-slate-300 transition">
        <div>
          <div class="flex items-start justify-between gap-2 mb-3">
            <div>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border {getStatusBadge(item.status)}">
                {item.status || 'BARU'}
              </span>
              <span class="text-xs text-slate-400 ml-2">
                {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <form method="POST" action="?/delete" use:enhance class="inline">
              <input type="hidden" name="id" value={item.id} />
              <button
                type="submit"
                onclick={(e) => { if (!confirm('Hapus aspirasi ini?')) e.preventDefault(); }}
                class="p-1 text-slate-300 hover:text-red-500 rounded transition"
                title="Hapus"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </form>
          </div>

          <h3 class="text-base font-bold text-slate-900 mb-1">{item.subject || 'Aspirasi Mahasiswa'}</h3>
          <p class="text-sm text-slate-600 leading-relaxed mb-4 whitespace-pre-line">{item.content}</p>

          {#if item.reply}
            <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 mb-4">
              <div class="font-bold text-slate-900 mb-1 flex items-center gap-1.5 text-blue-600">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                Tanggapan Pengurus HIMA:
              </div>
              <p class="whitespace-pre-line">{item.reply}</p>
            </div>
          {/if}
        </div>

        <div class="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div class="text-slate-500 font-medium">
            Pengirim: <strong class="text-slate-800">{item.name || 'Anonim'}</strong> {#if item.nim}<span class="text-slate-400">({item.nim})</span>{/if}
          </div>

          <div class="flex items-center gap-2">
            <button
              onclick={() => openReplyModal(item)}
              class="px-3 py-1.5 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition"
            >
              {item.reply ? 'Edit Balasan' : 'Beri Balasan'}
            </button>
          </div>
        </div>
      </div>
    {:else}
      <div class="col-span-full bg-white p-12 text-center rounded-2xl border border-slate-200/80">
        <svg class="w-10 h-10 mx-auto mb-2 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <p class="text-slate-500 text-sm">Belum ada data aspirasi mahasiswa.</p>
      </div>
    {/each}
  </div>
</div>

<!-- Modal Reply / Update Status -->
{#if showReplyModal && selectedAspiration}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
    <div class="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 overflow-hidden">
      <div class="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 class="text-lg font-bold text-slate-900">Tanggapi Aspirasi Mahasiswa</h3>
          <p class="text-xs text-slate-500">Tanggapan akan tersimpan dan dapat dilihat oleh mahasiswa.</p>
        </div>
        <button onclick={() => showReplyModal = false} class="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="p-3.5 bg-slate-50 rounded-xl my-4 text-xs text-slate-600">
        <div class="font-bold text-slate-900 mb-1">{selectedAspiration.subject || 'Aspirasi'}</div>
        <p class="line-clamp-3">{selectedAspiration.content}</p>
      </div>

      <form method="POST" action="?/reply" use:enhance={() => { showReplyModal = false; }} class="space-y-4">
        <input type="hidden" name="id" value={selectedAspiration.id} />

        <div>
          <label for="aspiration_status" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Status Aspirasi</label>
          <select
            id="aspiration_status"
            name="status"
            bind:value={replyStatus}
            class="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-white"
          >
            {#each statuses as st}
              <option value={st}>{st}</option>
            {/each}
          </select>
        </div>

        <div>
          <label for="aspiration_reply" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Tanggapan Pengurus *</label>
          <textarea
            id="aspiration_reply"
            name="reply"
            bind:value={replyText}
            required
            rows="4"
            placeholder="Tuliskan tanggapan atau tindak lanjut dari pengurus HIMA..."
            class="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
          ></textarea>
        </div>

        <div class="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
          <button
            type="button"
            onclick={() => showReplyModal = false}
            class="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
          >
            Batal
          </button>
          <button
            type="submit"
            class="px-5 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition shadow-sm"
          >
            Kirim Tanggapan
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
