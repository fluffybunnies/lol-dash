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

	async componentDidMount() {
		const listUrl = `lol/match/v4/matchlists/by-account/${encodeURIComponent(this.props.summoner.accountId)}?beginIndex=0&endIndex=1`
		try {
			const res = await api(listUrl)
			if (!(res && res.matches && res.matches[0] && res.matches[0].gameId)) {
				throw new Error('Missing res.matches, res.matches is empty, or gameId is missing')
			}
			const matchUrl = `lol/match/v4/matches/${encodeURIComponent(res.matches[0].gameId)}`
			try {
				const res = await api(matchUrl)
				this.setState({
					matchData: res
				})
			} catch (e) {
				console.error('ERROR', 'PreviousMatch', 'getMatch', e)
			}
		} catch (e)  {
			console.error('ERROR', 'PreviousMatch', 'getAccountMatches', e)
		}
	}
}
