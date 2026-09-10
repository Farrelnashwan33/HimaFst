<script lang="ts">
  import { page } from '$app/stores';
  import { siteConfig } from '$lib/config/site';

  let { isCollapsed = false, isOpenMobile = false, closeMobile, user } = $props();

  const menuItems = [
    { name: 'Dashboard', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>', href: '/' },
    { name: 'Informasi', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8c-2 0-3 1-3 1s-1 1-1 3v14a2 2 0 0 0 2 2Z"/><path d="M14 2v20"/><path d="M8 2v20"/><path d="M22 10h-8"/><path d="M22 14h-8"/></svg>', href: '/informasi' },
    { name: 'Kalender Kegiatan', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>', href: '/kalender-kegiatan' },
    { name: 'Prestasi', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>', href: '/prestasi' },
    { name: 'Pengurus', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>', href: '/anggota' },
    { name: 'Program Studi', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m4 6 8-4 8 4"/><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/><path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4"/><path d="M18 5v17"/><path d="M6 5v17"/><circle cx="12" cy="9" r="2"/></svg>', href: '/program-studi' },
    { name: 'Divisi Himpunan Mahasiswa', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="8" x="2" y="2" rx="2"/><rect width="8" height="8" x="14" y="2" rx="2"/><rect width="8" height="8" x="8" y="14" rx="2"/><line x1="6" x2="10" y1="10" y2="14"/><line x1="18" x2="14" y1="10" y2="14"/></svg>', href: '/divisi' },
    { name: 'Akademik', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>', href: '#' },
    { name: 'Aspirasi Mahasiswa', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>', href: '/aspirasi' },
    { name: 'Pendaftaran Himpunan', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>', href: '/gabung-hima' },
    { name: 'Chat Admin', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>', href: '/grup-whatsapp' },
    { name: 'Settings', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>', href: '#' }
  ];
</script>

<!-- Mobile Overlay -->
{#if isOpenMobile}
  <div 
    class="fixed inset-0 bg-dark/20 backdrop-blur-sm z-40 lg:hidden transition-opacity"
    onclick={closeMobile}
  ></div>
{/if}

<aside 
  class="fixed top-0 left-0 h-screen bg-white border-r border-gray-100 z-50 flex flex-col transition-all duration-300 ease-in-out shadow-[4px_0_24px_rgba(0,0,0,0.02)]
         {isCollapsed ? 'lg:w-[88px]' : 'lg:w-[280px]'}
         {isOpenMobile ? 'translate-x-0 w-[280px]' : '-translate-x-full lg:translate-x-0'} "
>
  <!-- Logo Area -->
  <div class="h-20 flex items-center px-6 border-b border-gray-50/50 flex-shrink-0">
    <a href="/" class="flex items-center gap-3 w-full outline-none">
      <div class="w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center flex-shrink-0 overflow-hidden">
        <img src={siteConfig.logo} alt="Logo" class="w-full h-full object-cover" />
      </div>
      <span class="font-bold text-sm tracking-tight text-dark transition-opacity duration-300 leading-tight
                   {isCollapsed ? 'lg:opacity-0 lg:w-0 lg:overflow-hidden' : 'opacity-100'}">
        Portal Himpunan Mahasiswa<br/>Fakultas Sains dan Teknologi
      </span>
    </a>
  </div>

  <!-- Menu Area -->
  <div class="flex-grow overflow-y-auto py-6 px-4 scrollbar-hide">
    <div class="space-y-1">
      {#each menuItems as item (item.name)}
        <a 
          href={item.href} 
          class="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group
                 {$page.url.pathname === item.href || ($page.url.pathname === '/' && item.name === 'Dashboard') 
                   ? 'bg-primary/10 text-primary font-bold' 
                   : 'text-gray-500 hover:bg-gray-50 hover:text-dark font-medium'}"
          title={isCollapsed ? item.name : ''}
        >
          <div class="flex-shrink-0 transition-transform duration-200 group-hover:scale-110 {$page.url.pathname === item.href ? 'text-primary' : 'text-gray-400 group-hover:text-dark'}">
            {@html item.icon}
          </div>
          <span class="whitespace-nowrap transition-opacity duration-300 text-[15px]
                       {isCollapsed ? 'lg:opacity-0 lg:hidden' : 'opacity-100'}">
            {item.name}
          </span>
        </a>
      {/each}
    </div>
  </div>

  <!-- User Area / Bottom Actions -->
  <div class="px-4 py-4 border-t border-gray-50/50 flex-shrink-0 mt-auto">


    <a href="/logout" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors group">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0 group-hover:-translate-x-1 transition-transform"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
      <span class="font-medium text-sm whitespace-nowrap transition-opacity duration-300 {isCollapsed ? 'lg:opacity-0 lg:w-0' : 'opacity-100'}">Keluar</span>
    </a>
  </div>
</aside>

<style>
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
