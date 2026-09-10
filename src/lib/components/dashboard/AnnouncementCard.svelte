<script lang="ts">
  let { category, title, date, summary, href = "#" } = $props();
</script>

<div class="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col gap-3 group transition-all duration-300 hover:border-primary/30 hover:shadow-md">
  <div class="flex items-center justify-between">
    <span class="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md bg-gray-100 text-gray-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
      {category}
    </span>
    <span class="text-xs font-medium text-gray-400 flex items-center gap-1.5">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
      {date}
    </span>
  </div>
  
  <h4 class="text-lg font-bold text-dark leading-tight group-hover:text-primary transition-colors">
    {title}
  </h4>
  
  <p class="text-sm text-gray-500 line-clamp-2 leading-relaxed">
    {summary}
  </p>

  <a {href} class="mt-2 text-sm font-semibold text-primary flex items-center gap-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 w-fit">
    Lihat Detail
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  </a>
</div>
