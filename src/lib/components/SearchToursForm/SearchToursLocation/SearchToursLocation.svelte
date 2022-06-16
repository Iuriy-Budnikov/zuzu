<script>
  import { createEventDispatcher, getContext } from 'svelte';
  import { key } from 'svelte-forms-lib';
  import { onMount } from 'svelte';
  import { valuesSearchSuggests } from '$lib/stores/search/searchSuggests';
  import { valuesSearchGeoTree } from '$lib/stores/search/searchGeoTree';
  import { valuesSearchForm } from '$lib/stores/search/searchForm';

  import { clickOutside } from '$lib/utils/clickOutside';
  import { windowKeyDown } from '$lib/utils/windowKeyDown';

  import SearchSuggestLocation from './SearchSuggestLocation.svelte';
  import SearchSuggestGeoGroup from './SearchSuggestGeoGroup.svelte';
  import SearchSuggestGeoItem from './SearchSuggestGeoItem.svelte';
  import Icon from '$lib/elements/Icon/Icon.svelte';
  import SearchToursLabel from '../SearchToursComponents/SearchToursLabel.svelte';
  import SearchToursField from '../SearchToursComponents/SearchToursField.svelte';
  import SearchSuggestGeoAddAll from './SearchSuggestGeoAddAll.svelte';
  import SearchToursLoader from '../SearchToursComponents/SearchToursLoader.svelte';

  const { suggests, loading: loadingSuggests } = valuesSearchSuggests;
  const { geo, loading: loadingGeoTree } = valuesSearchGeoTree;
  const { isSuggestModalOpened, isGeoTreeModalOpened } = valuesSearchForm;

  let listSuggestsElement;
  let listGeoElement;
  let inputElement;

  const dispatch = createEventDispatcher();

  const { form } = getContext(key);

  let placeholder = '';
  $: {
    const numberOfIds = $form['where_ids'].length;
    const categoryId = $form['where_category_id'];
    if (categoryId) {
      const findSuggest = $suggests?.find((c) => c.id == categoryId);
      if (findSuggest) {
        placeholder = '';
        if (numberOfIds) {
          placeholder = findSuggest.value;
          placeholder += ': ';
          placeholder += numberOfIds + ' ';
          if (numberOfIds === 1) {
            placeholder += 'курорт';
          } else if (numberOfIds > 1 && numberOfIds < 5) {
            placeholder += 'курорта';
          } else {
            placeholder += 'курортів';
          }
        }
      }
    } else {
      placeholder = !$isSuggestModalOpened ? 'Куди' : '';
    }
  }

  function onClickLabel() {
    if (!$isSuggestModalOpened) {
      dispatch('open_suggest_modal');
    }
  }

  function onInputKeyDown(e) {
    if (listSuggestsElement) {
      listSuggestsElement.scrollTop = 0;
    }
    const text = e.currentTarget.value;
    if (!text) {
      handleReset();
    }
    dispatch('autocomplete_suggests', { where: text });
  }

  function handleSuggestion({ value, id, type }) {
    dispatch('close_suggest_modal');
    dispatch('close_geo_tree_modal');
    dispatch('change_suggest', { type, id, where: value });
    dispatch('open_deps_modal');
  }

  function handleReset() {
    dispatch('reset_suggests');
  }

  function handleHoverSuggestion({ id, type }) {
    if (type === 'country') {
      if ($isGeoTreeModalOpened && listGeoElement) {
        listGeoElement.scrollTop = 0;
      }
      dispatch('open_geo_tree_modal', { id });
    } else {
      if ($isGeoTreeModalOpened) {
        dispatch('close_geo_tree_modal');
      }
    }
  }

  function handleSubmitGeo() {
    dispatch('close_suggest_modal');
    dispatch('close_geo_tree_modal');
  }

  function handleClickOutside() {
    if ($isSuggestModalOpened) {
      dispatch('close_suggest_modal');
    }
    if ($isGeoTreeModalOpened) {
      dispatch('close_geo_tree_modal');
    }
  }

  function handleWindowKeyDown({ detail: { event } }) {
    if (event.key === 'Escape') {
      if ($isSuggestModalOpened) {
        dispatch('close_suggest_modal');
        inputElement.blur();
      }
      if ($isGeoTreeModalOpened) {
        dispatch('close_geo_tree_modal');
      }
    }
  }

  onMount(() => {
    dispatch('mount_suggests');
  });
</script>

<SearchToursField isActive={$isSuggestModalOpened} type="location">
  <div class="search-tours-form-location">
    <SearchToursLabel
      on:click={onClickLabel}
      label={$isSuggestModalOpened || !!$form['where'] || !!$form['where_ids'].length ? 'Куди' : ''}
    >
      <input
        class="search-tours-form-location__input"
        class:search-tours-form-location__input--minimized={$isSuggestModalOpened ||
          !!$form['where'] ||
          !!$form['where_ids'].length}
        name="where"
        type="text"
        on:keyup={onInputKeyDown}
        {placeholder}
        value={$form['where_ids'].length ? '' : $form['where']}
        bind:this={inputElement}
      />
    </SearchToursLabel>

    <div
      use:clickOutside
      on:click_outside={handleClickOutside}
      use:windowKeyDown
      on:window_key_down={handleWindowKeyDown}
    >
      {#if !!$form['where'] || !!$form['where_ids'].length || !!$form['where_category_id']}
        <div class="search-tours-form-location__reset" on:click={handleReset}>
          <Icon name="reset" width="10px" height="10px" box="10" />
        </div>
      {/if}
      {#if $isSuggestModalOpened}
        <div class="search-tours-form-location__dropdown">
          <div class="search-tours-form-location__container">
            <div
              class="search-tours-form-location__list  scrollbar"
              bind:this={listSuggestsElement}
            >
              {#if $loadingSuggests}
                <SearchToursLoader />
              {:else}
                {#each $suggests as item}
                  <SearchSuggestLocation
                    {...item}
                    {handleSuggestion}
                    {handleHoverSuggestion}
                    isActive={$geo?.[0]?.parent_id == item.id}
                  />
                {/each}
              {/if}
            </div>
          </div>
        </div>
      {/if}
      {#if $isGeoTreeModalOpened}
        <div class="search-tours-form-location__dropdown">
          <div
            class="search-tours-form-location__container search-tours-form-location__container--geo"
          >
            <div
              class="search-tours-form-location__list search-tours-form-location__list--geo scrollbar"
              class:search-tours-form-location__list--has-value={!!$form['where_ids'].length}
              bind:this={listGeoElement}
            >
              {#if $loadingGeoTree}
                <SearchToursLoader />
              {:else}
                {#if !!$geo.length}
                  <SearchSuggestGeoAddAll on:change_geo_tree_all name="Всі курорти" />
                {/if}

                {#each $geo as item}
                  {#if item.type === 'province'}
                    <SearchSuggestGeoGroup {...item} on:change_geo_tree />
                  {:else if item.type === 'city'}
                    <SearchSuggestGeoItem {...item} on:change_geo_tree />
                  {/if}
                {/each}
                {#if !!$form['where_ids'].length}
                  <div class="search-tours-form-location__submit_container">
                    <button
                      type="button"
                      class="search-tours-form-location__submit"
                      on:click={handleSubmitGeo}
                    >
                      Обрати
                    </button>
                  </div>
                {/if}
              {/if}
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</SearchToursField>

<style lang="scss">
  .search-tours-form-location {
    height: 100%;

    &:hover {
      .search-tours-form-location__reset {
        &:before {
          background: #fff !important;
        }
      }
    }

    &__input {
      border: none;
      height: 80px;
      outline: 0;
      padding: 0 16px;
      background: 0 0;
      display: flex;
      align-items: center;
      width: 100%;
      cursor: pointer;
      font-size: 19px;
      letter-spacing: 0.09px;
      color: var(--color__dark);
      font-weight: 400;
      background: inherit;

      &--minimized {
        padding-top: 22px;
      }

      &::placeholder {
        color: var(--color__dark);
      }
    }

    &__reset {
      position: absolute;
      right: 25px;
      transform: translateY(-50%);
      top: 50%;
      z-index: 2;
      cursor: pointer;
      color: #8f9397;
      font-size: 10px;
      height: 16px;

      &:hover {
        &:before {
          width: 40px;
          height: 40px;
        }
      }

      &:before {
        content: '';
        position: absolute;
        width: 32px;
        height: 32px;
        background: #f7f7f7;
        z-index: -20;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        border-radius: 50%;
        transition: width 0.3s, height 0.3s;
      }

      :global(svg) {
        height: 16px;
      }
    }

    &__dropdown {
      position: relative;
    }

    &__container {
      top: calc(100% + 2px);
      left: 0;
      position: absolute;
      z-index: 2;

      &--geo {
        left: 503px;
      }
    }

    &__list {
      width: 500px;
      border-radius: 5px;
      overflow-y: scroll;
      overflow-x: hidden;
      background-color: var(--color__light);
      box-shadow: 0 4px 40px 0 rgb(0 0 0 / 4%);
      max-height: 363px;

      &--geo {
        min-height: 363px;
      }

      &--has-value {
        padding-bottom: 70px;
      }
    }

    &__submit_container {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      padding: 16px;
      background-color: var(--color__light);
    }

    &__submit {
      background-color: var(--color__link);
      width: 100%;
      font-family: var(--type__primary);
      border: 1px solid var(--color__link);
      border-radius: 3px;
      padding: 10px;
      color: var(--color__light);
      cursor: pointer;
      transition: opacity 0.2s;
      font-weight: 600;

      &:hover {
        opacity: 0.9;
      }
    }
  }
</style>
