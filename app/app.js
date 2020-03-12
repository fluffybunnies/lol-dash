const express = require('express')
,path = require('path')

module.exports = {
	app: () => {
		const app = express()

		const publicPath = express.static(path.join(__dirname, '../build'))
			,indexPath = path.join(__dirname, '../build/index.html')

		app.use(publicPath)
		app.get('/', (req,res) => {
			res.sendFile(indexPath)
		})

		return app
	}
}
