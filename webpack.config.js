const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry:'./index.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:"index-[hash].js",
        publicPath:'/',
        library:'vehicleselector-lib',
        libraryTarget:'umd'
    },
    module:{
        loaders:[
            { 
                test: /\.(js|jsx)$/,
                loader:'babel-loader',
                exclude:/node_modules/,
                query:{
                    presets:['es2015','react']
                }
            },
            {
                test:/\.(scss|css)$/,
                loader: 'style-loader!css-loader'
            },
            {
                test:/\.less$/,
                use:[
                    { loader:'style-loader'},
                    { loader:'css-loader'},
                    { loader:'less-loader'}
                ]
            },
            {
                test:/\.woff?$|\.woff2?$|\.svg?$|\.ttf?$|\.eot?$/,
                loaders:'url-loader'
          }
        ]
    },
    plugins:[
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV":JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'index.html',
            title:"个人前端组件库",
            inject:true
        }),
        new webpack.ProvidePlugin({
            "$":"jquery",
            "jQuery":"jquery",
            "window.jQuery":"jquery",
            "Popper":'popper.js',
        }),
        new CopyWebpackPlugin([
            {
                from:'./components/cj-select/style/cj-select.css',
                to:path.resolve(__dirname,'./dist/components/cj-select/style/cj-select.css'),
                toType:'file'
            },
            {
                from:'./components/cj-cascade/style/cj-cascade.css',
                to:path.resolve(__dirname,'./dist/components/cj-cascade/style/cj-cascade.css'),
                toType:'file'
            }
        ],{
            copyUnmodified:true
        })
    ]
}