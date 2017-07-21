import React from 'react'
import I18n from 'react-native-i18n'
import { Provider } from 'react-redux'
import { setTheme, MKColor } from 'react-native-material-kit'
import Store from './Store'
import NetworkInfoProvider from './containers/NetworkInfoProvider'
import AppWithNavigationState from './Router'
import en from './locales/Locale-en'
import it from './locales/Locale-it'

const App = () => {
  return (
    <Provider store={Store}>
      <NetworkInfoProvider>
        <AppWithNavigationState />
      </NetworkInfoProvider>
    </Provider>
  )
}

// Enable fallback if you want `en-US` and `en-GB` to fallback to `en`
I18n.fallbacks = true
I18n.translations = { en, it }

// Set MaterialKit Theme
setTheme({
  checkboxStyle: {
    fillColor: '#9f92ff',
    borderOnColor: '#9f92ff',
    borderOffColor: '#9f92ff',
    rippleColor: '#9f92ff22',
  }
})

export default App
