const app = require('./app/app').app()
,port = process.env.PORT || 8080



if (port == 443) {
	const fs = require('fs')
	,https = require('https')
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
	.listen(80, err => {
		if (err) {
			return console.error(err)
		}
		console.log('Also listening on 80 to redirect to https')
	})
} else {
	app.listen(port, err => {
		if (err) {
			return console.error(err)
		}
		console.log('Listening on ' + port)
	})
}


