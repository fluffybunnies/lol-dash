import React from 'react'

import styles from './Match.css'
import format from '../utils/format'
import { champIdToName } from  '../utils/champions'


/**
	props.match must be of this type:

	{
		startTime,
		duration,
		teams: [
			{
				key: 'winners', // or 'blue' or w/e
				players: [
					{
						summonerName,
						championId,
						stats?
					}
				]
			},
			{
				...
			}
		]
	}
*/
export default class Match extends React.Component {
	render() {
		let matchJsx = <div className="Match-loading">Fetching match data...</div>
		if (this.props.match) {
			matchJsx = <>
				{this.buildTeam(this.props.match.teams[0])}
				<div className="Match-team-vs">vs</div>
				{this.buildTeam(this.props.match.teams[1])}
			</>
		}
		return <div className="Match">
			<div className="Match-title">
				{this.props.title}
				{this.props.match && <span className="Match-title-note">{format.prettyTime(this.props.match.startTime)} ({this.formatDuration(this.props.match.duration)})</span>}
			</div>
			{matchJsx}
		</div>
	}

	buildTeam(team) {
		return <div className={`Match-team Match-team-${team.key}`}>
			{team.players.map(this.buildPlayerRow)}
		</div>
	}

	buildPlayerRow(player, index) {
		return <div className="Match-team-player" key={index}>
			<div className="Match-team-player-stat Match-team-player-stat-name">{player.summonerName}</div>
			<div className="Match-team-player-stat Match-team-player-stat-champ">{champIdToName(player.championId)}</div>
			{player.stats && <div className="Match-team-player-stat Match-team-player-stat-kda">{player.stats.kills} / {player.stats.deaths} / {player.stats.assists}</div>}
		</div>
	}

	formatDuration(seconds) {
		return Math.floor(seconds / 60) + ' mins'
	}


}
