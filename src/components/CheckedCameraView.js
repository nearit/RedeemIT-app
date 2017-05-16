import React, { Component } from 'react'
import { Platform, View, Text } from 'react-native'
import I18n from 'react-native-i18n'
import Camera from 'react-native-camera'
import { CardSection, Spacer } from '../components/common'

class CheckedCameraView extends Component {

  state = {
    cameraAvailable: false
  }

  componentWillMount () {
    this.allowCameraCheck = true
  }

  componentWillUnmount () {
    this.allowCameraCheck = false
  }

  checkCamera () {
    if (this.allowCameraCheck) {
      if (Platform.OS === 'ios') {
        Camera.checkVideoAuthorizationStatus()
              .then((cameraAvailable) => {
                if (this.allowCameraCheck) {
                  this.setState({ cameraAvailable })
                }
              })
              .catch(() => {
                if (this.allowCameraCheck) {
                  this.setState({ cameraAvailable: false })
                }
              })
      } else if (this.allowCameraCheck) {
        this.setState({ cameraAvailable: true })
      }
    }
  }

  renderCameraView () {
    const { cameraAvailable } = this.state

    if (cameraAvailable) {
      return (
        <Camera {...this.props}>
          {this.props.children}
        </Camera>
      )
    }
    else {
      this.checkCamera()
    }

    return (
      <View style={{ ...this.props.style }}>
        <CardSection style={styles.PermissionTextContainerStyle}>
          <Text style={styles.PermissionTextStyle}>
            {I18n.t('camera_permission_missing')}
          </Text>
        </CardSection>

        <Spacer />

      </View>
    )
  }

  render () {
    return this.renderCameraView()
  }

}

const styles = {
  PermissionTextContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  PermissionTextStyle: {
    fontFamily: 'Asap',
    fontSize: 18,
    fontWeight: 'bold'
  }
}

export default CheckedCameraView