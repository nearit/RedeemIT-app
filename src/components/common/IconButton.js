import React from 'react'
import { View, Text, Image } from 'react-native'
import { Button } from './Button'
import { Spacer } from './Spacer'

const renderSpacer = (icon) => {
  if (icon) {
    return <Spacer />
  }
}

const renderIcon = (icon) => {
  const {ButtonIconStyle} = styles

  if (icon) {
    return (
      <View style={ButtonIconStyle}>
        <Image source={icon}/>
      </View>
    )
  }
}

const IconButton = ({label, icon, onPress, disabled, style, labelStyle}) => {
  const {
    ButtonWrapperStyle,
    ButtonStyle,
    ButtonLabelStyle
  } = styles

  return (
    <View style={ButtonWrapperStyle}>
      <Button
        onPress={() => !disabled ? onPress() : null}
        style={[ButtonStyle, style]}
      >

        {renderSpacer(icon)}

        <Text style={[ButtonLabelStyle, labelStyle]}>{label}</Text>

        {renderIcon(icon)}

      </Button>
    </View>
  )
}

const styles = {
  ButtonWrapperStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  ButtonStyle: {
    backgroundColor: 'white',
    justifyContent: 'space-around',
    height: 70
  },
  ButtonIconStyle: {
    flex: 1,
    alignItems: 'center'
  },
  ButtonLabelStyle: {
    flex: 1,
    color: '#9f92ff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }
}

export { IconButton }