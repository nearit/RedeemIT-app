import {
  COUPON_DETECTED,
  COUPON_DETECTED_FAILED
} from '../actions'

const INITIAL_STATE = {
  serialCode: '',
  loading: false,
  couponDetails: null,
  couponStatus: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COUPON_DETECTED:
      return {...state, serialCode: action.payload, loading: true}
    case COUPON_DETECTED_FAILED:
      return {...state, ...INITIAL_STATE, couponStatus: 'INVALID'}
    default:
      return state
  }
}