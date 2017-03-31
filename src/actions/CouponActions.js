import { Actions } from 'react-native-router-flux'
import { readResource } from '../services'

export const COUPON_DETECTED = 'coupon_detected'
export const COUPON_DETECTED_SUCCESS = 'coupon_detected_success'
export const COUPON_DETECTED_FAILED = 'coupon_detected_failed'

export const couponDetected = (couponSerial) => {
  return (dispatch) => {
    dispatch({type: COUPON_DETECTED, payload: couponSerial})

    // TODO Query coupon-blaster
    readResource('/plugins/coupon-blaster/claims/' + couponSerial, {params: {include: 'coupon'}})
      .then(({data}) => {
        const {coupon} = data.included
        dispatch({type: COUPON_DETECTED_SUCCESS, payload: coupon})

        Actions.details()
      })
      .catch((error) => {
        dispatch({type: COUPON_DETECTED_FAILED})
        Actions.result()
      })

  }
}