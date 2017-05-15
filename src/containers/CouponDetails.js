import React, { Component } from 'react'
import { StatusBar, View, Image, BackAndroid } from 'react-native'
import I18n from 'react-native-i18n'
import { connect } from 'react-redux'
import { couponReset, couponRedeem } from '../actions'
import { Spacer, FooterBar, IconButton } from '../components/common'
import CouponDetailsCard from '../components/CouponDetailsCard'
import NetworkStateBanner from '../components/NetworkStateBanner'

class CouponDetails extends Component {

  constructor (props) {
    super(props)
    this.handleBack = this.handleBack.bind(this)
  }

  onRedeemButtonPressed () {
    const { serialCode, couponRedeem } = this.props

    couponRedeem(serialCode)
  }

  onCancelButtonPressed () {
    const { couponReset } = this.props

    couponReset()
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    //Forgetting to remove the listener will cause pop executes multiple times
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack () {
    this.onCancelButtonPressed()
    return true
  }

  renderButtons () {
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
          style={{ backgroundColor: '#68c600' }}
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

  render () {
    const {
      couponDetails,
      isConnected
    } = this.props
    const {
      pageStyle,
      overlayStyle
    } = styles

    return (
      <Image
        source={require('../assets/background.png')}
        style={pageStyle}
      >

        <StatusBar barStyle='light-content'
                   translucent={true}
                   backgroundColor={'rgba(0, 0, 0, 0.1)'} />

        <View style={overlayStyle}>

          <NetworkStateBanner isConnected={isConnected} />

          <CouponDetailsCard
            coupon={couponDetails}
            onCancelPress={this.onCancelButtonPressed.bind(this)}
            style={{ flex: 1 }}
          />

          {this.renderButtons()}
        </View>
      </Image>
    )
  }

}

const styles = {
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
    paddingTop: 40,
    backgroundColor: '#000D'
  },
  baseResultContainerStyle: {
    alignSelf: 'center',
    width: 300,
    height: 300,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20
  },
  errorResultContainerStyle: {
    borderColor: '#e91832'
  },
  successResultContainerStyle: {
    borderColor: '#68c600'
  },
  resultTextStyle: {
    color: 'white',
    fontFamily: 'Asap-Bold',
    fontSize: 20,
    textAlign: 'center'
  },
  actionButtonStyle: {
    height: 50,
    marginLeft: 25,
    marginRight: 25,
    backgroundColor: 'white'
  },
  actionButtonLabelStyle: {
    color: 'black'
  }
}

const mapStateToProps = ({ coupon, connection }) => {
  const { error, serialCode, couponDetails, redeemStatus } = coupon
  const { isConnected } = connection

  return { error, serialCode, couponDetails, redeemStatus, isConnected }
}

export default connect(mapStateToProps, {
  couponReset,
  couponRedeem
})(CouponDetails)