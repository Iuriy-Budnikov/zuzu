<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { env } from '$env/dynamic/public';
  import { dev } from '$app/environment';
  import * as Sentry from '@sentry/svelte';
  import { BrowserTracing } from '@sentry/tracing';
  import GTM from '$lib/elements/GTM/GTM.svelte';
  import Header from '$lib/components/Header/Header.svelte';
  import Wrapper from '$lib/components/Wrapper/Wrapper.svelte';
  import '$lib/styles/global/index.scss';
  import '$lib/styles/global/scrollbar.scss';
  import '$lib/stores/effects';

  onMount(async () => {
    const smoothscroll = await import('smoothscroll-polyfill');
    smoothscroll.polyfill();

    if (!dev) {
      Sentry.init({
        environment: env.PUBLIC_SENTRY_ENVIRONMENT,
        dsn: env.PUBLIC_SENTRY_DSN,
        integrations: [new BrowserTracing(), new Sentry.Replay()],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,

        // This sets the sample rate to be 10%. You may want this to be 100% while
        // in development and sample at a lower rate in production
        replaysSessionSampleRate: 0.1,
        // If the entire session is not sampled, use the below sample rate to sample
        // sessions when an error occurs.
        replaysOnErrorSampleRate: 1.0
      });
    }
  });
</script>

<svelte:head>
  <meta property="og:site_name" content="zuzutravel.co" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={$page.url} />
</svelte:head>

<GTM gtmId="GTM-PZM27QT" timeout={2000} />
<Header />
<Wrapper>
  <slot />
</Wrapper>
