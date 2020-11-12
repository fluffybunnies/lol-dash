const championsData = require('../data/champion')
,dragontail = require('./dragontail')
,config = require('../../config')
,CHAMPION_ICON_PATH_PREFIX = 'champion/'
let championsById_ = null


module.exports.champName = (champId) => {
	const champ = championsById()[champId]
	if (!champ) {
		console.warn('#DataNeedsUpdating', 'champion', champId)
		return 'unknown champ'
	}
	return champ.name
}

module.exports.champIcon = (champId) => {
	const champ = championsById()[champId]
	if (!(champ && champ.image && champ.image.full)) {
		console.warn('#DataNeedsUpdating', 'champion', 'image', champId, champ)
		return config.blankImg
	}
	return dragontail.dtImg(CHAMPION_ICON_PATH_PREFIX + champ.image.full)
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

