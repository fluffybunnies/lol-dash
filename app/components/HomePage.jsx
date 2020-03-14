import React from 'react'

import styles from './HomePage.css'

import SelectSummoner from './SelectSummoner.jsx'
import Module from './Module.jsx'
import CurrentMatch from './CurrentMatch.jsx'
import PreviousMatch from './PreviousMatch.jsx'


export default class HomePage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			summoner: null
		}
	}

	render() {
		const contextKey = this.state.summoner && this.state.summoner.id
		return <main className="Page HomePage">
			<SelectSummoner onSelect={this.onSummonerSelect.bind(this)} />
			<div className="Page-Modules">
				{this.state.summoner && <Module content={<CurrentMatch summoner={this.state.summoner} key={contextKey} />} />}
				{this.state.summoner && <Module content={<PreviousMatch summoner={this.state.summoner} key={contextKey} />} />}
			</div>
		</main>
	}

	onSummonerSelect(summoner) {
		console.log('Summoner', summoner)
		this.setState({
			summoner: summoner
		})
	}
}
