<script>
  export let error = undefined;
</script>

{#if error}
  <div class="form-error">{error}</div>
{/if}

<style lang="scss">
  .form-error {
    position: absolute;
    left: 0;
    bottom: -25px;
    color: #eb4747;
    font-family: var(--type__secondary);
    font-size: 14px;
  }
</style>
