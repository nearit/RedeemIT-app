import React from 'react'
import { View, Text, Image } from 'react-native'
import I18n from 'react-native-i18n'
import moment from 'moment'
import { Card, CardSection, NrtImage } from '../components/common'

const renderValidityPeriod = ({expired, redeemable_from, expires_at}) => {
  const {validitySectionStyle, validityTextStyle, validityErrorStyle} = styles

  let textStyle = [validityTextStyle]

  let validity_period_text = ''

  if (redeemable_from) {
    validity_period_text = I18n.t('from') + ' ' + moment(redeemable_from).format('DD/MM/YYYY') + ' '
  }

  if (expires_at) {
    validity_period_text = validity_period_text + I18n.t('to') + ' ' + moment(expires_at).format('DD/MM/YYYY')
  }

  if (expired) {
    textStyle.push(validityErrorStyle)
  }

  return (
    <View>
      <CardSection style={validitySectionStyle}>
        <Text style={textStyle}>{I18n.t('validity')}:</Text>
      </CardSection>

      <CardSection style={[validitySectionStyle, {paddingBottom: 25}]}>
        <Text style={textStyle}>{validity_period_text}</Text>
      </CardSection>
    </View>
  )
}

const renderCouponDescription = ({redeemable, description}) => {
  const {descriptionSectionStyle, descriptionTextStyle} = styles

  if (redeemable) {
    return (
      <CardSection style={descriptionSectionStyle}>
        <Text style={descriptionTextStyle}>{description}</Text>
      </CardSection>
    )
  }
}

const renderCouponStatusSection = ({expired, redeemed, redeemable}) => {
  const {statusSectionStyle, statusTextStyle, successStatusTextStyle} = styles

  if (redeemed) {
    return (
      <CardSection style={statusSectionStyle}>
        <Text style={statusTextStyle}>{I18n.t('coupon_code_redeemed')}</Text>
      </CardSection>
    )
  }

  if (!redeemable) {
    return (
      <View>
        <CardSection>
          <Image
            source={require('../assets/coupon-border-lower.png')}
          />
        </CardSection>

        <CardSection style={[statusSectionStyle, {backgroundColor: 'white'}]}>
          <Text style={statusTextStyle}>{I18n.t('coupon_inactive')}</Text>
        </CardSection>
      </View>
    )
  }

  if (expired) {
    return (
      <View>
        <CardSection>
          <Image
            source={require('../assets/coupon-border-lower.png')}
          />
        </CardSection>

        <CardSection style={statusSectionStyle}>
          <Text style={statusTextStyle}>{I18n.t('coupon_expired')}</Text>
        </CardSection>
      </View>
    )
  }

  return (
    <View>
      <CardSection>
        <Image
          source={require('../assets/coupon-border-lower.png')}
        />
      </CardSection>

      <CardSection style={[statusSectionStyle, {backgroundColor: 'white'}]}>
        <Text style={[statusTextStyle, successStatusTextStyle]}>{I18n.t('invalid_coupon_code')}</Text>
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
          defaultImage={require('../assets/coupon-default.png')}
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

      {renderCouponDescription(coupon)}

      <CardSection>
        <Image
          source={require('../assets/coupon-border-upper.png')}
        />
      </CardSection>

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
    fontWeight: 'bold',
    lineHeight: 18
  },
  validitySectionStyle: {
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: 'white'
  },
  validityTextStyle: {
    fontSize: 13,
    lineHeight: 17
  },
  validityErrorStyle: {
    color: '#e91832'
  },
  descriptionSectionStyle: {
    paddingBottom: 20,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: 'white'
  },
  descriptionTextStyle: {
    fontSize: 15,
    lineHeight: 18
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
    textAlign: 'center',
    lineHeight: 27
  },
  successStatusTextStyle: {
    color: '#68c600'
  }
}

export default CouponDetailsCard