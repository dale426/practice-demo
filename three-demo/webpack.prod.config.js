const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

module.exports = {
    entry: {
        app: './demo/index.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].chunk.js'
    },
    devtool: '#source-map',
    plugins: [
        new cleanWebpackPlugin(['dist/*'], {
            root: path.resolve(__dirname, './')
        }),
        new webpack.DefinePlugin({
            'process.env': 'production'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'demo/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, './assets/'),
            to: 'assets',
            ignore: ['.*']
        }])

    ],
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('demo'), resolve('src')]
        }, ]
    }
}