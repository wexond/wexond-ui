const { resolve } = require('path');
const merge = require('webpack-merge');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components')
  .default;

const dev = process.env.NODE_ENV === 'development';
const INCLUDE = resolve(__dirname, 'src');

const styledComponentsTransformer = createStyledComponentsTransformer({
  minify: true,
  displayName: false,
});

const config = {
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
              getCustomTransformers: () => ({
                before: [styledComponentsTransformer],
              }),
            },
          },
        ],
      },
    ],
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '~': INCLUDE,
    },
  },
};

const getConfig = (...cfg) => {
  return merge(config, ...cfg);
};

module.exports = { getConfig, dev };
