import React from 'react'

import config from '../../config'

import styles from './Header.css'
import logoImg from  '../assets/logoh1-rasterized-full.png'

export default class Header extends React.Component {
	render() {
		return <header className="Header">
			<img className="Header-logo" src={logoImg}  alt={config.siteDisplayName} />
		</header>
	}
}
