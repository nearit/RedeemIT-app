import React, { Component } from 'react'
import { StatusBar, View, Image, BackAndroid } from 'react-native'
import { connect } from 'react-redux'
import { couponReset, couponRedeem } from '../actions'
import { Spacer, FooterBar, IconButton } from '../components/common'
import CouponDetailsCard from '../components/CouponDetailsCard'

class CouponDetails extends Component {

  constructor(props) {
    super(props)
      this.handleBack = this.handleBack.bind(this)
  }

  onRedeemButtonPressed () {
    const {serialCode, couponRedeem} = this.props

    couponRedeem(serialCode)
  }

  onCancelButtonPressed () {
    const {couponReset} = this.props

    couponReset()
  }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
    }


    componentWillUnmount() {
        //Forgetting to remove the listener will cause pop executes multiple times
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBack);
    }

    handleBack() {
        this.onCancelButtonPressed()
        return true;
    }

  renderButtons () {
    const {couponDetails} = this.props

    if (!couponDetails.redeemable) {
      return (
        <FooterBar>
          <IconButton
            onPress={this.onCancelButtonPressed.bind(this)}
            label='Chiudi'
            icon={require('../assets/close.png')}
          />
        </FooterBar>
      )
    }

    return (
      <FooterBar>
        <IconButton
          onPress={this.onRedeemButtonPressed.bind(this)}
          label='Applica coupon'
          style={{backgroundColor: '#68c600'}}
          labelStyle={{color: 'white'}}
        />

        <IconButton
          onPress={this.onCancelButtonPressed.bind(this)}
          label='Non applicare'
        />
      </FooterBar>
    )
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

        <StatusBar barStyle='light-content'/>

        <View style={overlayStyle}>
          <Spacer />

          <CouponDetailsCard
            coupon={couponDetails}
            onCancelPress={this.onCancelButtonPressed.bind(this)}
            style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}
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
  const {error, serialCode, couponDetails, redeemStatus} = coupon

  return {error, serialCode, couponDetails, redeemStatus}
}

export default connect(mapStateToProps, {couponReset, couponRedeem})(CouponDetails)