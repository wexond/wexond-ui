module.exports = {
  stories: ['../stories/**/*.(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-knobs', '@storybook/addon-actions'],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.tsx|ts$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
        },
        {
          loader: 'react-docgen-typescript-loader',
        },
      ],
    });

    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};
