import {
  AUTH_EMAIL_CHANGED,
  AUTH_PASSWORD_CHANGED,
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILED,
  AUTH_LOGOUT
} from '../actions'

const INITIAL_STATE = {
  email: '',
  password: '',
  loading: false,
  error: '',
  token: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_EMAIL_CHANGED:
      return {...state, email: action.payload}

    case AUTH_PASSWORD_CHANGED:
      return {...state, password: action.payload}

    case AUTH_LOGIN:
      return {...state, loading: true, error: ''}

    case AUTH_LOGIN_SUCCESS:
      return {...state, ...INITIAL_STATE, token: action.payload}

    case AUTH_LOGIN_FAILED:
      return {...state, password: '', loading: false, error: 'Errore di autenticazione.'}

    case AUTH_LOGOUT:
      return {...INITIAL_STATE}

    default:
      return state
  }
}
