<script>
  import { getContext } from 'svelte';
  import { key } from 'svelte-forms-lib';
  import FormFieldError from './FormFieldError.svelte';
  import FormField from './FormField.svelte';
  import FormLabel from './FormLabel.svelte';
  import Select from '../Inputs/Select.svelte';
  export let disabled = false;
  export let id = undefined;
  export let label = undefined;
  export let name = undefined;
  export let options = [];
  export let withError = true;
  const uid = id || `form-${name}`;
  const { form, updateValidateField } = getContext(key);
  function onChange(e) {
    const field = name || uid;
    const value = e.detail.detail;
    updateValidateField(field, value);
  }
</script>

<FormField let:onFocus let:onBlur let:isFocused let:isEmpty {name}>
  {#if label}
    <FormLabel id={uid} isFocused={true} {isEmpty}>{label}</FormLabel>
  {/if}
  <Select
    id={uid}
    isDisabled={disabled}
    {name}
    items={options}
    on:change={onChange}
    on:focus={onFocus}
    on:blur={onBlur}
    value={$form?.[name]}
    {...$$props}
  />
  {#if withError && name}
    <FormFieldError {name} />
  {/if}
</FormField>
