<script>
  import { getContext, createEventDispatcher } from 'svelte';
  import { key } from 'svelte-forms-lib';
  const { form } = getContext(key);
  import Icon from '$lib/elements/Icon/Icon.svelte';
  import Radio from '$lib/elements/Inputs/Radio.svelte';
  export let id = '';
  export let name = '';
  export let rel = '';
  export let transport = [];

  const dispatch = createEventDispatcher();

  function onChange() {
    dispatch('change_dep_city', { id, transport: transport?.[0] || 'no' });
  }
  function onClick() {
    dispatch('click_dep_city');
  }
  $: checked = $form.from == id;
</script>

<div
  class="search-tours-dep-city-item"
  class:search-tours-dep-city-item--active={checked}
  on:click={checked ? onClick : undefined}
  role="presentation"
>
  <Radio {checked} on:change={onChange}>
    <div class="search-tours-dep-city-item__text">
      <span class="search-tours-dep-city-item__name">
        {#if rel}з {/if}{rel || name}</span
      >
      <span class="search-tours-dep-city-item__icon">
        {#if transport?.[0] === 'air'}
          на літаку
          <Icon width="18px" height="16px" box="18 18" name="air" />
        {:else if transport?.[0] === 'bus'}
          на автобусі
          <Icon width="16px" height="16px" box="16 16" name="bus" />
        {:else}
          <Icon width="16px" height="16px" box="16 16" name="foot" />
        {/if}
      </span>
    </div>
  </Radio>
</div>

<style lang="scss">
  .search-tours-dep-city-item {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    transition: background-color 0.2s;

    &:not(:last-child) {
      border-bottom: 2px solid var(--color__light-grey);
    }

    &--active {
      font-weight: 600;
    }

    &--active,
    &:hover {
      background-color: var(--color__light-grey);
    }

    :global(label) {
      padding: 16px 18px;
      @include media('>=tablet') {
        grid-template-columns: auto;
      }
    }

    :global(input) {
      @include media('>=tablet') {
        display: none;
      }
    }

    &__text {
      width: 100%;
      font-size: 18px;
      color: #474f55;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: space-between;
      white-space: nowrap;
      font-family: var(--type__secondary);

      @include media('<=laptop') {
        font-size: 14px;
      }
    }

    &__name {
      padding-right: 10px;
    }
    &__icon {
      font-size: 14px;
      display: flex;
      align-items: center;

      :global(svg) {
        display: inline-flex;
        margin-left: 10px;
      }
      :global(svg path) {
        fill: #474f55;
      }
    }
  }
</style>
