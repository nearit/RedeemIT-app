import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Spinner from 'react-native-spinkit'

const renderContent = (text, textStyle, isLoading) => {
  const {textLabelStyle} = styles

  if (isLoading) {
    return (
      <Spinner
        type='Pulse'
        color='#FFFFFF'
      />
    )
  }

  return (
    <Text style={[textLabelStyle, textStyle]}>
      {text}
    </Text>
  )
}

const RoundedButton = ({style, textStyle, onPress, children, loading}) => {
  const {buttonStyle, buttonLoadingStyle} = styles

  let btnStyle = [buttonStyle, style]
  if (loading) {
    btnStyle.push(buttonLoadingStyle)
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={btnStyle}
    >
      {renderContent(children, textStyle, loading)}
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
    width: 250,
    backgroundColor: '#9f92ff',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonLoadingStyle: {
    width: 50
  }
}

export { RoundedButton }
