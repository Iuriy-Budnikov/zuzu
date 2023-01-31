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

      @include media('<=phone') {
        border-radius: 5px 5px 0 0;
        flex: unset;
      }
    }
    &--dep-cities {
      flex: 1.1;
      min-width: 170px;
      width: 170px;
      max-width: 170px;

      @include media('<=laptop') {
        min-width: 140px;
        width: 140px;
        max-width: 140px;
      }
      @include media('<=phone') {
        flex: unset;
      }
    }
    &--date {
      min-width: 240px;
      width: 240px;
      max-width: 240px;

      @include media('<=laptop') {
        min-width: 205px;
        width: 205px;
        max-width: 205px;
      }

      @include media('<=tablet') {
        min-width: 160px;
        width: 160px;
        max-width: 160px;
      }
    }
    &--nights {
      flex: 152px 0 0;
      min-width: 152px;
      max-width: 152px;

      @include media('<=laptop') {
        min-width: 125px;
        width: 125px;
        max-width: 125px;
      }
      @include media('<=phone') {
        flex: unset;
      }
    }
    &--people {
      flex: 1;
      min-width: 180px;

      @include media('<=laptop') {
        min-width: 140px;
        width: 140px;
        max-width: 140px;
      }
      @include media('<=phone') {
        flex: unset;
      }
    }

    &--location,
    &--dep-cities,
    &--date,
    &--nights,
    &--people {
      @include media('<=phone') {
        width: 100%;
        min-width: 0;
        max-width: 100%;
        height: 80px;
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

      @include media('<=phone') {
        display: none;
      }
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
