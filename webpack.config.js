const path = require('path')

const publicPath = path.join(__dirname, 'public');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: './src/app.js',
    output: {
        path: publicPath,
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
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]

            }]
    },
    devServer: {
        contentBase: publicPath,
        port: 3000,
        historyApiFallback: true // makes navigation work
    }
};