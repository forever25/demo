const path=require('path');
const HtmlWebPackPlugin=require('html-webpack-plugin');
const {CleanWebpackPlugin}=require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports={
    entry : './src/app.js',
    mode: 'development',
    output : {
        filename : 'main.js',
        path : path.resolve(__dirname,'dist')
    },
    module : {
        rules : [
            {
                test : /\.js$/,
                exclude : [
                    path.resolve(__dirname,'node_modules')
                ],
                loader : 'babel-loader'
            },
            {
                test : /\.css$/,
                use : [{
                    loader : MiniCssExtractPlugin.loader,
                    options : {
                        hmr : process.env.NODE_ENV==='development'
                    }
                },'css-loader']
            },
            {
                test : /\.(png|jpg|gif)$/,
                use : [
                    {
                        loader:'file-loader',
                        options: {
                            name : '[path][name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    devtool : 'eval-source-map',
    devServer : {
        contentBase: path.join(__dirname,"dist"),
        port : 9090,
        hot : true
    },
    plugins : [
        new HtmlWebPackPlugin({
            template : path.resolve(__dirname,'template/index.html'),
            filename : 'index.html',
            inject : true
        }),
        new MiniCssExtractPlugin({
            filename : '[name].css'
        })
    ]
}