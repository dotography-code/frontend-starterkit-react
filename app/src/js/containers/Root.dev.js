'user restrict'

import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import DevTools from './DevTools'
import routes from '../routes'

export default class Root extends Component {
  render() {
		const { store } = this.props
		
    return (
			<Provider store={store}>
				<div id="main-container">
					{ routes }
					<DevTools />
				</div>
			</Provider>
    )
  }
}