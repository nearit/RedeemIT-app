import { NetInfo } from 'react-native'

export const NETWORK_STATE_CHANGED = 'NETWORK_STATE_CHANGED'

export const connectionStateChanged = () => {
  return (dispatch) => {
    NetInfo.isConnected.fetch()
           .then(isConnected => {
               dispatch({ type: NETWORK_STATE_CHANGED, isConnected })
             },
             () => {
               dispatch({ type: NETWORK_STATE_CHANGED, isConnected: false })
             })
  }
}
