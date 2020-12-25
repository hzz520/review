const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config');
// const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const rimraf = require('rimraf')
const path = require('path')
const ChunkshashExcludePlugin = require('./plugin/excludeHash')

rimraf.sync(path.resolve(__dirname, '../build'))
rimraf.sync(path.resolve(__dirname, '../lib'))

module.exports = merge(webpackBaseConfig, {
    mode: 'production',
    module: {
        rules: [
        ]
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new ChunkshashExcludePlugin({
            excludeJs: [`manifest`, `vendor`, `index`],
            excludeCss: [`index`],
            publicCssPath: '//c.58cdn.com.cn/frs/fangfe/zfang-lipei/1.0/'
        })
    ]
});