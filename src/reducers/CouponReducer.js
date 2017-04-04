import {
  COUPON_DETECTED,
  COUPON_DETECTED_SUCCESS,
  COUPON_DETECTED_FAILED,
  COUPON_RESET,
  COUPON_REDEEM,
  COUPON_REDEEM_SUCCESS,
  COUPON_REDEEM_FAILED
} from '../actions'

const INITIAL_STATE = {
  serialCode: null,
  loading: false,
  error: false,
  couponDetails: {},
  redeemStatus: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COUPON_DETECTED:
      return {...state, serialCode: action.payload, loading: true, error: false}

    case COUPON_DETECTED_SUCCESS:
      return {...state, loading: false, error: false, couponDetails: action.payload, redeemStatus: null}

    case COUPON_DETECTED_FAILED:
      return {...state, ...INITIAL_STATE, error: true, redeemStatus: 'CODICE COUPON NON VALIDO'}

    case COUPON_REDEEM:
      return {...state, loading: true, error: false, redeemStatus: null}

    case COUPON_REDEEM_SUCCESS:
      return {...state, loading: false, error: false, redeemStatus: 'CODICE COUPON ASSOCIATO CON SUCCESSO'}

    case COUPON_REDEEM_FAILED:
      return {...state, loading: false, error: true, redeemStatus: 'IMPOSSIBILE APPLICARE IL COUPON'}

    case COUPON_RESET:
      return {...INITIAL_STATE}

    default:
      return state
  }
}