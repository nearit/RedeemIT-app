import React, { Component, Children } from 'react'
import { View, NetInfo } from 'react-native'
import { connect } from 'react-redux'
import { connectionStateChanged } from '../actions'

class NetworkInfoProvider extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    const { connectionStateChanged } = this.props

    connectionStateChanged()

    NetInfo.isConnected.addEventListener('change', this.handleChange)
  }

  componentWillUnmount () {
    NetInfo.isConnected.removeEventListener('change', this.handleChange)
  }

  handleChange () {
    const { connectionStateChanged } = this.props
    connectionStateChanged()
  }

  render () {
    return Children.only(this.props.children)
  }
}

export default connect(null, { connectionStateChanged })(NetworkInfoProvider)