import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const RoundedButton = ({style, textStyle, onPress, children}) => {
  const {buttonStyle, textLabelStyle} = styles

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, style]}>
      <Text style={[textLabelStyle, textStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

const styles = {
  textLabelStyle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonStyle: {
    flex: 1,
    backgroundColor: '#9f92ff',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export { RoundedButton }
