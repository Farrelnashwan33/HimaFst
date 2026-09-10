<script lang="ts">
  import { siteConfig } from '$lib/config/site';
  
  let { data } = $props();
</script>

<svelte:head>
  <title>Profil Saya | {siteConfig.name}</title>
</svelte:head>

<div class="px-6 py-8 md:p-8 max-w-4xl mx-auto space-y-8 fade-in">
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <div class="h-32 bg-primary"></div>
    <div class="px-8 pb-8 relative">
      <div class="absolute -top-16 left-8 w-32 h-32 bg-white rounded-full p-2 shadow-lg group">
        <div class="w-full h-full bg-primary/10 rounded-full flex items-center justify-center text-4xl font-black text-primary overflow-hidden relative">
          <!-- Placeholder or Image -->
          {#if data.profile?.avatar_url}
            <img src={data.profile.avatar_url} alt="Profile" class="w-full h-full object-cover" />
          {:else}
            {data.profile ? data.profile.full_name[0].toUpperCase() : 'M'}
          {/if}
          
          <!-- Overlay for Edit -->
          <label class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
            <input type="file" class="hidden" accept="image/*" />
          </label>
        </div>
      </div>
      
      <div class="pt-24 sm:pt-20">
        <h1 class="text-3xl font-black text-dark">{data.profile?.full_name || 'Nama Mahasiswa'}</h1>
        <p class="text-gray-500 font-medium mb-6">{data.profile?.nim || 'NIM'} • {data.profile?.prodi_name || 'Program Studi'}</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="text-lg font-bold text-dark border-b pb-2">Informasi Kontak</h3>
            <div>
              <span class="block text-sm text-gray-500 mb-1">Email</span>
              <span class="font-semibold text-dark">{data.user.email}</span>
            </div>
            <div>
              <span class="block text-sm text-gray-500 mb-1">WhatsApp</span>
              <span class="font-semibold text-dark">{data.profile?.whatsapp || '-'}</span>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="text-lg font-bold text-dark border-b pb-2">Data Akademik</h3>
            <div>
              <span class="block text-sm text-gray-500 mb-1">Program Studi</span>
              <span class="font-semibold text-dark">{data.profile?.prodi_name || '-'}</span>
            </div>
            <div>
              <span class="block text-sm text-gray-500 mb-1">Semester Aktif</span>
              <span class="font-semibold text-dark">{data.profile?.semester || '-'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
