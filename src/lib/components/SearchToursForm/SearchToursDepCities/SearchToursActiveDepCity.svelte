<script>
  import { getContext } from 'svelte';
  import { key } from 'svelte-forms-lib';
  const { form } = getContext(key);
  import { valuesSearchCities } from '$lib/stores/search/searchCities';
  import Icon from '$lib/elements/Icon/Icon.svelte';
  const { cities } = valuesSearchCities;

  $: city = $cities.find((c) => c.id === $form.from_id);
</script>

<div class="search-tours-active-dep-city">
  <div class="search-tours-active-dep-city__name">
    {#if $form.from_id === '0'}
      Тільки проживання
    {:else if !!city}
      з {city?.rel}
    {/if}
  </div>
  <div class="search-tours-active-dep-city__icon">
    {#if $form.from_id === '0'}
      <Icon width="16px" height="16px" box="16" name="foot" />
    {:else if !!city}
      {#if city.transport?.[0] === 'air'}
        <Icon width="18px" height="16px" box="18" name="air" />
      {:else if city.transport?.[0] === 'bus'}
        <Icon width="16px" height="16px" box="16" name="bus" />
      {/if}
    {/if}
  </div>
</div>

<style lang="scss">
  .search-tours-active-dep-city {
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

    &__icon {
      font-size: 14px;
      display: flex;
      align-items: center;

      :global(svg) {
        display: inline-flex;
        margin-left: 10px;
      }
      :global(svg path) {
        fill: #acafb2;
      }
    }
  }
</style>
