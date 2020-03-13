import React from 'react'

import styles from './Match.css'
import format from '../utils/format'
import { champIdToName } from  '../utils/champions'


export default class Match extends React.Component {
	render() {
		let matchJsx = <div className="Match-loading">Fetching match data...</div>
		if (this.props.matchData) {
			const teams = this.extractTeamsFromMatch(this.props.matchData)
			matchJsx = <>
				<div className="Match-team Match-team-winners">
					{teams.winners.map(this.buildPlayerRow)}
				</div>
				<div className="Match-team-vs">vs</div>
				<div className="Match-team Match-team-losers">
					{teams.losers.map(this.buildPlayerRow)}
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
			winners: [],
			losers: []
		}
		const players = {}
		const winningTeamId = matchData.teams[0].win == 'Win' ? matchData.teams[0].teamId : matchData.teams[1].teamId
		matchData.participants.forEach(player => {
			if (player.teamId == winningTeamId) {
				teams.winners.push(players[player.participantId] = player)
			} else {
				teams.losers.push(players[player.participantId] = player)
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
			<div className="Match-team-player-champ">{champIdToName(player.championId)}</div>
			<div className="Match-team-player-kda">{player.stats.kills} / {player.stats.deaths} / {player.stats.assists}</div>
		</div>
	}

	wrapTable(jsxRows) {
		return <table><tbody>{jsxRows}</tbody></table>
	}


}
