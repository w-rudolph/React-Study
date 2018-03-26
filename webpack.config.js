'use strict';

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    devtool: 'eval-source-map',

    entry: __dirname + '/src/entry.js',
    output: {
        path: __dirname + '/build',
        filename: 'bundle[hash].js'
    },

    module: {
        loaders: [
            { test: /\.js$/, loader: "jsx!babel", include: /src/},
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css!postcss")},
            { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css!postcss!sass")},
            { test: /\.(png|jpg)$/, loader: 'url?limit=8192'}
        ]
    },

    postcss: [
        require('autoprefixer')
    ],

    devServer: {
        port: 8888,
        colors: true,
        historyApiFallback: true,
        inline: true
    },

    plugins: [
        new ExtractTextPlugin('bundle.css'),
        new HtmlWebpackPlugin({
            template:'./index.html',
            filename: "index.html",
            inject: true
        }),
    ]

}
