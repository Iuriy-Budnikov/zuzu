<script>
  import { createEventDispatcher, getContext, onMount } from 'svelte';
  import { format, parse, subDays, addDays } from 'date-fns';
  import { key } from 'svelte-forms-lib';

  import { valuesSearchForm } from '$lib/stores/search/searchForm';

  import SearchToursLabel from '../SearchToursComponents/SearchToursLabel.svelte';
  import SearchToursField from '../SearchToursComponents/SearchToursField.svelte';
  import SearchToursDropdown from '../SearchToursComponents/SearchToursDropdown.svelte';
  import SearchTourPicker from './SearchTourPicker.svelte';
  import SearchTourActiveDate from './SearchTourActiveDate.svelte';
  import { DATE_FORMAT } from '$lib/utils/dateUtils';

  export let isSubmitting = false;
  const { form } = getContext(key);
  const { isDateModalOpened } = valuesSearchForm;

  const dispatch = createEventDispatcher();

  function onClickLabel() {
    if (!$isDateModalOpened) {
      dispatch('open_date_modal');
    }
  }

  function handleClickOutside() {
    if ($isDateModalOpened) {
      dispatch('close_date_modal');
    }
  }

  function handleWindowKeyDown({ detail: { event } }) {
    if (event.key === 'Escape') {
      if ($isDateModalOpened) {
        dispatch('close_date_modal');
      }
    }
  }

  function onChangeDate(event) {
    const [, date] = event.detail.detail;
    const currentDate = new Date();
    const selectedDate = parse(date, DATE_FORMAT, currentDate);
    const tomorrow = parse(format(addDays(currentDate, 1), DATE_FORMAT), DATE_FORMAT, currentDate);
    const formatedTomorrowDate = format(tomorrow, DATE_FORMAT);
    const prevDate = subDays(selectedDate, $form.checkRange);
    const nextDate = addDays(selectedDate, $form.checkRange);
    let formatedPrevDate = format(prevDate, DATE_FORMAT);
    const formatedNextDate = format(nextDate, DATE_FORMAT);

    // prevent offset if +- selected
    if (prevDate < tomorrow) {
      formatedPrevDate = formatedTomorrowDate;
    }

    dispatch('change_date', {
      checkDate: date,
      checkIn: formatedPrevDate,
      checkTo: formatedNextDate
    });
  }

  function onChangeCheckRange(event) {
    const { value } = event.detail;
    const currentDate = new Date();
    const selectedDate = parse($form.checkDate, DATE_FORMAT, currentDate);
    const tomorrow = parse(format(addDays(currentDate, 1), DATE_FORMAT), DATE_FORMAT, currentDate);
    const formatedTomorrowDate = format(tomorrow, DATE_FORMAT);
    const prevDate = subDays(selectedDate, value);
    const nextDate = addDays(selectedDate, value);
    let formatedPrevDate = format(prevDate, DATE_FORMAT);
    const formatedNextDate = format(nextDate, DATE_FORMAT);

    // // prevent offset if +- selected
    if (prevDate < tomorrow) {
      formatedPrevDate = formatedTomorrowDate;
    }

    dispatch('change_check_range', {
      checkRange: value,
      checkIn: formatedPrevDate,
      checkTo: formatedNextDate
    });
  }

  onMount(() => {
    dispatch('mount_date');
  });
</script>

<SearchToursField isActive={$isDateModalOpened} {isSubmitting} type="date">
  <SearchToursLabel on:click={onClickLabel} label="Початок туру">
    <SearchTourActiveDate />
  </SearchToursLabel>
  <SearchToursDropdown
    isOpen={$isDateModalOpened}
    on:click_outside={handleClickOutside}
    on:window_key_down={handleWindowKeyDown}
    type="date"
  >
    <SearchTourPicker
      on:change_date={onChangeDate}
      on:change_check_range={onChangeCheckRange}
      on:open_people_modal
    />
  </SearchToursDropdown>
</SearchToursField>
