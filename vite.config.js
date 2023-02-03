import { sveltekit } from '@sveltejs/kit/vite';
import { sentryVitePlugin } from '@sentry/vite-plugin';

/** @type {import('vite').UserConfig} */
const config = {
  build: {
    sourcemap: true // Source map generation must be turned on
  },
  plugins: [sveltekit()]
};

if (
  process.env.SENTRY_ORG_NAME &&
  process.env.SENTRY_PROJECT_NAME &&
  process.env.SENTRY_AUTH_TOKEN
) {
  config.plugins.push(
    // Put the Sentry vite plugin after all other plugins
    sentryVitePlugin({
      org: process.env.SENTRY_ORG_NAME,
      project: process.env.SENTRY_PROJECT_NAME,

      // Specify the directory containing build artifacts
      include: './.svelte-kit',

      // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
      // and need `project:releases` and `org:read` scopes
      authToken: process.env.SENTRY_AUTH_TOKEN

      // Optionally uncomment the line below to override automatic release name detection
      // release: process.env.RELEASE,
    })
  );
}

export default config;
