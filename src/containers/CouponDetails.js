import React, { Component } from 'react'
import {
  BackAndroid,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View
} from 'react-native'
import I18n from 'react-native-i18n'
import { connect } from 'react-redux'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { couponReset, couponRedeem } from '../actions'
import { FooterBar, IconButton } from '../components/common'
import CouponDetailsCard from '../components/CouponDetailsCard'
import NetworkStateBanner from '../components/NetworkStateBanner'

class CouponDetails extends Component {
  constructor(props) {
    super(props)
    this.handleBack = this.handleBack.bind(this)
  }

  onRedeemButtonPressed() {
    const { serialCode, couponRedeem } = this.props

    couponRedeem(serialCode)
  }

  onCancelButtonPressed() {
    const { couponReset } = this.props

    couponReset()
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount() {
    //Forgetting to remove the listener will cause pop executes multiple times
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack() {
    this.onCancelButtonPressed()
    return true
  }

  renderButtons() {
    const { couponDetails, isConnected } = this.props

    if (!couponDetails.redeemable) {
      return (
        <FooterBar>
          <IconButton
            onPress={this.onCancelButtonPressed.bind(this)}
            label={I18n.t('close')}
            icon={require('../assets/close.png')}
          />
        </FooterBar>
      )
    }

    return (
      <FooterBar>
        <IconButton
          onPress={this.onRedeemButtonPressed.bind(this)}
          disabled={!isConnected}
          label={I18n.t('apply_coupon')}
          style={{
            backgroundColor: '#68c600'
          }}
          labelStyle={{ fontFamily: 'Asap-Bold', color: 'white' }}
        />

        <IconButton
          onPress={this.onCancelButtonPressed.bind(this)}
          disabled={!isConnected}
          label={I18n.t('dont_apply_coupon')}
          labelStyle={{ fontFamily: 'Asap-Bold' }}
        />
      </FooterBar>
    )
  }

  render() {
    const { couponDetails, isConnected } = this.props
    const { pageStyle, overlayStyle } = styles

    return (
      <ImageBackground
        source={require('../assets/background.jpg')}
        style={pageStyle}
      >
        <StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor={'rgba(0, 0, 0, 0.1)'}
        />

        <NetworkStateBanner isConnected={isConnected} />

        <View style={overlayStyle}>
          <CouponDetailsCard
            coupon={couponDetails}
            onCancelPress={this.onCancelButtonPressed.bind(this)}
            style={{ flex: 1 }}
          />
        </View>

        {this.renderButtons()}
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  pageStyle: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  overlayStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#000D',
    ...ifIphoneX(
      {
        paddingTop: 62
      },
      {
        paddingTop: 40
      }
    )
  }
})

const mapStateToProps = ({ coupon, connection }) => {
  const { error, serialCode, couponDetails, redeemStatus } = coupon
  const { isConnected } = connection

  return { error, serialCode, couponDetails, redeemStatus, isConnected }
}

export default connect(mapStateToProps, {
  couponReset,
  couponRedeem
})(CouponDetails)
