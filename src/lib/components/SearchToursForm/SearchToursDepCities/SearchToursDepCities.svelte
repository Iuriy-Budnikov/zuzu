<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import { valuesSearchCities } from '$lib/stores/search/searchCities';
  import { valuesSearchForm } from '$lib/stores/search/searchForm';

  import SearchToursLabel from '../SearchToursComponents/SearchToursLabel.svelte';
  import SearchToursField from '../SearchToursComponents/SearchToursField.svelte';
  import SearchToursDropdown from '../SearchToursComponents/SearchToursDropdown.svelte';
  import SearchToursDepCityItem from './SearchToursDepCityItem.svelte';
  import SearchToursLoader from '../SearchToursComponents/SearchToursLoader.svelte';
  import SearchToursActiveDepCity from './SearchToursActiveDepCity.svelte';

  const { cities, loading: loadingCities } = valuesSearchCities;
  const { isDepsModalOpened } = valuesSearchForm;

  const dispatch = createEventDispatcher();

  function onClickLabel() {
    if (!$isDepsModalOpened) {
      dispatch('open_deps_modal');
    }
  }

  function handleClickOutside() {
    if ($isDepsModalOpened) {
      dispatch('close_deps_modal');
    }
  }

  function handleWindowKeyDown({ detail: { event } }) {
    if (event.key === 'Escape') {
      if ($isDepsModalOpened) {
        dispatch('close_deps_modal');
      }
    }
  }

  onMount(() => {
    dispatch('mount_deps_cities');
  });
</script>

<SearchToursField isActive={$isDepsModalOpened} type="dep-cities">
  <SearchToursLabel on:click={onClickLabel} label="Звідки">
    <SearchToursActiveDepCity />
  </SearchToursLabel>
  <SearchToursDropdown
    isOpen={$isDepsModalOpened}
    on:click_outside={handleClickOutside}
    on:window_key_down={handleWindowKeyDown}
  >
    {#if $loadingCities}
      <SearchToursLoader />
    {:else}
      <SearchToursDepCityItem on:change_dep_city name="Тільки проживання" id="0" />
      {#each $cities as item}
        <SearchToursDepCityItem on:change_dep_city {...item} />
      {/each}
    {/if}
  </SearchToursDropdown>
</SearchToursField>
