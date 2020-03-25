import React from 'react'

import styles from './PlayerInfo.css'

import PlayerRunes from './PlayerRunes.jsx'


export default class PlayerInfo extends React.Component {
	render() {
		return <div className="PlayerInfo">
			<PlayerRunes runeIds={this.props.player.runeIds} statModIds={this.props.player.statModIds} />
			{this.props.searchForPlayer && <button className="PlayerInfo-search_player_btn" onClick={() => this.props.searchForPlayer(this.props.player.summonerName)}>Search for "{this.props.player.summonerName}"</button>}
		</div>
	}
}
