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

          dispatch({
              type : 'Navigation/RESET',
              routeName : 'Details'
          })
      })
      .catch((error) => {
        dispatch({type: COUPON_DETECTED_FAILED})
          dispatch({
              type : 'Navigation/RESET',
              routeName : 'Result'
          })
      })

  }
}

export const couponReset = () => {
  return (dispatch) => {
    // Reset state
    dispatch({type: COUPON_RESET})

    // Go back to camera
      dispatch({
          type : 'Navigation/RESET',
          routeName : 'Main'
      })
  }
}

export const couponRedeem = (couponSerial) => {

  return (dispatch) => {

    dispatch({type: COUPON_REDEEM})

    createResource(`/plugins/coupon-blaster/claims/${couponSerial}/redeem`, {})
      .then((response) => {
        dispatch({type: COUPON_REDEEM_SUCCESS})

          dispatch({
              type : 'Navigation/RESET',
              routeName : 'Result'
          })
      })
      .catch((error) => {
        dispatch({type: COUPON_REDEEM_FAILED})

          dispatch({
              type : 'Navigation/RESET',
              routeName : 'Result'
          })
      })
  }
}