<script>
  import { page } from '$app/stores';
</script>

<main class="wrapper" class:wrapper--home={$page.url.pathname === '/'}>
  <slot />
</main>

<style lang="scss">
  .wrapper {
    background-color: var(--color__bg--primary);

    &--home {
      background-color: var(--color__secondary);
    }
  }
</style>
