<script lang="ts">
  import Card from './Card.svelte';
  
  let { title, date, description, posterUrl, category, href = "#", buttonText = "View Activity" } = $props<{
    title: string;
    date: string;
    description: string;
    posterUrl: string;
    category: string;
    href?: string;
    buttonText?: string;
  }>();
</script>

<a {href} class="group relative bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 transition-all duration-500 hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] hover:-translate-y-2 flex flex-col h-full cursor-pointer block">
  <div class="relative h-64 overflow-hidden bg-gray-100">
    {#if posterUrl}
      <img src={posterUrl} alt={title} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
    {:else}
      <div class="absolute inset-0 bg-gradient-to-br from-soft to-gray-200"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <svg class="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    {/if}
    <div class="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-dark tracking-widest uppercase">
      {category}
    </div>
  </div>
  
  <div class="p-8 flex flex-col flex-grow">
    <div class="text-sm font-semibold text-gray-400 mb-3 tracking-wide">{date}</div>
    <h3 class="text-2xl font-bold text-dark mb-4 leading-tight group-hover:text-primary transition-colors">{title}</h3>
    <p class="text-gray-500 mb-8 flex-grow leading-relaxed line-clamp-3">{description}</p>
    
    <div class="flex items-center text-dark font-bold group-hover:text-primary transition-colors">
      <span class="mr-2">{buttonText}</span>
      <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </div>
  </div>
</a>
