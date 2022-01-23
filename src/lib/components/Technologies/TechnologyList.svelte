

<div class="technology-list">
  <slot />
</div>

<style lang="scss">
  .technology-list {
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
