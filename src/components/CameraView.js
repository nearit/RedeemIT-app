import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import Camera from 'react-native-camera'
import { connect } from 'react-redux'
import { BorderView, Button, CardSection, Spacer, FooterButton } from './common'
import { logoutUser, couponDetected } from '../actions'

class CameraView extends Component {

  onLogoutPress () {
    this.props.logoutUser()
  }

  onBarCodeRead ({data}) {
    const {loading, couponDetected} = this.props

    if (!loading) {
      couponDetected(data)
    }
  }

  render () {
    const {
      PageStyle,
      HintContainerStyle,
      HintStyle,
      ViewFinderContainerStyle,
      ViewFinderStyle
    } = styles

    return (
      <Camera
        style={PageStyle}
        aspect={Camera.constants.Aspect.fill}
        onBarCodeRead={(event) => this.onBarCodeRead(event)}>

        <CardSection style={HintContainerStyle}>
          <Text style={HintStyle}>Inquadra il QR code con la fotocamera</Text>
        </CardSection>

        <CardSection style={ViewFinderContainerStyle}>
          <BorderView style={ViewFinderStyle}/>
          <Button onPress={() => this.onBarCodeRead({data: '8A6305FD7A87'})}><Text>Test</Text></Button>
        </CardSection>

        <FooterButton
          onPress={this.onLogoutPress.bind(this)}
          label='Logout'
          icon={require('../assets/unlock.png')}
        />
      </Camera>
    )
  }

}

const styles = {
  PageStyle: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  HintContainerStyle: {
    flex: 1
  },
  HintStyle: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingRight: 20,
    paddingLeft: 20,
    textAlign: 'center'
  },
  ViewFinderContainerStyle: {
    flex: 2
  },
  ViewFinderStyle: {
    alignSelf: 'center',
    width: 300,
    height: 300
  }
}

const mapStateToProps = ({coupon}) => {
  const {loading} = coupon

  return {
    loading
  }
}

export default connect(mapStateToProps, {logoutUser, couponDetected})(CameraView)