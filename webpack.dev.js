const path = require('path');
// merge main webpack
const common = require('./webpack.common');
// package to merge webpacks files
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
	mode: 'development',
	output: {
		// bust cached with contentHash
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new HtmlWebpackPlugin({
			//build from html template and generate to dist
			template: './src/template.html'
		})
	],
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					'style-loader', //3. inject styles into DOM
					'css-loader', //2. turns css into common js
					'sass-loader' //1. turns sass into css
				]
			}
		]
	}
});
