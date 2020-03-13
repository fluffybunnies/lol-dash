const http = require('https')
,config = require('../config.server')

module.exports = (req, res) => {
	// Intercept request, modify host and headers
	const proxy = http.request({
		hostname: config.apiPlatformHost,
		path: req.url,
		method: req.method,
		headers: {
			'X-Riot-Token': config.apiKey
		},
		rejectUnauthorized: false
	}, (proxyRes) => {
		res.writeHead(proxyRes.statusCode, proxyRes.headers)
		proxyRes.pipe(res, {
			end: true
		})
	})

	// Pipe to proxy
	req.pipe(proxy, {
		end: true
	})
}
