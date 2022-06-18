<script>
  export let checked = false;
  export let disabled = false;
  export let name = '';
  export let value = '';
</script>

<label class="checkbox__label" class:checkbox__label--disabled={disabled}>
  <input class="checkbox__input" {disabled} {checked} {name} {value} type="checkbox" on:change />
  <slot />
</label>

<style lang="scss">
  .checkbox {
    &__label {
      color: var(--color__dark);
      line-height: 1;
      display: grid;
      grid-template-columns: 20px auto;
      gap: 10px;
      width: 100%;
      align-items: center;
      cursor: pointer;

      &--disabled {
        color: var(--color__grey);
        cursor: not-allowed;
      }
    }

    &__input {
      --form-control-color: var(--color__link);
      -webkit-appearance: none;
      appearance: none;
      background-color: var(--color__light);
      margin: 0;

      color: var(--form-control-color);
      width: 20px;
      height: 20px;
      border: 2px solid var(--form-control-color);
      border-radius: 3px;

      display: grid;
      place-content: center;

      &::before {
        content: '';
        width: 8px;
        height: 8px;
        clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
        transform: scale(0);
        transform-origin: bottom left;
        transition: 120ms transform ease-in-out;
        box-shadow: inset 10px 10px var(--form-control-color);
        /* Windows High Contrast Mode */
        background-color: CanvasText;
      }

      &:checked::before {
        transform: scale(1);
      }

      &:disabled {
        --form-control-color: var(--color__grey);
      }
    }
  }
</style>
