import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from "extract-text-webpack-plugin";

const htmlWebpack = (DEBUG) => {
  return { template: path.resolve(__dirname, 'app', 'src', 'index.html'), filename: (DEBUG? "index.html" : "index.html") }
}

export default (DEBUG, PATH, PORT=3000) => ({

  entry: {
    app: (DEBUG ? [
      `webpack-dev-server/client?http://localhost:${PORT}`,
    ] : []).concat([
      'babel-polyfill',
      './app/src/js/index',
      './app/src/style.scss'
    ]),

    common: [
      'bootstrap',
      'lodash',
      'react'
    ]
  },

  output: {
    path: path.resolve(__dirname, PATH),
    filename: DEBUG ? "main.js" : "main-[hash].js",
    publicPath: DEBUG ? '' : '/assets/'
  },

  //Load external jQuery
  externals: {
    jquery: "jQuery"
  },

  cache: DEBUG,
  debug: DEBUG,

  // For options, see http://webpack.github.io/docs/configuration.html#devtool
  devtool: DEBUG && "#inline-source-map",

  module: {
    loaders: [
      // Load ES6
      {
        test: /\.js?$/,
        include: [
          path.resolve(__dirname, "app", "src", "js"),
        ],
        exclude: [
          path.resolve(__dirname, "app", "src", "js", "specs"),
        ],
        loader: "babel-loader",
        query: {
          presets: ['es2015', 'react']
        }
      },

      // Load styles
      {
        test: /\.(scss|css)/,
        loader: ExtractTextPlugin.extract("style-loader", DEBUG ?
          "css-loader?sourceMap!postcss-loader!sass-loader?sourceMap" :
          "css-loader!postcss-loader!sass-loader" )
      },

      // Load images
      { test: /\.(png|jpg|gif)$/, loader: 'file-loader?name=images/[name].[ext]' },
      // Load fonts
      { test: /\.(svg|eot|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=fonts/[name].[ext]" }
    ]
  },

  plugins: DEBUG
    ? [
      new ExtractTextPlugin("style.css", {allChunks: true}),
      new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"common", /* filename= */"common.js"),
      new HtmlWebpackPlugin(htmlWebpack(DEBUG)),
      new webpack.ProvidePlugin({
        '$': 'jquery',
        'jQuery': 'jquery'
      })
    ] : [
      new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
      new ExtractTextPlugin("style.css", {allChunks: false}),
      new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"common", /* filename= */"common-[hash].js"),
      new HtmlWebpackPlugin(htmlWebpack(DEBUG)),
      new webpack.ProvidePlugin({
        '$': 'jquery',
        'jQuery': 'jquery'
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {screw_ie8: true, keep_fnames: true, warnings: false},
        mangle: {screw_ie8: true, keep_fnames: true}
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],

  resolveLoader: {
    root: path.join(__dirname, "node_modules"),
  },

  resolve: {
    root: path.join(__dirname, "node_modules"),

    modulesDirectories: ['node_modules', path.join(__dirname, "src", "assets")],

    // alias: {
    //   environment: DEBUG
    //     ? path.resolve(__dirname, 'config', 'environments', 'development.js')
    //     : path.resolve(__dirname, 'config', 'environments', 'production.js')
    // },

    // Allow to omit extensions when requiring these files
    extensions: ["", ".js", ".jsx"],
  }
});
