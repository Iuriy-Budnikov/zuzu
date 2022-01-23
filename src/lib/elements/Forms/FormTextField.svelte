<script>
  import { getContext } from 'svelte';
  import { key } from 'svelte-forms-lib';
  import FormFieldError from './FormFieldError.svelte';
  import FormField from './FormField.svelte';
  import FormLabel from './FormLabel.svelte';
  import TextField from '../Inputs/TextField.svelte';
  export let disabled = false;
  export let id = undefined;
  export let label = undefined;
  export let name = '';
  export let placeholder = undefined;
  export let type = 'text';
  export let withError = true;
  const uid = id || `form-${name}`;
  const { form, handleChange } = getContext(key);
  function onChange(e) {
    handleChange(e.detail);
  }
</script>

<FormField let:onFocus let:onBlur let:isFocused let:isEmpty {name}>
  {#if label}
    <FormLabel id={uid} {isFocused} {isEmpty}>{label}</FormLabel>
  {/if}
  <TextField
    {disabled}
    {type}
    {name}
    {placeholder}
    id={uid}
    on:focus={onFocus}
    on:change={onChange}
    on:blur={onBlur}
    value={$form[name]}
  />
  {#if withError && name}
    <FormFieldError {name} />
  {/if}
</FormField>
