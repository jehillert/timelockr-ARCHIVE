const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const config = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png'
            }
          }
        ]
      }
    ]
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
  ],
  plugins: [
    new CopyWebpackPlugin([
      // relative path is from src
      { from: './static/favicon.ico' }, // <- your path to favicon
    ])
  ],
  devServer: {
    contentBase: './dist'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    alias: {
      'Components': path.resolve(__dirname, 'src/components/index.jsx')
    },
  },
}

module.exports = config;
/*
THIS IS FOR FAVICON
  const CopyWebpackPlugin = require('copy-webpack-plugin');

  new CopyWebpackPlugin([
    // relative path is from src
    { from: './static/favicon.ico' }, // <- your path to favicon
  ])

*/