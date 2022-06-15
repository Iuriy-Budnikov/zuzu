<script>
  import { createForm } from 'svelte-forms-lib';
  import Form from '$lib/elements/Forms/Form.svelte';
  import SearchToursLocation from './SearchToursLocation/SearchToursLocation.svelte';
  import SearchToursDepCities from './SearchToursDepCities/SearchToursDepCities.svelte';

  const onSubmit = async (values) => {
    console.log('values', values);
  };

  let formContext = createForm({
    initialValues: {
      where: '',
      where_category_id: '',
      where_ids: [],
      from: ''
    },
    // validationSchema: schema,
    onSubmit
  });
  const { isSubmitting } = formContext;
</script>

<Form context={formContext} formProps={{ method: 'post' }}>
  <div class="search-tours-form">
    <SearchToursLocation />
    <SearchToursDepCities />
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
