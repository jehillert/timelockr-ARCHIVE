const path = require('path');
const webpack = require('webpack');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: './client/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx?$/, include: /node_modules/, use: ['react-hot-loader/webpack'] },
      { test: /\.css$/, use: ['style-loader', 'css-loader/locals'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.png$/, use: [{ loader: 'url-loader', options: { mimetype: 'image/png' } }] },
    ],
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  plugins: [
    new Dotenv({ systemvars: true }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    // new CopyWebpackPlugin([{ from: './static/favicon.ico' }]),
  ],
  devServer: { contentBase: './dist' },
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

/*
CopyWebpackPlugin code was added to render favicon in Chrome (note: relative path is from client)
However, it does not seem to be needed if the file is stored in dist folder.
It does not appear that the line "publicPath: '/'," is necessary for sucessful rendering.
*/
