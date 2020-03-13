import React from 'react'

import Header from './Header.jsx'
import Footer from './Footer.jsx'


export default class Site extends React.Component {
	render() {
		return <div className="Site">
			<Header />
			{this.props.page}
			<Footer />
		</div>
	}
}
