import { sveltekit } from '@sveltejs/kit/vite';

console.log('process.env.SENTRY_AUTH_TOKEN', import.meta.env);

/** @type {import('vite').UserConfig} */
const config = {
  build: {
    sourcemap: true // Source map generation must be turned on
  },
  plugins: [
    sveltekit(),
    // Put the Sentry vite plugin after all other plugins
    // sentryVitePlugin({
    //   org: 'example-org',
    //   project: 'example-project',

    //   // Specify the directory containing build artifacts
    //   include: './dist',

    //   // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
    //   // and need `project:releases` and `org:read` scopes
    //   authToken: process.env.SENTRY_AUTH_TOKEN

    //   // Optionally uncomment the line below to override automatic release name detection
    //   // release: process.env.RELEASE,
    // })
  ]
};

export default config;
