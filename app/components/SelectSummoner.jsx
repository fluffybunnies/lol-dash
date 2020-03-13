import React from 'react'

import styles from './SelectSummoner.css'

import SearchBox from './SearchBox.jsx'
import api from '../utils/api.js'


export default class SelectSummoner extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			busy: false,
			errMsg: null
		}
	}

	render() {
		return <div className="SelectSummoner">
			<SearchBox placeholder="Summoner name..." disabled={this.state.busy} onSubmit={this.onSubmit.bind(this)} />
			{this.state.errMsg && <div class="SelectSummoner-error">{this.state.errMsg}</div>}
		</div>
	}

	async onSubmit(summonerName) {
		if (this.state.busy) {
			return
		}
		summonerName = summonerName.trim()
		if (!summonerName) {
			return
		}

		this.setState({
			busy: true
			,errMsg: null
		})
		const url = `lol/summoner/v4/summoners/by-name/${encodeURIComponent(summonerName)}`
		try {
			const summoner = await api(url)
			this.props.onSelect && this.props.onSelect(summoner)
		} catch (e)  {
			console.error('ERROR', 'SelectSummoner', 'onSubmit', e)
			this.setState({
				errMsg: `Error fetching summoner "${summonerName}"`
			})
		}
		this.setState({ busy: false })
	}
}
