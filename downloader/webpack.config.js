const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin(Object.keys(require('dotenv').config().parsed)),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
}
