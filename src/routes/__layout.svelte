<script>
  import { onMount } from 'svelte';
  import GTM from '$lib/elements/GTM/GTM.svelte';
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

<GTM gtmId="GTM-PZM27QT" timeout={2000} />
<Header />
<Wrapper>
  <slot />
</Wrapper>
<Footer />
