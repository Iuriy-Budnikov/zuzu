<script>
  export let isActive = false;
  export let type = 'location';
</script>

<div
  class="search-tours-field"
  class:search-tours-field--active={isActive}
  class:search-tours-field--location={type === 'location'}
  class:search-tours-field--dep-cities={type === 'dep-cities'}
  class:search-tours-field--date={type === 'date'}
  class:search-tours-field--nights={type === 'nights'}
  class:search-tours-field--people={type === 'people'}
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
      max-width: 170px;

      @include media('<=tablet') {
        min-width: 97px;
        width: 97px;
        max-width: 97px;
      }
    }
    &--date {
      min-width: 240px;
      width: 240px;
      max-width: 240px;

      @include media('<=tablet') {
        min-width: 205px;
        width: 205px;
        max-width: 205px;
      }
    }
    &--nights {
      flex: 125px 0 0;
      min-width: 152px;
      max-width: 152px;

      @include media('<=tablet') {
        min-width: 125px;
        width: 125px;
        max-width: 125px;
      }
    }
    &--people {
      flex: 1;
      min-width: 180px;

      @include media('<=tablet') {
        min-width: 140px;
        width: 140px;
        max-width: 140px;
      }
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
