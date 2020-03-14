import React from 'react'

import Match from './Match.jsx'
import api from '../utils/api.js'


export default class PreviousMatch extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			matchData: null
		}
	}

	render() {
		return <div className="PreviousMatch">
			<Match title={'Previous Match'} matchData={this.state.matchData} />
		</div>
	}

	componentDidMount() {
		this.fetchPreviousMatchData()
	}

	async fetchPreviousMatchData() {
		try  {
			const mostRecentMatchId = await this.getMostRecentMatchId(this.props.summoner)
			const matchData = await this.getMatchById(mostRecentMatchId)
			this.setState({
				matchData: matchData
			})
		} catch (e) {
			console.error('ERROR', 'PreviousMatch', 'fetchPreviousMatchData', e)
		}
	}

	async getMostRecentMatchId(summoner) {
		const url = `lol/match/v4/matchlists/by-account/${encodeURIComponent(summoner.accountId)}?beginIndex=0&endIndex=1`
		const res = await api(url)
		if (!(res && res.matches && res.matches[0] && res.matches[0].gameId)) {
			throw new Error('Missing res.matches, res.matches is empty, or gameId is missing')
		}
		return res.matches[0].gameId
	}

	async getMatchById(matchId) {
		const url = `lol/match/v4/matches/${encodeURIComponent(matchId)}`
		const res = await api(url)
		return res
	}
}
