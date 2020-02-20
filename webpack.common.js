const path = require('path');
module.exports = {
	entry: {
		// [name] source
		main: './src/index.js',
		vendor: './src/vendor.js'
	},
	module: {
		rules: [
			{
				test: /\.html$/i,
				use: [ 'html-loader' ]
			},
			{
				test: /\.(svg|png|jpe?g|gif)$/i,
				use: {
					loader: 'file-loader',
					options: {
						// loads the file to our dist
						name: '[name].[hash].[ext]',
						outputPath: 'imgs',
						esModule: false
					}
				}
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env' ]
					}
				}
			}
		]
	}
};
