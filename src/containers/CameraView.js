import React, { Component } from 'react'
import { StatusBar, View, Text } from 'react-native'
import Camera from 'react-native-camera'
import Spinner from 'react-native-spinkit'
import I18n from 'react-native-i18n'
import { connect } from 'react-redux'
import {
  BorderView,
  CardSection,
  FooterBar,
  IconButton,
  Spacer,
  ConfirmDialog
} from '../components/common'
import NetworkStateBanner from '../components/NetworkStateBanner'
import CheckedCameraView from '../components/CheckedCameraView'
import { logoutUser, couponDetected } from '../actions/index'

class CameraView extends Component {
  state = {
    confirmLogout: false
  }

  onLogoutPress = () => {
    this.setState({ confirmLogout: true })
  }

  onConfirmLogout = () => {
    this.props.logoutUser()
  }

  onCancelLogout = () => {
    this.setState({ confirmLogout: false })
  }

  onBarCodeRead({ data }) {
    const { confirmLogout } = this.state
    const { serialCode, isConnected, couponDetected } = this.props

    if (!confirmLogout && !serialCode && isConnected) {
      couponDetected(data)
    }
  }

  renderLoader() {
    const { loading } = this.props

    if (loading) {
      return <Spinner type="Pulse" color="#9f92ff" size={150} />
    }
  }

  render() {
    const {
      PageStyle,
      CameraStyle,
      HintContainerStyle,
      HintStyle,
      ViewFinderContainerStyle,
      ViewFinderStyle,
      LogoutButtonLabelStyle
    } = styles

    const { confirmLogout } = this.state
    const { isConnected } = this.props

    return (
      <View style={PageStyle}>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor={'rgba(0, 0, 0, 0.1)'}
        />

        <NetworkStateBanner isConnected={isConnected} />

        <ConfirmDialog
          opened={confirmLogout}
          onConfirm={this.onConfirmLogout}
          onCancel={this.onCancelLogout}
          title={I18n.t('logout')}
          question={I18n.t('ask_logout_confirmation')}
        />

        <CheckedCameraView
          style={CameraStyle}
          aspect={Camera.constants.Aspect.fill}
          onBarCodeRead={event => this.onBarCodeRead(event)}
        >
          <CardSection style={HintContainerStyle}>
            <Text style={HintStyle}>{I18n.t('qr_code_hint')}</Text>
          </CardSection>

          <CardSection style={ViewFinderContainerStyle}>
            <BorderView style={ViewFinderStyle}>
              {this.renderLoader()}
            </BorderView>
          </CardSection>

          <Spacer />
        </CheckedCameraView>

        <FooterBar>
          <IconButton
            onPress={this.onLogoutPress.bind(this)}
            label={I18n.t('logout')}
            labelStyle={LogoutButtonLabelStyle}
            icon={require('../assets/unlock.png')}
          />
        </FooterBar>
      </View>
    )
  }
}

const styles = {
  PageStyle: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: 'transparent',
    flexDirection: 'column'
  },
  CameraStyle: {
    flex: 1,
    width: undefined,
    height: undefined,
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

const mapStateToProps = ({ coupon, connection }) => {
  const { serialCode, loading } = coupon
  const { isConnected } = connection

  return { serialCode, loading, isConnected }
}

export default connect(mapStateToProps, {
  logoutUser,
  couponDetected
})(CameraView)
