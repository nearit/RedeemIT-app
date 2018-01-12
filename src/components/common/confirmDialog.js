import React from 'react'
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import I18n from 'react-native-i18n'
import { RoundedButton } from './RoundedButton'
import { Dialog } from './dialog'

export const ConfirmDialog = ({ opened, icon, onConfirm, onCancel, question, title }) => (
  <Dialog opened={opened} onClose={onCancel}>
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Text style={styles.titleText}>{title}</Text>
      <Text style={[styles.text, styles.descriptionText]}>{question}</Text>
      <RoundedButton
        style={styles.actionButtonStyle}
        textStyle={styles.confirmButtonLabel}
        onPress={onConfirm}
      >
        {I18n.t('confirm')}
      </RoundedButton>
      <RoundedButton
        style={[styles.actionButtonStyle, styles.cancelButton]}
        textStyle={styles.actionButtonLabelStyle}
        onPress={onCancel}
      >
        {I18n.t('cancel')}
      </RoundedButton>
    </View>
  </Dialog>
)

const styles = StyleSheet.create({
  icon: {
    width: 35,
    height: 30,
    resizeMode: 'contain',
    marginBottom: 16
  },
  titleText: {
    color: '#333',
    fontFamily: 'Asap-Bold',
    fontSize: 20
  },
  text: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 21
  },
  descriptionText: {
    marginTop: 10,
    marginBottom: 10
  },
  actionButtonStyle: {
    height: 45,
    marginTop: 10,
    marginLeft: 25,
    marginRight: 25
  },
  cancelButton: {
    backgroundColor: '#A2A2A2'
  },
  confirmButtonLabel: {
    color: '#F2F2F2',
    fontFamily: 'Asap-Bold'
  },
  actionButtonLabelStyle: {
    color: '#333',
    fontFamily: 'Asap-Bold'
  }
})
