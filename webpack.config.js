const { getConfig, dev } = require('./webpack.base');

module.exports = getConfig({
  mode: dev ? 'development' : 'production',

  entry: './src/index.ts',

  output: {
    filename: 'index.js',
    path: __dirname + '/build',
    libraryTarget: 'umd',
    library: 'wexond-ui',
  },

  devtool: 'source-map',

  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    'styled-components': 'styled-components',
  },
});
