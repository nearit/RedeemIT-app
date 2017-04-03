import { Actions, ActionConst } from 'react-native-router-flux'
import { readResource, createResource } from '../services'

export const COUPON_DETECTED = 'coupon_detected'
export const COUPON_DETECTED_SUCCESS = 'coupon_detected_success'
export const COUPON_DETECTED_FAILED = 'coupon_detected_failed'

export const COUPON_RESET = 'coupon_reset'

export const COUPON_REDEEM = 'coupon_redeem'
export const COUPON_REDEEM_SUCCESS = 'coupon_redeem_success'
export const COUPON_REDEEM_FAILED = 'coupon_redeem_failed'

export const couponDetected = (couponSerial) => {
  return (dispatch) => {
    dispatch({type: COUPON_DETECTED, payload: couponSerial})

    readResource('/plugins/coupon-blaster/claims/' + couponSerial, {params: {include: 'coupon'}})
      .then(({data}) => {
        const {coupon} = data.included

        dispatch({type: COUPON_DETECTED_SUCCESS, payload: {...coupon, ...data.meta}})

        Actions.details()
      })
      .catch((error) => {
        dispatch({type: COUPON_DETECTED_FAILED})
        Actions.result()
      })

  }
}

export const couponReset = () => {
  return (dispatch) => {
    // Reset state
    dispatch({type: COUPON_RESET})

    // Go back to camera
    Actions.camera({type: ActionConst.REPLACE})
  }
}

export const couponRedeem = (couponSerial) => {

  return (dispatch) => {

    dispatch({type: COUPON_REDEEM})

    createResource(`/plugins/coupon-blaster/claims/${couponSerial}/redeem`, {})
      .then((response) => {
        dispatch({type: COUPON_REDEEM_SUCCESS})

        Actions.result()
      })
      .catch((error) => {
        dispatch({type: COUPON_REDEEM_FAILED})

        Actions.result()
      })
  }
}