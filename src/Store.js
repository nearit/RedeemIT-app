import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from './reducers'

export default (Store = createStore(reducers, {}, applyMiddleware(ReduxThunk)))
