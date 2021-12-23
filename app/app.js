const express = require('express')
,path = require('path')
,fs = require('fs')
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

		// API Certification
		app.use('/riot.txt', (req, res) => {
			res.writeHead(200, { 'content-type': 'text/plain' })
			res.end(riotOwnershipKey)
		})

		// HTTPS Certification via certbot
		app.use('/.well-known/acme-challenge', express.static('../../.well-known/acme-challenge'))
		/*
		app.use('/.well-known/acme-challenge', (req, res) => {
			const filename = path.join(__dirname, '../../.well-known/acme-challenge', req.url)
			fs.readFile(filename, (err, file) => {
				if (err) {
					return console.error(`error reading acme-challenge ${filename}`, err)
				}
				res.end(file.toString())
			})
		})
		*/

		return app
	}
}


let riotOwnershipKey = ''
fs.readFile(path.join(__dirname, '../riot.txt'), (err, file) => {
	if (err) {
		return console.error('error reading riot.txt', err)
	}
	riotOwnershipKey = file.toString()
})

