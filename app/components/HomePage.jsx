import React from 'react'

import styles from './HomePage.css'

import SelectSummoner from './SelectSummoner.jsx'
import Module from './Module.jsx'
//import CurrentMatch from './CurrentMatch.jsx'
import PreviousMatch from './PreviousMatch.jsx'


export default class HomePage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			summoner: null
		}
	}

	render() {
		return <main className="Page HomePage">
			<SelectSummoner onSelect={this.onSummonerSelect.bind(this)} />
			<div className="Page-Modules">
				{this.state.summoner && <Module content={'Current Match'} />}
				{this.state.summoner && <Module content={<PreviousMatch summoner={this.state.summoner} key={this.state.summoner.id} />} />}
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
