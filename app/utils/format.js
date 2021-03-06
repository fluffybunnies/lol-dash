
module.exports.prettyTime = (date) => {
	const z = this
		,d = date instanceof Date ? date : typeof date == 'undefined' ? new Date : new Date(date)
	return z.padZ(d.getMonth()+1)+'/'+z.padZ(d.getDate())+'/'+d.getFullYear()+' '+z.padZ(d.getHours())+':'+z.padZ(d.getMinutes())+':'+z.padZ(d.getSeconds())
}

module.exports.padZ = (n, m) => {
	if (typeof m == 'undefined') {
		m = 2
	}
	while ((n+'').length < m) {
		n = '0'+n
	}
	return n
}

/**
* Strip markup from a string
*
* This is intended only as a laissez faire formatter,
* do not inject result directly into html
*/
module.exports.stripTags = (markup) => {
	return markup.replace(/<[^>]*>/g, '')
}
