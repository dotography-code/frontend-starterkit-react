import React from 'react'
import { Router, Route, IndexRoute, IndexRedirect, hashHistory, browserHistory } from 'react-router'
import App from '../containers/App'
import { SampleDashboard } from '../components/sample/SampleContent'

const routes = (
  <Router history={browserHistory} >
    <Route path="/" component={App}>
      <IndexRoute component={SampleDashboard} />
    </Route>
  </Router>
)

export default routes
