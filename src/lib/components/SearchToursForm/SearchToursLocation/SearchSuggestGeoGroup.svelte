<script>
  import SearchSuggestGeoGroupItem from './SearchSuggestGeoItem.svelte';
  export let name = '';
  export let parent_id = '';
  export let children = [];
</script>

<div class="search-suggest-geo-group">
  <div>
    {name}
  </div>
</div>

{#if children && children.length}
  {#each children as item}
    <SearchSuggestGeoGroupItem category_id={parent_id} {...item} on:change_geo_tree />
  {/each}
{/if}

<style lang="scss">
  .search-suggest-geo-group {
    font-size: 14px;
    color: #acafb2;
    padding: 18px 16px 7px;
    border-top: 2px solid #f8f8f9;
    font-family: var(--type__primary);
    font-weight: 600;
  }
</style>
