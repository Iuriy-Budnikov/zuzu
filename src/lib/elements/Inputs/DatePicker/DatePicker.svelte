<script>
  import Flatpickr from 'svelte-flatpickr';
  import './flatpickr.scss';

  export let options;
  export let value;
</script>

<Flatpickr {options} on:change {value} />
