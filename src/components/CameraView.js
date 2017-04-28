import React, { Component } from 'react'
import { StatusBar, Text, BackAndroid } from 'react-native'
import Camera from 'react-native-camera'
import Spinner from 'react-native-spinkit'
import I18n from 'react-native-i18n'
import { connect } from 'react-redux'
import { BorderView, CardSection, FooterBar, IconButton, Spacer } from './common'
import { logoutUser, couponDetected } from '../actions'

class CameraView extends Component {

  onLogoutPress () {
    this.props.logoutUser()
  }

  onBarCodeRead ({data}) {
    const {serialCode, couponDetected} = this.props

    if (!serialCode) {
      couponDetected(data)
    }
  }

  renderLoader () {
    const {loading} = this.props

    if (loading) {
      return (
        <Spinner
          type='Pulse'
          color='#9f92ff'
          size={150}
        />
      )
    }
  }

  render () {
    const {
      PageStyle,
      HintContainerStyle,
      HintStyle,
      ViewFinderContainerStyle,
      ViewFinderStyle,
      LogoutButtonLabelStyle
    } = styles

    return (
      <Camera
        style={PageStyle}
        aspect={Camera.constants.Aspect.fill}
        onBarCodeRead={(event) => this.onBarCodeRead(event)}>

        <StatusBar barStyle='light-content'
                   translucent={true}
                   backgroundColor={'rgba(0, 0, 0, 0.1)'}/>

        <CardSection style={HintContainerStyle}>
          <Text style={HintStyle}>{I18n.t('qr_code_hint')}</Text>
        </CardSection>

        <CardSection style={ViewFinderContainerStyle}>
          <BorderView style={ViewFinderStyle}>
            {this.renderLoader()}
          </BorderView>
        </CardSection>

        <Spacer />

        <FooterBar>
          <IconButton
            onPress={this.onLogoutPress.bind(this)}
            label={I18n.t('logout')}
            labelStyle={LogoutButtonLabelStyle}
            icon={require('../assets/unlock.png')}
          />
        </FooterBar>
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
    fontFamily: 'Asap-Bold',
    fontSize: 20,
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
    height: 300,
    alignItems: 'center',
    justifyContent: 'center'
  },
  LogoutButtonLabelStyle: {
    fontFamily: 'Asap-Bold'
  }
}

const mapStateToProps = ({coupon}) => {
  const {serialCode, loading} = coupon

  return {serialCode, loading}
}

export default connect(mapStateToProps, {logoutUser, couponDetected})(CameraView)