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
  class="search-tours-night-item"
  class:search-tours-night-item--active={checked}
  on:click={checked ? onClick : undefined}
  role="presentation"
>
  <Radio {checked} on:change={onChange}>
    <div class="search-tours-night-item__text">
      <span class="search-tours-night-item__night">
        {night}
      </span>
      <span class="search-tours-night-item__day">
        , {day}
      </span>
    </div>
  </Radio>
</div>

<style lang="scss">
  .search-tours-night-item {
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
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      white-space: nowrap;
      font-family: var(--type__secondary);

      @include media('<=laptop') {
        font-size: 14px;
      }
    }

    &__day {
      color: #91989e;
    }
    &__night {
      color: #474f55;
    }
  }
</style>
