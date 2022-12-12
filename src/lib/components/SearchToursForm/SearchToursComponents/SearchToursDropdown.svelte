<script>
  import { clickOutside } from '$lib/utils/clickOutside';
  import { windowKeyDown } from '$lib/utils/windowKeyDown';

  export let isOpen = false;
  export let isRight = false;
  export let type = '';
  export let listElement;
</script>

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
    }
  }
</style>
