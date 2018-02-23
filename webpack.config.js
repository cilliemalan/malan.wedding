const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const webpack = require('webpack');
const config = require('./config');

const dist = path.resolve(__dirname, 'public');
const now = new Date().toISOString().replace(/[:.ZT-]/g,'');

const plugins = [
    new HtmlWebpackPlugin({ template: 'app/index.ejs', gaTrackingId: config.gaTrackingId }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
        environment: JSON.stringify(config.environment),
        recaptchaKey: JSON.stringify(config.recaptchaKey),
        clientId: JSON.stringify(config.clientId)
    })
];

const app = [
    './app/index.js'
];

const babelPlugins = [];

if (config.production) {
    console.log('running production webpack build');
    plugins.push(new MinifyPlugin());
} else {
    console.log('running development webpack build');
    plugins.push(new webpack.HotModuleReplacementPlugin());

    app.splice(0, 0, 'react-hot-loader/patch');
    app.push('webpack-hot-middleware/client');
    babelPlugins.push('react-hot-loader/babel');
}

module.exports = {
    entry: {
        app: app
    },
    resolve: { extensions: ['.js', '.jsx'] },
    plugins: plugins,
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
                        plugins: babelPlugins
                    }
                }
            }
        ]
    },
    output: {
        publicPath: '/',
        filename: config.production ? `bundle-${now}.js` : 'bundle-dev.js',
        path: path.resolve(__dirname, dist)
    }
};