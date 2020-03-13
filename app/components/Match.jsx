import React from 'react'

import styles from './Match.css'


export default class Match extends React.Component {
	render() {
		let matchJsx = <div className="Match-loading">Fetching match data...</div>
		if (this.props.matchData) {
			const teams = this.extractTeamsFromMatch(this.props.matchData)
			matchJsx = <>
				<div className="Match-team Match-team-red">{teams.red.map(this.buildPlayerJsx)}</div>
				<div className="Match-team-vs">vs</div>
				<div className="Match-team Match-team-blue">{teams.blue.map(this.buildPlayerJsx)}</div>
			</>
		}
		return <div className="Match">
			<div className="Match-title">{this.props.title}</div>
			{matchJsx}
		</div>
	}

	extractTeamsFromMatch(matchData) {
		const teams = {
			red: [],
			blue: [],
		}
		const players = {}
		matchData.participants.forEach(player => {
			if (player.teamId == 100) {
				teams.red.push(players[player.participantId] = player)
			} else {
				teams.blue.push(players[player.participantId] = player)
			}
		})
		matchData.participantIdentities.forEach(player => {
			players[player.participantId].id = player.player
		})
		return teams
	}

	buildPlayerJsx(player, index) {
		return <div className="Match-team-player" key={index}>
			<div className="Match-team-player-name">{player.id.summonerName}</div>
		</div>
	}
}
