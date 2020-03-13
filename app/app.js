const express = require('express')
,path = require('path')
,config = require('../config')

module.exports = {
	app: () => {
		const app = express()

		const publicPath = express.static(path.join(__dirname, '../build'))
			,indexPath = path.join(__dirname, '../build/index.html')

		app.use(publicPath)
		app.get('/', (req,res) => {
			res.sendFile(indexPath)
		})

		app.use(config.apiLocalHost, require('./api'))

		return app
	}
}
