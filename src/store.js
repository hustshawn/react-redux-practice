// // import { loadState, saveState } from './localStorage'
// import { applyMiddleware, createStore } from 'redux'
// import logger from 'redux-logger'
// import thunk from 'redux-thunk'
// import throttle from 'lodash/throttle'
// import promise from 'redux-promise-middleware'
// import appReducer from './reducers'

// const configreStore = () => {
//   const middleware = [ promise(), thunk]

//   if (process.env.NODE_ENV !== 'production') {
//     middleware.push(logger())
//   }
  
//   const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)
//   const store = createStoreWithMiddleware(
//     appReducer,

//   )

//   return store
// }

// export default configreStore


import { createStore, applyMiddleware } from 'redux'
import appReducer from './reducers'
import promise from 'redux-promise'
import createLogger from 'redux-logger'

const configureStore = () => {
  const middlewares = [promise]
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }
  return createStore(
    appReducer,
    applyMiddleware(...middlewares)
  )
};

export default configureStore;
