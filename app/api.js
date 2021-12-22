const http = require('https')
,config = require('../config.server')

module.exports = (req, res) => {
	// Intercept request, modify host and headers
	const proxy = http.request({
		hostname: getHostname(req.url),
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

// TODO: Figure out what the actual ruleset is here
function getHostname(url) {
	if (url.indexOf('/lol/match/v5/') == 0) {
		return config.apiRegionHost
	}
	return config.apiPlatformHost
}
