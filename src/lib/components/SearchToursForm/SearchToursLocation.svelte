<script>
  import { getContext } from 'svelte';
  import { key } from 'svelte-forms-lib';
  import { onMount } from 'svelte';
  import { dispatch } from '$lib/stores/store';
  import { valuesSearchSuggests, actionsSearchSuggests } from '$lib/stores/search/searchSuggests';
  import SearchSuggestLocation from './SearchSuggestLocation.svelte';

  const { suggests, loading: loadingSuggests } = valuesSearchSuggests;

  export let formContext;
  export let submitting = false;

  let isOpenSuggestions = false;
  let listElement;

  const { form } = getContext(key);

  function onClickLabel() {
    isOpenSuggestions = true;
  }

  function onInputKeyDown(e) {
    listElement.scrollTop = 0;
    const text = e.currentTarget.value;
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

  function handleSuggestion({ name, id }) {
    formContext.updateField('where', name);
    formContext.updateField('where_id', id);
    isOpenSuggestions = false;
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
      placeholder={!isOpenSuggestions ? 'Куди' : ''}
      value={$form['where']}
    />
    {#if isOpenSuggestions || !!$form['where']}
      <div class="search-tours-form-location__label_minimized">Куди</div>
    {/if}
  </label>
  {#if isOpenSuggestions}
    <div class="search-tours-form-location__sugestions">
      <div class="search-tours-form-location__container scrollbar" bind:this={listElement}>
        {#each $suggests as item}
          <SearchSuggestLocation {...item} {handleSuggestion} />
        {/each}
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .search-tours-form-location {
    flex: 1.7;
    border-radius: 5px 0 0 5px;
    position: relative;
    height: 100%;

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
    }
  }
</style>
