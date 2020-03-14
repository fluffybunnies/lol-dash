import React from 'react'

import Match from './Match.jsx'
import api from '../utils/api.js'

const BLUE_TEAM_ID = 100


export default class CurrentMatch extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			matchData: null
		}
	}

	render() {
		return <div className="CurrentMatch">
			<Match title={'Current Match'} match={this.buildMatchDto(this.state.matchData)} />
		</div>
	}

	componentDidMount() {
		this.fetchCurrentMatchData()
	}

	async fetchCurrentMatchData() {
		const url = `lol/spectator/v4/active-games/by-summoner/${encodeURIComponent(this.props.summoner.id)}`
		const res = await api(url)
		this.setState({
			matchData: res
		})
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
			if (player.teamId == BLUE_TEAM_ID) {
				teams[0].players.push(player)
			} else {
				teams[1].players.push(player)
			}
		})
		return teams
	}
}
