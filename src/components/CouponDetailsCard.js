import React from 'react'
import { View, Text, Image } from 'react-native'
import moment from 'moment'
import { Card, CardSection, NrtImage } from '../components/common'

const renderValidityPeriod = ({redeemable, expired, redeemable_from, expires_at}) => {
  const {validitySectionStyle, validityErrorStyle} = styles

  let textStyle = []

  let validity_period_text = ''

  if (redeemable_from) {
    validity_period_text = 'dal ' + moment(redeemable_from).format('DD/MM/YYYY') + ' '
  }

  if (expires_at) {
    validity_period_text = validity_period_text + 'fino al ' + moment(expires_at).format('DD/MM/YYYY')
  }

  if (!redeemable || expired) {
    textStyle.push(validityErrorStyle)
  }

  return (
    <View>
      <CardSection style={validitySectionStyle}>
        <Text style={textStyle}>Validità:</Text>
      </CardSection>

      <CardSection style={[validitySectionStyle, {paddingBottom: 25}]}>
        <Text style={textStyle}>{validity_period_text}</Text>
      </CardSection>

      <CardSection>
        <Image
          source={require('../assets/trapezio-bottom.png')}
        />
      </CardSection>
    </View>
  )
}

const renderCouponStatusSection = (coupon) => {
  const {statusSectionStyle, statusTextStyle, successStatusTextStyle} = styles
  const {expired, redeemed, redeemable} = coupon

  if (redeemed) {
    return (
      <CardSection style={[statusSectionStyle, {backgroundColor: 'white'}]}>
        <Text style={statusTextStyle}>COUPON GIA' UTILIZZATO</Text>
      </CardSection>
    )
  }

  if (!redeemable) {
    return (
      <View>
        <CardSection>
          <Image
            source={require('../assets/trapezio-top.png')}
          />
        </CardSection>

        <CardSection style={[statusSectionStyle, {backgroundColor: 'white'}]}>
          <Text style={statusTextStyle}>COUPON NON ATTIVO</Text>
        </CardSection>
      </View>
    )
  }

  if (expired) {
    return (
      <View>
        <CardSection>
          <Image
            source={require('../assets/trapezio-top.png')}
          />
        </CardSection>

        <CardSection style={statusSectionStyle}>
          <Text style={statusTextStyle}>COUPON SCADUTO</Text>
        </CardSection>
      </View>
    )
  }

  return (
    <View>
      <CardSection>
        <Image
          source={require('../assets/trapezio-top.png')}
        />
      </CardSection>

      <CardSection style={statusSectionStyle}>
        <Text style={[statusTextStyle, successStatusTextStyle]}>CODICE COUPON VALIDO</Text>
      </CardSection>
    </View>
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
    valueStyle
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

      {renderValidityPeriod(coupon)}

      {renderCouponStatusSection(coupon)}

    </Card>
  )
}

const styles = {
  cardStyle: {
    width: 300,
    borderWidth: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0
  },
  iconSectionStyle: {
    justifyContent: 'center',
    backgroundColor: 'white',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    paddingTop: 30
  },
  iconStyle: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#333333'
  },
  titleSectionStyle: {
    paddingTop: 25,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: 'white'
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  valueSectionStyle: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: 'white'
  },
  valueStyle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  validitySectionStyle: {
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: 'white'
  },
  validityErrorStyle: {
    color: '#e91832'
  },
  statusSectionStyle: {
    paddingTop: 20,
    paddingBottom: 25,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },
  statusTextStyle: {
    flex: 1,
    color: '#e91832',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  successStatusTextStyle: {
    color: '#68c600'
  }
}

export default CouponDetailsCard