import React, { Component } from 'react'
import { KeyboardAvoidingView, Image, Linking } from 'react-native'
import { connect } from 'react-redux'
import { Card, CardSection, MaterialInput, LinkText, RoundedButton } from './common'
import { emailChanged, passwordChanged, loginUser } from '../actions'

class LoginForm extends Component {
  supportEmail = 'mailto:support@nearit.com?subject=Subject&body=body'
  supportSite = 'https://go.nearit.com'

  openPasswordRecoveryPage () {
    Linking.canOpenURL(this.supportEmail)
      .then(supported => {
        if (!supported) {
          return Linking.openURL(this.supportSite)
        } else {
          return Linking.openURL(this.supportEmail)
        }
      })
      .catch(err => console.error('An error occurred', err))
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
      iconContainerStyle,
      iconStyle,
      linkContainerStyle,
      buttonContainerStyle
    } = styles

    const {
      email,
      password
    } = this.props

    return (
      <Image
        source={require('../assets/background.png')}
        style={pageStyle}>

        <KeyboardAvoidingView behavior='padding'>
          <Card style={loginFormStyle}>

            <CardSection style={iconContainerStyle}>
              <Image
                source={require('../assets/lock.png')}
                style={iconStyle}
              />
            </CardSection>

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

            <CardSection style={linkContainerStyle}>
              <LinkText onPress={this.openPasswordRecoveryPage.bind(this)}>Hai dimenticato la password?</LinkText>
            </CardSection>

            <CardSection style={buttonContainerStyle}>
              <RoundedButton onPress={this.onLoginPress.bind(this)}>
              OK
            </RoundedButton>
            </CardSection>
          </Card>
        </KeyboardAvoidingView>

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
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 70
  },
  loginFormStyle: {
    width: 300,
    height: 300,
    backgroundColor: 'white',
    alignSelf: 'center'
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
    marginBottom: 20
  },
  buttonContainerStyle: {
    width: 250,
    height: 50,
    alignSelf: 'center'
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password } = auth

  return { email, password }
}

const mapActionsToProps = {
  emailChanged,
  passwordChanged,
  loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(LoginForm)
