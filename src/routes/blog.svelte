<script context="module">
  export const prerender = true;

  import { base } from '$app/paths';
  export async function load({ fetch }) {
    const posts = await fetch(`${base}/blog.json`).then((r) => r.json());
    return {
      props: { posts }
    };
  }
</script>

<script>
  export let posts;
</script>

<svelte:head>
  <title>ZuZu Travel | Блог про путешествия ✈️</title>
  <meta name="description" content="ZuZu Travel | Блог про путешествия" />
</svelte:head>

<div>
  <h1>ZuZu Travel Блог</h1>
  <p class="info">{posts.length} posts.</p>
  {#each posts as post}
    <a href={`${base}/blog/${post.slug}`}>
      <h2 class="title">{post.metadata.title}</h2>
    </a>
  {/each}
</div>
