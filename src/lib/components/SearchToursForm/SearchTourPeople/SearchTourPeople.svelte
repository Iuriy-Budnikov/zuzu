<script>
  import { createEventDispatcher, getContext } from 'svelte';
  import { key } from 'svelte-forms-lib';

  import { valuesSearchForm } from '$lib/stores/search/searchForm';
  import SearchToursLabel from '../SearchToursComponents/SearchToursLabel.svelte';
  import SearchToursField from '../SearchToursComponents/SearchToursField.svelte';
  import SearchToursDropdown from '../SearchToursComponents/SearchToursDropdown.svelte';
  import SearchToursReset from '../SearchToursComponents/SearchToursReset.svelte';
  import SearchToursActivePeople from './SearchToursActivePeople.svelte';
  import SearchToursPeoplePicker from './SearchToursPeoplePicker.svelte';

  export let isSubmitting = false;
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

<SearchToursField isActive={$isPeopleModalOpened} {isSubmitting} type="people">
  <div class="search-tours-people">
    <SearchToursLabel on:click={onClickLabel} label="Туристи">
      <SearchToursActivePeople />
      {#if $form['people'] != 2 || $form['children'].length}
        <SearchToursReset on:click={handleReset} />
      {/if}
    </SearchToursLabel>
    <SearchToursDropdown
      isOpen={$isPeopleModalOpened}
      isRight={true}
      type="people"
      on:click_outside={handleClickOutside}
      on:window_key_down={handleWindowKeyDown}
    >
      <SearchToursPeoplePicker on:change_people />
    </SearchToursDropdown>
  </div>
</SearchToursField>

<style lang="scss">
  .search-tours-people {
    height: 100%;

    &:hover {
      :global(.search-tours-reset) {
        &:before {
          background: #fff !important;
        }
      }
    }
  }
</style>
