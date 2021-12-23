const app = require('./app/app').app()
,port = process.env.PORT || 8080



if (port == 443) {
	const fs = require('fs')
	const httpsServer = https.createServer({
		key: fs.readFileSync('/etc/letsencrypt/live/wraithzero.com/privkey.pem')
		,cert: fs.readFileSync('/etc/letsencrypt/live/wraithzero.com/fullchain.pem')
	}, app)
	.listen(port, err => {
		if (err) {
			return console.error(err)
		}
		console.log('Listening on ' + port)
	})
} else {
	app.listen(port, err => {
		if (err) {
			return console.error(err)
		}
		console.log('Listening on ' + port)
	})
}


