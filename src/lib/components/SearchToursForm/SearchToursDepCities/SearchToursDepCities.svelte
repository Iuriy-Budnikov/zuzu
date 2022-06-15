<script>
  import { onMount } from 'svelte';
  import { dispatch } from '$lib/stores/store';
  import { valuesSearchCities, actionsSearchCities } from '$lib/stores/search/searchCities';
  import { clickOutside } from '$lib/utils/clickOutside';
  import { windowKeyDown } from '$lib/utils/windowKeyDown';

  import SearchToursLabel from '../SearchToursComponents/SearchToursLabel.svelte';
  import SearchToursField from '../SearchToursComponents/SearchToursField.svelte';
  import SearchToursDropdown from '../SearchToursComponents/SearchToursDropdown.svelte';
  import SearchToursDepCityItem from './SearchToursDepCityItem.svelte';

  const { cities, loading: loadingCities } = valuesSearchCities;
  let isOpenMenu = false;
  let listCitiesElement;

  function onClickLabel() {
    if (!isOpenMenu) {
      isOpenMenu = true;
    }
  }

  function handleClickOutside() {
    if (isOpenMenu) {
      isOpenMenu = false;
    }
  }

  function handleWindowKeyDown({ detail: { event } }) {
    if (event.key === 'Escape') {
      if (isOpenMenu) {
        isOpenMenu = false;
      }
    }
  }

  onMount(() => {
    dispatch(
      actionsSearchCities.start({
        params: {
          geoId: 0
        }
      })
    );
  });
</script>

<SearchToursField type="dep-cities">
  <SearchToursLabel {onClickLabel} label="Звідки" />
  <SearchToursDropdown
    isOpen={isOpenMenu}
    listElement={listCitiesElement}
    {handleClickOutside}
    {handleWindowKeyDown}
  >
    {#each $cities as item}
      <SearchToursDepCityItem {...item} isActive={false} />
    {/each}
  </SearchToursDropdown>
</SearchToursField>
