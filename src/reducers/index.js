import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import CouponReducer from './CouponReducer'

export default combineReducers({
  auth: AuthReducer,
  coupon: CouponReducer
})
