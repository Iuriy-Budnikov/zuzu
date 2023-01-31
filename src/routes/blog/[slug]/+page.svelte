<script>
  import { page } from '$app/stores';
  import { format } from 'date-fns';
  import { uk } from 'date-fns/locale/index.js';

  export let data;
</script>

<svelte:head>
  <link rel="canonical" href={$page.url.href} />
  <title>{data.post.title}</title>
  <meta name="description" content={data.post.description} />
  {#if data.post.author.name}
    <meta name="author" content={data.post.author.name} />
  {/if}

  <meta itemprop="name" content={data.post.title} />
  <meta itemprop="description" content={data.post.description} />

  <meta property="og:url" content={$page.url.href} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={data.post.title} />
  <meta property="og:description" content={data.post.description} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content={$page.url.origin} />
  <meta property="twitter:url" content={$page.url.href} />
  <meta name="twitter:title" content={data.post.title} />
  <meta name="twitter:description" content={data.post.description} />

  {#if data.post.coverImage}
    <meta itemprop="image" content={data.post.coverImage.url} />
    <meta property="og:image" content={data.post.coverImage.url} />
    <meta name="twitter:image" content={data.post.coverImage.url} />
  {/if}
</svelte:head>

<article class="article">
  <h1 class="title">{data.post.title}</h1>
  <time class="date">{format(new Date(data.post.date), 'd MMMMMM yyyy', { locale: uk })}</time>
  {@html data.post.content.html}
</article>

<style lang="scss">
  .article {
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
  }
  .title {
    margin-bottom: 10px;

    @include media('<=phone') {
      font-size: 36px;
      line-height: 34px;
      margin-bottom: 8px;
    }
  }
  .date {
    margin-bottom: 30px;
    display: block;
    color: var(--color__text--neutral);

    @include media('<=phone') {
      margin-bottom: 8px;
    }
  }
  .title + .date {
    margin-bottom: 16px;
  }

  .article {
    :global(h3) {
      margin-bottom: 14px;
    }
    :global(ul) {
      list-style: disc;
      padding-left: 20px;
      max-width: 840px;
    }
    :global(li) {
      margin-bottom: 14px;
    }
    :global(p) {
      margin-bottom: 24px;
      max-width: 840px;
    }
  }
</style>
