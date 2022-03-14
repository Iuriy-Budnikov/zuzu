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
    <ul>
      {#each filteredPosts as { path, metadata: { title } }}
        <li>
          <a href={path.replace('./tags', '/').replace('.md', '').replace('.svx', '')}>{title}</a>
        </li>
      {/each}
    </ul>
  </section>
</div>

<style lang="scss">
  .blog {
    margin: 0 auto;
    max-width: 1200px;
    padding: 120px 40px 0 40px;

    @include media('<=tablet') {
      padding: 80px 30px 0;
    }
    @include media('<=phone') {
      padding: 80px 5% 0;
    }
  }
</style>
