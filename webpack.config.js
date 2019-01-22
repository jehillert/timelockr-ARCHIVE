var webpack = require('webpack');
var path = require('path');

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
      }
    ]
  },
  externals: {
    'react/addons': true, // important!!
    'react/lib/ReactContext': true,
    'react/lib/ExecutionEnvironment': true
  },
   node: {
       fs: "empty"
   },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
// 'node' key addresses a problem with dotenv
// 'resolve' key makes it so import modules do not have to specify file extension
// 'node: {fs: "empty"}' included to resolve 'Uncaught Error: Cannot find module "fs"',
//      which necessitated adding "babel-preset-stage-0": "^6.24.1" to package (possibly)