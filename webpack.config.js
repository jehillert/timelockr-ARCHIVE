const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const config = {
  entry: './client/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        include: /node_modules/,
        use: ['react-hot-loader/webpack'],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader/locals',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png',
            },
          },
        ],
      },
    ],
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  plugins: [
    new Dotenv({
      systemvars: true,
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new CopyWebpackPlugin([
      // relative path is from client
      { from: './static/favicon.ico' }, // <- your path to favicon
    ]),
  ],
  devServer: {
    contentBase: './dist',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    alias: {
      components: path.resolve(__dirname, 'client/indexes/components.jsx'),
      contexts: path.resolve(__dirname, 'client/indexes/contexts.jsx'),
      theme: path.resolve(__dirname, 'client/indexes/theme.jsx'),
      utilities: path.resolve(__dirname, 'client/indexes/utilities.jsx'),
    },
  },
};

module.exports = config;
/*
THIS IS FOR FAVICON
  const CopyWebpackPlugin = require('copy-webpack-plugin');

  new CopyWebpackPlugin([
    // relative path is from client
    { from: './static/favicon.ico' }, // <- your path to favicon
  ])

*/
