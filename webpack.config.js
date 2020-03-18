const path = require('path')
,HtmlWebpackPlugin = require('html-webpack-plugin')
,config = require('./config')


module.exports = {
	mode: 'development',
	entry: ['@babel/polyfill', './app/index.js'],
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				include: path.join(__dirname, 'app'),
				exclude: /node_modules/,
				options: {
					presets: ['@babel/preset-env', '@babel/react']
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				loader: 'file-loader',
				options: {
					outputPath: 'img',
				},
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: config.siteDisplayName
		})
	]
}
