import React from 'react'
import { Scene, Router } from 'react-native-router-flux'
import LoginForm from './components/LoginForm'
import CameraView from './components/CameraView'
import CouponDetails from './containers/CouponDetails'
import CouponResult from './containers/CouponResult'

const RouterComponent = () => {
  return (
    <Router hideNavBar panHandlers={null}>
      <Scene key='auth'>
        <Scene
          key='login'
          component={LoginForm}
          initial
        />
      </Scene>

      <Scene key='main'>
        <Scene
          key='camera'
          component={CameraView}
          initial
        />

        <Scene
          key='details'
          component={CouponDetails}
        />

        <Scene
          key='result'
          component={CouponResult}
        />
      </Scene>
    </Router>
  )
}

export default RouterComponent
