/*********************  Reducers *************************/
import { combineReducers } from 'redux'
import { ADD_TODO, TOGGLE_TODO } from '../actions'
import todo from './todo'

// export const todosReducer = (state=[], action) => {
//   switch(action.type){
//     case ADD_TODO: 
//       return [
//         ...state,
//         todo(undefined, action)
//       ]        
//     case TOGGLE_TODO: 
//       // This is called 'Reducer Composition'
//       return state.map(t => todo(t, action))
//     default:
//       return state
//   }
// }

const byId = (state ={}, action) => {
  switch(action.type) {
    case ADD_TODO:
    case TOGGLE_TODO:
      return {
        ...state,
        [action.id]: todo(state[action.id], action)
      }
    default:
      return state
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.id]
    default:
      return state
  }
}

const getAllTodos = (state) => 
  state.allIds.map(id => state.byId[id])

const todosReducer = combineReducers({
  byId: byId,
  allIds: allIds
})

// It's called 'Selector' which can be used to select data with existed state
const getVisibleTodos = (state, filter) => {
  // return state.filter()
  // console.log(filter)
  const allTodos = getAllTodos(state)
  switch(filter) {
    case 'completed':
      return allTodos.filter(todo => todo.completed)
    case 'active':
      return allTodos.filter(todo => !todo.completed)
    case 'all':
      return allTodos
    default:
      throw new Error('Unknown filter')
  }
}

export const visibleTodos = (state, filter) => {
  return getVisibleTodos(state.todos, filter)
}


let compInitialState = {
  companies: [],
  isLoading: false,
  err: null
}

export const comapnyReducer =(state=compInitialState, action) => {
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
