const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const webpack = require('webpack');
const config = require('./config');

const dist = path.resolve(__dirname, 'public');
const now = new Date().toISOString().replace(/[:.ZT-]/g,'');

module.exports = {
    entry: {
        app: [
            'react-hot-loader/patch',
            './app/index.js',
            'webpack-hot-middleware/client'
        ]
    },
    resolve: { extensions: ['.js', '.jsx'] },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.ejs'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new MinifyPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(scss|sass)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                        plugins: ['react-hot-loader/babel']
                    }
                }
            }
        ]
    },
    output: {
        publicPath: '/',
        filename: `bundle-${now}.js`,
        path: path.resolve(__dirname, dist)
    }
};