import { loadState, saveState } from './localStorage'
import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import throttle from 'lodash/throttle'

import appReducer from './reducers'

const configreStore = () => {
  const persistedState = loadState()
  const createStoreWithMiddleware = applyMiddleware(logger())(createStore)
  const store = createStoreWithMiddleware(
    appReducer,
    persistedState
  )

  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().todos
    })
  }, 1000))
  return store
}

export default configreStore
