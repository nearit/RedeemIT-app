import React from 'react'
import { TouchableOpacity } from 'react-native'

const Button = ({style, onPress, children}) => {
  const {buttonStyle} = styles

  return (
    <TouchableOpacity onPress={onPress} style={{...buttonStyle, ...style}}>
      {children}
    </TouchableOpacity>
  )
}

const styles = {
  buttonStyle: {
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export { Button }
