<script>
  import { getContext, createEventDispatcher } from 'svelte';
  import { key } from 'svelte-forms-lib';
  const { form } = getContext(key);
  import Radio from '$lib/elements/Inputs/Radio.svelte';

  export let nights = 0;
  export let nightsTo = 0;
  export let night = '';
  export let day = '';

  const dispatch = createEventDispatcher();

  function onChange() {
    dispatch('change_night', { nights, nightsTo });
  }
  function onClick() {
    dispatch('click_night');
  }
  $: checked = $form.nights === nights && $form.nightsTo === nightsTo;
</script>

<div
  class="search-tours-dep-city-item"
  class:search-tours-dep-city-item--active={checked}
  on:click={checked ? onClick : undefined}
>
  <Radio {checked} on:change={onChange}>
    <div class="search-tours-dep-city-item__text">
      <span class="search-tours-dep-city-item__night">
        {night}
      </span>
      <span class="search-tours-dep-city-item__day">
        , {day}
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
      border-bottom: 2px solid #f8f8f9;
    }

    &--active,
    &:hover {
      background-color: #f8f8f9;
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
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      white-space: nowrap;
      font-family: var(--type__secondary);
    }

    &__day {
      color: #91989e;
    }
    &__night {
      color: #474f55;
    }
  }
</style>
