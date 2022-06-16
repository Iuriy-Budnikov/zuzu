<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import { valuesSearchCities } from '$lib/stores/search/searchCities';
  import { valuesSearchForm } from '$lib/stores/search/searchForm';

  import SearchToursLabel from '../SearchToursComponents/SearchToursLabel.svelte';
  import SearchToursField from '../SearchToursComponents/SearchToursField.svelte';
  import SearchToursDropdown from '../SearchToursComponents/SearchToursDropdown.svelte';
  import SearchToursDepCityItem from './SearchToursDepCityItem.svelte';

  const { cities } = valuesSearchCities;
  const { isDepsModalOpened } = valuesSearchForm;
  let listCitiesElement;

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

<SearchToursField type="dep-cities">
  <SearchToursLabel {onClickLabel} label="Звідки" />
  <SearchToursDropdown
    isOpen={$isDepsModalOpened}
    listElement={listCitiesElement}
    {handleClickOutside}
    {handleWindowKeyDown}
  >
    <SearchToursDepCityItem on:change_dep_city name="Тільки проживання" id="0" />
    {#each $cities as item}
      <SearchToursDepCityItem on:change_dep_city {...item} />
    {/each}
  </SearchToursDropdown>
</SearchToursField>
