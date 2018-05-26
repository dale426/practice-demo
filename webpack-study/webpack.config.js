const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // JavaScript 执行入口文件
    entry: './main.js',
    output: {
      // 把所有依赖的模块合并输出到一个 bundle.js 文件
      filename: 'bundle.js',
      // 输出文件都放到 dist 目录下
      path: path.resolve(__dirname, './dist'),
    },
    module: {
        rules: [
          {
            // 用正则去匹配要用该 loader 转换的 CSS 文件
            test: /\.css$/,
    // 注入到js中的方法
/*             
            // use: ['style-loader', 'css-loader?minimize'],
                use: [
                    'style-loader', 
                {
                    loader:'css-loader', // 先用css-loader解析，然后用style-loader
                    options:{
                        minimize:true, // 开启压缩
                    }
                }
              ] */
    // 提取出来为一个单独的方法
                use: ExtractTextPlugin.extract({
                    // 转换 .css 文件需要使用的 Loader
                    use: ['css-loader'],
                }),
          }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
          // 从 .js 文件中提取出来的 .css 文件的名称
          filename: `[name]_[contenthash:8].css`, // [contenthash:8] 代表根据文件内容算出的8位 hash 值， 

        }),
      ]
  };