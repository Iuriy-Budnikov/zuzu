<script context="module">
  import { base } from '$app/paths';

  export async function load({ params, fetch }) {
    const slug = params.slug;
    const post = await fetch(`${base}/blog/${slug}.json`).then((r) => r.json());
    return {
      props: { post }
    };
  }
</script>

<script>
  export let post;
  let date = post.metadata.date.toUpperCase();
</script>

<svelte:head>
  <title>ZuZu Travel | {post.metadata.title}</title>
</svelte:head>

<h1>{post.metadata.title}</h1>
<p>{date}</p>
{@html post.content}
