<script lang="ts">
  import { navigating } from '$app/stores';
  import AdminSidebar from '$lib/components/admin/AdminSidebar.svelte';
  import AdminHeader from '$lib/components/admin/AdminHeader.svelte';
  import { siteConfig } from '$lib/config/site';

  let { children, data } = $props();

  let isSidebarCollapsed = $state(false);
  let isMobileSidebarOpen = $state(false);

  function toggleSidebar() {
    isSidebarCollapsed = !isSidebarCollapsed;
  }

  function toggleMobileSidebar() {
    isMobileSidebarOpen = !isMobileSidebarOpen;
  }

  function closeMobileSidebar() {
    isMobileSidebarOpen = false;
  }
</script>

<svelte:head>
  <title>Admin Dashboard | {siteConfig.name}</title>
</svelte:head>

<!-- Global Top Navigation Loading Bar for Instant Feedback -->
{#if $navigating}
  <div class="fixed top-0 left-0 right-0 z-[9999] h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 animate-pulse shadow-lg shadow-blue-500/50">
    <div class="h-full bg-white/40 w-full animate-progress origin-left"></div>
  </div>
{/if}

<div data-sveltekit-preload-data="hover" class="min-h-screen bg-slate-50 flex overflow-hidden font-sans antialiased text-slate-900 selection:bg-blue-600 selection:text-white">
  <!-- Admin Sidebar Component -->
  <AdminSidebar
    isCollapsed={isSidebarCollapsed}
    isOpenMobile={isMobileSidebarOpen}
    closeMobile={closeMobileSidebar}
    user={data.user}
    counts={data.counts}
  />

  <!-- Main Content Wrapper -->
  <div
    class="flex-1 flex flex-col min-w-0 transition-all duration-300 relative
      {isSidebarCollapsed ? 'lg:ml-[84px]' : 'lg:ml-[270px]'}"
  >
    <!-- Admin Header Component -->
    <AdminHeader
      isCollapsed={isSidebarCollapsed}
      {toggleSidebar}
      {toggleMobileSidebar}
      user={data.user}
    />

    <!-- Main Content Area -->
    <main class="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8 pb-20 relative">
      {#if $navigating}
        <div class="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-30 transition-opacity duration-200 pointer-events-none flex items-start justify-center pt-24">
          <div class="bg-white/90 shadow-xl border border-slate-200 px-4 py-2 rounded-full flex items-center gap-3 text-xs font-bold text-slate-700 animate-bounce">
            <svg class="animate-spin h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <span>Memuat data...</span>
          </div>
        </div>
      {/if}
      <div class="max-w-7xl mx-auto space-y-6">
        {@render children()}
      </div>
    </main>
  </div>
</div>
