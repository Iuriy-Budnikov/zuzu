<script>
  import { createEventDispatcher, getContext } from 'svelte';
  import { key } from 'svelte-forms-lib';
  const { form } = getContext(key);
  import Checkbox from '$lib/elements/Inputs/Checkbox.svelte';

  export let id;
  export let parent_id = '';
  export let category_id = '';
  export let name = '';

  const dispatch = createEventDispatcher();

  function onChange(e) {
    const checked = e.currentTarget.checked;
    const combinedParentId = category_id || parent_id;
    dispatch('change_geo_tree', { checked, id, parent_id: combinedParentId });
  }
</script>

<div
  class="search-suggest-geo-item"
  class:search-suggest-geo-item--active={$form['toCities']?.findIndex((c) => c === id) > -1}
>
  <span class="search-suggest-geo-item__checkbox">
    <Checkbox
      id={`checkbox-${id}`}
      on:change={onChange}
      checked={$form['toCities']?.findIndex((c) => c === id) > -1}
      value={id}
    >
      <span class="search-suggest-geo-item__name">{name}</span>
    </Checkbox>
  </span>
</div>

<style lang="scss">
  .search-suggest-geo-item {
    display: flex;
    align-items: center;
    height: 54px;
    transition: background-color 0.2s;

    &--active,
    &:hover {
      background-color: var(--color__light-grey);
    }

    :global(label) {
      padding: 16px 18px;
    }

    &__checkbox {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 16px;
      cursor: pointer;
    }
  }
</style>
