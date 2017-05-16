import { combineReducers } from 'redux'
import ConnectionStateReducer from './ConnectionStateReducer'
import AuthReducer from './AuthReducer'
import CouponReducer from './CouponReducer'
import navReducer from './NavReducer'

export default combineReducers({
  auth: AuthReducer,
  coupon: CouponReducer,
  connection: ConnectionStateReducer,
  nav: navReducer
})
