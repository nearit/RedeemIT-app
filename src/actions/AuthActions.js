import { createResource } from '../services'

export const AUTH_EMAIL_CHANGED = 'auth_email_changed'
export const AUTH_PASSWORD_CHANGED = 'auth_password_changed'

export const AUTH_LOGIN = 'auth_login'
export const AUTH_LOGIN_SUCCESS = 'auth_login_success'
export const AUTH_LOGIN_FAILED = 'auth_login_failed'

export const AUTH_RESET_ERROR = 'AUTH_RESET_ERROR'

export const AUTH_LOGOUT = 'auth_login'

import { NavigationActions } from 'react-navigation'

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
        setTimeout(() => dispatch({type: AUTH_RESET_ERROR}), 3000)
      })
  }
}

const onLoginSuccess = (dispatch, {data}) => {
  const {token} = data.data.attributes
  dispatch({type: AUTH_LOGIN_SUCCESS, payload: token})
    dispatch(NavigationActions.reset({
        index : 0,
        actions : [
            NavigationActions.navigate( {routeName : 'Main'})
        ]
    }))
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({type: AUTH_LOGOUT})
      dispatch(NavigationActions.reset({
          index : 0,
          actions : [
              NavigationActions.navigate( {routeName : 'Auth'})
          ]
      }))
  }
}
