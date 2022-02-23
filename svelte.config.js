import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import preprocess from 'svelte-preprocess';
import mdsvexConfig from './mdsvex.config.js';

const dev = process.env.NODE_ENV === 'development';
const filePath = dirname(fileURLToPath(import.meta.url));
const sassPath = `${filePath}/src/lib/styles/`;

const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [
    mdsvex(mdsvexConfig),
    preprocess({
      scss: {
        prependData: `
				@import '${sassPath}mixins/index.scss';
				@import '${sassPath}variables/index.scss';
			`
      }
    })
  ],
  kit: {
    paths: {
      base: ''
    },
    adapter: adapter({
      fallback: '200.html'
    })
  }
};

export default config;
