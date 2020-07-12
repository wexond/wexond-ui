const { resolve } = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components')
  .default;

const dev = process.env.NODE_ENV === 'development';
const INCLUDE = resolve(__dirname, 'src');

const styledComponentsTransformer = createStyledComponentsTransformer({
  minify: !dev,
  displayName: true,
});

module.exports = {
  mode: dev ? 'development' : 'production',

  entry: './src/index.ts',
  devtool: 'source-map',

  output: {
    filename: 'index.js',
    path: __dirname + '/build',
    libraryTarget: 'umd',
    library: 'wexond-ui',
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
        include: INCLUDE,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: resolve(dev ? 'tsconfig.json' : 'tsconfig.prod.json'),
              transpileOnly: dev,
              getCustomTransformers: () => ({
                before: [styledComponentsTransformer],
              }),
            },
          },
        ],
      },
    ],
  },

  plugins: [new ForkTsCheckerWebpackPlugin()],

  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '~': INCLUDE,
    },
  },

  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    'styled-components': 'styled-components',
  },
};
