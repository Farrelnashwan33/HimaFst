<script lang="ts">
  import { siteConfig } from '$lib/config/site';
  import { enhance } from '$app/forms';

  let { data, form } = $props();
  
  let chatContainer: HTMLElement;
  let isSubmitting = $state(false);

  // Auto-scroll to bottom when new messages arrive
  $effect(() => {
    if (data.chats && chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  });

  // Format date helper
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };
</script>

<svelte:head>
  <title>Aspirasi & Diskusi | {siteConfig.name}</title>
  <meta name="description" content="Ruang diskusi dan aspirasi Himpunan Mahasiswa Fakultas Sains dan Teknologi" />
</svelte:head>

<div class="max-w-5xl mx-auto h-[calc(100vh-100px)] flex flex-col fade-up py-4 px-4 sm:px-0">
  <!-- Header -->
  <div class="mb-6 shrink-0">
    <div class="inline-flex items-center px-3 py-1 bg-white rounded-full shadow-sm border border-gray-100 mb-4">
      <span class="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-widest">Forum</span>
    </div>
    <h1 class="text-3xl sm:text-4xl font-black text-dark tracking-tight mb-2">
      Ruang Diskusi & Aspirasi
    </h1>
    <p class="text-sm sm:text-base text-gray-500 max-w-2xl font-medium">
      Mari berdiskusi, sampaikan aspirasi, keluhan, maupun ide kreatif seputar HIMA dan tugas perkuliahan.
    </p>
  </div>

  <!-- Chat Area -->
  <div class="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col overflow-hidden relative">
    
    <!-- Messages Container -->
    <div bind:this={chatContainer} class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-gray-50/30 scroll-smooth">
      
      {#if data.chats && data.chats.length > 0}
        {#each data.chats as chat}
          {@const isMe = data.currentUser?.id === chat.user_id}
          
          <div class="flex flex-col {isMe ? 'items-end' : 'items-start'} animate-fade-in-up">
            <div class="flex items-end gap-2 max-w-[85%] sm:max-w-[70%] {isMe ? 'flex-row-reverse' : 'flex-row'}">
              
              <!-- Avatar -->
              <div class="shrink-0">
                {#if chat.avatar_url}
                  <img src={chat.avatar_url} alt={chat.user_name} class="w-8 h-8 rounded-full object-cover shadow-sm border border-gray-100" />
                {:else}
                  <div class="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs font-bold shadow-sm">
                    {chat.user_name?.charAt(0).toUpperCase()}
                  </div>
                {/if}
              </div>

              <!-- Message Bubble -->
              <div class="flex flex-col gap-1 {isMe ? 'items-end' : 'items-start'}">
                <span class="text-[11px] font-semibold text-gray-400 px-1">
                  {chat.user_name}
                  {#if chat.role === 'admin'}
                    <span class="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider ml-1">Admin</span>
                  {/if}
                </span>
                
                <div class="px-4 py-2.5 rounded-2xl text-sm shadow-sm {isMe ? 'bg-primary text-white rounded-br-sm' : 'bg-white text-gray-800 rounded-bl-sm border border-gray-100'}">
                  <p class="whitespace-pre-wrap leading-relaxed">{chat.message}</p>
                </div>
                
                <span class="text-[10px] font-medium text-gray-400 px-1">{formatTime(chat.created_at)}</span>
              </div>
              
            </div>
          </div>
        {/each}
      {:else}
        <div class="h-full flex flex-col items-center justify-center text-center text-gray-400">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          </div>
          <p class="text-sm font-medium">Belum ada obrolan.</p>
          <p class="text-xs">Jadilah yang pertama memulai diskusi!</p>
        </div>
      {/if}

    </div>

    <!-- Error state from form submission -->
    {#if form?.error}
      <div class="absolute bottom-[80px] left-0 right-0 px-6 z-10 flex justify-center">
        <div class="bg-red-50 text-red-600 text-xs font-medium px-4 py-2 rounded-full shadow-sm border border-red-100 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {form.error}
        </div>
      </div>
    {/if}

    <!-- Message Input -->
    <div class="p-4 sm:p-5 bg-white border-t border-gray-100 shrink-0">
      <form method="POST" use:enhance={() => {
        isSubmitting = true;
        return async ({ update }) => {
          await update({ reset: true });
          isSubmitting = false;
        };
      }}>
        <div class="flex items-end gap-3 relative">
          <div class="flex-1 bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all overflow-hidden p-1">
            <textarea 
              name="message" 
              placeholder="Ketik pesan Anda di sini..." 
              rows="1"
              required
              class="w-full bg-transparent border-0 px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:ring-0 resize-none max-h-32 focus:outline-none"
              oninput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = Math.min(target.scrollHeight, 120) + 'px';
              }}
              onkeydown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (e.currentTarget.value.trim() && !isSubmitting) {
                    e.currentTarget.form?.requestSubmit();
                  }
                }
              }}
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            class="shrink-0 w-12 h-12 flex items-center justify-center bg-primary text-white rounded-full hover:bg-primary-700 transition-colors shadow-md disabled:opacity-70 focus:outline-none focus:ring-4 focus:ring-primary/30"
            title="Kirim pesan (Enter)"
          >
            {#if isSubmitting}
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="translate-x-0.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            {/if}
          </button>
        </div>
        <p class="text-[10px] text-gray-400 mt-2 ml-2 hidden sm:block">Tekan <kbd class="px-1 py-0.5 bg-gray-100 border border-gray-200 rounded text-gray-500 font-mono text-[9px]">Enter</kbd> untuk mengirim, <kbd class="px-1 py-0.5 bg-gray-100 border border-gray-200 rounded text-gray-500 font-mono text-[9px]">Shift + Enter</kbd> untuk baris baru.</p>
      </form>
    </div>
  </div>
</div>
