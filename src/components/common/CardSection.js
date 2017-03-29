import React from 'react'
import { View } from 'react-native'

const CardSection = (props) => {
  const containerStyle = {...styles.container, ...props.style}

  return (
    <View style={containerStyle}>
      {props.children}
    </View>
  )
}

const styles = {
  container: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative'
  }
}

export { CardSection }
