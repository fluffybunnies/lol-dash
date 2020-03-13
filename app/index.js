import React from 'react'
import ReactDOM from 'react-dom'

import cssReset from './reset.css'
import globalStyles from './layout.css'

import Site from './components/Site.jsx'
import HomePage from './components/HomePage.jsx'


ReactDOM.render(<Site page={<HomePage />} />, document.body)
