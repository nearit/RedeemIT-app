import React from 'react'
import { Provider } from 'react-redux'
import Store from './Store'
import Router from './Router'

const App = () => {
  return (
    <Provider store={Store}>
      <Router />
    </Provider>
  )
}

export default App
