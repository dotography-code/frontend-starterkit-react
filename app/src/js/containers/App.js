'user restrict'

import React, { Component } from 'react'
import { Link } from 'react-router'

class App extends Component {

  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

  }

  render() {
    const { children } = this.props;
    return (
      <div>
        { children }
      </div>
    );
  }
}

export default App
