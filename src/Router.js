import React from 'react'
import { Scene, Router } from 'react-native-router-flux'
import LoginForm from './components/LoginForm'
import CameraView from './components/CameraView'

const RouterComponent = () => {
  return (
    <Router hideNavBar>
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
      </Scene>
    </Router>
  )
}

export default RouterComponent
