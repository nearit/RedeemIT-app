import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import { BorderView, Button, Card, CardSection, MaterialInput, LinkText, RoundedButton, Spacer } from './common'

class CameraView extends Component {

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
      <Image
        source={require('../assets/background.png')}
        style={PageStyle}>

        <CardSection style={HintContainerStyle}>
          <Text style={HintStyle}>Inquadra il QR code con la fotocamera</Text>
        </CardSection>

        <CardSection style={ViewFinderContainerStyle}>
          <BorderView style={ViewFinderStyle}/>
        </CardSection>

        <CardSection style={LogoutButtonContainerStyle}>
          <View style={LogoutButtonWrapperStyle}>
            <Button style={LogoutButtonStyle}>
              <View style={LogoutButtonIconStyle}>
                <Image source={require('../assets/unlock.png')}/>
              </View>

              <Text style={LogoutButtonLabelStyle}>Logout</Text>

              <Spacer />
            </Button>
          </View>
        </CardSection>
      </Image>
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

export default connect(null, null)(CameraView)