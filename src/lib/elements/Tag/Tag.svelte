<script>
  export let title = undefined;
</script>

<div class="tag">{title}</div>
<style lang="scss">
  .tag {
    background: #FAF9FA;
    border-radius: 100px;
    padding: 15px 24px;
    margin: 0 4px 4px 0;
    color: #9598A2;
    font-family: var(--type__secondary);
    font-size: 16px;
    font-weight: 600;
    white-space: nowrap;

    @media (prefers-color-scheme: dark) {
      background: #1d1d1f;
    }
  }
</style>
