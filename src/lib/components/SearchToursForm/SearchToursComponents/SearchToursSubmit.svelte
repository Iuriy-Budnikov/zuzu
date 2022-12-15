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

    @include media('<=tablet') {
      min-width: 80px;
      width: 80px;
      max-width: 80px;
    }
  }
</style>
