import React from 'react'
import { Router, Route, IndexRoute, IndexRedirect, hashHistory, browserHistory } from 'react-router'
import App from '../containers/App'
import Login from '../containers/login'
import Logout from '../containers/logout'
import Dashboard from '../containers/dashboard'
import { requireAuthentication } from '../containers/Authenticated'
import { SampleDashboard } from '../components/sample/SampleContent'
import ErrorPage from '../components/ErrorPage'
import { loggedIn } from './auth'

const requireAuth = (nextState, replace) => {

  if (!loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

const routes = (
  <Router history={browserHistory} >
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} onEnter={requireAuth} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="*" component={ErrorPage} />
    </Route>
  </Router>
)

export default routes
