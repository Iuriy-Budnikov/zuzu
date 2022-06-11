<script>
  import { onMount } from 'svelte';
  import { fetchSearchCities } from '$lib/stores/search/searchCities';

  onMount(() => {
    fetchSearchCities();
  });
</script>
