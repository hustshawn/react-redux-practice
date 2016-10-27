/*********************  Reducers *************************/
import { combineReducers } from 'redux'
import { ADD_TODO, TOGGLE_TODO } from '../actions'
import byId, * as fromById from './byId'
import createList, * as fromList from './createList'


const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed')
})

const todosReducer = combineReducers({
  byId,
  listByFilter
})

// It's called 'Selector' which can be used to select data with existed state
export const getVisibleTodos = (state, filter) => {
  const { todos } = state
  const ids = fromList.getIds(todos.listByFilter[filter])
  return ids.map(id => fromById.getTodo(todos.byId, id))
}

// export const visibleTodos = (state, filter) => {
//   return getVisibleTodos(state.todos, filter)
// }

export const getIsFetching = (state, filter) =>
  fromList.getIsFetching(state.todos.listByFilter[filter])

export const getErrorMessage = (state, filter) =>
  fromList.getErrorMessage(state.todos.listByFilter[filter])

let compInitialState = {
  companies: [],
  isLoading: false,
  err: null
}

export const comapnyReducer = (state = compInitialState, action) => {
  switch (action.type) {
    case 'COMPANIES_PENDING':
      return {...state,
        isLoading: false
      }
    case 'COMPANIES_FULFILLED':
      return {...state,
        companies: action.payload,
        isLoading: false
      }
    case 'COMPANIES_REJECTED':
      return {...state,
        isLoading: false,
        err: action.payload
      }
    default:
      return state
  }
}

const appReducer = combineReducers({
  todos: todosReducer,
  // visibilityFilter: filterReducer,
  companyState: comapnyReducer
})

export default appReducer


/* Implementation of 'combineReducers' */

// const combineReducers = (reducers) =>{
//   return (state ={}, action) => {
//     return Object.keys(reducers).reduce(
//       (nextState, key) => {
//         nextState[key] = reducers[key](
//           state[key],
//           action
//         )
//         return nextState
//       }, 
//       {}
//     )
//   }
// }
