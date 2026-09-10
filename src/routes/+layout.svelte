<script lang="ts">
  import '../app.css';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import FloatingContact from '$lib/components/FloatingContact.svelte';
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';

  let { children } = $props();

  let observer: IntersectionObserver | null = null;

  onMount(() => {
    // Ensure the loader is visible for at least 800ms for that premium "whoosh" feel
    // Since local dev is too fast, it usually disappears instantly without this delay
    setTimeout(() => {
      const loader = document.getElementById('premium-app-loader');
      if (loader) {
        // Add loaded class to trigger CSS transition
        loader.classList.add('loaded');
        // Remove from DOM after transition completes
        setTimeout(() => {
          loader.remove();
        }, 500);
      }
    }, 800);

    // Set up Intersection Observer for fade-up animations
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer?.unobserve(entry.target); // Optional: stop observing once visible
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    return () => observer?.disconnect();
  });

  // Re-run the observer query every time the user navigates to a new page
  afterNavigate(() => {
    setTimeout(() => {
      if (observer) {
        document.querySelectorAll('.fade-up:not(.visible)').forEach((el) => {
          observer.observe(el);
        });
      }
    }, 50); // slight delay to ensure DOM is updated
  });
</script>

<svelte:head>
  <link rel="icon" href="/logo-komunitas/logo-hima.jpeg" />
</svelte:head>

<div class="min-h-screen flex flex-col bg-soft text-dark font-sans selection:bg-primary/30 selection:text-dark overflow-x-hidden">
  <Navbar />
  <!-- We removed the mt-[72px] here because navbar is floating/transparent on hero now -->
  <main class="flex-grow">
    {@render children()}
  </main>
  <Footer />
  <FloatingContact />
</div>
