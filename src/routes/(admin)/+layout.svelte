<script lang="ts">
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

<div class="min-h-screen bg-slate-50 flex overflow-hidden font-sans antialiased text-slate-900 selection:bg-blue-600 selection:text-white">
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
    <main class="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8 pb-20">
      <div class="max-w-7xl mx-auto space-y-6">
        {@render children()}
      </div>
    </main>
  </div>
</div>
