<script>
  import { getContext } from 'svelte';
  import { key } from 'svelte-forms-lib';
  import { onMount } from 'svelte';
  import { dispatch } from '$lib/stores/store';
  import { valuesSearchSuggests, actionsSearchSuggests } from '$lib/stores/search/searchSuggests';
  import { valuesSearchGeoTree, actionsSearchGeoTree } from '$lib/stores/search/searchGeoTree';
  import SearchSuggestLocation from './SearchSuggestLocation.svelte';
  import SearchSuggestGeoGroup from './SearchSuggestGeoGroup.svelte';
  import SearchSuggestGeoItem from './SearchSuggestGeoItem.svelte';
  import Icon from '$lib/elements/Icon/Icon.svelte';

  const { suggests, loading: loadingSuggests } = valuesSearchSuggests;
  const { geo, loading: loadingGeoTree } = valuesSearchGeoTree;

  export let formContext;
  export let submitting = false;

  let isOpenSuggestions = false;
  let isOpenSuggestionsDistrict = false;
  let listSuggestsElement;
  let listGeoElement;

  const { form } = getContext(key);

  let placeholder = '';
  $: {
    const numberOfIds = $form['where_ids'].length;
    const categoryId = $form['where_category_id'];
    if (categoryId) {
      const findSuggest = $suggests?.find((c) => c.id == categoryId);
      if (findSuggest) {
        placeholder = findSuggest.value + ': ';
        if (numberOfIds) {
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
      placeholder = !isOpenSuggestions ? 'Куди' : '';
    }
  }

  function onClickLabel() {
    isOpenSuggestions = true;
    form.subscribe(({ where }) => {
      dispatch(
        actionsSearchSuggests.start({
          params: {
            text: where,
            nsv: where ? undefined : 1,
            with: where ? undefined : 'price',
            city: where ? undefined : ''
          }
        })
      );
    });
  }

  function onInputKeyDown(e) {
    listSuggestsElement.scrollTop = 0;
    const text = e.currentTarget.value;
    if (!text) {
      handleReset();
    }
    dispatch(
      actionsSearchSuggests.start({
        params: {
          text: text,
          nsv: text ? undefined : 1,
          with: text ? undefined : 'price',
          city: text ? undefined : ''
        }
      })
    );
  }

  function handleSuggestion({ value, id, type }) {
    if (type === 'city' || type === 'hotel' || $form['where_category_id'] != id) {
      formContext.updateField('where_ids', []);
    }

    formContext.updateField('where', value);
    formContext.updateField('where_category_id', id);
    isOpenSuggestions = false;
    isOpenSuggestionsDistrict = false;
  }

  function handleReset() {
    formContext.updateField('where', '');
    formContext.updateField('where_category_id', '');
    formContext.updateField('where_ids', []);
  }

  function handleHoverSuggestion({ id, type }) {
    if (type === 'country') {
      if (isOpenSuggestionsDistrict) {
        listGeoElement.scrollTop = 0;
      }
      isOpenSuggestionsDistrict = true;
      dispatch(
        actionsSearchGeoTree.start({
          params: {
            id
          }
        })
      );
    } else {
      if (isOpenSuggestionsDistrict) {
        isOpenSuggestionsDistrict = false;
      }
    }
  }

  onMount(() => {
    dispatch(
      actionsSearchSuggests.start({
        params: {
          nsv: 1,
          with: 'price',
          city: '',
          geoId: 0
        }
      })
    );
  });
</script>

<div class="search-tours-form-location">
  <label class="search-tours-form-location__label" on:click={onClickLabel}>
    <input
      class="search-tours-form-location__input"
      class:search-tours-form-location__input--minimized={isOpenSuggestions || !!$form['where']}
      disabled={submitting}
      name="where"
      type="text"
      on:keyup={onInputKeyDown}
      {placeholder}
      value={$form['where_ids'].length ? '' : $form['where']}
    />
    {#if isOpenSuggestions || !!$form['where']}
      <div class="search-tours-form-location__label_minimized">Куди</div>
    {/if}
  </label>
  {#if !!$form['where'] || !!$form['where_ids'].length || !!$form['where_category_id']}
    <div class="search-tours-form-location__reset" on:click={handleReset}>
      <Icon name="reset" width="10px" height="10px" box="10" />
    </div>
  {/if}
  {#if isOpenSuggestions}
    <div class="search-tours-form-location__sugestions">
      <div class="search-tours-form-location__container scrollbar" bind:this={listSuggestsElement}>
        {#each $suggests as item}
          <SearchSuggestLocation
            {...item}
            {handleSuggestion}
            {handleHoverSuggestion}
            isActive={$geo?.[0]?.parent_id == item.id}
          />
        {/each}
      </div>
    </div>
    {#if isOpenSuggestionsDistrict}
      <div class="search-tours-form-location__sugestions">
        <div
          class="search-tours-form-location__container search-tours-form-location__container--geo scrollbar"
          bind:this={listGeoElement}
        >
          {#each $geo as item}
            {#if item.type === 'province'}
              <SearchSuggestGeoGroup {...item} />
            {:else if item.type === 'city'}
              <SearchSuggestGeoItem {...item} />
            {/if}
          {/each}
        </div>
      </div>
    {/if}
  {/if}
</div>

<style lang="scss">
  .search-tours-form-location {
    flex: 1.7;
    border-radius: 5px 0 0 5px;
    position: relative;
    height: 100%;

    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 1px;
      background: #f8f8f9;
      top: 12px;
      bottom: 12px;
      right: -1px;
      z-index: 1;
    }

    &:hover {
      background: #f8f8f9;

      .search-tours-form-location__reset {
        &:before {
          background: #fff !important;
        }
      }

      &:after {
        display: none;
      }
    }

    &__label {
      display: flex;
      align-items: center;
    }

    &__label_minimized {
      position: absolute;
      left: 16px;
      font-size: 14px;
      top: 15px;
      color: #91989e;
      z-index: 1;
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
      }

      :global(svg) {
        height: 16px;
      }
    }

    &__sugestions {
      position: relative;
    }

    &__container {
      width: 500px;
      top: calc(100% + 2px);
      left: 0;
      position: absolute;
      z-index: 2;
      border-radius: 5px;
      overflow-y: scroll;
      overflow-x: hidden;
      background-color: var(--color__light);
      box-shadow: 0 4px 40px 0 rgb(0 0 0 / 4%);
      max-height: 363px;

      &--geo {
        min-height: 363px;
        left: 503px;
      }
    }
  }
</style>
