<script>
  import Button from '$lib/elements/Button/Button.svelte';
  import Icon from '$lib/elements/Icon/Icon.svelte';
  import { getContext, createEventDispatcher } from 'svelte';
  import { key } from 'svelte-forms-lib';
  import SearchToursChildrenList from './SearchToursChildrenList.svelte';
  import SearchToursChildrenPicker from './SearchToursChildrenPicker.svelte';

  const { form } = getContext(key);
  const dispatch = createEventDispatcher();

  let isChildrenOpen = false;

  $: people = $form.people;
  $: children = $form.children;

  function onToggleChildren() {
    isChildrenOpen = !isChildrenOpen;
  }

  function onAddChildren({ detail: { value } }) {
    dispatch('change_people', {
      people,
      children: [...children, value]
    });
    onToggleChildren();
  }

  function onRemoveChildren({ detail: { index } }) {
    dispatch('change_people', {
      people,
      children: children.filter((c, i) => i !== index)
    });
  }

  function onDescrease() {
    if (people === 1) {
      return;
    }
    dispatch('change_people', {
      people: people - 1,
      children
    });
  }
  function onIncrease() {
    if (people === 8) {
      return;
    }

    dispatch('change_people', {
      people: people + 1,
      children
    });
  }
</script>

<div class="search-tours-people-picker">
  <div class="search-tours-people-picker__title">Дорослі</div>
  <div class="search-tours-people-picker__controls">
    <button
      class="search-tours-people-picker__controls-button"
      type="button"
      on:click={onDescrease}
    >
      <Icon name="minus" width="12px" height="2px" box="12 2" />
    </button>
    <div class="search-tours-people-picker__controls-value">
      {people}
    </div>
    <button class="search-tours-people-picker__controls-button" type="button" on:click={onIncrease}>
      <Icon name="plus" width="12px" height="12px" box="12 12" />
    </button>
  </div>

  <SearchToursChildrenList on:change={onRemoveChildren} />

  {#if children.length < 4}
    <div class="search-tours-people-picker__add-children">
      <Button type="button" on:click={onToggleChildren}>Додати дитину</Button>
    </div>
    {#if isChildrenOpen}
      <div class="search-tours-people-picker__title">Скільки років?</div>
      <SearchToursChildrenPicker on:change={onAddChildren} />
    {/if}
  {/if}
</div>

<style lang="scss">
  .search-tours-people-picker {
    padding: 20px 16px 0px 16px;
    width: 228px;

    &__title {
      font-weight: 500;
      font-size: 18px;

      @include media('<=laptop') {
        font-size: 14px;
      }
    }

    &__controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 16px 0 20px;
    }

    &__controls-value {
      font-size: 18px;
      @include media('<=laptop') {
        font-size: 14px;
      }
    }

    &__controls-button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 32px;
      border-radius: 100%;
      box-shadow: 0 4px 24px 0 rgb(0 0 0 / 7%);
      border: 1.5px solid #b2b3b8;
      background-color: #fff;
      cursor: pointer;
    }

    &__add-children {
      margin-bottom: 18px;

      :global(.button) {
        width: 100%;
      }
    }
  }
</style>
