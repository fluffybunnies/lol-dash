import React from 'react'
import ReactDOM from 'react-dom'

import cssReset from './reset.css'
import globalStyles from './layout.css'
import bgImg from './assets/wallpaper01.png';

import Site from './components/Site.jsx'
import HomePage from './components/HomePage.jsx'


document.body.style.backgroundImage = `url(${bgImg})`;
ReactDOM.render(<Site page={<HomePage />} />, document.body)
