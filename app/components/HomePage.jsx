import React from 'react'

import styles from './HomePage.css'

import SelectSummoner from './SelectSummoner.jsx'


export default class HomePage extends React.Component {

	render() {
		return <main className="Page HomePage">
			<SelectSummoner onSelect={this.onSummonerSelect.bind(this)} />
		</main>
	}

	onSummonerSelect(summoner) {
		console.log('Summoner', summoner)
	}
}
