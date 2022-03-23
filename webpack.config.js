const path = require('path');
const LicensePlugin = require('webpack-license-plugin')

module.exports = {
  mode: 'production',
  entry: './src/main.ts',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test:  /\.tsx?$/,
        use: [
          {loader: 'expose-loader', options: { exposes: [{globalName: 'CCC', override: true}]}},
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