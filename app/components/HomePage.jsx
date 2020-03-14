import React from 'react'

import styles from './HomePage.css'

import SelectSummoner from './SelectSummoner.jsx'
import Module from './Module.jsx'
import CurrentMatch from './CurrentMatch.jsx'
import PreviousMatch from './PreviousMatch.jsx'
import config from '../../config'


export default class HomePage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			summoner: null,
			refreshCount: 0
		}
	}

	render() {
		const contextKey = this.state.summoner && `${this.state.summoner.id}ÿ${this.state.refreshCount}`
		return <main className="Page HomePage">
			<SelectSummoner onSelect={this.onSummonerSelect.bind(this)} />
			<div className="Page-Modules">
				{this.state.summoner && <Module content={<CurrentMatch summoner={this.state.summoner} key={contextKey} />} />}
				{this.state.summoner && <Module content={<PreviousMatch summoner={this.state.summoner} key={contextKey} />} />}
			</div>
		</main>
	}

	onSummonerSelect(summoner) {
		//console.log('Summoner fetched...', summoner)
		this.setState({
			summoner: summoner
		})
		this.triggerRefresh()
	}

	triggerRefresh() {
		if (typeof config.refreshDashboardRate != 'number') {
			return
		}
		clearTimeout(this.state.refreshTimeout)
		this.setState({
			refreshTimeout: setTimeout(() => {
				if (this.state.summoner) {
					console.log('Refreshing dashboard...')
					this.setState({ refreshCount: ++this.state.refreshCount })
					this.onSummonerSelect(this.state.summoner)
				}
			}, config.refreshDashboardRate * 1000)
		})
	}

	componentWillUnmount() {
		clearTimeout(this.state.refreshTimeout)
	}
}
