<script>
  export let checked = false;
  export let name = '';
  export let value = '';
</script>

<label class="radio__label">
  <input class="radio__input" {checked} {name} {value} type="radio" on:change />
  <slot />
</label>

<style lang="scss">
  .radio {
    &__label {
      line-height: 1;
      display: grid;
      grid-template-columns: 20px auto;
      gap: 10px;
      width: 100%;
      align-items: center;
      cursor: pointer;
    }

    &__input {
      -webkit-appearance: none;
      appearance: none;
      background-color: var(--color__light);
      margin: 0;

      color: var(--color__link);
      width: 20px;
      height: 20px;
      border: 2px solid var(--color__link);
      border-radius: 50%;

      display: grid;
      place-content: center;

      &::before {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 50%;
        transform: scale(0);
        transition: 120ms transform ease-in-out;
        box-shadow: inset 10px 10px var(--color__link);
        /* Windows High Contrast Mode */
        background-color: CanvasText;
      }

      &:checked::before {
        transform: scale(1);
      }
    }
  }
</style>
