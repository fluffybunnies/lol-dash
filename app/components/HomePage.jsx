import React from 'react'

import styles from './HomePage.css'

import SearchSummoner from './SearchSummoner.jsx'


export default class HomePage extends React.Component {

	render() {
		return <main className="Page HomePage">
			<SearchSummoner onChange={this.onSummonerChange.bind(this)} />
		</main>
	}

	onSummonerChange(summoner) {
		console.log('Summoner '+summoner)
	}
}
