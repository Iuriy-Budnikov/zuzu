<script>
  export let description;
  export let title;
  export let date;
</script>

<svelte:head>
  <title>ZuZu Travel | {title}</title>
  <meta name="description" content={description} />
</svelte:head>

<h1>{title}</h1>
<p>{date}</p>
<slot />
