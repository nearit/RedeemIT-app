import React from 'react'
import { View, Text, Image } from 'react-native'
import { Button, CardSection, Spacer } from './index'

const FooterButton = ({onPress, label, icon}) => {
  const {
    LogoutButtonContainerStyle,
    LogoutButtonWrapperStyle,
    LogoutButtonStyle,
    LogoutButtonIconStyle,
    LogoutButtonLabelStyle
  } = styles

  return (
    <CardSection style={LogoutButtonContainerStyle}>
      <View style={LogoutButtonWrapperStyle}>
        <Button
          onPress={onPress}
          style={LogoutButtonStyle}
        >
          <Spacer />

          <Text style={LogoutButtonLabelStyle}>{label}</Text>

          <View style={LogoutButtonIconStyle}>
            <Image source={icon}/>
          </View>
        </Button>
      </View>
    </CardSection>
  )
}

const styles = {
  LogoutButtonContainerStyle: {
    flex: 1
  },
  LogoutButtonWrapperStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  LogoutButtonStyle: {
    height: 70,
    backgroundColor: 'white',
    justifyContent: 'space-around'
  },
  LogoutButtonIconStyle: {
    flex: 1,
    alignItems: 'center'
  },
  LogoutButtonLabelStyle: {
    flex: 1,
    color: '#9f92ff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }
}

export { FooterButton }