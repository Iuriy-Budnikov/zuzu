<script>
  export let isFocused = false;
  export let isEmpty = true;
  export let id = undefined;
</script>

<label
  class="form-label"
  class:form-label--is-focused={isFocused}
  class:form-label--is-empty={isEmpty}
  class:form-label--is-not-empty={!isEmpty}
  for={id}
>
  <slot />
</label>

<style lang="scss">
  .form-label {
    position: absolute;
    top: 25px;
    left: 0px;
    width: 100%;
    color: #a4a5a6;
    font-size: 20px;
    line-height: 24px;
    font-family: var(--type__secondary);
    transition: 0.2s all;
    pointer-events: none;
    display: block;
    &--is-not-empty,
    &--is-focused {
      top: -10px;
      font-size: 14px;
    }
  }
</style>
