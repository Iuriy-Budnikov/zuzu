import adapter from '@sveltejs/adapter-cloudflare';
import { mdsvex } from 'mdsvex';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import preprocess from 'svelte-preprocess';
import mdsvexConfig from './mdsvex.config.js';

const filePath = dirname(fileURLToPath(import.meta.url));
const sassPath = `${filePath}/src/lib/styles/`;

const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [
    mdsvex(mdsvexConfig),
    preprocess({
      postcss: true,
      scss: {
        prependData: `
				@import '${sassPath}mixins/index.scss';
				@import '${sassPath}variables/index.scss';
			`
      }
    })
  ],
  kit: {
    adapter: adapter(),
    alias: {
      $utils: 'src/utils',
      $queries: 'src/queries'
    }
  }
};

export default config;
