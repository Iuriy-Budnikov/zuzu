<!-- <script context="module">
  import p from '../../lib/elements/Article/p.svelte';
  import ul from '../../lib/elements/Article/ul.svelte';
  import li from '../../lib/elements/Article/li.svelte';
  import h3 from '../../lib/elements/Article/h3.svelte';
  export { p, ul, li, h3 };
</script> -->

<script>

  import { format } from 'date-fns';
  import { uk } from 'date-fns/locale/index.js';

  export let data;
  const meta = data.meta;

  // export let description;
  // export let title;
  // export let date;

  // const newDate = new Date(date);
  // const formatedDate = format(newDate, 'd MMMMMM yyyy', { locale: uk });
</script>

<svelte:head>
    <link rel="canonical" href={meta.url} />

    <!-- HTML Meta Tags -->
    <title>{meta.title}</title>
    <meta name="description" content={meta.description} />
    <meta name="author" content={meta.author | "bachrc"} />

    <!-- Google / Search Engine Tags -->
    <meta itemprop="name" content={meta.title} />
    <meta itemprop="description" content={meta.description} />
    <meta itemprop="image" content={meta.image} />

    <!-- Facebook Meta Tags -->
    <meta property="og:url" content={meta.url} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={meta.title} />
    <meta property="og:description" content={meta.description} />
    <meta property="og:image" content={meta.image} />

    <!-- Twitter Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="twitter:domain" content="https://zuzutravel.co" />
    <meta property="twitter:url" content={meta.url} />
    <meta name="twitter:title" content={meta.title} />
    <meta name="twitter:description" content={meta.description} />
    <meta name="twitter:image" content={meta.image} />
</svelte:head>


<article class="article">
  <h1 class="title">{meta.title}</h1>
  <!-- <time class="date">{formatedDate}</time> -->
  {@html data.html}
</article>

<style lang="scss">
  .article {
    margin: 0 auto;
    max-width: 1200px;
    padding: 200px 40px 0 40px;

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
</style>
