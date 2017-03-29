import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const LinkText = ({ textColor, onPress, children }) => {
  const { linkStyle, textStyle } = styles
  const linkTextColor = textColor || textStyle.color

  return (
    <TouchableOpacity onPress={onPress} style={linkStyle}>
      <Text style={{ ...textStyle, color: linkTextColor }}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#9f92ff',
    fontSize: 14,
    fontWeight: '600'
  },
  linkStyle: {
    flex: 1,
    alignSelf: 'stretch'
  }
}

export { LinkText }
