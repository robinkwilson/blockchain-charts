var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: ['babel-polyfill', './src/app.js'],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  context: __dirname,
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ]
  },
}