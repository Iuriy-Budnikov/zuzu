<script>
  export let text = '';

  const words = text.split(' ');
  const textLength = words.length;
</script>

{#each words as word, i}
  <span class="split-text"
    >{word}{#if i !== textLength - 1}&nbsp;{/if}
  </span>
{/each}

<style lang="scss">
  .split-text {
    display: inline-block;
  }
</style>
