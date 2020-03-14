import React from 'react'

import styles from './PlayerInfo.css'

import PlayerRunes from './PlayerRunes.jsx'


export default class PlayerInfo extends React.Component {
	render() {
		return <div className="PlayerInfo">
			<PlayerRunes runeIds={this.props.player.runeIds} />
		</div>
	}
}
