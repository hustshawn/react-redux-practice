import todosReducers from './reducers'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

// const store = createStore(todosReducers, applyMiddleware(logger))
const middleware = applyMiddleware(logger())
const store = createStore(todosReducers, middleware)
export default store


