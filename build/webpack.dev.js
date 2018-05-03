const path = require('path');
const merge = require('webpack-merge');
// 引入通用webpack配置文件
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

process.env.NODE_ENV = 'development'; 

module.exports = merge(common, {
    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'ts-loader'
        }]
    },
    // 使用 source-map
    devtool: 'source-map',
    // 对 webpack-dev-server 进行配置
    devServer: {
        contentBase: '../dist',
        // 设置localhost端口
        port: 9000
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html', 
            template: path.join(__dirname, '../index.html'), 
            inject: true
        })
    ],
    // 设置出口文件地址与文件名
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.min.js'
    },
    mode: process.env.NODE_ENV
});
