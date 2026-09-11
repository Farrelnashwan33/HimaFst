<script lang="ts">
  import { page } from '$app/stores';
  import { siteConfig } from '$lib/config/site';

  interface Props {
    isCollapsed?: boolean;
    isOpenMobile?: boolean;
    closeMobile?: () => void;
    user?: { id: number; email: string; role: string } | null;
    counts?: {
      aspirasiPending?: number;
      pendaftaranPending?: number;
      chatUnread?: number;
    };
  }

  let {
    isCollapsed = false,
    isOpenMobile = false,
    closeMobile = () => {},
    user = null,
    counts = { aspirasiPending: 0, pendaftaranPending: 0, chatUnread: 0 }
  }: Props = $props();

  interface MenuItem {
    name: string;
    href: string;
    icon: string;
    badge?: number;
  }

  interface MenuGroup {
    title: string;
    items: MenuItem[];
  }

  const menuGroups: MenuGroup[] = [
    {
      title: 'Utama',
      items: [
        {
          name: 'Dashboard',
          href: '/admin/dashboard',
          icon: 'LayoutDashboard'
        },
        {
          name: 'Mahasiswa',
          href: '/admin/mahasiswa',
          icon: 'Users'
        }
      ]
    },
    {
      title: 'Konten Portal',
      items: [
        {
          name: 'Informasi',
          href: '/admin/informasi',
          icon: 'Megaphone'
        },
        {
          name: 'Kalender Kegiatan',
          href: '/admin/kalender',
          icon: 'Calendar'
        },
        {
          name: 'Prestasi',
          href: '/admin/prestasi',
          icon: 'Trophy'
        },
        {
          name: 'Pengurus HIMA',
          href: '/admin/pengurus',
          icon: 'UserCheck'
        },
        {
          name: 'Program Studi',
          href: '/admin/program-studi',
          icon: 'GraduationCap'
        },
        {
          name: 'Divisi HIMA',
          href: '/admin/divisi',
          icon: 'Network'
        },
        {
          name: 'Akademik',
          href: '/admin/akademik',
          icon: 'BookOpen'
        },
        {
          name: 'Program Kerja',
          href: '/admin/program-kerja',
          icon: 'Briefcase'
        },
        {
          name: 'Quick Access',
          href: '/admin/quick-access',
          icon: 'Compass'
        }
      ]
    },
    {
      title: 'Interaksi & Layanan',
      items: [
        {
          name: 'Aspirasi Mahasiswa',
          href: '/admin/aspirasi',
          icon: 'MessageSquareText',
          badge: counts.aspirasiPending
        },
        {
          name: 'Pendaftaran HIMA',
          href: '/admin/pendaftaran',
          icon: 'UserPlus',
          badge: counts.pendaftaranPending
        },
        {
          name: 'Chat Admin',
          href: '/admin/chat',
          icon: 'MessagesSquare',
          badge: counts.chatUnread
        }
      ]
    },
    {
      title: 'Sistem',
      items: [
        {
          name: 'Settings',
          href: '/admin/settings',
          icon: 'Settings'
        }
      ]
    }
  ];

  function isActive(href: string) {
    if (href === '/admin/dashboard') {
      return $page.url.pathname === '/admin/dashboard' || $page.url.pathname === '/admin';
    }
    return $page.url.pathname.startsWith(href);
  }
</script>

<!-- Mobile Overlay -->
{#if isOpenMobile}
  <div
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
    onclick={closeMobile}
    aria-hidden="true"
  ></div>
{/if}

<!-- Sidebar Container -->
<aside
  class="fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-[#0b132b] text-white transition-all duration-300 ease-in-out border-r border-slate-800/80
    {isOpenMobile ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'}
    {isCollapsed ? 'lg:w-[84px]' : 'lg:w-[270px]'}"
>
  <!-- Header / Brand -->
  <div class="h-20 flex items-center px-6 border-b border-slate-800/80 justify-between shrink-0">
    <a href="/admin/dashboard" class="flex items-center gap-3 group overflow-hidden">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0f4c81] to-[#1e3a8a] text-white flex items-center justify-center font-black text-lg shadow-lg shadow-blue-900/30 shrink-0 group-hover:scale-105 transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      </div>
      {#if !isCollapsed || isOpenMobile}
        <div class="flex flex-col min-w-0 transition-opacity duration-200">
          <span class="font-extrabold text-sm tracking-tight text-white leading-none truncate">HIMA FST ADMIN</span>
          <span class="text-[11px] text-slate-400 font-medium tracking-wide mt-1">Panel Pengurus</span>
        </div>
      {/if}
    </a>

    <!-- Mobile Close Button -->
    <button
      type="button"
      class="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60"
      onclick={closeMobile}
      aria-label="Tutup Menu"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  </div>

  <!-- Navigation Links -->
  <div class="flex-1 overflow-y-auto py-5 px-3 space-y-6 custom-scrollbar">
    {#each menuGroups as group}
      <div class="space-y-1">
        {#if !isCollapsed || isOpenMobile}
          <div class="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            {group.title}
          </div>
        {/if}

        {#each group.items as item}
          {@const active = isActive(item.href)}
          <a
            href={item.href}
            onclick={() => {
              if (isOpenMobile) closeMobile();
            }}
            class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all relative group
              {active
                ? 'bg-gradient-to-r from-[#0f4c81] to-[#1e3a8a] text-white shadow-md shadow-blue-900/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}"
            title={isCollapsed && !isOpenMobile ? item.name : ''}
          >
            <!-- Icon -->
            <div class="shrink-0 {active ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'} transition-colors">
              {#if item.icon === 'LayoutDashboard'}
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
              {:else if item.icon === 'Users'}
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              {:else if item.icon === 'Megaphone'}
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
              {:else if item.icon === 'Calendar'}
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              {:else if item.icon === 'Trophy'}
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H7c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1h10c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1h-2c-.55 0-1-.45-1-1v-2.34"/><path d="M18 4H6v7a6 6 0 0 0 12 0V4z"/></svg>
              {:else if item.icon === 'UserCheck'}
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
              {:else if item.icon === 'GraduationCap'}
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              {:else if item.icon === 'Network'}
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>
              {:else if item.icon === 'BookOpen'}
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              {:else if item.icon === 'Briefcase'}
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              {:else if item.icon === 'Compass'}
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
              {:else if item.icon === 'MessageSquareText'}
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M13 8H7"/><path d="M17 12H7"/></svg>
              {:else if item.icon === 'UserPlus'}
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
              {:else if item.icon === 'MessagesSquare'}
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
              {:else if item.icon === 'Settings'}
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
              {/if}
            </div>

            <!-- Name -->
            {#if !isCollapsed || isOpenMobile}
              <span class="truncate flex-1">{item.name}</span>
              {#if item.badge && item.badge > 0}
                <span class="px-2 py-0.5 text-[11px] font-black rounded-full bg-amber-500 text-slate-900 shrink-0 shadow-sm animate-pulse">
                  {item.badge}
                </span>
              {/if}
            {/if}
          </a>
        {/each}
      </div>
    {/each}
  </div>

  <!-- Footer / Profile & Logout -->
  <div class="p-4 border-t border-slate-800/80 shrink-0 space-y-2">
    {#if !isCollapsed || isOpenMobile}
      <div class="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-800/60">
        <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-xs text-white shrink-0">
          {(user?.email || 'A')[0].toUpperCase()}
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-xs font-bold text-white truncate">{user?.email || 'Admin'}</p>
          <p class="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping"></span>
            Online • {user?.role || 'Admin'}
          </p>
        </div>
      </div>
    {/if}

    <a
      href="/logout"
      class="flex items-center justify-center gap-2 w-full py-2.5 px-3 text-xs font-bold text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-colors"
      title="Keluar dari Panel Admin"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
      {#if !isCollapsed || isOpenMobile}
        <span>Keluar Panel</span>
      {/if}
    </a>
  </div>
</aside>
