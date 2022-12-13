<script>
  import { createEventDispatcher, getContext } from 'svelte';
  import { format, parse, subDays, addDays } from 'date-fns';
  import { key } from 'svelte-forms-lib';

  import { valuesSearchForm } from '$lib/stores/search/searchForm';

  import SearchToursLabel from '../SearchToursComponents/SearchToursLabel.svelte';
  import SearchToursField from '../SearchToursComponents/SearchToursField.svelte';
  import SearchToursDropdown from '../SearchToursComponents/SearchToursDropdown.svelte';
  import SearchTourPicker from './SearchTourPicker.svelte';
  import SearchTourActiveDate from './SearchTourActiveDate.svelte';
  import { DATE_FORMAT } from '$lib/utils/dateUtils';

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
    const selectedDate = parse(date, DATE_FORMAT, new Date());
    const prevDate = subDays(selectedDate, $form.checkRange);
    const nextDate = addDays(selectedDate, $form.checkRange);
    const formatedPrevDate = format(prevDate, DATE_FORMAT);
    const formatedNextDate = format(nextDate, DATE_FORMAT);

    dispatch('change_date', {
      checkDate: date,
      checkIn: formatedPrevDate,
      checkTo: formatedNextDate
    });
  }

  function onChangeCheckRange(event) {
    const { value } = event.detail;
    const selectedDate = parse($form.checkDate, DATE_FORMAT, new Date());
    const prevDate = subDays(selectedDate, value);
    const nextDate = addDays(selectedDate, value);
    const formatedPrevDate = format(prevDate, DATE_FORMAT);
    const formatedNextDate = format(nextDate, DATE_FORMAT);

    dispatch('change_check_range', {
      checkRange: value,
      checkIn: formatedPrevDate,
      checkTo: formatedNextDate
    });
  }
</script>

<SearchToursField isActive={$isDateModalOpened} type="date">
  <SearchToursLabel on:click={onClickLabel} label="Початок туру">
    <SearchTourActiveDate />
  </SearchToursLabel>
  <SearchToursDropdown
    isOpen={$isDateModalOpened}
    on:click_outside={handleClickOutside}
    on:window_key_down={handleWindowKeyDown}
    type="date"
  >
    <SearchTourPicker on:change_date={onChangeDate} on:change_check_range={onChangeCheckRange} />
  </SearchToursDropdown>
</SearchToursField>
