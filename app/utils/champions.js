const championsData = require('../data/champions')
let championsById_ = null


module.exports.champIdToName = (champId) => {
	const champ = championsById()[champId]
	if (!champ) {
		console.warn('#DataNeedsUpdating', 'champions', champId)
		return 'unknown champ'
	}
	return champ.name
}


function championsById() {
	if (!championsById_) {
		championsById_ = {}
		Object.keys(championsData.data).forEach(champKey => {
			championsById_[championsData.data[champKey].key] = championsData.data[champKey]
		})
	}
	return championsById_
}

