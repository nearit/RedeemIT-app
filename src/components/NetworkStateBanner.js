import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import I18n from 'react-native-i18n'
import { ifIphoneX } from 'react-native-iphone-x-helper'

const renderConnectionText = (isConnected, style) => {
  if (!isConnected) {
    const { Banner, BannerText } = styles

    return (
      <View style={[Banner, style]}>
        <Text style={BannerText}>{I18n.t('network_connection_missing')}</Text>
      </View>
    )
  }

  return <View />
}

export default (NetworkStateBanner = ({ isConnected, style }) => {
  return renderConnectionText(isConnected, style)
})

const styles = StyleSheet.create({
  Banner: {
    position: 'absolute',
    zIndex: 100,
    top: 0,
    left: 0,
    height: 68,
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#e91832',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 14,
    ...ifIphoneX({
      height: 85,
      paddingTop: 17
    })
  },
  BannerText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Asap',
    fontStyle: 'italic'
  }
})
