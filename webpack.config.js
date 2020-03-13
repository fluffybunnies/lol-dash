const path = require('path')
,HtmlWebpackPlugin = require('html-webpack-plugin')
,config = require('./config')


module.exports = {
	mode: 'production',
	entry: './app/index.js',
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
      }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: config.siteDisplayName
		})
	]
}
