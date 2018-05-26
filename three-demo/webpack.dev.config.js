const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { WebPlugin } = require('web-webpack-plugin');
function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

module.exports = {
    entry: {
        app: './demo/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'demo'),
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    devtool: '#source-map',
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        disableHostCheck: true,
        stats: { colors: true },
        port: '8080',
        proxy: {
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': 'dev'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        new WebPlugin({
            template: './demo/index.html', // HTML 模版文件所在的文件路径
            filename: 'index.html' // 输出的 HTML 的文件名称
          }),

    ],
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('demo'), resolve('src')]
        }, ]
    }
}