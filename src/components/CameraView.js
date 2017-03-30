import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import Camera from 'react-native-camera'
import { connect } from 'react-redux'
import { BorderView, Button, CardSection, Spacer } from './common'
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
      ViewFinderStyle,
      LogoutButtonContainerStyle,
      LogoutButtonWrapperStyle,
      LogoutButtonStyle,
      LogoutButtonIconStyle,
      LogoutButtonLabelStyle
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

        <CardSection style={LogoutButtonContainerStyle}>
          <View style={LogoutButtonWrapperStyle}>
            <Button
              onPress={this.onLogoutPress.bind(this)}
              style={LogoutButtonStyle}
            >
              <View style={LogoutButtonIconStyle}>
                <Image source={require('../assets/unlock.png')}/>
              </View>

              <Text style={LogoutButtonLabelStyle}>Logout</Text>

              <Spacer />
            </Button>
          </View>
        </CardSection>
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
  },
  LogoutButtonContainerStyle: {
    flex: 1
  },
  LogoutButtonWrapperStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  LogoutButtonStyle: {
    height: 70,
    backgroundColor: 'white',
    justifyContent: 'space-around'
  },
  LogoutButtonIconStyle: {
    flex: 1,
    alignItems: 'flex-end'
  },
  LogoutButtonLabelStyle: {
    flex: 1,
    color: '#9f92ff',
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center'
  }
}

const mapStateToProps = ({coupon}) => {
  const {loading} = coupon

  return {
    loading
  }
}

export default connect(mapStateToProps, {logoutUser, couponDetected})(CameraView)