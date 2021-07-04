const dev = process.env.NODE_ENV === 'development';

const getStyledComponentsPlugin = () => {
  return [
    'babel-plugin-styled-components',
    dev
      ? {
          displayName: true,
        }
      : {
          minify: true,
          transpileTemplateLiterals: true,
          pure: true,
          displayName: false,
        },
  ];
};

const presets = [
  [
    '@babel/preset-env',
    {
      modules: false,
    },
  ],
  '@babel/preset-typescript',
  '@babel/preset-react',
];

const plugins = [
  getStyledComponentsPlugin(),
  '@babel/plugin-transform-runtime',
  ['@babel/plugin-proposal-decorators', { legacy: true }],
  ['@babel/plugin-proposal-class-properties', { loose: false }],
];

module.exports = { presets, plugins };
