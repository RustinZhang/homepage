const path = require('path');
const webpack = require('webpack');


const config = {
  entry: {
    index:'./staging/scripts/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist/scripts'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test   : /\.js$/,
        exclude: /node_modules/,
        loader : "babel-loader",
      },
      
    ]
  },
    plugins:[
        new webpack.optimize.UglifyJsPlugin()
    ]

};

module.exports = config;
