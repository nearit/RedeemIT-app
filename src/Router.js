import React from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux'
import LoginForm from './components/LoginForm'

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
    </Router>
  )
}

export default RouterComponent
