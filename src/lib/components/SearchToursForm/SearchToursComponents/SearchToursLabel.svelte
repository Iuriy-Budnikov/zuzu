<script>
  import { createEventDispatcher } from 'svelte';
  import MediaQuery from '$lib/elements/MediaQuery/MediaQuery.svelte';

  const dispatch = createEventDispatcher();

  export let label = '';

  function handleClick() {
    dispatch('click');
  }
  function handleOpenModal() {
    dispatch('open_modal');
  }
</script>

<MediaQuery query="(max-width: 767px)" let:matches>
  {#if matches}
    <label class="search-tours-label" on:click={handleOpenModal} role="presentation">
      <slot />
      {#if label}
        <div class="search-tours-label__text">{label}</div>
      {/if}
    </label>
  {:else}
    <label class="search-tours-label" on:click={handleClick} role="presentation">
      <slot />
      {#if label}
        <div class="search-tours-label__text">{label}</div>
      {/if}
    </label>
  {/if}
</MediaQuery>

<style lang="scss">
  .search-tours-label {
    display: flex;
    width: 100%;
    height: 100%;
    cursor: pointer;

    &__text {
      position: absolute;
      left: 16px;
      font-size: 14px;
      top: 15px;
      color: #91989e;
      z-index: 1;

      @include media('<=laptop') {
        font-size: 12px;
      }
    }
  }
</style>
