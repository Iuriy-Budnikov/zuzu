<script>
  export let name = '';
  export let isActive = false;
</script>

<div class="search-tours-dep-city-item">
  <div class="search-tours-dep-city-item__text">
    <span class="search-tours-dep-city-item__name">{name}</span>
  </div>
</div>

<style lang="scss">
  .search-tours-dep-city-item {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    &:not(:last-child) {
      border-bottom: 2px solid #f8f8f9;
    }

    &__text {
      width: 100%;
      padding: 16px 18px;
      cursor: pointer;
      font-size: 18px;
      color: #474f55;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: space-between;
      white-space: nowrap;
      font-family: var(--type__secondary);

      &:hover {
        background-color: #f8f8f9;
      }
    }

    &__name {
      padding-right: 10px;
    }
  }
</style>
