<script>
  import { createEventDispatcher } from 'svelte';
  import Select from 'svelte-select';
  export let name = undefined;
  const dispatch = createEventDispatcher();
  function onFocus(e) {
    dispatch('focus', e);
  }
  function onChange(e) {
    dispatch('change', e);
    onBlur(e); // call onblur manually, select doesn't support on blur event
  }
  function onBlur(e) {
    dispatch('blur', e);
  }
</script>

<div on:click={onFocus}>
  <Select containerClasses="form-select" {name} on:select={onChange} {...$$props} />
</div>

<style lang="scss">
  :global {
    // .form-select {
    //   --background: transparent;
    //   --border: transparent;
    //   --height: auto;
    //   --padding: 4px 0 11px;
    //   --itemPadding: 20px;
    //   font-family: var(--type__secondary);
    //   line-height: 24px;
    //   font-size: 20px;
    // }

    // .listContainer {
    //   background: transparent !important;
    // }

    // .selectedItem,
    // .selection {
    //   overflow: visible !important;
    // }
    // .item {
    //   background: var(--color__bg--primary);
    //   cursor: pointer !important;
    // }
    // .item.hover:not(.active) {
    //   background: var(--color__bg--neutral) !important;
    // }
    // .item.hover {
    //   background: var(--color__bg--primary) !important;
    // }
    // .item.active {
    //   background: var(--color__brand) !important;
    //   color: #fff !important;
    // }
  }
</style>
