import React from 'react'

import styles from './PlayerRunes.css'

import { stripTags } from '../utils/format'
import { runeIdsToPlayerRunes } from  '../utils/runes'


export default class PlayerRunes extends React.Component {
	render() {
		const runeStylesJsx = runeIdsToPlayerRunes(this.props.runeIds).map((style, index) => {
			const runesJsx = style.runes.map((rune, index) => {
				return <div className="PlayerRunes-style-rune" key={index}>
					<div className="PlayerRunes-style-rune-name">{rune.name}</div>
					<div className="PlayerRunes-style-rune-desc">{stripTags(rune.shortDesc)}</div>
				</div>
			})
			return <div className="PlayerRunes-style" key={index}>
				<div className="PlayerRunes-style-name">{style.name}</div>
				<div className="PlayerRunes-style-runes">{runesJsx}</div>
			</div>
		})
		return <div className="PlayerRunes">
			<div className="PlayerRunes-title">Player Runes</div>
			<div className="PlayerRunes-styles">{runeStylesJsx}</div>
		</div>
	}
}
