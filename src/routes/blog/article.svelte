<script context="module">
  import p from '../../lib/elements/Article/p.svelte';
  import ul from '../../lib/elements/Article/ul.svelte';
  import li from '../../lib/elements/Article/li.svelte';
  import h3 from '../../lib/elements/Article/h3.svelte';
  export { p, ul, li, h3 };
</script>

<script>
  import { format } from 'date-fns';
  import { uk } from 'date-fns/locale/index.js';

  export let description;
  export let title;
  export let date;

  const newDate = new Date(date);
  const formatedDate = format(newDate, 'd MMMMMM yyyy', { locale: uk });
</script>

<svelte:head>
  <title>ZuZu Travel | {title}</title>
  <meta name="description" content={description} />
</svelte:head>

<article class="article">
  <h1 class="title">{title}</h1>
  <time class="date">{formatedDate}</time>
  <slot />
</article>

<style lang="scss">
  .article {
    margin: 0 auto;
    max-width: 1200px;
    padding: 120px 40px 0 40px;

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
