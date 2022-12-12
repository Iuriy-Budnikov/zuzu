<script>
  import Icon from '$lib/elements/Icon/Icon.svelte';
</script>

<div class="search-tours-reset" on:click role="presentation">
  <Icon name="reset" width="10px" height="10px" box="10 10" />
</div>

<style lang="scss">
  .search-tours-reset {
    position: absolute;
    right: 25px;
    transform: translateY(-50%);
    top: 50%;
    z-index: 2;
    cursor: pointer;
    color: #8f9397;
    font-size: 10px;
    height: 16px;

    &:hover {
      &:before {
        width: 40px;
        height: 40px;
      }
    }

    &:before {
      content: '';
      position: absolute;
      width: 32px;
      height: 32px;
      background: #f7f7f7;
      z-index: -20;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      border-radius: 50%;
      transition: width 0.3s, height 0.3s;
    }

    :global(svg) {
      height: 16px;
    }
  }
</style>
