<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import GTM from '$lib/elements/GTM/GTM.svelte';
  import Header from '$lib/components/Header/Header.svelte';
  import Wrapper from '$lib/components/Wrapper/Wrapper.svelte';
  import '$lib/styles/global/index.scss';
  import '$lib/styles/global/tiny-slider.scss';

  onMount(async () => {
    const smoothscroll = await import('smoothscroll-polyfill');
    smoothscroll.polyfill();
  });
</script>

<svelte:head>
  <meta property="og:site_name" content="zuzutravel.co" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="{$page.url}" />
</svelte:head>

<GTM gtmId="GTM-PZM27QT" timeout={2000} />
<Header />
<Wrapper>
  <slot />
</Wrapper>
