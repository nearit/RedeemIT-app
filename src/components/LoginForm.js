import React, { Component } from 'react'
import { StatusBar, KeyboardAvoidingView, Image } from 'react-native'
import { connect } from 'react-redux'
import { email } from 'react-native-communications'
import { Card, CardSection, MaterialInput, LinkText, RoundedButton } from './common'
import { emailChanged, passwordChanged, loginUser } from '../actions'
import SnackBar from 'react-native-snackbar-component'

class LoginForm extends Component {

  openPasswordRecoveryPage () {
    email(['support@nearit.com'], [], [], 'Forgotten NearIT password', 'Hello!\n\nDon\'t worry about forgetting your password, all you have to do is to send this email to us and we\'ll be happy to get back to you with the new password.\n\nAll the best. The NearIT Team')
  }

  onLoginPress () {
    const {email, password} = this.props

    // Release focus from fields
    this.emailField.blur()
    this.passwordField.blur()

    this.props.loginUser({email, password})
  }

  render () {
    const {
      pageStyle,
      loginFormStyle,
      iconContainerStyle,
      iconStyle,
      linkContainerStyle,
      linkTextStyle,
      buttonContainerStyle
    } = styles

    const {
      email,
      password,
      error,
      loading
    } = this.props

    return (
      <Image
        source={require('../assets/background.png')}
        style={pageStyle}>

        <StatusBar barStyle='light-content'
                   translucent={true}
                   backgroundColor={'rgba(0, 0, 0, 0.1)'}/>

        <KeyboardAvoidingView behavior='padding'>
          <Card style={loginFormStyle}>

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

            <CardSection style={linkContainerStyle}>
              <LinkText
                style={linkTextStyle}
                onPress={this.openPasswordRecoveryPage.bind(this)}
              >
                Hai dimenticato la password?
              </LinkText>
            </CardSection>

            <CardSection style={buttonContainerStyle}>
              <RoundedButton
                onPress={this.onLoginPress.bind(this)}
                loading={loading}
              >
                OK
              </RoundedButton>


            </CardSection>
          </Card>
        </KeyboardAvoidingView>

        <SnackBar visible={error} textMessage={error} backgroundColor="#E91832"/>

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
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'italic'
  },
  buttonContainerStyle: {
    height: 50,
    alignSelf: 'center'
  }
}

const mapStateToProps = ({auth}) => {
  const {email, password, error, loading} = auth

  return {email, password, error, loading}
}

const mapActionsToProps = {
  emailChanged,
  passwordChanged,
  loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(LoginForm)
