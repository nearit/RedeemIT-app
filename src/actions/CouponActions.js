import { Actions } from 'react-native-router-flux'
import { readResource } from '../services'

export const COUPON_DETECTED = 'coupon_detected'
export const COUPON_DETECTED_FAILED = 'coupon_detected_failed'

export const couponDetected = (couponSerial) => {
  return (dispatch) => {
    dispatch({type: COUPON_DETECTED, payload: couponSerial})

    // TODO Query coupon-blaster
    readResource('/plugins/coupon-blaster/claim/' + couponSerial)
      .then(response => {
        console.log('response', response)
      })
      .catch((error) => {
        dispatch({type: COUPON_DETECTED_FAILED})
        Actions.result()
      })

  }
}