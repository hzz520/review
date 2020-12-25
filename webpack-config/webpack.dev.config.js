const path = require('path');
const merge = require('webpack-merge');

const webpackBaseConfig = require('./webpack.base.config');
const BASE = require('../.base.js') || 'root'

let webpackDevConfig = {
    mode: "development",
    devtool: 'inline-source-map',
    devServer: {
        open: true,
        openPage: BASE,
        contentBase: path.resolve(__dirname, `../build`),
        compress: true,
        hot: true,
        host: '0.0.0.0',
        proxy: {
            '/govern/insurance': {
                target: 'https://housecontact.58.com',
                changeOrigin: true,
                secure: true
            }
        },
        useLocalIp: true,
        disableHostCheck: true,
        historyApiFallback: {
            rewrites: [
                {
                    from: new RegExp(`^/${BASE}([a-zA-Z0-9\/]{1,})`, 'g'),
                    to: `/${BASE}/index.html`
                }
            ]
        },
        port: 8089
    },
    module: {
        rules: [
        ]
    },
    plugins: []
};

module.exports = merge(webpackBaseConfig, webpackDevConfig);