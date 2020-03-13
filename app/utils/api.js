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

  return await res.json()
}
