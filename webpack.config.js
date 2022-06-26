const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: './src/scripts/main.js',
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'bundle.min.js'
    },

    plugins: [
      new CssMinimizerPlugin(),
      new MiniCssExtractPlugin({filename: 'main.min.css'}),
    ],
  
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader'
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [[
                            '@babel/preset-env',
                            {
                                targets: { edge: '80', firefox: '74', chrome: '80', safari: '13', ie: '11'},
                                useBuiltIns: 'usage',
                                corejs: '3.22.8'
                            }
                        ]]
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: './img/logo-market-inventory-system.jpg',
                      },
                  },
                ],
              },
        ]
    },
      devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
      },
      optimization : {
        minimize: true
      }
};
