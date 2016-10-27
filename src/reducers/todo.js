import { ADD_TODO, TOGGLE_TODO } from '../actions'
// todo -reducer , handle the each todo's action
const todo = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case TOGGLE_TODO:
      if (state.id !== action.id) {
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

export default todo
