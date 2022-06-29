<script>
  import { getContext } from 'svelte';
  import { key } from 'svelte-forms-lib';
  import { parse } from 'date-fns';
  import DatePicker from '$lib/elements/Inputs/DatePicker/DatePicker.svelte';
  import { Ukrainian } from 'flatpickr/dist/l10n/uk.js';

  const { form } = getContext(key);
  const dateFormat = 'yyyy-MM-dd';

  let currentDate;
  let start;
  let end;
  let options;

  $: {
    currentDate = new Date();
    start = parse($form.checkIn, dateFormat, currentDate);
    end = parse($form.checkTo, dateFormat, currentDate);

    options = {
      inline: true,
      locale: Ukrainian,
      animate: false,
      mode: 'single',
      minDate: 'today',
      onDayCreate: function (dObj, dStr, fp, dayElem) {
        const date = dayElem.dateObj;
        if (date > start && date < end) {
          dayElem.className += ' selected-day';
        }
      }
    };
  }

  export let onChangeDate;
</script>

<div class="search-tour-picker">
  <DatePicker {options} on:change={onChangeDate} value={$form.checkDate} />
</div>

<style lang="scss">
  .search-tour-picker {
    padding: 16px;
  }
</style>
