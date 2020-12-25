const path = require('path');
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devMode = process.env.NODE_ENV === 'development';
const BASE = require('../.base.js') || 'roots'


let isConsole = !!process.env.V_CONSOLE

module.exports = {
    entry: {
        index: path.resolve(__dirname, '../src/index.ts')
    },
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: devMode ? `${BASE}/js/[name].js` : `${BASE}/js/[name].[chunkhash].js`,
        publicPath: '/'
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json', '.css'],
        alias: {
            '@': path.resolve(__dirname, '../src')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, '../node_modules'),
                loader: 'babel-loader'
            },
            {
                test: /((?!\.d\.).)+tsx?$/,
                exclude: /node_modules|\.d\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'medias/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[contenthash:7].[ext]'
                }
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'image-handler-loader',
                options: {
                    threshold: 2 * 1024,
                    publicPath: '/',
                    name: 'govern/lipei/imgs/[name].[ext]'
                }
            },
            {
                test: /\.svg$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'imgs/[name].[hash:7].[ext]',
                }
            },
            {
                test: /\.(less|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: devMode,
                            publicPath: ''
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            }
        ]
    },
    optimization: {
        namedChunks: true,
        moduleIds: 'hashed',
        minimizer: [
            new TerserJSPlugin({
                extractComments: true,
                terserOptions: {
                    compress: {
                        drop_console: !isConsole,
                        drop_debugger: !isConsole
                    },
                    output: {
                        beautify: false
                    }
                }
            })
        ],
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
              default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
              },
              vendors: {
                name: 'vendor',
                chunks: 'all',
                test: /[\\/]node_modules[\\/]/,
                priority: -10
              }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: `${BASE}/index.html`,
            inject: true,
            template: path.resolve(__dirname, '../src/index.html')
        }),
        new webpack.DefinePlugin({
            'process.env.BASE': JSON.stringify(BASE),
            'process.env.V_CONSOLE': JSON.stringify(process.env.V_CONSOLE)
        }),
        new MiniCssExtractPlugin({
            filename: `${BASE}/css/[name].[contenthash].css`,
            ignoreOrder: false
        }),
        new VueLoaderPlugin(),
          new OptimizeCSSAssetsPlugin({})
    ]
};