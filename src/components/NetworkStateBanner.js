import React from 'react'
import { View, Text } from 'react-native'
import I18n from 'react-native-i18n'

const renderConnectionText = (isConnected, style) => {
  if (!isConnected) {
    const { BannerStyle, BannerTextStyle } = styles

    return (
      <View style={{ ...BannerStyle, ...style }}>
        <Text style={BannerTextStyle}>
          {I18n.t('network_connection_missing')}
        </Text>
      </View>
    )
  }

  return <View />
}

export default NetworkStateBanner = ({ isConnected, style }) => {
  return renderConnectionText(isConnected, style)
}

const styles = {
  BannerStyle: {
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
    paddingBottom: 14
  },
  BannerTextStyle: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Asap',
    fontStyle: 'italic'
  }
}