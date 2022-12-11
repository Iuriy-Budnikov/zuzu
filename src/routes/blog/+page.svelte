<script>
  import { format } from 'date-fns';
  import { uk } from 'date-fns/locale/index.js';
  const title = 'ZuZu Travel | Гарячі тури та путівки ⛱️ туризм, відпочинок та подорожі';
  const description =
    'Гарячі тури від всіх туроператорів України на одному сайті. ✈️️ Порівняння цін, фотографії готелів, онлайн-моніторинг путівок, що горять.';
  export let data;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
</svelte:head>

<div class="blog">
  <h1 class="blog__title">Привіт! Це мій блог про відпочинок 🌴</h1>
  <section>
    {#each data.posts as { date, title, slug, tags }}
      <article class="blog__article">
        <a class="blog__article_title" href={`/blog/${slug}`}>{title}</a>
        <p class="date">{format(new Date(date), 'd MMMMMM yyyy', { locale: uk })}</p>
        <div>
          {#each tags as tag}
            <a class="tag" href="/blog/tags/{tag.name}">#{tag.name}</a>
          {/each}
        </div>
      </article>
    {/each}
  </section>
</div>

<style lang="scss">
  .blog {
    margin: 0 auto;
    max-width: 1200px;
    padding: 200px 40px 0 40px;

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

  .tag {
    margin-right: 10px;
    text-decoration: none;
    font-size: 12px;
    line-height: 16px;
    color: var(--color__tag);
    transition-property: border-bottom, border-color, background, color, fill;
    transition-duration: var(--time);
    transition-timing-function: ease-out;
    border-color: var(--color__tag-underline);
    border-bottom-width: 1px;
    border-bottom-style: solid;

    &:hover {
      border-color: var(--color__link-underline-hover);
      color: var(--color__link-hover);
    }
  }

  .date {
    font-size: 0.7rem;
    color: gray;
  }
</style>
