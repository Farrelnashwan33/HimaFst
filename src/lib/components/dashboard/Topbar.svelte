<script lang="ts">
  let { isSidebarCollapsed, toggleSidebar, toggleMobileSidebar, user } = $props();
  
  let isProfileOpen = $state(false);
  
  function toggleProfile() {
    isProfileOpen = !isProfileOpen;
  }
</script>

<header class="sticky top-0 z-30 flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-xl border-b border-gray-100 transition-all duration-300">
  
  <div class="flex items-center gap-4">
    <!-- Mobile Toggle -->
    <button 
      class="lg:hidden p-2 -ml-2 text-gray-500 hover:text-dark hover:bg-gray-50 rounded-xl transition-colors"
      onclick={toggleMobileSidebar}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
    </button>

    <!-- Desktop Toggle -->
    <button 
      class="hidden lg:flex p-2 -ml-2 text-gray-400 hover:text-dark hover:bg-gray-50 rounded-xl transition-colors"
      onclick={toggleSidebar}
    >
      {#if isSidebarCollapsed}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="9" x2="9" y1="3" y2="21"/><path d="m13 15 3-3-3-3"/></svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="9" x2="9" y1="3" y2="21"/><path d="m15 9-3 3 3 3"/></svg>
      {/if}
    </button>

    <!-- Search (Hidden on very small screens) -->
    <div class="hidden sm:flex items-center relative w-64 md:w-80 lg:w-96">
      <div class="absolute left-3 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      </div>
      <input 
        type="text" 
        placeholder="Search activities, info, etc..." 
        class="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all text-dark placeholder:text-gray-400 font-medium"
      />
    </div>
  </div>

  <div class="flex items-center gap-3 sm:gap-4 relative">
    
    <!-- Mobile Search Icon -->
    <button class="sm:hidden p-2 text-gray-500 hover:text-dark hover:bg-gray-50 rounded-xl transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
    </button>

    <!-- Notification -->
    <button class="relative p-2 text-gray-500 hover:text-dark hover:bg-gray-50 rounded-xl transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
      <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
    </button>

    <!-- Profile -->
    <div class="relative">
      <button onclick={toggleProfile} class="flex items-center gap-3 pl-2 sm:pl-4 border-l border-gray-100 hover:bg-gray-50 rounded-lg p-1 transition-colors">
        {#if user}
          <div class="hidden sm:flex flex-col items-end">
            <span class="text-sm font-bold text-dark leading-tight">{user.email}</span>
            <span class="text-xs text-gray-500 font-medium capitalize">{user.role}</span>
          </div>
          <div class="w-10 h-10 rounded-full bg-primary/10 overflow-hidden flex items-center justify-center text-primary font-bold">
            {user.email[0].toUpperCase()}
          </div>
        {:else}
          <div class="hidden sm:flex flex-col items-end">
            <span class="text-sm font-bold text-dark leading-tight">Guest</span>
            <span class="text-xs text-gray-500 font-medium">Guest User</span>
          </div>
          <div class="w-10 h-10 rounded-full bg-primary/10 overflow-hidden flex items-center justify-center text-primary font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
        {/if}
      </button>
      
      {#if isProfileOpen}
        <div class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-fade-in-down origin-top-right">
          {#if user}
            <div class="px-4 py-3 border-b border-gray-50">
              <p class="text-sm font-bold text-dark truncate">{user.email}</p>
              <p class="text-xs font-medium text-gray-500 capitalize">{user.role}</p>
            </div>
          {/if}
          
          <div class="py-1">
            <a href="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">Profile</a>
            <a href="/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">Settings</a>
          </div>
          
          <div class="py-1 border-t border-gray-50">
            <a href="/logout" class="block px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">Logout</a>
          </div>
        </div>
      {/if}
    </div>
  </div>

</header>

{#if isProfileOpen}
  <div class="fixed inset-0 z-20" onclick={() => isProfileOpen = false}></div>
{/if}

