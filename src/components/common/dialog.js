import React from 'react'
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'

export const Dialog = ({ children, opened, onClose }) => (
  <Modal visible={opened} transparent={true}>
    <TouchableWithoutFeedback onPress={onClose ? onClose : null}>
      <View style={styles.container}>
        <View style={styles.dialog}>{children}</View>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000056'
  },
  dialog: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center'
  }
})
