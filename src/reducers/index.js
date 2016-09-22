/*********************  Reducers *************************/
import { combineReducers } from 'redux'
import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, SHOW_ALL } from '../actions'
// todo -reducer , handle the each todo's action
const todo = (state, action) => {
  switch(action.type) {
    case ADD_TODO: 
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case TOGGLE_TODO: 
      if (state.id !== action.id){
        return state
      } else {
          return {
            ...state,
            completed: !state.completed
          }
        }
    default:
      return state
  }
}

export const todosReducer = (state=[], action) => {
  switch(action.type){
    case ADD_TODO: 
      return [
        ...state,
        todo(undefined, action)
      ]        
    case TOGGLE_TODO: 
      // This is called 'Reducer Composition'
      return state.map(t => todo(t, action))
    default:
      return state
  }
}

export const filterReducer = (
    state = SHOW_ALL,
    action
  ) => {
  switch(action.type) {
    case SET_VISIBILITY_FILTER:{
      // console.log(action)
      return action.filter
    }
      
    default:
      return state
  }
}


const comapnyReducer =(state={
  isLoading: false,
  companies: [],
  err: []
}, action) => {
  switch (action.type) {
    case 'FETCHING_COMPANY':
      return {...state, 
        isLoading: true
      }
    case 'LOAD_COMPANY_SUCCESS':
      return {...state, 
        companies: action.payload,
        isLoading: false
      }
    case 'LOAD_COMPANY_FAILURE':
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
  visibilityFilter: filterReducer,
  companies: comapnyReducer
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
