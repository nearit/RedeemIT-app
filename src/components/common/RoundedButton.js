import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const RoundedButton = ({style, textStyle, onPress, children}) => {
  const {buttonStyle, textLabelStyle} = styles

  const btnStyle = {...buttonStyle, ...style}
  const txtStyle = {...textLabelStyle, ...textStyle}

  return (
    <TouchableOpacity onPress={onPress} style={btnStyle}>
      <Text style={txtStyle}>
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
