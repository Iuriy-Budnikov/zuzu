<div class="social-contacts-list">
  <slot />
</div>

<style lang="scss">
  .social-contacts-list {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    @include media('<=phone') {
      width: 60%;
      flex-wrap: wrap;
    }
  }
</style>
