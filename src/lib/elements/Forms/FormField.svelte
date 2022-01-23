<script>
  import { getContext } from 'svelte';
  import { key } from 'svelte-forms-lib';
  const { form } = getContext(key);
  export let name = '';
  let isFocused = false;
  function onFocus(e) {
    isFocused = true;
  }
  function onBlur(e) {
    isFocused = false;
  }
</script>

<div
  class="form-field"
  class:form-field--is-empty={!$form[name]}
  class:form-field--is-not-empty={!!$form[name]}
>
  <slot {isFocused} {onFocus} {onBlur} isEmpty={!$form[name]} />
</div>

<style lang="scss">
  .form-field {
    position: relative;
    padding: 21px 0 0;
    border-bottom: 1px solid #ccc;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      bottom: -1px;
      background: #000;
      height: 1px;
      width: 100%;
      transform: scaleX(0);
      transform-origin: 0 0;
      transition: transform 0.3s;
    }
    &:after {
      content: '';
      display: block;
      clear: both;
    }
    &:hover {
      &:before {
        transform: scaleX(1);
      }
    }
    &--is-not-empty {
      &:before {
        transform: scaleX(1);
      }
    }
  }
</style>
