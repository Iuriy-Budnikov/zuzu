<script>
  import { createEventDispatcher, getContext } from 'svelte';
  import { format, parse, subDays, addDays } from 'date-fns';
  import { key } from 'svelte-forms-lib';

  import { valuesSearchForm } from '$lib/stores/search/searchForm';

  import SearchToursLabel from '../SearchToursComponents/SearchToursLabel.svelte';
  import SearchToursField from '../SearchToursComponents/SearchToursField.svelte';
  import SearchToursDropdown from '../SearchToursComponents/SearchToursDropdown.svelte';
  import SearchTourPicker from './SearchTourPicker.svelte';

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
    const [, date] = event.detail;
    const dateFormat = 'yyyy-MM-dd';
    const selectedDate = parse(date, dateFormat, new Date());
    const prevDate = subDays(selectedDate, $form.checkRange);
    const nextDate = addDays(selectedDate, $form.checkRange);
    const formatedPrevDate = format(prevDate, dateFormat);
    const formatedNextDate = format(nextDate, dateFormat);

    dispatch('change_date', {
      checkDate: date,
      checkIn: formatedPrevDate,
      checkTo: formatedNextDate
    });
  }
</script>

<SearchToursField isActive={$isDateModalOpened} type="date">
  <SearchToursLabel on:click={onClickLabel} label="Початок туру">
    <!-- <SearchToursActiveNight /> -->
    Label
  </SearchToursLabel>
  <SearchToursDropdown
    isOpen={$isDateModalOpened}
    on:click_outside={handleClickOutside}
    on:window_key_down={handleWindowKeyDown}
    type="date"
  >
    <SearchTourPicker {onChangeDate} />
  </SearchToursDropdown>
</SearchToursField>
