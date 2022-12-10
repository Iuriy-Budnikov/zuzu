<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  const list = [];

  for (let index = 1; index < 17; index++) {
    list.push(index);
  }

  function onChange(value) {
    dispatch('change', { value });
  }
</script>

<div class="search-tours-children-picker">
  {#each list as item}
    <div
      class="search-tours-children-picker__item"
      on:click={() => onChange(item)}
      role="presentation"
    >
      {#if item === 1}
        до 2
      {:else}
        {item}
      {/if}
    </div>
  {/each}
</div>

<style lang="scss">
  .search-tours-children-picker {
    margin-top: 18px;
    margin-bottom: 18px;
    border-radius: 5px;
    background-color: #f0f0f0;
    padding: 6px 6px 2px 6px;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &__item {
      width: 44px;
      height: 40px;
      margin-bottom: 4px;
      background-color: var(--color__light);
      border-radius: 5px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      cursor: pointer;
      transition: background-color 0.2s;
      line-height: 1;

      &:hover {
        color: var(--color__light);
        box-shadow: 0 2px 4px 0 rgb(0 0 0 / 8%);
        background-color: var(--color__button);
      }
    }
  }
</style>
