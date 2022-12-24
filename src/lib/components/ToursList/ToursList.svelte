<script>
  import values from 'lodash/values';
  import ToursListItem from './ToursListItem.svelte';
  import ToursListEmpty from './ToursListEmpty.svelte';
  export let resultTours = {};

  $: hotels = values(resultTours?.hotels) || [];

  console.log('hotels', resultTours?.hotels);
</script>

{#if resultTours.total}
  <div>Total {resultTours.total}</div>
  <div class="tours-list">
    {#each hotels as { n, f, s, x, rb, v }}
      <ToursListItem name={n} img={f} stars={s} score={x} rating={rb} numberOfReviews={v} />
    {/each}
  </div>
{:else}
  <ToursListEmpty />
{/if}

<style lang="scss">
  .tours-list {
  }
</style>
