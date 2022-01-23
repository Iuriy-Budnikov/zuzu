<script>
  export let description = undefined;
  export let image = undefined;
  export let title = undefined;
</script>

<article class="tile">
  <div class="tile__icon">{image}</div>
  <h3>{title}</h3>
  <p>{description}</p>
</article>

<style lang="scss">
  .tile {
    width: 48.5%;
    padding: 40px;

    @include media('>768px') {
      &:hover{
        background: var(--color__bg--primary);
      }
    }
    
    @include media('<=phone') {
      margin-bottom: 45px;
      width: 100%;
      padding: 5% 0;
    }
    &__icon{
      width: 34px;
      height: 48px;
      font-size: 34px;
      padding-top: 5px;
    }
    h3 {
      font-size: 28px;
      line-height: 36px;
      padding: 24px 0 12px;
      max-width: 502px;

      @include media('<=phone') {
        max-width: 100%;
        font-size: 22px;
        line-height: 31px;
      }
    }
    p {
      max-width: 502px;
      
      @include media('<=phone') {
        max-width: 100%;
      }
    }
  }
</style>
