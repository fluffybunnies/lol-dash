const SEARCHED_SUMMONERS_KEY = 'searchedSummoners'
,SEARCHED_SUMMONERS_LIFETIME_MS = 2592000000 // 30 days
,MOST_RECENTLY_SEARCHED_SUMMONER_KEY = 'mostRecentlySearchedSummoner'
,MOST_RECENTLY_SEARCHED_SUMMONER_LIFETIME_MS = 2592000000 // 30 days



module.exports.setSearchedSummoner = setSearchedSummoner

module.exports.getSearchedSummoners = getSearchedSummoners

module.exports.setMostRecentlySearchedSummoner = setMostRecentlySearchedSummoner

module.exports.getMostRecentlySearchedSummoner = getMostRecentlySearchedSummoner



function setSearchedSummoner(summonerId) {
	const searchedSummoners = getSearchedSummoners()
	if (!getSearchedSummoners[summonerId]) {
		searchedSummoners[summonerId] = {
			lastSearched: Date.now()
		}
	}
	try {
		localStorage.setItem(SEARCHED_SUMMONERS_KEY, JSON.stringify(searchedSummoners))
	} catch (e) {
		console.error('searchHistory', `Failed to set ${SEARCHED_SUMMONERS_KEY}`, searchedSummoners, e)
	}
}

function getSearchedSummoners() {
	const defaultValue = {}
	try {
		const searchedSummoners = JSON.parse(localStorage.getItem(SEARCHED_SUMMONERS_KEY))
		if (!searchedSummoners || typeof searchedSummoners != 'object') {
			// Doesn't yet exist, or is corrupt
			return defaultValue
		}
		return pruneSearchedSummoners(searchedSummoners)
	} catch (e) {
		console.error('searchHistory', `Failed to parse ${SEARCHED_SUMMONERS_KEY}`, e)
		return defaultValue
	}
}

function setMostRecentlySearchedSummoner(summonerName) {
	try {
		localStorage.setItem(MOST_RECENTLY_SEARCHED_SUMMONER_KEY, JSON.stringify({
			summonerName: summonerName,
			lastSearched: Date.now()
		}))
	} catch (e) {
		console.error('searchHistory', `Failed to set ${MOST_RECENTLY_SEARCHED_SUMMONER_KEY}`, summonerName, e)
	}
}

function getMostRecentlySearchedSummoner() {
	const defaultValue = null
	try {
		let mostRecentlySearchedSummoner = JSON.parse(localStorage.getItem(MOST_RECENTLY_SEARCHED_SUMMONER_KEY))
		if (!mostRecentlySearchedSummoner || typeof mostRecentlySearchedSummoner != 'object' || typeof mostRecentlySearchedSummoner.summonerName != 'string') {
			// Doesn't yet exist, or is corrupt
			return defaultValue
		}
		mostRecentlySearchedSummoner = pruneMostRecentlySearchedSummoner(mostRecentlySearchedSummoner)
		return mostRecentlySearchedSummoner ? mostRecentlySearchedSummoner.summonerName : defaultValue
	} catch (e) {
		console.error('searchHistory', `Failed to parse ${MOST_RECENTLY_SEARCHED_SUMMONER_KEY}`, e)
		return defaultValue
	}
}


/**
* Remove old searchedSummoners
*/
function pruneSearchedSummoners(searchedSummoners) {
	const cutoff = Date.now() - SEARCHED_SUMMONERS_LIFETIME_MS
	Object.keys(searchedSummoners).forEach(key => {
		if (typeof searchedSummoners[key].lastSearched != 'number' || searchedSummoners[key].lastSearched < cutoff) {
			console.log('searchHistory', 'Pruning', key)
			delete searchedSummoners[key]
		}
	})
	return searchedSummoners // chain
}

function pruneMostRecentlySearchedSummoner(mostRecentlySearchedSummoner) {
	const cutoff = Date.now() - MOST_RECENTLY_SEARCHED_SUMMONER_LIFETIME_MS
	if (typeof mostRecentlySearchedSummoner.lastSearched != 'number' || mostRecentlySearchedSummoner.lastSearched < cutoff) {
		return null
	}
	return mostRecentlySearchedSummoner // chain
}
