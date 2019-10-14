const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './assets/theme-vars.less'), 'utf8'));
module.exports = {
    mode: 'development',
    entry: {
        app: path.join(__dirname, 'src/index.tsx')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                exclude: /node_modules/,
                test: /\.tsx$/,
                options: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react",
                        "@babel/typescript"
                    ],
                    plugins: [
                        ['import', { libraryName: "antd", style: true }],
                        "@babel/proposal-class-properties",
			            "@babel/proposal-object-rest-spread"
                    ]
                },
            },
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    {
                        loader: "less-loader",
                        options: {
                            modifyVars: themeVariables,
                            javascriptEnabled: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'React Template',
            hash: true,
            template: path.join(__dirname, 'public/index.html')
        }),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '@app': __dirname
        }
    },
    devtool: 'source-map',
    devServer: {
        open: true,
        historyApiFallback: true
    },
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: 'all',
        }
    }
}