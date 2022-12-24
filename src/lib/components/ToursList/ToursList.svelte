<script>
  import values from 'lodash/values';
  import ToursListItem from './ToursListItem.svelte';
  import ToursListEmpty from './ToursListEmpty.svelte';
  export let resultTours = {};

  $: hotels = values(resultTours?.hotels) || [];
  console.log('resultTours', resultTours);
</script>

{#if resultTours?.total}
  <div>Total {resultTours.total}</div>
  <div class="tours-list">
    {#each hotels as { n, f, s, x, rb, v, i, e, h }}
      <ToursListItem
        features={e}
        id={i}
        name={n}
        img={f}
        slug={h}
        stars={s}
        score={x}
        rating={rb}
        numberOfReviews={v}
      />
    {/each}
  </div>
{:else}
  <ToursListEmpty />
{/if}

<style lang="scss">
  .tours-list {
  }
</style>
