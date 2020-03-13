import React from 'react'

import config from '../../config'

import styles from './Footer.css'


export default class Footer extends React.Component {
	render() {
		return <footer className="Footer">
			<div className="Footer-legal">{config.siteDisplayName} isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.</div>
		</footer>
	}
}
