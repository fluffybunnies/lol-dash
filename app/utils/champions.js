const champions = require('../data/champions')
let _championsById = null


module.exports.champIdToName = (champId) => {
	const champ = championsById()[champId]
	return champ ? champ.name : 'unknown champ'
}


function championsById() {
	if (!_championsById) {
		_championsById = {}
		Object.keys(champions.data).forEach(champKey => {
			_championsById[champions.data[champKey].key] = champions.data[champKey]
		})
	}
	return _championsById
}

