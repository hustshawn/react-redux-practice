import { ADD_TODO } from '../actions'
import { combineReducers } from 'redux'

const initialState = ['1ab', '2cd']

function todos(state=initialState, action) {
  // console.log("Reducer- action type:", action.type)
  switch(action.type) {
    case ADD_TODO:
      // console.log("touched add todo")
      return [...state, 
        action.text
      ]
    default:
      return state
  }
}

const todosReducers = combineReducers({todos})
export default todosReducers