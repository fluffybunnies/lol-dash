const express = require('express')
,path = require('path')
,fs = require('fs')
,config = require('../config')

let riotOwnershipKey = ''
fs.readFile(path.join(__dirname, '../riot.txt'), (err, file) => {
	if (err) {
		return console.error('error reading riot.txt', err)
	}
	riotOwnershipKey = file.toString()
})

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

		app.use('/riot.txt', (req, res) => {
			res.writeHead(200, { 'content-type': 'text/plain' })
			res.end(riotOwnershipKey)
		})

		return app
	}
}
