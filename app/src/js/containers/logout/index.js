import React, { Component } from 'react'
import { logout } from '../../routes/auth'
import { routerShape } from 'react-router'

export default class Logout extends Component {

  doLogout() {
    logout( () => this.context.router.replace('/') )
  }

  componentDidMount() {
    this.doLogout()
  }

  render() {
    return null
  }
}

Logout.contextTypes = {
  router: routerShape.isRequired
}
