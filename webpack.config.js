const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './index.js',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      { 
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.scss$/,
        use: [{
              loader: "style-loader" // creates style nodes from JS strings
          }, {
              loader: "css-loader" // translates CSS into CommonJS
          }, {
              loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}