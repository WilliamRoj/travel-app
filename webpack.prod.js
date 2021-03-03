const path = require('path')
const webpack = require('webpack')

module.exports = {
    module: {
        rules: [
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
            loader: 'babel-loader',
            options: {
                presets: [
                ['@babel/preset-env', { targets: "defaults" }]
                ]
            }
            }
        }
        ]
    }
}