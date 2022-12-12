<script>
  import { getContext } from 'svelte';
  import { key } from 'svelte-forms-lib';
  const { form } = getContext(key);

  $: people = $form['people'];
  $: children = $form['children'];
</script>

<div class="search-tours-active-night">
  <div class="search-tours-active-night__name">
    {people}
    {#if people > 0}
      {#if !children.length}
        {#if people === 1}
          дорослий
        {:else}
          дорослих
        {/if}
      {:else}
        дор + {children.length} дит
      {/if}
    {/if}
  </div>
</div>

<style lang="scss">
  .search-tours-active-night {
    color: #404a51;
    font-size: 19px;
    font-weight: 400;
    display: block;
    width: 100%;
    padding: 22px 16px 0 16px;

    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    white-space: nowrap;

    &__name {
      padding-right: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>
