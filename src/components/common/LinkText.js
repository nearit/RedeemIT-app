import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const LinkText = ({onPress, children, style}) => {
  const {linkStyle, textStyle} = styles

  return (
    <TouchableOpacity onPress={onPress} style={linkStyle}>
      <Text style={[textStyle, style]}>
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
