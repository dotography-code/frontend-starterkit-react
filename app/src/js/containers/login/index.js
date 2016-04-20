import './login.scss'

import React, { Component } from 'react'
import { login, loggedIn } from '../../routes/auth'
import * as validator from '../../utils/validation'
import { routerShape } from 'react-router'
import { map } from 'lodash'


export default class Login extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      error: false,
      process: false
    }
  }

  redirectToLocation() {
    const { location } = this.props
    if (location.state && location.state.nextPathname) {
      this.context.router.replace(location.state.nextPathname)
    } else {
      this.context.router.replace('/')
    }
  }

  componentDidMount() {
    loggedIn() && this.redirectToLocation()
  }

  isValidForm() {
    const { email, password }= this.refs;

    const error = []

    if( email.value.trim().length <= 0 ) {
      error.push('Email is required.')
    } else if( !validator.isEmail(email.value) ) {
      error.push('Invalid Email address')
    }

    if( password.value.trim().length <= 0 ) {
      error.push('Password is required.')
    }

    return error.length > 0 ? error : true
  }

  doLogin(event) {
    const { email, password }= this.refs;

    this.setState({ error: false })
    const valid = this.isValidForm()
    if( valid === true ) {
      this.setState({ process: true })
      login(email.value, password.value)
        .then(
          data =>  this.redirectToLocation()
          ,error => this.setState({ error, process: false })
        )
    } else {
      this.setState({ error: valid, process: false })
    }

    event.preventDefault()
    return false
  }

  renderError(error) {
    return (
      <ul className="error-messages">
        {
          map(error, (error, key) => <li key={key} >{ error }</li>)
        }
      </ul>
    )

  }

  render() {
    return (
      <div id="login-form" className="container">
        <div className="login">
          <form onSubmit={this.doLogin.bind(this)} method="POST">
            <h1>Log in</h1>
            <div className="form-item">
              <input type="text" ref="email" name="username" placeholder="Email address" />
            </div>
            <div className="form-item">
              <input type="password" ref="password" name="password" placeholder="Password" />
            </div>

            { this.state.error !== false ? this.renderError(this.state.error) : null }
            <div className="form-submit">
              <button disabled={this.state.process} >{ this.state.process !== false ?  'Please wait...'  : 'Log in' }</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

Login.contextTypes = {
  router: routerShape.isRequired
}
