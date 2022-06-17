<script>
  import { createEventDispatcher, getContext } from 'svelte';
  import { key } from 'svelte-forms-lib';
  const { form } = getContext(key);
  import Checkbox from '$lib/elements/Inputs/Checkbox.svelte';
  import { valuesSearchGeoTree } from '$lib/stores/search/searchGeoTree';
  const { geo } = valuesSearchGeoTree;

  export let name = '';

  const dispatch = createEventDispatcher();

  function onChange(e) {
    const ids = [];
    $geo.forEach((c) => {
      if (!c.children) {
        ids.push(c.id);
      } else {
        c.children.forEach((child) => {
          ids.push(child.id);
        });
      }
    });
    const checked = e.currentTarget.checked;
    dispatch('change_geo_tree_all', { checked, ids, parent_id: $geo?.[0].parent_id });
  }

  let checked = false;
  $: {
    const ids = [];
    $geo.forEach((c) => {
      if (c.children) {
        c.children.forEach((child) => {
          ids.push(child.id);
        });
      } else {
        ids.push(c.id);
      }
    });
    checked = ids.every((v) => $form['where_ids']?.includes(v));
  }
</script>

<div class="search-suggest-geo-item" class:search-suggest-geo-item--active={checked}>
  <span class="search-suggest-geo-item__checkbox">
    <Checkbox {checked} on:change={onChange}>
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
      background-color: #f8f8f9;
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
