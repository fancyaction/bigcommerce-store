const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');




module.exports = {
    entry: './app/index.js',
    mode: 'production',
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            { test: /\.(js)$/, use: 'babel-loader' },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                loaders: ['file-loader']
            }
        ]
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.ico'
        }),
        new webpack.DefinePlugin({
            'process.env': {
              ACCESS_TOKEN: JSON.stringify(process.env.ACCESS_TOKEN),
              CLIENT_ID: JSON.stringify(process.env.CLIENT_ID),
              CLIENT_SECRET: JSON.stringify(process.env.CLIENT_SECRET),
              NAME: JSON.stringify(process.env.NAME),
              API_PATH: JSON.stringify(process.env.API_PATH),
              NODE_ENV: JSON.stringify('production')
            }
          }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        hot: true,
        historyApiFallback: true,
        port: 8080,
        open: true,
        proxy: {
            '/xhr': 'http://localhost:9999'
        }
    }
};