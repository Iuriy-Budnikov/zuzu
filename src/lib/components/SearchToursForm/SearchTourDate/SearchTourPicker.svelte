<script>
  import { createEventDispatcher, getContext } from 'svelte';
  import { key } from 'svelte-forms-lib';
  import { parse } from 'date-fns';
  import DatePicker from '$lib/elements/Inputs/DatePicker/DatePicker.svelte';
  import { Ukrainian } from 'flatpickr/dist/l10n/uk.js';
  import SearchTourRangeButton from './SearchTourRangeButton.svelte';
  import { DATE_FORMAT } from '$lib/utils/dateUtils';

  const { form } = getContext(key);

  let currentDate;
  let start;
  let end;
  let options;

  const dispatch = createEventDispatcher();

  $: {
    currentDate = new Date();
    start = parse($form.checkIn, DATE_FORMAT, currentDate);
    end = parse($form.checkTo, DATE_FORMAT, currentDate);

    options = {
      inline: true,
      locale: Ukrainian,
      animate: false,
      mode: 'single',
      minDate: 'today',
      onDayCreate: function (dObj, dStr, fp, dayElem) {
        const date = dayElem.dateObj;
        if (date > start && date < end && $form.checkDate) {
          dayElem.className += ' selected-day';
        }
      }
    };
  }

  function onChangeDate(e) {
    dispatch('change_date', e);
  }
  function onChangeCheckRange(e) {
    const value = e.detail.value;
    dispatch('change_check_range', {
      value
    });
  }
</script>

<div class="search-tour-picker">
  <DatePicker {options} on:change={onChangeDate} value={$form.checkDate} />
  <div class="search-tour-picker__check-range">
    <SearchTourRangeButton value={2} on:change_range={onChangeCheckRange}>
      ± 1 день
    </SearchTourRangeButton>
    <SearchTourRangeButton value={4} on:change_range={onChangeCheckRange}>
      ± 3 дні
    </SearchTourRangeButton>
    <SearchTourRangeButton value={6} on:change_range={onChangeCheckRange}>
      ± 7 днів
    </SearchTourRangeButton>
  </div>
</div>

<style lang="scss">
  .search-tour-picker {
    padding: 16px;

    &__check-range {
      display: flex;
      align-items: center;
      width: 100%;
      margin-top: 20px;
    }
  }
</style>
