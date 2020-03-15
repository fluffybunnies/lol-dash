import React from 'react'

import styles from './Module.css'


export default class HomePage extends React.Component {
	render() {
		return <div className="Module">
			{this.props.children}
		</div>
	}
}
