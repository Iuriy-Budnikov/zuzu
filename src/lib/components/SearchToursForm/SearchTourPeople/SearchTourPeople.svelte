<script>
  import { createEventDispatcher, getContext } from 'svelte';
  import { key } from 'svelte-forms-lib';
  import { valuesSearchForm } from '$lib/stores/search/searchForm';

  import SearchToursLabel from '../SearchToursComponents/SearchToursLabel.svelte';
  import SearchToursField from '../SearchToursComponents/SearchToursField.svelte';
  import SearchToursDropdown from '../SearchToursComponents/SearchToursDropdown.svelte';
  import SearchToursReset from '../SearchToursComponents/SearchToursReset.svelte';

  const { isPeopleModalOpened } = valuesSearchForm;

  const dispatch = createEventDispatcher();

  const { form } = getContext(key);

  function onClickLabel() {
    if (!$isPeopleModalOpened) {
      dispatch('open_people_modal');
    }
  }

  function handleClickOutside() {
    if ($isPeopleModalOpened) {
      dispatch('close_people_modal');
    }
  }

  function handleWindowKeyDown({ detail: { event } }) {
    if (event.key === 'Escape') {
      if ($isPeopleModalOpened) {
        dispatch('close_people_modal');
      }
    }
  }

  function handleReset() {
    dispatch('reset_people');
  }
</script>

<SearchToursField isActive={$isPeopleModalOpened} type="people">
  <SearchToursLabel on:click={onClickLabel} label="Туристи">
    <!-- <SearchToursActiveNight /> -->
    {#if $form['people'] != '2'}
      <SearchToursReset on:click={handleReset} />
    {/if}
  </SearchToursLabel>
  <SearchToursDropdown
    isOpen={$isPeopleModalOpened}
    on:click_outside={handleClickOutside}
    on:window_key_down={handleWindowKeyDown}
  >
    +++++++++++
    <!-- {#each nights as item}
      <SearchToursNightsItem on:change_night on:click_night {...item} />
    {/each} -->
  </SearchToursDropdown>
</SearchToursField>
