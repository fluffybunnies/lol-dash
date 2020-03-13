import React from 'react'

import config from '../../config'

import styles from './Header.css'


export default class Header extends React.Component {
	render() {
		return <header className="Header">
			{config.siteDisplayName}
		</header>
	}
}
