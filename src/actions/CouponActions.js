import { Vibration } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { readResource, createResource } from '../services'
import { AUTH_SESSION_EXPIRED, AUTH_RESET_ERROR } from './AuthActions'

export const COUPON_DETECTED = 'coupon_detected'
export const COUPON_DETECTED_SUCCESS = 'coupon_detected_success'
export const COUPON_DETECTED_FAILED = 'coupon_detected_failed'

export const COUPON_RESET = 'coupon_reset'

export const COUPON_REDEEM = 'coupon_redeem'
export const COUPON_REDEEM_SUCCESS = 'coupon_redeem_success'
export const COUPON_REDEEM_FAILED = 'coupon_redeem_failed'

export const couponDetected = (couponSerial) => {
  return (dispatch) => {
    Vibration.vibrate()

    dispatch({ type: COUPON_DETECTED, payload: couponSerial })

    readResource(`/plugins/coupon-blaster/claims/${couponSerial}`, { params: { include: 'coupon' } })
      .then(({ data }) => {
        const { coupon } = data.included

        dispatch({
          type: COUPON_DETECTED_SUCCESS,
          payload: { ...coupon, ...data.meta }
        })

        dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Details' })
          ]
        }))

      })
      .catch((error) => {
        if (error && error.response && error.response.status && error.response.status === 403) {
          dispatch({ type: AUTH_SESSION_EXPIRED })
          dispatch(NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'Auth' })
            ]
          }))
          setTimeout(() => dispatch({ type: AUTH_RESET_ERROR }), 3000)
        }
        else {
          dispatch({ type: COUPON_DETECTED_FAILED })
          dispatch(NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'Result' })
            ]
          }))
        }

      })

  }
}

export const couponReset = () => {
  return (dispatch) => {
    // Reset state
    dispatch({ type: COUPON_RESET })

    // Go back to camera
    dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Main' })
      ]
    }))
  }
}

export const couponRedeem = (couponSerial) => {

  return (dispatch) => {

    dispatch({ type: COUPON_REDEEM })

    createResource(`/plugins/coupon-blaster/claims/${couponSerial}/redeem`, {})
      .then((response) => {
        dispatch({ type: COUPON_REDEEM_SUCCESS })
        dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Result' })
          ]
        }))
      })
      .catch((error) => {
        if (error && error.response && error.response.status && error.response.status === 403) {
          dispatch({ type: AUTH_SESSION_EXPIRED })
          dispatch(NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'Auth' })
            ]
          }))
          setTimeout(() => dispatch({ type: AUTH_RESET_ERROR }), 3000)
        }
        else {
          dispatch({ type: COUPON_REDEEM_FAILED })
          dispatch(NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'Result' })
            ]
          }))
        }
      })
  }
}