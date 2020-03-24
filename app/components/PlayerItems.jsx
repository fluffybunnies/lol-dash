import React from 'react'

import styles from './PlayerItems.css'

import { itemName, itemIcon } from  '../utils/items'


export default class PlayerItems extends React.Component {
	render() {
		return <div className="PlayerItems">
			{this.props.itemIds.map(itemId => {
				return <img className="PlayerItems-item" src={itemIcon(itemId)} alt={itemName(itemId)} title={itemName(itemId)} />
			})}
		</div>
	}
}
