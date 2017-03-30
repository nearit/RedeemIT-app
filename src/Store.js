import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from './reducers'

const middlewares = [ReduxThunk]

if (__DEV__) {
  const {logger} = require('redux-logger')

  middlewares.push(logger)
}

export default Store = createStore(reducers, {}, applyMiddleware(...middlewares))