import React from 'react'

import styles from './PlayerRunes.css'

import PlayerStatMods from './PlayerStatMods.jsx'
import { stripTags } from '../utils/format'
import { runeIdsToPlayerRunes } from  '../utils/runes'
import { dtImg } from  '../utils/dragontail'


export default class PlayerRunes extends React.Component {
	render() {
		const runesByStyle = runeIdsToPlayerRunes(this.props.runeIds)
		const runeStylesJsx = runesByStyle.map((style, styleIndex) => {
			const runesJsx = style.runes.map((rune, runeIndex) => {
				return <div className="PlayerRunes-style-rune" style={{backgroundImage:`url(${dtImg(rune.icon)})`}} key={runeIndex}>
					<div className="PlayerRunes-style-rune-name">{rune.name}</div>
					<div className="PlayerRunes-style-rune-desc">{stripTags(rune.shortDesc)}</div>
				</div>
			})
			return <div className="PlayerRunes-style" style={{backgroundImage:`url(${dtImg(style.icon)})`}} key={styleIndex}>
				<div className="PlayerRunes-style-name">{style.name}</div>
				<div className="PlayerRunes-style-runes">{runesJsx}</div>
				{styleIndex == runesByStyle.length-1 && this.props.statModIds && <PlayerStatMods statModIds={this.props.statModIds} />}
			</div>
		})
		return <div className="PlayerRunes">
			<div className="PlayerRunes-title">Player Runes</div>
			<div className="PlayerRunes-styles">{runeStylesJsx}</div>
		</div>
	}
}
