<script lang="ts">
  interface Props {
    isCollapsed?: boolean;
    toggleSidebar?: () => void;
    toggleMobileSidebar?: () => void;
    user?: { id: number; email: string; role: string; name?: string } | null;
  }

  let {
    isCollapsed = false,
    toggleSidebar = () => {},
    toggleMobileSidebar = () => {},
    user = null
  }: Props = $props();

  let isProfileOpen = $state(false);
</script>

<header class="sticky top-0 z-30 h-20 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-all">
  <!-- Left Side: Toggles & Title -->
  <div class="flex items-center gap-3 sm:gap-4">
    <!-- Mobile Hamburger Toggle -->
    <button
      type="button"
      class="lg:hidden p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
      onclick={toggleMobileSidebar}
      aria-label="Buka Menu Navigasi"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
    </button>

    <!-- Desktop Sidebar Collapse Toggle -->
    <button
      type="button"
      class="hidden lg:flex p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
      onclick={toggleSidebar}
      aria-label="Toggle Sidebar"
    >
      {#if isCollapsed}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="9" x2="9" y1="3" y2="21"/><path d="m13 15 3-3-3-3"/></svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="9" x2="9" y1="3" y2="21"/><path d="m15 9-3 3 3 3"/></svg>
      {/if}
    </button>

    <!-- Brand / Breadcrumb Tag -->
    <div class="flex items-center gap-2">
      <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-[#0f4c81] text-xs font-bold border border-blue-100">
        <span class="w-1.5 h-1.5 rounded-full bg-[#0f4c81]"></span>
        Admin Panel
      </span>
      <span class="hidden sm:inline text-xs text-slate-400 font-medium">• Fakultas Sains dan Teknologi</span>
    </div>
  </div>

  <!-- Right Side: Portal Mahasiswa Link & Profile -->
  <div class="flex items-center gap-3 sm:gap-4 relative">
    <!-- Quick Link to Student Portal -->
    <a
      href="/dashboard"
      target="_blank"
      rel="noopener noreferrer"
      class="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-blue-700 bg-slate-100 hover:bg-blue-50 rounded-xl transition-all border border-slate-200"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
      Lihat Portal Mahasiswa
    </a>

    <!-- Profile Menu Button -->
    <div class="relative">
      <button
        type="button"
        onclick={() => (isProfileOpen = !isProfileOpen)}
        class="flex items-center gap-3 p-1.5 pl-3 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
      >
        <div class="hidden md:flex flex-col items-end">
          <span class="text-xs font-black text-slate-900 leading-tight truncate max-w-[160px]">
            {user?.name || user?.email || 'Administrator'}
          </span>
          <span class="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
            {user?.role || 'Pengurus HIMA'}
          </span>
        </div>
        <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0f4c81] to-[#1e3a8a] text-white flex items-center justify-center font-black text-sm shadow-sm">
          {(user?.name || user?.email || 'A')[0].toUpperCase()}
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400 hidden sm:block"><path d="m6 9 6 6 6-6"/></svg>
      </button>

      <!-- Profile Dropdown -->
      {#if isProfileOpen}
        <div
          class="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          <div class="px-4 py-3 border-b border-slate-100">
            <p class="text-xs font-bold text-slate-900 truncate">{user?.name || 'Administrator'}</p>
            <p class="text-[11px] text-slate-500 truncate">{user?.email || 'admin@himafst.org'}</p>
            <span class="inline-block mt-1.5 px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-50 text-blue-700 uppercase">
              {user?.role || 'Admin'}
            </span>
          </div>

          <div class="py-1">
            <a
              href="/admin/settings"
              onclick={() => (isProfileOpen = false)}
              class="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
              Pengaturan Akun & Web
            </a>
            <a
              href="/dashboard"
              target="_blank"
              class="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-700 transition-colors sm:hidden"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
              Buka Portal Mahasiswa
            </a>
          </div>

          <div class="py-1 border-t border-slate-100">
            <a
              href="/logout"
              class="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
              Keluar
            </a>
          </div>
        </div>
      {/if}
    </div>
  </div>
</header>

{#if isProfileOpen}
  <div class="fixed inset-0 z-20" onclick={() => (isProfileOpen = false)} aria-hidden="true"></div>
{/if}
