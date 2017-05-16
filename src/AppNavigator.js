/**
 * Created by alessandrocolleoni on 03/04/2017.
 */
import LoginForm from './containers/LoginForm'
import CameraView from './containers/CameraView'
import CouponDetails from './containers/CouponDetails'
import CouponResult from './containers/CouponResult'
import {StackNavigator} from 'react-navigation'


const routerConfig = {
    Auth : {screen : LoginForm},
    Main : {screen : CameraView},
    Details : {screen : CouponDetails},
    Result : {screen : CouponResult},
}

const AppNavigator = StackNavigator(
    routerConfig,
    {
      headerMode: 'none'
    }
)

export default AppNavigator