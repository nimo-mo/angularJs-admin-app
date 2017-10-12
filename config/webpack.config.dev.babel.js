import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import path from 'path';

// your project root path
const appPath = path.resolve(__dirname, '..')

// your project src path
const srcPath = path.resolve(__dirname, '..', 'src')


export default {
  resolve: {
    extensions: ['*', '.js', '.json']
  },
  devtool: 'eval-source-map', // more info:https://webpack.js.org/guides/development/#using-source-maps and https://webpack.js.org/configuration/devtool/
  devServer: {
    contentBase: 'dist',
    host: '0.0.0.0',
    port: 9000,
    hot: true,
    open: true
  },
  entry: {
    app: path.resolve(srcPath, 'index.js'),
    vendors: [
      'babel-polyfill',
      'moment',
      'jquery',
      'angular',
      'angular-timer',
      'angular-animate',
      'angular-sanitize',
      'angular-bootstrap',
      'angular-bootstrap-confirm',
      'angular-ui-router',
      'angularjs-toaster',
      'humanize-duration',
      'ng-file-upload'
    ]
  },
  // entry: [
  //   // must be first entry to properly set public path
  //   // 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000&reload=true',
  //   path.resolve(srcPath, 'index.js') // Defining path seems necessary for this to work consistently on Windows machines.
  // ],
  target: 'web',
  output: {
    path: path.resolve(appPath, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
      __DEV__: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({     // Create HTML file that includes references to bundled CSS and JS.
      template: path.resolve(srcPath, 'index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      inject: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      noInfo: true, // set to false to see a list of every file being bundled.
      options: {
        sassLoader: {
          includePaths: [path.resolve(srcPath, 'styles')]
        },
        context: '/',
        // postcss: () => [autoprefixer],
      }
    })
  ],
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
      {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader'},
      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
      {test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'},
      {test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=[name].[ext]'},
      {test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'},
      // {test: /(\.css|\.scss|\.sass)$/, loaders: ['style-loader', 'css-loader?sourceMap', 'postcss-loader', 'sass-loader?sourceMap']}
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [{
          loader: 'style-loader',
          options: { sourceMap: true }
        },{
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            plugins: (loader) => [
              require('postcss-smart-import'),
              require('autoprefixer'),
            ]
          }
        }, {
          loader: 'sass-loader',
          options: { sourceMap: true }
        }]
      }
    ]
  }
};
