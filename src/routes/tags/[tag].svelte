<script context="module">
  export const prerender = true;
  const allPosts = import.meta.glob('../blog/*.{md,svx}');

  let body = [];
  for (let path in allPosts) {
    body.push(
      allPosts[path]().then(({ metadata }) => {
        return { path, metadata };
      })
    );
  }
  export const load = async ({ params }) => {
    const posts = await Promise.all(body);
    const tag = params.tag;

    const filteredPosts = posts.filter((post) => {
      return post.metadata.tags.includes(tag);
    });

    return {
      props: {
        filteredPosts,
        tag
      }
    };
  };
</script>

<script>
  export let filteredPosts, tag;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
</script>

<svelte:head>
  <title>ZuZu Travel | Теги</title>
  <meta name="description" content="ZuZu Travel | Теги" />
</svelte:head>

<div class="blog">
  <h1 class="blog__title">{capitalizeFirstLetter(tag)}</h1>
  <section>
    {#each filteredPosts as { path, metadata: { title } }}
      <article class="blog__article">
        <a
          class="blog__article_title"
          href={path.replace('./tags', '/').replace('.md', '').replace('.svx', '')}>{title}</a
        >
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
</style>
