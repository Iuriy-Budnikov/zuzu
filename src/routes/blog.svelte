<script context="module">
  export const prerender = true;

  const allPosts = import.meta.glob('./blog/*.{md,svx}');

  let body = [];
  for (let path in allPosts) {
    body.push(
      allPosts[path]().then(({ metadata }) => {
        return { path, metadata };
      })
    );
  }
  export const load = async () => {
    const posts = await Promise.all(body);

    return {
      props: {
        posts
      }
    };
  };
</script>

<script>
  const title = 'ZuZu Travel | Гарячі тури та путівки ⛱️ туризм, відпочинок та подорожі';
  const description =
    'Гарячі тури від всіх туроператорів України на одному сайті. ✈️️ Порівняння цін, фотографії готелів, онлайн-моніторинг путівок, що горять.';

  import { format } from 'date-fns';
  import { uk } from 'date-fns/locale/index.js';
  export let posts;

  const dateSortedPosts = posts
    .slice()
    .sort((post1, post2) => {
      return new Date(post2.metadata.date) - new Date(post1.metadata.date);
    })
    .map((c) => {
      if (c.metadata && c.metadata.date) {
        const newDate = new Date(c.metadata.date);
        const formatedDate = format(newDate, 'd MMMMMM yyyy', { locale: uk });
        return { ...c, metadata: { ...c.metadata, date: formatedDate } };
      }
      return c;
    });
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
    {#each dateSortedPosts as { path, metadata: { title, tags, date } }}
      <article class="blog__article">
        <a class="blog__article_title" href={path.replace('.md', '').replace('.svx', '')}>{title}</a
        >
        <p class="date">{date}</p>
        <div>
          {#each tags as tag}
            <a class="tag" href="/tags/{tag}">#{tag}</a>
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
