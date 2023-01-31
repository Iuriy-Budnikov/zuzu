<script>
  import { createEventDispatcher } from 'svelte';
  import { clickOutside } from '$lib/utils/clickOutside';
  import { windowKeyDown } from '$lib/utils/windowKeyDown';
  import Modal from '$lib/elements/Modal/Modal.svelte';
  import MediaQuery from '$lib/elements/MediaQuery/MediaQuery.svelte';

  const dispatch = createEventDispatcher();
  export let modalId;
  export let isOpen = false;
  export let isRight = false;
  export let type = '';
  export let listElement;

  function handleCloseModal() {
    dispatch('close_modal');
  }
</script>

<MediaQuery query="(max-width: 767px)" let:matches>
  {#if matches}
    <Modal fullHeight {modalId} {isOpen} on:close={handleCloseModal}>
      <slot />
    </Modal>
  {:else}
    <div
      class="search-tours-dropdown"
      use:clickOutside
      on:click_outside
      use:windowKeyDown
      on:window_key_down
    >
      {#if isOpen}
        <div class="search-tours-dropdown__dropdown">
          <div
            class="search-tours-dropdown__container"
            class:search-tours-dropdown__container--right={isRight}
            class:search-tours-dropdown__container--date={type === 'date'}
          >
            <div
              class="search-tours-dropdown__list scrollbar"
              bind:this={listElement}
              class:search-tours-dropdown__list--people={type === 'people'}
              class:search-tours-dropdown__list--date={type === 'date'}
            >
              <slot />
            </div>
          </div>
        </div>
      {/if}
    </div>
  {/if}
</MediaQuery>

<style lang="scss">
  .search-tours-dropdown {
    &__dropdown {
      position: relative;
    }

    &__container {
      top: calc(100% + 2px);
      left: 0;
      position: absolute;
      z-index: 2;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 0px 0px 40px rgb(0 0 0 / 20%);

      &--right {
        right: 0;
        left: auto;
      }

      &--date {
        left: -138px;
      }
    }

    &__list {
      width: auto;
      min-width: 200px;
      border-radius: 5px;
      overflow-y: auto;
      overflow-x: hidden;
      background-color: var(--color__light);
      max-height: 363px;

      &--people,
      &--date {
        max-height: initial;
      }

      &--date {
        min-width: 500px;
        @include media('<=laptop') {
          min-width: 430px;
        }
      }
    }
  }
</style>
