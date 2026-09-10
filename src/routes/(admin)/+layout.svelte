<script lang="ts">
  import { page } from '$app/stores';
  import { siteConfig } from '$lib/config/site';
  
  let { children, data } = $props();
  
  let isProfileOpen = $state(false);
</script>

<svelte:head>
  <title>Admin Dashboard | {siteConfig.name}</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 flex">
  <!-- Admin Sidebar -->
  <aside class="w-64 bg-dark text-white hidden md:flex flex-col border-r border-gray-800">
    <div class="h-20 flex items-center px-6 border-b border-gray-800">
      <div class="font-black text-xl tracking-tight text-white flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-sm">
          A
        </div>
        Portal Admin
      </div>
    </div>
    
    <div class="flex-1 overflow-y-auto py-6 px-4 space-y-1">
      <a href="/admin/dashboard" class="flex items-center gap-3 px-3 py-2.5 rounded-xl {$page.url.pathname === '/admin/dashboard' ? 'bg-primary text-white font-bold' : 'text-gray-400 hover:text-white hover:bg-gray-800'} transition-colors">
        Dashboard
      </a>
      <a href="/admin/mahasiswa" class="flex items-center gap-3 px-3 py-2.5 rounded-xl {$page.url.pathname.startsWith('/admin/mahasiswa') ? 'bg-primary text-white font-bold' : 'text-gray-400 hover:text-white hover:bg-gray-800'} transition-colors">
        Mahasiswa
      </a>
      <a href="/admin/informasi" class="flex items-center gap-3 px-3 py-2.5 rounded-xl {$page.url.pathname.startsWith('/admin/informasi') ? 'bg-primary text-white font-bold' : 'text-gray-400 hover:text-white hover:bg-gray-800'} transition-colors">
        Informasi
      </a>
      <a href="/admin/kalender" class="flex items-center gap-3 px-3 py-2.5 rounded-xl {$page.url.pathname.startsWith('/admin/kalender') ? 'bg-primary text-white font-bold' : 'text-gray-400 hover:text-white hover:bg-gray-800'} transition-colors">
        Kalender Kegiatan
      </a>
      <a href="/admin/prestasi" class="flex items-center gap-3 px-3 py-2.5 rounded-xl {$page.url.pathname.startsWith('/admin/prestasi') ? 'bg-primary text-white font-bold' : 'text-gray-400 hover:text-white hover:bg-gray-800'} transition-colors">
        Prestasi
      </a>
      <a href="/admin/pengurus" class="flex items-center gap-3 px-3 py-2.5 rounded-xl {$page.url.pathname.startsWith('/admin/pengurus') ? 'bg-primary text-white font-bold' : 'text-gray-400 hover:text-white hover:bg-gray-800'} transition-colors">
        Pengurus
      </a>
      <a href="/admin/program-studi" class="flex items-center gap-3 px-3 py-2.5 rounded-xl {$page.url.pathname.startsWith('/admin/program-studi') ? 'bg-primary text-white font-bold' : 'text-gray-400 hover:text-white hover:bg-gray-800'} transition-colors">
        Program Studi
      </a>
      <a href="/admin/divisi" class="flex items-center gap-3 px-3 py-2.5 rounded-xl {$page.url.pathname.startsWith('/admin/divisi') ? 'bg-primary text-white font-bold' : 'text-gray-400 hover:text-white hover:bg-gray-800'} transition-colors">
        Divisi Himpunan
      </a>
      <a href="/admin/akademik" class="flex items-center gap-3 px-3 py-2.5 rounded-xl {$page.url.pathname.startsWith('/admin/akademik') ? 'bg-primary text-white font-bold' : 'text-gray-400 hover:text-white hover:bg-gray-800'} transition-colors">
        Akademik
      </a>
      <a href="/admin/program-kerja" class="flex items-center gap-3 px-3 py-2.5 rounded-xl {$page.url.pathname.startsWith('/admin/program-kerja') ? 'bg-primary text-white font-bold' : 'text-gray-400 hover:text-white hover:bg-gray-800'} transition-colors">
        Program Kerja
      </a>
      <a href="/admin/aspirasi" class="flex items-center gap-3 px-3 py-2.5 rounded-xl {$page.url.pathname.startsWith('/admin/aspirasi') ? 'bg-primary text-white font-bold' : 'text-gray-400 hover:text-white hover:bg-gray-800'} transition-colors">
        Aspirasi Mahasiswa
      </a>
      <a href="/admin/pendaftaran" class="flex items-center gap-3 px-3 py-2.5 rounded-xl {$page.url.pathname.startsWith('/admin/pendaftaran') ? 'bg-primary text-white font-bold' : 'text-gray-400 hover:text-white hover:bg-gray-800'} transition-colors">
        Pendaftaran Himpunan
      </a>
      <a href="/admin/quick-access" class="flex items-center gap-3 px-3 py-2.5 rounded-xl {$page.url.pathname.startsWith('/admin/quick-access') ? 'bg-primary text-white font-bold' : 'text-gray-400 hover:text-white hover:bg-gray-800'} transition-colors">
        Quick Access
      </a>
      <a href="/admin/settings" class="flex items-center gap-3 px-3 py-2.5 rounded-xl {$page.url.pathname.startsWith('/admin/settings') ? 'bg-primary text-white font-bold' : 'text-gray-400 hover:text-white hover:bg-gray-800'} transition-colors">
        Settings
      </a>
    </div>
    
    <div class="p-4 border-t border-gray-800">
      <a href="/logout" class="flex items-center justify-center w-full py-2.5 text-sm font-bold text-red-400 hover:text-red-300 bg-red-400/10 hover:bg-red-400/20 rounded-xl transition-colors">
        Keluar Panel
      </a>
    </div>
  </aside>

  <!-- Admin Main -->
  <main class="flex-1 flex flex-col h-screen overflow-hidden">
    <header class="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-30 relative">
      <h1 class="text-xl font-bold text-dark">Panel Pengurus</h1>
      <div class="relative">
        <button onclick={() => isProfileOpen = !isProfileOpen} class="flex items-center gap-4 hover:bg-gray-50 rounded-lg p-1 pr-2 transition-colors">
          <div class="flex flex-col items-end">
            <span class="text-sm font-bold text-dark">{data.user?.email || 'Admin'}</span>
            <span class="text-xs font-medium text-gray-500 capitalize">{data.user?.role || 'Admin'}</span>
          </div>
          <div class="w-10 h-10 rounded-full bg-dark text-white flex items-center justify-center font-bold">
            {(data.user?.email || 'A')[0].toUpperCase()}
          </div>
        </button>
        
        {#if isProfileOpen}
          <div class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-fade-in-down origin-top-right">
            <div class="px-4 py-3 border-b border-gray-50">
              <p class="text-sm font-bold text-dark truncate">{data.user?.email || 'Admin'}</p>
              <p class="text-xs font-medium text-gray-500 capitalize">{data.user?.role || 'Admin'}</p>
            </div>
            
            <div class="py-1">
              <a href="/admin/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">Admin Settings</a>
            </div>
            
            <div class="py-1 border-t border-gray-50">
              <a href="/logout" class="block px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">Logout</a>
            </div>
          </div>
        {/if}
      </div>
    </header>
    
    {#if isProfileOpen}
      <div class="fixed inset-0 z-20" onclick={() => isProfileOpen = false}></div>
    {/if}
    
    <div class="flex-1 overflow-y-auto p-8">
      {@render children()}
    </div>
  </main>
</div>
