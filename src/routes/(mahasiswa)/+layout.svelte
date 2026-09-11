<script lang="ts">
  import Sidebar from '$lib/components/dashboard/Sidebar.svelte';
  import Topbar from '$lib/components/dashboard/Topbar.svelte';
  import BottomNav from '$lib/components/dashboard/BottomNav.svelte';

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

<div class="min-h-screen bg-soft flex overflow-hidden">
  <Sidebar 
    isCollapsed={isSidebarCollapsed} 
    isOpenMobile={isMobileSidebarOpen}
    closeMobile={closeMobileSidebar}
    user={data.user}
  />
  
  <div class="flex-1 flex flex-col min-w-0 transition-all duration-300 relative {isSidebarCollapsed ? 'lg:ml-[88px]' : 'lg:ml-[280px]'}">
    <Topbar {isSidebarCollapsed} {toggleSidebar} {toggleMobileSidebar} user={data.user} />
    
    <main class="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
      {@render children()}
    </main>

    <BottomNav {toggleMobileSidebar} />
  </div>
</div>

