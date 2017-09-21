var path = require('path');

const webpack = require('webpack');

module.exports  = {
  entry: './src/client.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  watch: true,				// for webpack to recompile automatically when any file is changed
  module:{
    loaders: [
      {
        test:/\.js$/,
        exclude:/node_modules/,   // to prevent long compile time, exclude all js files inside node_modules
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-1']  //conversions of JSX to JS and ES6 JS version to browser compatible JS versions
        }
      }
    ]
  }
}