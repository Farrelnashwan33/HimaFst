<script lang="ts">
  import { siteConfig } from '$lib/config/site';
  import { page } from '$app/stores';
  import Button from './Button.svelte';
  
  let isMenuOpen = $state(false);
  let scrolled = $state(false);

  let currentPath = $derived($page.url.pathname);

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Program Studi', href: '/program-studi' },
    { name: 'Tentang', href: '/#tentang' },
    { name: 'Divisi', href: '/#divisi' },
    { name: 'Kegiatan', href: '/#kegiatan' }
  ];

  import { onMount } from 'svelte';
  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 20;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<nav class="fixed top-0 w-full z-50 px-4 sm:px-6 lg:px-8 transition-all duration-500 {scrolled ? 'pt-4' : 'pt-6'}">
  <div class="mx-auto max-w-7xl">
    <div class="relative flex items-center justify-between px-6 py-4 rounded-full transition-all duration-500 {scrolled ? 'bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20' : 'bg-transparent'}">
      
      <!-- Logo -->
      <a href="/" class="flex items-center gap-3 z-10">
        <img src={siteConfig.logo} alt={siteConfig.name} class="h-9 w-9 object-contain rounded-full bg-white shadow-sm" />
        <span class="font-bold text-lg text-dark tracking-tight">{siteConfig.name}</span>
      </a>
      
      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center space-x-1 absolute left-1/2 -translate-x-1/2 bg-white/50 backdrop-blur-md px-2 py-1 rounded-full border border-white/40 shadow-sm">
        {#each navLinks as link}
          <a 
            href={link.href} 
            class="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:text-primary {currentPath === link.href ? 'text-primary bg-white shadow-sm' : 'text-gray-600 hover:bg-white/60'}"
          >
            {link.name}
          </a>
        {/each}
      </div>

      <!-- Right CTA Desktop -->
      <div class="hidden md:flex items-center z-10">
        <Button href="/gabung-hima" variant="primary" class="py-2.5 px-6 text-sm shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all">
          Gabung Sekarang <span class="ml-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
        </Button>
      </div>

      <!-- Mobile Menu Button -->
      <div class="md:hidden flex items-center z-10">
        <button onclick={toggleMenu} class="text-dark p-2 focus:outline-none bg-white/50 rounded-full backdrop-blur-sm border border-white/40" aria-label="Toggle menu">
          <div class="w-6 h-5 flex flex-col justify-between items-center overflow-hidden">
            <span class="w-full h-0.5 bg-current rounded transform transition-all duration-300 {isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}"></span>
            <span class="w-full h-0.5 bg-current rounded transform transition-all duration-300 {isMenuOpen ? 'opacity-0 translate-x-3' : ''}"></span>
            <span class="w-full h-0.5 bg-current rounded transform transition-all duration-300 {isMenuOpen ? '-rotate-45 -translate-y-2' : ''}"></span>
          </div>
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile Menu Dropdown -->
  <div class="md:hidden absolute top-full left-0 w-full px-4 mt-2 transition-all duration-300 origin-top {isMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}">
    <div class="bg-white/95 backdrop-blur-2xl border border-gray-100 shadow-2xl rounded-3xl overflow-hidden p-4 flex flex-col gap-2">
      {#each navLinks as link}
        <a 
          href={link.href} 
          class="block px-6 py-4 rounded-2xl text-base font-bold transition-all hover:bg-soft {currentPath === link.href ? 'text-primary bg-light/50' : 'text-dark'}"
          onclick={() => isMenuOpen = false}
        >
          {link.name}
        </a>
      {/each}
      <div class="h-px bg-gray-100 my-2 mx-4"></div>
      <Button href="/gabung-hima" variant="primary" class="w-full py-4 rounded-2xl text-base font-bold">
        Gabung Sekarang
      </Button>
    </div>
  </div>
</nav>
