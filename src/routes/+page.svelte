<script context="module">
  export const prerender = true;
</script>

<script>
  import SearchTours from '$lib/components/SearchToursForm/SearchToursForm.svelte';

  const title = 'ZuZu Travel | Гарячі тури та путівки ⛱️ туризм, відпочинок та подорожі';
  const description =
    'Гарячі тури від всіх туроператорів України на одному сайті. ✈️️ Порівняння цін, фотографії готелів, онлайн-моніторинг путівок, що горять.';
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
</svelte:head>

<div class="home">
  <SearchTours />
</div>

<style lang="scss">
  .home {
    margin: 0 auto;
    max-width: 1200px;
    padding: 240px 40px 240px 40px;

    @include media('<=tablet') {
      padding: 100px 30px 0;
    }
    @include media('<=phone') {
      padding: 100px 5% 0;
    }
  }
</style>
