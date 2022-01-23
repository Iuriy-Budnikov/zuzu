<script>
  export let alt = undefined;
  export let className = undefined;
  export let height = undefined;
  export let sourceSrcSet = undefined;
  export let sourceType = undefined;
  export let src = undefined;
  export let srcset = undefined;
  export let width = undefined;

  import { onMount } from 'svelte';
  import IntersectionObserver from './IntersectionObserver.svelte';
  import Image from './Image.svelte';

  let nativeLoading = false;

  // Determine whether to bypass our intersecting check
  onMount(() => {
    if ('loading' in HTMLImageElement.prototype) {
      nativeLoading = true;
    }
  });
</script>

<IntersectionObserver once={true} let:intersecting>
  {#if intersecting || nativeLoading}
    <Image {alt} {className} {height} {src} {srcset} {sourceSrcSet} {sourceType} {width} />
  {/if}
</IntersectionObserver>
