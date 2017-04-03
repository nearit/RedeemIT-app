import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import CouponReducer from './CouponReducer'
import navReducer from './NavReducer'

export default combineReducers({
  auth: AuthReducer,
  coupon: CouponReducer,
    nav : navReducer
})
