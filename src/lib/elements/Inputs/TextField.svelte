<script>
  import { createEventDispatcher } from 'svelte';
  export let name = undefined;
  export let type = 'text';
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

<input
  class="textfield"
  {name}
  {type}
  on:focus={onFocus}
  on:change={onChange}
  on:blur={onBlur}
  {...$$props}
/>

<style lang="scss">
  .textfield {
    display: block;
    box-shadow: none;
    padding: 7px 10px 8px 0px;
    background: transparent;
    width: 100%;
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

    &:-webkit-autofill {
      -webkit-box-shadow: 0px 0px 0px 50px var(--color__bg--primary) inset; /* Change the color to your own background color */
      -webkit-text-fill-color: var(--color__text--primary);
    }
  }
</style>
