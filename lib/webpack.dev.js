const merge = require('webpack-merge');

const path = require('path');
const webpack = require('webpack');

const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'development',
  devtool: 'cheap-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    stats: 'errors-only',
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
};

module.exports = merge(baseConfig, devConfig);
