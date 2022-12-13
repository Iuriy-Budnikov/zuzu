<script>
  import { createEventDispatcher, getContext } from 'svelte';
  import { key } from 'svelte-forms-lib';
  import { parse } from 'date-fns';
  import DatePicker from '$lib/elements/Inputs/DatePicker/DatePicker.svelte';
  import { Ukrainian } from 'flatpickr/dist/l10n/uk.js';
  import SearchTourRangeButton from './SearchTourRangeButton.svelte';
  import { DATE_FORMAT } from '$lib/utils/dateUtils';
  import Button from '$lib/elements/Button/Button.svelte';

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
      disable: [currentDate],
      onDayCreate: function (dObj, dStr, fp, dayElem) {
        if ($form.checkDate) {
          const date = dayElem.dateObj;
          if (date >= start && date <= end) {
            dayElem.className += ' selected-day';
          }
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
  function onOpenPeopleModal() {
    dispatch('open_people_modal');
  }
</script>

<div class="search-tour-picker">
  <div class="search-tour-picker__date-picker">
    <DatePicker {options} on:change={onChangeDate} value={$form.checkDate} />
  </div>
  <div class="search-tour-picker__check-range">
    <SearchTourRangeButton value={1} on:change_range={onChangeCheckRange}>
      ± 1 день
    </SearchTourRangeButton>
    <SearchTourRangeButton value={3} on:change_range={onChangeCheckRange}>
      ± 3 дні
    </SearchTourRangeButton>
    <SearchTourRangeButton value={5} on:change_range={onChangeCheckRange}>
      ± 7 днів
    </SearchTourRangeButton>
    <Button on:click={onOpenPeopleModal}>Обрати</Button>
  </div>
</div>

<style lang="scss">
  .search-tour-picker {
    padding: 16px;

    &__date-picker {
      display: flex;
      justify-content: center;

      :global(.flatpickr-calendar) {
        width: 100%;
      }
    }

    &__check-range {
      display: flex;
      align-items: center;
      width: 100%;
      margin-top: 20px;
    }
  }
</style>
