<script>
  import { onMount } from 'svelte';
  import { dispatch } from '$lib/stores/store';
  import { valuesSearchCities, actionsSearchCities } from '$lib/stores/search/searchCities';
  import { valuesSearchServices, actionsSearchServices } from '$lib/stores/search/searchServices';

  import { createForm } from 'svelte-forms-lib';
  import Form from '$lib/elements/Forms/Form.svelte';
  import SearchToursLocation from './SearchToursLocation.svelte';

  const { cities, loading: loadingCities } = valuesSearchCities;
  const { services, loading: loadingServices } = valuesSearchServices;

  onMount(() => {
    dispatch(
      actionsSearchCities.start({
        params: {
          geoId: 0
        }
      })
    );
    dispatch(actionsSearchServices.start());
  });

  const onSubmit = async (values) => {
    console.log('values', values);
  };

  let formContext = createForm({
    initialValues: {
      where: '',
      where_id: undefined,
      from: ''
    },
    // validationSchema: schema,
    onSubmit
  });
  const { isSubmitting, handleChange } = formContext;
</script>

<Form context={formContext} formProps={{ method: 'post' }}>
  <div class="search-tours-form">
    <SearchToursLocation {formContext} submitting={$isSubmitting} />
    <button type="submit">submit</button>
  </div>
</Form>

<style lang="scss">
  .search-tours-form {
    height: 80px;
    border-radius: 3px;
    box-shadow: 0 4px 40px 0 rgb(0 0 0 / 4%), 0 2px 20px 0 rgb(254 226 12 / 6%);
    background-color: var(--color__light);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    position: relative;
    z-index: 10;
  }
</style>
