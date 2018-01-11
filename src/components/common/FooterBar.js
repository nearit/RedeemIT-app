import React from 'react'
import { StyleSheet } from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { CardSection } from './index'

const FooterBar = ({ children }) => (
  <CardSection style={styles.container}>{children}</CardSection>
)

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#FFF',
    bottom: 0,
    elevation: 5,
    flex: 1,
    left: 0,
    ...ifIphoneX({
      paddingBottom: 22
    })
  }
})

export { FooterBar }
