<script lang="ts">
  let { class: className = '', style = '', children } = $props<{
    class?: string;
    style?: string;
    children: any;
  }>();
</script>

<div class={`bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 transition-all duration-300 hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] ${className}`} {style}>
  {@render children()}
</div>
