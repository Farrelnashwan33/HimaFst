<script lang="ts">
  let { 
    href = undefined, 
    type = 'button', 
    variant = 'primary', 
    class: className = '', 
    target = undefined,
    'aria-busy': ariaBusy = undefined,
    children 
  } = $props<{
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'outline' | 'secondary' | 'ghost';
    class?: string;
    target?: string;
    'aria-busy'?: boolean;
    children: any;
  }>();

  const baseClasses = "group inline-flex items-center justify-center rounded-full font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants: Record<string, string> = {
    primary: "bg-primary text-white hover:bg-primary-600 focus:ring-primary shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40",
    outline: "border-2 border-gray-200 text-dark hover:border-dark hover:bg-dark hover:text-white focus:ring-dark",
    secondary: "bg-dark text-white hover:bg-dark-800 focus:ring-dark shadow-lg hover:shadow-xl",
    ghost: "bg-transparent text-gray-600 hover:text-dark hover:bg-gray-100"
  };

  let combinedClasses = $derived(`${baseClasses} ${variants[variant || 'primary']} ${className}`);
</script>

{#if href}
  <a {href} {target} class={combinedClasses}>
    {@render children()}
  </a>
{:else}
  <button {type} class={combinedClasses} aria-busy={ariaBusy} disabled={ariaBusy}>
    {@render children()}
  </button>
{/if}
