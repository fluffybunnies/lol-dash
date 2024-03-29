import React from 'react'

import Match from './Match.jsx'
import api from '../utils/api.js'

const BLUE_TEAM_ID = 100


export default class CurrentMatch extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			matchData: null,
			copy: null
		}
	}

	render() {
		return <div className="CurrentMatch">
			<Match title={'Current Match'} match={this.buildMatchDto(this.state.matchData)} summonerId={this.props.summoner.id} searchedSummoners={this.props.searchedSummoners} copy={this.state.copy} onModalContentChange={this.props.onModalContentChange} />
		</div>
	}

	componentDidMount() {
		this.fetchCurrentMatchData()
	}

	async fetchCurrentMatchData() {
		this.setState({ copy: null })
		const url = `lol/spectator/v4/active-games/by-summoner/${encodeURIComponent(this.props.summoner.id)}`
		try {
			const res = await api(url)
			this.setState({
				matchData: res
			})
		} catch (e) {
			this.setState({
				copy: 'Current match not available'
			})
		}
	}

	buildMatchDto(matchData) {
		if (!matchData) {
			return null
		}
		const match = {
			startTime: matchData.gameStartTime,
			duration: matchData.gameLength,
			teams: this.buildTeams(matchData)
		}
		return match
	}

	buildTeams(matchData) {
		const teams = [
			{
				key: 'blue',
				players: []
			},
			{
				key: 'red',
				players: []
			}
		]
		matchData.participants.forEach(player => {
			player.runeIds = this.buildRuneIds(player)
			if (player.teamId == BLUE_TEAM_ID) {
				teams[0].players.push(player)
			} else {
				teams[1].players.push(player)
			}
		})
		return teams
	}

	buildRuneIds(player) {
		// Exclude offense/flex/defense perks, which we don't have data for
		return player.perks.perkIds.slice(0,6)
	}
}
