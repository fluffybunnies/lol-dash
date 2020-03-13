import React from 'react';

import styles from './SearchBox.css';
import searchIcon from '../assets/search.svg';


export default class SearchBox extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: props.value === undefined ? '' : props.value,
		}
	}

	render() {
		return (
			<div className="SearchBox">
				<img src={searchIcon} alt="" />
				<input
					placeholder={this.props.placeholder}
					value={this.state.value}
					disabled={this.props.disabled}
					onKeyDown={this.onKeyDown.bind(this)}
					onChange={this.onChange.bind(this)}
				/>
			</div>
		)
	}

	onChange(event) {
		this.setState({
			value: event.target.value,
		})
		this.props.onChange && this.props.onChange(event.target.value)
	}

	onKeyDown(event) {
		if (event.keyCode === 13) {
			event.preventDefault()
			this.props.onSubmit && this.props.onSubmit(this.state.value)
		}
	}
}
