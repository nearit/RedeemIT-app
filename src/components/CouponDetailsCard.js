import React from 'react'
import { View, Text } from 'react-native'
import moment from 'moment'
import { Card, CardSection, NrtImage, RoundedButton } from '../components/common'

const renderValidityPeriod = ({redeemable_from, expires_at}) => {
  let validity_period_text = ''

  if (redeemable_from) {
    validity_period_text = 'dal ' + moment(redeemable_from).format('DD/MM/YYYY') + ' '
  }

  if (expires_at) {
    validity_period_text = validity_period_text + 'fino al ' + moment(expires_at).format('DD/MM/YYYY')
  }

  return (
    <Text>{validity_period_text}</Text>
  )
}

const renderCouponStatus = (coupon) => {
  return (
    <Text>Test</Text>
  )
}

const renderActionsButtons = ({onOkPress, onCancelPress}) => {
  return (
    <RoundedButton onPress={onCancelPress}>Test</RoundedButton>
  )
}

const CouponDetailsCard = (props) => {
  const {coupon} = props
  const {
    cardStyle,
    iconSectionStyle,
    iconStyle,
    titleSectionStyle,
    titleStyle,
    valueSectionStyle,
    valueStyle,
    fillerSectionStyle
  } = styles

  return (
    <Card style={cardStyle}>

      <CardSection style={iconSectionStyle}>
        <NrtImage
          imageId={coupon.icon_id}
          style={iconStyle}
        />
      </CardSection>

      <CardSection style={titleSectionStyle}>
        <Text style={titleStyle}>{coupon.name}</Text>
      </CardSection>

      <CardSection style={valueSectionStyle}>
        <Text style={valueStyle}>{coupon.value}</Text>
      </CardSection>

      <CardSection>
        <Text>Validità:</Text>
      </CardSection>

      <CardSection>
        {renderValidityPeriod(coupon)}
      </CardSection>

      <CardSection style={fillerSectionStyle}>
        <Text>Filler goes here</Text>
      </CardSection>

      <CardSection>
        {renderCouponStatus(coupon)}
      </CardSection>

      <CardSection>
        {renderActionsButtons(props)}
      </CardSection>

    </Card>
  )
}

const styles = {
  cardStyle: {
    width: 300,
    backgroundColor: 'white',
  },
  iconSectionStyle: {
    justifyContent: 'center'
  },
  iconStyle: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#333333'
  },
  titleSectionStyle: {
    marginTop: 25
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  valueSectionStyle: {
    marginTop: 20,
    marginBottom: 20
  },
  valueStyle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  fillerSectionStyle: {
    height: 20,
    marginTop: 27,
    marginBottom: 22,
  }

}

export default CouponDetailsCard