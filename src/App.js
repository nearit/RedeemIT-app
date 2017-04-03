import React from 'react'
import { Provider } from 'react-redux'
import Store from './Store'
import AppWithNavigationState from './Router'

const App = () => {
  return (
    <Provider store={Store}>
      <AppWithNavigationState />
    </Provider>
  )
}

export default App
