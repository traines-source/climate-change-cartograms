const path = require('path');
const LicensePlugin = require('webpack-license-plugin')

module.exports = {
  mode: 'production',
  entry: './src/main.ts',
  devtool: 'source-map',
  target: ['web', 'es5'],
  module: {
    rules: [
      {
        test:  /\.tsx?$/,
        use: [
          {loader: 'ts-loader', options: {onlyCompileBundledFiles: true}}
        ],
        include: /src/,
      },
    ],
  },
  resolve: {
    extensions: [ '.ts', '.ts', '.js' ],
  },
  output: {
    filename: 'climate-change-cartograms.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new LicensePlugin()
  ],
};