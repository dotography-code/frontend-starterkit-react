'user restrict'

import React, { Component, PropTypes } from 'react'
import routes from '../routes'

export default class Root extends Component {
  render() {
    return (
      <div id="main-container">
        { routes }
      </div>
    )
  }
}

