const config = {
  extensions: ['.svelte.md', '.md', '.svx'],

  layout: {
    article: './src/routes/article/layout.svelte'
  },

  smartypants: {
    dashes: 'oldschool'
  },

  remarkPlugins: [],
  rehypePlugins: []
};

export default config;
