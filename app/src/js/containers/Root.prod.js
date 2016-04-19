'user restrict'

import React, { Component, PropTypes } from 'react'
import App from './App'

export default class Root extends Component {
  render() {
    return (
      <div id="main-container">
        { routes }
      </div>
    )
  }
}
