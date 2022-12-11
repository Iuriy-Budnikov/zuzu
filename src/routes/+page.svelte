<script>
  import { page } from '$app/stores';
  import SearchTours from '$lib/components/SearchToursForm/SearchToursForm.svelte';
  const title = 'Гарячі тури та путівки, ⛱️ туризм, відпочинок та подорожі';
  const description =
    'Гарячі тури від всіх туроператорів України на одному сайті. ✈️️ Порівняння цін, фотографії готелів, онлайн-моніторинг путівок, що горять.';
  const coverImage = `${$page.url.origin}/images/social_main.jpg`;
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
