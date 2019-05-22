const path = require('path');
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // extracts css to a separate file

const publicPath = path.join(__dirname, 'public');

process.env.NODE_ENV = process.env.NODE_ENV || 'development' // test in test mode (as script) production for heroku(it sets it up) and development when undefined (on dev-server script)

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({path: '.env.test'}); // dotenv sets all env variables on the file here
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.development' });
}

module.exports = (env) => {
  const isProduction = env === 'production';
  const CSSExtract = new MiniCssExtractPlugin({ filename: 'styles.css' });

  return {
    mode: 'development',
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    entry: './src/app.js',
    output: {
      path: path.join(publicPath, 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        },
        {
          test: /\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        }]
    },
    plugins: [
      CSSExtract,
      new webpack.DefinePlugin({
        //firebase requires strings as app config values
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY), 
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
        'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID)
      })
    ],
    devServer: {
      contentBase: publicPath,
      port: 3000,
      historyApiFallback: true, // makes navigation work
      publicPath: '/dist/'
    }
  };
};