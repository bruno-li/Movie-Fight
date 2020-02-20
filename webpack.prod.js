const path = require('path');
// merge main webpack
const common = require('./webpack.common');
// package to merge webpacks files
const merge = require('webpack-merge');
//A webpack plugin to remove/clean your build folder(s).
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// plugin extracts CSS into separate files
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// A Webpack plugin to optimize \ minimize CSS assets.
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// minify JS
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',
	output: {
		// bust cached with contentHash
		filename: '[name].[contentHash].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	// minify files
	optimization: {
		minimizer: [
			new OptimizeCssAssetsPlugin(),
			new TerserPlugin(),
			new HtmlWebpackPlugin({
				//build from html template and generate to dist
				template: './src/template.html',
				minify: {
					removeAttributeQuotes: true,
					collapseWhitespace: true,
					removeComments: true
				}
			})
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].[contentHash].css'
		})
	],
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader, //3. extract css into files
					'css-loader', //2. turns css into common js
					'sass-loader' //1. turns sass into css
				]
			}
		]
	}
});
