const config = require('../../config')

export default async (path, method, data) => {
	if (!method) {
		method = 'GET'
	}

	const url = config.apiLocalHost + (path.charAt(0) == '/' ? '' : '/') + path
	
	const res = await fetch(url, {
		method: method.toUpperCase(),
		cache: 'no-cache',
		headers: data && {
			'content-type': 'application/json'
		},
		body: data && JSON.stringify(data)
	})

	if (!res.ok) {
		let errMsg = res.statusText
		try {
			const body = await res.json()
			if (body && body.status && body.status.message) {
				errMsg = body.status.message
			}
		} catch (e) {}
		throw new Error(`${res.status} (${errMsg})`)
	}

	return await res.json()
}
