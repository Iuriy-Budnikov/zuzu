<script>
  import { page } from '$app/stores';
  export let data;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const title = 'Привіт! Це теги для мого блогу про ⛱️ туризм, відпочинок та подорожі';
  const description = 'Щоб простіше було знаходити пости, використовуйте теги';
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

<div class="blog">
  <h1 class="blog__title">{capitalizeFirstLetter(data.tag)}</h1>
  <section>
    {#each data.posts as { slug, title }}
      <article class="blog__article">
        <a class="blog__article_title" href={`/blog/${slug}`}>{title}</a>
      </article>
    {/each}
  </section>
</div>

<style lang="scss">
  .blog {
    margin: 0 auto;
    max-width: 1200px;
    padding: 200px 40px 0 40px;
    width: 100%;

    @include media('<=tablet') {
      padding: 100px 30px 0;
    }
    @include media('<=phone') {
      padding: 100px 5% 0;
    }

    &__title {
      margin-bottom: 60px;

      @include media('<=phone') {
        font-size: 36px;
        line-height: 34px;
        margin-bottom: 40px;
      }
    }

    &__article {
      margin-bottom: 40px;
    }

    &__article_title {
      margin: 0;
      padding: 0;
      font-family: var(--type__secondary);
      font-size: 20px;
      line-height: 32px;
    }
  }
</style>
