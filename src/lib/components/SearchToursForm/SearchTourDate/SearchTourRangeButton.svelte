<script>
  import { createEventDispatcher, getContext } from 'svelte';
  import { key } from 'svelte-forms-lib';

  const { form } = getContext(key);
  const dispatch = createEventDispatcher();
  export let value;
  function onClick() {
    dispatch('change_range', {
      value: $form.checkRange !== value ? value : 0
    });
  }
</script>

<button
  class="search-tour-range-button"
  class:search-tour-range-button--active={$form.checkRange === value}
  on:click={onClick}
  type="button"
>
  <slot />
</button>

<style lang="scss">
  .search-tour-range-button {
    height: 44px;
    width: 100%;
    border-radius: 5px;
    background-color: #f8f8f9;
    font-size: 16px;
    font-weight: 700;
    color: #474f55;
    cursor: pointer;
    white-space: nowrap;
    margin: 0 8px;
    border: none;
    transition: background-color 0.2s;
    font-family: var(--type__primary);

    @include media('<=laptop') {
      font-size: 14px;
    }

    &--active {
      color: var(--color__light);
      background-color: var(--color__button);
    }
  }
</style>
