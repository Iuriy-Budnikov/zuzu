<script>
  import { onMount } from 'svelte';
  import { GoogleAnalytics } from '@beyonk/svelte-google-analytics';
  import Header from '$lib/components/Header/Header.svelte';
  import Footer from '$lib/components/Footer/Footer.svelte';
  import Wrapper from '$lib/components/Wrapper/Wrapper.svelte';
  import '$lib/styles/global/index.scss';
  import '$lib/styles/global/tiny-slider.scss';

  onMount(async () => {
    const smoothscroll = await import('smoothscroll-polyfill');
    smoothscroll.polyfill();
  });
</script>

<GoogleAnalytics properties={['UA-217877643-1']} />

<Header />
<Wrapper>
  <slot />
</Wrapper>
<Footer />
