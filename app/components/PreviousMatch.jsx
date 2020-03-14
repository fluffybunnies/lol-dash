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
			<Match title={'Previous Match'} match={this.buildMatchDto(this.state.matchData)} />
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
		} catch (e) {
			console.error('ERROR', 'PreviousMatch', 'fetchPreviousMatchData', e)
		}
	}

	async getMostRecentMatchId(summoner) {
		const url = `lol/match/v4/matchlists/by-account/${encodeURIComponent(summoner.accountId)}?beginIndex=0&endIndex=1`
		const res = await api(url)
		if (!(res && res.matches && res.matches[0] && res.matches[0].gameId)) {
			throw new Error('Missing res.matches, res.matches is empty, or gameId is missing')
		}
		return res.matches[0].gameId
	}

	async getMatchById(matchId) {
		const url = `lol/match/v4/matches/${encodeURIComponent(matchId)}`
		const res = await api(url)
		return res
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
			if (player.teamId == winningTeamId) {
				teams[0].players.push(players[player.participantId] = player)
			} else {
				teams[1].players.push(players[player.participantId] = player)
			}
		})
		matchData.participantIdentities.forEach(player => {
			players[player.participantId].summonerName = player.player.summonerName
		})
		return teams
	}

	buildRuneIds(player) {
		const runeIds = []
		Object.keys(player.stats).forEach(statKey => {
			if (/^perk[0-9]+$/.test(statKey)) {
				runeIds.push(player.stats[statKey])
			}
		})
		return runeIds
	}
}
