import React from 'react'

import Match from './Match.jsx'
import api from '../utils/api.js'


export default class CurrentMatch extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			matchData: null
		}
	}

	render() {
		return <div className="CurrentMatch">
			<Match title={'CurrentMatch'} matchData={this.state.matchData} />
		</div>
	}

	componentDidMount() {
		this.fetchCurrentMatchData()
	}

	async fetchCurrentMatchData() {
		
	}
}
