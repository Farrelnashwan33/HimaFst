<script lang="ts">
  import { page } from '$app/stores';
  
  let { toggleMobileSidebar } = $props();

  // Primary navigation items for bottom bar
  const navItems = [
    { name: 'Home', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>', href: '/' },
    { name: 'Pengurus', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>', href: '/anggota' },
    { name: 'Prodi', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m4 6 8-4 8 4"/><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/><path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4"/><path d="M18 5v17"/><path d="M6 5v17"/><circle cx="12" cy="9" r="2"/></svg>', href: '/program-studi' },
    { name: 'Gabung', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>', href: '/gabung-hima' },
  ];
</script>

<nav class="lg:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-100 z-40 pb-safe shadow-[0_-4px_24px_rgba(0,0,0,0.02)]">
  <div class="flex items-center justify-around px-2 h-16">
    {#each navItems as item}
      <a 
        href={item.href}
        class="flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors
               {$page.url.pathname === item.href || ($page.url.pathname === '/' && item.name === 'Home') ? 'text-primary' : 'text-gray-400 hover:text-dark'}"
      >
        <div class="transition-transform duration-200 {$page.url.pathname === item.href ? 'scale-110' : ''}">
          {@html item.icon}
        </div>
        <span class="text-[10px] font-semibold tracking-wide">{item.name}</span>
      </a>
    {/each}
    
    <!-- More Toggle -->
    <button 
      class="flex flex-col items-center justify-center w-16 h-full gap-1 text-gray-400 hover:text-dark transition-colors"
      onclick={toggleMobileSidebar}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
      <span class="text-[10px] font-semibold tracking-wide">More</span>
    </button>
  </div>
</nav>

<style>
  /* Support for mobile safe area */
  .pb-safe {
    padding-bottom: env(safe-area-inset-bottom);
  }
</style>
