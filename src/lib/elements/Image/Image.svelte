<script>
  import { onMount } from 'svelte';

  export let alt = undefined;
  export let className = undefined;
  export let height = undefined;
  export let sourceSrcSet = undefined;
  export let sourceType = 'image/webp';
  export let src = undefined;
  export let srcset = undefined;
  export let width = undefined;
  let loaded = false;
  let thisImage = undefined;

  onMount(() => {
    thisImage.onload = () => {
      loaded = true;
    };
  });
</script>

<picture>
  {#if sourceType && sourceSrcSet}
    <source type={sourceType} srcset={sourceSrcSet} />
  {/if}
  <img
    class={className}
    {height}
    {src}
    {srcset}
    {alt}
    class:loaded
    bind:this={thisImage}
    loading="lazy"
    {width}
  />
</picture>

<style lang="scss">
  .img {
    position: relative;
  }
  img {
    opacity: 0;
    transition: opacity 100ms;
    height: auto;
  }
  img.loaded {
    opacity: 1;
  }
</style>
