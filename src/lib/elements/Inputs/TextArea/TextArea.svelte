<script>
  import { createEventDispatcher } from 'svelte';
  import autoresize from './autoresize';
  export let name = undefined;
  const dispatch = createEventDispatcher();
  function onFocus(e) {
    dispatch('focus', e);
  }
  function onChange(e) {
    dispatch('change', e);
  }
  function onBlur(e) {
    dispatch('blur', e);
  }
</script>

<textarea
  class="textarea"
  {name}
  on:change={onChange}
  on:blur={onBlur}
  on:focus={onFocus}
  use:autoresize
  {...$$props}
/>

<style lang="scss">
  .textarea {
    display: block;
    min-height: 30px;
    box-shadow: none;
    padding: 7px 10px 8px 0px;
    background: transparent;
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    max-height: 198px;
    border: none;
    color: var(--color__text--primary);
    font-family: var(--type__secondary);
    line-height: 24px;
    font-size: 20px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    @include media('<=phone') {
      font-size: 16px;
      padding: 0 10px 7px 0px;
    }
  }
</style>
