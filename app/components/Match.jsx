import React from 'react'

import styles from './Match.css'

import Modal from './Modal.jsx'
import PlayerInfo from './PlayerInfo.jsx'
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
						summonerId?, // embolden searched summoner in team lists
						stats?, // show kda column
						runeIds? // show player runes on click
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
	constructor(props) {
		super(props)
		this.state = {
			modal: null
		}
	}

	render() {
		let matchJsx = <div className="Match-loading">Fetching match data...</div>
		if (this.props.match) {
			matchJsx = <>
				{this.buildTeam(this.props.match.teams[0])}
				<div className="Match-team-vs">vs</div>
				{this.buildTeam(this.props.match.teams[1])}
			</>
		} else if (this.props.copy) {
			matchJsx = this.props.copy
		}
		return <div className="Match">
			<div className="Match-title">
				{this.props.title}
				{this.props.match && <span className="Match-title-note">{format.prettyTime(this.props.match.startTime)} ({this.formatDuration(this.props.match.duration)})</span>}
			</div>
			{matchJsx}
			{this.state.modal && this.state.modal}
		</div>
	}

	buildTeam(team) {
		return <div className={`Match-team Match-team-${team.key}`}>
			{team.players.map((player,index) => this.buildPlayerRow(player,index))}
		</div>
	}

	buildPlayerRow(player, index) {
		const classnames = [
			'Match-team-player',
			`${player.summonerId == this.props.summonerId ? 'Match-team-player-viewing' : ''}`
		]
		if (this.props.searchedSummoners && this.props.searchedSummoners[player.summonerId]) {
			classnames.push('Match-team-player-searched')
		}
		return <div className={classnames.join(' ')} key={index} onClick={this.openPlayerInfo.bind(this,player)}>
			<div className="Match-team-player-stat Match-team-player-stat-name">{player.summonerName}</div>
			<div className="Match-team-player-stat Match-team-player-stat-champ">{champIdToName(player.championId)}</div>
			{player.stats && <div className="Match-team-player-stat Match-team-player-stat-kda">{player.stats.kills} / {player.stats.deaths} / {player.stats.assists}</div>}
		</div>
	}

	formatDuration(seconds) {
		return Math.floor(seconds / 60) + ' mins'
	}

	openPlayerInfo(player) {
		if (!player.runeIds) {
			return // not useful atm
		}
		this.setState({
			modal: <Modal content={<PlayerInfo player={player} />} onClose={this.closeModal.bind(this)} />
		})
	}

	closeModal() {
		this.setState({
			modal: null
		})
	}

}
