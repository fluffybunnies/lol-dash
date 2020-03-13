import React from 'react'

import styles from './Match.css'
import format  from '../utils/format'

const BLUE_TEAM_ID = 100


export default class Match extends React.Component {
	render() {
		let matchJsx = <div className="Match-loading">Fetching match data...</div>
		if (this.props.matchData) {
			const teams = this.extractTeamsFromMatch(this.props.matchData)
			const blueTeamWon = (this.props.matchData.teams[0].teamId == BLUE_TEAM_ID && this.props.matchData.teams[0].win == 'Win')
				|| (this.props.matchData.teams[1].teamId == BLUE_TEAM_ID && this.props.matchData.teams[1].win == 'Win')
			matchJsx = <>
				<div className={'Match-team Match-team-blue Match-team-'+(blueTeamWon?'win':'lost')}>
					{teams.blue.map(this.buildPlayerRow)}
				</div>
				<div className="Match-team-vs">vs</div>
				<div className={'Match-team Match-team-red Match-team-'+(blueTeamWon?'lose':'win')}>
					{teams.red.map(this.buildPlayerRow)}
				</div>
			</>
		}
		return <div className="Match">
			<div className="Match-title">
				{this.props.title}
				{this.props.matchData && <span className="Match-title-note">{format.prettyTime(this.props.matchData.gameCreation)}</span>}
			</div>
			{matchJsx}
		</div>
	}

	extractTeamsFromMatch(matchData) {
		const teams = {
			blue: [],
			red: [],
		}
		const players = {}
		matchData.participants.forEach(player => {
			if (player.teamId == BLUE_TEAM_ID) {
				teams.blue.push(players[player.participantId] = player)
			} else {
				teams.red.push(players[player.participantId] = player)
			}
		})
		matchData.participantIdentities.forEach(player => {
			players[player.participantId].id = player.player
		})
		return teams
	}

	buildPlayerRow(player, index) {
		return <div className="Match-team-player" key={index}>
			<div className="Match-team-player-name">{player.id.summonerName}</div>
			<div className="Match-team-player-champ">Godzilla</div>
			<div className="Match-team-player-kda">{player.stats.kills} / {player.stats.deaths} / {player.stats.assists}</div>
		</div>
	}

	wrapTable(jsxRows) {
		return <table><tbody>{jsxRows}</tbody></table>
	}


}
