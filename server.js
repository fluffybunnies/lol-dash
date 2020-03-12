const app = require('./app/app').app()
,port = process.env.PORT || 8080

app.listen(port, err => {
	if (err) {
		return console.error(err)
	}
	console.log('Listening on ' + port)
})
