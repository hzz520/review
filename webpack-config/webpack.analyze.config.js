const merge = require('webpack-merge');
const webpackProdConfig = require('./webpack.prod.config')
const {
    BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer')

module.exports = merge(webpackProdConfig, {
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerPort: 3000
        })
    ]
})