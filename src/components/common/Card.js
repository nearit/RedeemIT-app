import React from 'react'
import { View } from 'react-native'

const Card = ({ style, children }) => {
  const mergedStyle = { ...styles.containerStyle, ...style }

  return (
    <View style={mergedStyle}>
      {children}
    </View>
  )
}

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#DDD',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 25,
    paddingRight: 25
  }
}

export { Card }
