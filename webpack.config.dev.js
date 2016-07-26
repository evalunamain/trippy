var path = require('path');
var webpack = require('webpack');
let enVars = require('./enVars');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/trippy'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

  ],
  module: {
    loaders: [
    // js
    {
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'client')
    },
    {
      test: /\.js$/,
      loader: 'string-replace',
      query: {
        multiple: [
          {search: 'MAPS_KEY', replace: "'"+enVars.MAPS_KEY+"';"}
        ]
      }
    },
    // CSS
    { 
      test: /\.scss$/, 
      include: path.join(__dirname, 'client'),
      loader: 'style-loader!css-loader!sass-loader'
    }
    ]
  }
};
