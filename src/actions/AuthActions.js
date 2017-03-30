import { Actions } from 'react-native-router-flux'
import jwt_decode from 'jwt-decode'
import { createResource } from '../services'

export const AUTH_EMAIL_CHANGED = 'auth_email_changed'
export const AUTH_PASSWORD_CHANGED = 'auth_password_changed'

export const AUTH_LOGIN = 'auth_login'
export const AUTH_LOGIN_SUCCESS = 'auth_login_success'
export const AUTH_LOGIN_FAILED = 'auth_login_failed'

export const emailChanged = (email) => {
  return {
    type: AUTH_EMAIL_CHANGED,
    payload: email
  }
}

export const passwordChanged = (password) => {
  return {
    type: AUTH_PASSWORD_CHANGED,
    payload: password
  }
}

export const loginUser = ({email, password}) => {
  return (dispatch) => {
    dispatch({type: AUTH_LOGIN})

    createResource('/auth', {email, password})
      .then((data) => {
        onLoginSuccess(dispatch, data)
      })
      .catch((err) => {
        dispatch({type: AUTH_LOGIN_FAILED})
      })
  }
}

const onLoginSuccess = (dispatch, {data}) => {
  const {token} = data.data.attributes
  dispatch({type: AUTH_LOGIN_SUCCESS, payload: token})
  Actions.main()
}
