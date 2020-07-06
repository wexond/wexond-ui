const { resolve } = require('path');

const INCLUDE = resolve('src');

module.exports = {
  stories: ['../stories/**/*.story.(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-knobs', '@storybook/addon-actions'],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.tsx|ts$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
          options: {
            transpileOnly: true,
          },
        },
        { loader: 'react-docgen-typescript-loader' },
      ],
    });

    config.resolve.modules.push('node_modules');
    config.resolve.extensions.push('.ts', '.tsx');
    config.resolve.alias['~'] = INCLUDE;

    return config;
  },
};
