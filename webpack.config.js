const path = require('path');
const  { CleanWebpackPlugin }  =  require ('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: { main: './src/pages/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        publicPath: '',
        clean: true
    },
    mode: 'development',
    devServer: {
        static: path.resolve(__dirname, 'dist'), 
        compress: true,
        port: 8080, 
        open: true,
        devMiddleware: {
            writeToDisk: true,
        } 
    },
    module: {
        rules: [
            {
              test: /\.css$/,
              use: [MiniCssExtractPlugin.loader, {
                loader: 'css-loader',
                options: {importLoaders: 1}
              },
              'postcss-loader'
            ]
            },
            {
              test: /\.(woff(2)?|eot|ttf|otf)$/,
              type: 'asset/resource',
              generator: {
                  filename: 'fonts/[name].[contenthash] [ext]',
              }
            },
            {
              test: /\.js$/,
              use: 'babel-loader',
              exclude: '/node_modules/'
            },
            {
              test: /\.(png|svg|jpg|gif)$/,
              type: 'asset/resource',
              generator: {
                  filename: 'images/[name].[contenthash] [ext]',
              }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin()
    ]
}