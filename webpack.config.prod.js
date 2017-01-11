import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default { //exporting an object
  debug: true,
  devtool: 'source-map',//Recommended for production. Slower to build but the best for prod.
  noInfo: false, //Webpack will display all the files that is bundling
  entry: { //Entry point. Src Index in this instance. dirname will give full path. That comes from the path package which comes with node
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  target: 'web', //web for this. Could be node if its running that instead. Electron for desktop etc
  output: { //Where to create dev bundle. Doesnt generate physical files. Just pulls from memory. Bundle is called bundle.
    path: path.resolve(__dirname, 'dist'), //changed for prod. Means distribution
    publicPath: '/',
    filename: '[name].[chunkhash].js'//tells webpack the name we idenfitied in the entry point , vendor and main. add a hash then add a .js
  },
  plugins: [

    // Generate an external css file with a hash in the filename
    new ExtractTextPlugin('[name].[contenthash].css'),

    // Hash the files using MD5 so that their names change when the content changes.
    new WebpackMd5Hash(),

    // Use CommonsChunkPlugin to create a separate bundle
    // of vendor libraries so that they're cached separately.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor' //correspondes with the key we declared in the entry point above.
    }),

    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true,
      // Properties you define here are available in index.html
      // using htmlWebpackPlugin.options.varName
      trackJSToken: 'c6bd3af047314752a231459b8ae6d37b'
    }),
    //Elimate duplicate packages when generaitng bundle
    new webpack.optimize.DedupePlugin(),

    //Minify js
    new webpack.optimize.UglifyJsPlugin() //add import at top
  ],
  module: { //File types that will be handled. Handling javascript and CSS.
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
}