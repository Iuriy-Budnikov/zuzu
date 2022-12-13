<script>
  export let className = '';
  export let type = 'button';
</script>

<button class="button {className}" {type} on:click {...$$restProps}>
  <slot />
</button>

<style lang="scss">
  .button {
    background-color: var(--color__button);
    color: var(--color__light);
    font-family: var(--type__primary);
    display: inline-flex;
    padding: 0 20px;
    margin: 0;
    outline: none;
    text-decoration: none;
    height: 44px;
    position: relative;
    z-index: 1;
    pointer-events: all;
    backface-visibility: hidden;
    cursor: pointer;
    font-weight: 600;
    font-size: 18px;
    border-radius: 3px;
    border: 2px solid transparent;
    transition: background-color 0.2s;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: var(--color__button-hover);
    }
  }
</style>
