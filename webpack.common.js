const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const d = new Date();
const yyyy = d.getFullYear();
const mm = String(d.getMonth() + 1).padStart(2, "0");
const dd = String(d.getDate()).padStart(2, "0");
const buildDate = `${yyyy}.${mm}.${dd}`;
process.env.BUILD_DATE = buildDate;

module.exports = {
    entry: [
        "./src/main.ts"
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'uploads/src'),
        clean: true,
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            { 
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            },
            { 
                test: /\.css$/, 
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.scss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ]
      },

    plugins: [
        new MiniCssExtractPlugin({
            filename:"bundle.css"
        }),
        new webpack.DefinePlugin({
            __BUILD_DATE__: JSON.stringify(process.env.BUILD_DATE)
        })

    ]
  };