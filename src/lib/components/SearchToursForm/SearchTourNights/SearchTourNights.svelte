<script>
  import { createEventDispatcher } from 'svelte';
  import { valuesSearchForm } from '$lib/stores/search/searchForm';

  import SearchToursLabel from '../SearchToursComponents/SearchToursLabel.svelte';
  import SearchToursField from '../SearchToursComponents/SearchToursField.svelte';
  import SearchToursDropdown from '../SearchToursComponents/SearchToursDropdown.svelte';
  import SearchToursNightsItem from './SearchToursNightsItem.svelte';
  import SearchToursActiveNight from './SearchToursActiveNight.svelte';
  import { getNights } from './nigths';

  export let isSubmitting = false;
  const { isNightsModalOpened } = valuesSearchForm;

  const dispatch = createEventDispatcher();

  function onClickLabel() {
    if (!$isNightsModalOpened) {
      dispatch('open_nights_modal');
    }
  }

  function handleClickOutside() {
    if ($isNightsModalOpened) {
      dispatch('close_nights_modal');
    }
  }

  function handleWindowKeyDown({ detail: { event } }) {
    if (event.key === 'Escape') {
      if ($isNightsModalOpened) {
        dispatch('close_nights_modal');
      }
    }
  }

  const nights = getNights();
</script>

<SearchToursField isActive={$isNightsModalOpened} {isSubmitting} type="nights">
  <SearchToursLabel on:click={onClickLabel} label="Тривалість">
    <SearchToursActiveNight />
  </SearchToursLabel>
  <SearchToursDropdown
    isOpen={$isNightsModalOpened}
    on:click_outside={handleClickOutside}
    on:window_key_down={handleWindowKeyDown}
  >
    {#each nights as item}
      <SearchToursNightsItem on:change_night on:click_night {...item} />
    {/each}
  </SearchToursDropdown>
</SearchToursField>
