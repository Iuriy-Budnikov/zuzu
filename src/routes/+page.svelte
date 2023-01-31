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

<h1 class="title">Онлайн бронювання турів всіх операторів України</h1>
<SearchTours />

<style lang="scss">
  .title {
    font-size: 40px;
    letter-spacing: 0.4px;
    font-weight: 700;
    max-width: 590px;
    line-height: 1.05;
    padding-top: 3px;
    margin: 0 0 20px;

    @include media('<=phone') {
      font-size: 26px;
      margin: 0 0 15px;
    }
  }
</style>
