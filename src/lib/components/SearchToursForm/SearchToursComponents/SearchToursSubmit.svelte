<div class="search-tours-submit">
  <button class="search-tours-submit__button" type="submit">Знайти</button>
</div>

<style lang="scss">
  .search-tours-submit {
    flex: 1;
    padding: 12px;
    height: 100%;

    @include media('<=tablet') {
      min-width: 80px;
      width: 80px;
      max-width: 80px;
    }

    &__button {
      background-color: var(--color__button);
      color: #fff;
      width: 100%;
      height: 100%;
      border-radius: 3px;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
      outline: 0;
      border: 2px solid transparent;
      transition: background-color 0.2s;
      font-family: var(--type__primary);

      &:hover {
        background-color: var(--color__button-hover);
      }
    }
  }
</style>
