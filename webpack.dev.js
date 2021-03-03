const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    module: {
        entry: './src/client/index.js',
        mode: 'production',
        output:{
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
            libraryTarget: 'var',
            library: 'Client',
        },
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env', 
                                    { 
                                     targets: "defaults" 
                                }
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                        MiniCssExtractPlugin.loader, 
                        "css-loader", 
                        "sass-loader"
                    ]
             },
             {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
              },
             {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
              },
              {
                test: /\.html$/i,
                loader: 'html-loader',
              },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin({ filename: "[name].css" }),
    ]
}