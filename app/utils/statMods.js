const statModsData = require('../data/statMods')
,dragontail = require('./dragontail')
,config = require('../../config')
,statMod_ICON_PATH_PREFIX = 'perk-images/StatMods/'


module.exports.statModName = (statModId) => {
	const statMod = statModsData[statModId]
	if (!statMod) {
		console.warn('#DataNeedsUpdating', 'stat mod', statModId)
		return 'unknown stat perk'
	}
	return statMod.name
}

module.exports.statModIcon = (statModId) => {
	const statMod = statModsData[statModId]
	if (!(statMod && statMod.image)) {
		console.warn('#DataNeedsUpdating', 'stat mod', 'image', statModId, statMod)
		return config.blankImg
	}
	return dragontail.dtImg(statMod_ICON_PATH_PREFIX + statMod.image)
}
