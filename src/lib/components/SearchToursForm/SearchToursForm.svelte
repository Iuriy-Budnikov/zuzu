<script>
  import { createForm } from 'svelte-forms-lib';
  import { dispatch } from '$lib/stores/store';
  import { actionsSearchCities } from '$lib/stores/search/searchCities';
  import { actionsSearchForm } from '$lib/stores/search/searchForm';
  import { actionsSearchSuggests } from '$lib/stores/search/searchSuggests';
  import { actionsSearchGeoTree } from '$lib/stores/search/searchGeoTree';

  import Form from '$lib/elements/Forms/Form.svelte';
  import SearchToursLocation from './SearchToursLocation/SearchToursLocation.svelte';
  import SearchToursDepCities from './SearchToursDepCities/SearchToursDepCities.svelte';

  const onSubmit = async (values) => {
    console.log('values', values);
  };

  let initialValues = {
    where: '',
    where_category_id: '',
    where_ids: [],
    from_id: ''
  };

  if (typeof localStorage !== 'undefined') {
    try {
      initialValues = JSON.parse(localStorage.getItem('searchForm'));
    } catch (error) {}
  }

  let formContext = createForm({
    initialValues,
    // validationSchema: schema,
    onSubmit
  });
  const { form, isSubmitting, updateField } = formContext;

  if (typeof localStorage !== 'undefined') {
    form.subscribe((values) => {
      localStorage.setItem('searchForm', JSON.stringify(values));
    });
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
    updateField('where_category_id', '');
    updateField('where_ids', []);
    updateField('from_id', '');
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
    if (type === 'city' || type === 'hotel' || $form['where_category_id'] != id) {
      updateField('where_ids', []);
    }
    updateField('where', where);
    updateField('where_category_id', id);
    updateField('from_id', '');
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
    let new_where_ids = $form.where_ids;
    const where_category_id = $form.where_category_id;

    updateField('where_category_id', parent_id);

    if (!!where_category_id && where_category_id != parent_id) {
      new_where_ids = [];
    }

    if (checked) {
      new_where_ids.push(id);
    } else {
      const index = new_where_ids.indexOf(id);
      if (index > -1) {
        new_where_ids.splice(index, 1);
      }
    }
    updateField('where_ids', new_where_ids);
  }
  function onChangeGeoTreeAll({ detail: { checked, ids, parent_id } }) {
    updateField('where_ids', checked ? ids : []);
    updateField('where_category_id', checked ? parent_id : '');
  }
  function onSubmitGeoTree() {
    updateField('from_id', '');
  }

  function onChangeDepCity({ detail: { id } }) {
    updateField('from_id', id);
    dispatch(actionsSearchForm.closeDepsModal());
  }
  function onOpenDepsModal() {
    dispatch(actionsSearchForm.openDepsModal());
    dispatch(
      actionsSearchCities.start({
        params: {
          geoId: $form.where_category_id || 0
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
          geoId: $form.where_category_id || 0
        }
      })
    );
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
      on:open_deps_modal={onOpenDepsModal}
      on:close_deps_modal={onCloseDepsModal}
      on:mount_deps_cities={onMountDepsCities}
    />
    <button type="submit">submit</button>
  </div>
</Form>

<style lang="scss">
  .search-tours-form {
    height: 80px;
    border-radius: 3px;
    box-shadow: 0 4px 40px 0 rgb(0 0 0 / 4%), 0 2px 20px 0 rgb(254 226 12 / 6%);
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
