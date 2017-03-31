import {
  COUPON_DETECTED,
  COUPON_DETECTED_SUCCESS,
  COUPON_DETECTED_FAILED
} from '../actions'

const INITIAL_STATE = {
  serialCode: '',
  loading: false,
  error: false,
  couponDetails: null,
  redeemStatus: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COUPON_DETECTED:
      return {...state, serialCode: action.payload, loading: true, error: false}

    case COUPON_DETECTED_SUCCESS:
      return {...state, ...INITIAL_STATE, couponDetails: action.payload}

    case COUPON_DETECTED_FAILED:
      return {...state, ...INITIAL_STATE, error: true, redeemStatus: 'CODICE COUPON NON VALIDO'}
    default:
      return state
  }
}