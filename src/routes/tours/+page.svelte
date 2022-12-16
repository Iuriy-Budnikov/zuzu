<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { dispatch } from '$lib/stores/store';
  import { actionsTours, valuesTours } from '$lib/stores/tours/tours';
  import ToursList from '$lib/components/ToursList/ToursList.svelte';
  import ToursListLoader from '$lib/components/ToursList/ToursListLoader.svelte';

  const title = 'Пошук турів';
  const description = "Для звя'зку будь ласка використовуйте наступні посилання";
  const coverImage = `${$page.url.origin}/images/social_main.jpg`;

  const { loading: loadingTours, loaded: loadedTours, error: errorTours, tours } = valuesTours;

  onMount(() => {
    dispatch(
      actionsTours.start({
        params: {}
      })
    );
  });
</script>

<svelte:head>
  <link rel="canonical" href={$page.url.href} />
  <title>{title}</title>
  <meta name="description" content={description} />

  <meta itemprop="name" content={title} />
  <meta itemprop="description" content={description} />
  <meta itemprop="image" content={coverImage} />

  <meta property="og:url" content={$page.url.href} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={coverImage} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content={$page.url.origin} />
  <meta property="twitter:url" content={$page.url.href} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={coverImage} />
</svelte:head>

{#if $loadingTours && !$loadedTours}
  <ToursListLoader />
{:else if !$loadingTours && $loadedTours}
  <ToursList tours={$tours} />
{:else if !$loadingTours && !$loadedTours && $errorTours}
  Помилка
{/if}
