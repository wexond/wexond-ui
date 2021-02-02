const { resolve } = require('path');

const dev = process.env.DEV === '1';
const INCLUDE = resolve(__dirname, 'src');

module.exports = {
  mode: dev ? 'development' : 'production',

  entry: './src/index.ts',
  devtool: 'source-map',

  output: {
    filename: 'index.js',
    path: __dirname + '/build',
    libraryTarget: 'umd',
    library: '@wexond/react',
    globalObject: 'this',
  },

  module: {
    rules: [
      {
        test: /\.(png|gif|jpg|woff2|ttf|svg)$/,
        include: INCLUDE,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.tsx|ts$/,
        loader: 'babel-loader',
        include: INCLUDE,
      },
    ],
  },

  optimization: {
    usedExports: true,
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '~': INCLUDE,
    },
  },

  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
    'styled-components': 'styled-components',
  },
};
