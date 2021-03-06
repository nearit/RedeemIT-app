import React, { Component } from 'react'
import {
  Linking,
  StatusBar,
  KeyboardAvoidingView,
  Text,
  ImageBackground
} from 'react-native'
import { connect } from 'react-redux'
import { MKCheckbox } from 'react-native-material-kit'
import * as Keychain from 'react-native-keychain'
import SnackBar from 'react-native-snackbar-component'
import I18n from 'react-native-i18n'
import { NRT_PASSWORD_RECOVERY_URL } from 'react-native-dotenv'
import SafariView from 'react-native-safari-view'
import {
  Card,
  CardSection,
  MaterialInput,
  LinkText,
  RoundedButton
} from '../components/common/index'
import NetworkStateBanner from '../components/NetworkStateBanner'
import { emailChanged, passwordChanged, loginUser } from '../actions/index'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = { storeCredentials: false }
  }

  componentDidMount() {
    Keychain.getGenericPassword().then(({ username: email, password }) => {
      let storeCredentials = false
      if (email && password) {
        const { emailChanged, passwordChanged } = this.props

        storeCredentials = true

        emailChanged(email)
        passwordChanged(password)
      }

      this.setState({ storeCredentials })
    })
  }

  _dismissSafariView = () => {
    SafariView.dismiss()
    Linking.removeEventListener('url', this._dismissSafariView)
  }

  openPasswordRecoveryPage() {
    SafariView.isAvailable()
      .then(() => {
        Linking.addEventListener('url', this._dismissSafariView)

        SafariView.show({
          url: NRT_PASSWORD_RECOVERY_URL,
          tintColor: '#F2F2F2',
          barTintColor: '#9F92FF',
          fromBottom: true
        })
      })
      .catch(() => {
        Linking.openURL(NRT_PASSWORD_RECOVERY_URL).catch(err => {
          // Could not open Password Recovery URL
        })
      })
  }

  _releaseInputFocus() {
    // Release focus from fields
    this.emailField.blur()
    this.passwordField.blur()
  }

  onStoreChecked() {
    this._releaseInputFocus()

    const { storeCredentials } = this.state
    this.setState({ storeCredentials: !storeCredentials })
  }

  onLoginPress() {
    this._releaseInputFocus()

    const { email, password } = this.props
    const { storeCredentials } = this.state

    if (storeCredentials) {
      // Store credentials inside Keychain
      Keychain.setGenericPassword(email, password)
    } else {
      // Reset credentials otherwise
      Keychain.resetGenericPassword()
    }

    this.props.loginUser({ email, password })
  }

  render() {
    const {
      pageStyle,
      loginFormStyle,
      checkboxContainerStyle,
      checkboxStyle,
      checkboxTextStyle,
      linkContainerStyle,
      linkTextStyle,
      buttonContainerStyle,
      buttonTextStyle
    } = styles

    const { storeCredentials } = this.state

    const { email, password, error, loading, isConnected } = this.props

    return (
      <ImageBackground
        source={require('../assets/background.jpg')}
        style={pageStyle}
      >
        <StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor={'rgba(0, 0, 0, 0.1)'}
        />

        <NetworkStateBanner isConnected={isConnected} />

        <Card style={loginFormStyle}>
          <KeyboardAvoidingView behavior="padding">
            <CardSection>
              <MaterialInput
                internalRef={input => {
                  if (input != null) {
                    this.emailField = input
                  }
                }}
                label="EMAIL"
                value={email}
                onChangeText={this.props.emailChanged}
                autoCorrect={false}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </CardSection>

            <CardSection>
              <MaterialInput
                internalRef={input => {
                  if (input != null) {
                    this.passwordField = input
                  }
                }}
                label="PASSWORD"
                value={password}
                onChangeText={this.props.passwordChanged}
                secureTextEntry
              />
            </CardSection>
          </KeyboardAvoidingView>

          <CardSection style={linkContainerStyle}>
            <LinkText
              style={linkTextStyle}
              onPress={() => this.openPasswordRecoveryPage()}
            >
              {I18n.t('forgot_password')}
            </LinkText>
          </CardSection>

          <CardSection style={checkboxContainerStyle}>
            <MKCheckbox
              checked={storeCredentials}
              onCheckedChange={() => this.onStoreChecked()}
              style={checkboxStyle}
            />
            <Text
              onPress={() => this.onStoreChecked()}
              style={checkboxTextStyle}
            >
              {I18n.t('store_credentials')}
            </Text>
          </CardSection>

          <CardSection style={buttonContainerStyle}>
            <RoundedButton
              onPress={() => this.onLoginPress()}
              loading={loading}
              disabled={!isConnected}
              textStyle={buttonTextStyle}
            >
              OK
            </RoundedButton>
          </CardSection>
        </Card>

        <SnackBar
          visible={error}
          textMessage={error !== null ? I18n.t(error) : ''}
          backgroundColor="#E91832"
        />
      </ImageBackground>
    )
  }
}

const styles = {
  pageStyle: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginFormStyle: {
    width: 300,
    backgroundColor: 'white',
    alignSelf: 'center',
    paddingTop: 0,
    paddingBottom: 25
  },
  iconContainerStyle: {
    justifyContent: 'center'
  },
  iconStyle: {
    width: 18,
    height: 20
  },
  checkboxContainerStyle: {
    marginTop: 10,
    marginLeft: -10,
    marginBottom: 20,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  checkboxStyle: {},
  checkboxTextStyle: {
    fontFamily: 'Asap-Italic',
    color: '#777',
    fontSize: 14
  },
  linkContainerStyle: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'flex-start'
  },
  linkTextStyle: {
    alignSelf: 'flex-start',
    fontFamily: 'Asap-MediumItalic',
    fontSize: 14
  },
  buttonContainerStyle: {
    height: 50,
    alignSelf: 'center'
  },
  buttonTextStyle: {
    fontFamily: 'Asap-Bold'
  }
}

const mapStateToProps = ({ auth, connection }) => {
  const { email, password, error, loading } = auth
  const { isConnected } = connection

  return { email, password, error, loading, isConnected }
}

const mapActionsToProps = {
  emailChanged,
  passwordChanged,
  loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(LoginForm)
