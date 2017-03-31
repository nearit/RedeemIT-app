import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { couponReset } from '../actions'
import { Button, FooterButton, Spacer, Card, CardSection } from '../components/common'
import CouponDetailsCard from '../components/CouponDetailsCard'

class CouponDetails extends Component {

  onRedeemButtonPressed () {
    Actions.pop()
  }

  onCancelButtonPressed () {
    const {couponReset} = this.props

    couponReset()
  }

  render () {
    const {couponDetails} = this.props
    const {
      pageStyle,
      overlayStyle
    } = styles

    return (
      <Image
        source={require('../assets/background.png')}
        style={pageStyle}
      >
        <View style={overlayStyle}>
          <Spacer />

          <CouponDetailsCard
            coupon={couponDetails}
            onCancelPress={this.onCancelButtonPressed.bind(this)}
            style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}
          />

          <FooterButton
            onPress={this.onCancelButtonPressed.bind(this)}
            label='Chiudi'
            icon={require('../assets/close.png')}
          />
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
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 20,
    fontWeight: 'bold',
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

const mapStateToProps = ({coupon}) => {
  const {error, couponDetails, redeemStatus} = coupon

  return {error, couponDetails, redeemStatus}
}

export default connect(mapStateToProps, {couponReset})(CouponDetails)