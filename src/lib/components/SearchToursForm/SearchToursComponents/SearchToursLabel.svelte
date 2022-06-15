<script>
  export let onClickLabel;
  export let label = '';
</script>

<label class="search-tours-label" on:click={onClickLabel}>
  <slot />
  {#if label}
    <div class="search-tours-label__text">{label}</div>
  {/if}
</label>

<style lang="scss">
  .search-tours-label {
    display: flex;
    width: 100%;
    height: 100%;
    cursor: pointer;

    &__text {
      position: absolute;
      left: 16px;
      font-size: 14px;
      top: 15px;
      color: #91989e;
      z-index: 1;
    }
  }
</style>
