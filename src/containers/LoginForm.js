import React, { Component } from 'react'
import { StatusBar, KeyboardAvoidingView, Image } from 'react-native'
import { connect } from 'react-redux'
import { email } from 'react-native-communications'
import SnackBar from 'react-native-snackbar-component'
import I18n from 'react-native-i18n'
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

  openPasswordRecoveryPage () {
    email(['support@nearit.com'], [], [], 'Forgotten NearIT password', 'Hello!\n\nDon\'t worry about forgetting your password, all you have to do is to send this email to us and we\'ll be happy to get back to you with the new password.\n\nAll the best. The NearIT Team')
  }

  onLoginPress () {
    const { email, password } = this.props

    // Release focus from fields
    this.emailField.blur()
    this.passwordField.blur()

    this.props.loginUser({ email, password })
  }

  render () {
    const {
      pageStyle,
      loginFormStyle,
      linkContainerStyle,
      linkTextStyle,
      buttonContainerStyle,
      buttonTextStyle
    } = styles

    const {
      email,
      password,
      error,
      loading,
      isConnected
    } = this.props

    return (
      <Image
        source={require('../assets/background.png')}
        style={pageStyle}>

        <StatusBar barStyle='light-content'
                   translucent={true}
                   backgroundColor={'rgba(0, 0, 0, 0.1)'} />

        <NetworkStateBanner isConnected={isConnected} />

        <Card style={loginFormStyle}>

          <KeyboardAvoidingView behavior='padding'>
            <CardSection>
              <MaterialInput
                internalRef={(input) => {
                  if (input != null) {
                    this.emailField = input
                  }
                }}
                label='EMAIL'
                value={email}
                onChangeText={this.props.emailChanged}
                autoCorrect={false}
                keyboardType='email-address'
                autoCapitalize='none'
              />
            </CardSection>

            <CardSection>
              <MaterialInput
                internalRef={(input) => {
                  if (input != null) {
                    this.passwordField = input
                  }
                }}
                label='PASSWORD'
                value={password}
                onChangeText={this.props.passwordChanged}
                secureTextEntry
              />
            </CardSection>
          </KeyboardAvoidingView>

          <CardSection style={linkContainerStyle}>
            <LinkText
              style={linkTextStyle}
              onPress={this.openPasswordRecoveryPage.bind(this)}
            >
              {I18n.t('forgot_password')}
            </LinkText>
          </CardSection>

          <CardSection style={buttonContainerStyle}>
            <RoundedButton
              onPress={this.onLoginPress.bind(this)}
              loading={loading}
              disabled={!isConnected}
              textStyle={buttonTextStyle}
            >
              OK
            </RoundedButton>
          </CardSection>
        </Card>

        <SnackBar visible={error} textMessage={I18n.t('wrong_credentials')}
                  backgroundColor="#E91832" />

      </Image>
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
  linkContainerStyle: {
    marginTop: 20,
    marginBottom: 30,
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
