import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import { BorderView } from '../components/common'

class CouponResult extends Component {

  render () {
    const {pageStyle} = styles

    return (
      <Image
        source={require('../assets/background.png')}
        style={pageStyle}>
        <View>
          <BorderView>
            <Text>{this.props.couponStatus}</Text>
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
    height: undefined,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  resultContainerStyle: {

  }
}

const mapStateToProps = ({coupon}) => {
  const {couponStatus} = coupon

  return {couponStatus}
}

export default connect(mapStateToProps, null)(CouponResult)