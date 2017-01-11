import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default { //exporting an object
  debug: true,
  devtool: 'inline-source-map',//Used for debugging (transpiled and bundled back to the original)
  noInfo: false, //Webpack will display all the files that is bundling
  entry: [ //Entry point. Src Index in this instance. dirname will give full path. That comes from the path package which comes with node
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web', //web for this. Could be node if its running that instead. Electron for desktop etc
  output: { //Where to create dev bundle. Doesnt generate physical files. Just pulls from memory. Bundle is called bundle.
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
        // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true //Webpack to inject any necessary tags for me
    })

  ], //options to add plugins. Catching errors etc. For now nothing.
  module: { //File types that will be handled. Handling javascript and CSS.
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style','css']}
    ]
  }
}