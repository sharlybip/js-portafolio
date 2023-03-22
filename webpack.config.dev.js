const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ProgressPlugin  = require('progress-webpack-plugin');


const ruleForJs = {
    test: /\.m?js/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader'
    }
}

const ruleForCss = {
    test:/\.css|.styl$/i,
    use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'stylus-loader'
    ]
}
const ruleForPng= {
    test:/\.png/,
    type: 'asset/resource'
}
const ruleForFonts = {
    test: /\.(woff|woff2)$/,
    use: {
        loader: 'url-loader',
        options: {
            limit: 10000,
            mimetype: "application/font=woff",
            name: "[name].[contenthash].[ext]",
            outputPath: './assets/fonts/',
            publicPath: './fonts/',
            esModule: false
            
        }
    }
}


const rules = [ruleForJs, ruleForCss, ruleForPng, ruleForFonts]

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename : '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: 'development',
    watch: true,
    resolve: {
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
        }
    },
    module: { rules  },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: './assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv(),
        new ProgressPlugin(),
    ],
}