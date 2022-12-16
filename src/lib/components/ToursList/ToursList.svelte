<script>
  import ToursListItem from './ToursListItem.svelte';
  import ToursListEmpty from './ToursListEmpty.svelte';
  export let tours = [];
</script>

{#if tours.length}
  <div class="tours-list">
    {#each tours as { name }}
      <ToursListItem {name} />
    {/each}
  </div>
{:else}
  <ToursListEmpty />
{/if}

<style lang="scss">
  .tours-list {
    background-color: red;
  }
</style>
