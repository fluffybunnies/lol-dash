import React from 'react'

import styles from './Modal.css'


export default class Modal extends React.Component {
	render() {
		return <div className="Modal" onClick={this.closeModal.bind(this)}>
			<div className="Modal-content" onClick={e => e.stopPropagation()}>{this.props.content}</div>
		</div>
	}

	closeModal() {
		this.props.onClose && this.props.onClose()
	}
}
