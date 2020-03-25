import React from 'react'

import styles from './PlayerStatMods.css'

import { statModName, statModIcon } from  '../utils/statMods'


export default class PlayerStatMods extends React.Component {
	render() {
		return <div className="PlayerStatMods">
			{this.props.statModIds.map((statModId, statModIndex) => {
				return <img className="PlayerStatMods-mod" alt={statModName(statModId)} title={statModName(statModId)} src={statModIcon(statModId)} key={statModIndex} />
			})}
		</div>
	}
}
