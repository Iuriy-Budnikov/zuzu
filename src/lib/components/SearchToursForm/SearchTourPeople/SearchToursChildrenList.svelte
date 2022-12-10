<script>
  import Icon from '$lib/elements/Icon/Icon.svelte';

  import { getContext, createEventDispatcher } from 'svelte';
  import { key } from 'svelte-forms-lib';
  import SearchToursChildrenPicker from './SearchToursChildrenPicker.svelte';

  const { form } = getContext(key);
  const dispatch = createEventDispatcher();

  function onClick(index) {
    dispatch('change', { index });
  }

  $: children = $form.children;
</script>

{#if children.length > 0}
  <div class="search-tours-people-children-list">
    <div class="search-tours-people-children-list__title">Діти</div>
    <div class="search-tours-people-children-list__list">
      {#each children as item, index}
        <div
          class="search-tours-people-children-list__item"
          on:click={() => onClick(index)}
          role="presentation"
        >
          <span>
            {#if item === 1}
              до 2 років
            {:else}
              {item}
              {#if item === 2 || item === 3 || item === 4}
                роки
              {:else}
                років
              {/if}
            {/if}
          </span>
          <button type="button" class="search-tours-people-children-list__button">
            <Icon name="reset" width="10px" height="10px" box="10 10" />
          </button>
        </div>
      {/each}
    </div>
  </div>
{/if}

<style lang="scss">
  .search-tours-people-children-list {
    &__title {
      font-size: 18px;
    }
    &__list {
      margin: 16px 0 16px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    &__item {
      border-radius: 5px;
      background-color: #f8f8f9;
      font-size: 14px;
      font-weight: 500;
      position: relative;
      width: calc(50% - 4px);
      height: 36px;
      display: flex;
      align-items: center;
      padding: 0 8px;
      margin-bottom: 4px;
      white-space: nowrap;
      transition: background-color 0.2s;
      cursor: pointer;
      justify-content: space-between;
      line-height: 1;

      &:hover {
        background-color: #ededee;
      }
    }

    &__button {
      border: 0;
      background-color: transparent;
      padding: 0;
      margin: 0;
      cursor: pointer;
    }
  }
</style>
