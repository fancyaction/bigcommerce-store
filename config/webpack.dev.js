import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import webpack from 'webpack';




module.exports = {
    entry: './app/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
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
    mode: process.env.NODE_ENV || 'development',
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    plugins: [
        new Dotenv({
            path: './.env'
        }),
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: JSON.stringify('development')
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