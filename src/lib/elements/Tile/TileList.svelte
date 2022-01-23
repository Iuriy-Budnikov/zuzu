<div class="tile-list">
  <slot />
</div>

<style lang="scss">
  .tile-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0 -40px 0;

    @include media('<=phone') {
      flex-direction: column;
      margin: 0;
    }
  }
</style>
