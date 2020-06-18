const { resolve } = require('path');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components')
  .default;

const dev = false;
const INCLUDE = resolve(__dirname, 'src');

const styledComponentsTransformer = createStyledComponentsTransformer({
  minify: !dev,
  displayName: dev,
});

module.exports = {
  mode: dev ? 'development' : 'production',

  entry: './src/index.ts',

  output: {
    filename: 'index.js',
    path: __dirname + '/build',
    libraryTarget: 'commonjs',
  },

  devtool: 'source-map',

  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.json'],
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
        use: [
          {
            loader: 'ts-loader',
            options: {
              getCustomTransformers: () => ({
                before: [styledComponentsTransformer],
              }),
            },
          },
        ],

        include: INCLUDE,
      },
    ],
  },

  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    'styled-components': 'styled-components',
  },
};
