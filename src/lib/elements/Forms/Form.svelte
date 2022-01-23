<script>
  import { Form } from 'svelte-forms-lib';
  export let context = undefined;
  export let fromProps = undefined;
</script>

<Form {context} {...fromProps}>
  <slot />
</Form>
