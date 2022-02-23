const config = {
  extensions: ['.svelte.md', '.md', '.svx'],

  layout: {
    article: './src/routes/blog/article.svelte'
  },

  smartypants: {
    dashes: 'oldschool'
  },

  remarkPlugins: [],
  rehypePlugins: []
};

export default config;
