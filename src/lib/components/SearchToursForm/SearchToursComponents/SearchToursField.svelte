<script>
  export let isActive = false;
  export let type = 'location';
</script>

<div
  class="search-tours-field"
  class:search-tours-field--active={isActive}
  class:search-tours-field--location={type === 'location'}
  class:search-tours-field--dep-cities={type === 'dep-cities'}
>
  <slot />
</div>

<style lang="scss">
  .search-tours-field {
    position: relative;
    height: 100%;
    transition: background-color 0.2s;

    &--location {
      flex: 1.7;
      border-radius: 5px 0 0 5px;
    }
    &--dep-cities {
      flex: 1.1;
    }

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

    &--active,
    &:hover {
      background: #f8f8f9;

      &:after {
        display: none;
      }
    }
  }
</style>
