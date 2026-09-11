<script lang="ts">
  import { enhance } from '$app/forms';
  let { data, form } = $props();

  let showReplyModal = $state(false);
  let selectedChat: any = $state(null);
  let replyText = $state('');

  let searchQuery = $state('');
  let filterRead = $state('ALL');

  function openReply(item: any) {
    selectedChat = item;
    replyText = item.reply || '';
    showReplyModal = true;
  }

  let filteredItems = $derived(
    data.items.filter((item: any) => {
      const matchSearch =
        item.message?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.user_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.user_email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nim?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchRead =
        filterRead === 'ALL' ||
        (filterRead === 'UNREAD' && !item.is_read) ||
        (filterRead === 'READ' && item.is_read);
      return matchSearch && matchRead;
    })
  );

  let unreadCount = $derived(data.items.filter((i: any) => !i.is_read).length);
</script>

<svelte:head>
  <title>Chat Admin & Pesan Masuk — Admin HIMA FST</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
    <div>
      <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-2">
        <span class="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
        Komunikasi Langsung
      </div>
      <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Chat & Pesan Masuk</h1>
      <p class="text-sm text-slate-500 mt-1">Pusat pesan masuk dari mahasiswa, pertanyaan seputar kegiatan, konsultasi, dan respon langsung.</p>
    </div>
    {#if unreadCount > 0}
      <div class="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm font-bold">
        <span class="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
        {unreadCount} Pesan Belum Dibaca
      </div>
    {/if}
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
        placeholder="Cari pesan, nama pengirim, NIM..."
        class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white transition"
      />
      <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>

    <div class="flex items-center gap-2">
      <button
        onclick={() => filterRead = 'ALL'}
        class="px-3 py-1.5 rounded-lg text-xs font-medium transition {filterRead === 'ALL' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
      >
        Semua ({data.items.length})
      </button>
      <button
        onclick={() => filterRead = 'UNREAD'}
        class="px-3 py-1.5 rounded-lg text-xs font-medium transition {filterRead === 'UNREAD' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
      >
        Belum Dibaca ({unreadCount})
      </button>
      <button
        onclick={() => filterRead = 'READ'}
        class="px-3 py-1.5 rounded-lg text-xs font-medium transition {filterRead === 'READ' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
      >
        Sudah Dibaca ({data.items.length - unreadCount})
      </button>
    </div>
  </div>

  <!-- Messages List -->
  <div class="space-y-3">
    {#each filteredItems as item}
      <div class="bg-white p-5 rounded-2xl border transition shadow-sm {item.is_read ? 'border-slate-200/80' : 'border-teal-300 bg-teal-50/20'}">
        <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 flex-shrink-0">
              {item.user_name ? item.user_name.charAt(0) : 'M'}
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-bold text-slate-900">{item.user_name || 'Mahasiswa'}</span>
                {#if !item.is_read}
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800">BARU</span>
                {/if}
              </div>
              <div class="text-xs text-slate-500 mt-0.5">
                NIM: {item.nim || '—'} • {item.program_studi || 'FST'} • {item.user_email || '—'}
              </div>
            </div>
          </div>

          <div class="text-xs text-slate-400">
            {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        <div class="mt-3.5 pl-13 text-sm text-slate-800 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
          <p class="whitespace-pre-line">{item.message}</p>
        </div>

        {#if item.reply}
          <div class="mt-2.5 pl-13 text-xs text-teal-800 bg-teal-50 p-3 rounded-xl border border-teal-200">
            <div class="font-bold flex items-center gap-1.5 mb-1 text-teal-900">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              Balasan Admin:
            </div>
            <p class="whitespace-pre-line">{item.reply}</p>
          </div>
        {/if}

        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div class="flex items-center gap-2">
            {#if item.whatsapp}
              <a
                href="https://wa.me/{item.whatsapp.replace(/\D/g, '')}"
                target="_blank"
                rel="noreferrer"
                class="px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg transition inline-flex items-center gap-1"
              >
                <span>💬 Chat WA</span>
              </a>
            {/if}
          </div>

          <div class="flex items-center gap-2">
            {#if !item.is_read}
              <form method="POST" action="?/markRead" use:enhance class="inline">
                <input type="hidden" name="id" value={item.id} />
                <button
                  type="submit"
                  class="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Tandai Dibaca
                </button>
              </form>
            {/if}
            <button
              onclick={() => openReply(item)}
              class="px-3.5 py-1.5 text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 rounded-lg transition"
            >
              {item.reply ? 'Edit Balasan' : 'Balas Pesan'}
            </button>
            <form method="POST" action="?/delete" use:enhance class="inline">
              <input type="hidden" name="id" value={item.id} />
              <button
                type="submit"
                onclick={(e) => { if (!confirm('Hapus chat ini?')) e.preventDefault(); }}
                class="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                title="Hapus Pesan"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    {:else}
      <div class="bg-white p-12 text-center rounded-2xl border border-slate-200/80">
        <svg class="w-10 h-10 mx-auto mb-2 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <p class="text-slate-500 text-sm">Tidak ada pesan masuk.</p>
      </div>
    {/each}
  </div>
</div>

<!-- Modal Reply -->
{#if showReplyModal && selectedChat}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
    <div class="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 overflow-hidden">
      <div class="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 class="text-lg font-bold text-slate-900">Balas Pesan Mahasiswa</h3>
          <p class="text-xs text-slate-500">Pengirim: {selectedChat.user_name || 'Mahasiswa'}</p>
        </div>
        <button onclick={() => showReplyModal = false} class="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="p-3.5 bg-slate-50 rounded-xl my-4 text-xs text-slate-700">
        <div class="font-bold text-slate-900 mb-1">Pesan dari mahasiswa:</div>
        <p class="whitespace-pre-line">{selectedChat.message}</p>
      </div>

      <form method="POST" action="?/reply" use:enhance={() => { showReplyModal = false; }} class="space-y-4">
        <input type="hidden" name="id" value={selectedChat.id} />

        <div>
          <label for="chat_reply_text" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Balasan Anda *</label>
          <textarea
            id="chat_reply_text"
            name="reply"
            bind:value={replyText}
            required
            rows="4"
            placeholder="Tuliskan jawaban atau instruksi untuk mahasiswa..."
            class="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
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
            Kirim Balasan
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
