<script>
  import Button from '$lib/elements/Button/Button.svelte';

  export let isSubmitting = false;
</script>

<div class="search-tours-submit">
  <Button type="submit" disabled={isSubmitting}>Знайти</Button>
</div>

<style lang="scss">
  .search-tours-submit {
    flex: 1;
    padding: 12px;
    height: 100%;
    align-items: center;
    display: flex;

    @include media('<=laptop') {
      min-width: 120px;
      width: 120px;
      max-width: 120px;
      padding: 12px 8px;
    }

    @include media('<=tablet') {
      padding: 0;
      min-width: 90px;
      width: 90px;
      max-width: 90px;
    }

    @include media('<=phone') {
      width: 100%;
      flex: unset;
      min-width: 0;
      max-width: 100%;
      padding: 0;
      height: auto;
    }

    :global(.button) {
      width: 100%;
      height: 100%;
      text-transform: uppercase;

      @include media('<=phone') {
        height: 64px;
      }
    }
  }
</style>
