import React, { Component } from 'react'
import { clearToken } from '../../routes/auth'
import { routerShape } from 'react-router'

export default class Dashboard extends Component {

  doLogout() {
    this.context.router.replace('/logout')
  }

  render() {
    return (
      <div id="dashboard" className="container">
        <div class="inner-container">
        Dashboard
        <button onClick={this.doLogout.bind(this)}>Log out</button>
        </div>
      </div>
    )
  }
}

Dashboard.contextTypes = {
  router: routerShape.isRequired
}
