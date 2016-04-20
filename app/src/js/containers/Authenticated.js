'user restrict'

import React, { Component } from 'react'
import { routerShape } from 'react-router'

export function requireAuthentication(TargetComponent, isAuthenticated) {

  class AuthenticatedComponent extends Component {

    componentWillMount() {
      this.checkAuth();
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth();
    }

    checkAuth() {
      if( !isAuthenticated() ) {
        let redirectAfterLogin = this.props.location.pathname;
        this.context.router.push({
          pathname: '/login',
          query: { next: redirectAfterLogin }
        })
      }
    }

    render() {
      if( isAuthenticated() === true ) {
        return (
          <div>
            <TargetComponent {...this.props}/>
          </div>
        )
      } else {
        return null
      }
    }

  }

  AuthenticatedComponent.contextTypes = {
    router: routerShape.isRequired
  }

  return AuthenticatedComponent
}
