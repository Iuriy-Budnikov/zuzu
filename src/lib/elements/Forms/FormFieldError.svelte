<script>
  import { ErrorMessage } from 'svelte-forms-lib';
  export let name = undefined;
</script>

<div class="form-field-error">
  <ErrorMessage {name} />
</div>

<style lang="scss">
  .form-field-error {
    position: absolute;
    left: 0;
    bottom: -29px;
    color: #eb4747;
    font-family: var(--type__secondary);
    font-size: 17px;
  }
</style>
