const cssnanoConfig = {
  preset: [
    require('cssnano-preset-default'),
    {
      cssDeclarationSorter: false,
      minifyGradients: false,
      normalizeTimingFunctions: false,
      normalizeWhitespace: false,
      svgo: false,
      uniqueSelectors: false,
    },
  ],
};

module.exports = {
  plugins: [require('autoprefixer')(), require('cssnano')(cssnanoConfig)],
};
