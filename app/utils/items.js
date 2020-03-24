const itemData = require('../data/item')
,dragontail = require('./dragontail')
,config = require('../../config')
,ITEM_ICON_PATH_PREFIX = 'item/'
let itemsById_ = null


module.exports.itemName = (itemId) => {
	if (item.id == 0) {
		return ''
	}
	const item = itemsById()[itemId]
	if (!item) {
		console.warn('#DataNeedsUpdating', 'items', itemId)
		return 'unknown item'
	}
	return item.name
}

module.exports.itemIcon = (itemId) => {
	if (itemId == 0) {
		return config.blankImg
	}
	const item = itemsById()[itemId]
	if (!(item && item.image && item.image.full)) {
		console.warn('#DataNeedsUpdating', 'items', 'image', itemId, item)
		return config.blankImg
	}
	return dragontail.dtImg(ITEM_ICON_PATH_PREFIX + item.image.full)
}


function itemsById() {
	if (!itemsById_) {
		itemsById_ = {}
		Object.keys(itemData.data).forEach(itemId => {
			itemsById_[itemId] = itemData.data[itemId]
		})
	}
	return itemsById_
}

