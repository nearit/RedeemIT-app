import React, { Component } from 'react'
import { StatusBar, View, Image, Text, BackAndroid } from 'react-native'
import I18n from 'react-native-i18n'
import { connect } from 'react-redux'
import { BorderView, CardSection, RoundedButton } from '../components/common'
import { couponReset } from '../actions'

class CouponResult extends Component {

  constructor (props) {
    super(props)
    this.handleBack = this.handleBack.bind(this)
  }

  onButtonPressed () {
    const {couponReset} = this.props

    couponReset()
  }

  renderCouponStatusIcon () {
    const {error} = this.props

    if (error) {
      return (
        <Image
          source={require('../assets/error.png')}
        />
      )
    }

    return (
      <Image
        source={require('../assets/success.png')}
      />
    )
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    //Forgetting to remove the listener will cause pop executes multiple times
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack () {
    this.onButtonPressed()
    return true
  }

  renderActionButton () {
    const {error} = this.props
    const {actionButtonStyle, actionButtonLabelStyle} = styles

    if (error) {
      return (
        <RoundedButton
          style={actionButtonStyle}
          textStyle={actionButtonLabelStyle}
          onPress={this.onButtonPressed.bind(this)}
        >
          {I18n.t('retry')}
        </RoundedButton>
      )
    }

    return (
      <RoundedButton
        style={actionButtonStyle}
        textStyle={actionButtonLabelStyle}
        onPress={this.onButtonPressed.bind(this)}
      >
        {I18n.t('ok')}
      </RoundedButton>
    )
  }

  render () {
    const {error, redeemStatus} = this.props
    const {
      pageStyle,
      overlayStyle,
      baseResultContainerStyle,
      errorResultContainerStyle,
      successResultContainerStyle,
      resultTextStyle
    } = styles

    const additionalResultContainerStyle = error ? errorResultContainerStyle : successResultContainerStyle

    return (
      <Image
        source={require('../assets/background.png')}
        style={pageStyle}
      >

        <StatusBar barStyle='light-content'
                   translucent={true}
                   backgroundColor={'rgba(0, 0, 0, 0.1)'}/>

        <View style={overlayStyle}>
          <BorderView style={[baseResultContainerStyle, additionalResultContainerStyle]}>
            <CardSection>
              {this.renderCouponStatusIcon()}
            </CardSection>

            <CardSection>
              <Text style={resultTextStyle}>
                {redeemStatus}
              </Text>
            </CardSection>

            <CardSection>
              {this.renderActionButton()}
            </CardSection>
          </BorderView>
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
  const {error, redeemStatus} = coupon

  return {error, redeemStatus}
}

export default connect(mapStateToProps, {couponReset})(CouponResult)