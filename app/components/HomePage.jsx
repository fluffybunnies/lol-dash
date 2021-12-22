import React from 'react'

import styles from './HomePage.css'

import SelectSummoner from './SelectSummoner.jsx'
import Module from './Module.jsx'
import CurrentMatch from './CurrentMatch.jsx'
import PreviousMatch from './PreviousMatch.jsx'
import { setSearchedSummoner, getSearchedSummoners, setMostRecentlySearchedSummoner, getMostRecentlySearchedSummoner } from '../utils/searchHistory'
import config from '../../config'

const SHOW_THIS_MANY_PREV_MATCHES_EACH_PAGE = 5; // Gettin rate limited with dev key


export default class HomePage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			summoner: null,
			refreshCount: 0,
			previousMatchOffset: 0,
			prevMatchStats: {}, // by player, by game id
			summonerSearchPrefill: ''
		}
	}

	render() {
		const contextKey = this.state.summoner && `${this.state.summoner.id}ÿ${this.state.refreshCount}`
			,searchedSummoners = getSearchedSummoners()
			,prevMatchesJsx = []
		for (let i=0;i<=this.state.previousMatchOffset;++i) {
			prevMatchesJsx.push(<PreviousMatch summoner={this.state.summoner} index={i} searchedSummoners={searchedSummoners} searchForPlayer={this.searchForPlayer.bind(this)} key={`${contextKey}ÿ${i}`} onLoad={this.previousMatchOnLoad.bind(this)} />)
		}
		return <main className="Page HomePage">
			<SelectSummoner onSelect={this.onSummonerSelect.bind(this)} searchText={this.state.summonerSearchPrefill} key={this.state.summonerSearchPrefill} />
			{this.renderGlobalStats()}
			<div className="Page-Modules">
				{this.state.summoner && <Module>
					<CurrentMatch summoner={this.state.summoner} searchedSummoners={searchedSummoners} key={contextKey} />
				</Module>}
				{SHOW_THIS_MANY_PREV_MATCHES_EACH_PAGE && this.state.summoner && <Module>
						{prevMatchesJsx}
						<button className="HomePage-morematches" onClick={this.showMorePreviousMatches.bind(this)}>{SHOW_THIS_MANY_PREV_MATCHES_EACH_PAGE == 1 ? 'Show earlier game' : `Show ${SHOW_THIS_MANY_PREV_MATCHES_EACH_PAGE} earlier games`}</button>
				</Module>}
			</div>
		</main>
	}

	componentDidMount() {
		const mostRecentlySearchedSummoner = getMostRecentlySearchedSummoner()
		if (mostRecentlySearchedSummoner) {
			this.setState({
				summonerSearchPrefill: mostRecentlySearchedSummoner
			})
		}
	}

	componentWillUnmount() {
		clearTimeout(this.state.refreshTimeout)
	}

	onSummonerSelect(summoner) {
		//console.log('Summoner fetched...', summoner)
		if (!this.state.summoner || summoner.id != this.state.summoner.id) {
			this.setState({
				previousMatchOffset: 0
			})
			setSearchedSummoner(summoner.id)
			setMostRecentlySearchedSummoner(summoner.name)
		}
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

	searchForPlayer(playerName) {
		this.setState({
			summonerSearchPrefill: playerName
		})
	}

	showMorePreviousMatches() {
		this.setState({
			previousMatchOffset: this.state.previousMatchOffset + SHOW_THIS_MANY_PREV_MATCHES_EACH_PAGE
		})
	}

	previousMatchOnLoad(matchData) {
		if (!this.state.summoner) {
			return
		}

		const matchStats = this.state.prevMatchStats
		if (!matchStats[this.state.summoner.id]) {
			matchStats[this.state.summoner.id] = {}
		}
		if (!matchStats[this.state.summoner.id][matchData.gameId]) {
			matchStats[this.state.summoner.id][matchData.gameId] = {
				won: 0,
				lost: 0
			}
		}

		const playerWonMatch = this.playerWonMatch(this.state.summoner, matchData)
		if (playerWonMatch !== null) {
			if (playerWonMatch) {
				matchStats[this.state.summoner.id][matchData.gameId].won = 1
			} else {
				matchStats[this.state.summoner.id][matchData.gameId].lost = 1
			}
		} else {
			delete matchStats[this.state.summoner.id][matchData.gameId]
			console.warn('Something wrong with win/loss calculation', 'Unable to find summoner in match participants', 'summoner=', this.state.summoner, 'matchData=', matchData)
		}

		this.setState({
			prevMatchStats: matchStats
		})
	}

	/**
	* @return true for win, false for loss, null for couldn't-figure-it-out
	*/
	playerWonMatch(summoner, matchData) {
		for (let i=0;i<matchData.participants.length;++i) {
			if (matchData.participants[i].summonerId == summoner.id) {
				return matchData.participants[i].win
			}
		}
		return null
	}

	renderGlobalStats() {
		if (!this.state.summoner) {
			return
		}
		const playerMatchStats = this.state.prevMatchStats[this.state.summoner.id]
		const matchKeys = playerMatchStats && Object.keys(playerMatchStats)
		if (!matchKeys || matchKeys.length == 0) {
			return
		}
		let wins = 0, losses = 0
		matchKeys.forEach(matchKey => {
			wins += playerMatchStats[matchKey].won
			losses += playerMatchStats[matchKey].lost
		})
		return <div className="HomePage-globalstats">Wins: {wins} Losses: {losses} ({(wins*100/(wins+losses)).toFixed(0)}%)</div>
	}
}
