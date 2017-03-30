import React from 'react'
import { View } from 'react-native'

const BorderView = (props) => {
  return (
    <View style={{...styles.BorderStyle, ...props.style}}>
      {props.children}
    </View>
  )
}

const styles = {
  BorderStyle: {
    borderWidth: 7,
    borderColor: 'white',
    borderRadius: 5
  }
}

export { BorderView }