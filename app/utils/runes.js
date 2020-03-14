const runesData = require('../data/runesReforged')
let runesById_ = null


/**
* @param runeIds Array of rune ids
* @return lists of Runes grouped by Style
*/
module.exports.runeIdsToPlayerRunes = (runeIds) => {
	const styles = []
		,styles_ = {}
	runeIds.forEach(runeId => {
		const rune = runesById()[runeId]
		if (!rune) {
			return console.warn('#DataNeedsUpdating', 'runes', runeId)
		}
		if (!styles_[rune.style.id]) {
			styles.push(styles_[rune.style.id] = Object.assign({
				runes: []
			}, rune.style))
		}
		styles_[rune.style.id].runes.push(rune)
	})
	return styles;
}


function runesById() {
	if (!runesById_) {
		runesById_ = {}
		runesData.forEach(style => {
			style.slots.forEach((slot, slotIndex) => {
				slot.runes.forEach(rune => {
					runesById_[rune.id] = Object.assign({
						style: {
							id: style.id,
							key: style.key,
							icon: style.icon,
							name: style.name
						},
						slotIndex: slotIndex
					}, rune)
				})
			})
		})
	}
	return runesById_
}

