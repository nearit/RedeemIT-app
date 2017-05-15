import React from 'react'
import I18n from 'react-native-i18n'
import { Provider } from 'react-redux'
import Store from './Store'
import NetworkInfoProvider from './components/NetworkInfoProvider'
import AppWithNavigationState from './Router'

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

I18n.translations = {
  en: {
    forgot_password: 'Forgot password?',
    wrong_credentials: 'Login failed, please check your credentials.',
    qr_code_hint: 'Frame a QR code with the camera',
    apply_coupon: 'Apply coupon',
    valid_coupon_code: 'VALID COUPON CODE',
    invalid_coupon_code: 'INVALID COUPON CODE',
    coupon_code_applied: 'COUPON CODE SUCCESSFULLY REDEEMED',
    cant_apply_coupon_code: 'COUPON COULDN\'T BE REDEEMED',
    coupon_code_redeemed: 'COUPON ALREADY REDEEMED',
    coupon_inactive: 'INACTIVE COUPON',
    coupon_expired: 'EXPIRED COUPON',
    dont_apply_coupon: 'Don\'t apply',
    logout: 'Logout',
    ok: 'OK',
    retry: 'RETRY',
    close: 'Close',
    validity: 'Validity',
    from: 'from',
    to: 'to'
  },
  it: {
    forgot_password: 'Hai dimenticato la password?',
    wrong_credentials: 'Login fallito, controlla le tue credenziali.',
    qr_code_hint: 'Inquadra il QR code con la fotocamera',
    apply_coupon: 'Applica coupon',
    valid_coupon_code: 'CODICE COUPON VALIDO',
    invalid_coupon_code: 'CODICE COUPON NON VALIDO',
    coupon_code_applied: 'CODICE COUPON ASSOCIATO CON SUCCESSO',
    cant_apply_coupon_code: 'IMPOSSIBILE APPLICARE IL COUPON',
    coupon_code_redeemed: 'COUPON GIA\' UTILIZZATO',
    coupon_inactive: 'COUPON NON ATTIVO',
    coupon_expired: 'COUPON SCADUTO',
    dont_apply_coupon: 'Non applicare',
    logout: 'Logout',
    ok: 'OK',
    retry: 'RIPROVA',
    close: 'Chiudi',
    validity: 'Validità',
    from: 'dal',
    to: 'fino al'
  }
}

export default App
