import React, { Component } from 'react'
import { Image } from 'react-native'
import { connect } from 'react-redux'
import { Card, CardSection, MaterialInput, LinkText, RoundedButton } from './common'

class LoginForm extends Component {

  render () {
    const {
      pageStyle,
      loginFormStyle,
      iconContainerStyle,
      iconStyle,
      linkContainerStyle,
      buttonContainerStyle
    } = styles

    return (
      <Image
        source={require('../assets/background.png')}
        style={pageStyle}
      >
        <Card style={loginFormStyle}>

          <CardSection style={iconContainerStyle}>
            <Image source={require('../assets/lock.png')}
              style={iconStyle} />
          </CardSection>

          <CardSection>
            <MaterialInput
              label='EMAIL'
          />
          </CardSection>

          <CardSection>
            <MaterialInput
              label='PASSWORD'
              secureTextEntry
          />
          </CardSection>

          <CardSection style={linkContainerStyle}>
            <LinkText>Hai dimenticato la password?</LinkText>
          </CardSection>

          <CardSection style={buttonContainerStyle}>
            <RoundedButton>
            OK
          </RoundedButton>
          </CardSection>
        </Card>
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

export default connect(null, null)(LoginForm)
