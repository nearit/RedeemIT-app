import {
  NETWORK_STATE_CHANGED
} from '../actions'

const INITIAL_STATE = {
  isConnected: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NETWORK_STATE_CHANGED:
      return { ...state, isConnected: action.isConnected }
    default:
      return state
  }
}