<script context="module">
  export const prerender = true;
</script>

<script>
  const title = 'ZuZu Travel | Горящие туры и путевки ⛱️ туризм, отдых и путешествия';
  const description =
    'Горящие туры ❤️ от всех туроператоров Украины на одном сайте. ✈️️ Сравнение цен, фотографии отелей, онлайн-мониторинг горящих путевок.';
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
</svelte:head>
