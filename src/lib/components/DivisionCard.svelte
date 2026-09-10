<script lang="ts">
  import Card from './Card.svelte';
  
  let { title, description, icon, index } = $props<{
    title: string;
    description: string;
    icon: string;
    index?: string;
  }>();
</script>

<Card class="group flex flex-col h-full relative overflow-hidden cursor-pointer !border-2 !border-transparent hover:!border-primary/20 hover:-translate-y-2">
  <div class="absolute top-0 right-0 p-8 text-6xl font-black text-gray-50 opacity-50 group-hover:text-light transition-colors duration-500 pointer-events-none">
    {index}
  </div>
  
  <div class="w-16 h-16 bg-soft rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:scale-110 shadow-sm relative z-10">
    {icon}
  </div>
  
  <h3 class="text-2xl font-bold text-dark mb-4 relative z-10">{title}</h3>
  <p class="text-gray-500 leading-relaxed flex-grow relative z-10">{description}</p>
  
  <div class="mt-8 flex items-center text-primary font-bold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 relative z-10">
    <span class="mr-2">Pelajari lebih lanjut</span>
    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  </div>
</Card>
