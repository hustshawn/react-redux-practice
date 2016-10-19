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


import { createStore } from 'redux';
import todoApp from './reducers';

const logger = (store) => (next) => {
  if (!console.group) {
    return next;
  }
  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = next(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
};
  /* eslint-enable no-console */


const promise = (store) => (next) => (action) => {
      if (typeof action.then === 'function') {
        return action.then(next)
      }
      return next(action)
    }


const wrapDispatchWithMiddlewares = (store, middlewares) => {
  console.log(middlewares)
  middlewares.slice().reverse().forEach(middleware =>
    store.dispatch = middleware(store)(store.dispatch)
    )
}
const configureStore = () => {
  const store = createStore(todoApp);
  const middlewares = [promise]
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }
  wrapDispatchWithMiddlewares(store, middlewares)
  return store;
};

export default configureStore;
