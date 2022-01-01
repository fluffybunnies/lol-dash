import React from 'react'

import Match from './Match.jsx'
import api from '../utils/api.js'


export default class PreviousMatch extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			matchData: null
		}
	}

	render() {
		return <div className="PreviousMatch">
			<Match title={'Previous Match'} match={this.buildMatchDto(this.state.matchData)} summonerId={this.props.summoner.id} searchedSummoners={this.props.searchedSummoners} searchForPlayer={this.props.searchForPlayer} onModalContentChange={this.props.onModalContentChange} />
		</div>
	}

	componentDidMount() {
		this.fetchPreviousMatchData()
	}

	async fetchPreviousMatchData() {
		try  {
			const mostRecentMatchId = await this.getMostRecentMatchId(this.props.summoner)
			const matchData = await this.getMatchById(mostRecentMatchId)
			this.setState({
				matchData: matchData
			})
			this.props.onLoad && this.props.onLoad(matchData)
		} catch (e) {
			console.error('ERROR', 'PreviousMatch', 'fetchPreviousMatchData', e)
		}
	}

	async getMostRecentMatchId(summoner) {
		const beginIndex = this.props.index || 0
			,endIndex = beginIndex + 1
			,url = `lol/match/v5/matches/by-puuid/${encodeURIComponent(summoner.puuid)}/ids?start=${beginIndex}&count=${endIndex}`
		const res = await api(url)
		if (!(res && Array.isArray(res))) {
			throw new Error('Unexpected response from getMostRecentMatchId; is not an array')
		}
		return res[0]
	}

	async getMatchById(matchId) {
		const url = `lol/match/v5/matches/${encodeURIComponent(matchId)}`
		const res = await api(url)
		if (!(res && res.info)) {
			throw new Error('Unexpected response from getMatchById; missing res.info')
		}
		return res.info
	}

	buildMatchDto(matchData) {
		if (!matchData) {
			return null
		}
		const match = {
			startTime: matchData.gameCreation,
			duration: matchData.gameDuration,
			teams: this.buildTeams(matchData)
		}
		return match
	}

	buildTeams(matchData) {
		const teams = [
			{
				key: 'winners',
				players: []
			},
			{
				key: 'losers',
				players: []
			}
		]
		const players = {}
		const winningTeamId = matchData.teams[0].win == 'Win' ? matchData.teams[0].teamId : matchData.teams[1].teamId
		matchData.participants.forEach(player => {
			player.runeIds = this.buildRuneIds(player)
			player.statModIds = this.buildStatModIds(player)
			player.itemIds = this.buildItemIds(player)
			if (player.teamId == winningTeamId) {
				teams[0].players.push(players[player.participantId] = player)
			} else {
				teams[1].players.push(players[player.participantId] = player)
			}
		})
		return teams
	}

	buildRuneIds(player) {
		const runeIds = []
		player.perks.styles.forEach(perkSection => {
			perkSection.selections.forEach(perk => {
				runeIds.push(perk.perk)
			})
		})
		return runeIds
	}

	buildStatModIds(player) {
		return Object.values(player.perks.statPerks)
	}

	buildItemIds(player) {
		const itemIds = []
		Object.keys(player).forEach(statKey => {
			if (/^item[0-9]+$/.test(statKey)) {
				itemIds.push(player[statKey])
			}
		})
		return itemIds
	}
}
