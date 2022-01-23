<script>
  export let title = '';
</script>


<article class="technology">
  <div class="technology__wrap"></div>
  <h3 class="technology__title">{title}</h3>
  <p class="technology__description">
    <slot />
  </p>
</article>

<style lang="scss">
  .technology {
    width: 48.5%;
    padding: 40px;
    
    @include media('<=phone') {
      width: 100%;
      padding: 0;
      margin-bottom: 40px;
    }
    &__title {
      font-size: 28px;
      line-height: 36px;
      padding: 24px 0;
      max-width: 502px;

      @include media('<=phone') {
        font-size: 22px;
        line-height: 31px;
        padding: 14px 0;
      }
    }
    &__description {
    }
  }
</style>
