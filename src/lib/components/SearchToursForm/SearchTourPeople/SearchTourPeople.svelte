<script>
  import { createEventDispatcher, getContext } from 'svelte';
  import { key } from 'svelte-forms-lib';

  import { openModal, closeModal } from '$lib/elements/Modal/utils/store';
  import { valuesSearchForm } from '$lib/stores/search/searchForm';
  import SearchToursLabel from '../SearchToursComponents/SearchToursLabel.svelte';
  import SearchToursField from '../SearchToursComponents/SearchToursField.svelte';
  import SearchToursDropdown from '../SearchToursComponents/SearchToursDropdown.svelte';
  import SearchToursReset from '../SearchToursComponents/SearchToursReset.svelte';
  import SearchToursActivePeople from './SearchToursActivePeople.svelte';
  import SearchToursPeoplePicker from './SearchToursPeoplePicker.svelte';
  import { SEARCH_TOURS_MODAL } from '../searchConstants';

  const { isPeopleModalOpened } = valuesSearchForm;

  const dispatch = createEventDispatcher();

  const { form } = getContext(key);

  function handleClickLabel() {
    if (!$isPeopleModalOpened) {
      dispatch('open_people_modal');
    }
  }
  function handleOpenModal() {
    if (!$isPeopleModalOpened) {
      dispatch('open_people_modal');
      openModal(SEARCH_TOURS_MODAL);
    }
  }
  function handleClickOutside() {
    if ($isPeopleModalOpened) {
      dispatch('close_people_modal');
    }
  }
  function handleCloseModal() {
    if ($isPeopleModalOpened) {
      dispatch('close_people_modal');
      closeModal(SEARCH_TOURS_MODAL);
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
  <div class="search-tours-people">
    <SearchToursLabel on:click={handleClickLabel} on:open_modal={handleOpenModal} label="Туристи">
      <SearchToursActivePeople />
      {#if $form['people'] != 2 || $form['children'].length}
        <SearchToursReset on:click={handleReset} />
      {/if}
    </SearchToursLabel>
    <SearchToursDropdown
      isOpen={$isPeopleModalOpened}
      isRight={true}
      modalId={SEARCH_TOURS_MODAL}
      type="people"
      on:click_outside={handleClickOutside}
      on:close_modal={handleCloseModal}
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
