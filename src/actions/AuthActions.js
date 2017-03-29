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

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: AUTH_LOGIN })

    Promise.resolve({user: 'ada-ada'})
      .then(user => {
        dispatch({ type: AUTH_LOGIN_SUCCESS, payload: user })
      })
      .catch(() => {
        dispatch({ type: AUTH_LOGIN_FAILED })
      })
  }
}
