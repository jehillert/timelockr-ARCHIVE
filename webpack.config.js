const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  entry: {
    './dist/app': path.resolve(__dirname, 'src/index.jsx')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './')
  },

  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react', 'stage-0']
        }
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ]
  },
  externals: {
    'react/addons': true, // important!!
    'react/lib/ReactContext': true,
    'react/lib/ExecutionEnvironment': true
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
// { test: /\.json$/, loader: 'json-loader' },
// 'node' key addresses a problem with dotenv
// 'resolve' key makes it so import modules do not have to specify file extension
// 'node: {fs: "empty"}' included to resolve 'Uncaught Error: Cannot find module "fs"',
//      which necessitated adding "babel-preset-stage-0": "^6.24.1" to package (possibly)
// "node: { console: true, fs: 'empty', net: 'empty', tls: 'empty' }, " added to enable import of 'request' module