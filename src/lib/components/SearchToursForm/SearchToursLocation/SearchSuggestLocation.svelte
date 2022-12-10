<script>
  import Icon from '$lib/elements/Icon/Icon.svelte';

  import { formatPrice } from '$lib/utils/numberUtils';

  export let countryName = '';
  export let cityName = '';
  export let name = '';
  export let uah = '';
  export let price = '';
  export let id;
  export let type = '';
  export let img = '';
  export let value = '';
  export let isActive = false;
  export let handleSuggestion = () => {};
  export let handleHoverSuggestion = () => {};

  $: formattedPrice = formatPrice(parseInt(uah, 10));
  $: formattedName = type === 'hotel' ? name.replaceAll('*', '⭐') : name;

  function onClickSuggestion() {
    handleSuggestion({ value, id, type });
  }
  function onMouseOverSuggestion() {
    handleHoverSuggestion({ id, type });
  }
</script>

<div
  class="search-suggest-location"
  class:search-suggest-location--active={isActive}
  on:click={onClickSuggestion}
  on:mouseenter={onMouseOverSuggestion}
  role="presentation"
>
  <div class="search-suggest-location__wrapper">
    {#if type === 'hotel'}
      <div
        class="search-suggest-location__icon"
        style="background-image: url('/proxy/img/3/160x120/{img}')"
      />
    {:else}
      <div class="search-suggest-location__icon">
        {#if type === 'country'}
          <Icon name="flag" width="14" height="16" box="16 16" />
        {:else if type === 'city'}
          <Icon name="city" width="16" height="16" box="16 16" />
        {/if}
      </div>
    {/if}
    <div
      class="search-suggest-location__name"
      class:search-suggest-location__name--innactive={price === ''}
    >
      <div class="search-suggest-location__text">
        {formattedName}
      </div>
      <div class="search-suggest-location__price">
        {#if type === 'country' && price === ''}
          немає турів
        {:else if type === 'hotel'}
          {countryName}, {cityName}
        {:else if price !== ''}
          від {formattedPrice}
        {/if}
      </div>
    </div>
  </div>
  {#if type === 'country'}
    <div class="search-suggest-location__arrow">
      <Icon name="arrow" width="15" height="9" box="10 10" />
    </div>
  {/if}
</div>

<style lang="scss">
  .search-suggest-location {
    cursor: pointer;
    justify-content: space-between;
    padding: 0 16px;
    display: flex;
    align-items: center;
    height: 72px;
    position: relative;
    font-family: var(--type__secondary);
    transition: background-color 0.2s;

    &--active,
    &:hover {
      background-color: #f8f8f9;
    }

    &__wrapper {
      display: flex;
      align-items: center;
      max-width: 100%;
    }

    &__name {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      min-width: 0;

      &--innactive {
        opacity: 0.5;
      }
    }

    &__text {
      font-size: 18px;
      font-weight: 600;
      color: #404a51;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__price {
      font-size: 13px;
      color: #8f9397;
      flex-shrink: 0;
      text-align: right;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__icon {
      min-width: 64px;
      height: 56px;
      border-radius: 5px;
      background: #f8f8f9 no-repeat 50% / cover;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 1;
      margin-right: 16px;
    }

    &__arrow {
      width: 40px;
      height: 40px;
      background: #f8f8fa;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      margin-left: 8px;
      transition: background-color 0.2s;

      :global(svg) {
        transform: rotate(-90deg);
        margin-right: -2px;
      }
    }
  }
</style>
