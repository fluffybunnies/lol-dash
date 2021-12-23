const app = require('./app/app').app(process.env.ENV == 'production')
,defaultProdPort = 443
,defaultDevPort = 8080


if (process.env.ENV == 'production') {
	const fs = require('fs')
	,https = require('https')
	const httpsServer = https.createServer({
		key: fs.readFileSync('/etc/letsencrypt/live/wraithzero.com/privkey.pem')
		,cert: fs.readFileSync('/etc/letsencrypt/live/wraithzero.com/fullchain.pem')
	}, app)
	.listen(defaultProdPort, err => {
		if (err) {
			return console.error(err)
		}
		console.log('Listening on ' + defaultProdPort)
	})

	app.listen(80, err => {
		if (err) {
			return console.error(err)
		}
		console.log('Also listening on 80 to redirect to https')
	})
} else {
	app.listen(defaultDevPort, err => {
		if (err) {
			return console.error(err)
		}
		console.log('Listening on ' + defaultDevPort)
	})
}


