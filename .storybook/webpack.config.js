const { getConfig } = require('../webpack.base');

module.exports = getConfig({
  module: {
    rules: [
      {
        test: /\.tsx|ts$/,
        use: [
          {
            loader: 'react-docgen-typescript-loader',
          },
        ],
      },
    ],
  },
});
