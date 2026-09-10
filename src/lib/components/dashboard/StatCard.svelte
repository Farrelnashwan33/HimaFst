<script lang="ts">
  let { title, value, icon, subtitle, colorClass = "text-primary bg-primary/10" } = $props();
</script>

<div class="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col h-full transition-transform duration-300 hover:-translate-y-1">
  <div class="flex items-start justify-between mb-4">
    <span class="text-sm font-semibold text-gray-500">{title}</span>
    <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 {colorClass}">
      {@html icon}
    </div>
  </div>
  <div class="mt-auto">
    <span class="block text-3xl font-black text-dark mb-1">{value}</span>
    {#if subtitle}
      <span class="text-xs font-medium text-gray-400">{subtitle}</span>
    {/if}
  </div>
</div>
