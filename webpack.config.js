const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // extracts css to a separate file

const publicPath = path.join(__dirname, 'public');

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
    ],
    devServer: {
      contentBase: publicPath,
      port: 3000,
      historyApiFallback: true, // makes navigation work
      publicPath: '/dist/'
    }
  };
};