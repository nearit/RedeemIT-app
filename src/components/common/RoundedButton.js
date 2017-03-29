import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const RoundedButton = ({ style, onPress, children }) => {
  const { buttonStyle, textStyle } = styles

  const btnStyle = { ...buttonStyle, ...style }

  return (
    <TouchableOpacity onPress={onPress} style={btnStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

const styles = {
  textStyle: {
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
