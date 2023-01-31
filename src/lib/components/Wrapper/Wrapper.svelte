<script>
  import { page } from '$app/stores';
</script>

<main
  class="wrapper"
  class:wrapper--home={$page.url.pathname === '/'}
  class:wrapper--tours={$page.url.pathname === '/tours'}
>
  <div class="wrapper-container">
    <slot />
  </div>
</main>

<style lang="scss">
  .wrapper {
    background-color: var(--color__bg--primary);

    &--home {
      background-color: var(--color__secondary);
    }

    &--tours {
      background-color: var(--color__bg--neutral);
    }

    .wrapper-container {
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      min-width: 0;
    }

    &--tours,
    &--home {
      .wrapper-container {
        margin: 0 auto;
        max-width: 1200px;
        padding: 240px 40px;

        @include media('<=tablet') {
          padding: 160px 30px;
        }
        @include media('<=phone') {
          padding: 100px 16px;
        }
      }
    }
  }
</style>
