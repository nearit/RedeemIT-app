import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import { BorderView, CardSection, RoundedButton } from '../components/common'

class CouponResult extends Component {

  render () {
    const {
      pageStyle,
      overlayStyle,
      resultContainerStyle,
      resultTextStyle,
      actionButtonStyle,
      actionButtonLabelStyle
    } = styles

    return (
      <Image
        source={require('../assets/background.png')}
        style={pageStyle}
      >
        <View style={overlayStyle}>
          <BorderView style={resultContainerStyle}>
            <CardSection>
              <Image
                source={require('../assets/error.png')}
              />
            </CardSection>

            <CardSection>
              <Text style={resultTextStyle}>{this.props.couponStatus}</Text>
            </CardSection>

            <CardSection>
              <RoundedButton
                style={actionButtonStyle}
                textStyle={actionButtonLabelStyle}
              >
                RIPROVA
              </RoundedButton>
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
  resultContainerStyle: {
    alignSelf: 'center',
    width: 300,
    height: 300,
    borderColor: '#e91832',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20
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
  const {couponStatus} = coupon

  return {couponStatus}
}

export default connect(mapStateToProps, null)(CouponResult)