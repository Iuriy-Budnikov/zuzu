<script>
  import { createForm } from 'svelte-forms-lib';
  import { format, addDays } from 'date-fns';

  import { dispatch } from '$lib/stores/store';
  import { actionsSearchCities } from '$lib/stores/search/searchCities';
  import { actionsSearchForm } from '$lib/stores/search/searchForm';
  import { actionsSearchSuggests } from '$lib/stores/search/searchSuggests';
  import { actionsSearchGeoTree } from '$lib/stores/search/searchGeoTree';

  import Form from '$lib/elements/Forms/Form.svelte';
  import SearchToursLocation from './SearchToursLocation/SearchToursLocation.svelte';
  import SearchToursDepCities from './SearchToursDepCities/SearchToursDepCities.svelte';
  import SearchTourNights from './SearchTourNights/SearchTourNights.svelte';
  import SearchToursSubmit from './SearchToursComponents/SearchToursSubmit.svelte';
  import SearchTourPeople from './SearchTourPeople/SearchTourPeople.svelte';
  import SearchTourDate from './SearchTourDate/SearchTourDate.svelte';
  import { DATE_FORMAT } from '$lib/utils/dateUtils';

  const onSubmit = async (values) => {
    console.log('values', values);
  };

  const initialCheckInDays = 7;
  const checkInDate = addDays(new Date(), initialCheckInDays);
  const checkToDate = addDays(checkInDate, initialCheckInDays - 1);
  const initialCheckInDate = format(checkInDate, DATE_FORMAT);
  const initialCheckToDate = format(checkToDate, DATE_FORMAT);

  let initialValues = {
    where: '',
    to: '',
    toCities: [],
    from: '1544', // KIEV
    transport: '',
    nights: initialCheckInDays,
    nightsTo: initialCheckInDays + 2,
    checkRange: 0,
    checkDate: '',
    checkIn: initialCheckInDate,
    checkTo: initialCheckToDate,
    people: 2,
    children: []
  };

  if (typeof localStorage !== 'undefined') {
    try {
      const searchForm = JSON.parse(localStorage.getItem('searchForm'));
      if (searchForm) {
        initialValues = {
          ...initialValues,
          ...searchForm
        };
      }
    } catch (error) {}
  }

  let formContext = createForm({
    initialValues,
    // validationSchema: schema,
    onSubmit
  });
  const { form, isSubmitting, updateField } = formContext;

  try {
    if (typeof localStorage !== 'undefined') {
      form.subscribe((values) => {
        localStorage.setItem('searchForm', JSON.stringify(values));
      });
    }
  } catch (error) {
    console.error('localstorage unavailible');
  }

  function onOpenSuggestModal() {
    dispatch(actionsSearchForm.openSuggestModal());
    dispatch(
      actionsSearchSuggests.start({
        params: {
          text: $form.where,
          nsv: $form.where ? undefined : 1,
          with: $form.where ? undefined : 'price',
          city: $form.where ? undefined : ''
        }
      })
    );
  }
  function onCloseSuggestModal() {
    dispatch(actionsSearchForm.closeSuggestModal());
  }
  function onMountSuggests() {
    dispatch(
      actionsSearchSuggests.start({
        params: {
          nsv: 1,
          with: 'price',
          city: '',
          geoId: 0
        }
      })
    );
  }
  function onResetSuggests() {
    updateField('where', '');
    updateField('to', '');
    updateField('toCities', []);
    updateField('from', '');
    updateField('transport', '');
  }
  function onAutocompleteSuggests({ detail: { where } }) {
    dispatch(
      actionsSearchSuggests.start({
        params: {
          text: where,
          nsv: where ? undefined : 1,
          with: where ? undefined : 'price',
          city: where ? undefined : ''
        }
      })
    );
  }
  function onChangeSuggest({ detail: { type, id, where } }) {
    if (type === 'city' || type === 'hotel' || $form['to'] != id) {
      updateField('toCities', []);
    }
    updateField('where', where);
    updateField('to', id);
    updateField('from', '');
    updateField('transport', '');
  }
  function onOpenGeoTreeModal({ detail: { id } }) {
    dispatch(actionsSearchForm.openGeoTreeModal());
    dispatch(
      actionsSearchGeoTree.start({
        params: {
          id
        }
      })
    );
  }
  function onCloseGeoTreeModal() {
    dispatch(actionsSearchForm.closeGeoTreeModal());
  }
  function onChangeGeoTree({ detail: { checked, id, parent_id } }) {
    let new_toCities = $form.toCities;
    const to = $form.to;

    updateField('to', parent_id);

    if (!!to && to != parent_id) {
      new_toCities = [];
    }

    if (checked) {
      new_toCities.push(id);
    } else {
      const index = new_toCities.indexOf(id);
      if (index > -1) {
        new_toCities.splice(index, 1);
      }
    }
    updateField('toCities', new_toCities);
  }
  function onChangeGeoTreeAll({ detail: { checked, ids, parent_id } }) {
    updateField('toCities', checked ? ids : []);
    updateField('to', checked ? parent_id : '');
  }
  function onSubmitGeoTree() {
    updateField('from', '');
    updateField('transport', '');
  }

  function onChangeDepCity({ detail: { id, transport } }) {
    updateField('from', id);
    updateField('transport', transport);
    dispatch(actionsSearchForm.closeDepsModal());
    dispatch(actionsSearchForm.openNightsModal());
  }
  function onClickDepCity() {
    dispatch(actionsSearchForm.closeDepsModal());
    dispatch(actionsSearchForm.openNightsModal());
  }
  function onOpenDepsModal() {
    dispatch(actionsSearchForm.openDepsModal());
    dispatch(
      actionsSearchCities.start({
        params: {
          geoId: $form.to || 0
        }
      })
    );
  }
  function onCloseDepsModal() {
    dispatch(actionsSearchForm.closeDepsModal());
  }
  function onMountDepsCities() {
    dispatch(
      actionsSearchCities.start({
        params: {
          geoId: $form.to || 0
        }
      })
    );
  }

  function onChangeNight({ detail: { nights, nightsTo } }) {
    updateField('nights', nights);
    updateField('nightsTo', nightsTo);
    dispatch(actionsSearchForm.closeNightsModal());
    dispatch(actionsSearchForm.openDateModal());
  }
  function onClickNight() {
    dispatch(actionsSearchForm.closeNightsModal());
    dispatch(actionsSearchForm.openDateModal());
  }
  function onOpenNightsModal() {
    dispatch(actionsSearchForm.openNightsModal());
  }
  function onCloseNightsModal() {
    dispatch(actionsSearchForm.closeNightsModal());
  }

  function onChangeDate({ detail: { checkDate, checkIn, checkTo } }) {
    updateField('checkDate', checkDate);
    updateField('checkIn', checkIn);
    updateField('checkTo', checkTo);
  }
  function onChangeCheckRange({ detail: { checkRange, checkIn, checkTo } }) {
    updateField('checkRange', checkRange);
    updateField('checkIn', checkIn);
    updateField('checkTo', checkTo);
  }
  function onOpenDateModal() {
    dispatch(actionsSearchForm.openDateModal());
  }
  function onCloseDateModal() {
    dispatch(actionsSearchForm.closeDateModal());
  }
  function onOpenPeopleDateModal() {
    console.log('!!!!!!');
    onCloseDateModal();
    onOpenPeopleModal();
  }

  function onChangePeople({ detail: { people, children } }) {
    updateField('people', people);
    updateField('children', children || []);
  }
  function onResetPeople() {
    updateField('people', 2);
    updateField('children', []);
  }
  function onOpenPeopleModal() {
    dispatch(actionsSearchForm.openPeopleModal());
  }
  function onClosePeopleModal() {
    dispatch(actionsSearchForm.closePeopleModal());
  }
</script>

<Form context={formContext} formProps={{ method: 'post' }}>
  <div class="search-tours-form">
    <SearchToursLocation
      on:open_suggest_modal={onOpenSuggestModal}
      on:close_suggest_modal={onCloseSuggestModal}
      on:open_geo_tree_modal={onOpenGeoTreeModal}
      on:close_geo_tree_modal={onCloseGeoTreeModal}
      on:mount_suggests={onMountSuggests}
      on:reset_suggests={onResetSuggests}
      on:autocomplete_suggests={onAutocompleteSuggests}
      on:change_suggest={onChangeSuggest}
      on:change_geo_tree={onChangeGeoTree}
      on:change_geo_tree_all={onChangeGeoTreeAll}
      on:submit_geo_tree={onSubmitGeoTree}
      on:open_deps_modal={onOpenDepsModal}
    />
    <SearchToursDepCities
      on:change_dep_city={onChangeDepCity}
      on:click_dep_city={onClickDepCity}
      on:open_deps_modal={onOpenDepsModal}
      on:close_deps_modal={onCloseDepsModal}
      on:mount_deps_cities={onMountDepsCities}
    />
    <SearchTourNights
      on:change_night={onChangeNight}
      on:click_night={onClickNight}
      on:open_nights_modal={onOpenNightsModal}
      on:close_nights_modal={onCloseNightsModal}
    />
    <SearchTourDate
      on:change_date={onChangeDate}
      on:change_check_range={onChangeCheckRange}
      on:open_date_modal={onOpenDateModal}
      on:close_date_modal={onCloseDateModal}
      on:open_people_modal={onOpenPeopleDateModal}
    />
    <SearchTourPeople
      on:reset_people={onResetPeople}
      on:change_people={onChangePeople}
      on:open_people_modal={onOpenPeopleModal}
      on:close_people_modal={onClosePeopleModal}
    />
    <SearchToursSubmit />
  </div>
</Form>

<style lang="scss">
  .search-tours-form {
    height: 80px;
    border-radius: 3px;
    box-shadow: 0px 0px 40px rgb(0 0 0 / 40%);
    background-color: var(--color__light);
    font-family: var(--type__secondary);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    position: relative;
    z-index: 10;
  }
</style>
